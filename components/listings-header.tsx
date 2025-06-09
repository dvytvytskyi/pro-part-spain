"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Menu,
  X,
  Search,
  MapPin,
  AlertCircle,
  ChevronDown,
  DollarSign,
  Home,
  Bed,
  Waves,
  TreePine,
  Car,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FilterState } from "@/types/property"

const popularLocations = [
  "Marbella",
  "Barcelona",
  "Madrid",
  "Valencia",
  "Ibiza",
  "Mallorca",
  "Seville",
  "Malaga",
  "Granada",
  "Alicante",
]

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

const MAX_LOCATIONS = 3

interface ListingsHeaderProps {
  filters?: FilterState
  onFiltersChange?: (filters: FilterState) => void
  onClearFilters?: () => void
  showSearch?: boolean
  showFilters?: boolean
}

export function ListingsHeader({
  filters = {},
  onFiltersChange,
  onClearFilters,
  showSearch = true,
  showFilters = true,
}: ListingsHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [filteredLocations, setFilteredLocations] = useState<string[]>([])
  const [showMaxWarning, setShowMaxWarning] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [priceFrom, setPriceFrom] = useState<string>("")
  const [priceTo, setPriceTo] = useState<string>("")

  const searchRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const typeRef = useRef<HTMLDivElement>(null)
  const bedsRef = useRef<HTMLDivElement>(null)

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false)
      }

      if (activeFilter === "price" && priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setActiveFilter(null)
      }

      if (activeFilter === "type" && typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setActiveFilter(null)
      }

      if (activeFilter === "beds" && bedsRef.current && !bedsRef.current.contains(event.target as Node)) {
        setActiveFilter(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeFilter])

  // Check for active category from URL
  useEffect(() => {
    const url = new URL(window.location.href)
    const categoryParam = url.searchParams.get("category")
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [])

  // Filter locations based on search query
  useEffect(() => {
    const availableLocations = popularLocations.filter((location) => !selectedLocations.includes(location))

    if (searchQuery.length >= 1) {
      const filtered = availableLocations.filter((location) =>
        location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredLocations(filtered.slice(0, 6))
    } else {
      setFilteredLocations(availableLocations.slice(0, 6))
    }
  }, [searchQuery, selectedLocations])

  // Hide max warning after 3 seconds
  useEffect(() => {
    if (showMaxWarning) {
      const timer = setTimeout(() => {
        setShowMaxWarning(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showMaxWarning])

  // Initialize price fields from filters
  useEffect(() => {
    if (filters.min_price) {
      setPriceFrom(new Intl.NumberFormat("en-US").format(filters.min_price))
    } else {
      setPriceFrom("")
    }

    if (filters.max_price) {
      setPriceTo(new Intl.NumberFormat("en-US").format(filters.max_price))
    } else {
      setPriceTo("")
    }
  }, [filters.min_price, filters.max_price])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!onFiltersChange) return

    const newFilters = { ...filters }

    if (selectedLocations.length > 0) {
      newFilters.town = selectedLocations[0]
    }

    if (searchQuery.trim()) {
      newFilters.development_name = searchQuery
    }

    onFiltersChange(newFilters)
  }

  const addLocation = (location: string) => {
    if (selectedLocations.length >= MAX_LOCATIONS) {
      setShowMaxWarning(true)
      return
    }

    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location])
    }
    setSearchQuery("")
    setIsLocationOpen(false)
  }

  const removeLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((loc) => loc !== location))
    setShowMaxWarning(false)
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    if (!onFiltersChange) return

    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handlePriceChange = (value: string) => {
    if (!onFiltersChange) return

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

  const formatPriceInput = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Add thousand separators
    if (digits) {
      return new Intl.NumberFormat("en-US").format(Number.parseInt(digits))
    }
    return ""
  }

  const parsePriceInput = (value: string) => {
    return Number.parseInt(value.replace(/,/g, "")) || 0
  }

  const getCurrentPriceLabel = () => {
    if (filters.min_price || filters.max_price) {
      const min = filters.min_price ? `$${new Intl.NumberFormat("en-US").format(filters.min_price)}` : "0"
      const max = filters.max_price ? `$${new Intl.NumberFormat("en-US").format(filters.max_price)}` : "Any"
      return `${min} - ${max}`
    }
    return "Price"
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0),
  )

  return (
    <header className="bg-white border-b border-gray-100 relative sticky top-0 z-50">
      {/* Top Container */}
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Burger + Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
              {mobileMenuOpen ? <X className="h-4 w-4 text-gray-700" /> : <Menu className="h-4 w-4 text-gray-700" />}
            </Button>
            <Link href="/" className="relative h-6 w-20">
              <Image src="/images/logo-black.png" alt="PRO PART" fill className="object-contain" priority />
            </Link>
          </div>

          {/* Center - Search (only show if showSearch is true) */}
          {showSearch && (
            <div ref={searchRef} className="relative w-[35%] min-w-[400px] max-w-[600px]">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  {/* Search Icon */}
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />

                  {/* Selected Location Tags */}
                  {selectedLocations.length > 0 && (
                    <div className="absolute left-12 top-1/2 transform -translate-y-1/2 flex items-center gap-1 z-10">
                      {selectedLocations.map((location) => (
                        <div
                          key={location}
                          className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700"
                        >
                          <span className="font-light">{location}</span>
                          <button
                            type="button"
                            onClick={() => removeLocation(location)}
                            className="ml-2 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder={selectedLocations.length > 0 ? "Add more locations..." : "Search locations..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsLocationOpen(true)}
                    className={`w-full ${
                      selectedLocations.length > 0 ? "pl-[200px]" : "pl-12"
                    } pr-20 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full text-gray-700 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:bg-white focus:border-gray-300 transition-all duration-200 outline-none h-9`}
                    disabled={selectedLocations.length >= MAX_LOCATIONS}
                  />

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-light text-sm border border-gray-200 transition-all duration-200 h-7"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Max Locations Warning */}
              {showMaxWarning && (
                <div className="absolute -bottom-10 left-0 right-0 bg-white border border-red-200 text-red-600 rounded-lg px-3 py-2 text-xs flex items-center gap-2 shadow-md z-50">
                  <AlertCircle className="h-3 w-3" />
                  <span>You can select maximum {MAX_LOCATIONS} locations</span>
                </div>
              )}

              {/* Location Dropdown */}
              {isLocationOpen && selectedLocations.length < MAX_LOCATIONS && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-[50] max-h-64 overflow-y-auto">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-light text-gray-500 border-b border-gray-100 sticky top-0 bg-white">
                      {searchQuery ? "Search Results" : "Popular Locations"}
                      <span className="text-gray-400 ml-1">
                        (Select up to {MAX_LOCATIONS - selectedLocations.length} more)
                      </span>
                    </div>
                    {filteredLocations.map((location, index) => (
                      <button
                        key={index}
                        onClick={() => addLocation(location)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                      >
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-700 font-light text-sm">{location}</span>
                      </button>
                    ))}
                    {filteredLocations.length === 0 && (
                      <div className="px-4 py-3 text-center text-gray-400 font-light text-sm">
                        {selectedLocations.length === popularLocations.length
                          ? "All locations selected"
                          : "No locations found"}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right Side - Navigation */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Link
                href="/agent"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-light text-[14px]"
              >
                Agent?
              </Link>
              <Link
                href="/join"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-light text-[14px]"
              >
                Join
              </Link>
            </div>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-light text-[14px]"
            >
              Contact us
            </Link>
            <Link
              href="/auth"
              className="text-gray-600 hover:text-gray-900 font-light text-[14px] border border-gray-300 px-4 py-0.5 h-7 rounded-md flex items-center justify-center"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Container - Filters (only show if showFilters is true) */}
      {showFilters && (
        <div className="relative overflow-visible">
          {/* Top border line */}
          <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-gray-200"></div>
          {/* Bottom border line */}
          <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gray-200"></div>

          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar">
              {/* Filters Section */}
              <div className="flex items-center gap-3 pr-4">
                {/* Price Filter */}
                <div className="relative" ref={priceRef}>
                  <button
                    onClick={() => setActiveFilter(activeFilter === "price" ? null : "price")}
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border ${
                      activeFilter === "price" ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white"
                    } hover:border-gray-300 transition-all duration-200`}
                  >
                    <DollarSign className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-gray-900 font-light text-[14px]">{getCurrentPriceLabel()}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  </button>

                  {activeFilter === "price" && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-[1000] min-w-80 p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-light text-gray-500 mb-1">From</label>
                            <input
                              type="text"
                              placeholder="0"
                              value={priceFrom}
                              onChange={(e) => setPriceFrom(formatPriceInput(e.target.value))}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-light text-gray-500 mb-1">To</label>
                            <input
                              type="text"
                              placeholder="Any"
                              value={priceTo}
                              onChange={(e) => setPriceTo(formatPriceInput(e.target.value))}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-light text-gray-500">Quick select:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {priceRanges.map((range) => (
                              <button
                                key={range.label}
                                onClick={() => handlePriceChange(range.label)}
                                className="text-left px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-light"
                              >
                                {range.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <button
                            onClick={() => {
                              setPriceFrom("")
                              setPriceTo("")
                              if (onFiltersChange) {
                                onFiltersChange({
                                  ...filters,
                                  min_price: null,
                                  max_price: null,
                                })
                              }
                              setActiveFilter(null)
                            }}
                            className="text-xs text-gray-500 hover:text-gray-700 font-light"
                          >
                            Clear
                          </button>

                          <button
                            onClick={() => {
                              const minPrice = priceFrom ? parsePriceInput(priceFrom) : null
                              const maxPrice = priceTo ? parsePriceInput(priceTo) : null

                              if (onFiltersChange) {
                                onFiltersChange({
                                  ...filters,
                                  min_price: minPrice,
                                  max_price: maxPrice,
                                })
                              }
                              setActiveFilter(null)
                            }}
                            className="bg-[#5784FF] text-white px-4 py-2 rounded-lg text-xs font-light hover:bg-[#4a70e0] transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Property Type Filter */}
                <div className="relative" ref={typeRef}>
                  <button
                    onClick={() => setActiveFilter(activeFilter === "type" ? null : "type")}
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border ${
                      activeFilter === "type" ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white"
                    } hover:border-gray-300 transition-all duration-200`}
                  >
                    <Home className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-gray-900 font-light text-[14px]">{filters.property_type || "Type"}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  </button>

                  {activeFilter === "type" && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-[999] min-w-48">
                      <div className="py-2">
                        {propertyTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => {
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
                </div>

                {/* Bedrooms Filter */}
                <div className="relative" ref={bedsRef}>
                  <button
                    onClick={() => setActiveFilter(activeFilter === "beds" ? null : "beds")}
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border ${
                      activeFilter === "beds" ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white"
                    } hover:border-gray-300 transition-all duration-200`}
                  >
                    <Bed className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-gray-900 font-light text-[14px]">
                      {filters.bedrooms ? `${filters.bedrooms} Beds` : "Beds"}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  </button>

                  {activeFilter === "beds" && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-[999] min-w-32">
                      <div className="py-2">
                        {bedroomOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
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
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-2 border-l border-gray-200 pl-3 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOption("pool")}
                    className={`
                transition-all duration-200 font-light text-xs h-6 px-2
                ${filters.pool ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"}
              `}
                  >
                    <Waves className="h-2 w-2 mr-1" />
                    Pool
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOption("garden")}
                    className={`
                transition-all duration-200 font-light text-xs h-6 px-2
                ${filters.garden ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"}
              `}
                  >
                    <TreePine className="h-2 w-2 mr-1" />
                    Garden
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOption("garage")}
                    className={`
                transition-all duration-200 font-light text-xs h-6 px-2
                ${filters.garage ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"}
              `}
                  >
                    <Car className="h-2 w-2 mr-1" />
                    Garage
                  </Button>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && onClearFilters && (
                  <Button
                    variant="ghost"
                    onClick={onClearFilters}
                    className="text-gray-500 hover:text-gray-700 font-light text-xs h-6 px-2 border-l border-gray-200 ml-2 pl-3"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-1/4 bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-xl ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <nav className="space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-[#C9A77C] transition-colors duration-200 text-[14px] font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <Link
                href="/agent"
                className="block text-gray-700 hover:text-[#C9A77C] transition-colors duration-200 text-[14px] font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Agent?
              </Link>
              <Link
                href="/join"
                className="block text-gray-700 hover:text-[#C9A77C] transition-colors duration-200 text-[14px] font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-[#C9A77C] transition-colors duration-200 text-[14px] font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact us
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-700 font-light text-[14px] px-0"
              >
                Log In
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#5784FF]/20 z-30" onClick={() => setMobileMenuOpen(false)} />
      )}
    </header>
  )
}
