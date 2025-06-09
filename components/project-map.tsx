"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ProjectMapProps {
  latitude: number
  longitude: number
  projectName: string
}

export function ProjectMap({ latitude, longitude, projectName }: ProjectMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapInstanceRef = useRef<any>(null)
  const initializationRef = useRef(false)

  const initializeGoogleMap = useCallback(() => {
    if (mapRef.current && window.google && !mapInstanceRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      // Add marker
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: projectName,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#C9A77C" stroke="white" strokeWidth="3"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
        },
      })

      mapInstanceRef.current = map
      setMapLoaded(true)
    }
  }, [latitude, longitude, projectName])

  const initializeLeafletMap = useCallback(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Add Leaflet CSS
      const linkEl = document.createElement("link")
      linkEl.rel = "stylesheet"
      linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(linkEl)

      // Load Leaflet JS
      import("leaflet").then((L) => {
        if (mapRef.current && !mapInstanceRef.current) {
          const map = L.default.map(mapRef.current).setView([latitude, longitude], 15)

          L.default
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              maxZoom: 19,
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            })
            .addTo(map)

          // Custom marker
          const icon = L.default.divIcon({
            html: `
              <div class="bg-[#5784FF] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
            `,
            className: "",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })

          L.default.marker([latitude, longitude], { icon }).addTo(map).bindPopup(projectName)

          mapInstanceRef.current = map
          setMapLoaded(true)
        }
      })
    }
  }, [latitude, longitude, projectName])

  useEffect(() => {
    if (initializationRef.current) return
    initializationRef.current = true

    if (typeof window !== "undefined") {
      // Try Google Maps first
      if (window.google) {
        initializeGoogleMap()
      } else {
        // Load Google Maps script
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`
        script.async = true
        script.defer = true
        script.onload = () => {
          initializeGoogleMap()
        }
        script.onerror = () => {
          // Fallback to Leaflet if Google Maps fails
          initializeLeafletMap()
        }
        document.head.appendChild(script)
      }
    }

    return () => {
      initializationRef.current = false
    }
  }, [initializeGoogleMap, initializeLeafletMap])

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-gray-900">Location</h3>
      <div className="relative h-64 rounded-xl overflow-hidden bg-gray-100">
        <div ref={mapRef} className="h-full w-full" />
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  )
}
