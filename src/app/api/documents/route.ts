import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/documents - List all documents
export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from auth token
    const userId = 'demo-user-id' // Replace with actual user ID from auth

    const searchParams = request.nextUrl.searchParams
    const vehicleId = searchParams.get('vehicleId')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const where: any = { userId }
    
    if (vehicleId) where.vehicleId = vehicleId
    if (type) where.type = type
    if (status) where.status = status

    const documents = await prisma.document.findMany({
      where,
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Check for expiring documents
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)

    const updatedDocuments = documents.map(doc => {
      if (doc.expiryDate) {
        if (doc.expiryDate < today) {
          doc.status = 'expired'
        } else if (doc.expiryDate < thirtyDaysFromNow) {
          doc.status = 'expiring'
        } else {
          doc.status = 'active'
        }
      }
      return doc
    })

    return NextResponse.json(updatedDocuments)

  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/documents - Create document metadata
export async function POST(request: NextRequest) {
  try {
    // TODO: Get userId from auth token
    const userId = 'demo-user-id' // Replace with actual user ID from auth

    const body = await request.json()
    const { vehicleId, name, type, url, size, mimeType, expiryDate } = body

    // Validate required fields
    if (!vehicleId || !name || !type || !url || !size) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify vehicle belongs to user
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
        userId
      }
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      )
    }

    // Determine initial status based on expiry date
    let status = 'active'
    if (expiryDate) {
      const expiry = new Date(expiryDate)
      const today = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(today.getDate() + 30)

      if (expiry < today) {
        status = 'expired'
      } else if (expiry < thirtyDaysFromNow) {
        status = 'expiring'
      }
    }

    // Create document record
    const document = await prisma.document.create({
      data: {
        vehicleId,
        name,
        type,
        url,
        size,
        mimeType,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        status,
        userId
      },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true
          }
        }
      }
    })

    return NextResponse.json(document, { status: 201 })

  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 