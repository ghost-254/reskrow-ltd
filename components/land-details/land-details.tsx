"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/utils/firebase/config"
import { useCurrency } from "@/hooks/useCurrency"
import { useFavorites } from "@/hooks/useFavorites"
import { ShareModal } from "@/components/ShareModal"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Share2,
  Phone,
  Mail,
  MapPin,
  Ruler,
  Building,
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
})

interface Land {
  id: string
  name: string
  address: string
  price: number
  pricePerSqFt?: number
  size: string
  type: string
  availability: string
  zoning?: string
  images: string[]
  features: string[]
  description: string
  location: {
    lat: number
    lng: number
  }
  agentName?: string
  agentPhone?: string
  agentEmail?: string
  agentPhoto?: string
  agentTitle?: string
  agentCompany?: string
  agentRating?: number
  agentReviews?: number
  agentLanguages?: string[]
  zoningDetails?: {
    current?: string
    permitted?: string[]
    restrictions?: string[]
    buildingCoverage?: string
    floorAreaRatio?: string
  }
  utilities?: {
    [key: string]: string
  }
  updated?: string
  views?: number
  saved?: number
  ref?: string
}

export default function LandDetails({ id }: { id: string }) {
  const [land, setLand] = useState<Land | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { convertAndFormat } = useCurrency()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [shareModalOpen, setShareModalOpen] = useState(false)

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const landDoc = await getDoc(doc(db, "lands", id))
        if (landDoc.exists()) {
          setLand({ id: landDoc.id, ...landDoc.data() } as Land)
        }
      } catch (error) {
        console.error("Error fetching land:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchLand()
    }
  }, [id])

  const handleFavoriteToggle = async () => {
    if (!land) return

    if (isFavorite(land.id)) {
      await removeFromFavorites(land.id)
    } else {
      await addToFavorites(land.id, "land", {
        title: land.name,
        price: typeof land.price === "string" ? Number(land.price) : land.price,
        image: land.images?.[0] || "",
        address: land.address,
      })
    }
  }

  const nextImage = () => {
    if (land?.images) {
      setSelectedImageIndex((prev) => (prev + 1) % land.images.length)
    }
  }

  const prevImage = () => {
    if (land?.images) {
      setSelectedImageIndex((prev) => (prev - 1 + land.images.length) % land.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!land) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Land Not Found</h2>
          <p className="text-gray-600">The land listing you're looking for doesn't exist.</p>
          <Link href="/properties">
            <Button className="mt-4">Back to Properties</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <span>›</span>
            <Link href="/properties" className="hover:text-green-600">
              Land for Sale
            </Link>
            <span>›</span>
            <Link href={`/properties?type=${land.type.toLowerCase()}`} className="hover:text-green-600">
              {land.type}
            </Link>
            <span>›</span>
            <span className="text-gray-900">{land.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-green-600">For {land.availability}</Badge>
              <Badge variant="outline">{land.type}</Badge>
              {land.zoning && <Badge variant="outline">{land.zoning}</Badge>}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{land.name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{land.address}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  <span>{land.size} acres</span>
                </div>
                {land.zoningDetails?.current && (
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{land.zoningDetails.current}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:text-right mt-4 lg:mt-0">
            <div className="text-3xl font-bold text-green-600 mb-1">{convertAndFormat(land.price)}</div>
            {land.pricePerSqFt && (
              <div className="text-lg text-gray-600 mb-1">{convertAndFormat(land.pricePerSqFt)} per sq ft</div>
            )}
            <div className="text-sm text-gray-500 mb-4">
              {land.ref && (
                <>
                  Ref: {land.ref}
                  <br />
                </>
              )}
              {land.updated && <>Updated: {land.updated}</>}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFavoriteToggle}
                className={isFavorite(land.id) ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFavorite(land.id) ? "fill-current" : ""}`} />
                {isFavorite(land.id) ? "Saved" : "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-green-600 text-white border-green-600 hover:bg-green-700"
                onClick={() => setShareModalOpen(true)}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            {land.images && land.images.length > 0 && (
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="relative h-96 lg:h-[500px]">
                    <Image
                      src={
                        land.images[selectedImageIndex] ||
                        "/placeholder.svg?height=500&width=800&query=commercial land plot" ||
                        "/placeholder.svg"
                      }
                      alt={`${land.name} - Image ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Navigation Arrows */}
                    {land.images.length > 1 && (
                      <>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImageIndex + 1} / {land.images.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {land.images.length > 1 && (
                    <div className="p-4 bg-white">
                      <div className="flex gap-2 overflow-x-auto">
                        {land.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-colors ${
                              index === selectedImageIndex ? "border-green-600" : "border-gray-200"
                            }`}
                          >
                            <Image
                              src={image || "/placeholder.svg?height=64&width=80&query=land thumbnail"}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Land Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Land Description</h2>
                <p className="text-gray-700 leading-relaxed">{land.description}</p>
              </CardContent>
            </Card>

            {/* Zoning & Development */}
            {land.zoningDetails && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Zoning & Development Potential</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {land.zoningDetails.current && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Zoning</span>
                          <span className="font-medium">{land.zoningDetails.current}</span>
                        </div>
                      )}
                      {land.zoningDetails.buildingCoverage && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Building Coverage</span>
                          <span className="font-medium">{land.zoningDetails.buildingCoverage}</span>
                        </div>
                      )}
                      {land.zoningDetails.floorAreaRatio && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Floor Area Ratio</span>
                          <span className="font-medium">{land.zoningDetails.floorAreaRatio}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {land.zoningDetails.permitted && land.zoningDetails.permitted.length > 0 && (
                        <div>
                          <span className="text-gray-600 block mb-2">Permitted Uses</span>
                          <div className="flex flex-wrap gap-1">
                            {land.zoningDetails.permitted.map((use, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {use}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {land.zoningDetails.restrictions && land.zoningDetails.restrictions.length > 0 && (
                        <div>
                          <span className="text-gray-600 block mb-2">Restrictions</span>
                          <div className="space-y-1">
                            {land.zoningDetails.restrictions.map((restriction, index) => (
                              <div key={index} className="text-sm text-gray-700">
                                • {restriction}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Features & Utilities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Features & Utilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {land.features && land.features.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Land Features</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {land.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {land.utilities && Object.keys(land.utilities).length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Utilities Available</h3>
                      <div className="space-y-2">
                        {Object.entries(land.utilities).map(([utility, status]) => (
                          <div key={utility} className="flex justify-between text-sm">
                            <span className="text-gray-600 capitalize">{utility}</span>
                            <span className="font-medium text-green-600">{status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Contact */}
            {land.agentName && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <Image
                        src={land.agentPhoto || "/placeholder.svg?height=60&width=60&query=professional agent"}
                        alt={land.agentName}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{land.agentName}</h3>
                      {land.agentTitle && <p className="text-sm text-gray-600">{land.agentTitle}</p>}
                      {land.agentCompany && <p className="text-sm text-gray-600">{land.agentCompany}</p>}
                      {land.agentRating && land.agentReviews && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {land.agentRating} ({land.agentReviews} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {land.agentEmail && (
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    )}
                    {land.agentPhone && (
                      <>
                        <Button
                          variant="outline"
                          className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full bg-green-600 text-white border-green-600 hover:bg-green-700"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {land.agentPhone}
                        </Button>
                      </>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="text-sm text-gray-600">
                    {land.agentLanguages && land.agentLanguages.length > 0 && (
                      <p className="mb-2">Languages: {land.agentLanguages.join(", ")}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs">
                      {land.views && (
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{land.views} views</span>
                        </div>
                      )}
                      {land.saved && (
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{land.saved} saved</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Land Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Land Specifications</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Area</span>
                    <span className="font-medium">{land.size} acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Land Type</span>
                    <span className="font-medium">{land.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability</span>
                    <span className="font-medium">For {land.availability}</span>
                  </div>
                  {land.pricePerSqFt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per sq ft</span>
                      <span className="font-medium">{convertAndFormat(land.pricePerSqFt)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <div className="h-48">
                  <LeafletMap
                    center={[land.location.lat, land.location.lng]}
                    zoom={15}
                    markerPosition={[land.location.lat, land.location.lng]}
                    showSearch={false}
                    addressInput={null}
                  />
                </div>
                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        propertyTitle={land.name}
        propertyUrl={`/lands/${land.id}`}
        propertyImage={land.images?.[0]}
        propertyPrice={convertAndFormat(land.price)}
      />
    </div>
  )
}
