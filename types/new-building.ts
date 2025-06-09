export interface NewBuilding {
  id: number | string
  development_name: string
  images: string[]
  description_uk?: string
  description_es?: string
  price: number
  price_to?: number
  currency: string
  beds: number
  beds_to?: number
  baths: number
  baths_to?: number
  surface_area: {
    built: number
    built_to?: number
    terrace?: number
    terrace_to?: number
  }
  completion_date?: string
  type: {
    uk?: string
    es?: string
  }
  subtype: {
    uk?: string
    es?: string
  }
  country: string
  province: string
  town: string
  area: string
  latitude: number
  longitude: number
  has_pool: boolean
  has_garden: boolean
  has_garage: boolean
  created_at?: string
  updated_at?: string
}
