"use client"

import { useState, useEffect } from "react"
import { Edit3, MapPin, Phone, Mail, Calendar, TrendingUp, Home, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AuthUser {
  email: string
  name: string
  role: "agent" | "autonomous" | "agency"
}

interface ProfileStats {
  totalListings: number
  activeSales: number
  totalSales: number
  clientSatisfaction: number
  yearsExperience: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedDate: string
}

interface RecentActivity {
  id: string
  type: "listing" | "sale" | "client"
  title: string
  description: string
  date: string
}

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    email: "john@example.com",
    name: "John Agent",
    role: "agent",
  })
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = () => {
    // Mock profile stats
    const mockStats: ProfileStats = {
      totalListings: 47,
      activeSales: 8,
      totalSales: 156,
      clientSatisfaction: 4.9,
      yearsExperience: 7,
    }

    // Mock achievements
    const mockAchievements: Achievement[] = [
      {
        id: "1",
        title: "Top Performer",
        description: "Highest sales in Q1 2024",
        icon: "🏆",
        earnedDate: "2024-03-31",
      },
      {
        id: "2",
        title: "Client Champion",
        description: "100+ satisfied clients",
        icon: "⭐",
        earnedDate: "2024-02-15",
      },
      {
        id: "3",
        title: "Luxury Specialist",
        description: "Expert in luxury properties",
        icon: "💎",
        earnedDate: "2024-01-10",
      },
    ]

    // Mock recent activity
    const mockActivity: RecentActivity[] = [
      {
        id: "1",
        type: "sale",
        title: "Villa Sale Completed",
        description: "Luxury villa in Marbella sold for €3.2M",
        date: "2024-05-18",
      },
      {
        id: "2",
        type: "listing",
        title: "New Listing Added",
        description: "Modern penthouse in Barcelona",
        date: "2024-05-15",
      },
      {
        id: "3",
        type: "client",
        title: "New Client Meeting",
        description: "Initial consultation with potential buyer",
        date: "2024-05-12",
      },
    ]

    setProfileStats(mockStats)
    setAchievements(mockAchievements)
    setRecentActivity(mockActivity)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "listing":
        return <Home className="h-4 w-4 text-blue-600" />
      case "client":
        return <Users className="h-4 w-4 text-purple-600" />
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />
    }
  }

  if (!currentUser || !profileStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-[#5784FF]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#5784FF] text-2xl font-medium">{getInitials(currentUser.name)}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full bg-white"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-light text-gray-900 mb-1">{currentUser.name}</h1>
                    <p className="text-gray-600 font-light capitalize mb-3">
                      {currentUser.role === "autonomous" ? "Autonomous Agent" : currentUser.role}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {currentUser.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        +34 123 456 789
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Marbella, Spain
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="font-light">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 font-light">
                    Experienced real estate professional specializing in luxury properties on the Costa del Sol.
                    Committed to providing exceptional service and helping clients find their dream homes.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Performance Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900 mb-1">{profileStats.totalListings}</div>
                    <div className="text-sm text-gray-600">Total Listings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900 mb-1">{profileStats.activeSales}</div>
                    <div className="text-sm text-gray-600">Active Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900 mb-1">{profileStats.totalSales}</div>
                    <div className="text-sm text-gray-600">Total Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900 mb-1">{profileStats.clientSatisfaction}/5</div>
                    <div className="text-sm text-gray-600">Client Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h4 className="font-medium text-gray-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <p className="text-xs text-gray-400">Earned {formatDate(achievement.earnedDate)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                        <p className="text-sm text-gray-600 font-light">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(activity.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light">
                  <Home className="h-4 w-4 mr-2" />
                  Add New Listing
                </Button>
                <Button variant="outline" className="w-full font-light">
                  <Users className="h-4 w-4 mr-2" />
                  Contact Client
                </Button>
                <Button variant="outline" className="w-full font-light">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Professional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Professional Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Experience</span>
                  <span className="text-sm font-medium text-gray-900">{profileStats.yearsExperience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Specialization</span>
                  <Badge variant="secondary">Luxury Properties</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">License</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Languages</span>
                  <span className="text-sm font-medium text-gray-900">EN, ES, FR</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-900">+34 123 456 789</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-900">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-900">Marbella, Spain</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full font-light mt-4">
                  Share Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
