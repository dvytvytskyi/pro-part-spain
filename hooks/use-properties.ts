"use client"

import { useState } from "react"
import { apiClient } from "../lib/api"
import type { Property } from "../types/property"

export interface PropertySearchParams {
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

interface ApiResponse {
  data: Property[]
  total: number
  count: number
  properties: Property[]
}

const transformProperty = (property: any): Property => {
  return {
    id: property.id,
    title: property.title,
    location: property.location,
    price: property.price,
    propertyType: property.property_type,
    beds: property.beds,
    baths: property.baths,
    squareFootage: property.square_footage,
    description: property.description,
    images: property.images,
    isFeatured: property.is_featured,
    createdAt: property.created_at,
    updatedAt: property.updated_at,
  }
}

const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const searchProperties = async (params: PropertySearchParams) => {
    try {
      setLoading(true)
      setError(null)

      console.log("Searching properties with params:", params)

      const response = await apiClient.getProperties(params)
      console.log("API Response:", response)

      // Add null/undefined checks
      if (!response) {
        throw new Error("No response from API")
      }

      // Handle different response structures
      let propertiesData = []
      let totalCount = 0

      if (Array.isArray(response)) {
        // Direct array response
        propertiesData = response
        totalCount = response.length
      } else if (response.data && Array.isArray(response.data)) {
        // Nested data structure
        propertiesData = response.data
        totalCount = response.total || response.count || response.data.length
      } else if (response.properties && Array.isArray(response.properties)) {
        // Properties field
        propertiesData = response.properties
        totalCount = response.total || response.count || response.properties.length
      } else {
        console.warn("Unexpected API response structure:", response)
        propertiesData = []
        totalCount = 0
      }

      const transformedProperties = propertiesData.map(transformProperty)

      setProperties(transformedProperties)
      setTotal(totalCount)
      setHasMore(transformedProperties.length === params.per_page)
    } catch (err) {
      console.error("Error fetching properties:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch properties")
      setProperties([])
      setTotal(0)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    properties,
    loading,
    error,
    total,
    hasMore,
    searchProperties,
  }
}

export { useProperties }
export default useProperties
