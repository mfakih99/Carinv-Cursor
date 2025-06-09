'use client'

import Navigation from '@/components/layout/Navigation'
import { 
  Car, 
  Calendar, 
  FileText, 
  MapPin, 
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Clock,
  User,
  Save,
  X,
  DollarSign,
  Hash,
  Palette,
  Gauge,
  Fuel,
  Settings2,
  Package,
  CalendarDays,
  Building2,
  Camera,
  Type,
  ListOrdered,
  ToggleLeft,
  CalendarPlus,
  Calculator,
  Receipt,
  Paperclip,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import { use, useState } from 'react'
import { evaluateFormula } from '@/utils/formulaEvaluator'

// Define proper type for custom fields
type CustomField = {
  id: string
  name: string
  type: string
  required: boolean
  options?: string[]
  formula?: string
}

// Define type for receipt
type Receipt = {
  id: string
  name: string
  url: string
  size: string
  uploadedAt: string
}

// Define type for expense
type Expense = {
  id: string
  category: string
  amount: number
  description: string
  date: string
  receipts: Receipt[]
}

// Global custom field definitions - in real app, this would come from database/settings
const globalCustomFields: CustomField[] = [
  { id: '1', name: 'Previous Owner', type: 'text', required: false },
  { id: '2', name: 'Warranty Expires', type: 'date', required: false },
  { id: '3', name: 'Has Service Records', type: 'boolean', required: false },
  { id: '4', name: 'Number of Keys', type: 'number', required: false },
  { id: '5', name: 'Vehicle Source', type: 'select', required: true, options: ['Auction', 'Trade-In', 'Private Sale', 'Dealer'] },
  // Example calculated fields
  { id: '6', name: 'Total Cost', type: 'formula', formula: '{purchasePrice} + {totalExpenses}', required: false },
  { id: '7', name: 'Profit Margin %', type: 'formula', formula: '(({listingPrice} - {purchasePrice} - {totalExpenses}) / {listingPrice}) * 100', required: false },
]

// Mock data - will be replaced with real database query
const vehicleData = {
  id: '1',
  vin: '1HGCM82633A123456',
  make: 'Honda',
  model: 'Accord',
  year: 2023,
  trim: 'EX-L',
  bodyType: 'Sedan',
  color: 'Silver',
  mileage: 15000,
  engineType: '1.5L Turbo',
  transmission: 'CVT',
  drivetrain: 'FWD',
  status: 'Available',
  purchaseDate: '2024-01-15',
  purchasePrice: 25000,
  purchaseLocation: 'Auto Auction',
  listingPrice: 28500,
  location: 'Lot A',
  createdAt: '2024-01-15',
  updatedAt: '2024-01-20',
  daysInInventory: 12,
  
  // Financial summary
  totalExpenses: 2500,
  estimatedProfit: 1000,
  
  // Related data
  expenses: [
    { id: '1', category: 'REPAIR', amount: 1500, description: 'Engine service', date: '2024-01-17', receipts: [] as Receipt[] },
    { id: '2', category: 'DETAILING', amount: 300, description: 'Full detail', date: '2024-01-18', receipts: [] as Receipt[] },
    { id: '3', category: 'TRANSPORTATION', amount: 200, description: 'Transport from auction', date: '2024-01-16', receipts: [] as Receipt[] },
    { id: '4', category: 'INSPECTION', amount: 500, description: 'Pre-purchase inspection', date: '2024-01-15', receipts: [] as Receipt[] },
  ] as Expense[],
  
  notes: [
    { id: '1', content: 'Vehicle in excellent condition, minor scratches on rear bumper', createdAt: '2024-01-15', user: 'John Doe' },
    { id: '2', content: 'Oil change completed, new air filter installed', createdAt: '2024-01-17', user: 'Mike Smith' },
    { id: '3', content: 'Detail completed, ready for showroom', createdAt: '2024-01-18', user: 'Sarah Johnson' },
  ],
  
  documents: [
    { id: '1', name: 'Title Document', type: 'TITLE', uploadedAt: '2024-01-15', size: '2.5 MB' },
    { id: '2', name: 'Purchase Agreement', type: 'PURCHASE_AGREEMENT', uploadedAt: '2024-01-15', size: '1.2 MB' },
    { id: '3', name: 'Inspection Report', type: 'INSPECTION_REPORT', uploadedAt: '2024-01-15', size: '3.8 MB' },
  ],
  
  photos: [
    { id: '1', url: '/placeholder-car-1.jpg', caption: 'Front view', isPrimary: true },
    { id: '2', url: '/placeholder-car-2.jpg', caption: 'Side view' },
    { id: '3', url: '/placeholder-car-3.jpg', caption: 'Interior' },
  ],
  
  // Custom field values (only values, not definitions)
  customFieldValues: {
    '1': 'Private Seller',
    '2': '2026-01-15',
    '3': 'true',
    '4': '2',
    '5': 'Auction'
  } as Record<string, string>
}

// Expense categories
const expenseCategories = [
  { value: 'PURCHASE', label: 'Purchase' },
  { value: 'REPAIR', label: 'Repair' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'TRANSPORTATION', label: 'Transportation' },
  { value: 'DETAILING', label: 'Detailing' },
  { value: 'PARTS', label: 'Parts' },
  { value: 'FEES', label: 'Fees' },
  { value: 'INSPECTION', label: 'Inspection' },
  { value: 'OTHER', label: 'Other' }
]

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // In real app, fetch vehicle data using params.id
  const { id } = use(params)
  
  // State for custom fields (in real app, would be fetched from global settings)
  const [customFields, setCustomFields] = useState(globalCustomFields)
  
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedData, setEditedData] = useState(vehicleData)
  
  // State for modals
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false)
  const [showAddCustomFieldModal, setShowAddCustomFieldModal] = useState(false)
  const [showManageFieldsModal, setShowManageFieldsModal] = useState(false)
  const [showReceiptsModal, setShowReceiptsModal] = useState(false)
  const [currentExpenseId, setCurrentExpenseId] = useState<string | null>(null)
  
  // State for new expense/note forms
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receipts: [] as Receipt[]
  })
  
  const [newNote, setNewNote] = useState('')
  
  // State for new custom field
  const [newCustomField, setNewCustomField] = useState({
    name: '',
    type: 'text',
    required: false,
    options: [''], // For select type
    formula: '' // For formula type
  })
  
  // Toggle edit mode
  const handleEdit = () => {
    console.log('[DEBUG] Edit mode toggled:', !isEditMode)
    setIsEditMode(!isEditMode)
    if (isEditMode) {
      // Reset changes if canceling
      setEditedData(vehicleData)
    }
  }
  
  // Save changes
  const handleSave = () => {
    console.log('[DEBUG] Saving changes:', editedData)
    // TODO: Call API to save changes
    setIsEditMode(false)
    // In real app, would update vehicleData with response
  }
  
  // Handle field changes
  const handleFieldChange = (field: string, value: string | number) => {
    setEditedData(prev => {
      const updatedData = {
        ...prev,
        [field]: value
      }
      
      // Recalculate profit if pricing fields changed
      if (field === 'purchasePrice' || field === 'listingPrice') {
        updatedData.estimatedProfit = Number(updatedData.listingPrice) - Number(updatedData.purchasePrice) - Number(updatedData.totalExpenses)
      }
      
      return updatedData
    })
  }
  
  // Handle expense changes
  const handleExpenseChange = (expenseId: string, field: string, value: string | number) => {
    setEditedData(prev => {
      const updatedExpenses = prev.expenses.map(exp => 
        exp.id === expenseId ? { ...exp, [field]: value } : exp
      )
      
      // Recalculate total if amount changed
      const newTotal = field === 'amount' 
        ? updatedExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0)
        : prev.totalExpenses
      
      return {
        ...prev,
        expenses: updatedExpenses,
        totalExpenses: newTotal,
        estimatedProfit: prev.listingPrice - prev.purchasePrice - newTotal
      }
    })
  }
  
  // Delete expense
  const handleDeleteExpense = (expenseId: string) => {
    const expense = editedData.expenses.find(e => e.id === expenseId)
    if (expense && confirm(`Delete expense: ${expense.description}?`)) {
      setEditedData(prev => {
        const newTotal = prev.totalExpenses - expense.amount
        return {
          ...prev,
          expenses: prev.expenses.filter(e => e.id !== expenseId),
          totalExpenses: newTotal,
          estimatedProfit: prev.listingPrice - prev.purchasePrice - newTotal
        }
      })
    }
  }
  
  // Add new expense
  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.amount || !newExpense.description) {
      alert('Please fill in all fields')
      return
    }
    
    const expense = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: Number(newExpense.amount),
      description: newExpense.description,
      date: newExpense.date,
      receipts: newExpense.receipts
    }
    
    setEditedData(prev => {
      const newTotal = prev.totalExpenses + expense.amount
      return {
        ...prev,
        expenses: [...prev.expenses, expense],
        totalExpenses: newTotal,
        estimatedProfit: prev.listingPrice - prev.purchasePrice - newTotal
      }
    })
    
    // Reset form and close modal
    setNewExpense({
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      receipts: []
    })
    setShowAddExpenseModal(false)
    
    // Auto-enable edit mode if not already in it
    if (!isEditMode) {
      setIsEditMode(true)
    }
  }
  
  // Add new note
  const handleAddNote = () => {
    if (!newNote.trim()) {
      alert('Please enter a note')
      return
    }
    
    const note = {
      id: Date.now().toString(),
      content: newNote,
      createdAt: new Date().toISOString().split('T')[0],
      user: 'Current User' // In real app, get from auth
    }
    
    setEditedData(prev => ({
      ...prev,
      notes: [...prev.notes, note]
    }))
    
    // Reset form and close modal
    setNewNote('')
    setShowAddNoteModal(false)
    
    // Auto-enable edit mode if not already in it
    if (!isEditMode) {
      setIsEditMode(true)
    }
  }
  
  // Delete note
  const handleDeleteNote = (noteId: string) => {
    if (confirm('Delete this note?')) {
      setEditedData(prev => ({
        ...prev,
        notes: prev.notes.filter(n => n.id !== noteId)
      }))
    }
  }
  
  const handleDelete = () => {
    console.log('[DEBUG] Delete button clicked for vehicle:', id)
    // TODO: Show confirmation dialog and delete
    if (confirm('Are you sure you want to delete this vehicle?')) {
      console.log('[DEBUG] User confirmed deletion')
      // TODO: Call delete API
    }
  }
  
  // Delete photo
  const handleDeletePhoto = (photoId: string) => {
    if (confirm('Delete this photo?')) {
      setEditedData(prev => ({
        ...prev,
        photos: prev.photos.filter(p => p.id !== photoId)
      }))
      
      // Auto-enable edit mode if not already in it
      if (!isEditMode) {
        setIsEditMode(true)
      }
    }
  }
  
  // Set primary photo
  const handleSetPrimaryPhoto = (photoId: string) => {
    setEditedData(prev => ({
      ...prev,
      photos: prev.photos.map(p => ({
        ...p,
        isPrimary: p.id === photoId
      }))
    }))
    
    // Auto-enable edit mode if not already in it
    if (!isEditMode) {
      setIsEditMode(true)
    }
  }
  
  // Add new custom field (global)
  const handleAddCustomField = () => {
    if (!newCustomField.name.trim()) {
      alert('Please enter a field name')
      return
    }
    
    const field: CustomField = {
      id: Date.now().toString(),
      name: newCustomField.name,
      type: newCustomField.type,
      required: newCustomField.required,
      options: newCustomField.type === 'select' ? newCustomField.options.filter(o => o.trim()) : undefined,
      formula: newCustomField.type === 'formula' ? newCustomField.formula : undefined
    }
    
    // Add to global custom fields
    setCustomFields(prev => [...prev, field])
    
    // Initialize value for all vehicles (in real app, this would be an API call)
    // For this vehicle, initialize the value
    setEditedData(prev => ({
      ...prev,
      customFieldValues: {
        ...prev.customFieldValues,
        [field.id]: field.type === 'boolean' ? 'false' : ''
      }
    }))
    
    // Reset form and close modal
    setNewCustomField({
      name: '',
      type: 'text',
      required: false,
      options: [''],
      formula: ''
    })
    setShowAddCustomFieldModal(false)
    
    // Show success message
    alert(`Custom field "${field.name}" has been added to all vehicles`)
  }
  
  // Delete custom field (global)
  const handleDeleteCustomField = (fieldId: string) => {
    const field = customFields.find(f => f.id === fieldId)
    if (field && confirm(`Delete custom field "${field.name}" from ALL vehicles? This action cannot be undone.`)) {
      // Remove from global fields
      setCustomFields(prev => prev.filter(f => f.id !== fieldId))
      
      // Remove values from all vehicles (in real app, this would be an API call)
      setEditedData(prev => {
        const newValues = { ...prev.customFieldValues }
        delete newValues[fieldId]
        return {
          ...prev,
          customFieldValues: newValues
        }
      })
    }
  }
  
  // Update custom field value for this vehicle
  const handleCustomFieldValueChange = (fieldId: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      customFieldValues: {
        ...prev.customFieldValues,
        [fieldId]: value
      }
    }))
  }
  
  const handleAddPhoto = () => {
    console.log('[DEBUG] Add Photo button clicked')
    setShowAddPhotoModal(true)
  }
  
  const handleUploadDocument = () => {
    console.log('[DEBUG] Upload Document button clicked')
    // TODO: Show document upload modal
  }
  
  const handleDownloadDocument = (docId: string, docName: string) => {
    console.log('[DEBUG] Download button clicked for document:', docId, docName)
    // TODO: Trigger document download
  }
  
  // Handle receipt upload
  const handleUploadReceipt = (expenseId: string) => {
    setCurrentExpenseId(expenseId)
    // In real app, this would open a file upload dialog
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,application/pdf'
    input.multiple = true
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        // Process files and add to expense
        const receipts = Array.from(files).map((file, index) => ({
          id: Date.now().toString() + index,
          name: file.name,
          url: URL.createObjectURL(file),
          size: `${(file.size / 1024).toFixed(1)} KB`,
          uploadedAt: new Date().toISOString().split('T')[0]
        }))
        
        setEditedData(prev => ({
          ...prev,
          expenses: prev.expenses.map(exp => 
            exp.id === expenseId 
              ? { ...exp, receipts: [...(exp.receipts || []), ...receipts] }
              : exp
          )
        }))
        
        // Auto-enable edit mode if not already in it
        if (!isEditMode) {
          setIsEditMode(true)
        }
      }
    }
    input.click()
  }
  
  // Handle view receipts
  const handleViewReceipts = (expenseId: string) => {
    setCurrentExpenseId(expenseId)
    setShowReceiptsModal(true)
  }
  
  // Handle delete receipt
  const handleDeleteReceipt = (expenseId: string, receiptId: string) => {
    if (confirm('Delete this receipt?')) {
      setEditedData(prev => ({
        ...prev,
        expenses: prev.expenses.map(exp => 
          exp.id === expenseId 
            ? { ...exp, receipts: exp.receipts?.filter(r => r.id !== receiptId) || [] }
            : exp
        )
      }))
    }
  }
  
  // Use editedData when in edit mode, otherwise use original data
  const vehicle = isEditMode ? editedData : vehicleData
  
  // Category colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'REPAIR': 'bg-red-100 text-red-800 border-red-200',
      'DETAILING': 'bg-blue-100 text-blue-800 border-blue-200',
      'TRANSPORTATION': 'bg-purple-100 text-purple-800 border-purple-200',
      'INSPECTION': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'PARTS': 'bg-orange-100 text-orange-800 border-orange-200',
      'FEES': 'bg-gray-100 text-gray-800 border-gray-200',
      'PURCHASE': 'bg-green-100 text-green-800 border-green-200',
      'MAINTENANCE': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'OTHER': 'bg-gray-100 text-gray-800 border-gray-200',
    }
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200'
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header with back button and actions */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/vehicles" 
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-500 font-mono">VIN: {vehicle.vin}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isEditMode ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all shadow-sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                  <button 
                    onClick={handleEdit}
                    className="inline-flex items-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleEdit}
                    className="inline-flex items-center px-4 py-2.5 border border-blue-600 text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEditMode && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <Edit className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  <strong className="font-semibold">Edit Mode:</strong> Make your changes and click Save to update, or Cancel to discard changes.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-gray-600" />
                  Photos
                </h2>
                <span className="text-sm text-gray-500">{vehicle.photos.length} images</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {vehicle.photos.map((photo) => (
                  <div key={photo.id} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden group hover:shadow-md transition-all">
                    {photo.isPrimary && (
                      <span className="absolute top-2 left-2 px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md shadow-sm z-10">
                        Primary
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Car className="h-16 w-16 text-gray-400" />
                    </div>
                    {isEditMode && (
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex items-center space-x-2">
                          {!photo.isPrimary && (
                            <button
                              onClick={() => handleSetPrimaryPhoto(photo.id)}
                              className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                              title="Set as primary"
                            >
                              <Camera className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-all"
                            title="Delete photo"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <button 
                  onClick={handleAddPhoto}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <Plus className="h-10 w-10 text-gray-400 group-hover:text-blue-600" />
                </button>
              </div>
            </div>
            
            {/* Vehicle Details */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Settings2 className="h-5 w-5 mr-2 text-gray-600" />
                Vehicle Details
              </h2>
              <dl className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600 flex items-center">
                    <Building2 className="h-4 w-4 mr-1.5 text-gray-400" />
                    Make
                  </dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={vehicle.make}
                        onChange={(e) => handleFieldChange('make', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.make}</span>
                    )}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600 flex items-center">
                    <Package className="h-4 w-4 mr-1.5 text-gray-400" />
                    Model
                  </dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={vehicle.model}
                        onChange={(e) => handleFieldChange('model', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.model}</span>
                    )}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600 flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1.5 text-gray-400" />
                    Year
                  </dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="number"
                        value={vehicle.year}
                        onChange={(e) => handleFieldChange('year', parseInt(e.target.value))}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.year}</span>
                    )}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600">Trim</dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={vehicle.trim}
                        onChange={(e) => handleFieldChange('trim', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.trim}</span>
                    )}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600 flex items-center">
                    <Car className="h-4 w-4 mr-1.5 text-gray-400" />
                    Body Type
                  </dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={vehicle.bodyType}
                        onChange={(e) => handleFieldChange('bodyType', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.bodyType}</span>
                    )}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600 flex items-center">
                    <Palette className="h-4 w-4 mr-1.5 text-gray-400" />
                    Color
                  </dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={vehicle.color}
                        onChange={(e) => handleFieldChange('color', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.color}</span>
                    )}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600 flex items-center">
                    <Gauge className="h-4 w-4 mr-1.5 text-gray-400" />
                    Mileage
                  </dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="number"
                        value={vehicle.mileage}
                        onChange={(e) => handleFieldChange('mileage', parseInt(e.target.value))}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.mileage.toLocaleString()} mi</span>
                    )}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600 flex items-center">
                    <Fuel className="h-4 w-4 mr-1.5 text-gray-400" />
                    Engine
                  </dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={vehicle.engineType}
                        onChange={(e) => handleFieldChange('engineType', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.engineType}</span>
                    )}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600 flex items-center">
                    <Settings2 className="h-4 w-4 mr-1.5 text-gray-400" />
                    Transmission
                  </dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={vehicle.transmission}
                        onChange={(e) => handleFieldChange('transmission', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.transmission}</span>
                    )}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600">Drivetrain</dt>
                  <dd>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={vehicle.drivetrain}
                        onChange={(e) => handleFieldChange('drivetrain', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.drivetrain}</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            
            {/* Custom Fields Section */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Settings2 className="h-5 w-5 mr-2 text-gray-600" />
                  Custom Fields
                </h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowManageFieldsModal(true)}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Settings2 className="h-4 w-4 mr-1" />
                    Manage
                  </button>
                  <button 
                    onClick={() => setShowAddCustomFieldModal(true)}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Field
                  </button>
                </div>
              </div>
              {customFields.length > 0 ? (
                <dl className="grid grid-cols-2 gap-6">
                  {customFields.map((field) => (
                    <div key={field.id} className="space-y-1">
                      <dt className="text-sm font-medium text-gray-600 flex items-center">
                        {field.type === 'text' && <Type className="h-4 w-4 mr-1.5 text-gray-400" />}
                        {field.type === 'number' && <Hash className="h-4 w-4 mr-1.5 text-gray-400" />}
                        {field.type === 'boolean' && <ToggleLeft className="h-4 w-4 mr-1.5 text-gray-400" />}
                        {field.type === 'date' && <CalendarPlus className="h-4 w-4 mr-1.5 text-gray-400" />}
                        {field.type === 'select' && <ListOrdered className="h-4 w-4 mr-1.5 text-gray-400" />}
                        {field.type === 'formula' && <Calculator className="h-4 w-4 mr-1.5 text-gray-400" />}
                        {field.name}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </dt>
                      <dd>
                        {isEditMode ? (
                          <>
                            {field.type === 'text' && (
                              <input
                                type="text"
                                value={vehicle.customFieldValues?.[field.id] || ''}
                                onChange={(e) => handleCustomFieldValueChange(field.id, e.target.value)}
                                className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required={field.required}
                              />
                            )}
                            {field.type === 'number' && (
                              <input
                                type="number"
                                value={vehicle.customFieldValues?.[field.id] || ''}
                                onChange={(e) => handleCustomFieldValueChange(field.id, e.target.value)}
                                className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required={field.required}
                              />
                            )}
                            {field.type === 'date' && (
                              <input
                                type="date"
                                value={vehicle.customFieldValues?.[field.id] || ''}
                                onChange={(e) => handleCustomFieldValueChange(field.id, e.target.value)}
                                className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required={field.required}
                              />
                            )}
                            {field.type === 'boolean' && (
                              <select
                                value={vehicle.customFieldValues?.[field.id] || 'false'}
                                onChange={(e) => handleCustomFieldValueChange(field.id, e.target.value)}
                                className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required={field.required}
                              >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            )}
                            {field.type === 'select' && (
                              <select
                                value={vehicle.customFieldValues?.[field.id] || ''}
                                onChange={(e) => handleCustomFieldValueChange(field.id, e.target.value)}
                                className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required={field.required}
                              >
                                <option value="">Select...</option>
                                {field.options?.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            )}
                            {field.type === 'formula' && (
                              <div className="px-3 py-2 bg-gray-100 rounded-lg">
                                <span className="text-sm font-medium text-gray-900">
                                  {field.formula && evaluateFormula(field.formula, vehicle, vehicle.customFieldValues)}
                                </span>
                                <span className="text-xs text-gray-500 block mt-1">Calculated field</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-base font-medium text-gray-900">
                            {field.type === 'boolean' 
                              ? (vehicle.customFieldValues?.[field.id] === 'true' ? 'Yes' : 'No') 
                              : field.type === 'formula' && field.formula
                              ? evaluateFormula(field.formula, vehicle, vehicle.customFieldValues)
                              : (vehicle.customFieldValues?.[field.id] || '-')}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-gray-500 text-sm">No custom fields defined. Add fields that will be available for all vehicles.</p>
              )}
            </div>
            
            {/* Expenses */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                  Expenses
                </h2>
                <button 
                  onClick={() => setShowAddExpenseModal(true)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Expense
                </button>
              </div>
              <div className="space-y-3">
                {vehicle.expenses.map((expense) => (
                  <div key={expense.id} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {isEditMode ? (
                          <select
                            value={expense.category}
                            onChange={(e) => handleExpenseChange(expense.id, 'category', e.target.value)}
                            className="px-2 py-1 text-xs font-medium text-gray-900 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {expenseCategories.map(cat => (
                              <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                          </select>
                        ) : (
                          <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${getCategoryColor(expense.category)}`}>
                            {expense.category}
                          </div>
                        )}
                        <div className="flex-1">
                          {isEditMode ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={expense.description}
                                onChange={(e) => handleExpenseChange(expense.id, 'description', e.target.value)}
                                className="w-full px-2 py-1 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              <input
                                type="date"
                                value={expense.date}
                                onChange={(e) => handleExpenseChange(expense.id, 'date', e.target.value)}
                                className="px-2 py-1 text-xs text-gray-900 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          ) : (
                            <>
                              <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{expense.date}</p>
                            </>
                          )}
                          {/* Receipts section */}
                          <div className="mt-2 flex items-center space-x-2">
                            <button
                              onClick={() => handleUploadReceipt(expense.id)}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                            >
                              <Receipt className="h-3 w-3 mr-1" />
                              {expense.receipts && expense.receipts.length > 0 
                                ? `${expense.receipts.length} Receipt${expense.receipts.length > 1 ? 's' : ''}`
                                : 'Add Receipt'
                              }
                            </button>
                            {expense.receipts && expense.receipts.length > 0 && (
                              <button
                                onClick={() => handleViewReceipts(expense.id)}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {isEditMode ? (
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-1">$</span>
                            <input
                              type="number"
                              value={expense.amount}
                              onChange={(e) => handleExpenseChange(expense.id, 'amount', Number(e.target.value))}
                              className="w-24 px-2 py-1 text-sm font-semibold text-gray-900 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        ) : (
                          <span className="text-base font-semibold text-gray-900">
                            ${expense.amount.toLocaleString()}
                          </span>
                        )}
                        {isEditMode && (
                          <button 
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total Expenses</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${vehicle.totalExpenses.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Activity/Notes */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-600" />
                  Activity & Notes
                </h2>
                <button 
                  onClick={() => setShowAddNoteModal(true)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Note
                </button>
              </div>
              <div className="space-y-4">
                {vehicle.notes.map((note) => (
                  <div key={note.id} className="flex space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-900">{note.user}</span>
                        <span className="text-xs text-gray-500">{note.createdAt}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700 leading-relaxed">{note.content}</p>
                    </div>
                    {isEditMode && (
                      <button 
                        onClick={() => handleDeleteNote(note.id)}
                        className="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar - Right Side */}
          <div className="space-y-8">
            {/* Status & Quick Info */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                Status & Pricing
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Status</label>
                  {isEditMode ? (
                    <select
                      value={vehicle.status}
                      onChange={(e) => handleFieldChange('status', e.target.value)}
                      className="block w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="Available">Available</option>
                      <option value="Sold">Sold</option>
                      <option value="In Repair">In Repair</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      vehicle.status === 'Available' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' :
                      vehicle.status === 'Sold' ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                      'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                    } shadow-sm`}>
                      {vehicle.status}
                    </span>
                  )}
                </div>
                
                <div className="space-y-4 bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Purchase Price</span>
                    {isEditMode ? (
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <input
                          type="number"
                          value={vehicle.purchasePrice}
                          onChange={(e) => handleFieldChange('purchasePrice', parseInt(e.target.value))}
                          className="pl-8 w-36 px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    ) : (
                      <span className="text-base font-semibold text-gray-900">${vehicle.purchasePrice.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Total Expenses</span>
                    <span className="text-base font-semibold text-gray-900">${vehicle.totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Total Cost</span>
                    <span className="text-base font-semibold text-gray-900">${(vehicle.purchasePrice + vehicle.totalExpenses).toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Listing Price</span>
                      {isEditMode ? (
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                          <input
                            type="number"
                            value={vehicle.listingPrice}
                            onChange={(e) => handleFieldChange('listingPrice', parseInt(e.target.value))}
                            className="pl-8 w-36 px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-blue-600">${vehicle.listingPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Est. Profit</span>
                      <span className={`text-lg font-bold ${vehicle.estimatedProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${vehicle.estimatedProfit > 0 ? '+' : ''}{vehicle.estimatedProfit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location & Dates */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                Location & Dates
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600 block mb-1">Current Location</span>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={vehicle.location}
                          onChange={(e) => handleFieldChange('location', e.target.value)}
                          className="w-full px-3 py-2 text-sm font-medium text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      ) : (
                        <span className="text-base font-semibold text-gray-900">{vehicle.location}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Purchase Date</span>
                      <span className="text-base font-semibold text-gray-900">{vehicle.purchaseDate}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Days in Inventory</span>
                      <span className="text-base font-semibold text-gray-900">{vehicle.daysInInventory} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Documents */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-600" />
                  Documents
                </h3>
                <button 
                  onClick={handleUploadDocument}
                  className="inline-flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Upload className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                {vehicle.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        doc.type === 'TITLE' ? 'bg-purple-100' :
                        doc.type === 'PURCHASE_AGREEMENT' ? 'bg-blue-100' :
                        'bg-green-100'
                      }`}>
                        <FileText className={`h-5 w-5 ${
                          doc.type === 'TITLE' ? 'text-purple-600' :
                          doc.type === 'PURCHASE_AGREEMENT' ? 'text-blue-600' :
                          'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size} • {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownloadDocument(doc.id, doc.name)}
                      className="inline-flex items-center justify-center w-10 h-10 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowAddExpenseModal(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add New Expense
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a category</option>
                        {expenseCategories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={newExpense.amount}
                          onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                          className="pl-8 block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <input
                        type="text"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    {/* Receipt Upload Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Receipts</label>
                      {newExpense.receipts.length > 0 ? (
                        <div className="space-y-2 mb-2">
                          {newExpense.receipts.map((receipt, index) => (
                            <div key={receipt.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Paperclip className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-700 truncate max-w-xs">{receipt.name}</span>
                                <span className="text-xs text-gray-500">({receipt.size})</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewExpense({
                                    ...newExpense,
                                    receipts: newExpense.receipts.filter((_, i) => i !== index)
                                  })
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = 'image/*,application/pdf'
                          input.multiple = true
                          input.onchange = (e) => {
                            const files = (e.target as HTMLInputElement).files
                            if (files && files.length > 0) {
                              const newReceipts = Array.from(files).map((file, index) => ({
                                id: Date.now().toString() + index,
                                name: file.name,
                                url: URL.createObjectURL(file),
                                size: `${(file.size / 1024).toFixed(1)} KB`,
                                uploadedAt: new Date().toISOString().split('T')[0]
                              }))
                              setNewExpense({
                                ...newExpense,
                                receipts: [...newExpense.receipts, ...newReceipts]
                              })
                            }
                          }
                          input.click()
                        }}
                        className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Receipt className="h-4 w-4 mr-1" />
                        {newExpense.receipts.length > 0 ? 'Add More Receipts' : 'Add Receipt'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAddExpense}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Expense
                </button>
                <button
                  onClick={() => setShowAddExpenseModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Note Modal */}
      {showAddNoteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowAddNoteModal(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add New Note
                  </h3>
                  <div className="mt-4">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={4}
                      className="block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your note here..."
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAddNote}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Note
                </button>
                <button
                  onClick={() => setShowAddNoteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Photo Modal */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowAddPhotoModal(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Camera className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add Vehicle Photos
                  </h3>
                  <div className="mt-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          // Handle file upload
                          console.log('Files selected:', e.target.files)
                          setShowAddPhotoModal(false)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowAddPhotoModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
            {/* Manage Custom Fields Modal */}
      {showManageFieldsModal && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-40 transition-opacity"
            onClick={() => setShowManageFieldsModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 pointer-events-auto">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    onClick={() => setShowManageFieldsModal(false)}
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
                      Manage Custom Fields
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      These fields are available for all vehicles in your inventory
                    </p>
                  </div>
                  <div className="mt-5">
                    {customFields.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {customFields.map((field) => (
                          <li key={field.id} className="py-3 flex items-center justify-between">
                            <div className="flex items-center">
                              {field.type === 'text' && <Type className="h-4 w-4 mr-2 text-gray-400" />}
                              {field.type === 'number' && <Hash className="h-4 w-4 mr-2 text-gray-400" />}
                              {field.type === 'boolean' && <ToggleLeft className="h-4 w-4 mr-2 text-gray-400" />}
                              {field.type === 'date' && <CalendarPlus className="h-4 w-4 mr-2 text-gray-400" />}
                              {field.type === 'select' && <ListOrdered className="h-4 w-4 mr-2 text-gray-400" />}
                              {field.type === 'formula' && <Calculator className="h-4 w-4 mr-2 text-gray-400" />}
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
                            <button
                              onClick={() => handleDeleteCustomField(field.id)}
                              className="ml-4 text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center text-gray-500 text-sm">No custom fields defined yet.</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 space-y-3">
                  <button
                    onClick={() => setShowManageFieldsModal(false)}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Done
                  </button>
                  <a
                    href="/settings/custom-fields"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
                  >
                    Go to Custom Fields Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Add Custom Field Modal */}
      {showAddCustomFieldModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowAddCustomFieldModal(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Settings2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add Custom Field
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    This field will be added to all vehicles in your inventory
                  </p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Field Name</label>
                      <input
                        type="text"
                        value={newCustomField.name}
                        onChange={(e) => setNewCustomField({...newCustomField, name: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Previous Owner"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Field Type</label>
                      <select
                        value={newCustomField.type}
                        onChange={(e) => setNewCustomField({...newCustomField, type: e.target.value})}
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
                    {newCustomField.type === 'select' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Options (one per line)</label>
                        <textarea
                          value={newCustomField.options.join('\n')}
                          onChange={(e) => setNewCustomField({...newCustomField, options: e.target.value.split('\n')})}
                          rows={4}
                          className="mt-1 block w-full px-3 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Option 1&#10;Option 2&#10;Option 3"
                        />
                      </div>
                    )}
                    {newCustomField.type === 'formula' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Formula</label>
                        <textarea
                          value={newCustomField.formula || ''}
                          onChange={(e) => setNewCustomField({...newCustomField, formula: e.target.value})}
                          rows={3}
                          className="mt-1 block w-full px-3 py-2 text-gray-900 font-mono text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., {purchasePrice} + {totalExpenses}"
                        />
                        <p className="mt-2 text-xs text-gray-500">
                          Available fields: {'{purchasePrice}'}, {'{listingPrice}'}, {'{totalExpenses}'}, {'{daysInInventory}'}, {'{mileage}'}, {'{year}'}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="required"
                        checked={newCustomField.required}
                        onChange={(e) => setNewCustomField({...newCustomField, required: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="required" className="ml-2 block text-sm text-gray-900">
                        Required field
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAddCustomField}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Field
                </button>
                <button
                  onClick={() => setShowAddCustomFieldModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Receipts Modal */}
      {showReceiptsModal && currentExpenseId && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-40 transition-opacity"
            onClick={() => setShowReceiptsModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 pointer-events-auto max-h-[80vh] overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    onClick={() => setShowReceiptsModal(false)}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <Receipt className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Expense Receipts
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {(() => {
                        const expense = vehicle.expenses.find(e => e.id === currentExpenseId)
                        return expense ? `${expense.description} - $${expense.amount.toLocaleString()}` : ''
                      })()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-5 overflow-y-auto flex-1">
                  {(() => {
                    const expense = vehicle.expenses.find(e => e.id === currentExpenseId)
                    const receipts = expense?.receipts || []
                    
                    if (receipts.length === 0) {
                      return (
                        <div className="text-center py-8">
                          <Receipt className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">No receipts uploaded yet</p>
                          <button
                            onClick={() => {
                              setShowReceiptsModal(false)
                              handleUploadReceipt(currentExpenseId)
                            }}
                            className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Upload Receipt
                          </button>
                        </div>
                      )
                    }
                    
                    return (
                      <div className="grid grid-cols-2 gap-4">
                        {receipts.map((receipt) => (
                          <div key={receipt.id} className="relative group">
                            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                              {receipt.url.endsWith('.pdf') ? (
                                <div className="h-full flex items-center justify-center">
                                  <FileText className="h-16 w-16 text-gray-400" />
                                </div>
                              ) : (
                                <img 
                                  src={receipt.url} 
                                  alt={receipt.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-900 truncate">{receipt.name}</p>
                              <p className="text-xs text-gray-500">{receipt.size} • {receipt.uploadedAt}</p>
                            </div>
                            {isEditMode && (
                              <button
                                onClick={() => handleDeleteReceipt(currentExpenseId, receipt.id)}
                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        {isEditMode && (
                          <button
                            onClick={() => {
                              setShowReceiptsModal(false)
                              handleUploadReceipt(currentExpenseId)
                            }}
                            className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all"
                          >
                            <Plus className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">Add More</span>
                          </button>
                        )}
                      </div>
                    )
                  })()}
                </div>
                
                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={() => setShowReceiptsModal(false)}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Done
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