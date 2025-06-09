export interface Property {
  id: number | string
  development_name?: string | null
  town?: string | null
  price: number
  area?: number | null
  bedrooms?: number | null
  bathrooms?: number | null
  property_type?: string | null
  description?: string | null
  gallery?: string[] | null
  pool?: boolean | null
  garden?: boolean | null
  garage?: boolean | null
  created_at?: string | null
  updated_at?: string | null
}

export interface FilterState {
  min_price?: number | null
  max_price?: number | null
  min_area?: number | null
  max_area?: number | null
  bedrooms?: number | null
  property_type?: string | null
  town?: string | null
  development_name?: string | null
  pool?: boolean | null
  garden?: boolean | null
  garage?: boolean | null
}

export interface ApiResponse {
  data?: Property[]
  properties?: Property[]
  results?: Property[]
}
