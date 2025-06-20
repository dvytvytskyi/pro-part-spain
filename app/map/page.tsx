"use client"
import dynamic from "next/dynamic"
import { ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("@/components/interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600 font-light">Loading interactive map...</p>
      </div>
    </div>
  ),
})

// Mock property data with coordinates
const mockProperties = [
  {
    id: "R3297082",
    development_name: "La Zagaleta Luxury Villas",
    price: 8500000,
    currency: "EUR",
    type_uk: "Villa",
    beds: 6,
    baths: 7,
    built: 850,
    latitude: 36.5108,
    longitude: -5.0048,
    category: "new-building",
    images: ["/images/property-1.webp"],
    town: "Benahavís",
    area: "La Zagaleta",
    description: "Exclusive luxury villa in prestigious La Zagaleta community",
  },
  {
    id: "R3297083",
    development_name: "Puerto Banús Penthouse",
    price: 3200000,
    currency: "EUR",
    type_uk: "Penthouse",
    beds: 4,
    baths: 4,
    built: 280,
    latitude: 36.4848,
    longitude: -4.9507,
    category: "secondary",
    images: ["/images/property-2.webp"],
    town: "Marbella",
    area: "Puerto Banús",
    description: "Stunning penthouse with panoramic sea views",
  },
  {
    id: "R3297084",
    development_name: "Golden Mile Apartment",
    price: 15000,
    currency: "EUR",
    type_uk: "Apartment",
    beds: 3,
    baths: 2,
    built: 180,
    latitude: 36.5014,
    longitude: -4.9027,
    category: "rental",
    images: ["/images/property-3.webp"],
    town: "Marbella",
    area: "Golden Mile",
    description: "Luxury apartment in the heart of Golden Mile",
  },
  {
    id: "R3297085",
    development_name: "Estepona Beachfront",
    price: 1850000,
    currency: "EUR",
    type_uk: "Apartment",
    beds: 3,
    baths: 2,
    built: 165,
    latitude: 36.4285,
    longitude: -5.1473,
    category: "secondary",
    images: ["/images/property-4.webp"],
    town: "Estepona",
    area: "Beachfront",
    description: "Modern beachfront apartment with direct sea access",
  },
  {
    id: "R3297086",
    development_name: "Nueva Andalucía Villa",
    price: 4500000,
    currency: "EUR",
    type_uk: "Villa",
    beds: 5,
    baths: 5,
    built: 420,
    latitude: 36.4977,
    longitude: -4.9608,
    category: "new-building",
    images: ["/images/property-5.webp"],
    town: "Marbella",
    area: "Nueva Andalucía",
    description: "Contemporary villa in golf valley location",
  },
  {
    id: "R3297087",
    development_name: "San Pedro Townhouse",
    price: 950000,
    currency: "EUR",
    type_uk: "Townhouse",
    beds: 3,
    baths: 3,
    built: 220,
    latitude: 36.4848,
    longitude: -4.9965,
    category: "secondary",
    images: ["/images/property-6.webp"],
    town: "San Pedro de Alcántara",
    area: "Centro",
    description: "Charming townhouse in gated community",
  },
]

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/listings">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-50">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-light text-gray-900">Property Map</h1>
                  <p className="text-sm text-gray-500 font-light">
                    Explore {mockProperties.length} premium properties across Costa del Sol
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>New Building</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Secondary</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Rentals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[calc(100vh-100px)]">
        <MapComponent properties={mockProperties} />
      </div>
    </div>
  )
}
