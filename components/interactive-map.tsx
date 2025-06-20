"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface Property {
  id: string
  development_name: string
  price: number
  currency: string
  type_uk: string
  beds: number
  baths: number
  built: number
  latitude: number
  longitude: number
  category: string
  images: string[]
  town: string
  area: string
  description?: string
}

interface InteractiveMapProps {
  properties: Property[]
}

export default function InteractiveMap({ properties }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([36.4848, -4.9507], 11)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstanceRef.current)
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapInstanceRef.current?.removeLayer(marker)
    })
    markersRef.current = []

    // Create custom icons for different categories
    const createIcon = (category: string) => {
      const colors = {
        "new-building": "#3B82F6", // Blue
        secondary: "#10B981", // Green
        rental: "#F59E0B", // Orange
      }

      return L.divIcon({
        html: `
          <div style="
            background-color: ${colors[category as keyof typeof colors] || "#6B7280"}; 
            width: 24px; 
            height: 24px; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          ">
            <div style="
              width: 8px; 
              height: 8px; 
              background-color: white; 
              border-radius: 50%;
            "></div>
          </div>
        `,
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
    }

    // Add markers for each property
    properties.forEach((property) => {
      const marker = L.marker([property.latitude, property.longitude], {
        icon: createIcon(property.category),
      })

      const formatPrice = (price: number, category: string) => {
        if (category === "rental") {
          return `€${price.toLocaleString()}/month`
        }
        return price >= 1000000 ? `€${(price / 1000000).toFixed(1)}M` : `€${(price / 1000).toFixed(0)}K`
      }

      const getCategoryLabel = (category: string) => {
        const labels = {
          "new-building": "New Building",
          secondary: "For Sale",
          rental: "For Rent",
        }
        return labels[category as keyof typeof labels] || category
      }

      const getCategoryColor = (category: string) => {
        const colors = {
          "new-building": "#3B82F6",
          secondary: "#10B981",
          rental: "#F59E0B",
        }
        return colors[category as keyof typeof colors] || "#6B7280"
      }

      const popupContent = `
        <div style="
          min-width: 280px; 
          max-width: 320px; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        ">
          <div style="position: relative;">
            <img 
              src="${property.images[0]}" 
              alt="${property.development_name}" 
              style="
                width: 100%; 
                height: 160px; 
                object-fit: cover;
                display: block;
              " 
            />
            <div style="
              position: absolute;
              top: 12px;
              left: 12px;
              background: ${getCategoryColor(property.category)};
              color: white;
              padding: 4px 8px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">
              ${getCategoryLabel(property.category)}
            </div>
          </div>
          
          <div style="padding: 16px;">
            <h3 style="
              margin: 0 0 8px 0; 
              font-size: 16px; 
              font-weight: 600; 
              color: #1F2937;
              line-height: 1.3;
            ">
              ${property.development_name}
            </h3>
            
            <p style="
              margin: 0 0 12px 0; 
              color: #059669; 
              font-weight: 700; 
              font-size: 18px;
              line-height: 1;
            ">
              ${formatPrice(property.price, property.category)}
            </p>
            
            <div style="
              display: flex; 
              align-items: center; 
              gap: 16px; 
              margin-bottom: 12px;
              color: #6B7280;
              font-size: 13px;
            ">
              <span style="display: flex; align-items: center; gap: 4px;">
                🛏️ ${property.beds} beds
              </span>
              <span style="display: flex; align-items: center; gap: 4px;">
                🚿 ${property.baths} baths
              </span>
              <span style="display: flex; align-items: center; gap: 4px;">
                📐 ${property.built}m²
              </span>
            </div>
            
            <div style="
              display: flex;
              align-items: center;
              gap: 4px;
              margin-bottom: 16px;
              color: #6B7280;
              font-size: 13px;
            ">
              <span style="color: #9CA3AF;">📍</span>
              <span>${property.area}, ${property.town}</span>
            </div>
            
            ${
              property.description
                ? `
              <p style="
                margin: 0 0 16px 0;
                color: #6B7280;
                font-size: 13px;
                line-height: 1.4;
              ">
                ${property.description}
              </p>
            `
                : ""
            }
            
            <a 
              href="/${property.category}/${property.id}" 
              style="
                display: block;
                background: linear-gradient(135deg, #1F2937 0%, #374151 100%);
                color: white;
                padding: 12px 16px;
                text-decoration: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                text-align: center;
                transition: all 0.2s ease;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              "
              onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
            >
              View Property Details
            </a>
          </div>
        </div>
      `

      marker.bindPopup(popupContent, {
        maxWidth: 320,
        className: "custom-popup",
      })

      marker.addTo(mapInstanceRef.current!)
      markersRef.current.push(marker)
    })

    // Fit map to show all markers
    if (properties.length > 0) {
      const group = new L.FeatureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1))
    }
  }, [properties])

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          border-radius: 12px;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .custom-marker:hover div {
          transform: scale(1.1);
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </>
  )
}
