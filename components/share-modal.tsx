"use client"

import { useState } from "react"
import { Copy, Facebook, Twitter, Mail, MessageCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
  projectUrl: string
}

export function ShareModal({ isOpen, onClose, projectName, projectUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(projectUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}`,
          "_blank",
          "width=600,height=400",
        )
      },
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(
            `Check out this amazing property: ${projectName}`,
          )}`,
          "_blank",
          "width=600,height=400",
        )
      },
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`Check out this property: ${projectName} ${projectUrl}`)}`,
          "_blank",
        )
      },
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(`Check out: ${projectName}`)}&body=${encodeURIComponent(
            `I found this amazing property and thought you might be interested:\n\n${projectName}\n${projectUrl}`,
          )}`,
        )
      },
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-light text-gray-900">Share Property</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Copy Link</label>
            <div className="flex space-x-2">
              <Input value={projectUrl} readOnly className="flex-1 text-sm bg-gray-50 border-gray-200" />
              <Button onClick={handleCopyLink} variant="outline" className="px-3">
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && <p className="text-sm text-green-600">Link copied to clipboard!</p>}
          </div>

          {/* Social Share */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Share on Social Media</label>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={option.action}
                  className={`${option.color} text-white font-light text-sm h-12 flex items-center justify-center space-x-2`}
                >
                  <option.icon className="h-4 w-4" />
                  <span>{option.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
