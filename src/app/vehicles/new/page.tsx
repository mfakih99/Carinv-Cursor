'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import { AlertCircle, Check } from 'lucide-react'

export default function NewVehiclePage() {
  const [vin, setVin] = useState('')
  const [isDecoding, setIsDecoding] = useState(false)
  interface DecodedVehicleData {
    make: string
    model: string
    year: number
    trim: string
    bodyType: string
    engineType: string
    transmission: string
    drivetrain: string
  }
  
  const [decodedData, setDecodedData] = useState<DecodedVehicleData | null>(null)
  const [error, setError] = useState('')

  const handleVinDecode = async () => {
    if (vin.length !== 17) {
      setError('VIN must be exactly 17 characters')
      return
    }

    setIsDecoding(true)
    setError('')
    
    // Simulate VIN decoding - in real app, this would call the API
    setTimeout(() => {
      setDecodedData({
        make: 'Honda',
        model: 'Accord',
        year: 2023,
        trim: 'EX-L',
        bodyType: 'Sedan',
        engineType: '1.5L Turbo',
        transmission: 'CVT',
        drivetrain: 'FWD'
      })
      setIsDecoding(false)
    }, 1500)
  }

  return (
    <div>
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Vehicle</h1>
          <p className="mt-2 text-gray-600">Enter vehicle details to add to your inventory</p>
        </div>

        <form className="space-y-6 bg-white shadow rounded-lg p-6">
          {/* VIN Decoder Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">VIN Decoder</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
                  Vehicle Identification Number (VIN)
                </label>
                <input
                  type="text"
                  id="vin"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  maxLength={17}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter 17-character VIN"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
                  </p>
                )}
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleVinDecode}
                  disabled={isDecoding}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isDecoding ? 'Decoding...' : 'Decode VIN'}
                </button>
              </div>
            </div>

            {decodedData && (
              <div className="mt-4 p-4 bg-green-50 rounded-md">
                <div className="flex">
                  <Check className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">VIN Decoded Successfully</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Found: {decodedData.year} {decodedData.make} {decodedData.model} {decodedData.trim}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Vehicle Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Make</label>
              <input
                type="text"
                defaultValue={decodedData?.make}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Model</label>
              <input
                type="text"
                defaultValue={decodedData?.model}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="number"
                defaultValue={decodedData?.year}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Trim</label>
              <input
                type="text"
                defaultValue={decodedData?.trim}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mileage</label>
              <input
                type="number"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Purchase Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Purchase Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Purchase Price</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    className="pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Purchase Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Auction, Dealer, Private"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Current Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Lot A, Service Bay"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Listing Price</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  className="pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 