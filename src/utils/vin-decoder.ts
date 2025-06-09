import { VINDecoderResponse } from '@/types'

export async function decodeVIN(vin: string): Promise<VINDecoderResponse | null> {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
    )
    
    if (!response.ok) {
      throw new Error('Failed to decode VIN')
    }
    
    const data = await response.json()
    
    // Parse NHTSA response
    const results = data.Results || []
    const decodedData: Partial<VINDecoderResponse> = {}
    
    results.forEach((item: any) => {
      switch (item.Variable) {
        case 'Make':
          decodedData.make = item.Value
          break
        case 'Model':
          decodedData.model = item.Value
          break
        case 'Model Year':
          decodedData.year = parseInt(item.Value)
          break
        case 'Trim':
          decodedData.trim = item.Value
          break
        case 'Body Class':
          decodedData.bodyType = item.Value
          break
        case 'Engine Model':
          decodedData.engineType = item.Value
          break
        case 'Transmission Style':
          decodedData.transmission = item.Value
          break
        case 'Drive Type':
          decodedData.drivetrain = item.Value
          break
        case 'Manufacturer Name':
          decodedData.manufacturerName = item.Value
          break
        case 'Plant Country':
          decodedData.plantCountry = item.Value
          break
        case 'Vehicle Type':
          decodedData.vehicleType = item.Value
          break
      }
    })
    
    // Validate required fields
    if (!decodedData.make || !decodedData.model || !decodedData.year) {
      return null
    }
    
    return decodedData as VINDecoderResponse
  } catch (error) {
    console.error('Error decoding VIN:', error)
    return null
  }
}

export function validateVIN(vin: string): boolean {
  // Basic VIN validation (17 characters, no I, O, or Q)
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i
  return vinRegex.test(vin)
} 