import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  
  // Create demo user
  const hashedPassword = await bcrypt.hash('password', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@carwholesaler.com' },
    update: {},
    create: {
      email: 'demo@carwholesaler.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
      businessName: 'Demo Car Wholesale',
      phone: '(555) 123-4567',
      address: '123 Demo Street, Demo City, DC 12345'
    }
  })
  
  console.log('Created demo user:', user.email)
  
  // Create sample vehicles
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        vin: 'DEMO123456789001',
        year: 2023,
        make: 'Honda',
        model: 'Accord',
        trim: 'Sport',
        mileage: 15000,
        color: 'Blue',
        engineType: '2.0L Turbo',
        transmission: 'Automatic',
        drivetrain: 'FWD',
        fuelType: 'Gasoline',
        bodyStyle: 'Sedan',
        purchasePrice: 25000,
        purchaseDate: new Date('2024-01-10'),
        status: 'available',
        condition: 'Excellent',
        location: 'Lot A',
        notes: 'One owner, clean history',
        userId: user.id
      }
    }),
    prisma.vehicle.create({
      data: {
        vin: 'DEMO123456789002',
        year: 2022,
        make: 'Toyota',
        model: 'Camry',
        trim: 'LE',
        mileage: 28000,
        color: 'Silver',
        engineType: '2.5L',
        transmission: 'Automatic',
        drivetrain: 'FWD',
        fuelType: 'Gasoline',
        bodyStyle: 'Sedan',
        purchasePrice: 22000,
        purchaseDate: new Date('2024-01-15'),
        status: 'available',
        condition: 'Very Good',
        location: 'Lot B',
        userId: user.id
      }
    })
  ])
  
  console.log(`Created ${vehicles.length} sample vehicles`)
  
  // Create sample customer
  const customer = await prisma.customer.create({
    data: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '(555) 987-6543',
      address: '456 Customer Lane, Buyer City, BC 54321',
      type: 'buyer',
      businessName: 'Smith Auto Sales',
      userId: user.id
    }
  })
  
  console.log('Created sample customer:', customer.email)
  
  // Create sample expenses
  const expenses = await Promise.all([
    prisma.expense.create({
      data: {
        vehicleId: vehicles[0].id,
        category: 'MAINTENANCE',
        amount: 150,
        description: 'Oil change and filter',
        date: new Date('2024-01-12'),
        status: 'paid',
        vendor: 'Quick Lube',
        userId: user.id
      }
    }),
    prisma.expense.create({
      data: {
        vehicleId: vehicles[0].id,
        category: 'DETAILING',
        amount: 200,
        description: 'Full interior and exterior detail',
        date: new Date('2024-01-14'),
        status: 'paid',
        vendor: 'Pro Detail Shop',
        userId: user.id
      }
    })
  ])
  
  console.log(`Created ${expenses.length} sample expenses`)
  
  console.log('Seeding completed!')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  }) 