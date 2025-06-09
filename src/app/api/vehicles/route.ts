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
    
    // Get or create a demo user
    let user = await prisma.user.findFirst({
      where: { email: 'demo@example.com' }
    })
    
    if (!user) {
      // Create demo user if it doesn't exist
      const bcrypt = require('bcryptjs')
      const hashedPassword = await bcrypt.hash('demo123', 10)
      
      user = await prisma.user.create({
        data: {
          email: 'demo@example.com',
          name: 'Demo User',
          password: hashedPassword,
          role: 'USER'
        }
      })
    }
    
    const vehicle = await prisma.vehicle.create({
      data: {
        ...body,
        userId: user.id
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