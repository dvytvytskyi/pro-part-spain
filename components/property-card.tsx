"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/property"

interface PropertyCardProps {
  property: Property
  onClick: () => void
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const images = property.gallery || ["/placeholder.svg?height=400&width=600"]

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorited(!isFavorited)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery */}
      <div className="relative h-72 overflow-hidden rounded-lg mb-4 bg-gray-100">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={property.development_name || "Property"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Labels */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-light text-gray-900">
            Video
          </span>
          <span className="px-3 py-1 bg-[#C9A77C] text-white rounded-full text-xs font-light">Promoted</span>
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFavorite}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>

        {/* Navigation Arrows */}
        {images.length > 1 && isHovered && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </Button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Price */}
        <div className="text-lg font-light text-gray-900">{formatPrice(property.price)}</div>

        {/* Property Details */}
        <div className="flex items-center space-x-6 text-gray-600">
          {property.bedrooms && (
            <div className="flex items-center space-x-1">
              <Bed className="h-3 w-3" />
              <span className="font-light text-sm">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center space-x-1">
              <Bath className="h-3 w-3" />
              <span className="font-light text-sm">{property.bathrooms}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center space-x-1">
              <Square className="h-3 w-3" />
              <span className="font-light text-sm">{property.area} sqm</span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="font-light text-sm">{property.town || "Prime Location"}</span>
        </div>

        {/* Development Name */}
        <h3 className="text-sm font-light text-gray-900 line-clamp-1">
          {property.development_name || "Luxury Property"}
        </h3>

        {/* Description */}
        {property.description && (
          <p className="text-gray-500 font-light text-sm line-clamp-2 leading-relaxed">{property.description}</p>
        )}
      </div>
    </div>
  )
}
