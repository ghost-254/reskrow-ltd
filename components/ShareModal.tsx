"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Facebook, Twitter, MessageCircle, Mail, Copy, Check, Share2 } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle: string
  propertyUrl: string
  propertyImage?: string
  propertyPrice?: string
}

export function ShareModal({
  isOpen,
  onClose,
  propertyTitle,
  propertyUrl,
  propertyImage,
  propertyPrice,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `Check out this amazing property: ${propertyTitle}${propertyPrice ? ` - ${propertyPrice}` : ""}`
  const fullUrl = `${window.location.origin}${propertyUrl}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
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
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${fullUrl}`)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent(propertyTitle)}&body=${encodeURIComponent(`${shareText}\n\n${fullUrl}`)}`,
    },
  ]

  const handleShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-lg mx-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Share2 className="h-5 w-5" />
            Share Property
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Preview */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {propertyImage && (
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={propertyImage || "/placeholder.svg"}
                      alt={propertyTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 truncate leading-tight">{propertyTitle}</h4>
                  {propertyPrice && <p className="text-sm text-blue-600 font-semibold mt-1">{propertyPrice}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                variant="outline"
                className={`${option.color} text-white border-0 h-16 sm:h-14 flex flex-col items-center justify-center gap-1.5 text-xs font-medium transition-all duration-200`}
                onClick={() => handleShare(option.url)}
              >
                <option.icon className="h-5 w-5 sm:h-4 sm:w-4" />
                <span className="leading-none">{option.name}</span>
              </Button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Copy Link</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 px-3 py-2.5 bg-gray-50 border rounded-lg text-sm text-gray-600 break-all sm:truncate">
                {fullUrl}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className={`${copied ? "text-green-600 border-green-600 bg-green-50" : ""} h-10 px-4 font-medium transition-all duration-200`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
