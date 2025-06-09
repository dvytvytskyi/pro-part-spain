"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  ChevronRight,
  MapPin,
  X,
  ChevronDown,
  AlertCircle,
  Scale,
  Calculator,
  CreditCard,
  Shield,
  Handshake,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { HomeHeader } from "@/components/home-header"

const categories = [
  {
    id: "luxury-villas",
    title: "Luxury Villas",
    image: "/images/category-luxury-villas.png",
    href: "/listings?category=luxury-villas",
  },
  {
    id: "family-homes",
    title: "Family Homes",
    image: "/images/category-family-homes.png",
    href: "/listings?category=family-homes",
  },
  {
    id: "penthouses",
    title: "Penthouses",
    image: "/images/category-penthouses.png",
    href: "/listings?category=penthouses",
  },
  {
    id: "sea-view",
    title: "Sea View",
    image: "/images/category-sea-view.png",
    href: "/listings?category=sea-view",
  },
  {
    id: "golf-residences",
    title: "Golf Residences",
    image: "/images/category-golf.png",
    href: "/listings?category=golf-residences",
  },
  {
    id: "new-developments",
    title: "New Developments",
    image: "/images/category-new-developments.png",
    href: "/listings?category=new-developments",
  },
  {
    id: "city-apartments",
    title: "City Apartments",
    image: "/images/category-city-apartments.png",
    href: "/listings?category=city-apartments",
  },
  {
    id: "countryside-retreats",
    title: "Countryside Retreats",
    image: "/images/category-countryside.png",
    href: "/listings?category=countryside-retreats",
  },
]

const propertyTypes = [
  { value: "new-buildings", label: "New Buildings" },
  { value: "secondary", label: "Secondary" },
  { value: "for-rent", label: "For Rent" },
]

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

const MAX_LOCATIONS = 3

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState("")
  const [filteredLocations, setFilteredLocations] = useState<string[]>([])
  const [showMaxWarning, setShowMaxWarning] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const typeRef = useRef<HTMLDivElement>(null)

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false)
      }
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false)
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

    const params = new URLSearchParams()

    if (selectedLocations.length > 0) {
      params.set("locations", selectedLocations.join(","))
    }

    if (selectedType) {
      params.set("type", selectedType)
    }

    if (searchQuery.trim()) {
      params.set("search", searchQuery)
    }

    const queryString = params.toString()
    window.location.href = `/listings${queryString ? `?${queryString}` : ""}`
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

  const selectPropertyType = (type: string) => {
    setSelectedType(type)
    setIsTypeOpen(false)
  }

  return (
    <div className="w-full max-w-[600px] space-y-3">
      {/* Property Type Selector */}
      <div ref={typeRef} className="relative w-48">
        <button
          onClick={() => setIsTypeOpen(!isTypeOpen)}
          className="w-full flex items-center justify-between bg-black/20 border border-white/20 text-white hover:bg-black/30 hover:border-white/30 rounded-full px-4 py-2 text-sm font-light transition-all duration-200"
        >
          <span>{selectedType ? propertyTypes.find((t) => t.value === selectedType)?.label : "Property Type"}</span>
          <ChevronDown className="h-3 w-3" />
        </button>

        {isTypeOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50">
            <div className="py-2">
              {propertyTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => selectPropertyType(type.value)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 font-light text-sm transition-colors"
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div ref={searchRef} className="relative">
        <form onSubmit={handleSearch}>
          <div className="relative">
            {/* Search Icon */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />

            {/* Selected Location Tags */}
            {selectedLocations.length > 0 && (
              <div className="absolute left-10 top-1/2 transform -translate-y-1/2 flex items-center gap-1 z-10">
                {selectedLocations.map((location) => (
                  <div
                    key={location}
                    className="flex items-center bg-white/20 rounded-full px-2 py-1 text-xs text-white"
                  >
                    <span className="font-light">{location}</span>
                    <button
                      type="button"
                      onClick={() => removeLocation(location)}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-2 w-2" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input Field */}
            <input
              type="text"
              placeholder={
                selectedLocations.length > 0 ? "Add more locations..." : "Search by location, property type..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsLocationOpen(true)}
              className={`w-full ${
                selectedLocations.length > 0 ? "pl-[280px]" : "pl-10"
              } pr-24 py-3 text-sm bg-black/20 border border-white/20 rounded-full text-white placeholder:text-white/60 focus:ring-1 focus:ring-white/30 focus:bg-black/30 focus:border-white/30 transition-all duration-200 outline-none`}
              disabled={selectedLocations.length >= MAX_LOCATIONS}
            />

            {/* Search Button */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full font-light text-xs border border-white/20 transition-all duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* Max Locations Warning */}
        {showMaxWarning && (
          <div className="absolute -bottom-10 left-0 right-0 bg-white/90 border border-red-200 text-red-600 rounded-lg px-3 py-2 text-xs flex items-center gap-2 shadow-md">
            <AlertCircle className="h-3 w-3" />
            <span>You can select maximum {MAX_LOCATIONS} locations</span>
          </div>
        )}

        {/* Location Dropdown */}
        {isLocationOpen && selectedLocations.length < MAX_LOCATIONS && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-64 overflow-y-auto">
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100 sticky top-0 bg-white">
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
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HomeHeader />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-modern-villa.webp"
            alt="Modern luxury villa with pool"
            fill
            className="object-cover"
            priority
          />
          {/* Deep gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.50) 70%, rgba(0,0,0,0.00) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-[700px]">
            <h1 className="text-[28px] md:text-[32px] font-light mb-2 tracking-tight leading-[1.1] text-white drop-shadow-sm">
              Find your dream home
              <br />
              on the Costa del Sol
            </h1>
            <p className="text-[14px] md:text-[16px] font-light mb-4 text-white/90 leading-relaxed drop-shadow-sm max-w-[600px]">
              Handpicked collection of the best villas, apartments and new developments in Spain
            </p>

            {/* Search Component */}
            <SearchComponent />
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">Featured Categories</h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Discover exceptional properties across our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Apartments */}
            <Link href="/listings?type=apartments" className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                <Image
                  src="/images/apartments-bg.webp"
                  alt="Luxury Apartments"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">Apartments</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-light">1,247 LISTINGS</span>
                    <ChevronRight className="h-4 w-4 text-white/80 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Penthouses */}
            <Link href="/listings?type=penthouses" className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                <Image
                  src="/images/penthouses-bg.webp"
                  alt="Luxury Penthouses"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">Penthouses</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-light">342 LISTINGS</span>
                    <ChevronRight className="h-4 w-4 text-white/80 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Villas */}
            <Link href="/listings?type=villas" className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                <Image
                  src="/images/villas-bg.webp"
                  alt="Modern Villas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">Villas</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-light">856 LISTINGS</span>
                    <ChevronRight className="h-4 w-4 text-white/80 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Luxury Villas */}
            <Link href="/listings?type=luxury-villas" className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                <Image
                  src="/images/luxury-villas-bg.webp"
                  alt="Luxury Villas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">Luxury Villas</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-light">189 LISTINGS</span>
                    <ChevronRight className="h-4 w-4 text-white/80 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">Popular Areas</h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Explore the most sought-after locations on the Costa del Sol
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Marbella - Large card taking 2 rows */}
            <div className="lg:row-span-2">
              <Link href="/listings?area=marbella" className="group cursor-pointer block h-full">
                <div className="relative h-full rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                  <Image
                    src="/images/area-marbella.jpg"
                    alt="Marbella"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-white text-3xl font-semibold mb-3">Marbella</h3>
                    <p className="text-white/80 text-base font-light mb-4 max-w-md">
                      The crown jewel of Costa del Sol, offering luxury beachfront living with world-class amenities,
                      exclusive beach clubs, and vibrant nightlife.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm font-light">847 PROPERTIES</span>
                      <ChevronRight className="h-5 w-5 text-white/70 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right side grid - 2x2 layout */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Estepona */}
              <Link href="/listings?area=estepona" className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                  <Image
                    src="/images/area-estepona.jpg"
                    alt="Estepona"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Estepona</h3>
                    <p className="text-white/80 text-sm font-light mb-3">
                      Charming coastal town with modern developments
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm font-light">523 PROPERTIES</span>
                      <ChevronRight className="h-4 w-4 text-white/70 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Sotogrande */}
              <Link href="/listings?area=sotogrande" className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                  <Image
                    src="/images/area-sotogrande.jpg"
                    alt="Sotogrande"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Sotogrande</h3>
                    <p className="text-white/80 text-sm font-light mb-3">
                      Exclusive golf resort with premium properties
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm font-light">298 PROPERTIES</span>
                      <ChevronRight className="h-4 w-4 text-white/70 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Benahavis */}
              <Link href="/listings?area=benahavis" className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                  <Image
                    src="/images/area-benahavis.webp"
                    alt="Benahavis"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Benahavis</h3>
                    <p className="text-white/80 text-sm font-light mb-3">Mountain village with stunning valley views</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm font-light">412 PROPERTIES</span>
                      <ChevronRight className="h-4 w-4 text-white/70 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Mijas */}
              <Link href="/listings?area=mijas" className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                  <Image
                    src="/images/area-mijas.jpg"
                    alt="Mijas"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Mijas</h3>
                    <p className="text-white/80 text-sm font-light mb-3">
                      Traditional white village with panoramic views
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm font-light">634 PROPERTIES</span>
                      <ChevronRight className="h-4 w-4 text-white/70 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">Legal Services</h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Comprehensive legal support for all your real estate transactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Legal advice */}
            <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                <Scale className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal advice on real estate transactions</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We provide expert legal advice in real estate transactions, including legal analysis and transaction
                structuring.
              </p>
            </div>

            {/* Tax Counseling */}
            <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                <Calculator className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tax Counseling</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We provide tax advice in the context of acquiring and owning real estate, helping to optimize clients'
                tax liability.
              </p>
            </div>

            {/* Financing and Guarantees */}
            <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Financing and Guarantees</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We provide support in financing for real estate acquisitions and establishing appropriate guarantees.
              </p>
            </div>

            {/* Risk Assessment */}
            <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk Assessment</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We analyze the risks of real estate transactions and provide recommendations to mitigate them.
              </p>
            </div>

            {/* Commercial Negotiations */}
            <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                <Handshake className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Commercial Negotiations</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We participate in commercial negotiations with counterparties and other parties to transactions.
              </p>
            </div>

            {/* Transaction support */}
            <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Transaction support</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We provide full legal support of the transaction process, including preparation of documents, conclusion
                of contracts and registration of transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Ready to find your perfect home?
          </h2>
          <p className="text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto">
            Browse our complete collection of luxury properties or speak with our expert team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-4 text-lg font-medium rounded-full shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
            >
              <Link href="/listings">Browse All Properties</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
            >
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="relative h-8 w-24 mb-6">
                <Image src="/images/logo.png" alt="PRO PART" fill className="object-contain" />
              </div>
              <p className="text-gray-600 font-light text-lg max-w-md">
                Your trusted partner in finding exceptional properties on the Costa del Sol and beyond.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/listings?category=luxury-villas"
                    className="text-gray-600 hover:text-gray-900 font-light"
                  >
                    Luxury Villas
                  </Link>
                </li>
                <li>
                  <Link href="/listings?category=penthouses" className="text-gray-600 hover:text-gray-900 font-light">
                    Penthouses
                  </Link>
                </li>
                <li>
                  <Link href="/listings?category=sea-view" className="text-gray-600 hover:text-gray-900 font-light">
                    Sea View
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?category=new-developments"
                    className="text-gray-600 hover:text-gray-900 font-light"
                  >
                    New Developments
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900 font-light">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-light">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-light">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/join-us" className="text-gray-600 hover:text-gray-900 font-light">
                    Join Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 text-center">
            <p className="text-gray-500 font-light">© 2024 PRO PART. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
