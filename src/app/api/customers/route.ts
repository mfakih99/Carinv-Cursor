import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/customers - List all customers
export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from auth token
    const userId = 'demo-user-id' // Replace with actual user ID from auth

    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    const where: any = { userId }
    
    if (type && type !== 'all') {
      where.type = type
    }
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { businessName: { contains: search, mode: 'insensitive' } }
      ]
    }

    const customers = await prisma.customer.findMany({
      where,
      include: {
        notes: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        },
        sales: {
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
            saleDate: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate total spent and last contact for each customer
    const customersWithStats = customers.map(customer => {
      const totalSpent = customer.sales.reduce((sum, sale) => sum + sale.salePrice, 0)
      const lastContact = customer.notes.length > 0 
        ? customer.notes[0].createdAt
        : customer.createdAt
        
      return {
        ...customer,
        totalSpent,
        lastContact,
        totalPurchases: customer.sales.length
      }
    })

    return NextResponse.json(customersWithStats)

  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/customers - Create new customer
export async function POST(request: NextRequest) {
  try {
    // TODO: Get userId from auth token
    const userId = 'demo-user-id' // Replace with actual user ID from auth

    const body = await request.json()
    const { firstName, lastName, email, phone, address, type, businessName } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        email_userId: {
          email,
          userId
        }
      }
    })

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 409 }
      )
    }

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        type,
        businessName,
        userId
      },
      include: {
        notes: true,
        sales: true
      }
    })

    return NextResponse.json({
      ...customer,
      totalSpent: 0,
      lastContact: customer.createdAt,
      totalPurchases: 0
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 