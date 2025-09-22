"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  Share2,
  Phone,
  Mail,
  Car,
  Calendar,
  Building,
  Home,
  TrendingUp,
  Eye,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"
import { db } from "@/utils/firebase/config"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useCurrency } from "@/hooks/useCurrency"
import { useFavorites } from "@/hooks/useFavorites"
import { ShareModal } from "@/components/ShareModal"

interface Property {
  id: string
  title: string
  description: string
  propertyType: string
  listingType: string
  price: number
  priceType?: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: { lat: number; lng: number }
  bedrooms: number
  bathrooms: number
  area: number
  lotSize?: number
  yearBuilt?: number
  floors?: number
  features: string[]
  amenities: string[]
  appliances: string[]
  utilities: string[]
  buildingName?: string
  buildingAge?: number
  totalFloors?: number
  floorNumber?: number
  parkingSpaces?: number
  parkingType?: string
  nearbyTransport: string[]
  maintenanceFee?: number
  propertyTax?: number
  hoaFees?: number
  images: string[]
  virtualTour?: string
  floorPlan?: string
  agentName: string
  agentPhone: string
  agentEmail: string
  agentPhoto?: string
  createdAt: any
  updatedAt: any
  status: string
  featured?: boolean
}

interface Land {
  id: string
  name: string
  description: string
  price: string
  size: string
  type: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: { lat: number; lng: number }
  availability: string
  zoning?: string
  utilities: string[]
  access: string[]
  features: string[]
  images: string[]
  agentName: string
  agentPhone: string
  agentEmail: string
  agentPhoto?: string
  createdAt: any
  updatedAt: any
  status: string
}

export default function BuyPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [propertyType, setPropertyType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const [properties, setProperties] = useState<Property[]>([])
  const [lands, setLands] = useState<Land[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { convertAndFormat, loading: currencyLoading } = useCurrency()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean
    property?: Property | Land
    type?: "property" | "land"
  }>({ isOpen: false })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const propertiesQuery = query(
          collection(db, "properties"),
          where("listingType", "==", "For Sale"),
          orderBy("createdAt", "desc"),
        )
        const propertiesSnapshot = await getDocs(propertiesQuery)
        const propertiesData = propertiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Property[]

        const landsQuery = query(
          collection(db, "lands"),
          where("availability", "==", "For Sale"), // Fix land query to match the correct availability format
          orderBy("createdAt", "desc"),
        )
        const landsSnapshot = await getDocs(landsQuery)
        const landsData = landsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Land[]

        setProperties(propertiesData)
        setLands(landsData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load properties. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = propertyType === "all" || property.propertyType === propertyType

    const matchesPrice = (() => {
      if (priceRange === "all") return true
      const price = property.price
      switch (priceRange) {
        case "0-1000000":
          return price < 1000000
        case "1000000-5000000":
          return price >= 1000000 && price < 5000000
        case "5000000-10000000":
          return price >= 5000000 && price < 10000000
        case "10000000+":
          return price >= 10000000
        default:
          return true
      }
    })()

    return matchesSearch && matchesType && matchesPrice
  })

  const handleFavoriteToggle = async (property: Property | Land, type: "property" | "land") => {
    const propertyId = property.id

    if (isFavorite(propertyId)) {
      await removeFromFavorites(propertyId)
    } else {
      await addToFavorites(propertyId, type, {
        title: "title" in property ? property.title : property.name,
        price: typeof property.price === "string" ? Number(property.price) : property.price,
        image: property.images?.[0] || "",
        address: property.address || "",
      })
    }
  }

  const handleShare = (property: Property | Land, type: "property" | "land") => {
    setShareModal({ isOpen: true, property, type })
  }

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-card">
      <div className="relative">
        <Image
          src={property.images?.[0] || "/placeholder.svg?height=250&width=400&query=modern property for sale"}
          alt={property.title || "Property"}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-green-600 hover:bg-green-700 text-white">
            <TrendingUp className="h-3 w-3 mr-1" />
            FOR SALE
          </Badge>
          {property.featured && <Badge className="bg-orange-600 hover:bg-orange-700">FEATURED</Badge>}
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className={`h-8 w-8 bg-white/90 hover:bg-white transition-colors ${
              isFavorite(property.id) ? "text-red-500" : "text-gray-600"
            }`}
            onClick={() => handleFavoriteToggle(property, "property")}
          >
            <Heart className={`h-4 w-4 ${isFavorite(property.id) ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white"
            onClick={() => handleShare(property, "property")}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            <Link href={`/properties/${property.id}`}>{property.title || "Untitled Property"}</Link>
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              {currencyLoading ? "Loading..." : convertAndFormat(property.price || 0)}
            </div>
            {property.maintenanceFee && (
              <div className="text-xs text-muted-foreground">
                +{currencyLoading ? "Loading..." : convertAndFormat(property.maintenanceFee)}/mo maintenance
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {property.address || "Address not specified"}, {property.city || "City not specified"}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms || 0} BD</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms || 0} BA</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="h-4 w-4" />
            <span>{property.area || 0} SF</span>
          </div>
          {property.parkingSpaces && (
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              <span>{property.parkingSpaces}</span>
            </div>
          )}
        </div>

        {(property.buildingName || property.yearBuilt) && (
          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
            {property.buildingName && (
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span>{property.buildingName}</span>
              </div>
            )}
            {property.yearBuilt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Built {property.yearBuilt}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-4">
          {property.features?.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {property.amenities?.slice(0, 2).map((amenity, index) => (
            <Badge key={`amenity-${index}`} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
              {property.agentPhoto ? (
                <Image
                  src={property.agentPhoto || "/placeholder.svg"}
                  alt={property.agentName || "Agent"}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-primary">
                  {property.agentName
                    ? property.agentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "AG"}
                </span>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{property.agentName || "Agent"}</div>
              <div className="text-xs text-muted-foreground">
                Updated: {property.updatedAt?.toDate?.()?.toLocaleDateString() || "Recently"}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" className="h-8 px-2 bg-transparent">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" className="h-8 px-2 bg-primary hover:bg-primary/90">
              <Mail className="h-3 w-3 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const LandCard = ({ land }: { land: Land }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-card">
      <div className="relative">
        <Image
          src={land.images?.[0] || "/placeholder.svg?height=250&width=400&query=land for sale"}
          alt={land.name || "Land"}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-white">
            <TrendingUp className="h-3 w-3 mr-1" />
            FOR SALE
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className={`h-8 w-8 bg-white/90 hover:bg-white transition-colors ${
              isFavorite(land.id) ? "text-red-500" : "text-gray-600"
            }`}
            onClick={() => handleFavoriteToggle(land, "land")}
          >
            <Heart className={`h-4 w-4 ${isFavorite(land.id) ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white"
            onClick={() => handleShare(land, "land")}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            <Link href={`/lands/${land.id}`}>{land.name || "Untitled Land"}</Link>
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              {currencyLoading ? "Loading..." : convertAndFormat(Number(land.price || 0))}
            </div>
          </div>
        </div>

        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {land.address || "Address not specified"}, {land.city || "City not specified"}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Ruler className="h-4 w-4" />
            <span>{land.size || "Size not specified"} acres</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span className="font-medium">{land.type || "Type not specified"}</span>
          </div>
          {land.zoning && (
            <div>
              <span className="text-xs bg-secondary px-2 py-1 rounded">{land.zoning}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {land.features?.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {land.utilities?.slice(0, 2).map((utility, index) => (
            <Badge key={`utility-${index}`} variant="outline" className="text-xs">
              {utility}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
              {land.agentPhoto ? (
                <Image
                  src={land.agentPhoto || "/placeholder.svg"}
                  alt={land.agentName || "Agent"}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-primary">
                  {land.agentName
                    ? land.agentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "AG"}
                </span>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{land.agentName || "Agent"}</div>
              <div className="text-xs text-muted-foreground">
                Updated: {land.updatedAt?.toDate?.()?.toLocaleDateString() || "Recently"}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" className="h-8 px-2 bg-transparent">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" className="h-8 px-2 bg-primary hover:bg-primary/90">
              <Mail className="h-3 w-3 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size={48} />
          <p className="mt-4 text-muted-foreground">Loading properties for sale...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="hero-gradient architectural-pattern">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Discover Your
                <span className="block text-white/90">Perfect Investment</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto text-pretty">
                Explore premium properties for sale across residential, commercial, industrial, and land categories.
                Your next investment opportunity awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  <Eye className="h-5 w-5 mr-2" />
                  Browse Properties
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Investment Guide
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-20">
          <Image
            src="/modern-architectural-building-exterior.jpg"
            alt="Modern Architecture"
            width={400}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 justify-center">
              <div className="sm:col-span-2 lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by location, property name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 bg-background"
                  />
                </div>
              </div>
              <div>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-11 bg-background">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="h-11 bg-background">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-1000000">Under KSh1M</SelectItem>
                    <SelectItem value="1000000-5000000">KSh1M - KSh5M</SelectItem>
                    <SelectItem value="5000000-10000000">KSh5M - KSh10M</SelectItem>
                    <SelectItem value="10000000+">Above KSh10M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-11 bg-background">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="area">Area: Largest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Properties for Sale</h2>
              <p className="text-muted-foreground">
                {filteredProperties.length + lands.length} properties available for purchase
              </p>
            </div>
            <TabsList className="grid w-full sm:w-auto grid-cols-3 h-auto">
              <TabsTrigger value="all" className="text-sm py-2 px-4">
                All Properties
              </TabsTrigger>
              <TabsTrigger value="properties" className="text-sm py-2 px-4">
                Residential
              </TabsTrigger>
              <TabsTrigger value="land" className="text-sm py-2 px-4">
                Land & Lots
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-8">
            {/* Properties Section */}
            {filteredProperties.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">Residential Properties</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}

            {/* Land Section */}
            {lands.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">Land & Lots</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lands.map((land) => (
                    <LandCard key={land.id} land={land} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="properties">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="land">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lands.map((land) => (
                <LandCard key={land.id} land={land} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredProperties.length === 0 && lands.length === 0 && (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search criteria or browse all properties</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setPropertyType("all")
                setPriceRange("all")
                setActiveTab("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ isOpen: false })}
        propertyTitle={
          shareModal.property
            ? "title" in shareModal.property
              ? shareModal.property.title
              : shareModal.property.name
            : ""
        }
        propertyUrl={
          shareModal.property
            ? `/${shareModal.type === "property" ? "properties" : "lands"}/${shareModal.property.id}`
            : ""
        }
        propertyImage={shareModal.property?.images?.[0]}
        propertyPrice={
          shareModal.property
            ? currencyLoading
              ? "Loading..."
              : convertAndFormat(
                  typeof shareModal.property.price === "string"
                    ? Number(shareModal.property.price)
                    : shareModal.property.price,
                )
            : ""
        }
      />
    </div>
  )
}
