"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import type { Property } from "@/types/property"

export function usePropertyDetail(propertyId: string | number) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const transformApiData = (apiData: any): Property => {
    console.log("Transforming property detail:", apiData)

    return {
      // Direct API mapping
      id: apiData.id,
      external_id: apiData.external_id,
      status: apiData.status,
      category: apiData.category,
      development_name: apiData.development_name,
      urbanisation_name: apiData.urbanisation_name,
      price: apiData.price || 0,
      price_to: apiData.price_to,
      currency: apiData.currency || "EUR",
      shortterm_low: apiData.shortterm_low,
      shortterm_high: apiData.shortterm_high,
      longterm: apiData.longterm,
      completion_date: apiData.completion_date,
      latitude: apiData.latitude,
      longitude: apiData.longitude,
      type_uk: apiData.type_uk,
      type_es: apiData.type_es,
      subtype_uk: apiData.subtype_uk,
      subtype_es: apiData.subtype_es,
      country: apiData.country,
      province: apiData.province,
      town: apiData.town,
      area: apiData.area,
      beds: apiData.beds,
      beds_to: apiData.beds_to,
      baths: apiData.baths,
      baths_to: apiData.baths_to,
      built: apiData.built,
      built_to: apiData.built_to,
      terrace: apiData.terrace,
      terrace_to: apiData.terrace_to,
      plot: apiData.plot,
      plot_to: apiData.plot_to,
      has_pool: apiData.has_pool,
      has_garden: apiData.has_garden,
      has_garage: apiData.has_garage,
      description_uk: apiData.description_uk,
      description_es: apiData.description_es,
      created_at: apiData.created_at,
      listed_date: apiData.listed_date,
      last_updated: apiData.last_updated,

      // Legacy compatibility
      bedrooms: apiData.beds,
      bathrooms: apiData.baths,
      property_type: apiData.type_uk || apiData.subtype_uk,
      description: apiData.description_uk,
      gallery: apiData.images || ["/placeholder.svg?height=400&width=600&text=Property+Image"],
      pool: apiData.has_pool,
      garden: apiData.has_garden,
      garage: apiData.has_garage,
    }
  }

  const fetchProperty = async () => {
    if (!propertyId) return

    setLoading(true)
    setError(null)

    try {
      const data = await apiClient.getProperty(propertyId)
      const transformedProperty = transformApiData(data)
      setProperty(transformedProperty)
    } catch (error) {
      console.error("Error fetching property detail:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch property")

      // Fallback mock data
      const mockProperty: Property = {
        id: propertyId,
        development_name: "Luxury Property",
        town: "Prime Location",
        price: 2500000,
        currency: "EUR",
        beds: 4,
        baths: 3,
        built: 300,
        type_uk: "Villa",
        description_uk: "Beautiful property with modern amenities and stunning views.",
        has_pool: true,
        has_garden: true,
        has_garage: true,
        // Legacy
        bedrooms: 4,
        bathrooms: 3,
        property_type: "Villa",
        description: "Beautiful property with modern amenities and stunning views.",
        gallery: ["/placeholder.svg?height=400&width=600&text=Property+Image"],
        pool: true,
        garden: true,
        garage: true,
      }

      setProperty(mockProperty)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperty()
  }, [propertyId])

  return {
    property,
    loading,
    error,
    refetch: fetchProperty,
  }
}
