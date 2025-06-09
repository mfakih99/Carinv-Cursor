import { NextRequest, NextResponse } from 'next/server'
import { mockVehicles, addMockVehicle } from '@/lib/mockData'

// GET all vehicles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    
    const where = status ? { status: status as any } : {}
    
    let filteredVehicles = mockVehicles
    if (status) {
      filteredVehicles = mockVehicles.filter(v => v.status === status)
    }
    
    return NextResponse.json(filteredVehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    )
  }
}

// POST new vehicle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // For now, using a hardcoded userId - in production, get from session
    const userId = 'temp-user-id'
    
    // Create a new vehicle with a random ID
    const newVehicle = {
      id: Date.now().toString(),
      ...body,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expenses: [],
      notes: [],
      documents: [],
      photos: [],
      customFieldValues: [],
      sales: [],
      user: {
        id: userId,
        name: 'Demo User',
        email: 'demo@example.com'
      }
    }
    
    // Add to mock data store
    addMockVehicle(newVehicle)
    
    return NextResponse.json(newVehicle, { status: 201 })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    )
  }
} 