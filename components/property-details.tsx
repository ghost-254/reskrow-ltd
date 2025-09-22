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
  Bed,
  Bath,
  Ruler,
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  Car,
  Zap,
  Droplets,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
})

interface Property {
  id: string
  title: string
  address: string
  price: number
  pricePerSqFt?: number
  bedrooms: number
  bathrooms: number
  halfBathrooms?: number
  garages?: number
  area: number
  lotSize?: number
  yearBuilt: number
  floors?: number
  propertyType: string
  buildingType?: string
  condition?: string
  furnished?: string
  listingType: string
  images: string[]
  features: string[]
  appliances?: string[]
  utilities?: string[]
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
  buildingName?: string
  buildingTotalUnits?: number
  buildingFloors?: number
  buildingFacilities?: string[]
  maintenanceFee?: number
  propertyTax?: number
  insurance?: number
  updated?: string
  views?: number
  saved?: number
  ref?: string
}

export default function PropertyDetails({ id }: { id: string }) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { convertAndFormat } = useCurrency()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [shareModalOpen, setShareModalOpen] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyDoc = await getDoc(doc(db, "properties", id))
        if (propertyDoc.exists()) {
          setProperty({ id: propertyDoc.id, ...propertyDoc.data() } as Property)
        }
      } catch (error) {
        console.error("Error fetching property:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProperty()
    }
  }, [id])

  const handleFavoriteToggle = async () => {
    if (!property) return

    if (isFavorite(property.id)) {
      await removeFromFavorites(property.id)
    } else {
      await addToFavorites(property.id, "property", {
        title: property.title,
        price: property.price,
        image: property.images?.[0] || "",
        address: property.address,
      })
    }
  }

  const nextImage = () => {
    if (property?.images) {
      setSelectedImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property?.images) {
      setSelectedImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
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
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>›</span>
            <Link href="/properties" className="hover:text-blue-600">
              Properties
            </Link>
            <span>›</span>
            <span className="text-gray-900">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-600">{property.listingType}</Badge>
              {property.buildingType && <Badge variant="outline">{property.buildingType}</Badge>}
              {property.condition && <Badge variant="outline">{property.condition}</Badge>}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.address}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms} BEDS</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} BATHS</span>
                </div>
                <div className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  <span>{property.area} SF</span>
                </div>
                {property.garages && (
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4" />
                    <span>{property.garages} GARAGE</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:text-right mt-4 lg:mt-0">
            <div className="text-3xl font-bold text-blue-600 mb-1">{convertAndFormat(property.price)}</div>
            {property.pricePerSqFt && (
              <div className="text-lg text-gray-600 mb-1">{convertAndFormat(property.pricePerSqFt)} per sq ft</div>
            )}
            <div className="text-sm text-gray-500 mb-4">
              {property.ref && (
                <>
                  Ref: {property.ref}
                  <br />
                </>
              )}
              {property.updated && <>Updated: {property.updated}</>}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFavoriteToggle}
                className={isFavorite(property.id) ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFavorite(property.id) ? "fill-current" : ""}`} />
                {isFavorite(property.id) ? "Saved" : "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-teal-600 text-white border-teal-600 hover:bg-teal-700"
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
            {property.images && property.images.length > 0 && (
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="relative h-96 lg:h-[500px]">
                    <Image
                      src={
                        property.images[selectedImageIndex] ||
                        "/placeholder.svg?height=500&width=800&query=property interior" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={`${property.title} - Image ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Navigation Arrows */}
                    {property.images.length > 1 && (
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
                      {selectedImageIndex + 1} / {property.images.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {property.images.length > 1 && (
                    <div className="p-4 bg-white">
                      <div className="flex gap-2 overflow-x-auto">
                        {property.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-colors ${
                              index === selectedImageIndex ? "border-blue-600" : "border-gray-200"
                            }`}
                          >
                            <Image
                              src={image || "/placeholder.svg?height=64&width=80&query=property thumbnail"}
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

            {/* Property Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Property Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type</span>
                      <span className="font-medium">{property.propertyType}</span>
                    </div>
                    {property.buildingType && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floor</span>
                        <span className="font-medium">{property.buildingType}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year Built</span>
                      <span className="font-medium">{property.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Building Age</span>
                      <span className="font-medium">{new Date().getFullYear() - property.yearBuilt} Years</span>
                    </div>
                    {property.garages && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Parking</span>
                        <span className="font-medium">{property.garages} Covered</span>
                      </div>
                    )}
                    {property.furnished && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Furnished</span>
                        <span className="font-medium">{property.furnished}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Area</span>
                      <span className="font-medium">{property.area} sq ft</span>
                    </div>
                    {property.lotSize && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lot Size</span>
                        <span className="font-medium">{property.lotSize} sq ft</span>
                      </div>
                    )}
                    {property.floors && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floors</span>
                        <span className="font-medium">{property.floors}</span>
                      </div>
                    )}
                    {property.condition && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Condition</span>
                        <span className="font-medium">{property.condition}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            {property.features && property.features.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appliances & Utilities */}
            {((property.appliances && property.appliances.length > 0) ||
              (property.utilities && property.utilities.length > 0)) && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Appliances & Utilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {property.appliances && property.appliances.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Appliances</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {property.appliances.map((appliance, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <Zap className="h-4 w-4 text-blue-600" />
                              <span>{appliance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {property.utilities && property.utilities.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Utilities</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {property.utilities.map((utility, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <Droplets className="h-4 w-4 text-teal-600" />
                              <span>{utility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Contact */}
            {property.agentName && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <Image
                        src={property.agentPhoto || "/placeholder.svg?height=60&width=60&query=professional agent"}
                        alt={property.agentName}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{property.agentName}</h3>
                      {property.agentTitle && <p className="text-sm text-gray-600">{property.agentTitle}</p>}
                      {property.agentCompany && <p className="text-sm text-gray-600">{property.agentCompany}</p>}
                      {property.agentRating && property.agentReviews && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {property.agentRating} ({property.agentReviews} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {property.agentEmail && (
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    )}
                    {property.agentPhone && (
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
                          className="w-full bg-teal-600 text-white border-teal-600 hover:bg-teal-700"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {property.agentPhone}
                        </Button>
                      </>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="text-sm text-gray-600">
                    {property.agentLanguages && property.agentLanguages.length > 0 && (
                      <p className="mb-2">Languages: {property.agentLanguages.join(", ")}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs">
                      {property.views && (
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{property.views} views</span>
                        </div>
                      )}
                      {property.saved && (
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{property.saved} saved</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Building Information */}
            {(property.buildingName ||
              property.buildingTotalUnits ||
              property.buildingFloors ||
              property.buildingFacilities) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Building Information</h3>
                  <div className="space-y-3 text-sm">
                    {property.buildingName && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Building Name</span>
                        <span className="font-medium">{property.buildingName}</span>
                      </div>
                    )}
                    {property.buildingTotalUnits && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Units</span>
                        <span className="font-medium">{property.buildingTotalUnits}</span>
                      </div>
                    )}
                    {property.buildingFloors && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floors</span>
                        <span className="font-medium">{property.buildingFloors}</span>
                      </div>
                    )}
                  </div>

                  {property.buildingFacilities && property.buildingFacilities.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Building Facilities</h4>
                        <div className="flex flex-wrap gap-1">
                          {property.buildingFacilities.map((facility, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Financial Information */}
            {(property.maintenanceFee || property.propertyTax || property.insurance) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Monthly Costs</h3>
                  <div className="space-y-3 text-sm">
                    {property.maintenanceFee && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maintenance Fee</span>
                        <span className="font-medium">{convertAndFormat(property.maintenanceFee)}</span>
                      </div>
                    )}
                    {property.propertyTax && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Tax (yearly)</span>
                        <span className="font-medium">{convertAndFormat(property.propertyTax)}</span>
                      </div>
                    )}
                    {property.insurance && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Insurance (yearly)</span>
                        <span className="font-medium">{convertAndFormat(property.insurance)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Map */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <div className="h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 w-full">
                  <LeafletMap
                    center={[property.location.lat, property.location.lng]}
                    zoom={15}
                    markerPosition={[property.location.lat, property.location.lng]}
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
        propertyTitle={property.title}
        propertyUrl={`/properties/${property.id}`}
        propertyImage={property.images?.[0]}
        propertyPrice={convertAndFormat(property.price)}
      />
    </div>
  )
}
