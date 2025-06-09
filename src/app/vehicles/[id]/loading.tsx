import Navigation from '@/components/layout/Navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function VehicleDetailLoading() {
  return (
    <div>
      <Navigation />
      
      {/* Header with back button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/vehicles" className="text-gray-400 hover:text-gray-500">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-48"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery Skeleton */}
            <div className="bg-white shadow rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-20 mb-4"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square bg-gray-300 rounded-lg"></div>
                <div className="aspect-square bg-gray-300 rounded-lg"></div>
                <div className="aspect-square bg-gray-300 rounded-lg"></div>
              </div>
            </div>
            
            {/* Vehicle Details Skeleton */}
            <div className="bg-white shadow rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Expenses Skeleton */}
            <div className="bg-white shadow rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-24 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-48 mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-32"></div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Status Card Skeleton */}
            <div className="bg-white shadow rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location Card Skeleton */}
            <div className="bg-white shadow rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-4 w-4 bg-gray-300 rounded mr-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-40"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 