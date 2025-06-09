"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface AuthUser {
  email: string
  name: string
  role: "agent" | "autonomous" | "agency"
}

interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  role: string
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: "text" | "image" | "property"
  propertyData?: {
    title: string
    price: number
    image: string
    location: string
  }
}

export default function MessagesPage() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    email: "john@example.com",
    name: "John Agent",
    role: "agent",
  })
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data
  const mockContacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      lastMessage: "I'm interested in the villa in Marbella",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      isOnline: true,
      role: "Client",
    },
    {
      id: "2",
      name: "Michael Chen",
      lastMessage: "Can we schedule a viewing?",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      isOnline: false,
      role: "Client",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      lastMessage: "Thank you for the property details",
      lastMessageTime: "Yesterday",
      unreadCount: 1,
      isOnline: true,
      role: "Agent",
    },
    {
      id: "4",
      name: "David Wilson",
      lastMessage: "The inspection went well",
      lastMessageTime: "2 days ago",
      unreadCount: 0,
      isOnline: false,
      role: "Client",
    },
  ]

  const mockMessages: Message[] = [
    {
      id: "1",
      senderId: "1",
      content: "Hi! I saw your listing for the villa in Marbella. Could you provide more details?",
      timestamp: "2024-05-20T10:30:00Z",
      type: "text",
    },
    {
      id: "2",
      senderId: "current",
      content: "Hello Sarah! I'd be happy to help. Here are the details for the property:",
      timestamp: "2024-05-20T10:32:00Z",
      type: "text",
    },
    {
      id: "3",
      senderId: "current",
      content: "",
      timestamp: "2024-05-20T10:33:00Z",
      type: "property",
      propertyData: {
        title: "Luxury Villa Marbella",
        price: 3450000,
        image: "/images/property-1.webp",
        location: "Marbella, Spain",
      },
    },
    {
      id: "4",
      senderId: "1",
      content: "This looks perfect! I'm interested in scheduling a viewing.",
      timestamp: "2024-05-20T10:35:00Z",
      type: "text",
    },
    {
      id: "5",
      senderId: "current",
      content: "Great! I can arrange a viewing for this week. What days work best for you?",
      timestamp: "2024-05-20T10:36:00Z",
      type: "text",
    },
    {
      id: "6",
      senderId: "1",
      content: "I'm available Thursday or Friday afternoon. Would either of those work?",
      timestamp: "2024-05-20T10:38:00Z",
      type: "text",
    },
  ]

  useEffect(() => {
    setContacts(mockContacts)
    setSelectedContact(mockContacts[0])
    setMessages(mockMessages)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current",
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Update contact's last message
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === selectedContact.id
          ? {
              ...contact,
              lastMessage: newMessage,
              lastMessageTime: "now",
            }
          : contact,
      ),
    )
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-light text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="pl-10 border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                selectedContact?.id === contact.id ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-[#5784FF]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#5784FF] font-medium text-sm">{getInitials(contact.name)}</span>
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                    {contact.unreadCount > 0 && (
                      <span className="bg-[#5784FF] text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{contact.role}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-[#5784FF]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#5784FF] font-medium text-sm">{getInitials(selectedContact.name)}</span>
                  </div>
                  {selectedContact.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-medium text-gray-900">{selectedContact.name}</h2>
                  <p className="text-sm text-gray-500">
                    {selectedContact.isOnline ? "Online" : "Last seen 2 hours ago"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "current" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === "current"
                        ? "bg-[#5784FF] text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    {message.type === "text" && <p className="text-sm">{message.content}</p>}
                    {message.type === "property" && message.propertyData && (
                      <Card className="w-64 overflow-hidden">
                        <div className="relative h-32">
                          <Image
                            src={message.propertyData.image || "/placeholder.svg"}
                            alt={message.propertyData.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="font-medium text-gray-900 text-sm mb-1">{message.propertyData.title}</h4>
                          <p className="text-lg font-light text-gray-900 mb-1">
                            {formatPrice(message.propertyData.price)}
                          </p>
                          <p className="text-xs text-gray-500">{message.propertyData.location}</p>
                        </CardContent>
                      </Card>
                    )}
                    <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="pr-10 border-gray-200 focus:border-gray-300 focus:ring-0"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-[#5784FF] hover:bg-[#4a70e0] text-white h-9 w-9 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500 font-light">Choose a contact to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
