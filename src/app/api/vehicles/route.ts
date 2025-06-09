import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all vehicles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    
    const where = status ? { status: status as any } : {}
    
    const vehicles = await prisma.vehicle.findMany({
      where,
      include: {
        expenses: true,
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        photos: {
          where: { isPrimary: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(vehicles)
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
    
    const vehicle = await prisma.vehicle.create({
      data: {
        ...body,
        userId
      }
    })
    
    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    )
  }
} 