"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"

interface User {
  email: string
  name?: string
  role?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("currentUser")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await apiClient.login(email, password)

      const userData: User = {
        email,
        name: email.split("@")[0], // Simple name extraction
        role: email.includes("agent") ? "agent" : email.includes("agency") ? "agency" : "user",
      }

      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("currentUser", JSON.stringify(userData))

      return { success: true, user: userData }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    apiClient.clearToken()
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  }
}
