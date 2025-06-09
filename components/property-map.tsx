"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/property"

interface PropertyMapProps {
  properties: Property[]
  onPropertySelect: (id: number | string) => void
  hoveredPropertyId?: number | string | null
}

export function PropertyMap({ properties, onPropertySelect, hoveredPropertyId }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [L, setL] = useState<any>(null)

  // Load Leaflet dynamically on client side
  useEffect(() => {
    if (typeof window !== "undefined" && !mapLoaded) {
      // Add Leaflet CSS
      const linkEl = document.createElement("link")
      linkEl.rel = "stylesheet"
      linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      linkEl.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      linkEl.crossOrigin = ""
      document.head.appendChild(linkEl)

      // Load Leaflet JS
      import("leaflet").then((leaflet) => {
        setL(leaflet.default)
        setMapLoaded(true)
      })
    }
  }, [mapLoaded])

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (mapLoaded && mapRef.current && !map && L) {
      // Create map instance
      const mapInstance = L.map(mapRef.current).setView([40.416775, -3.70379], 6) // Center on Spain

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance)

      setMap(mapInstance)
    }
  }, [mapLoaded, map, L])

  // Add markers when map is ready and properties change
  useEffect(() => {
    if (map && L && properties.length > 0) {
      // Clear existing markers
      markers.forEach((marker) => marker.remove())
      const newMarkers: any[] = []

      // Create bounds to fit all markers
      const bounds = L.latLngBounds()

      // Add markers for each property
      properties.forEach((property, index) => {
        // Use mock coordinates for demo - spread them across Spain
        const baseCoords = [
          [40.416775, -3.70379], // Madrid
          [41.3851, 2.1734], // Barcelona
          [39.4699, -0.3763], // Valencia
          [37.3891, -5.9845], // Seville
          [36.7213, -4.4214], // Malaga
          [43.3614, -5.8593], // Oviedo
        ]

        const coordIndex = index % baseCoords.length
        const lat = baseCoords[coordIndex][0] + (Math.random() - 0.5) * 0.5
        const lng = baseCoords[coordIndex][1] + (Math.random() - 0.5) * 0.5

        // Create custom marker icon
        const isHovered = hoveredPropertyId === property.id
        const icon = L.divIcon({
          html: `
            <div class="${isHovered ? "bg-blue-600 scale-125" : "bg-gray-900"} 
                        text-white rounded-full w-6 h-6 flex items-center justify-center 
                        transition-all duration-300 shadow-md border-2 border-white">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          `,
          className: "",
          iconSize: [24, 24],
          iconAnchor: [12, 24],
        })

        // Create marker
        const marker = L.marker([lat, lng], { icon })
          .addTo(map)
          .on("click", () => onPropertySelect(property.id))

        // Add popup with property info
        const formatPrice = (price: number) => {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(price)
        }

        marker.bindPopup(`
          <div class="p-3 min-w-[200px]">
            <div class="font-medium text-gray-900 mb-1">${property.development_name || "Luxury Property"}</div>
            <div class="text-lg font-light text-gray-900 mb-2">${formatPrice(property.price)}</div>
            <div class="text-sm text-gray-600 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              ${property.town || "Prime Location"}
            </div>
          </div>
        `)

        newMarkers.push(marker)
        bounds.extend([lat, lng])
      })

      // Fit map to bounds if we have markers
      if (newMarkers.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] })
      }

      setMarkers(newMarkers)
    }
  }, [map, L, properties, hoveredPropertyId, onPropertySelect])

  // Update marker styles when hoveredPropertyId changes
  useEffect(() => {
    if (map && L && markers.length > 0) {
      // Re-render markers with updated hover state
      markers.forEach((marker, index) => {
        const property = properties[index]
        if (property) {
          const isHovered = hoveredPropertyId === property.id
          const icon = L.divIcon({
            html: `
              <div class="${isHovered ? "bg-blue-600 scale-125" : "bg-gray-900"} 
                          text-white rounded-full w-6 h-6 flex items-center justify-center 
                          transition-all duration-300 shadow-md border-2 border-white">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
            `,
            className: "",
            iconSize: [24, 24],
            iconAnchor: [12, 24],
          })
          marker.setIcon(icon)
        }
      })
    }
  }, [hoveredPropertyId, map, L, markers, properties])

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full rounded-lg overflow-hidden" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <Button
          variant="outline"
          size="sm"
          className="bg-white shadow-md border-gray-200 text-gray-700 hover:bg-gray-50 text-base font-light"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Show all results on map
        </Button>
      </div>
    </div>
  )
}
