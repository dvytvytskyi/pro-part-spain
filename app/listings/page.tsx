"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ListingsHeader } from "@/components/listings-header"
import { PropertyCard } from "@/components/property-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/hooks/use-filters"
import type { FilterState, Property } from "@/types/property"

// Mock property data
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Luxury Villa in La Zagaleta",
    price: 8500000,
    currency: "EUR",
    location: "La Zagaleta, Benahavís",
    bedrooms: 6,
    bathrooms: 7,
    builtArea: 850,
    plotSize: 2500,
    propertyType: "Villa",
    images: ["/images/property-1.webp", "/images/property-2.webp", "/images/property-3.webp"],
    description:
      "Spectacular luxury villa with panoramic sea and mountain views in the exclusive La Zagaleta community.",
    features: ["Sea View", "Mountain View", "Private Pool", "Garage", "Garden"],
    category: "new-building",
  },
  {
    id: 2,
    title: "Modern Penthouse in Puerto Banús",
    price: 3200000,
    currency: "EUR",
    location: "Puerto Banús, Marbella",
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 320,
    plotSize: null,
    propertyType: "Penthouse",
    images: ["/images/property-2.webp", "/images/property-3.webp", "/images/property-4.webp"],
    description: "Stunning penthouse with large terrace and direct marina views in the heart of Puerto Banús.",
    features: ["Sea View", "Terrace", "Air Conditioning", "Parking", "Storage"],
    category: "secondary",
  },
  {
    id: 3,
    title: "Beachfront Apartment in Estepona",
    price: 1850000,
    currency: "EUR",
    location: "Estepona, Costa del Sol",
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 180,
    plotSize: null,
    propertyType: "Apartment",
    images: ["/images/property-3.webp", "/images/property-4.webp", "/images/property-5.webp"],
    description: "Elegant beachfront apartment with direct beach access and stunning Mediterranean views.",
    features: ["Beachfront", "Sea View", "Swimming Pool", "Gym", "Concierge"],
    category: "new-building",
  },
  {
    id: 4,
    title: "Contemporary Villa in Nueva Andalucía",
    price: 4500000,
    currency: "EUR",
    location: "Nueva Andalucía, Marbella",
    bedrooms: 5,
    bathrooms: 6,
    builtArea: 650,
    plotSize: 1200,
    propertyType: "Villa",
    images: ["/images/property-4.webp", "/images/property-5.webp", "/images/property-6.webp"],
    description: "Modern villa with golf course views and high-end finishes in the prestigious Golf Valley.",
    features: ["Golf View", "Private Pool", "Wine Cellar", "Home Cinema", "Gym"],
    category: "secondary",
  },
  {
    id: 5,
    title: "Luxury Rental Villa in Golden Mile",
    price: 15000,
    currency: "EUR",
    location: "Golden Mile, Marbella",
    bedrooms: 7,
    bathrooms: 8,
    builtArea: 900,
    plotSize: 3000,
    propertyType: "Villa",
    images: ["/images/property-5.webp", "/images/property-6.webp", "/images/property-1.webp"],
    description: "Exceptional luxury villa for rent with private beach access and full staff quarters.",
    features: ["Beachfront", "Private Beach", "Staff Quarters", "Spa", "Tennis Court"],
    category: "rentals",
    rentalType: "monthly",
  },
  {
    id: 6,
    title: "Modern Townhouse in San Pedro",
    price: 950000,
    currency: "EUR",
    location: "San Pedro de Alcántara",
    bedrooms: 4,
    bathrooms: 3,
    builtArea: 280,
    plotSize: 150,
    propertyType: "Townhouse",
    images: ["/images/property-6.webp", "/images/property-1.webp", "/images/property-2.webp"],
    description: "Stylish townhouse in a gated community with communal pool and gardens.",
    features: ["Gated Community", "Swimming Pool", "Garden", "Parking", "Storage"],
    category: "new-building",
  },
  {
    id: 7,
    title: "Duplex Penthouse in Marbella Center",
    price: 2800000,
    currency: "EUR",
    location: "Marbella Center",
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 350,
    plotSize: null,
    propertyType: "Penthouse",
    images: ["/images/property-1.webp", "/images/property-3.webp", "/images/property-5.webp"],
    description: "Spectacular duplex penthouse with panoramic views and rooftop terrace in Marbella's old town.",
    features: ["City View", "Rooftop Terrace", "Elevator", "Air Conditioning", "Fireplace"],
    category: "secondary",
  },
  {
    id: 8,
    title: "Luxury Apartment Rental in Puerto Banús",
    price: 4500,
    currency: "EUR",
    location: "Puerto Banús, Marbella",
    bedrooms: 2,
    bathrooms: 2,
    builtArea: 120,
    plotSize: null,
    propertyType: "Apartment",
    images: ["/images/property-2.webp", "/images/property-4.webp", "/images/property-6.webp"],
    description: "Elegant apartment for rent with marina views and walking distance to beaches and restaurants.",
    features: ["Marina View", "Furnished", "Air Conditioning", "Parking", "24h Security"],
    category: "rentals",
    rentalType: "monthly",
  },
  {
    id: 9,
    title: "New Development in Cancelada",
    price: 750000,
    currency: "EUR",
    location: "Cancelada, Estepona",
    bedrooms: 3,
    bathrooms: 2,
    builtArea: 150,
    plotSize: null,
    propertyType: "Apartment",
    images: ["/images/property-3.webp", "/images/property-1.webp", "/images/property-4.webp"],
    description: "Brand new apartment in modern development with sea views and resort-style amenities.",
    features: ["Sea View", "New Development", "Swimming Pool", "Gym", "Spa"],
    category: "new-building",
  },
  {
    id: 10,
    title: "Traditional Andalusian Villa",
    price: 3800000,
    currency: "EUR",
    location: "Sierra Blanca, Marbella",
    bedrooms: 6,
    bathrooms: 5,
    builtArea: 550,
    plotSize: 2000,
    propertyType: "Villa",
    images: ["/images/property-4.webp", "/images/property-2.webp", "/images/property-6.webp"],
    description: "Charming traditional villa with modern amenities and stunning mountain views.",
    features: ["Mountain View", "Traditional Style", "Private Pool", "Mature Garden", "Wine Cellar"],
    category: "secondary",
  },
  {
    id: 11,
    title: "Holiday Rental in Mijas Costa",
    price: 2800,
    currency: "EUR",
    location: "Mijas Costa",
    bedrooms: 3,
    bathrooms: 2,
    builtArea: 140,
    plotSize: null,
    propertyType: "Apartment",
    images: ["/images/property-5.webp", "/images/property-3.webp", "/images/property-1.webp"],
    description: "Perfect holiday rental with sea views and access to beautiful beaches and golf courses.",
    features: ["Sea View", "Beach Access", "Golf Nearby", "Furnished", "Balcony"],
    category: "rentals",
    rentalType: "weekly",
  },
  {
    id: 12,
    title: "Ultra-Modern Villa in Benahavis",
    price: 12000000,
    currency: "EUR",
    location: "Benahavís",
    bedrooms: 8,
    bathrooms: 10,
    builtArea: 1200,
    plotSize: 4000,
    propertyType: "Villa",
    images: ["/images/property-6.webp", "/images/property-4.webp", "/images/property-2.webp"],
    description: "Architectural masterpiece with cutting-edge design and panoramic views of the Mediterranean.",
    features: ["Sea View", "Mountain View", "Infinity Pool", "Home Automation", "Elevator"],
    category: "new-building",
  },
]

export default function ListingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [initialized, setInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeCategory, setActiveCategory] = useState("new-building")
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const { filters, updateFilters, clearFilters, initializeFromURL } = useFilters()

  const PROPERTIES_PER_PAGE = 6

  // Check if user is authenticated
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (user && user.email) {
      setIsAuthenticated(true)
    }
  }, [])

  // Initialize filters and category from URL on mount
  useEffect(() => {
    if (!initialized) {
      const categoryFromUrl = searchParams.get("category") || "new-building"
      setActiveCategory(categoryFromUrl)
      initializeFromURL(searchParams)
      setInitialized(true)

      // Restore scroll position
      const savedPosition = sessionStorage.getItem("listingsScrollPosition")
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo({
            top: Number.parseInt(savedPosition),
            behavior: "instant",
          })
        }, 100)
      }
    }
  }, [])

  // Filter properties based on category and filters
  useEffect(() => {
    if (!initialized) return

    let filtered = mockProperties.filter((property) => property.category === activeCategory)

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(filters.location!.toLowerCase()),
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter((property) => property.price >= filters.minPrice!)
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((property) => property.price <= filters.maxPrice!)
    }

    if (filters.bedrooms && filters.bedrooms.length > 0) {
      filtered = filtered.filter((property) => filters.bedrooms!.includes(property.bedrooms))
    }

    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filtered = filtered.filter((property) => filters.propertyTypes!.includes(property.propertyType))
    }

    setFilteredProperties(filtered)
    setCurrentPage(1)
    setDisplayedProperties(filtered.slice(0, PROPERTIES_PER_PAGE))
  }, [activeCategory, filters, initialized])

  // Update URL when filters or category change
  useEffect(() => {
    if (!initialized) return

    const params = new URLSearchParams()

    // Add category to URL
    if (activeCategory !== "new-building") {
      params.set("category", activeCategory)
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0)) {
        if (Array.isArray(value)) {
          params.set(key, value.join(","))
        } else {
          params.set(key, value.toString())
        }
      }
    })

    const newURL = params.toString() ? `/listings?${params.toString()}` : "/listings"
    router.replace(newURL, { scroll: false })
  }, [filters, activeCategory, initialized, router])

  // Save scroll position on scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null

    const handleScroll = () => {
      if (scrollTimeout) return

      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem("listingsScrollPosition", window.scrollY.toString())
        scrollTimeout = null
      }, 200)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  const handleFilterChange = (newFilters: FilterState) => {
    updateFilters(newFilters)
  }

  const handleClearFilters = () => {
    clearFilters()
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handlePropertySelect = (id: number | string) => {
    // Save current scroll position
    sessionStorage.setItem("listingsScrollPosition", window.scrollY.toString())

    // Navigate to appropriate page based on category
    if (activeCategory === "rentals") {
      router.push(`/rental/${id}`)
    } else if (activeCategory === "secondary") {
      router.push(`/secondary/${id}`)
    } else {
      router.push(`/new-building/${id}`)
    }
  }

  const handleLoadMore = () => {
    setLoading(true)
    setTimeout(() => {
      const nextPage = currentPage + 1
      const startIndex = currentPage * PROPERTIES_PER_PAGE
      const endIndex = startIndex + PROPERTIES_PER_PAGE
      const newProperties = filteredProperties.slice(startIndex, endIndex)

      setDisplayedProperties((prev) => [...prev, ...newProperties])
      setCurrentPage(nextPage)
      setLoading(false)
    }, 500)
  }

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case "new-building":
        return "New Building Properties"
      case "secondary":
        return "Secondary Market Properties"
      case "rentals":
        return "Rental Properties"
      default:
        return "Properties"
    }
  }

  const hasMore = displayedProperties.length < filteredProperties.length

  return (
    <div className="min-h-screen bg-white">
      {!isAuthenticated && (
        <ListingsHeader
          filters={filters}
          onFiltersChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      <main className="max-w-7xl mx-auto px-6">
        {/* Filters Section - Only show if authenticated */}
        {isAuthenticated && (
          <div className="py-6">
            <ListingsHeader
              filters={filters}
              onFiltersChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              showSearch={true}
              showFilters={true}
            />
          </div>
        )}

        {/* Results Header */}
        <div className="py-4 mb-4">
          <h2 className="text-xl font-light text-gray-900">
            {getCategoryTitle()} ({filteredProperties.length} listings)
            {displayedProperties.length > 0 && displayedProperties.length < filteredProperties.length && (
              <span className="text-gray-500 ml-2">
                Showing {displayedProperties.length} of {filteredProperties.length}
              </span>
            )}
          </h2>
        </div>

        {/* Property Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProperties.length > 0
              ? displayedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => handlePropertySelect(property.id)}
                  />
                ))
              : !loading && (
                  <div className="col-span-full text-center py-24">
                    <p className="text-sm text-gray-400 font-light">No properties found</p>
                    <Button
                      onClick={handleClearFilters}
                      variant="outline"
                      className="mt-6 border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-light"
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !loading && displayedProperties.length > 0 && (
            <div className="text-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="px-12 py-3 border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-light"
              >
                Load More Properties ({filteredProperties.length - displayedProperties.length} remaining)
              </Button>
            </div>
          )}

          {/* End of Results */}
          {!hasMore && displayedProperties.length > 0 && !loading && (
            <div className="text-center mt-12 py-8">
              <p className="text-gray-500 font-light">You've seen all {filteredProperties.length} properties</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
