"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ListingsHeader } from "@/components/listings-header"
import { PropertyCard } from "@/components/property-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/hooks/use-filters"
import type { FilterState } from "@/types/property"
import { apiClient } from "@/lib/api"

export default function ListingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [initialized, setInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeCategory, setActiveCategory] = useState("new building")
  const [displayedProperties, setDisplayedProperties] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState<number | null>(null)

  const { filters, updateFilters, clearFilters, initializeFromURL } = useFilters()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (user && user.email) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (!initialized) {
      const categoryFromUrl = searchParams.get("category") || "new-building"
      setActiveCategory(categoryFromUrl)
      initializeFromURL(searchParams)
      setInitialized(true)

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

  useEffect(() => {
    if (!initialized) return

    const fetchProperties = async () => {
      setLoading(true)
      try {
        const res = await apiClient.getProperties({
          ...filters,
          category: activeCategory,
          curPage: currentPage,
        })

        setDisplayedProperties(res.items)
        setNextPage(res.nextPage ?? null)
        setCurrentPage(1)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [filters, activeCategory, initialized])

  useEffect(() => {
    if (!initialized) return

    const params = new URLSearchParams()

    if (activeCategory !== "new-building") {
      params.set("category", activeCategory)
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0)) {
        params.set(key, Array.isArray(value) ? value.join(",") : value.toString())
      }
    })

    const newURL = params.toString() ? `/listings?${params.toString()}` : "/listings"
    router.replace(newURL, { scroll: false })
  }, [filters, activeCategory, initialized, router])

  const handleFilterChange = (newFilters: FilterState) => {
    updateFilters(newFilters)
  }

  const handleClearFilters = () => {
    clearFilters()
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  const handlePropertySelect = (id: number | string) => {
    if (activeCategory === "rentals") {
      router.push(`/rental/${id}`)
    } else if (activeCategory === "secondary") {
      router.push(`/secondary/${id}`)
    } else {
      router.push(`/new-building/${id}`)
    }
  }

  const handleLoadMore = async () => {
    if (!nextPage) return

    setLoading(true)
    try {
      const res = await apiClient.getProperties({
        filters,
        category: activeCategory,
        curPage: currentPage + 1,
      })

      setDisplayedProperties(prev => [...prev, ...res.items])
      setNextPage(res.nextPage ?? null)
      setCurrentPage(nextPage)
    } finally {
      setLoading(false)
    }
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

        <div className="py-4 mb-4">
          <h2 className="text-xl font-light text-gray-900">
            {getCategoryTitle()}
          </h2>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProperties.length > 0 ? (
              displayedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => handlePropertySelect(property.id)}
                />
              ))
            ) : (
              !loading && (
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
              )
            )}
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {nextPage && !loading && (
            <div className="text-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="px-12 py-3 border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-light"
              >
                Load More Properties
              </Button>
            </div>
          )}

          {!nextPage && displayedProperties.length > 0 && !loading && (
            <div className="text-center mt-12 py-8">
              <p className="text-gray-500 font-light">
                You've seen all {displayedProperties.length} properties
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}