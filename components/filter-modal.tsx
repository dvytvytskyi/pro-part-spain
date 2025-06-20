"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X, Search, MapPin, Waves, TreePine, Car, Check } from "lucide-react"
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

const propertyTypes = ["Apartment", "Villa", "Penthouse"]
const bedroomOptions = ["Studio", "1", "2", "3", "4", "5", "6", "7", "8"]

const MAX_LOCATIONS = 3

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

export function FilterModal({ isOpen, onClose, filters, onFiltersChange, onClearFilters }: FilterModalProps) {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [filteredLocations, setFilteredLocations] = useState<string[]>([])
  const [priceFrom, setPriceFrom] = useState("")
  const [priceTo, setPriceTo] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedBeds, setSelectedBeds] = useState<string[]>([])

  const modalRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle mounting
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Store original overflow
      const originalOverflow = document.body.style.overflow
      const originalPaddingRight = document.body.style.paddingRight

      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      // Lock scroll and compensate for scrollbar
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [isOpen])

  // Handle viewport centering on resize
  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const centerModal = () => {
      if (modalRef.current) {
        const modal = modalRef.current
        const rect = modal.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        // Center the modal
        const left = Math.max(0, (viewportWidth - rect.width) / 2)
        const top = Math.max(0, (viewportHeight - rect.height) / 2)

        modal.style.left = `${left}px`
        modal.style.top = `${top}px`
      }
    }

    // Center on mount
    centerModal()

    // Re-center on resize
    window.addEventListener("resize", centerModal)
    return () => window.removeEventListener("resize", centerModal)
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

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

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

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
  }

  const toggleOption = (key: "pool" | "garden" | "garage") => {
    onFiltersChange({
      ...filters,
      [key]: !filters[key],
    })
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

    onFiltersChange({
      ...filters,
      property_type: newTypes.length > 0 ? newTypes.join(",") : null,
    })
  }

  const toggleBedroom = (bed: string) => {
    const newBeds = selectedBeds.includes(bed) ? selectedBeds.filter((b) => b !== bed) : [...selectedBeds, bed]
    setSelectedBeds(newBeds)

    onFiltersChange({
      ...filters,
      bedrooms: newBeds.length > 0 ? newBeds.join(",") : null,
    })
  }

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedBeds.length > 0 ||
    priceFrom ||
    priceTo ||
    filters.pool ||
    filters.garden ||
    filters.garage

  const handleApplyFilters = () => {
    // Apply all filters
    const newFilters = { ...filters }

    if (selectedLocations.length > 0) {
      newFilters.town = selectedLocations[0]
    }
    if (searchQuery.trim()) {
      newFilters.development_name = searchQuery
    }
    if (priceFrom || priceTo) {
      newFilters.min_price = priceFrom ? Number.parseInt(priceFrom.replace(/,/g, "")) : null
      newFilters.max_price = priceTo ? Number.parseInt(priceTo.replace(/,/g, "")) : null
    }
    if (selectedTypes.length > 0) {
      newFilters.property_type = selectedTypes.join(",")
    }
    if (selectedBeds.length > 0) {
      newFilters.bedrooms = selectedBeds.join(",")
    }

    onFiltersChange(newFilters)
    onClose()
  }

  const handleClearAll = () => {
    setSelectedTypes([])
    setSelectedBeds([])
    setPriceFrom("")
    setPriceTo("")
    setSelectedLocations([])
    setSearchQuery("")
    onClearFilters()
  }

  if (!mounted || !isOpen) {
    return null
  }

  const modalContent = (
    <>
      {/* Fixed Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998]"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="fixed z-[9999] bg-white rounded-2xl shadow-2xl"
        style={{
          width: "90vw",
          maxWidth: "400px",
          maxHeight: "85vh",
          position: "fixed",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Fixed */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Filters & Search</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Modal Content - Scrollable */}
        <div
          className="overflow-y-auto px-6 py-6 space-y-6"
          style={{
            maxHeight: "calc(85vh - 140px)", // Account for header and footer
          }}
        >
          {/* Search Section */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Search Location</label>
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />

                  {selectedLocations.length > 0 && (
                    <div className="absolute left-12 top-1/2 transform -translate-y-1/2 flex items-center gap-1 z-10 flex-wrap">
                      {selectedLocations.map((location) => (
                        <div
                          key={location}
                          className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700"
                        >
                          <span className="font-light">{location}</span>
                          <button
                            type="button"
                            onClick={() => removeLocation(location)}
                            className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="h-2 w-2" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder={selectedLocations.length > 0 ? "Add more..." : "Search locations..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsLocationOpen(true)}
                    className={`w-full ${
                      selectedLocations.length > 0 ? "pl-[120px]" : "pl-12"
                    } pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-300 focus:bg-white focus:border-gray-300 transition-all duration-200 outline-none`}
                    disabled={selectedLocations.length >= MAX_LOCATIONS}
                  />
                </div>
              </form>

              {/* Location Dropdown */}
              {isLocationOpen && selectedLocations.length < MAX_LOCATIONS && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-[10000] max-h-32 overflow-y-auto">
                  <div className="py-2">
                    {filteredLocations.slice(0, 4).map((location, index) => (
                      <button
                        key={index}
                        onClick={() => addLocation(location)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                      >
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-700 font-light text-sm">{location}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Price Range</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-light text-gray-500 mb-1">From (€)</label>
                <input
                  type="text"
                  placeholder="0"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(formatPriceInput(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-light text-gray-500 mb-1">To (€)</label>
                <input
                  type="text"
                  placeholder="Any"
                  value={priceTo}
                  onChange={(e) => setPriceTo(formatPriceInput(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none bg-white text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Property Type</label>
            <div className="space-y-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => togglePropertyType(type)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
                    selectedTypes.includes(type)
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-light text-sm">{type}</span>
                    {selectedTypes.includes(type) && <Check className="h-4 w-4" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Bedrooms</label>
            <div className="grid grid-cols-4 gap-2">
              {bedroomOptions.slice(0, 8).map((bed) => (
                <button
                  key={bed}
                  type="button"
                  onClick={() => toggleBedroom(bed)}
                  className={`p-2 rounded-lg border text-center transition-all duration-200 ${
                    selectedBeds.includes(bed)
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="font-light text-xs">{bed}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Amenities</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => toggleOption("pool")}
                className={`p-2 rounded-lg border transition-all duration-200 ${
                  filters.pool
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Waves className="h-3 w-3" />
                  <span className="text-xs font-light">Pool</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleOption("garden")}
                className={`p-2 rounded-lg border transition-all duration-200 ${
                  filters.garden
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <TreePine className="h-3 w-3" />
                  <span className="text-xs font-light">Garden</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleOption("garage")}
                className={`p-2 rounded-lg border transition-all duration-200 ${
                  filters.garage
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Car className="h-3 w-3" />
                  <span className="text-xs font-light">Garage</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer - Fixed */}
        <div className="bg-white border-t border-gray-100 p-4 rounded-b-2xl">
          <div className="flex gap-3">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 text-sm"
              >
                Clear All
              </Button>
            )}
            <Button onClick={handleApplyFilters} className="flex-1 bg-black text-white hover:bg-gray-800 text-sm">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  )

  return createPortal(modalContent, document.body)
}
