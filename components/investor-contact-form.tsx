"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, User, Mail, Phone, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"

export function InvestorContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [interest, setInterest] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || !interest) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after submission
    setName("")
    setEmail("")
    setPhone("")
    setInterest("")

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const interestOptions = ["I want to invest", "I want to sell"]

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const selectInterest = (option: string) => {
    setInterest(option)
    setIsDropdownOpen(false)
  }

  const isFormValid = name && email && phone && interest

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Thank You!</h3>
          <p className="text-sm text-gray-600 text-center font-light">
            Your message has been sent successfully. Our team will contact you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-xs text-gray-600 font-light">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-all duration-200 outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-xs text-gray-600 font-light">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-all duration-200 outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="text-xs text-gray-600 font-light">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 600 000 000"
                className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-all duration-200 outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="interest" className="text-xs text-gray-600 font-light">
              I am interested in
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                className="w-full flex items-center justify-between pl-3 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-all duration-200 outline-none"
              >
                <span className={interest ? "text-gray-900" : "text-gray-500"}>
                  {interest || "Select your interest"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
                  <ul className="py-1">
                    {interestOptions.map((option) => (
                      <li key={option}>
                        <button
                          type="button"
                          onClick={() => selectInterest(option)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-gray-900"
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 h-auto"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner className="h-5 w-5 mr-2" />
                <span>Sending...</span>
              </div>
            ) : (
              "Request Information"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
