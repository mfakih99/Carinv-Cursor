import { Car, FileText, Users, DollarSign } from 'lucide-react'

// Skeleton loader for vehicle cards
export function VehicleCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-gray-300 rounded"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  )
}

// Table skeleton loader
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="animate-pulse">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </div>
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-300 rounded w-1/6"></div>
              <div className="h-4 bg-gray-300 rounded w-1/6"></div>
              <div className="h-4 bg-gray-300 rounded w-1/6"></div>
              <div className="h-4 bg-gray-300 rounded w-1/6"></div>
              <div className="h-4 bg-gray-300 rounded w-1/6"></div>
              <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Dashboard stat skeleton
export function StatCardSkeleton() {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
      <div className="p-5">
        <div className="flex items-center">
          <div className="h-6 w-6 bg-gray-300 rounded"></div>
          <div className="ml-5 flex-1">
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Empty state components
interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: 'car' | 'document' | 'users' | 'expenses'
}

export function EmptyState({ title, description, action, icon = 'car' }: EmptyStateProps) {
  const icons = {
    car: Car,
    document: FileText,
    users: Users,
    expenses: DollarSign
  }
  
  const Icon = icons[icon]
  
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && (
        <div className="mt-6">
          <button
            onClick={action.onClick}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {action.label}
          </button>
        </div>
      )}
    </div>
  )
}

// Loading spinner
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }
  
  return (
    <div className="flex justify-center items-center p-4">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-blue-600`}></div>
    </div>
  )
}

// Full page loader
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  )
} 