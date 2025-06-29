"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const images = property.images || ["/placeholder.svg?height=400&width=600"];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const formatPrice = (property: Property) => {
    const currency = property.currency || "EUR";

    const formatSinglePrice = (value: number) => {
      if (value === 0) return "Price on request";
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    };

    // Handle rentals with short-term pricing
    if (
      property.category === "rentals" &&
      property.shortterm_low &&
      property.shortterm_high
    ) {
      if (property.shortterm_low === property.shortterm_high) {
        return `${formatSinglePrice(property.shortterm_low)}/week`;
      }
      return `${formatSinglePrice(
        property.shortterm_low
      )} - ${formatSinglePrice(property.shortterm_high)}/week`;
    }

    // Handle rentals with long-term pricing
    if (property.category === "rentals" && property.longterm) {
      return `${formatSinglePrice(property.longterm)}/month`;
    }

    // Handle sale properties with price range
    if (property.price_to && property.price_to > property.price) {
      return `${formatSinglePrice(property.price)} - ${formatSinglePrice(
        property.price_to
      )}`;
    }

    // Single price
    return formatSinglePrice(property.price);
  };

  const formatRange = (from?: number, to?: number, unit = "") => {
    if (!from) return "";
    if (to && to !== from) {
      return `${from} - ${to}${unit}`;
    }
    return `${from}${unit}`;
  };

  const getPropertyLabel = () => {
    if (property.category === "new_building") return "New Building";
    if (property.category === "rentals") return "For Rent";
    if (property.category === "secondary") return "Resale";
    return "Property";
  };

  const formatCompletionDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotsRef.current) return;

    const container = dotsRef.current;
    const activeDot = container.children[currentImageIndex] as HTMLElement;

    if (!activeDot) return;

    const containerRect = container.getBoundingClientRect();
    const dotRect = activeDot.getBoundingClientRect();
    const scrollLeft = container.scrollLeft;

    const delta =
      dotRect.left -
      containerRect.left -
      container.clientWidth / 2 +
      activeDot.offsetWidth / 2;

    container.scrollTo({
      left: scrollLeft + delta,
      behavior: "smooth",
    });
  }, [currentImageIndex]);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery */}
      <div className="relative h-72 overflow-hidden rounded-lg mb-4 bg-gray-100">
        <Image
          src={images[currentImageIndex].image_url || "/placeholder.svg"}
          alt={property.development_name || "Property"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Labels */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-light text-gray-900">
            {getPropertyLabel()}
          </span>
          {property.status === "Available" && (
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-light">
              Available
            </span>
          )}
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
          <Heart
            className={`h-4 w-4 ${
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>

        {/* Navigation Arrows */}
        {images.length > 1 && isHovered && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={e => {
                e.preventDefault()
                prevImage(e)
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={e => {
                e.preventDefault()
                nextImage(e)
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </Button>
          </>
        )}

        {/* Image Indicators (Scroll + Active centered) */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center">
            <div
              ref={dotsRef}
              className="flex gap-1 max-w-[60px] overflow-x-auto scrollbar-hide"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 flex-shrink-0 rounded-full transition-all duration-200 scroll-snap-align-center ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Price */}
        <div className="text-lg font-light text-gray-900">
          {formatPrice(property)}
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-6 text-gray-600">
          {(property.beds || property.bedrooms) && (
            <div className="flex items-center space-x-1">
              <Bed className="h-3 w-3" />
              <span className="font-light text-sm">
                {formatRange(
                  property.beds || property.bedrooms,
                  property.beds_to
                )}
              </span>
            </div>
          )}
          {(property.baths || property.bathrooms) && (
            <div className="flex items-center space-x-1">
              <Bath className="h-3 w-3" />
              <span className="font-light text-sm">
                {formatRange(
                  property.baths || property.bathrooms,
                  property.baths_to
                )}
              </span>
            </div>
          )}
          {property.built && (
            <div className="flex items-center space-x-1">
              <Square className="h-3 w-3" />
              <span className="font-light text-sm">
                {formatRange(property.built, property.built_to, " m²")}
              </span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="font-light text-sm">
            {[property.area, property.town, property.province]
              .filter(Boolean)
              .join(", ") || "Prime Location"}
          </span>
        </div>

        {/* Development Name */}
        <h3 className="text-sm font-light text-gray-900 line-clamp-1">
          {property.development_name || "Luxury Property"}
        </h3>

        {/* Property Type */}
        {(property.type_uk || property.subtype_uk) && (
          <div className="text-xs text-gray-500 font-light">
            {property.subtype_uk || property.type_uk}
          </div>
        )}

        {/* Completion Date for New Buildings */}
        {property.category === "new_building" && property.completion_date && (
          <div className="flex items-center text-xs text-blue-600">
            <Calendar className="h-3 w-3 mr-1" />
            <span className="font-light">
              Completion: {formatCompletionDate(property.completion_date)}
            </span>
          </div>
        )}

        {/* Description */}
        {(property.description_uk || property.description) && (
          <p className="text-gray-500 font-light text-sm line-clamp-2 leading-relaxed">
            {property.description_uk || property.description}
          </p>
        )}
      </div>
    </div>
  );
}
