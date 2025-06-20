export interface NewBuilding {
  // Main Properties
  id: string
  status_date: string
  status: string
  listed_date: string
  last_updated: string
  development_name: string
  urbanisation_name?: string
  price: number
  price_to?: number
  currency: string
  start_date?: string
  building_license: boolean
  completion_date?: string
  latitude: number
  longitude: number
  country: string
  province: string
  town: string
  area: string
  beds: number
  beds_to?: number
  baths: number
  baths_to?: number
  levels?: number
  built: number
  built_to?: number
  terrace?: number
  terrace_to?: number
  plot?: number
  plot_to?: number
  type_uk: string
  subtype_uk?: string
  subtype_es?: string
  own_property: boolean
  has_pool: boolean
  has_garden: boolean
  has_garage: boolean
  description_uk?: string
  description_es?: string
  images: string[]

  // Characteristics
  char_climate_control?: string[]
  char_condition?: string[]
  char_features?: string[]
  char_furniture?: string[]
  char_garden?: string[]
  char_kitchen?: string[]
  char_orientation?: string[]
  char_parking?: string[]
  char_pool?: string[]
  char_security?: string[]
  char_setting?: string[]
  char_utilities?: string[]
  char_views?: string[]

  // Legacy compatibility
  created_at?: string
  updated_at?: string
}
