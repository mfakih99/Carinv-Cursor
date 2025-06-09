'use client'

import Navigation from '@/components/layout/Navigation'
import { 
  Settings2,
  Plus,
  Trash2,
  Type,
  Hash,
  ToggleLeft,
  CalendarPlus,
  ListOrdered,
  Calculator,
  ArrowLeft,
  Save,
  X,
  Info
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// In real app, this would be fetched from database/API
const initialCustomFields = [
  { id: '1', name: 'Previous Owner', type: 'text', required: false },
  { id: '2', name: 'Warranty Expires', type: 'date', required: false },
  { id: '3', name: 'Has Service Records', type: 'boolean', required: false },
  { id: '4', name: 'Number of Keys', type: 'number', required: false },
  { id: '5', name: 'Vehicle Source', type: 'select', required: true, options: ['Auction', 'Trade-In', 'Private Sale', 'Dealer'] },
  // Example calculated fields
  { id: '6', name: 'Total Cost', type: 'formula', formula: '{purchasePrice} + {totalExpenses}', required: false },
  { id: '7', name: 'Profit Margin %', type: 'formula', formula: '(({listingPrice} - {purchasePrice} - {totalExpenses}) / {listingPrice}) * 100', required: false },
  { id: '8', name: 'Cost Per Day', type: 'formula', formula: '({purchasePrice} + {totalExpenses}) / {daysInInventory}', required: false },
]

// Available fields for formulas
const availableFormulaFields = [
  { name: 'purchasePrice', label: 'Purchase Price', type: 'number' },
  { name: 'listingPrice', label: 'Listing Price', type: 'number' },
  { name: 'totalExpenses', label: 'Total Expenses', type: 'number' },
  { name: 'daysInInventory', label: 'Days in Inventory', type: 'number' },
  { name: 'mileage', label: 'Mileage', type: 'number' },
  { name: 'year', label: 'Year', type: 'number' },
]

export default function CustomFieldsSettingsPage() {
  const [customFields, setCustomFields] = useState(initialCustomFields)
  const [showAddFieldModal, setShowAddFieldModal] = useState(false)
  const [editingField, setEditingField] = useState<any>(null)
  
  const [newField, setNewField] = useState({
    name: '',
    type: 'text',
    required: false,
    options: [''],
    formula: ''
  })

  // Add or update field
  const handleSaveField = () => {
    if (!newField.name.trim()) {
      alert('Please enter a field name')
      return
    }

    if (newField.type === 'formula' && !newField.formula.trim()) {
      alert('Please enter a formula')
      return
    }

    const field: any = {
      id: editingField?.id || Date.now().toString(),
      name: newField.name,
      type: newField.type,
      required: newField.required,
    }

    if (newField.type === 'select') {
      field.options = newField.options.filter(o => o.trim())
    }

    if (newField.type === 'formula') {
      field.formula = newField.formula
    }

    if (editingField) {
      // Update existing field
      setCustomFields(prev => prev.map(f => f.id === editingField.id ? field : f))
    } else {
      // Add new field
      setCustomFields(prev => [...prev, field])
    }

    // Reset form
    setNewField({
      name: '',
      type: 'text',
      required: false,
      options: [''],
      formula: ''
    })
    setEditingField(null)
    setShowAddFieldModal(false)
  }

  // Delete field
  const handleDeleteField = (fieldId: string) => {
    const field = customFields.find(f => f.id === fieldId)
    if (field && confirm(`Delete custom field "${field.name}"? This will remove it from all vehicles.`)) {
      setCustomFields(prev => prev.filter(f => f.id !== fieldId))
    }
  }

  // Edit field
  const handleEditField = (field: any) => {
    setEditingField(field)
    setNewField({
      name: field.name,
      type: field.type,
      required: field.required || false,
      options: field.options || [''],
      formula: field.formula || ''
    })
    setShowAddFieldModal(true)
  }

  // Insert field reference into formula
  const insertFieldReference = (fieldName: string) => {
    setNewField(prev => ({
      ...prev,
      formula: prev.formula + `{${fieldName}}`
    }))
  }

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type className="h-4 w-4" />
      case 'number': return <Hash className="h-4 w-4" />
      case 'boolean': return <ToggleLeft className="h-4 w-4" />
      case 'date': return <CalendarPlus className="h-4 w-4" />
      case 'select': return <ListOrdered className="h-4 w-4" />
      case 'formula': return <Calculator className="h-4 w-4" />
      default: return <Type className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/settings" 
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Settings2 className="h-8 w-8 mr-3 text-gray-600" />
                  Custom Fields
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage custom fields for all vehicles in your inventory
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingField(null)
                setNewField({
                  name: '',
                  type: 'text',
                  required: false,
                  options: [''],
                  formula: ''
                })
                setShowAddFieldModal(true)
              }}
              className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-xl">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Field Definitions</h2>
          </div>
          
          {customFields.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {customFields.map((field) => (
                <li key={field.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-400">
                        {getFieldIcon(field.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {field.name}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        <p className="text-xs text-gray-500">
                          Type: {field.type}
                          {field.options && ` • Options: ${field.options.join(', ')}`}
                          {field.formula && ` • Formula: ${field.formula}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditField(field)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteField(field.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-12 text-center">
              <Settings2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No custom fields</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new custom field.</p>
            </div>
          )}
        </div>

        {/* Formula Fields Info */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">About Formula Fields</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Formula fields automatically calculate values based on other fields. You can:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Use basic math operators: +, -, *, /, ()</li>
                  <li>Reference other fields with curly braces: {'{purchasePrice}'}</li>
                  <li>Create complex calculations for margins, costs, ratios, etc.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Field Modal */}
      {showAddFieldModal && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-40 transition-opacity"
            onClick={() => {
              setShowAddFieldModal(false)
              setEditingField(null)
            }}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 pointer-events-auto">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    onClick={() => {
                      setShowAddFieldModal(false)
                      setEditingField(null)
                    }}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <Settings2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editingField ? 'Edit Custom Field' : 'Add Custom Field'}
                    </h3>
                  </div>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Field Name</label>
                      <input
                        type="text"
                        value={newField.name}
                        onChange={(e) => setNewField({...newField, name: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Total Cost"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Field Type</label>
                      <select
                        value={newField.type}
                        onChange={(e) => setNewField({...newField, type: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="boolean">Yes/No</option>
                        <option value="select">Dropdown</option>
                        <option value="formula">Formula (Calculated)</option>
                      </select>
                    </div>

                    {newField.type === 'select' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Options (one per line)</label>
                        <textarea
                          value={newField.options.join('\n')}
                          onChange={(e) => setNewField({...newField, options: e.target.value.split('\n')})}
                          rows={4}
                          className="mt-1 block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Option 1&#10;Option 2&#10;Option 3"
                        />
                      </div>
                    )}

                    {newField.type === 'formula' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Formula</label>
                        <textarea
                          value={newField.formula}
                          onChange={(e) => setNewField({...newField, formula: e.target.value})}
                          rows={3}
                          className="mt-1 block w-full px-3 py-2 text-gray-900 font-mono text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., {purchasePrice} + {totalExpenses}"
                        />
                        <div className="mt-2">
                          <p className="text-xs text-gray-600 mb-2">Click to insert field references:</p>
                          <div className="flex flex-wrap gap-2">
                            {availableFormulaFields.map((field) => (
                              <button
                                key={field.name}
                                type="button"
                                onClick={() => insertFieldReference(field.name)}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                              >
                                {field.label}
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            You can also reference any custom number fields by their name in curly braces.
                          </p>
                        </div>
                      </div>
                    )}

                    {newField.type !== 'formula' && (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="required"
                          checked={newField.required}
                          onChange={(e) => setNewField({...newField, required: e.target.checked})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="required" className="ml-2 block text-sm text-gray-900">
                          Required field
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleSaveField}
                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingField ? 'Update Field' : 'Add Field'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddFieldModal(false)
                      setEditingField(null)
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 