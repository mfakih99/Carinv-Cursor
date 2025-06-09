'use client'

import Navigation from '@/components/layout/Navigation'
import { 
  DollarSign, 
  Filter, 
  Download, 
  Plus,
  Calendar,
  TrendingUp,
  TrendingDown,
  Search,
  Car,
  Edit,
  Trash2,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'

// Mock data - in real app would come from database
const mockExpenses = [
  { id: '1', vehicleId: '1', vehicleName: '2023 Honda Accord', category: 'REPAIR', amount: 1500, description: 'Engine service', date: '2024-01-17', status: 'paid' },
  { id: '2', vehicleId: '1', vehicleName: '2023 Honda Accord', category: 'DETAILING', amount: 300, description: 'Full detail', date: '2024-01-18', status: 'paid' },
  { id: '3', vehicleId: '1', vehicleName: '2023 Honda Accord', category: 'TRANSPORTATION', amount: 200, description: 'Transport from auction', date: '2024-01-16', status: 'paid' },
  { id: '4', vehicleId: '1', vehicleName: '2023 Honda Accord', category: 'INSPECTION', amount: 500, description: 'Pre-purchase inspection', date: '2024-01-15', status: 'paid' },
  { id: '5', vehicleId: '2', vehicleName: '2022 Toyota Camry', category: 'REPAIR', amount: 800, description: 'Brake replacement', date: '2024-01-20', status: 'pending' },
  { id: '6', vehicleId: '2', vehicleName: '2022 Toyota Camry', category: 'MAINTENANCE', amount: 150, description: 'Oil change', date: '2024-01-19', status: 'paid' },
  { id: '7', vehicleId: '3', vehicleName: '2023 Ford F-150', category: 'PARTS', amount: 1200, description: 'New tires', date: '2024-01-21', status: 'paid' },
  { id: '8', vehicleId: '3', vehicleName: '2023 Ford F-150', category: 'FEES', amount: 350, description: 'Registration fees', date: '2024-01-22', status: 'pending' },
]

const expenseCategories = [
  { value: 'all', label: 'All Categories' },
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

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(mockExpenses)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  
  // Calculate stats
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const paidExpenses = expenses.filter(e => e.status === 'paid').reduce((sum, exp) => sum + exp.amount, 0)
  const pendingExpenses = expenses.filter(e => e.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0)
  const expensesByCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {} as Record<string, number>)
  
  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
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
  
  const handleDeleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(e => e.id !== id))
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
              <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
              <p className="mt-2 text-gray-600">Track and manage all vehicle-related expenses</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Expense
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${totalExpenses.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-green-600 mt-1">${paidExpenses.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">${pendingExpenses.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{expenses.length}</p>
                <p className="text-xs text-gray-500 mt-1">transactions</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {expenseCategories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>
        </div>
        
        {/* Expenses Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Car className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{expense.vehicleName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${expense.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        expense.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Category Breakdown */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
          <div className="space-y-3">
            {Object.entries(expensesByCategory).map(([category, amount]) => {
              const percentage = (amount / totalExpenses) * 100
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${getCategoryColor(category)} mr-3`}>
                      {category}
                    </span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ${amount.toLocaleString()} ({percentage.toFixed(1)}%)
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 