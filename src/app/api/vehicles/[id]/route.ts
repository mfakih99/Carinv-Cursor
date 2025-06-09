import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET single vehicle by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        expenses: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          },
          orderBy: { date: 'desc' }
        },
        notes: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        documents: {
          include: {
            uploadedBy: {
              select: {
                name: true
              }
            }
          },
          orderBy: { uploadedAt: 'desc' }
        },
        photos: {
          orderBy: { order: 'asc' }
        },
        customFieldValues: {
          include: {
            field: true
          }
        },
        sales: {
          include: {
            customer: true
          }
        }
      }
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      )
    }

    // Calculate financial summary
    const totalExpenses = vehicle.expenses.reduce(
      (sum: number, expense: any) => sum + Number(expense.amount),
      0
    )
    
    const totalCost = Number(vehicle.purchasePrice || 0) + totalExpenses
    const estimatedProfit = Number(vehicle.listingPrice || 0) - totalCost
    
    // Calculate days in inventory
    const purchaseDate = vehicle.purchaseDate ? new Date(vehicle.purchaseDate) : new Date(vehicle.createdAt)
    const today = new Date()
    const daysInInventory = Math.floor((today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24))

    return NextResponse.json({
      ...vehicle,
      totalExpenses,
      totalCost,
      estimatedProfit,
      daysInInventory
    })
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicle' },
      { status: 500 }
    )
  }
}

// UPDATE vehicle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: body
    })
    
    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error updating vehicle:', error)
    return NextResponse.json(
      { error: 'Failed to update vehicle' },
      { status: 500 }
    )
  }
}

// DELETE vehicle
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.vehicle.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    return NextResponse.json(
      { error: 'Failed to delete vehicle' },
      { status: 500 }
    )
  }
} 