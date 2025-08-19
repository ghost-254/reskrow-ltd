"use client"

import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { auth, db } from "@/utils/firebase/config"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShareModal } from "@/components/ShareModal"
import { useCurrency } from "@/hooks/useCurrency"
import { Search, MapPin, Bed, Bath, Square, Edit, Share2, Eye, Calendar } from "lucide-react"
import Link from "next/link"

interface Property {
  id: string
  title: string
  address: string
  price: number
  bedrooms?: number
  bathrooms?: number
  area?: number
  images: string[]
  propertyType: string
  listingType: string
  status: string
  createdAt: any
  agentId: string
}

interface Land {
  id: string
  title: string
  address: string
  price: number
  area: number
  images: string[]
  landType: string
  status: string
  createdAt: any
  agentId: string
}

export default function MyListingsPage() {
  const [user] = useAuthState(auth)
  const [properties, setProperties] = useState<Property[]>([])
  const [lands, setLands] = useState<Land[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [activeTab, setActiveTab] = useState("all")
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean
    property?: Property | Land
  }>({ isOpen: false })

  const { convertAndFormat } = useCurrency()

  useEffect(() => {
    if (!user) return

    const propertiesQuery = query(
      collection(db, "properties"),
      where("agentId", "==", user.uid),
      orderBy("createdAt", "desc"),
    )

    const landsQuery = query(collection(db, "lands"), where("agentId", "==", user.uid), orderBy("createdAt", "desc"))

    const unsubscribeProperties = onSnapshot(propertiesQuery, (snapshot) => {
      const propertiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Property[]
      setProperties(propertiesData)
    })

    const unsubscribeLands = onSnapshot(landsQuery, (snapshot) => {
      const landsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Land[]
      setLands(landsData)
      setLoading(false)
    })

    return () => {
      unsubscribeProperties()
      unsubscribeLands()
    }
  }, [user])

  const allListings = [...properties, ...lands]

  const filteredListings = allListings.filter((listing) => {
    const search = searchTerm.toLowerCase()
    const title = (listing.title || "").toLowerCase()
    const address = (listing.address || "").toLowerCase()
    const matchesSearch = title.includes(search) || address.includes(search)

    if (activeTab === "properties") return matchesSearch && "bedrooms" in listing
    if (activeTab === "lands") return matchesSearch && "landType" in listing
    return matchesSearch
  })

  const sortedListings = filteredListings.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.createdAt?.toDate() - a.createdAt?.toDate()
      case "oldest":
        return a.createdAt?.toDate() - b.createdAt?.toDate()
      case "price-high":
        return b.price - a.price
      case "price-low":
        return a.price - b.price
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600">You need to be signed in to view your listings.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your property and land listings</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by title or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 sm:h-11"
                />
              </div>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full h-10 sm:h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4 sm:mb-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm py-2 sm:py-3">
              All ({allListings.length})
            </TabsTrigger>
            <TabsTrigger value="properties" className="text-xs sm:text-sm py-2 sm:py-3">
              Properties ({properties.length})
            </TabsTrigger>
            <TabsTrigger value="lands" className="text-xs sm:text-sm py-2 sm:py-3">
              Land ({lands.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 sm:mt-6">
            {sortedListings.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Eye className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No listings found</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">
                  {searchTerm ? "Try adjusting your search terms" : "Start by creating your first listing"}
                </p>
                <Link href="/create-property">
                  <Button className="w-full sm:w-auto">Create New Listing</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {sortedListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={listing.images?.[0] || "/placeholder.svg?height=200&width=300"}
                        alt={listing.title}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      <Badge
                        className={`absolute top-2 sm:top-3 left-2 sm:left-3 text-xs ${getStatusColor(listing.status || "active")}`}
                      >
                        {listing.status || "Active"}
                      </Badge>
                    </div>

                    <CardContent className="p-3 sm:p-4">
                      <div className="mb-3">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 line-clamp-1">
                          {listing.title}
                        </h3>
                        <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-2">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                          <span className="line-clamp-1">{listing.address}</span>
                        </div>
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{convertAndFormat(listing.price)}</p>
                      </div>

                      {"bedrooms" in listing ? (
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                          <div className="flex items-center">
                            <Bed className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {listing.bedrooms || 0}
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {listing.bathrooms || 0}
                          </div>
                          <div className="flex items-center">
                            <Square className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {listing.area || 0} sq ft
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                          <Square className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {listing.area || 0} sq ft
                        </div>
                      )}

                      <div className="flex items-center text-xs text-gray-500 mb-3 sm:mb-4">
                        <Calendar className="h-3 w-3 mr-1" />
                        Listed {listing.createdAt?.toDate().toLocaleDateString()}
                      </div>

                      <div className="flex gap-1 sm:gap-2">
                        <Link
                          href={`/${"bedrooms" in listing ? "properties" : "lands"}/${listing.id}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full bg-transparent text-xs sm:text-sm h-8 sm:h-9"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 sm:h-9 px-2 sm:px-3 bg-transparent"
                          onClick={() => setShareModal({ isOpen: true, property: listing })}
                        >
                          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 sm:h-9 px-2 sm:px-3 bg-transparent">
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ isOpen: false })}
        propertyTitle={shareModal.property?.title || ""}
        propertyUrl={
          shareModal.property
            ? `/${"bedrooms" in shareModal.property ? "properties" : "lands"}/${shareModal.property.id}`
            : ""
        }
        propertyImage={shareModal.property?.images?.[0]}
        propertyPrice={shareModal.property ? convertAndFormat(shareModal.property.price) : ""}
      />
    </div>
  )
}
