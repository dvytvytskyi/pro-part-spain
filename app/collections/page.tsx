"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Folder, Heart, Share2, Trash2, Edit3, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface AuthUser {
  email: string
  name: string
  role: "agent" | "autonomous" | "agency"
}

interface Property {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  type: string
}

interface Collection {
  id: string
  name: string
  description: string
  properties: Property[]
  createdAt: string
  isPrivate: boolean
}

export default function CollectionsPage() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    email: "john@example.com",
    name: "John Agent",
    role: "agent",
  })
  const [collections, setCollections] = useState<Collection[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
    isPrivate: false,
  })

  // Mock data
  const mockProperties: Property[] = [
    {
      id: "1",
      title: "Luxury Villa Marbella",
      price: 3450000,
      location: "Marbella",
      bedrooms: 5,
      bathrooms: 4,
      area: 420,
      image: "/images/property-1.webp",
      type: "Villa",
    },
    {
      id: "2",
      title: "City Center Penthouse",
      price: 2750000,
      location: "Madrid",
      bedrooms: 3,
      bathrooms: 3,
      area: 200,
      image: "/images/property-2.webp",
      type: "Penthouse",
    },
  ]

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = () => {
    // Mock collections data
    const mockCollections: Collection[] = [
      {
        id: "1",
        name: "Favorites",
        description: "My favorite properties",
        properties: mockProperties,
        createdAt: "2024-05-01",
        isPrivate: false,
      },
      {
        id: "2",
        name: "Marbella Properties",
        description: "Properties in Marbella area",
        properties: [mockProperties[0]],
        createdAt: "2024-04-15",
        isPrivate: true,
      },
      {
        id: "3",
        name: "Investment Options",
        description: "Properties for investment purposes",
        properties: [],
        createdAt: "2024-03-20",
        isPrivate: false,
      },
    ]
    setCollections(mockCollections)
  }

  const handleCreateCollection = async () => {
    if (!newCollection.name.trim()) return

    const collection: Collection = {
      id: Date.now().toString(),
      name: newCollection.name,
      description: newCollection.description,
      properties: [],
      createdAt: new Date().toISOString().split("T")[0],
      isPrivate: newCollection.isPrivate,
    }

    setCollections((prev) => [collection, ...prev])
    setNewCollection({ name: "", description: "", isPrivate: false })
    setShowCreateModal(false)
  }

  const handleEditCollection = (collection: Collection) => {
    setEditingCollection(collection)
    setNewCollection({
      name: collection.name,
      description: collection.description,
      isPrivate: collection.isPrivate,
    })
    setShowCreateModal(true)
  }

  const handleUpdateCollection = async () => {
    if (!editingCollection || !newCollection.name.trim()) return

    setCollections((prev) =>
      prev.map((col) =>
        col.id === editingCollection.id
          ? {
              ...col,
              name: newCollection.name,
              description: newCollection.description,
              isPrivate: newCollection.isPrivate,
            }
          : col,
      ),
    )

    setEditingCollection(null)
    setNewCollection({ name: "", description: "", isPrivate: false })
    setShowCreateModal(false)
  }

  const handleDeleteCollection = (collectionId: string) => {
    if (confirm("Are you sure you want to delete this collection?")) {
      setCollections((prev) => prev.filter((col) => col.id !== collectionId))
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900 mb-2">My Collections</h1>
            <p className="text-gray-600 font-light">Organize and save your favorite properties</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Collection
          </Button>
        </div>

        {/* Collections Grid */}
        {collections.length === 0 ? (
          <div className="text-center py-24">
            <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No collections yet</h3>
            <p className="text-gray-500 font-light mb-6">Create your first collection to organize properties</p>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Collection
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Card key={collection.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-medium text-gray-900 mb-1">{collection.name}</CardTitle>
                      <p className="text-sm text-gray-500 font-light">{collection.description}</p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {collection.isPrivate && (
                        <Badge variant="secondary" className="text-xs">
                          Private
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCollection(collection)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCollection(collection.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Collection Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{collection.properties.length} properties</span>
                      <span>Created {formatDate(collection.createdAt)}</span>
                    </div>

                    {/* Property Preview */}
                    {collection.properties.length > 0 ? (
                      <div className="space-y-3">
                        {collection.properties.slice(0, 2).map((property) => (
                          <Link
                            key={property.id}
                            href={`/new-building/${property.id}`}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                              <Image
                                src={property.image || "/placeholder.svg"}
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">{property.title}</div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {property.location}
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900">{formatPrice(property.price)}</div>
                          </Link>
                        ))}
                        {collection.properties.length > 2 && (
                          <div className="text-center text-sm text-gray-500 font-light">
                            +{collection.properties.length - 2} more properties
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <Heart className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm font-light">No properties saved yet</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 font-light">
                        <Heart className="h-3 w-3 mr-1" />
                        View All
                      </Button>
                      <Button variant="outline" size="sm" className="font-light">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create/Edit Collection Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-light text-gray-900">
                {editingCollection ? "Edit Collection" : "Create New Collection"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Collection Name *</label>
                <Input
                  value={newCollection.name}
                  onChange={(e) => setNewCollection((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter collection name"
                  className="border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  value={newCollection.description}
                  onChange={(e) => setNewCollection((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your collection"
                  rows={3}
                  className="border-gray-200 focus:border-gray-300 focus:ring-0 resize-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="private"
                  checked={newCollection.isPrivate}
                  onChange={(e) => setNewCollection((prev) => ({ ...prev, isPrivate: e.target.checked }))}
                  className="rounded border-gray-300 text-[#5784FF] focus:ring-[#5784FF]"
                />
                <label htmlFor="private" className="text-sm text-gray-700">
                  Make this collection private
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={editingCollection ? handleUpdateCollection : handleCreateCollection}
                  disabled={!newCollection.name.trim()}
                  className="flex-1 bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                >
                  {editingCollection ? "Update Collection" : "Create Collection"}
                </Button>
                <Button
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingCollection(null)
                    setNewCollection({ name: "", description: "", isPrivate: false })
                  }}
                  variant="outline"
                  className="font-light"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
