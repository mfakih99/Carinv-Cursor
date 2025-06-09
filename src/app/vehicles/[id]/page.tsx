'use client'

import Navigation from '@/components/layout/Navigation'
import { 
  Car, 
  Calendar, 
  DollarSign, 
  FileText, 
  MapPin, 
  Gauge, 
  Settings,
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Clock,
  User
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use } from 'react'

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
  const vehicle = vehicleData
  const router = useRouter()
  
  // Debug logging for all button clicks
  const handleEdit = () => {
    console.log('[DEBUG] Edit button clicked for vehicle:', id)
    // TODO: Navigate to edit page
    router.push(`/vehicles/${id}/edit`)
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
  
  return (
    <div>
      <Navigation />
      
      {/* Header with back button and actions */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/vehicles" 
                className="text-gray-400 hover:text-gray-500"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <p className="text-sm text-gray-500">VIN: {vehicle.vin}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleEdit}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button 
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Photos</h2>
              <div className="grid grid-cols-3 gap-4">
                {vehicle.photos.map((photo) => (
                  <div key={photo.id} className="aspect-square bg-gray-200 rounded-lg relative">
                    {photo.isPrimary && (
                      <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        Primary
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Car className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                ))}
                <button 
                  onClick={handleAddPhoto}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400"
                >
                  <Plus className="h-8 w-8 text-gray-400" />
                </button>
              </div>
            </div>
            
            {/* Vehicle Details */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Vehicle Details</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Make</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.make}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Model</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.model}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Year</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.year}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Trim</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.trim}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Body Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.bodyType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Color</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.color}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Mileage</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.mileage.toLocaleString()} mi</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Engine</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.engineType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Transmission</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.transmission}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Drivetrain</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.drivetrain}</dd>
                </div>
              </dl>
            </div>
            
            {/* Expenses */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Expenses</h2>
                <button 
                  onClick={handleAddExpense}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  <Plus className="h-4 w-4 inline mr-1" />
                  Add Expense
                </button>
              </div>
              <div className="space-y-3">
                {vehicle.expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                      <p className="text-xs text-gray-500">{expense.category} • {expense.date}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ${expense.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Total Expenses</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${vehicle.totalExpenses.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Activity/Notes */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Activity & Notes</h2>
                <button 
                  onClick={handleAddNote}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  <Plus className="h-4 w-4 inline mr-1" />
                  Add Note
                </button>
              </div>
              <div className="space-y-4">
                {vehicle.notes.map((note) => (
                  <div key={note.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-1.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{note.user}</span>
                        <span className="text-xs text-gray-500">{note.createdAt}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{note.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Status & Quick Info */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Status & Pricing</h3>
              <div className="space-y-4">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'Sold' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Purchase Price</span>
                    <span className="text-sm font-medium">${vehicle.purchasePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Expenses</span>
                    <span className="text-sm font-medium">${vehicle.totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Cost</span>
                    <span className="text-sm font-medium">${(vehicle.purchasePrice + vehicle.totalExpenses).toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Listing Price</span>
                      <span className="text-lg font-bold text-gray-900">${vehicle.listingPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500">Est. Profit</span>
                      <span className={`text-sm font-medium ${vehicle.estimatedProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${vehicle.estimatedProfit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location & Dates */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Dates</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-500">Location:</span>
                  <span className="ml-2 font-medium">{vehicle.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-500">Purchase Date:</span>
                  <span className="ml-2 font-medium">{vehicle.purchaseDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-500">Days in Inventory:</span>
                  <span className="ml-2 font-medium">{vehicle.daysInInventory} days</span>
                </div>
              </div>
            </div>
            
            {/* Documents */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Documents</h3>
                <button 
                  onClick={handleUploadDocument}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {vehicle.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size} • {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownloadDocument(doc.id, doc.name)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Download className="h-4 w-4" />
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