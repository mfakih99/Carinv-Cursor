import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/expenses - List all expenses
export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from auth token
    const userId = 'demo-user-id' // Replace with actual user ID from auth

    const searchParams = request.nextUrl.searchParams
    const vehicleId = searchParams.get('vehicleId')
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    const where: any = { userId }
    
    if (vehicleId) where.vehicleId = vehicleId
    if (category) where.category = category
    if (status) where.status = status

    const expenses = await prisma.expense.findMany({
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
        date: 'desc'
      }
    })

    return NextResponse.json(expenses)

  } catch (error) {
    console.error('Error fetching expenses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/expenses - Create new expense
export async function POST(request: NextRequest) {
  try {
    // TODO: Get userId from auth token
    const userId = 'demo-user-id' // Replace with actual user ID from auth

    const body = await request.json()
    const { vehicleId, category, amount, description, date, status, vendor, invoiceNumber } = body

    // Validate required fields
    if (!vehicleId || !category || !amount || !description || !date) {
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

    // Create expense
    const expense = await prisma.expense.create({
      data: {
        vehicleId,
        category,
        amount: parseFloat(amount),
        description,
        date: new Date(date),
        status: status || 'pending',
        vendor,
        invoiceNumber,
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

    return NextResponse.json(expense, { status: 201 })

  } catch (error) {
    console.error('Error creating expense:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 