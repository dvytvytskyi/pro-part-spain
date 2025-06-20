"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your newsletter service
    console.log("Newsletter signup:", email)
    setIsSubmitted(true)
    setEmail("")

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-4">Newsletter</h3>
      <p className="text-xs text-gray-600 font-light mb-4 leading-relaxed">
        Get the latest property updates and market insights delivered to your inbox.
      </p>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-800 font-light">
            Thank you for subscribing! Check your email for confirmation.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 text-xs h-9 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
            />
          </div>
          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white text-xs h-9 font-light">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  )
}
