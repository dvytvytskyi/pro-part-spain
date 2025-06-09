"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Plus, X, Check, UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InviteData {
  id: string
  name: string
  email: string
  position: string
  status: "pending" | "sent"
}

export default function InviteAgentsPage() {
  const router = useRouter()
  const [invites, setInvites] = useState<InviteData[]>([])
  const [currentInvite, setCurrentInvite] = useState({
    name: "",
    email: "",
    position: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSending, setIsSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in and is an agency
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setCurrentUser(user)

    if (!user || !user.email) {
      router.push("/auth")
    } else if (user.role !== "agency") {
      router.push("/listings")
    }
  }, [router])

  const validateInvite = () => {
    const newErrors: { [key: string]: string } = {}

    if (!currentInvite.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!currentInvite.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(currentInvite.email)) {
      newErrors.email = "Please enter a valid email"
    } else if (invites.some((invite) => invite.email === currentInvite.email)) {
      newErrors.email = "This email has already been invited"
    }

    if (!currentInvite.position.trim()) {
      newErrors.position = "Position is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentInvite((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleAddInvite = () => {
    if (!validateInvite()) return

    const newInvite: InviteData = {
      id: Date.now().toString(),
      name: currentInvite.name,
      email: currentInvite.email,
      position: currentInvite.position,
      status: "pending",
    }

    setInvites((prev) => [...prev, newInvite])
    setCurrentInvite({ name: "", email: "", position: "" })
  }

  const handleRemoveInvite = (id: string) => {
    setInvites((prev) => prev.filter((invite) => invite.id !== id))
  }

  const handleSendInvites = async () => {
    if (invites.length === 0) return

    setIsSending(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update status to sent
      setInvites((prev) => prev.map((invite) => ({ ...invite, status: "sent" })))
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error sending invites:", error)
    } finally {
      setIsSending(false)
    }
  }

  const handleSkip = () => {
    router.push("/listings")
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
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative h-8 w-24">
              <Image src="/images/logo-black.png" alt="PRO PART" fill className="object-contain" />
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-600 hover:text-gray-900 font-light"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <UserPlus className="h-12 w-12 text-[#5784FF] mx-auto mb-4" />
          <h1 className="text-2xl font-light text-gray-900 mb-2">Invite Your Team Members</h1>
          <p className="text-gray-600 font-light max-w-lg mx-auto">
            Add your agents to collaborate on listings, manage properties, and grow your business together.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900">Add New Team Member</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                <Input
                  name="name"
                  value={currentInvite.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${errors.name ? "border-red-300" : ""}`}
                />
                {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={currentInvite.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${errors.email ? "border-red-300" : ""}`}
                />
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Position *</label>
                <Input
                  name="position"
                  value={currentInvite.position}
                  onChange={handleInputChange}
                  placeholder="Senior Agent"
                  className={`border-gray-200 focus:border-gray-300 focus:ring-0 ${errors.position ? "border-red-300" : ""}`}
                />
                {errors.position && <p className="text-xs text-red-600">{errors.position}</p>}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleAddInvite} className="bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light">
                <Plus className="h-4 w-4 mr-2" />
                Add to Invite List
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invite List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">Invite List</CardTitle>
            <div className="text-sm text-gray-500 font-light">
              {invites.length} {invites.length === 1 ? "person" : "people"}
            </div>
          </CardHeader>
          <CardContent>
            {invites.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-light">No team members added yet</p>
                <p className="text-sm text-gray-400">Add team members to send invitations</p>
              </div>
            ) : (
              <div className="space-y-3">
                {invites.map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#5784FF]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#5784FF] font-medium">
                          {invite.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{invite.name}</div>
                        <div className="text-sm text-gray-500">
                          {invite.email} • {invite.position}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {invite.status === "sent" ? (
                        <span className="text-green-600 text-sm flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Sent
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRemoveInvite(invite.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {showSuccess && (
                  <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    Invitations sent successfully!
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <Button onClick={handleSkip} variant="outline" className="font-light">
                    Skip for now
                  </Button>

                  <Button
                    onClick={handleSendInvites}
                    disabled={isSending || invites.every((i) => i.status === "sent")}
                    className="bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                  >
                    {isSending ? "Sending..." : "Send Invitations"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
