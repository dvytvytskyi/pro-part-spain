"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Send, Bot, User, Sparkles, Home, MapPin, Bed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface AuthUser {
  email: string
  name: string
  role: "agent" | "autonomous" | "agency"
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
  propertyRecommendations?: PropertyRecommendation[]
}

interface PropertyRecommendation {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  matchScore: number
  reasons: string[]
}

export default function AIAssistantPage() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    email: "john@example.com",
    name: "John Agent",
    role: "agent",
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedQuestions = [
    "Find me a villa in Marbella under €4M",
    "What are the best investment properties?",
    "Show me properties with sea views",
    "I need a family home with 4+ bedrooms",
    "What's the market trend in Barcelona?",
    "Find properties near golf courses",
  ]

  const mockPropertyRecommendations: PropertyRecommendation[] = [
    {
      id: "1",
      title: "Luxury Villa Marbella",
      price: 3450000,
      location: "Marbella, Spain",
      bedrooms: 5,
      bathrooms: 4,
      area: 420,
      image: "/images/property-1.webp",
      matchScore: 95,
      reasons: ["Within budget", "Luxury amenities", "Prime location", "Sea views"],
    },
    {
      id: "2",
      title: "Modern Villa Costa del Sol",
      price: 2850000,
      location: "Estepona, Spain",
      bedrooms: 4,
      bathrooms: 3,
      area: 380,
      image: "/images/property-2.webp",
      matchScore: 88,
      reasons: ["Great value", "Modern design", "Pool and garden", "Near beach"],
    },
  ]

  useEffect(() => {
    initializeChat()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: "welcome",
      type: "assistant",
      content: `Hello! I'm your AI real estate assistant. I can help you find properties, analyze market trends, and answer questions about real estate. What would you like to know?`,
      timestamp: new Date().toISOString(),
    }
    setMessages([welcomeMessage])
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || newMessage
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(text)
      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()

    if (input.includes("villa") && input.includes("marbella")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: `I found some excellent villas in Marbella that match your criteria. Here are my top recommendations:`,
        timestamp: new Date().toISOString(),
        propertyRecommendations: mockPropertyRecommendations,
      }
    }

    if (input.includes("investment") || input.includes("roi")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: `For investment properties, I recommend focusing on areas with strong rental demand and capital appreciation potential. The Costa del Sol region offers excellent investment opportunities with average ROI of 6-8% annually. Key factors to consider:

• Location near amenities and transport
• Properties under €500K for better rental yields
• New developments with modern amenities
• Areas with growing tourism and expat communities

Would you like me to show you specific investment properties?`,
        timestamp: new Date().toISOString(),
      }
    }

    if (input.includes("market") || input.includes("trend")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: `Current market trends in Spain show:

📈 **Price Growth**: Average 8.2% year-over-year
🏖️ **Coastal Areas**: Strongest demand, especially Costa del Sol
🏙️ **Barcelona**: Luxury market showing resilience
💰 **Investment**: Foreign buyers increasing by 15%
🏗️ **New Developments**: High demand for modern amenities

The market is particularly strong for luxury properties above €1M. Would you like specific data for any particular region?`,
        timestamp: new Date().toISOString(),
      }
    }

    if (input.includes("family") || input.includes("bedroom")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: `For family homes, I recommend properties with:

• 4+ bedrooms for growing families
• Good school districts nearby
• Safe neighborhoods with parks
• Garage and storage space
• Garden or outdoor areas

Popular family-friendly areas include Marbella, Valencia, and suburban Barcelona. What's your preferred location and budget range?`,
        timestamp: new Date().toISOString(),
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "assistant",
      content: `I understand you're looking for real estate information. I can help you with:

• Property searches and recommendations
• Market analysis and trends
• Investment advice and ROI calculations
• Area information and amenities
• Price comparisons and valuations

Could you be more specific about what you're looking for? For example, your budget, preferred location, or property type?`,
      timestamp: new Date().toISOString(),
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#5784FF] to-[#4a70e0] rounded-full flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-light text-gray-900">AI Real Estate Assistant</h1>
            <p className="text-sm text-gray-500">Your intelligent property advisor</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {messages.length === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSendMessage(question)}
                  className="text-left h-auto p-3 font-light text-sm border-gray-200 hover:bg-gray-50"
                >
                  {question}
                </Button>
              ))}
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex space-x-3 max-w-3xl ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="flex-shrink-0">
                  {message.type === "assistant" ? (
                    <div className="w-8 h-8 bg-gradient-to-br from-[#5784FF] to-[#4a70e0] rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className={`rounded-lg p-4 ${
                      message.type === "user"
                        ? "bg-[#5784FF] text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {/* Property Recommendations */}
                  {message.propertyRecommendations && (
                    <div className="mt-4 space-y-3">
                      {message.propertyRecommendations.map((property) => (
                        <Card key={property.id} className="hover:shadow-lg transition-shadow duration-200">
                          <CardContent className="p-4">
                            <div className="flex space-x-4">
                              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
                                <Image
                                  src={property.image || "/placeholder.svg"}
                                  alt={property.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium text-gray-900">{property.title}</h4>
                                  <div className="text-right">
                                    <div className="text-lg font-light text-gray-900">
                                      {formatPrice(property.price)}
                                    </div>
                                    <div className="text-xs text-green-600 font-medium">
                                      {property.matchScore}% match
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm mb-2">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {property.location}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center">
                                    <Bed className="h-3 w-3 mr-1" />
                                    {property.bedrooms} beds
                                  </div>
                                  <div className="flex items-center">
                                    <Home className="h-3 w-3 mr-1" />
                                    {property.area}m²
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {property.reasons.map((reason, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                                    >
                                      {reason}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-3 max-w-3xl">
                <div className="w-8 h-8 bg-gradient-to-br from-[#5784FF] to-[#4a70e0] rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me about properties, market trends, or investment advice..."
              className="pr-12 border-gray-200 focus:border-gray-300 focus:ring-0"
              disabled={isTyping}
            />
          </div>
          <Button
            onClick={() => handleSendMessage()}
            disabled={!newMessage.trim() || isTyping}
            className="bg-[#5784FF] hover:bg-[#4a70e0] text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
