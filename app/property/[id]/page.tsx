// app/new-building/[id]/page.tsx

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
  Building,
  Shield,
  Eye,
  Thermometer,
  Utensils,
  ParkingCircle,
  Compass,
  Wifi,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ListingsHeader } from "@/components/listings-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { NewBuildingGallery } from "@/components/new-building-gallery"
import { ContactForm } from "@/components/contact-form"
import { ProjectMap } from "@/components/project-map"
import { ShareModal } from "@/components/share-modal"
import { CollectionModal } from "@/components/collection-modal"
import { apiClient } from "@/lib/api"
import {transformApiDataToProject} from "@/lib/dataTransformer"
import { use } from 'react'

interface NewBuildingPageProps {
  params: {
    id: string
  }
}

export default function NewBuildingPage({ params }: NewBuildingPageProps) {
  const router = useRouter()
  const [project, setProject] = useState<null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [collectionModalOpen, setCollectionModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Assuming you handle this elsewhere
  const projectParams = use(params);

  useEffect(() => {
    // Renamed the function to be more descriptive
    const fetchAndSetProject = async () => {
      if (!projectParams.id) {
        setLoading(false)
        setError("No project ID provided.")
        return
      }

      setLoading(true)
      setError(null)

      try {
        // 1. Fetch raw data from the API
        const apiData = await apiClient.getProperty(projectParams.id)
        // 2. Transform the raw data into the structure our component needs
        const transformedProject = transformApiDataToProject(apiData)

        // 3. Set the state with the transformed data
        setProject(transformedProject)
      } catch (err: any) {
        console.error("Error fetching or processing project:", err)
        setError(err.message || "An unknown error occurred.")
      } finally {
        // 4. Stop loading, regardless of success or failure
        setLoading(false)
      }
    }

    fetchAndSetProject()
  }, [projectParams.id]) // Dependency array ensures this runs when the ID changes

  // --- All your helper functions and JSX remain the same ---
  // I've included them below for completeness without any changes.

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const CharacteristicSection = ({ title, items, icon: Icon }: { title: string; items?: string[]; icon: any }) => {
    if (!items || items.length === 0) return null

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-[#C9A77C]" />
          <h4 className="text-base font-medium text-gray-900">{title}</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    )
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

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white">
        <ListingsHeader showSearch={false} showFilters={false} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Failed to load project</h1>
          <p className="text-gray-700 mb-4">{error || "The project could not be found."}</p>
          <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-light"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  console.log(project)
  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="min-h-screen bg-white">
      <ListingsHeader showSearch={false} showFilters={false} />

      <main className="max-w-7xl mx-auto px-6 py-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => window.close()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-light text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </button>

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
          {/* Gallery */}
          <NewBuildingGallery
            images={project.images}
            projectName={project.development_name}
            onSave={handleSave}
            onRequestFloorPlan={handleRequestFloorPlan}
          />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Header */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl lg:text-3xl font-light text-gray-900">{project.development_name}</h1>
                  <Badge
                    variant={project.status === "Available" ? "default" : "secondary"}
                    className="bg-green-100 text-green-800"
                  >
                    {project.status}
                  </Badge>
                </div>

                {project.urbanisation_name && (
                  <p className="text-lg text-gray-600 font-light">{project.urbanisation_name}</p>
                )}

                  {
                    project.property_status == "rent" ? <>
                    {project.shortterm_low !== 0 && <div className="text-xl lg:text-2xl font-light text-gray-900">Shortterm low: ${project.shortterm_low}</div>}
                    {project.shortterm_high !== 0 && <div className="text-xl lg:text-2xl font-light text-gray-900">Shortterm high: ${project.shortterm_high}</div>}
                    {project.longterm !== 0 && <div className="text-xl lg:text-2xl font-light text-gray-900">Longterm: ${project.longterm}</div>}</>
                    :<div className="text-xl lg:text-2xl font-light text-gray-900">{formatPrice(project.price, project.price_to, project.currency)}</div>
                  }

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-base">
                    {project.area}, {project.town}, {project.province}, {project.country}
                  </span>
                </div>
              </div>

              {/* Property Information */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Property Information</h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Property ID</div>
                    <div className="font-medium text-gray-900">{project.id}</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Type</div>
                    <div className="font-medium text-gray-900">{project.type_uk}</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Subtype</div>
                    <div className="font-medium text-gray-900">{project.subtype_uk}</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Levels</div>
                    <div className="font-medium text-gray-900">{project.levels || "N/A"}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <Bed className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">{formatRange(project.beds, project.beds_to)}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <Bath className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">{formatRange(project.baths, project.baths_to)}</div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <Square className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">{formatRange(project.built, project.built_to, "m²")}</div>
                      <div className="text-sm text-gray-600">Built Area</div>
                    </div>
                  </div>
                  {project.terrace && (
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                      <Maximize2 className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">{formatRange(project.terrace, project.terrace_to, "m²")}</div>
                        <div className="text-sm text-gray-600">Terrace</div>
                      </div>
                    </div>
                  )}
                  {project.plot && (
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                      <Home className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">{formatRange(project.plot, project.plot_to, "m²")}</div>
                        <div className="text-sm text-gray-600">Plot</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {project.start_date && (
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                      <Calendar className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium text-gray-900">{formatDate(project.start_date)}</div>
                        <div className="text-sm text-gray-600">Sales Start</div>
                      </div>
                    </div>
                  )}
                  {project.completion_date && (
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                      <Building className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-gray-900">{formatDate(project.completion_date)}</div>
                        <div className="text-sm text-gray-600">Completion</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <Shield className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium text-gray-900">{project.building_license ? "Yes" : "No"}</div>
                      <div className="text-sm text-gray-600">Building License</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">{project.own_property ? "Yes" : "No"}</div>
                      <div className="text-sm text-gray-600">Own Property</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.has_pool && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">
                      <Waves className="h-4 w-4" /> <span className="text-sm">Pool</span>
                    </div>
                  )}
                  {project.has_garden && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg">
                      <TreePine className="h-4 w-4" /> <span className="text-sm">Garden</span>
                    </div>
                  )}
                  {project.has_garage && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg">
                      <Car className="h-4 w-4" /> <span className="text-sm">Garage</span>
                    </div>
                  )}
                </div>
              </div>

              {project.description_uk && (
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">About This Project</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">{project.description_uk}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Property Characteristics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CharacteristicSection title="Setting" items={project.char_setting} icon={MapPin} />
                  <CharacteristicSection title="Orientation" items={project.char_orientation} icon={Compass} />
                  <CharacteristicSection title="Pool" items={project.char_pool} icon={Waves} />
                  <CharacteristicSection title="Climate Control" items={project.char_climate_control} icon={Thermometer} />
                  <CharacteristicSection title="Views" items={project.char_views} icon={Eye} />
                  <CharacteristicSection title="Features" items={project.char_features} icon={Building} />
                  <CharacteristicSection title="Furniture" items={project.char_furniture} icon={Home} />
                  <CharacteristicSection title="Kitchen" items={project.char_kitchen} icon={Utensils} />
                  <CharacteristicSection title="Garden" items={project.char_garden} icon={TreePine} />
                  <CharacteristicSection title="Security" items={project.char_security} icon={Shield} />
                  <CharacteristicSection title="Parking" items={project.char_parking} icon={ParkingCircle} />
                  <CharacteristicSection title="Utilities" items={project.char_utilities} icon={Wifi} />
                  <CharacteristicSection title="Condition" items={project.char_condition} icon={CheckCircle} />
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Property Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Listed:</span>
                    <span className="text-sm font-medium text-gray-900">{formatDateTime(project.listed_date)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Status Updated:</span>
                    <span className="text-sm font-medium text-gray-900">{formatDateTime(project.status_date)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Last Updated:</span>
                    <span className="text-sm font-medium text-gray-900">{formatDateTime(project.last_updated)}</span>
                  </div>
                </div>
              </div>

              {project.property_status === "new building" && <ProjectMap
                latitude={project.latitude}
                longitude={project.longitude}
                projectName={project.development_name}
              />}
            </div>

            <div className="lg:col-span-1">
              <ContactForm projectName={project.development_name} />
            </div>
          </div>
        </div>

        {/* <SimilarProjects currentProject={project} /> */}
      </main>

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