// src/lib/dataTransformer.ts

import type { ApiPropertyResponse, Project } from "@/types/property"

// Helper to map API category names to component characteristic keys
const mapCategoryToKey = (categoryName: string): keyof Project | null => {
  const mapping: { [key: string]: keyof Project } = {
    "Climate Control": "char_climate_control",
    Condition: "char_condition",
    Features: "char_features",
    Furniture: "char_furniture",
    Garden: "char_garden",
    Kitchen: "char_kitchen",
    Orientation: "char_orientation",
    Parking: "char_parking",
    Pool: "char_pool",
    Security: "char_security",
    Setting: "char_setting",
    Utilities: "char_utilities",
    Views: "char_views",
  }
  return mapping[categoryName] || null
}

export function transformApiDataToProject(apiData: ApiPropertyResponse): Project {
  // Process the characteristics from the nested array
  const characteristics = apiData._category_values_of_properties.reduce(
    (acc, item) => {
      const key = mapCategoryToKey(item._categories_4.name)
      if (key) {
        // Initialize array if it doesn't exist
        if (!acc[key]) {
          acc[key] = []
        }
        // Push the value
        ;(acc[key] as string[]).push(item.value)
      }
      return acc
    },
    {} as Partial<Pick<Project, `char_${string}`>>
  )

  const transformedData: Project = {
    // Direct mappings or simple transformations
    id: apiData.property_old_id, // Using the string ID as it's more user-friendly
    status: apiData.status,
    development_name: apiData.development_name,
    urbanisation_name: apiData.urbanisation_name,
    price: apiData.price,
    price_to: apiData.price_to,
    currency: apiData.currency,
    start_date: apiData.start_date,
    completion_date: apiData.completion_date,
    latitude: apiData.latitude,
    longitude: apiData.longitude,
    country: apiData.country,
    province: apiData.province,
    town: apiData.town,
    area: apiData.area,
    beds: apiData.beds,
    beds_to: apiData.beds_to,
    baths: apiData.baths,
    baths_to: apiData.baths_to,
    levels: apiData.levels,

    // Renamed fields
    built: apiData.built_area,
    built_to: apiData.built_area_to,
    terrace: apiData.terrace_area,
    terrace_to: apiData.terrace_area_to,
    plot: apiData.plot_area,
    plot_to: apiData.plot_area_to,
    type_uk: apiData.type,
    subtype_uk: apiData.subtype,
    description_uk: apiData.description,

    // Type conversions (number to boolean, timestamp to ISO string)
    building_license: apiData.building_license === 1,
    own_property: apiData.own_property === 1,
    has_pool: apiData.has_pool === 1,
    has_garden: apiData.has_garden === 1,
    has_garage: apiData.has_garage === 1,
    status_date: new Date(apiData.status_date).toISOString(),
    listed_date: new Date(apiData.listed_date).toISOString(),
    last_updated: new Date(apiData.last_updated).toISOString(),

    // Fields not in API response - provide defaults
    subtype_es: null, // No Spanish subtype in API data
    images: apiData._images_of_properties_4.map(img => img.image_url),

    char_climate_control: characteristics.char_climate_control || [],
    char_condition: characteristics.char_condition || [],
    char_features: characteristics.char_features || [],
    char_furniture: characteristics.char_furniture || [],
    char_garden: characteristics.char_garden || [],
    char_kitchen: characteristics.char_kitchen || [],
    char_orientation: characteristics.char_orientation || [],
    char_parking: characteristics.char_parking || [],
    char_pool: characteristics.char_pool || [],
    char_security: characteristics.char_security || [],
    char_setting: characteristics.char_setting || [],
    char_utilities: characteristics.char_utilities || [],
    char_views: characteristics.char_views || [],
  }

  return transformedData
}