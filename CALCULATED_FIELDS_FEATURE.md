# Calculated Fields Feature

## Overview
The Car Wholesaler Inventory Management System now supports calculated fields similar to Salesforce. These fields automatically compute values based on other fields in your vehicle records.

## Features

### 1. Settings Page - Custom Fields Management
- Navigate to **Settings > Custom Fields** tab
- Click **"Open Custom Fields Manager"** to access the dedicated custom fields page
- Located at `/settings/custom-fields`

### 2. Field Types Available
- **Text Fields** - For general text input
- **Number Fields** - For numeric values
- **Date Fields** - For date selection
- **Yes/No Fields** - Boolean true/false fields
- **Dropdown Fields** - Select from predefined options
- **Formula Fields** - Calculated fields that automatically compute values

### 3. Formula Fields
Formula fields use a simple syntax to reference other fields and perform calculations:

#### Syntax
- Reference fields using curly braces: `{fieldName}`
- Supported operators: `+`, `-`, `*`, `/`, `()`
- Fields are evaluated in real-time

#### Available System Fields for Formulas
- `{purchasePrice}` - Vehicle purchase price
- `{listingPrice}` - Vehicle listing price
- `{totalExpenses}` - Sum of all expenses
- `{daysInInventory}` - Days since purchase
- `{mileage}` - Vehicle mileage
- `{year}` - Vehicle year

#### Example Formulas

**Total Cost**
```
{purchasePrice} + {totalExpenses}
```

**Profit Margin %**
```
(({listingPrice} - {purchasePrice} - {totalExpenses}) / {listingPrice}) * 100
```

**Cost Per Day**
```
({purchasePrice} + {totalExpenses}) / {daysInInventory}
```

**Markup Percentage**
```
(({listingPrice} - {purchasePrice}) / {purchasePrice}) * 100
```

### 4. Managing Custom Fields

#### Adding a Field
1. Click **"Add Field"** button
2. Enter field name (e.g., "Total Investment")
3. Select field type
4. For formula fields:
   - Select "Formula (Calculated)" as the type
   - Enter your formula (e.g., `{purchasePrice} + {totalExpenses}`)
   - Click available field buttons to insert references
5. Mark as required if needed (not applicable to formula fields)
6. Click **"Add Field"**

#### Editing a Field
1. Click **"Edit"** next to any field
2. Modify field properties
3. Click **"Update Field"**

#### Deleting a Field
1. Click the trash icon next to any field
2. Confirm deletion (affects ALL vehicles)

### 5. Vehicle Page Integration

- Custom fields appear in the "Custom Fields" section
- Formula fields are:
  - Automatically calculated and updated
  - Displayed with a calculator icon
  - Read-only (cannot be manually edited)
  - Show "Calculated field" label in edit mode

### 6. Formula Evaluation

- Formulas are evaluated in real-time
- If a referenced field is empty, it's treated as 0
- Results are rounded to 2 decimal places
- Invalid formulas display "Error" or "Invalid formula"

## Use Cases

1. **Total Investment Tracking**
   - Formula: `{purchasePrice} + {totalExpenses}`
   - Shows total amount invested in the vehicle

2. **Profit Margin Analysis**
   - Formula: `(({listingPrice} - {purchasePrice} - {totalExpenses}) / {listingPrice}) * 100`
   - Shows profit margin as a percentage

3. **Daily Holding Cost**
   - Formula: `({purchasePrice} + {totalExpenses}) / {daysInInventory}`
   - Calculates cost per day to hold the vehicle

4. **ROI Calculation**
   - Formula: `(({listingPrice} - {purchasePrice} - {totalExpenses}) / ({purchasePrice} + {totalExpenses})) * 100`
   - Shows return on investment percentage

## Technical Details

- Formula evaluation uses a safe mathematical expression parser
- Only mathematical operations are allowed (no code execution)
- Fields can reference both system fields and other custom number fields
- Circular references are not currently detected (avoid creating them)

## Future Enhancements

Potential improvements for the calculated fields feature:
- Support for conditional logic (IF/THEN statements)
- Date calculations
- Text concatenation
- Aggregate functions (SUM, AVG across multiple vehicles)
- Field dependencies visualization
- Formula validation with better error messages 