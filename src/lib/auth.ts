import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface AuthUser {
  userId: string
  email: string
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) return null
  
  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || 'your-secret-key'
    ) as AuthUser
    
    return decoded
  } catch {
    return null
  }
}

export function createToken(user: { id: string; email: string }): string {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.NEXTAUTH_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  )
} 