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
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterModal } from "./filter-modal"
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

const propertyTypes = ["Apartment", "Villa", "Penthouse"]
const bedroomOptions = ["Studio", "1", "2", "3", "4", "5", "6", "7", "8"]

const MAX_LOCATIONS = 3

interface ListingsHeaderProps {
  filters?: FilterState
  onFiltersChange?: (filters: FilterState) => void
  onClearFilters?: () => void
  showSearch?: boolean
  showFilters?: boolean
  activeCategory?: string
  onCategoryChange?: (category: string) => void
}

export function ListingsHeader({
  filters = {},
  onFiltersChange,
  onClearFilters,
  showSearch = true,
  showFilters = true,
  activeCategory = "new-building",
  onCategoryChange,
}: ListingsHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [filteredLocations, setFilteredLocations] = useState<string[]>([])
  const [showMaxWarning, setShowMaxWarning] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Filter states
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [isBedsOpen, setIsBedsOpen] = useState(false)
  const [priceFrom, setPriceFrom] = useState("")
  const [priceTo, setPriceTo] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedBeds, setSelectedBeds] = useState<string[]>([])

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
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setIsPriceOpen(false)
      }
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false)
      }
      if (bedsRef.current && !bedsRef.current.contains(event.target as Node)) {
        setIsBedsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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

  const toggleOption = (key: "pool" | "garden" | "garage") => {
    updateFilter(key, !filters[key])
  }

  const formatPriceInput = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits) {
      return new Intl.NumberFormat("en-US").format(Number.parseInt(digits))
    }
    return ""
  }

  const togglePropertyType = (type: string) => {
    const newTypes = selectedTypes.includes(type) ? selectedTypes.filter((t) => t !== type) : [...selectedTypes, type]
    setSelectedTypes(newTypes)

    if (onFiltersChange) {
      onFiltersChange({
        ...filters,
        property_type: newTypes.length > 0 ? newTypes.join(",") : null,
      })
    }
  }

  const toggleBedroom = (bed: string) => {
    const newBeds = selectedBeds.includes(bed) ? selectedBeds.filter((b) => b !== bed) : [...selectedBeds, bed]
    setSelectedBeds(newBeds)

    if (onFiltersChange) {
      onFiltersChange({
        ...filters,
        bedrooms: newBeds.length > 0 ? newBeds.join(",") : null,
      })
    }
  }

  const applyPriceFilter = () => {
    const minPrice = priceFrom ? Number.parseInt(priceFrom.replace(/,/g, "")) : null
    const maxPrice = priceTo ? Number.parseInt(priceTo.replace(/,/g, "")) : null

    if (onFiltersChange) {
      onFiltersChange({
        ...filters,
        min_price: minPrice,
        max_price: maxPrice,
      })
    }
    setIsPriceOpen(false)
  }

  const clearPriceFilter = () => {
    setPriceFrom("")
    setPriceTo("")
    if (onFiltersChange) {
      onFiltersChange({
        ...filters,
        min_price: null,
        max_price: null,
      })
    }
    setIsPriceOpen(false)
  }

  const getPriceLabel = () => {
    return "Price"
  }

  const getTypeLabel = () => {
    if (selectedTypes.length === 0) return "Type"
    if (selectedTypes.length === 1) return selectedTypes[0]
    return `${selectedTypes.length} Types`
  }

  const getBedsLabel = () => {
    if (selectedBeds.length === 0) return "Beds"
    if (selectedBeds.length === 1) return selectedBeds[0] === "Studio" ? "Studio" : `${selectedBeds[0]} Beds`
    return `${selectedBeds.length} Selected`
  }

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedBeds.length > 0 ||
    priceFrom ||
    priceTo ||
    filters.pool ||
    filters.garden ||
    filters.garage

  const handleCategoryChange = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category)
    }
  }

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
            <div ref={searchRef} className="relative w-[35%] min-w-[400px] max-w-[600px] hidden md:block">
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-[200] max-h-64 overflow-y-auto">
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

      {/* Bottom Container - Filters */}
      {showFilters && (
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center justify-between">
              {/* Left Side - Filters */}
              <div className="flex items-center gap-4">
                {/* Price Filter */}
                <div className="relative" ref={priceRef}>
                  <button
                    type="button"
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-all duration-200 ${
                      isPriceOpen ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900 font-light text-[14px]">{getPriceLabel()}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${isPriceOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isPriceOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-[100] min-w-80 p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-light text-gray-500 mb-1">From (€)</label>
                            <input
                              type="text"
                              placeholder="0"
                              value={priceFrom}
                              onChange={(e) => setPriceFrom(formatPriceInput(e.target.value))}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none bg-white text-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-light text-gray-500 mb-1">To (€)</label>
                            <input
                              type="text"
                              placeholder="Any"
                              value={priceTo}
                              onChange={(e) => setPriceTo(formatPriceInput(e.target.value))}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none bg-white text-gray-900"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <button
                            type="button"
                            onClick={clearPriceFilter}
                            className="text-xs text-gray-500 hover:text-gray-700 font-light"
                          >
                            Clear
                          </button>
                          <button
                            type="button"
                            onClick={applyPriceFilter}
                            className="bg-black text-white px-4 py-2 rounded-lg text-xs font-light hover:bg-gray-800 transition-colors"
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
                    type="button"
                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-all duration-200 ${
                      isTypeOpen ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <Home className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900 font-light text-[14px]">{getTypeLabel()}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${isTypeOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isTypeOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-[100] min-w-48">
                      <div className="py-2">
                        {propertyTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => togglePropertyType(type)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                          >
                            <span className="text-gray-900 font-light text-[14px]">{type}</span>
                            {selectedTypes.includes(type) && <Check className="h-4 w-4 text-black" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bedrooms Filter */}
                <div className="relative" ref={bedsRef}>
                  <button
                    type="button"
                    onClick={() => setIsBedsOpen(!isBedsOpen)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-all duration-200 ${
                      isBedsOpen ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <Bed className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900 font-light text-[14px]">{getBedsLabel()}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${isBedsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isBedsOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-[100] min-w-48">
                      <div className="py-2">
                        {bedroomOptions.map((bed) => (
                          <button
                            key={bed}
                            type="button"
                            onClick={() => toggleBedroom(bed)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                          >
                            <span className="text-gray-900 font-light text-[14px]">
                              {bed === "Studio" ? "Studio" : `${bed} Bedroom${bed !== "1" ? "s" : ""}`}
                            </span>
                            {selectedBeds.includes(bed) && <Check className="h-4 w-4 text-black" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Buttons */}
                <div className="flex items-center gap-2 border-l border-gray-200 pl-4 ml-2">
                  <button
                    onClick={() => handleCategoryChange("new-building")}
                    className={`px-3 py-1 rounded-lg text-[14px] font-light transition-all duration-200 ${
                      activeCategory === "new-building"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    New Building
                  </button>
                  <button
                    onClick={() => handleCategoryChange("secondary")}
                    className={`px-3 py-1 rounded-lg text-[14px] font-light transition-all duration-200 ${
                      activeCategory === "secondary"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Secondary
                  </button>
                  <button
                    onClick={() => handleCategoryChange("rentals")}
                    className={`px-3 py-1 rounded-lg text-[14px] font-light transition-all duration-200 ${
                      activeCategory === "rentals"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Rentals
                  </button>
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-2 border-l border-gray-200 pl-4 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOption("pool")}
                    className={`transition-all duration-200 font-light text-[14px] h-6 px-2 ${
                      filters.pool
                        ? "bg-black text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Waves className="h-3 w-3 mr-1" />
                    Pool
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOption("garden")}
                    className={`transition-all duration-200 font-light text-[14px] h-6 px-2 ${
                      filters.garden
                        ? "bg-black text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <TreePine className="h-3 w-3 mr-1" />
                    Garden
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOption("garage")}
                    className={`transition-all duration-200 font-light text-[14px] h-6 px-2 ${
                      filters.garage
                        ? "bg-black text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Car className="h-3 w-3 mr-1" />
                    Garage
                  </Button>
                </div>
              </div>

              {/* Right Side - Clear Filters */}
              {hasActiveFilters && onClearFilters && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedTypes([])
                    setSelectedBeds([])
                    setPriceFrom("")
                    setPriceTo("")
                    onClearFilters()
                  }}
                  className="text-gray-500 hover:text-gray-700 font-light text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Mobile Filters Button */}
            <div className="flex md:hidden items-center justify-between">
              <Button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 font-light text-sm"
              >
                <Search className="h-4 w-4" />
                Filters & Search
                {hasActiveFilters && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
              </Button>

              {/* Category Buttons - Mobile */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCategoryChange("new-building")}
                  className={`px-3 py-1 rounded-lg text-xs font-light transition-all duration-200 ${
                    activeCategory === "new-building" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => handleCategoryChange("secondary")}
                  className={`px-3 py-1 rounded-lg text-xs font-light transition-all duration-200 ${
                    activeCategory === "secondary" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Secondary
                </button>
                <button
                  onClick={() => handleCategoryChange("rentals")}
                  className={`px-3 py-1 rounded-lg text-xs font-light transition-all duration-200 ${
                    activeCategory === "rentals" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Rentals
                </button>
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
                onClick={() => setMobileMenuOpen(false)}
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

      {/* Global Filter Modal */}
      <FilterModal
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        onFiltersChange={onFiltersChange || (() => {})}
        onClearFilters={onClearFilters || (() => {})}
      />
    </header>
  )
}
