"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Copy, Check, Share2 } from "lucide-react"
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaWhatsappSquare, FaFacebookSquare } from "react-icons/fa"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle: string
  propertyUrl: string
  propertyImage?: string
  propertyPrice?: string
  bedrooms?: number
  bathrooms?: number
  squareFeet?: number
  garageSpaces?: number
}

export function ShareModal({
  isOpen,
  onClose,
  propertyTitle,
  propertyUrl,
  propertyImage,
  propertyPrice,
  bedrooms,
  bathrooms,
  squareFeet,
  garageSpaces,
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
      icon: FaFacebookSquare,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Twitter",
      icon: FaSquareXTwitter,
      color: "bg-sky-500 hover:bg-sky-600",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsappSquare,
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
      <DialogContent className="w-[90vw] max-w-md mx-auto p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="pb-6">
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <Share2 className="h-5 w-5 text-blue-600" />
              Share Property
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {propertyImage && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={propertyImage || "/placeholder.svg"}
                        alt={propertyTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight">{propertyTitle}</h4>
                    {propertyPrice && <p className="text-sm text-blue-600 font-semibold">{propertyPrice}</p>}
                    {(bedrooms || bathrooms || squareFeet || garageSpaces) && (
                      <div className="flex flex-wrap gap-3 pt-1">
                        {bedrooms && (
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {bedrooms} BEDS
                          </span>
                        )}
                        {bathrooms && (
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {bathrooms} BATHS
                          </span>
                        )}
                        {squareFeet && (
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {squareFeet} SF
                          </span>
                        )}
                        {garageSpaces && (
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {garageSpaces} GARAGE
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h5 className="text-sm font-semibold text-gray-700 mb-3">Share via</h5>
              <div className="grid grid-cols-2 gap-3">
                {shareOptions.map((option) => (
                  <Button
                    key={option.name}
                    variant="outline"
                    className={`${option.color} text-white border-0 h-12 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105`}
                    onClick={() => handleShare(option.url)}
                  >
                    <option.icon className="h-4 w-4" />
                    <span>{option.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-gray-700">Copy Link</h5>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-600 font-mono break-all leading-relaxed">{fullUrl}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  className={`w-full h-10 font-medium transition-all duration-200 ${
                    copied ? "text-green-600 border-green-600 bg-green-50 hover:bg-green-100" : "hover:bg-gray-50"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied to clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
