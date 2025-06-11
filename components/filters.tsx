"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X, DollarSign, Home, Bed, MapPin, Search, Waves, TreePine, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import type { FilterState } from "@/types/property"

interface FiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

const priceRanges = [
  { label: "Any Price", value: null },
  { label: "Up to $500K", min: null, max: 500000 },
  { label: "$500K - $1M", min: 500000, max: 1000000 },
  { label: "$1M - $2M", min: 1000000, max: 2000000 },
  { label: "$2M+", min: 2000000, max: null },
]

const propertyTypes = ["Any Type", "Apartment", "Villa", "Townhouse", "Penthouse"]
const bedroomOptions = ["Any", "1", "2", "3", "4", "5+"]

const locations = [
  "Alicante",
  "Barcelona",
  "Cadiz",
  "Granada",
  "Ibiza",
  "Madrid",
  "Marbella",
  "Mallorca",
  "Malaga",
  "Seville",
  "Valencia",
]

interface SearchResult {
  type: "development" | "town"
  value: string
  label: string
}

export function Filters({ filters, onFiltersChange, onClearFilters }: FiltersProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const debouncedQuery = useDebounce(searchQuery, 300)
  const filterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeFilter &&
        filterRefs.current[activeFilter] &&
        !filterRefs.current[activeFilter]?.contains(event.target as Node)
      ) {
        setActiveFilter(null)
      }
      if (
        isSearchOpen &&
        filterRefs.current["search"] &&
        !filterRefs.current["search"]?.contains(event.target as Node)
      ) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeFilter, isSearchOpen])

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      searchSuggestions(debouncedQuery)
    } else {
      setSearchResults([])
      setIsSearchOpen(false)
    }
  }, [debouncedQuery])

  const searchSuggestions = async (searchQuery: string) => {
    setSearchLoading(true)
    try {
      const mockResults: SearchResult[] = [
        { type: "development", value: "Luxury Apartments Downtown", label: "Luxury Apartments Downtown" },
        { type: "development", value: "Seaside Villa Complex", label: "Seaside Villa Complex" },
        { type: "town", value: "Madrid", label: "Madrid" },
        { type: "town", value: "Barcelona", label: "Barcelona" },
      ].filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))

      setSearchResults(mockResults.slice(0, 6))
      setIsSearchOpen(mockResults.length > 0)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
      setIsSearchOpen(false)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleSearchSelect = (result: SearchResult) => {
    setSearchQuery(result.label)
    setIsSearchOpen(false)
    if (result.type === "development") {
      onFiltersChange({ ...filters, development_name: result.value })
    } else {
      onFiltersChange({ ...filters, town: result.value })
    }
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handlePriceChange = (value: string) => {
    const range = priceRanges.find((r) => r.label === value)
    if (range) {
      onFiltersChange({
        ...filters,
        min_price: range.min,
        max_price: range.max,
      })
    }
    setActiveFilter(null)
  }

  const toggleOption = (key: "pool" | "garden" | "garage") => {
    updateFilter(key, !filters[key])
  }

  const getCurrentPriceLabel = () => {
    const range = priceRanges.find((r) => r.min === filters.min_price && r.max === filters.max_price)
    return range?.label || "Price"
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0),
  )

  const FilterChip = ({ id, label, icon: Icon, isActive, onClick, children }: any) => (
    <div className="relative" ref={(el) => (filterRefs.current[id] = el)}>
      <button
        type="button"
        onClick={() => {
          console.log(`${id} filter clicked, current state:`, activeFilter)
          onClick()
        }}
        className={`
        border-gray-200 hover:border-gray-300 transition-all duration-200 font-light text-sm h-9 px-4 rounded-lg border
        ${isActive ? "bg-gray-50 border-gray-300" : "bg-white"}
        flex items-center gap-2
      `}
      >
        {Icon && <Icon className="h-3 w-3 text-gray-500" />}
        {label}
        {children && <ChevronDown className="h-3 w-3 text-gray-400" />}
      </button>
      {children}
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Main Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[300px]" ref={(el) => (filterRefs.current["search"] = el)}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
            <Input
              type="text"
              placeholder="Search by location or development name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border-gray-200 focus:border-gray-300 focus:ring-0 rounded-full bg-gray-50 focus:bg-white transition-colors font-light h-9"
            />
          </div>

          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-[100] max-h-80 overflow-y-auto">
              {searchLoading ? (
                <div className="p-4 text-center text-gray-400 font-light text-sm">Searching...</div>
              ) : searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.filter((r) => r.type === "development").length > 0 && (
                    <>
                      <div className="px-4 py-2 text-xs font-light text-gray-400 border-b border-gray-50">
                        Developments
                      </div>
                      {searchResults
                        .filter((r) => r.type === "development")
                        .map((result, index) => (
                          <button
                            key={`dev-${index}`}
                            onClick={() => handleSearchSelect(result)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                          >
                            <span className="text-gray-900 font-light text-sm">{result.label}</span>
                          </button>
                        ))}
                    </>
                  )}

                  {searchResults.filter((r) => r.type === "town").length > 0 && (
                    <>
                      {searchResults.filter((r) => r.type === "development").length > 0 && (
                        <div className="border-t border-gray-50" />
                      )}
                      <div className="px-4 py-2 text-xs font-light text-gray-400 border-b border-gray-50">
                        Locations
                      </div>
                      {searchResults
                        .filter((r) => r.type === "town")
                        .map((result, index) => (
                          <button
                            key={`town-${index}`}
                            onClick={() => handleSearchSelect(result)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                          >
                            <span className="text-gray-900 font-light text-sm">{result.label}</span>
                          </button>
                        ))}
                    </>
                  )}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-400 font-light text-sm">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <FilterChip
          id="price"
          label={getCurrentPriceLabel()}
          icon={DollarSign}
          isActive={activeFilter === "price"}
          onClick={() => setActiveFilter(activeFilter === "price" ? null : "price")}
        >
          {activeFilter === "price" && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-[9999] min-w-48">
              <div className="py-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    type="button"
                    onClick={() => handlePriceChange(range.label)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors font-light text-sm"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </FilterChip>

        {/* Property Type Filter */}
        <FilterChip
          id="type"
          label={filters.property_type || "Type"}
          icon={Home}
          isActive={activeFilter === "type"}
          onClick={() => setActiveFilter(activeFilter === "type" ? null : "type")}
        >
          {activeFilter === "type" && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-[100] min-w-48">
              <div className="py-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      updateFilter("property_type", type === "Any Type" ? null : type)
                      setActiveFilter(null)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors font-light text-sm"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </FilterChip>

        {/* Bedrooms Filter */}
        <FilterChip
          id="beds"
          label={filters.bedrooms ? `${filters.bedrooms} Beds` : "Beds"}
          icon={Bed}
          isActive={activeFilter === "beds"}
          onClick={() => setActiveFilter(activeFilter === "beds" ? null : "beds")}
        >
          {activeFilter === "beds" && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-[100] min-w-32">
              <div className="py-2">
                {bedroomOptions.map((option) => (
                  <button
                    key={option}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      updateFilter("bedrooms", option === "Any" ? null : Number.parseInt(option))
                      setActiveFilter(null)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors font-light text-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </FilterChip>

        {/* Location Filter */}
        <FilterChip
          id="location"
          label={filters.town || "Location"}
          icon={MapPin}
          isActive={activeFilter === "location"}
          onClick={() => setActiveFilter(activeFilter === "location" ? null : "location")}
        >
          {activeFilter === "location" && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-[100] min-w-48 max-h-80 overflow-y-auto">
              <div className="py-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updateFilter("town", null)
                    setActiveFilter(null)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors font-light text-sm"
                >
                  Any Location
                </button>
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      updateFilter("town", location)
                      setActiveFilter(null)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors font-light text-sm"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          )}
        </FilterChip>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700 font-light text-sm h-9"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Amenities Row */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-light mr-2">Amenities:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleOption("pool")}
          className={`
            border-gray-200 hover:border-gray-300 transition-all duration-200 font-light text-xs h-7 px-3
            ${filters.pool ? "bg-gray-50 border-gray-300" : "bg-white"}
          `}
        >
          <Waves className="h-2 w-2 mr-1 text-gray-500" />
          Pool
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleOption("garden")}
          className={`
            border-gray-200 hover:border-gray-300 transition-all duration-200 font-light text-xs h-7 px-3
            ${filters.garden ? "bg-gray-50 border-gray-300" : "bg-white"}
          `}
        >
          <TreePine className="h-2 w-2 mr-1 text-gray-500" />
          Garden
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleOption("garage")}
          className={`
            border-gray-200 hover:border-gray-300 transition-all duration-200 font-light text-xs h-7 px-3
            ${filters.garage ? "bg-gray-50 border-gray-300" : "bg-white"}
          `}
        >
          <Car className="h-2 w-2 mr-1 text-gray-500" />
          Garage
        </Button>
      </div>
    </div>
  )
}
