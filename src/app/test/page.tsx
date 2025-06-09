'use client'

import { useState } from 'react'

export default function TestPage() {
  const [result, setResult] = useState<string>('')
  
  const testVINDecode = async () => {
    try {
      const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/1HGCM82633A004352?format=json')
      const data = await response.json()
      setResult(`VIN Decode API: ${response.ok ? 'Working' : 'Failed'}\n${JSON.stringify(data.Results?.slice(0, 3), null, 2)}`)
    } catch (error) {
      setResult(`VIN Decode Error: ${error}`)
    }
  }
  
  const testGetVehicles = async () => {
    try {
      const response = await fetch('/api/vehicles')
      const data = await response.json()
      setResult(`GET Vehicles API: ${response.ok ? 'Working' : 'Failed'}\n${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      setResult(`GET Vehicles Error: ${error}`)
    }
  }
  
  const testCreateVehicle = async () => {
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vin: 'TEST' + Date.now(),
          make: 'Test',
          model: 'Vehicle',
          year: 2024,
          status: 'AVAILABLE'
        })
      })
      const data = await response.json()
      setResult(`POST Vehicle API: ${response.ok ? 'Working' : 'Failed'}\n${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      setResult(`POST Vehicle Error: ${error}`)
    }
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <div className="space-x-4 mb-4">
        <button 
          onClick={testVINDecode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test VIN Decode
        </button>
        
        <button 
          onClick={testGetVehicles}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test GET Vehicles
        </button>
        
        <button 
          onClick={testCreateVehicle}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test CREATE Vehicle
        </button>
      </div>
      
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {result || 'Click a button to test an API'}
      </pre>
    </div>
  )
} 