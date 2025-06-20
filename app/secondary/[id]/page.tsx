"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  Calendar,
  MapPin,
  Waves,
  TreePine,
  Car,
  ChevronRight,
  Share2,
  Heart,
  Home,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ListingsHeader } from "@/components/listings-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { NewBuildingGallery } from "@/components/new-building-gallery"
import { ContactForm } from "@/components/contact-form"
import { ProjectMap } from "@/components/project-map"
import { SimilarProjects } from "@/components/similar-projects"
import { ShareModal } from "@/components/share-modal"
import { CollectionModal } from "@/components/collection-modal"
import type { NewBuilding } from "@/types/new-building"

interface NewBuildingPageProps {
  params: {
    id: string
  }
}

export default function NewBuildingPage({ params }: NewBuildingPageProps) {
  const router = useRouter()
  const [project, setProject] = useState<NewBuilding | null>(null)
  const [loading, setLoading] = useState(true)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [collectionModalOpen, setCollectionModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Mock auth state

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const fetchProject = async () => {
    try {
      // Mock data - in real app, this would be an API call to Xano
      const mockProject: NewBuilding = {
        id: params.id,
        development_name: "Luxury Marina Residences",
        images: [
          "/images/property-1.webp",
          "/images/property-2.webp",
          "/images/property-3.webp",
          "/images/property-4.webp",
          "/images/property-5.webp",
          "/images/property-6.webp",
        ],
        description_uk:
          "Discover the epitome of luxury living at Marina Residences, an exclusive new development situated in the heart of Marbella's prestigious Golden Mile. This exceptional project offers a collection of contemporary apartments and penthouses, each meticulously designed to provide the ultimate in comfort and sophistication. With panoramic sea views, state-of-the-art amenities, and proximity to world-class dining and shopping, Marina Residences represents the pinnacle of Costa del Sol living. The development features beautifully landscaped gardens, a stunning infinity pool, private beach access, and 24-hour concierge service. Each residence boasts premium finishes, smart home technology, and spacious terraces perfect for entertaining or simply enjoying the Mediterranean lifestyle.",
        price: 2950000,
        price_to: 4500000,
        currency: "EUR",
        beds: 2,
        beds_to: 4,
        baths: 2,
        baths_to: 4,
        surface_area: {
          built: 150,
          built_to: 280,
          terrace: 40,
          terrace_to: 120,
        },
        completion_date: "2025-06-30",
        type: {
          uk: "Apartment",
          es: "Apartamento",
        },
        subtype: {
          uk: "Luxury Residence",
          es: "Residencia de Lujo",
        },
        country: "Spain",
        province: "Andalusia",
        town: "Marbella",
        area: "Golden Mile",
        latitude: 36.5108,
        longitude: -4.8851,
        has_pool: true,
        has_garden: true,
        has_garage: true,
      }

      setProject(mockProject)
    } catch (error) {
      console.error("Error fetching project:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const handleShare = () => {
    setShareModalOpen(true)
  }

  const handleAddToCollection = () => {
    setCollectionModalOpen(true)
  }

  const handleSave = () => {
    setCollectionModalOpen(true)
  }

  const handleRequestFloorPlan = () => {
    // In real app, this would open a floor plan request modal or form
    alert("Floor plan request functionality would be implemented here")
  }

  const formatPrice = (price: number, priceTo?: number, currency = "EUR") => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    if (priceTo && priceTo !== price) {
      return `${formatter.format(price)} - ${formatter.format(priceTo)}`
    }
    return `From ${formatter.format(price)}`
  }

  const formatRange = (from: number, to?: number, unit = "") => {
    if (to && to !== from) {
      return `${from} - ${to}${unit}`
    }
    return `${from}${unit}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <ListingsHeader showSearch={false} showFilters={false} />
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <ListingsHeader showSearch={false} showFilters={false} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <button
              onClick={handleBack}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-light"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="min-h-screen bg-white">
      <ListingsHeader showSearch={false} showFilters={false} />

      <main className="max-w-7xl mx-auto px-6 py-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-4">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-light text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </button>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleAddToCollection}
              variant="outline"
              size="sm"
              className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
            >
              <Heart className="h-4 w-4 mr-2" />
              Add to Collection
            </Button>
          </div>
        </div>

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-700">
            Real Estate
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/listings?country=${project.country}`} className="hover:text-gray-700">
            {project.country}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/listings?province=${project.province}`} className="hover:text-gray-700">
            {project.province}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/listings?town=${project.town}`} className="hover:text-gray-700">
            {project.town}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-900">{project.development_name}</span>
        </nav>

        {/* Main Content */}
        <div className="space-y-6 mb-8">
          {/* Gallery - Full Width */}
          <NewBuildingGallery
            images={project.images}
            projectName={project.development_name}
            onSave={handleSave}
            onRequestFloorPlan={handleRequestFloorPlan}
          />

          {/* Content Grid - Project Details + Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-2 space-y-5">
              {/* Project Header */}
              <div className="space-y-2">
                <h1 className="text-2xl lg:text-3xl font-light text-gray-900">{project.development_name}</h1>

                <div className="text-xl lg:text-2xl font-light text-gray-900">
                  {formatPrice(project.price, project.price_to, project.currency)}
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-base">
                    {project.area}, {project.town}, {project.province}, {project.country}
                  </span>
                </div>
              </div>

              {/* Summary Block */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Project Summary</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2">
                    <Bed className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {formatRange(project.beds, project.beds_to)}
                      </div>
                      <div className="text-xs text-gray-600">Bedrooms</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Bath className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {formatRange(project.baths, project.baths_to)}
                      </div>
                      <div className="text-xs text-gray-600">Bathrooms</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Square className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {formatRange(project.surface_area.built, project.surface_area.built_to, "m²")}
                      </div>
                      <div className="text-xs text-gray-600">Built Area</div>
                    </div>
                  </div>

                  {project.surface_area.terrace && (
                    <div className="flex items-center space-x-2">
                      <Maximize2 className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {formatRange(project.surface_area.terrace, project.surface_area.terrace_to, "m²")}
                        </div>
                        <div className="text-xs text-gray-600">Terrace</div>
                      </div>
                    </div>
                  )}

                  {project.completion_date && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{formatDate(project.completion_date)}</div>
                        <div className="text-xs text-gray-600">Completion</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4 text-[#C9A77C] flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{project.type.uk}</div>
                      <div className="text-xs text-gray-600">{project.subtype.uk}</div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                {(project.has_pool || project.has_garden || project.has_garage) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-base font-medium text-gray-900 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.has_pool && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg">
                          <Waves className="h-3 w-3 flex-shrink-0" />
                          <span className="text-xs">Pool</span>
                        </div>
                      )}
                      {project.has_garden && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg">
                          <TreePine className="h-3 w-3 flex-shrink-0" />
                          <span className="text-xs">Garden</span>
                        </div>
                      )}
                      {project.has_garage && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-gray-50 text-gray-700 rounded-lg">
                          <Car className="h-3 w-3 flex-shrink-0" />
                          <span className="text-xs">Garage</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {project.description_uk && (
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">About This Project</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-sm">{project.description_uk}</p>
                  </div>
                </div>
              )}

              {/* Map */}
              <ProjectMap
                latitude={project.latitude}
                longitude={project.longitude}
                projectName={project.development_name}
              />
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <ContactForm projectName={project.development_name} />
            </div>
          </div>
        </div>

        {/* Similar Projects */}
        <SimilarProjects currentProject={project} />
      </main>

      {/* Modals */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        projectName={project.development_name}
        projectUrl={currentUrl}
      />

      <CollectionModal
        isOpen={collectionModalOpen}
        onClose={() => setCollectionModalOpen(false)}
        projectName={project.development_name}
        isAuthenticated={isAuthenticated}
      />
    </div>
  )
}
