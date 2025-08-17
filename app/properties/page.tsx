//app/properties/page.tsx

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/utils/firebase/config"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useCurrency } from "@/hooks/useCurrency"

interface Property {
  id: string
  // Basic Information
  title: string
  description: string
  propertyType: string
  listingType: string
  price: number
  priceType?: string

  // Location
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: { lat: number; lng: number }

  // Property Details
  bedrooms: number
  bathrooms: number
  area: number
  lotSize?: number
  yearBuilt?: number
  floors?: number

  // Features & Amenities
  features: string[]
  amenities: string[]
  appliances: string[]
  utilities: string[]

  // Building Information
  buildingName?: string
  buildingAge?: number
  totalFloors?: number
  floorNumber?: number

  // Parking & Transportation
  parkingSpaces?: number
  parkingType?: string
  nearbyTransport: string[]

  // Financial
  maintenanceFee?: number
  propertyTax?: number
  hoaFees?: number

  // Media & Agent
  images: string[]
  virtualTour?: string
  floorPlan?: string
  agentName: string
  agentPhone: string
  agentEmail: string
  agentPhoto?: string

  // Metadata
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

export default function PropertiesPage() {
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch properties
        const propertiesQuery = query(collection(db, "properties"), orderBy("createdAt", "desc"))
        const propertiesSnapshot = await getDocs(propertiesQuery)
        const propertiesData = propertiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Property[]

        // Fetch lands
        const landsQuery = query(collection(db, "lands"), orderBy("createdAt", "desc"))
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

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "sale" && property.listingType === "For Sale") ||
      (activeTab === "rent" && property.listingType === "For Rent") ||
      (activeTab === "lease" && property.listingType === "For Lease")

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

    return matchesSearch && matchesType && matchesTab && matchesPrice
  })

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src={property.images?.[0] || "/placeholder.svg?height=250&width=400&query=modern property"}
          alt={property.title || "Property"}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-blue-600 hover:bg-blue-700">
            {property.listingType === "For Sale" ? "SALE" : property.listingType === "For Rent" ? "RENT" : "LEASE"}
          </Badge>
          {property.featured && <Badge className="bg-orange-600 hover:bg-orange-700">FEATURED</Badge>}
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            <Link href={`/properties/${property.id}`}>{property.title || "Untitled Property"}</Link>
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">
              {currencyLoading ? "Loading..." : convertAndFormat(property.price || 0)}
            </div>
            {property.priceType === "monthly" && <div className="text-sm text-gray-500">per month</div>}
            {property.maintenanceFee && (
              <div className="text-xs text-gray-500">
                +{currencyLoading ? "Loading..." : convertAndFormat(property.maintenanceFee)}/mo maintenance
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {property.address || "Address not specified"}, {property.city || "City not specified"}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
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
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
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

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
              {property.agentPhoto ? (
                <Image
                  src={property.agentPhoto || "/placeholder.svg"}
                  alt={property.agentName || "Agent"}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-blue-600">
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
              <div className="text-sm font-medium text-gray-900">{property.agentName || "Agent"}</div>
              <div className="text-xs text-gray-500">
                Updated: {property.updatedAt?.toDate?.()?.toLocaleDateString() || "Recently"}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" className="h-8 px-2 bg-transparent">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" className="h-8 px-2">
              <Mail className="h-3 w-3 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const LandCard = ({ land }: { land: Land }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src={land.images?.[0] || "/placeholder.svg?height=250&width=400&query=land plot"}
          alt={land.name || "Land"}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-green-600 hover:bg-green-700">{(land.availability || "Available").toUpperCase()}</Badge>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
            <Link href={`/lands/${land.id}`}>{land.name || "Untitled Land"}</Link>
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              {currencyLoading ? "Loading..." : convertAndFormat(Number(land.price || 0))}
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {land.address || "Address not specified"}, {land.city || "City not specified"}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
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
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{land.zoning}</span>
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

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
              {land.agentPhoto ? (
                <Image
                  src={land.agentPhoto || "/placeholder.svg"}
                  alt={land.agentName || "Agent"}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-green-600">
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
              <div className="text-sm font-medium text-gray-900">{land.agentName || "Agent"}</div>
              <div className="text-xs text-gray-500">
                Updated: {land.updatedAt?.toDate?.()?.toLocaleDateString() || "Recently"}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" className="h-8 px-2 bg-transparent">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" className="h-8 px-2">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size={48} />
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
              <p className="text-gray-600 mt-1">{filteredProperties.length + lands.length} properties available</p>
            </div>
            <Link href="/create-property">
              <Button className="bg-blue-600 hover:bg-blue-700">List Your Property</Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by location, property name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-1000000">Under $1M</SelectItem>
                  <SelectItem value="1000000-5000000">$1M - $5M</SelectItem>
                  <SelectItem value="5000000-10000000">$5M - $10M</SelectItem>
                  <SelectItem value="10000000+">Above $10M</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
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

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all" className="text-base">
              All Properties
            </TabsTrigger>
            <TabsTrigger value="sale" className="text-base">
              For Sale
            </TabsTrigger>
            <TabsTrigger value="rent" className="text-base">
              For Rent
            </TabsTrigger>
            <TabsTrigger value="land" className="text-base">
              Land
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Properties Section */}
            {filteredProperties.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Residential Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}

            {/* Land Section */}
            {lands.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Land & Lots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lands.map((land) => (
                    <LandCard key={land.id} land={land} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sale">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties
                .filter((p) => p.listingType === "For Sale")
                .map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="rent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties
                .filter((p) => p.listingType === "For Rent")
                .map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="land">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lands.map((land) => (
                <LandCard key={land.id} land={land} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredProperties.length === 0 && lands.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all properties</p>
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
    </div>
  )
}
