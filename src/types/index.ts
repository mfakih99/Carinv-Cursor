import { Vehicle, Expense, Note, Document, Customer, Sale, CustomField } from '@prisma/client'

export type VehicleWithRelations = Vehicle & {
  expenses: Expense[]
  notes: Note[]
  documents: Document[]
  photos: Photo[]
  customFieldValues: CustomFieldValueWithField[]
  _count?: {
    expenses: number
    notes: number
    documents: number
  }
}

export type CustomFieldValueWithField = {
  id: string
  value: string
  field: CustomField
}

export type Photo = {
  id: string
  url: string
  caption?: string | null
  isPrimary: boolean
  order: number
  createdAt: Date
  vehicleId: string
}

export type VehicleFormData = {
  vin: string
  make?: string
  model?: string
  year?: number
  trim?: string
  color?: string
  mileage?: number
  purchasePrice?: number
  purchaseDate?: Date
  purchaseLocation?: string
  listingPrice?: number
  location?: string
  status: string
}

export type ExpenseFormData = {
  category: string
  amount: number
  description?: string
  date: Date
  receiptUrl?: string
}

export type NoteFormData = {
  content: string
  category?: string
}

export type VINDecoderResponse = {
  make: string
  model: string
  year: number
  trim?: string
  bodyType?: string
  engineType?: string
  transmission?: string
  drivetrain?: string
  manufacturerName?: string
  plantCountry?: string
  vehicleType?: string
}

export type DashboardStats = {
  totalVehicles: number
  availableVehicles: number
  soldVehicles: number
  totalInventoryValue: number
  totalProfit: number
  averageDaysInInventory: number
  monthlyStats: {
    month: string
    sold: number
    revenue: number
    profit: number
  }[]
} 