'use client'

import Navigation from '@/components/layout/Navigation'
import { Car, Search, Filter, MoreVertical } from 'lucide-react'
import Link from 'next/link'

// Mock data - will be replaced with database queries
const vehicles = [
  {
    id: '1',
    vin: '1HGCM82633A123456',
    make: 'Honda',
    model: 'Accord',
    year: 2023,
    color: 'Silver',
    mileage: 15000,
    status: 'Available',
    purchasePrice: 25000,
    listingPrice: 28500,
    location: 'Lot A',
    daysInInventory: 12,
  },
  {
    id: '2',
    vin: '3VW2K7AJ9DM123456',
    make: 'Volkswagen',
    model: 'Jetta',
    year: 2022,
    color: 'Black',
    mileage: 22000,
    status: 'Sold',
    purchasePrice: 19000,
    listingPrice: 22000,
    soldPrice: 21500,
    location: 'Sold',
    daysInInventory: 8,
  },
  {
    id: '3',
    vin: '1G1ZD5ST7LF123456',
    make: 'Chevrolet',
    model: 'Malibu',
    year: 2023,
    color: 'Blue',
    mileage: 8000,
    status: 'In Repair',
    purchasePrice: 22000,
    listingPrice: 25000,
    location: 'Service',
    daysInInventory: 25,
  },
]

export default function VehiclesPage() {
  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Inventory</h1>
          <p className="mt-2 text-gray-600">Manage and track all vehicles in your inventory</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by VIN, make, model..."
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All Status</option>
              <option>Available</option>
              <option>In Repair</option>
              <option>Pending Sale</option>
              <option>Sold</option>
            </select>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VIN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/vehicles/${vehicle.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vehicles/${vehicle.id}`} className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Car className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 hover:text-blue-600">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vehicle.color} • {vehicle.mileage.toLocaleString()} mi
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.vin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                      vehicle.status === 'Sold' ? 'bg-gray-100 text-gray-800' :
                      vehicle.status === 'In Repair' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">${vehicle.listingPrice.toLocaleString()}</div>
                      {vehicle.soldPrice && (
                        <div className="text-gray-500">Sold: ${vehicle.soldPrice.toLocaleString()}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.daysInInventory}d
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 