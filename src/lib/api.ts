const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ApiClient {
  private token: string | null = null
  
  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }
  
  getToken() {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }
  
  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }
  
  async fetch<T = any>(url: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()
    
    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      }
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken()
        window.location.href = '/login'
      }
      
      const error = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new ApiError(response.status, error.error || response.statusText)
    }
    
    return response.json()
  }
  
  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.fetch<{ user: any; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    
    this.setToken(response.token)
    return response
  }
  
  async register(userData: any) {
    return this.fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }
  
  // Vehicle endpoints
  async getVehicles() {
    return this.fetch('/api/vehicles')
  }
  
  async getVehicle(id: string) {
    return this.fetch(`/api/vehicles/${id}`)
  }
  
  async createVehicle(data: any) {
    return this.fetch('/api/vehicles', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  async updateVehicle(id: string, data: any) {
    return this.fetch(`/api/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
  
  async deleteVehicle(id: string) {
    return this.fetch(`/api/vehicles/${id}`, {
      method: 'DELETE'
    })
  }
  
  // Expense endpoints
  async getExpenses(filters?: { vehicleId?: string; category?: string; status?: string }) {
    const params = new URLSearchParams()
    if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId)
    if (filters?.category) params.append('category', filters.category)
    if (filters?.status) params.append('status', filters.status)
    
    return this.fetch(`/api/expenses${params.toString() ? `?${params}` : ''}`)
  }
  
  async createExpense(data: any) {
    return this.fetch('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  // Document endpoints
  async getDocuments(filters?: { vehicleId?: string; type?: string; status?: string }) {
    const params = new URLSearchParams()
    if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId)
    if (filters?.type) params.append('type', filters.type)
    if (filters?.status) params.append('status', filters.status)
    
    return this.fetch(`/api/documents${params.toString() ? `?${params}` : ''}`)
  }
  
  async createDocument(data: any) {
    return this.fetch('/api/documents', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  // Customer endpoints
  async getCustomers(filters?: { type?: string; search?: string }) {
    const params = new URLSearchParams()
    if (filters?.type) params.append('type', filters.type)
    if (filters?.search) params.append('search', filters.search)
    
    return this.fetch(`/api/customers${params.toString() ? `?${params}` : ''}`)
  }
  
  async getCustomer(id: string) {
    return this.fetch(`/api/customers/${id}`)
  }
  
  async createCustomer(data: any) {
    return this.fetch('/api/customers', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  async updateCustomer(id: string, data: any) {
    return this.fetch(`/api/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
  
  async deleteCustomer(id: string) {
    return this.fetch(`/api/customers/${id}`, {
      method: 'DELETE'
    })
  }
  
  // Note endpoints
  async createNote(customerId: string, content: string) {
    return this.fetch(`/api/customers/${customerId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ content })
    })
  }
}

export const api = new ApiClient() 