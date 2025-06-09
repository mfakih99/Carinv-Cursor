'use client'

import Navigation from '@/components/layout/Navigation'
import { 
  FileText, 
  Upload, 
  Download, 
  Search,
  Filter,
  Calendar,
  Eye,
  Trash2,
  AlertCircle,
  File,
  FileImage,
  FileClock,
  CheckCircle,
  XCircle,
  Plus,
  Car
} from 'lucide-react'
import { useState } from 'react'

// Mock data
const mockDocuments = [
  { id: '1', name: 'Title Document - Honda Accord', type: 'TITLE', vehicleId: '1', vehicleName: '2023 Honda Accord', uploadedAt: '2024-01-15', size: '2.5 MB', status: 'active', expiryDate: '2025-01-15' },
  { id: '2', name: 'Purchase Agreement - Honda Accord', type: 'PURCHASE_AGREEMENT', vehicleId: '1', vehicleName: '2023 Honda Accord', uploadedAt: '2024-01-15', size: '1.2 MB', status: 'active' },
  { id: '3', name: 'Inspection Report - Honda Accord', type: 'INSPECTION_REPORT', vehicleId: '1', vehicleName: '2023 Honda Accord', uploadedAt: '2024-01-15', size: '3.8 MB', status: 'active' },
  { id: '4', name: 'Insurance Policy - Toyota Camry', type: 'INSURANCE', vehicleId: '2', vehicleName: '2022 Toyota Camry', uploadedAt: '2024-01-18', size: '1.5 MB', status: 'expiring', expiryDate: '2024-02-18' },
  { id: '5', name: 'Registration - Ford F-150', type: 'REGISTRATION', vehicleId: '3', vehicleName: '2023 Ford F-150', uploadedAt: '2024-01-20', size: '800 KB', status: 'expired', expiryDate: '2023-12-31' },
  { id: '6', name: 'Service Records - Toyota Camry', type: 'SERVICE', vehicleId: '2', vehicleName: '2022 Toyota Camry', uploadedAt: '2024-01-19', size: '2.1 MB', status: 'active' },
]

const documentTypes = [
  { value: 'all', label: 'All Types', icon: FileText },
  { value: 'TITLE', label: 'Title', icon: FileText },
  { value: 'REGISTRATION', label: 'Registration', icon: File },
  { value: 'INSURANCE', label: 'Insurance', icon: FileClock },
  { value: 'PURCHASE_AGREEMENT', label: 'Purchase Agreement', icon: FileText },
  { value: 'INSPECTION_REPORT', label: 'Inspection Report', icon: FileText },
  { value: 'SERVICE', label: 'Service Records', icon: File },
  { value: 'OTHER', label: 'Other', icon: File },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  
  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || doc.type === selectedType
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })
  
  // Count by status
  const statusCounts = {
    total: documents.length,
    active: documents.filter(d => d.status === 'active').length,
    expiring: documents.filter(d => d.status === 'expiring').length,
    expired: documents.filter(d => d.status === 'expired').length,
  }
  
  // Document type colors
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'TITLE': return <FileText className="h-5 w-5 text-blue-600" />
      case 'REGISTRATION': return <File className="h-5 w-5 text-green-600" />
      case 'INSURANCE': return <FileClock className="h-5 w-5 text-purple-600" />
      case 'INSPECTION_REPORT': return <FileText className="h-5 w-5 text-yellow-600" />
      default: return <File className="h-5 w-5 text-gray-600" />
    }
  }
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expiring': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log('Files dropped:', e.dataTransfer.files)
    }
  }
  
  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d.id !== id))
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
              <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
              <p className="mt-2 text-gray-600">Manage all your vehicle documents in one place</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Document
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{statusCounts.active}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{statusCounts.expiring}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{statusCounts.expired}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Upload Area */}
        <div 
          className={`mb-8 border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
          <p className="text-sm text-gray-500">Support for PDF, JPG, PNG, DOC files up to 10MB</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Select Files
          </button>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
        
        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {getTypeIcon(document.type)}
                    <div className="ml-3">
                      <h3 className="text-sm font-semibold text-gray-900">{document.name}</h3>
                      <p className="text-xs text-gray-500">{document.type.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                    {document.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Car className="h-4 w-4 mr-2" />
                    {document.vehicleName}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Uploaded: {document.uploadedAt}
                  </div>
                  {document.expiryDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Expires: {document.expiryDate}
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    Size: {document.size}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-4 border-t">
                  <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                  <button 
                    onClick={() => handleDeleteDocument(document.id)}
                    className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No documents found</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or upload a new document</p>
          </div>
        )}
      </div>
    </div>
  )
} 