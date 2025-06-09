"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Upload, User, Building2, ArrowLeft, Check, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AddAgencyModal } from "@/components/add-agency-modal"
import { useRouter } from "next/navigation"

type Tab = "login" | "register"
type UserRole = "agent" | "agency" | "autonomous"
type RegisterStep = 1 | 2 | 3

interface Agency {
  id: string
  name: string
  logo?: string
  phone: string
}

interface FormData {
  // Login
  loginEmail: string
  loginPassword: string

  // Register - Common
  role: UserRole
  email: string
  password: string
  phone: string

  // Register - Agent
  fullName: string
  selectedAgency: string
  photo: File | null

  // Register - Agency
  agencyName: string
  logo: File | null
  website: string
  address: string
}

// Mock user accounts for testing
const MOCK_USERS = [
  { email: "agent@example.com", password: "password123", role: "agent", name: "John Agent" },
  { email: "autonomous@example.com", password: "password123", role: "autonomous", name: "Sarah Independent" },
  { email: "agency@example.com", password: "password123", role: "agency", name: "Premier Real Estate" },
]

export default function AuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("login")
  const [registerStep, setRegisterStep] = useState<RegisterStep>(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [addAgencyModalOpen, setAddAgencyModalOpen] = useState(false)
  const [agencySearch, setAgencySearch] = useState("")
  const [showAgencyDropdown, setShowAgencyDropdown] = useState(false)
  const [loginError, setLoginError] = useState("")

  const [formData, setFormData] = useState<FormData>({
    loginEmail: "",
    loginPassword: "",
    role: "agent",
    email: "",
    password: "",
    phone: "",
    fullName: "",
    selectedAgency: "",
    photo: null,
    agencyName: "",
    logo: null,
    website: "",
    address: "",
  })

  // Mock agencies data
  const [agencies, setAgencies] = useState<Agency[]>([
    { id: "1", name: "Premium Real Estate", phone: "+1 555 0101" },
    { id: "2", name: "Luxury Properties Group", phone: "+1 555 0102" },
    { id: "3", name: "Costa del Sol Realty", phone: "+1 555 0103" },
    { id: "4", name: "Mediterranean Homes", phone: "+1 555 0104" },
  ])

  const filteredAgencies = agencies.filter((agency) => agency.name.toLowerCase().includes(agencySearch.toLowerCase()))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
    if (name === "loginEmail" || name === "loginPassword") {
      setLoginError("")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "logo") => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }))
    }
  }

  const handleAgencySelect = (agency: Agency) => {
    setFormData((prev) => ({ ...prev, selectedAgency: agency.id }))
    setAgencySearch(agency.name)
    setShowAgencyDropdown(false)
  }

  const handleAgencyAdded = (newAgency: Agency) => {
    setAgencies((prev) => [...prev, newAgency])
    setFormData((prev) => ({ ...prev, selectedAgency: newAgency.id }))
    setAgencySearch(newAgency.name)
  }

  const validateStep = (step: RegisterStep): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (step === 1) {
      // Role selection is always valid since we have a default
      return true
    }

    if (step === 2) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email"
      }

      if (!formData.password.trim()) {
        newErrors.password = "Password is required"
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      }

      if (formData.role === "agent") {
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required"
        }
        if (!formData.selectedAgency) {
          newErrors.selectedAgency = "Please select an agency"
        }
      } else if (formData.role === "autonomous") {
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required"
        }
      } else {
        if (!formData.agencyName.trim()) {
          newErrors.agencyName = "Agency name is required"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateLogin = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.loginEmail.trim()) {
      newErrors.loginEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.loginEmail)) {
      newErrors.loginEmail = "Please enter a valid email"
    }

    if (!formData.loginPassword.trim()) {
      newErrors.loginPassword = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateLogin()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check against mock users
      const user = MOCK_USERS.find((u) => u.email === formData.loginEmail && u.password === formData.loginPassword)

      if (user) {
        // Store user in localStorage (in a real app, you'd use a proper auth system)
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            email: user.email,
            name: user.name,
            role: user.role,
          }),
        )

        // Redirect based on role
        if (user.role === "agency") {
          router.push("/invite-agents")
        } else {
          router.push("/listings")
        }
      } else {
        setLoginError("Invalid email or password")
      }
    } catch (error) {
      console.error("Login error:", error)
      setLoginError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(2)) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user in localStorage (in a real app, you'd use a proper auth system)
      const newUser = {
        email: formData.email,
        name: formData.role === "agency" ? formData.agencyName : formData.fullName,
        role: formData.role,
      }

      localStorage.setItem("currentUser", JSON.stringify(newUser))

      setRegisterStep(3)
    } catch (error) {
      console.error("Register error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextStep = () => {
    if (validateStep(registerStep as RegisterStep)) {
      setRegisterStep((prev) => Math.min(prev + 1, 3) as RegisterStep)
    }
  }

  const handlePrevStep = () => {
    setRegisterStep((prev) => Math.max(prev - 1, 1) as RegisterStep)
  }

  const handleCompleteRegistration = () => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")

    if (user.role === "agency") {
      router.push("/invite-agents")
    } else {
      router.push("/listings")
    }
  }

  const selectedAgency = agencies.find((a) => a.id === formData.selectedAgency)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/images/logo-black.png" alt="PRO PART" width={120} height={40} className="mx-auto" />
          </Link>
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            {activeTab === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-600 font-light">
            {activeTab === "login" ? "Sign in to your account" : "Join our real estate platform"}
          </p>
        </div>

        {/* Mock Accounts Info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Test Accounts</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>
              <strong>Agent:</strong> agent@example.com / password123
            </li>
            <li>
              <strong>Autonomous Agent:</strong> autonomous@example.com / password123
            </li>
            <li>
              <strong>Agency:</strong> agency@example.com / password123
            </li>
          </ul>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            {/* Tabs */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setActiveTab("login")
                  setErrors({})
                  setLoginError("")
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setActiveTab("register")
                  setRegisterStep(1)
                  setErrors({})
                  setLoginError("")
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "register" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Register
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input
                    name="loginEmail"
                    type="email"
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${
                      errors.loginEmail ? "border-red-300" : ""
                    }`}
                  />
                  {errors.loginEmail && <p className="text-sm text-red-600">{errors.loginEmail}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Input
                      name="loginPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.loginPassword}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`border-gray-200 focus:border-gray-300 focus:ring-0 pr-10 ${
                        errors.loginPassword ? "border-red-300" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.loginPassword && <p className="text-sm text-red-600">{errors.loginPassword}</p>}
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-sm text-red-600">{loginError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                >
                  {isLoading ? "Signing in..." : "Login"}
                </Button>

                <div className="text-center">
                  <button type="button" className="text-sm text-[#5784FF] hover:text-[#4a70e0] font-light">
                    Forgot password?
                  </button>
                </div>
              </form>
            )}

            {/* Register Form */}
            {activeTab === "register" && (
              <div className="space-y-6">
                {/* Step Indicator */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step < registerStep
                            ? "bg-[#5784FF] text-white"
                            : step === registerStep
                              ? "bg-[#5784FF] text-white"
                              : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step < registerStep ? <Check className="h-4 w-4" /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`w-12 h-0.5 ${step < registerStep ? "bg-[#5784FF]" : "bg-gray-200"}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Role Selection */}
                {registerStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 text-center">Select Your Role</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, role: "agent" }))}
                        className={`p-4 border-2 rounded-lg text-center transition-colors ${
                          formData.role === "agent"
                            ? "border-[#5784FF] bg-[#5784FF]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <User className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                        <div className="font-medium text-gray-900">Agent</div>
                        <div className="text-xs text-gray-600">Part of agency</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, role: "autonomous" }))}
                        className={`p-4 border-2 rounded-lg text-center transition-colors ${
                          formData.role === "autonomous"
                            ? "border-[#5784FF] bg-[#5784FF]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <UserPlus className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                        <div className="font-medium text-gray-900">Autonomous</div>
                        <div className="text-xs text-gray-600">Independent agent</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, role: "agency" }))}
                        className={`p-4 border-2 rounded-lg text-center transition-colors ${
                          formData.role === "agency"
                            ? "border-[#5784FF] bg-[#5784FF]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Building2 className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                        <div className="font-medium text-gray-900">Agency</div>
                        <div className="text-xs text-gray-600">Real estate agency</div>
                      </button>
                    </div>
                    <Button
                      onClick={handleNextStep}
                      className="w-full bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {/* Step 2: Form Fields */}
                {registerStep === 2 && (
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Back Button */}
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-light mb-4"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </button>

                    {/* Agent Fields */}
                    {(formData.role === "agent" || formData.role === "autonomous") && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name *</label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${
                            errors.fullName ? "border-red-300" : ""
                          }`}
                        />
                        {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
                      </div>
                    )}

                    {/* Agency Selection - Only for regular agents */}
                    {formData.role === "agent" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Select Agency *</label>
                        <div className="relative">
                          <Input
                            value={agencySearch}
                            onChange={(e) => {
                              setAgencySearch(e.target.value)
                              setShowAgencyDropdown(true)
                            }}
                            onFocus={() => setShowAgencyDropdown(true)}
                            placeholder="Search for agency..."
                            className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${
                              errors.selectedAgency ? "border-red-300" : ""
                            }`}
                          />
                          {showAgencyDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                              {filteredAgencies.map((agency) => (
                                <button
                                  key={agency.id}
                                  type="button"
                                  onClick={() => handleAgencySelect(agency)}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                >
                                  <div className="font-medium text-gray-900">{agency.name}</div>
                                  <div className="text-sm text-gray-600">{agency.phone}</div>
                                </button>
                              ))}
                              <button
                                type="button"
                                onClick={() => {
                                  setAddAgencyModalOpen(true)
                                  setShowAgencyDropdown(false)
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-[#5784FF] font-medium border-t border-gray-200"
                              >
                                + Add new agency
                              </button>
                            </div>
                          )}
                        </div>
                        {errors.selectedAgency && <p className="text-sm text-red-600">{errors.selectedAgency}</p>}
                      </div>
                    )}

                    {/* Agency Fields */}
                    {formData.role === "agency" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Agency Name *</label>
                          <Input
                            name="agencyName"
                            value={formData.agencyName}
                            onChange={handleInputChange}
                            placeholder="Enter agency name"
                            className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${
                              errors.agencyName ? "border-red-300" : ""
                            }`}
                          />
                          {errors.agencyName && <p className="text-sm text-red-600">{errors.agencyName}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Logo</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, "logo")}
                              className="hidden"
                              id="logo-upload"
                            />
                            <label htmlFor="logo-upload" className="cursor-pointer">
                              <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                {formData.logo ? formData.logo.name : "Click to upload logo"}
                              </p>
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Website</label>
                          <Input
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://yourwebsite.com"
                            className="border-gray-200 focus:border-gray-300 focus:ring-0"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Address</label>
                          <Input
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter business address"
                            className="border-gray-200 focus:border-gray-300 focus:ring-0"
                          />
                        </div>
                      </>
                    )}

                    {/* Common Fields */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${
                          errors.email ? "border-red-300" : ""
                        }`}
                      />
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Password *</label>
                      <div className="relative">
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Create a password"
                          className={`border-gray-200 focus:border-gray-300 focus:ring-0 pr-10 ${
                            errors.password ? "border-red-300" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone *</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${
                          errors.phone ? "border-red-300" : ""
                        }`}
                      />
                      {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Photo Upload for Agent */}
                    {(formData.role === "agent" || formData.role === "autonomous") && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Photo (optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "photo")}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label htmlFor="photo-upload" className="cursor-pointer">
                            <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              {formData.photo ? formData.photo.name : "Click to upload photo"}
                            </p>
                          </label>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                    >
                      {isLoading ? "Creating account..." : "Register"}
                    </Button>
                  </form>
                )}

                {/* Step 3: Success */}
                {registerStep === 3 && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Account Created Successfully!</h3>
                    <p className="text-gray-600 font-light">
                      Welcome to PRO PART! Your account has been created and you can now start using our platform.
                    </p>
                    <Button
                      onClick={handleCompleteRegistration}
                      className="w-full bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 font-light">
            ← Back to homepage
          </Link>
        </div>
      </div>

      {/* Add Agency Modal */}
      <AddAgencyModal
        isOpen={addAgencyModalOpen}
        onClose={() => setAddAgencyModalOpen(false)}
        onAgencyAdded={handleAgencyAdded}
      />
    </div>
  )
}
