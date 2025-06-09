import Navigation from '@/components/layout/Navigation'
import { Car, DollarSign, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

// Mock data for now - will be replaced with real data from database
const stats = {
  totalVehicles: 24,
  availableVehicles: 18,
  soldThisMonth: 6,
  totalInventoryValue: 485000,
  monthlyRevenue: 125000,
  monthlyProfit: 22000,
  averageDaysInInventory: 28,
}

const recentVehicles = [
  { id: '1', vin: '1HGCM82633A123456', make: 'Honda', model: 'Accord', year: 2023, status: 'Available', price: 28500 },
  { id: '2', vin: '3VW2K7AJ9DM123456', make: 'Volkswagen', model: 'Jetta', year: 2022, status: 'Sold', price: 22000 },
  { id: '3', vin: '1G1ZD5ST7LF123456', make: 'Chevrolet', model: 'Malibu', year: 2023, status: 'In Repair', price: 25000 },
]

export default function DashboardPage() {
  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here's an overview of your inventory.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Car className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Vehicles</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalVehicles}</div>
                      <div className="ml-2 text-sm text-green-600">
                        {stats.availableVehicles} available
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Inventory Value</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      ${stats.totalInventoryValue.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Profit</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        ${stats.monthlyProfit.toLocaleString()}
                      </div>
                      <div className="ml-2 text-sm text-green-600">+12%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg Days in Inventory</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.averageDaysInInventory}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Vehicles */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Vehicles</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentVehicles.map((vehicle) => (
                <li key={vehicle.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <Link href={`/vehicles/${vehicle.id}`} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Car className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 hover:text-blue-600">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500">VIN: {vehicle.vin}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-6">
                        <div className="text-sm text-gray-900">${vehicle.price.toLocaleString()}</div>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                          vehicle.status === 'Sold' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {vehicle.status}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 