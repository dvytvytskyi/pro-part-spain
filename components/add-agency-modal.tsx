"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddAgencyModalProps {
  isOpen: boolean
  onClose: () => void
  onAgencyAdded: (agency: { id: string; name: string; logo?: string; phone: string }) => void
}

export function AddAgencyModal({ isOpen, onClose, onAgencyAdded }: AddAgencyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    logo: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Agency name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s\-$$$$]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new agency object
      const newAgency = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        logo: formData.logo ? URL.createObjectURL(formData.logo) : undefined,
      }

      onAgencyAdded(newAgency)

      // Reset form
      setFormData({ name: "", phone: "", logo: null })
      setErrors({})
      onClose()
    } catch (error) {
      console.error("Error adding agency:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({ name: "", phone: "", logo: null })
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-light text-gray-900">Add New Agency</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Agency Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Agency Name *</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter agency name"
              className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${errors.name ? "border-red-300" : ""}`}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone *</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${errors.phone ? "border-red-300" : ""}`}
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Logo (optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="logo-upload" />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{formData.logo ? formData.logo.name : "Click to upload logo"}</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
            >
              {isSubmitting ? "Adding..." : "Add Agency"}
            </Button>
            <Button type="button" onClick={handleClose} variant="outline" className="font-light">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
