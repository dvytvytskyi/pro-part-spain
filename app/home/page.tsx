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
  Bed,
  Bath,
  Square,
  Home,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { HomeHeader } from "@/components/home-header"
import { InvestorContactForm } from "@/components/investor-contact-form"
import { LegalAdviceModal } from "@/components/legal-advice-modal"
import { TaxCounselingModal } from "@/components/tax-counseling-modal"
import { FinancingGuaranteesModal } from "@/components/financing-guarantees-modal"
import { RiskAssessmentModal } from "@/components/risk-assessment-modal"
import { CommercialNegotiationsModal } from "@/components/commercial-negotiations-modal"
import { TransactionSupportModal } from "@/components/transaction-support-modal"

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

function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">Stay Updated</h3>
      <p className="text-xs text-gray-600 font-light mb-4 leading-relaxed">
        Get the latest market insights and exclusive property listings delivered to your inbox.
      </p>

      {isSubmitted ? (
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-xs text-gray-600 font-light">Thank you for subscribing!</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-all duration-200 outline-none"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="w-full bg-black hover:bg-gray-800 text-white px-4 py-2 text-xs font-light rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
    </div>
  )
}

export default function HomePage() {
  const [isLegalAdviceModalOpen, setIsLegalAdviceModalOpen] = useState(false)
  const [isTaxCounselingModalOpen, setIsTaxCounselingModalOpen] = useState(false)
  const [isFinancingGuaranteesModalOpen, setIsFinancingGuaranteesModalOpen] = useState(false)
  const [isRiskAssessmentModalOpen, setIsRiskAssessmentModalOpen] = useState(false)
  const [isCommercialNegotiationsModalOpen, setIsCommercialNegotiationsModalOpen] = useState(false)
  const [isTransactionSupportModalOpen, setIsTransactionSupportModalOpen] = useState(false)

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

          <div className="grid grid-cols-12 gap-4">
            {/* Legal advice - Large card */}
            <div
              className="col-span-12 md:col-span-6 group cursor-pointer"
              onClick={() => setIsLegalAdviceModalOpen(true)}
            >
              <div className="bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-5">
                      <Scale className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Legal advice on real estate transactions
                    </h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed max-w-lg">
                      We provide expert legal advice in real estate transactions, including legal analysis, transaction
                      structuring, and comprehensive support throughout the entire process to ensure your interests are
                      protected.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-900 mt-6 group-hover:translate-x-2 transition-transform duration-300">
                    Learn More
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Counseling */}
            <div
              className="col-span-12 md:col-span-6 lg:col-span-3 group cursor-pointer"
              onClick={() => setIsTaxCounselingModalOpen(true)}
            >
              <div className="bg-black text-white rounded-3xl p-6 hover:bg-gray-900 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] h-full relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <Calculator className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">Tax Counseling</h3>
                    <p className="text-sm text-white/80 font-light leading-relaxed">
                      We provide tax advice in the context of acquiring and owning real estate, helping to optimize
                      clients' tax liability.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-white mt-6 group-hover:translate-x-2 transition-transform duration-300">
                    Learn More
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Financing and Guarantees */}
            <div
              className="col-span-12 md:col-span-6 lg:col-span-3 group cursor-pointer"
              onClick={() => setIsFinancingGuaranteesModalOpen(true)}
            >
              <div className="bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] h-full border border-gray-100">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Financing and Guarantees</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      We provide support in financing for real estate acquisitions and establishing appropriate
                      guarantees.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-900 mt-6 group-hover:translate-x-2 transition-transform duration-300">
                    Learn More
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div
              className="col-span-12 md:col-span-4 group cursor-pointer"
              onClick={() => setIsRiskAssessmentModalOpen(true)}
            >
              <div className="bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] h-full border border-gray-100">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk Assessment</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      We analyze the risks of real estate transactions and provide recommendations to mitigate them.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-900 mt-6 group-hover:translate-x-2 transition-transform duration-300">
                    Learn More
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial Negotiations */}
            <div
              className="col-span-12 md:col-span-4 group cursor-pointer"
              onClick={() => setIsCommercialNegotiationsModalOpen(true)}
            >
              <div className="bg-black text-white rounded-3xl p-6 hover:bg-gray-900 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <Handshake className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">Commercial Negotiations</h3>
                    <p className="text-sm text-white/80 font-light leading-relaxed">
                      We participate in commercial negotiations with counterparties and other parties to transactions.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-white mt-6 group-hover:translate-x-2 transition-transform duration-300">
                    Learn More
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction support */}
            <div
              className="col-span-12 md:col-span-4 group cursor-pointer"
              onClick={() => setIsTransactionSupportModalOpen(true)}
            >
              <div className="bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] h-full border border-gray-100">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Transaction Support</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      We provide full legal support of the transaction process, including preparation of documents,
                      conclusion of contracts and registration of transactions.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-900 mt-6 group-hover:translate-x-2 transition-transform duration-300">
                    Learn More
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villa Shiro Banner */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa-shiro-banner.jpg"
            alt="Villa Shiro - Luxury Modern Villa"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.2) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-block bg-white/10 text-white text-sm font-light px-4 py-2 rounded-full border border-white/20">
                Featured Property
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">Villa Shiro</h2>

            <p className="text-base text-white/80 font-light mb-8 leading-relaxed">
              Exceptional modern villa featuring contemporary architecture, premium finishes, and breathtaking mountain
              views in an exclusive location.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <div className="text-white text-base font-light">665 m²</div>
                <div className="text-white/70 text-xs font-light">Interior</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Square className="h-5 w-5 text-white" />
                </div>
                <div className="text-white text-base font-light">1,322 m²</div>
                <div className="text-white/70 text-xs font-light">Total Space</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Bed className="h-5 w-5 text-white" />
                </div>
                <div className="text-white text-base font-light">5</div>
                <div className="text-white/70 text-xs font-light">Bedrooms</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Bath className="h-5 w-5 text-white" />
                </div>
                <div className="text-white text-base font-light">5+2</div>
                <div className="text-white/70 text-xs font-light">Bathrooms</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-white/15 hover:bg-white/25 text-white px-6 py-2 text-sm font-light rounded-full backdrop-blur-md border border-white/20 shadow-sm hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <Link href="/property/villa-shiro">View Details</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-black/15 border-white/20 text-white hover:bg-black/25 px-6 py-2 text-sm font-light rounded-full backdrop-blur-md hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
              >
                <Link href="/contact?property=villa-shiro">Contact Agent</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Marbella Guides & Tools Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">Marbella Resources</h2>
            <p className="text-sm text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Essential guides and tools for navigating Marbella's luxury real estate market
            </p>
          </div>

          {/* Interactive Grid Layout */}
          <div className="grid grid-cols-12 gap-4 h-[500px]">
            {/* Golden Mile - Large Feature */}
            <Link href="/guides/golden-mile" className="col-span-12 md:col-span-5 row-span-2 group">
              <div className="h-full bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-light text-gray-500 mb-2 tracking-wider uppercase">Area Guide</div>
                    <h3 className="text-2xl font-light text-gray-900 mb-4 leading-tight">Golden Mile</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed max-w-sm">
                      The most prestigious stretch of coastline, home to luxury hotels, exclusive beach clubs, and
                      opulent villas.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                    Explore Guide
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Purchase Guide */}
            <Link href="/guides/purchase" className="col-span-6 md:col-span-4 group">
              <div className="h-full bg-black rounded-3xl p-6 hover:bg-gray-900 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-light text-white/60 mb-2 tracking-wider uppercase">Guide</div>
                    <h3 className="text-lg font-light text-white mb-3">Purchase Guide</h3>
                    <p className="text-xs text-white/80 font-light leading-relaxed">
                      Complete process, documents, costs and taxes for buying property in Marbella.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-white group-hover:translate-x-2 transition-transform duration-300">
                    View Guide
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Tax Calculator */}
            <Link href="/tools/tax-calculator" className="col-span-6 md:col-span-3 group">
              <div className="h-full bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-light text-gray-500 mb-2 tracking-wider uppercase">Calculator</div>
                    <h3 className="text-lg font-light text-gray-900 mb-3">Tax Calculator</h3>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      Calculate taxes and costs when buying property.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                    Calculate
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </Link>

            {/* La Zagaleta */}
            <Link href="/guides/la-zagaleta" className="col-span-6 md:col-span-3 group">
              <div className="h-full bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-light text-gray-500 mb-2 tracking-wider uppercase">Area Guide</div>
                    <h3 className="text-lg font-light text-gray-900 mb-3">La Zagaleta</h3>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      Europe's most exclusive gated community with championship golf courses.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                    Explore
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Selling Guide */}
            <Link href="/guides/selling" className="col-span-6 md:col-span-4 group">
              <div className="h-full bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-light text-gray-500 mb-2 tracking-wider uppercase">Guide</div>
                    <h3 className="text-lg font-light text-gray-900 mb-3">Selling Guide</h3>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      Process, taxes, costs and what to avoid when selling your property.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                    View Guide
                    <ChevronRight className="h-3 w-3 ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Investor Contact Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image with floating stats */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="/images/contact-agent.jpg"
                  alt="Professional Real Estate Agent"
                  width={600}
                  height={700}
                  className="object-cover w-full h-[500px] lg:h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <div className="text-2xl font-light text-gray-900">€2.4B+</div>
                <div className="text-xs text-gray-600 font-light">Properties Sold</div>
              </div>

              <div className="absolute -top-6 -right-6 bg-black rounded-2xl p-4 text-white">
                <div className="text-2xl font-light">500+</div>
                <div className="text-xs text-white/80 font-light">Happy Investors</div>
              </div>

              <div className="absolute top-1/2 -left-8 bg-white rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <div className="text-xl font-light text-gray-900">15+</div>
                <div className="text-xs text-gray-600 font-light">Years Experience</div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="lg:pl-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
                  Ready to Invest in Marbella?
                </h2>
                <p className="text-sm text-gray-600 font-light leading-relaxed max-w-md">
                  Connect with our expert team to explore exclusive investment opportunities in Costa del Sol's luxury
                  real estate market.
                </p>
              </div>

              <InvestorContactForm />

              <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24h Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Confidential Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="relative h-8 w-24 mb-6">
                <Image src="/images/logo.png" alt="PRO PART" fill className="object-contain" />
              </div>
              <p className="text-sm text-gray-600 font-light leading-relaxed mb-6 max-w-md">
                Your trusted partner in finding exceptional properties on the Costa del Sol and beyond. Specializing in
                luxury real estate investments and sales.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-gray-600 font-light leading-relaxed">
                    Pl. de la Iglesia, 3, office 1-D
                    <br />
                    29670, San Pedro de Alcántara
                    <br />
                    Malaga, Spain
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <a
                    href="tel:+34695113333"
                    className="text-xs text-gray-600 font-light hover:text-gray-900 transition-colors"
                  >
                    +34 695 113 333
                  </a>
                </div>
              </div>
            </div>

            {/* Properties */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Properties</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/listings?category=luxury-villas"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Luxury Villas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?category=penthouses"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Penthouses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?category=apartments"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Apartments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?category=new-developments"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    New Developments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?category=investment"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Investment Properties
                  </Link>
                </li>
              </ul>
            </div>

            {/* Areas */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Areas</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/listings?area=marbella"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Marbella
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?area=golden-mile"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Golden Mile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?area=puerto-banus"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Puerto Banús
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?area=nueva-andalucia"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Nueva Andalucía
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?area=estepona"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Estepona
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <NewsletterSignup />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-xs text-gray-500 font-light">© 2025 All rights reserved</div>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy-policy"
                  className="text-xs text-gray-500 hover:text-gray-700 font-light transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-use"
                  className="text-xs text-gray-500 hover:text-gray-700 font-light transition-colors"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* All Modals */}
      <LegalAdviceModal isOpen={isLegalAdviceModalOpen} onClose={() => setIsLegalAdviceModalOpen(false)} />
      <TaxCounselingModal isOpen={isTaxCounselingModalOpen} onClose={() => setIsTaxCounselingModalOpen(false)} />
      <FinancingGuaranteesModal
        isOpen={isFinancingGuaranteesModalOpen}
        onClose={() => setIsFinancingGuaranteesModalOpen(false)}
      />
      <RiskAssessmentModal isOpen={isRiskAssessmentModalOpen} onClose={() => setIsRiskAssessmentModalOpen(false)} />
      <CommercialNegotiationsModal
        isOpen={isCommercialNegotiationsModalOpen}
        onClose={() => setIsCommercialNegotiationsModalOpen(false)}
      />
      <TransactionSupportModal
        isOpen={isTransactionSupportModalOpen}
        onClose={() => setIsTransactionSupportModalOpen(false)}
      />
    </div>
  )
}
