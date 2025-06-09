"use client"

import { useState } from "react"
import { Plus, Folder, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface Collection {
  id: string
  name: string
  description?: string
  count: number
}

interface CollectionModalProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
  isAuthenticated?: boolean
}

export function CollectionModal({ isOpen, onClose, projectName, isAuthenticated = false }: CollectionModalProps) {
  const router = useRouter()
  const [showCreateNew, setShowCreateNew] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)

  // Mock collections - in real app, this would come from API
  const mockCollections: Collection[] = [
    { id: "1", name: "Favorites", description: "My favorite properties", count: 12 },
    { id: "2", name: "Marbella Properties", description: "Properties in Marbella area", count: 8 },
    { id: "3", name: "Investment Options", description: "Properties for investment", count: 5 },
    { id: "4", name: "Family Homes", description: "Large family properties", count: 15 },
  ]

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      // In real app, this would call API to create collection
      console.log("Creating collection:", {
        name: newCollectionName,
        description: newCollectionDescription,
      })

      // Reset form
      setNewCollectionName("")
      setNewCollectionDescription("")
      setShowCreateNew(false)

      // Show success message
      alert(`Collection "${newCollectionName}" created and property added!`)
      onClose()
    }
  }

  const handleAddToCollection = (collectionId: string) => {
    // In real app, this would call API to add property to collection
    const collection = mockCollections.find((c) => c.id === collectionId)
    console.log("Adding property to collection:", collectionId)

    alert(`Property added to "${collection?.name}" collection!`)
    onClose()
  }

  const handleContinue = () => {
    onClose()
    router.push("/auth")
  }

  if (!isAuthenticated) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-light text-gray-900">Authorize</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <Lock className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="text-gray-600 font-light text-base">To make this action, you need to login your account.</p>
            </div>

            <Button onClick={handleContinue} className="w-full bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-light text-gray-900">Add to Collection</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!showCreateNew ? (
            <>
              {/* Existing Collections */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Choose Collection</label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {mockCollections.map((collection) => (
                    <button
                      key={collection.id}
                      onClick={() => handleAddToCollection(collection.id)}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Folder className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{collection.name}</div>
                            {collection.description && (
                              <div className="text-sm text-gray-500">{collection.description}</div>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">{collection.count} items</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Create New Collection Button */}
              <Button
                onClick={() => setShowCreateNew(true)}
                variant="outline"
                className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 font-light"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Collection
              </Button>
            </>
          ) : (
            /* Create New Collection Form */
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Collection Name *</label>
                <Input
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Enter collection name"
                  className="border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description (optional)</label>
                <Textarea
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  placeholder="Describe your collection"
                  rows={3}
                  className="border-gray-200 focus:border-gray-300 focus:ring-0 resize-none"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleCreateCollection}
                  disabled={!newCollectionName.trim()}
                  className="flex-1 bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                >
                  Create & Add Property
                </Button>
                <Button onClick={() => setShowCreateNew(false)} variant="outline" className="font-light">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
