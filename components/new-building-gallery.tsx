"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Heart, FileText, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewBuildingGalleryProps {
  images: string[]
  projectName: string
  onSave?: () => void
  onRequestFloorPlan?: () => void
}

export function NewBuildingGallery({ images, projectName, onSave, onRequestFloorPlan }: NewBuildingGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllImages, setShowAllImages] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const mainImage = images[0]
  const gridImages = images.slice(1, 5) // Show 4 images in grid
  const remainingCount = Math.max(0, images.length - 5)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    if (onSave) onSave()
  }

  const handleRequestFloorPlan = () => {
    if (onRequestFloorPlan) onRequestFloorPlan()
  }

  if (showAllImages) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAllImages(false)}
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
        >
          <X className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`${projectName} - Image ${currentImageIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <div className="flex space-x-2 max-w-4xl overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 ${
                  index === currentImageIndex ? "ring-2 ring-white" : "opacity-60 hover:opacity-80"
                }`}
              >
                <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-2 h-96 rounded-xl overflow-hidden">
        {/* Main Image - Left Side (2 columns) */}
        <div className="col-span-2 relative bg-gray-100 cursor-pointer" onClick={() => setShowAllImages(true)}>
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={`${projectName} - Main view`}
            fill
            className="object-cover"
          />

          {/* Action Buttons on Main Image */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleSave()
              }}
              variant="secondary"
              size="sm"
              className={`bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-light ${
                isSaved ? "text-red-600" : ""
              }`}
            >
              <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              Save
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleRequestFloorPlan()
              }}
              variant="secondary"
              size="sm"
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-light"
            >
              <FileText className="h-4 w-4 mr-2" />
              Request Floor Plan
            </Button>
          </div>
        </div>

        {/* Grid Images - Right Side (2 columns, 2 rows) */}
        <div className="col-span-2 grid grid-cols-2 gap-2">
          {gridImages.map((image, index) => (
            <div
              key={index}
              className="relative bg-gray-100 cursor-pointer"
              onClick={() => {
                setCurrentImageIndex(index + 1)
                setShowAllImages(true)
              }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${projectName} - View ${index + 2}`}
                fill
                className="object-cover"
              />

              {/* Show Photos Count on Last Image */}
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{images.length} Photos</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
