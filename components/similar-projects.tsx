"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import type { NewBuilding } from "@/types/new-building"

interface SimilarProjectsProps {
  currentProject: NewBuilding
}

export function SimilarProjects({ currentProject }: SimilarProjectsProps) {
  const [similarProjects, setSimilarProjects] = useState<NewBuilding[]>([])

  const fetchSimilarProjects = useCallback(() => {
    // Mock similar projects - in real app, this would be an API call
    const mockProjects: NewBuilding[] = [
      {
        id: 2,
        development_name: "Marina Bay Residences",
        images: ["/images/property-2.webp", "/images/property-3.webp"],
        price: 2800000,
        currency: "EUR",
        town: "Marbella",
        country: "Spain",
        province: "Andalusia",
        area: "Puerto Banús",
        beds: 3,
        baths: 2,
        surface_area: { built: 180 },
        latitude: 36.4848,
        longitude: -4.9537,
        has_pool: true,
        has_garden: false,
        has_garage: true,
        type: { uk: "Apartment" },
        subtype: { uk: "Luxury" },
      },
      {
        id: 3,
        development_name: "Costa del Sol Heights",
        images: ["/images/property-4.webp", "/images/property-5.webp"],
        price: 3200000,
        currency: "EUR",
        town: "Estepona",
        country: "Spain",
        province: "Andalusia",
        area: "New Golden Mile",
        beds: 4,
        baths: 3,
        surface_area: { built: 220 },
        latitude: 36.4285,
        longitude: -5.1457,
        has_pool: true,
        has_garden: true,
        has_garage: true,
        type: { uk: "Villa" },
        subtype: { uk: "Modern" },
      },
      {
        id: 4,
        development_name: "Sunset Villas",
        images: ["/images/property-6.webp", "/images/property-1.webp"],
        price: 2650000,
        currency: "EUR",
        town: "Benalmádena",
        country: "Spain",
        province: "Andalusia",
        area: "Costa del Sol",
        beds: 3,
        baths: 3,
        surface_area: { built: 195 },
        latitude: 36.5988,
        longitude: -4.5166,
        has_pool: true,
        has_garden: true,
        has_garage: true,
        type: { uk: "Villa" },
        subtype: { uk: "Contemporary" },
      },
      {
        id: 5,
        development_name: "Mediterranean Gardens",
        images: ["/images/property-3.webp", "/images/property-4.webp"],
        price: 3100000,
        currency: "EUR",
        town: "Fuengirola",
        country: "Spain",
        province: "Andalusia",
        area: "Los Boliches",
        beds: 4,
        baths: 4,
        surface_area: { built: 240 },
        latitude: 36.5397,
        longitude: -4.6262,
        has_pool: true,
        has_garden: true,
        has_garage: true,
        type: { uk: "Townhouse" },
        subtype: { uk: "Luxury" },
      },
    ]

    // Filter projects within ±10% price range
    const priceRange = currentProject.price * 0.1
    const minPrice = currentProject.price - priceRange
    const maxPrice = currentProject.price + priceRange

    const filtered = mockProjects.filter(
      (project) => project.id !== currentProject.id && project.price >= minPrice && project.price <= maxPrice,
    )

    setSimilarProjects(filtered.slice(0, 4))
  }, [currentProject.id, currentProject.price])

  useEffect(() => {
    fetchSimilarProjects()
  }, [fetchSimilarProjects])

  const formatPrice = useCallback((price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }, [])

  if (similarProjects.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-light text-gray-900">Similar Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProjects.map((project) => (
          <Link key={project.id} href={`/new-building/${project.id}`} className="group">
            <div className="space-y-3">
              {/* Image */}
              <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.development_name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="text-lg font-light text-gray-900">{formatPrice(project.price, project.currency)}</div>

                <h4 className="font-medium text-gray-900 line-clamp-1">{project.development_name}</h4>

                <div className="flex items-center text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="text-sm font-light">{project.town}</span>
                </div>

                <div className="text-sm text-gray-600 font-light">
                  {project.beds} beds • {project.baths} baths • {project.surface_area.built}m²
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
