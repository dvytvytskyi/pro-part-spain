"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, LogOut, Settings, CreditCard, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthUser {
  email: string
  name: string
  role: "agent" | "autonomous" | "agency"
}

export function AuthHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (user && user.email) {
      setCurrentUser(user as AuthUser)
    }
  }, [])

  // Handle click outside user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setUserMenuOpen(false)
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (!currentUser) {
    return null
  }

  const navigationItems = [
    { name: "Listings", href: "/listings" },
    { name: "Collections", href: "/collections" },
    { name: "Messages", href: "/messages" },
    { name: "AI Assistant", href: "/ai-assistant" },
  ]

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <Link href="/listings" className="relative h-8 w-24">
              <Image src="/images/logo-black.png" alt="PRO PART" fill className="object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-light transition-colors duration-200 ${
                  pathname === item.href ? "text-[#5784FF]" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-3 focus:outline-none hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
            >
              <div className="w-8 h-8 bg-[#5784FF] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {currentUser.name ? getInitials(currentUser.name) : "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">{currentUser.name}</span>
              <ChevronDown className="h-4 w-4 text-gray-400 hidden md:block" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-[100]">
                <div className="p-4 border-b border-gray-100">
                  <div className="font-medium text-gray-900">{currentUser.name}</div>
                  <div className="text-sm text-gray-500">{currentUser.email}</div>
                  <div className="text-xs text-gray-400 capitalize mt-1">
                    {currentUser.role === "autonomous" ? "Autonomous Agent" : currentUser.role}
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3 text-gray-400" />
                    Settings
                  </Link>
                  <Link
                    href="/billing"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <CreditCard className="h-4 w-4 mr-3 text-gray-400" />
                    Billing
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3 text-gray-400" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4 pt-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-light ${
                    pathname === item.href ? "text-[#5784FF]" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <Link
                  href="/settings"
                  className="flex items-center text-sm font-light text-gray-600 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
                <Link
                  href="/billing"
                  className="flex items-center text-sm font-light text-gray-600 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm font-light text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
