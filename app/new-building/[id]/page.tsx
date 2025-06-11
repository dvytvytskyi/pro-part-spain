"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
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
  Phone,
  Mail,
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
import { InvestorContactForm } from "@/components/investor-contact-form"
import type { NewBuilding } from "@/types/new-building"

interface NewBuildingPageProps {
  params: {
    id: string
  }
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
          "/placeholder.svg?height=600&width=800&text=Main+View",
          "/placeholder.svg?height=400&width=600&text=Living+Room",
          "/placeholder.svg?height=400&width=600&text=Kitchen",
          "/placeholder.svg?height=400&width=600&text=Bedroom",
          "/placeholder.svg?height=400&width=600&text=Bathroom",
          "/placeholder.svg?height=400&width=600&text=Terrace",
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
