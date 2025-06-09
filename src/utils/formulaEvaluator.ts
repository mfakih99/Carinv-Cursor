/**
 * Evaluates formula fields by replacing field references with values
 * and calculating the result
 */
export function evaluateFormula(
  formula: string,
  data: Record<string, any>,
  customFieldValues?: Record<string, string>
): number | string {
  try {
    let evaluableFormula = formula
    
    // Replace field references in curly braces with actual values
    const fieldReferences = formula.match(/\{([^}]+)\}/g) || []
    
    fieldReferences.forEach(ref => {
      const fieldName = ref.slice(1, -1) // Remove curly braces
      let value = data[fieldName]
      
      // Check custom field values if not found in main data
      if (value === undefined && customFieldValues) {
        value = customFieldValues[fieldName]
      }
      
      // Convert to number if possible, default to 0 if undefined
      const numValue = Number(value) || 0
      evaluableFormula = evaluableFormula.replace(ref, numValue.toString())
    })
    
    // Safety check: only allow numbers, operators, and parentheses
    if (!/^[\d\s+\-*/().]+$/.test(evaluableFormula)) {
      return 'Invalid formula'
    }
    
    // Evaluate the formula
    // Using Function constructor for safe evaluation of mathematical expressions
    const result = new Function('return ' + evaluableFormula)()
    
    // Round to 2 decimal places for display
    return typeof result === 'number' ? Math.round(result * 100) / 100 : result
  } catch (error) {
    console.error('Formula evaluation error:', error)
    return 'Error'
  }
}

/**
 * Validates if a formula is syntactically correct
 */
export function validateFormula(formula: string): { valid: boolean; error?: string } {
  try {
    // Check for balanced parentheses
    let parenCount = 0
    for (const char of formula) {
      if (char === '(') parenCount++
      if (char === ')') parenCount--
      if (parenCount < 0) {
        return { valid: false, error: 'Unmatched closing parenthesis' }
      }
    }
    if (parenCount !== 0) {
      return { valid: false, error: 'Unmatched opening parenthesis' }
    }
    
    // Check for valid characters (excluding field references for now)
    const withoutRefs = formula.replace(/\{[^}]+\}/g, '1')
    if (!/^[\d\s+\-*/().]+$/.test(withoutRefs)) {
      return { valid: false, error: 'Invalid characters in formula' }
    }
    
    // Try to evaluate with dummy values
    const testFormula = formula.replace(/\{[^}]+\}/g, '1')
    new Function('return ' + testFormula)()
    
    return { valid: true }
  } catch (error) {
    return { valid: false, error: 'Invalid formula syntax' }
  }
}

/**
 * Gets all field references from a formula
 */
export function getFieldReferences(formula: string): string[] {
  const matches = formula.match(/\{([^}]+)\}/g) || []
  return matches.map(match => match.slice(1, -1))
} 