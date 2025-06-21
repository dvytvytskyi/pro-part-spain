const API_BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:v5maUE6u"
const AUTH_API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:XFElmptB"

export interface ApiFilters {
  category?: "new_building" | "secondary" | "rentals"
  price_min?: number
  price_max?: number
  beds?: number
  baths?: number
  province?: string
  town?: string
  area?: string
  has_pool?: boolean
  has_garden?: boolean
  has_garage?: boolean
  sort_by?: "price" | "date" | "beds" | "built"
  sort_order?: "asc" | "desc"
  page?: number
  per_page?: number
  search?: string
}

export interface ApiResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export class ApiClient {
  private token: string | null = null

  constructor() {
    // Load token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const response = await fetch(`${AUTH_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Login failed: ${error}`)
    }

    const data = await response.json()
    this.setToken(data.token || data.authToken || data.access_token)
    return data
  }

  async getProperties(filters: ApiFilters = {}): Promise<ApiResponse<any>> {
    const params = new URLSearchParams()

    // Add all filters as query parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString())
      }
    })
    const url = `${API_BASE_URL}/properties${params.toString() ? `?${params.toString()}` : ""}`

    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to fetch properties: ${error}`)
    }

    const data = await response.json()
    console.log("API Response:", data)

    if (Array.isArray(data)) {
      return {
        data,
        total: data.length,
        page: filters.page || 1,
        per_page: filters.per_page || 12,
        total_pages: Math.ceil(data.length / (filters.per_page || 12)),
      }
    }

    return data
  }

  async getProperty(propertyId: string | number): Promise<any> {
    const url = `${API_BASE_URL}/properties/${propertyId}`
    console.log("API Request URL:", url)

    const response = await fetch(url, {
      method: "GET",
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to fetch property: ${error}`)
    }

    const data = await response.json()
    console.log("Property API Response:", data)
    return data
  }
}

export const apiClient = new ApiClient()