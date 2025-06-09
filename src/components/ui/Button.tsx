import { ButtonHTMLAttributes, forwardRef } from 'react'
import { LoadingSpinner } from './LoadingStates'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    fullWidth = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200'
    
    const variants = {
      primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500',
      danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      outline: 'text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }
    
    const widthClass = fullWidth ? 'w-full' : ''
    const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner size="sm" />}
        {!loading && children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button } 