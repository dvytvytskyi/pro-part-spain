"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Luxury Villas", href: "/listings?category=luxury-villas" },
  { name: "Family Homes", href: "/listings?category=family-homes" },
  { name: "Penthouses", href: "/listings?category=penthouses" },
  { name: "Sea View", href: "/listings?category=sea-view" },
  { name: "Golf Residences", href: "/listings?category=golf-residences" },
  { name: "New Developments", href: "/listings?category=new-developments" },
  { name: "City Apartments", href: "/listings?category=city-apartments" },
  { name: "Countryside Retreats", href: "/listings?category=countryside-retreats" },
]

export function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      // Add background when scrolled
      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "bg-white/85 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        {/* Top Container */}
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left Side - Burger + Logo */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
                {mobileMenuOpen ? (
                  <X className={`h-4 w-4 ${isScrolled ? "text-gray-700" : "text-white"}`} />
                ) : (
                  <Menu className={`h-4 w-4 ${isScrolled ? "text-gray-700" : "text-white"}`} />
                )}
              </Button>
              <Link href="/" className="relative h-5 w-16">
                <Image src="/images/logo-white.svg" alt="PRO PART" fill className="object-contain" priority />
              </Link>
            </div>

            {/* Right Side - Contact + Log In */}
            <div className="flex items-center space-x-6">
              <Link
                href="/contact"
                className={`text-[14px] font-light transition-colors duration-200 hover:text-[#C9A77C] ${
                  isScrolled ? "text-gray-700" : "text-white hover:text-white/80"
                }`}
              >
                Contact
              </Link>
              <Link
                href="/auth"
                className={`text-[14px] font-light transition-colors duration-200 px-3 py-1 ${
                  isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-white/80"
                }`}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Container - Categories */}
        <div className="relative">
          {/* Top border line */}
          <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-white/50"></div>
          {/* Bottom border line */}
          <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-white/50"></div>

          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-start space-x-8 overflow-x-auto">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`text-[14px] font-light whitespace-nowrap transition-colors duration-200 hover:text-[#5784FF] ${
                    isScrolled ? "text-gray-700" : "text-white hover:text-white/80"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-1/4 bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-xl ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <nav className="space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-[#C9A77C] transition-colors duration-200 text-[14px] font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block text-gray-700 hover:text-[#5784FF] transition-colors duration-200 text-[14px] font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <Link
                href="/blog"
                className="block text-gray-700 hover:text-[#C9A77C] transition-colors duration-200 text-[14px] font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-[#C9A77C] transition-colors duration-200 text-[14px] font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-[#C9A77C] transition-colors duration-200 text-[14px] font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-700 font-light text-[14px] px-0"
              >
                Log In
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setMobileMenuOpen(false)} />}
    </>
  )
}
