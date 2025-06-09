"use client"

import { useState } from "react"
import type { Property, FilterState } from "@/types/property"

// Mock data outside hook to prevent recreation
const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    development_name: "Luxury Villa Marbella",
    town: "Marbella",
    price: 3450000,
    area: 420,
    bedrooms: 5,
    bathrooms: 4,
    property_type: "Villa",
    description: "Stunning contemporary villa with panoramic sea views, infinity pool, and smart home technology.",
    gallery: ["/images/property-3.webp", "/images/property-1.webp", "/images/property-5.webp"],
    pool: true,
    garden: true,
    garage: true,
  },
  {
    id: 2,
    development_name: "City Center Penthouse",
    town: "Madrid",
    price: 2750000,
    area: 200,
    bedrooms: 3,
    bathrooms: 3,
    property_type: "Penthouse",
    description: "Exclusive penthouse in the heart of Madrid with private rooftop terrace and premium finishes.",
    gallery: ["/images/property-6.webp", "/images/property-2.webp", "/images/property-4.webp"],
    pool: false,
    garden: false,
    garage: true,
  },
  {
    id: 3,
    development_name: "Mediterranean Villa",
    town: "Ibiza",
    price: 4200000,
    area: 350,
    bedrooms: 4,
    bathrooms: 5,
    property_type: "Villa",
    description: "Authentic Mediterranean villa with direct sea access and expansive outdoor living areas.",
    gallery: ["/images/property-4.webp", "/images/property-6.webp", "/images/property-1.webp"],
    pool: true,
    garden: true,
    garage: true,
  },
  {
    id: 4,
    development_name: "Modern Townhouse",
    town: "Barcelona",
    price: 1850000,
    area: 180,
    bedrooms: 3,
    bathrooms: 2,
    property_type: "Townhouse",
    description: "Contemporary townhouse in Barcelona's vibrant Eixample district with rooftop terrace.",
    gallery: ["/images/property-2.webp", "/images/property-5.webp", "/images/property-3.webp"],
    pool: false,
    garden: true,
    garage: true,
  },
  {
    id: 5,
    development_name: "Beachfront Apartment",
    town: "Malaga",
    price: 1450000,
    area: 140,
    bedrooms: 2,
    bathrooms: 2,
    property_type: "Apartment",
    description: "Luxury beachfront apartment with uninterrupted sea views and resort-style amenities.",
    gallery: ["/images/property-1.webp", "/images/property-4.webp", "/images/property-2.webp"],
    pool: true,
    garden: false,
    garage: true,
  },
  {
    id: 6,
    development_name: "Historic Villa Renovation",
    town: "Seville",
    price: 3950000,
    area: 380,
    bedrooms: 6,
    bathrooms: 5,
    property_type: "Villa",
    description: "Meticulously restored historic villa combining original features with modern luxury.",
    gallery: ["/images/property-5.webp", "/images/property-3.webp", "/images/property-6.webp"],
    pool: true,
    garden: true,
    garage: true,
  },
]

const ITEMS_PER_PAGE = 30

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredData, setFilteredData] = useState<Property[]>([])

  const filterProperties = (filters: FilterState) => {
    let filtered = [...MOCK_PROPERTIES]

    // Filter by price
    if (filters.min_price) {
      filtered = filtered.filter((p) => p.price >= filters.min_price!)
    }
    if (filters.max_price) {
      filtered = filtered.filter((p) => p.price <= filters.max_price!)
    }

    // Filter by area
    if (filters.min_area) {
      filtered = filtered.filter((p) => p.area && p.area >= filters.min_area!)
    }
    if (filters.max_area) {
      filtered = filtered.filter((p) => p.area && p.area <= filters.max_area!)
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      filtered = filtered.filter((p) => p.bedrooms === filters.bedrooms)
    }

    // Filter by property type
    if (filters.property_type && filters.property_type !== "Any Type") {
      filtered = filtered.filter((p) => p.property_type === filters.property_type)
    }

    // Filter by town
    if (filters.town) {
      filtered = filtered.filter((p) => p.town?.toLowerCase().includes(filters.town!.toLowerCase()))
    }

    // Filter by development name
    if (filters.development_name) {
      filtered = filtered.filter((p) =>
        p.development_name?.toLowerCase().includes(filters.development_name!.toLowerCase()),
      )
    }

    // Filter by amenities
    if (filters.pool) {
      filtered = filtered.filter((p) => p.pool)
    }
    if (filters.garden) {
      filtered = filtered.filter((p) => p.garden)
    }
    if (filters.garage) {
      filtered = filtered.filter((p) => p.garage)
    }

    return filtered
  }

  const searchProperties = async (filters: FilterState, page = 1) => {
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const filtered = filterProperties(filters)
    setFilteredData(filtered)

    // Get items for the current page
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const pageItems = filtered.slice(0, endIndex)

    setProperties(pageItems)
    setCurrentPage(page)
    setHasMore(endIndex < filtered.length)
    setLoading(false)
  }

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const nextPage = currentPage + 1
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const pageItems = filteredData.slice(0, endIndex)

    setProperties(pageItems)
    setCurrentPage(nextPage)
    setHasMore(endIndex < filteredData.length)
    setLoading(false)
  }

  const resetProperties = () => {
    setProperties([])
    setCurrentPage(1)
    setHasMore(true)
    setFilteredData([])
  }

  return {
    properties,
    loading,
    hasMore,
    loadMore,
    searchProperties,
    resetProperties,
    totalCount: filteredData.length,
  }
}
