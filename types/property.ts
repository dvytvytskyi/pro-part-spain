export interface FilterState {
  min_price?: number
  max_price?: number
  min_area?: number
  max_area?: number
  bedrooms?: number
  property_type?: string
  town?: string
  development_name?: string
  pool?: boolean
  garden?: boolean
  garage?: boolean
}


export interface ApiPropertyResponse {
  id: number
  property_old_id: string
  status_date: number
  status: string
  listed_date: number
  last_updated: number
  development_name: string
  urbanisation_name: string
  price: number
  price_to: number
  currency: string
  start_date: string | null
  building_license: 1 | 0
  completion_date: string | null
  latitude: number
  longitude: number
  type: string
  subtype: string
  country: string
  province: string
  town: string
  area: string
  beds: number
  beds_to: number
  baths: number
  baths_to: number
  levels: number | null
  built_area: number
  built_area_to: number
  terrace_area: number
  terrace_area_to: number
  plot_area: number
  plot_area_to: number
  energy_rating_value: string | null
  energy_rating_letter: string | null
  own_property: 1 | 0
  has_pool: 1 | 0
  has_garden: 1 | 0
  has_garage: 1 | 0
  description: string
  _category_values_of_properties: Array<{
    value: string
    _categories_4: {
      name: string
    }
  }>
}

// I've named it `Project` to be more generic.
export interface Project {
  id: string
  status_date: string
  status: string
  listed_date: string
  last_updated: string
  development_name: string
  urbanisation_name: string
  price: number
  price_to: number
  currency: string
  start_date: string | null
  building_license: boolean
  completion_date: string | null
  latitude: number
  longitude: number
  country: string
  province: string
  town: string
  area: string
  beds: number
  beds_to: number
  baths: number
  baths_to: number
  levels: number | null
  built: number
  built_to: number
  terrace: number
  terrace_to: number
  plot: number
  plot_to: number
  type_uk: string
  subtype_uk: string
  subtype_es: string | null // Not present in API response, default to null
  own_property: boolean
  has_pool: boolean
  has_garden: boolean
  has_garage: boolean
  description_uk: string
  images: string[] // Not present in API, we'll add placeholders

  char_climate_control: string[]
  char_condition: string[]
  char_features: string[]
  char_furniture: string[]
  char_garden: string[]
  char_kitchen: string[]
  char_orientation: string[]
  char_parking: string[]
  char_pool: string[]
  char_security: string[]
  char_setting: string[]
  char_utilities: string[]
  char_views: string[]
}