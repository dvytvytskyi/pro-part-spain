"use client"

import { useState } from "react"
import type { FilterState } from "@/types/property"

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({})

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters)
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("propertyFilters", JSON.stringify(newFilters))
    }
  }

  const clearFilters = () => {
    const emptyFilters: FilterState = {}
    setFilters(emptyFilters)
    // Clear from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("propertyFilters")
    }
  }

  const initializeFromURL = (searchParams: URLSearchParams) => {
    const urlFilters: FilterState = {}

    // Parse URL parameters
    for (const [key, value] of searchParams.entries()) {
      if (value) {
        switch (key) {
          case "min_price":
          case "max_price":
          case "min_area":
          case "max_area":
          case "bedrooms":
            urlFilters[key as keyof FilterState] = Number.parseInt(value)
            break
          case "pool":
          case "garden":
          case "garage":
            urlFilters[key as keyof FilterState] = value === "true"
            break
          default:
            urlFilters[key as keyof FilterState] = value
        }
      }
    }

    // If no URL filters, try to load from localStorage
    if (Object.keys(urlFilters).length === 0 && typeof window !== "undefined") {
      try {
        const savedFilters = localStorage.getItem("propertyFilters")
        if (savedFilters) {
          const parsedFilters = JSON.parse(savedFilters)
          setFilters(parsedFilters)
          return
        }
      } catch (error) {
        console.error("Error loading saved filters:", error)
      }
    }

    setFilters(urlFilters)
  }

  return {
    filters,
    updateFilters,
    clearFilters,
    initializeFromURL,
  }
}
