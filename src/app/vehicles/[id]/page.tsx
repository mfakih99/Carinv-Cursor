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
  Building2
} from 'lucide-react'
import Link from 'next/link'
import { use, useState } from 'react'

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
    { id: '1', category: 'REPAIR', amount: 1500, description: 'Engine service', date: '2024-01-17' },
    { id: '2', category: 'DETAILING', amount: 300, description: 'Full detail', date: '2024-01-18' },
    { id: '3', category: 'TRANSPORTATION', amount: 200, description: 'Transport from auction', date: '2024-01-16' },
    { id: '4', category: 'INSPECTION', amount: 500, description: 'Pre-purchase inspection', date: '2024-01-15' },
  ],
  
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
  ]
}

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // In real app, fetch vehicle data using params.id
  const { id } = use(params)
  
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedData, setEditedData] = useState(vehicleData)
  
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
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const handleDelete = () => {
    console.log('[DEBUG] Delete button clicked for vehicle:', id)
    // TODO: Show confirmation dialog and delete
    if (confirm('Are you sure you want to delete this vehicle?')) {
      console.log('[DEBUG] User confirmed deletion')
      // TODO: Call delete API
    }
  }
  
  const handleAddExpense = () => {
    console.log('[DEBUG] Add Expense button clicked')
    // TODO: Show expense modal or navigate
  }
  
  const handleAddNote = () => {
    console.log('[DEBUG] Add Note button clicked')
    // TODO: Show note modal or form
  }
  
  const handleAddPhoto = () => {
    console.log('[DEBUG] Add Photo button clicked')
    // TODO: Show photo upload modal
  }
  
  const handleUploadDocument = () => {
    console.log('[DEBUG] Upload Document button clicked')
    // TODO: Show document upload modal
  }
  
  const handleDownloadDocument = (docId: string, docName: string) => {
    console.log('[DEBUG] Download button clicked for document:', docId, docName)
    // TODO: Trigger document download
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
                  <Car className="h-5 w-5 mr-2 text-gray-600" />
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
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-900">{vehicle.drivetrain}</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            
            {/* Expenses */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                  Expenses
                </h2>
                <button 
                  onClick={handleAddExpense}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Expense
                </button>
              </div>
              <div className="space-y-3">
                {vehicle.expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{expense.date}</p>
                      </div>
                    </div>
                    <span className="text-base font-semibold text-gray-900">
                      ${expense.amount.toLocaleString()}
                    </span>
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
                  onClick={handleAddNote}
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
                      className="block w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                    <span className="text-base font-semibold text-gray-900">${vehicle.purchasePrice.toLocaleString()}</span>
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
                            className="pl-8 w-36 px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                          className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
    </div>
  )
} 