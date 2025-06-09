"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  AlertCircle,
  User,
  Building2,
  UserPlus,
  Trash2,
  Plus,
} from "lucide-react"

interface AuthUser {
  email: string
  name: string
  role: "agent" | "autonomous" | "agency"
}

interface AgentData {
  id: string
  name: string
  email: string
  position: string
  status: "active" | "pending" | "inactive"
  joinedAt: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [agencyLogo, setAgencyLogo] = useState<File | null>(null)

  // Form states
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    description: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [agencyData, setAgencyData] = useState({
    name: "",
    email: "",
    description: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Mock agents data for agency
  const [agents, setAgents] = useState<AgentData[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@agency.com",
      position: "Senior Agent",
      status: "active",
      joinedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@agency.com",
      position: "Junior Agent",
      status: "pending",
      joinedAt: "2024-02-01",
    },
  ])

  const [newAgentInvite, setNewAgentInvite] = useState({
    name: "",
    email: "",
    position: "",
  })

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (user && user.email) {
      setCurrentUser(user as AuthUser)
      setProfileData({
        name: user.name,
        email: user.email,
        description: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setAgencyData({
        name: user.name,
        email: user.email,
        description: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      // Mock verification status
      setIsVerified(Math.random() > 0.5)
    } else {
      router.push("/auth")
    }
  }, [router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update localStorage
      const updatedUser = {
        ...currentUser,
        name: profileData.name,
        email: profileData.email,
      }
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      setCurrentUser(updatedUser as AuthUser)

      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAgencyUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update localStorage
      const updatedUser = {
        ...currentUser,
        name: agencyData.name,
        email: agencyData.email,
      }
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      setCurrentUser(updatedUser as AuthUser)

      alert("Agency updated successfully!")
    } catch (error) {
      console.error("Error updating agency:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLicenseUpload = async () => {
    if (!licenseFile) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsVerified(true)
      alert("License uploaded successfully! Verification in progress.")
    } catch (error) {
      console.error("Error uploading license:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveAgent = (agentId: string) => {
    if (confirm("Are you sure you want to remove this agent?")) {
      setAgents((prev) => prev.filter((agent) => agent.id !== agentId))
    }
  }

  const handleInviteAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAgentInvite.name || !newAgentInvite.email || !newAgentInvite.position) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newAgent: AgentData = {
        id: Date.now().toString(),
        name: newAgentInvite.name,
        email: newAgentInvite.email,
        position: newAgentInvite.position,
        status: "pending",
        joinedAt: new Date().toISOString().split("T")[0],
      }

      setAgents((prev) => [...prev, newAgent])
      setNewAgentInvite({ name: "", email: "", position: "" })
      alert("Invitation sent successfully!")
    } catch (error) {
      console.error("Error sending invitation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AuthHeader додається в layout.tsx */}

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600 font-light">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            {currentUser.role !== "autonomous" && <TabsTrigger value="verification">Verification</TabsTrigger>}
            {currentUser.role === "agency" && <TabsTrigger value="agents">Agents</TabsTrigger>}
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {currentUser.role === "agency" ? (
                    <Building2 className="h-5 w-5 text-gray-600" />
                  ) : (
                    <User className="h-5 w-5 text-gray-600" />
                  )}
                  <span>{currentUser.role === "agency" ? "Agency Information" : "Profile Information"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={currentUser.role === "agency" ? handleAgencyUpdate : handleProfileUpdate}>
                  <div className="space-y-6">
                    {/* Photo/Logo Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {currentUser.role === "agency" ? "Agency Logo" : "Profile Photo"}
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-[#5784FF]/10 rounded-full flex items-center justify-center">
                          <span className="text-[#5784FF] text-lg font-medium">
                            {currentUser.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (currentUser.role === "agency") {
                                setAgencyLogo(file || null)
                              } else {
                                setProfilePhoto(file || null)
                              }
                            }}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label htmlFor="photo-upload">
                            <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload {currentUser.role === "agency" ? "Logo" : "Photo"}
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {currentUser.role === "agency" ? "Agency Name" : "Full Name"} *
                      </label>
                      <Input
                        value={currentUser.role === "agency" ? agencyData.name : profileData.name}
                        onChange={(e) => {
                          if (currentUser.role === "agency") {
                            setAgencyData((prev) => ({ ...prev, name: e.target.value }))
                          } else {
                            setProfileData((prev) => ({ ...prev, name: e.target.value }))
                          }
                        }}
                        className="border-gray-200 focus:border-gray-300 focus:ring-0"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email *</label>
                      <Input
                        type="email"
                        value={currentUser.role === "agency" ? agencyData.email : profileData.email}
                        onChange={(e) => {
                          if (currentUser.role === "agency") {
                            setAgencyData((prev) => ({ ...prev, email: e.target.value }))
                          } else {
                            setProfileData((prev) => ({ ...prev, email: e.target.value }))
                          }
                        }}
                        className="border-gray-200 focus:border-gray-300 focus:ring-0"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {currentUser.role === "agency" ? "About Agency" : "About Me"}
                      </label>
                      <Textarea
                        value={currentUser.role === "agency" ? agencyData.description : profileData.description}
                        onChange={(e) => {
                          if (currentUser.role === "agency") {
                            setAgencyData((prev) => ({ ...prev, description: e.target.value }))
                          } else {
                            setProfileData((prev) => ({ ...prev, description: e.target.value }))
                          }
                        }}
                        placeholder={
                          currentUser.role === "agency" ? "Tell us about your agency..." : "Tell us about yourself..."
                        }
                        rows={4}
                        className="border-gray-200 focus:border-gray-300 focus:ring-0 resize-none"
                      />
                    </div>

                    {/* Password Change */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Current Password</label>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              value={
                                currentUser.role === "agency" ? agencyData.currentPassword : profileData.currentPassword
                              }
                              onChange={(e) => {
                                if (currentUser.role === "agency") {
                                  setAgencyData((prev) => ({ ...prev, currentPassword: e.target.value }))
                                } else {
                                  setProfileData((prev) => ({ ...prev, currentPassword: e.target.value }))
                                }
                              }}
                              className="border-gray-200 focus:border-gray-300 focus:ring-0 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">New Password</label>
                          <div className="relative">
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              value={currentUser.role === "agency" ? agencyData.newPassword : profileData.newPassword}
                              onChange={(e) => {
                                if (currentUser.role === "agency") {
                                  setAgencyData((prev) => ({ ...prev, newPassword: e.target.value }))
                                } else {
                                  setProfileData((prev) => ({ ...prev, newPassword: e.target.value }))
                                }
                              }}
                              className="border-gray-200 focus:border-gray-300 focus:ring-0 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                          <Input
                            type="password"
                            value={
                              currentUser.role === "agency" ? agencyData.confirmPassword : profileData.confirmPassword
                            }
                            onChange={(e) => {
                              if (currentUser.role === "agency") {
                                setAgencyData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                              } else {
                                setProfileData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                              }
                            }}
                            className="border-gray-200 focus:border-gray-300 focus:ring-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Tab */}
          {currentUser.role !== "autonomous" && (
            <TabsContent value="verification">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <span>Verification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      {isVerified ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-orange-500" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          {isVerified ? "Verified Account" : "Verification Required"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {isVerified
                            ? "Your account is verified and has full access to all features"
                            : "Upload your license to get full access to all project data"}
                        </div>
                      </div>
                      {isVerified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Verified
                        </Badge>
                      )}
                    </div>

                    {!isVerified && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Upload License</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
                              className="hidden"
                              id="license-upload"
                            />
                            <label htmlFor="license-upload" className="cursor-pointer">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                {licenseFile ? licenseFile.name : "Click to upload your license"}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                            </label>
                          </div>
                        </div>

                        <Button
                          onClick={handleLicenseUpload}
                          disabled={!licenseFile || isLoading}
                          className="bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                        >
                          {isLoading ? "Uploading..." : "Submit for Verification"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Agents Tab - Only for Agency */}
          {currentUser.role === "agency" && (
            <TabsContent value="agents">
              <div className="space-y-6">
                {/* Add New Agent */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <UserPlus className="h-5 w-5 text-gray-600" />
                      <span>Invite New Agent</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleInviteAgent}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Full Name *</label>
                          <Input
                            value={newAgentInvite.name}
                            onChange={(e) => setNewAgentInvite((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="John Doe"
                            className="border-gray-200 focus:border-gray-300 focus:ring-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Email *</label>
                          <Input
                            type="email"
                            value={newAgentInvite.email}
                            onChange={(e) => setNewAgentInvite((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="john@example.com"
                            className="border-gray-200 focus:border-gray-300 focus:ring-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Position *</label>
                          <Input
                            value={newAgentInvite.position}
                            onChange={(e) => setNewAgentInvite((prev) => ({ ...prev, position: e.target.value }))}
                            placeholder="Senior Agent"
                            className="border-gray-200 focus:border-gray-300 focus:ring-0"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          {isLoading ? "Sending..." : "Send Invitation"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Current Agents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-gray-600" />
                        <span>Team Members</span>
                      </div>
                      <Badge variant="secondary">{agents.length} members</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {agents.map((agent) => (
                        <div
                          key={agent.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#5784FF]/10 rounded-full flex items-center justify-center">
                              <span className="text-[#5784FF] font-medium">
                                {agent.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{agent.name}</div>
                              <div className="text-sm text-gray-500">
                                {agent.email} • {agent.position}
                              </div>
                              <div className="text-xs text-gray-400">Joined {agent.joinedAt}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={
                                agent.status === "active"
                                  ? "default"
                                  : agent.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {agent.status}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveAgent(agent.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
