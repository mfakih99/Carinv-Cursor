'use client'

import Navigation from '@/components/layout/Navigation'
import { 
  Users, 
  Plus, 
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Car,
  DollarSign,
  Edit,
  Trash2,
  MessageSquare,
  FileText,
  TrendingUp,
  UserPlus,
  Filter
} from 'lucide-react'
import { useState } from 'react'

// Mock data
const mockCustomers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, ST 12345',
    type: 'buyer',
    status: 'active',
    createdAt: '2024-01-10',
    lastContact: '2024-01-20',
    totalPurchases: 2,
    totalSpent: 45000,
    vehicles: [
      { id: '1', name: '2023 Honda Accord', purchaseDate: '2024-01-15', price: 28500 },
      { id: '2', name: '2022 Toyota Camry', purchaseDate: '2023-12-20', price: 16500 }
    ],
    notes: [
      { id: '1', content: 'Interested in sedans, prefers low mileage', date: '2024-01-10' },
      { id: '2', content: 'Referred by Mike Johnson', date: '2024-01-12' }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, Somewhere, ST 67890',
    type: 'seller',
    status: 'active',
    createdAt: '2024-01-08',
    lastContact: '2024-01-18',
    totalPurchases: 0,
    totalSpent: 0,
    vehicles: [],
    notes: [
      { id: '3', content: 'Has a fleet of trucks to sell', date: '2024-01-08' }
    ]
  },
  {
    id: '3',
    name: 'Robert Davis',
    email: 'rdavis@business.com',
    phone: '(555) 345-6789',
    address: '789 Business Blvd, Commerce City, ST 11111',
    type: 'both',
    status: 'active',
    createdAt: '2023-12-15',
    lastContact: '2024-01-22',
    totalPurchases: 3,
    totalSpent: 75000,
    vehicles: [
      { id: '3', name: '2023 Ford F-150', purchaseDate: '2024-01-05', price: 35000 },
      { id: '4', name: '2023 Chevrolet Silverado', purchaseDate: '2023-12-28', price: 40000 }
    ],
    notes: [
      { id: '4', content: 'Commercial buyer, needs work trucks', date: '2023-12-15' },
      { id: '5', content: 'Also sells trade-ins', date: '2024-01-05' }
    ]
  }
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  
  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm)
    const matchesType = selectedType === 'all' || customer.type === selectedType || 
                       (selectedType === 'both' && customer.type === 'both')
    return matchesSearch && matchesType
  })
  
  // Stats
  const stats = {
    total: customers.length,
    buyers: customers.filter(c => c.type === 'buyer' || c.type === 'both').length,
    sellers: customers.filter(c => c.type === 'seller' || c.type === 'both').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0)
  }
  
  const handleDeleteCustomer = (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id))
      if (selectedCustomer?.id === id) {
        setSelectedCustomer(null)
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
              <p className="mt-2 text-gray-600">Manage your customer relationships and sales history</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add Customer
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Buyers</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.buyers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sellers</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{stats.sellers}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-4 border-b">
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="buyer">Buyers</option>
                    <option value="seller">Sellers</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedCustomer?.id === customer.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900">{customer.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{customer.email}</p>
                        <p className="text-xs text-gray-500">{customer.phone}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            customer.type === 'buyer' ? 'bg-green-100 text-green-800' :
                            customer.type === 'seller' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {customer.type}
                          </span>
                          {customer.totalPurchases > 0 && (
                            <span className="text-xs text-gray-500">
                              {customer.totalPurchases} purchases
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Customer Details */}
          <div className="lg:col-span-2">
            {selectedCustomer ? (
              <div className="space-y-6">
                {/* Customer Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                      <p className="text-gray-600 mt-1">Customer since {selectedCustomer.createdAt}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{selectedCustomer.phone}</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <span className="text-gray-600">{selectedCustomer.address}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Total Spent:</span>
                        <span className="font-semibold text-gray-900">${selectedCustomer.totalSpent.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Purchases:</span>
                        <span className="font-semibold text-gray-900">{selectedCustomer.totalPurchases}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Last Contact:</span>
                        <span className="font-semibold text-gray-900">{selectedCustomer.lastContact}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t">
                    <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </button>
                    <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </button>
                    <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Note
                    </button>
                  </div>
                </div>
                
                {/* Purchase History */}
                {selectedCustomer.vehicles.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Car className="h-5 w-5 mr-2" />
                      Purchase History
                    </h3>
                    <div className="space-y-3">
                      {selectedCustomer.vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{vehicle.name}</p>
                            <p className="text-sm text-gray-500">Purchased: {vehicle.purchaseDate}</p>
                          </div>
                          <span className="font-semibold text-gray-900">${vehicle.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Notes */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Notes
                    </h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      <Plus className="h-4 w-4 inline mr-1" />
                      Add Note
                    </button>
                  </div>
                  <div className="space-y-3">
                    {selectedCustomer.notes.map((note) => (
                      <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{note.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a customer to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 