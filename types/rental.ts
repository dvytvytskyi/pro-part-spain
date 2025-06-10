export interface Rental {
  id: number | string
  property_name: string
  images: string[]
  description_uk?: string
  description_es?: string
  price_monthly: number
  price_weekly?: number
  currency: string
  beds: number
  baths: number
  surface_area: {
    built: number
    terrace?: number
  }
  available_from?: string
  min_stay_months?: number
  min_stay_weeks?: number
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
  has_wifi: boolean
  has_ac: boolean
  utilities_included: boolean
  deposit_amount?: number
  pets_allowed: boolean
  smoking_allowed: boolean
  created_at?: string
  updated_at?: string
}
