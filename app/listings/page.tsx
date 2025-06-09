"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ListingsHeader } from "@/components/listings-header"
import { PropertyCard } from "@/components/property-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { useProperties } from "@/hooks/use-properties"
import { useFilters } from "@/hooks/use-filters"
import type { FilterState } from "@/types/property"

export default function ListingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [initialized, setInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { filters, updateFilters, clearFilters, initializeFromURL } = useFilters()
  const { properties, loading, hasMore, loadMore, searchProperties, resetProperties, totalCount } = useProperties()

  // Check if user is authenticated
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (user && user.email) {
      setIsAuthenticated(true)
    }
  }, [])

  // Initialize filters from URL on mount
  useEffect(() => {
    if (!initialized) {
      initializeFromURL(searchParams)
      searchProperties({})
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
  }, []) // Empty dependency array to run only once

  // Update URL when filters change
  useEffect(() => {
    if (!initialized) return

    const params = new URLSearchParams()

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
  }, [filters, initialized, router])

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
    resetProperties()
    searchProperties(newFilters)
  }

  const handleClearFilters = () => {
    clearFilters()
    resetProperties()
    searchProperties({})
  }

  const handlePropertySelect = (id: number | string) => {
    // Save current scroll position
    sessionStorage.setItem("listingsScrollPosition", window.scrollY.toString())
    // Navigate to new-building page instead of property page
    router.push(`/new-building/${id}`)
  }

  const handleLoadMore = () => {
    loadMore()
  }

  return (
    <div className="min-h-screen bg-white">
      {!isAuthenticated && (
        <ListingsHeader filters={filters} onFiltersChange={handleFilterChange} onClearFilters={handleClearFilters} />
      )}

      <main className="max-w-7xl mx-auto px-6">
        {/* Filters Section - Only show if authenticated */}
        {isAuthenticated && (
          <div className="py-6">
            <ListingsHeader
              filters={filters}
              onFiltersChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              showSearch={true}
              showFilters={true}
            />
          </div>
        )}

        {/* Results Header */}
        <div className="py-4 mb-4">
          <h2 className="text-xl font-light text-gray-900">
            Luxury Homes for Sale ({totalCount || 0} listings)
            {properties.length > 0 && properties.length < totalCount && (
              <span className="text-gray-500 ml-2">
                Showing {properties.length} of {totalCount}
              </span>
            )}
          </h2>
        </div>

        {/* Property Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(properties) && properties.length > 0
              ? properties.map((property) => (
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
          {hasMore && !loading && properties.length > 0 && (
            <div className="text-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="px-12 py-3 border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-light"
              >
                Load More Properties ({totalCount - properties.length} remaining)
              </Button>
            </div>
          )}

          {/* End of Results */}
          {!hasMore && properties.length > 0 && !loading && (
            <div className="text-center mt-12 py-8">
              <p className="text-gray-500 font-light">You've seen all {totalCount} properties</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
