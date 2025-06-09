"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchResult {
  type: "development" | "town"
  value: string
  label: string
}

interface SearchBarProps {
  onSearch: (query: string, type: "development" | "town") => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      searchSuggestions(debouncedQuery)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [debouncedQuery])

  const searchSuggestions = async (searchQuery: string) => {
    setLoading(true)
    try {
      // Mock search results for demo
      const mockResults: SearchResult[] = [
        { type: "development", value: "Luxury Apartments Downtown", label: "Luxury Apartments Downtown" },
        { type: "development", value: "Seaside Villa Complex", label: "Seaside Villa Complex" },
        { type: "town", value: "City Center", label: "City Center" },
        { type: "town", value: "Coastal Area", label: "Coastal Area" },
      ].filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))

      setResults(mockResults.slice(0, 6))
      setIsOpen(mockResults.length > 0)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
      setIsOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (result: SearchResult) => {
    setQuery(result.label)
    setIsOpen(false)
    onSearch(result.value, result.type)
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search by location or development name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-4 py-2 text-base border-gray-200 focus:border-gray-300 focus:ring-0 rounded-full bg-gray-50 focus:bg-white transition-colors font-light"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-400 font-light text-base">Searching...</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {/* Developments */}
              {results.filter((r) => r.type === "development").length > 0 && (
                <>
                  <div className="px-4 py-2 text-sm font-medium text-gray-400 border-b border-gray-50">
                    Developments
                  </div>
                  {results
                    .filter((r) => r.type === "development")
                    .map((result, index) => (
                      <button
                        key={`dev-${index}`}
                        onClick={() => handleSelect(result)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                      >
                        <span className="text-gray-900 font-light text-base">{result.label}</span>
                      </button>
                    ))}
                </>
              )}

              {/* Towns */}
              {results.filter((r) => r.type === "town").length > 0 && (
                <>
                  {results.filter((r) => r.type === "development").length > 0 && (
                    <div className="border-t border-gray-50" />
                  )}
                  <div className="px-4 py-2 text-sm font-medium text-gray-400 border-b border-gray-50">Locations</div>
                  {results
                    .filter((r) => r.type === "town")
                    .map((result, index) => (
                      <button
                        key={`town-${index}`}
                        onClick={() => handleSelect(result)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                      >
                        <span className="text-gray-900 font-light text-base">{result.label}</span>
                      </button>
                    ))}
                </>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400 font-light text-base">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}
