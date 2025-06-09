// Shared mock data store for development
export let mockVehicles: any[] = [
  {
    id: '1',
    vin: '1HGCM82633A004352',
    make: 'Honda',
    model: 'Accord',
    year: 2023,
    trim: 'EX-L',
    color: 'Silver',
    mileage: 15000,
    status: 'AVAILABLE',
    purchasePrice: 25000,
    listingPrice: 28500,
    purchaseDate: '2024-01-15T00:00:00Z',
    location: 'Lot A',
    userId: 'temp-user-id',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    expenses: [],
    notes: [],
    documents: [],
    photos: [],
    customFieldValues: [],
    sales: [],
    user: {
      id: 'temp-user-id',
      name: 'Demo User',
      email: 'demo@example.com'
    }
  }
]

export function addMockVehicle(vehicle: any) {
  mockVehicles.push(vehicle)
}

export function getMockVehicleById(id: string) {
  return mockVehicles.find(v => v.id === id)
}

export function updateMockVehicle(id: string, data: any) {
  const index = mockVehicles.findIndex(v => v.id === id)
  if (index !== -1) {
    mockVehicles[index] = { ...mockVehicles[index], ...data, updatedAt: new Date().toISOString() }
    return mockVehicles[index]
  }
  return null
}

export function deleteMockVehicle(id: string) {
  const index = mockVehicles.findIndex(v => v.id === id)
  if (index !== -1) {
    mockVehicles.splice(index, 1)
    return true
  }
  return false
} 