"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, MapPin, Trash2, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useFavorites } from "@/hooks/useFavorites"
import type { FavoriteProperty } from "@/hooks/useFavorites"
import { useCurrency } from "@/hooks/useCurrency"
import { ShareModal } from "@/components/ShareModal"
import { LoadingSpinner } from "@/components/LoadingSpinner"

export default function SavedPropertiesPage() {
  const { favorites, loading, removeFromFavorites } = useFavorites()
  const { convertAndFormat, loading: currencyLoading } = useCurrency()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [activeTab, setActiveTab] = useState("all")
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean
    property?: FavoriteProperty
  }>({ isOpen: false })

  const filteredFavorites = favorites
    .filter((fav: FavoriteProperty) => {
      const matchesSearch =
        fav.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fav.address.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "properties" && fav.propertyType === "property") ||
        (activeTab === "land" && fav.propertyType === "land")

      return matchesSearch && matchesTab
    })
    .sort((a: FavoriteProperty, b: FavoriteProperty) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "price-high":
          return b.price - a.price
        case "price-low":
          return a.price - b.price
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const handleRemoveFavorite = async (propertyId: string) => {
    if (confirm("Remove this property from your saved list?")) {
      await removeFromFavorites(propertyId)
    }
  }

  const handleShare = (favorite: FavoriteProperty) => {
    setShareModal({ isOpen: true, property: favorite })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size={48} />
          <p className="mt-4 text-gray-600">Loading your saved properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Saved Properties</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {filteredFavorites.length} saved {filteredFavorites.length === 1 ? "property" : "properties"}
              </p>
            </div>
            <Link href="/properties">
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Browse Properties
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search saved properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-auto">
            <TabsTrigger value="all" className="text-xs sm:text-base py-2 sm:py-3">
              All Saved ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="properties" className="text-xs sm:text-base py-2 sm:py-3">
              Properties ({favorites.filter((f: FavoriteProperty) => f.propertyType === "property").length})
            </TabsTrigger>
            <TabsTrigger value="land" className="text-xs sm:text-base py-2 sm:py-3">
              Land ({favorites.filter((f: FavoriteProperty) => f.propertyType === "land").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredFavorites.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? "No matching saved properties" : "No saved properties yet"}
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
                  {searchTerm
                    ? "Try adjusting your search terms to find your saved properties."
                    : "Start browsing properties and save your favorites by clicking the heart icon."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
                  {searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm("")} className="w-full sm:w-auto">
                      Clear Search
                    </Button>
                  )}
                  <Link href="/properties">
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Browse Properties</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredFavorites.map((favorite: FavoriteProperty) => (
                  <Card
                    key={favorite.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
                  >
                    <div className="relative">
                      <Image
                        src={favorite.image || "/placeholder.svg?height=250&width=400&query=property"}
                        alt={favorite.title}
                        width={400}
                        height={250}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        <Badge
                          className={`text-xs ${favorite.propertyType === "property" ? "bg-blue-600" : "bg-green-600"}`}
                        >
                          {favorite.propertyType === "property" ? "PROPERTY" : "LAND"}
                        </Badge>
                      </div>
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1 sm:gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-7 w-7 sm:h-8 sm:w-8 bg-white/90 hover:bg-white text-red-500"
                          onClick={() => handleRemoveFavorite(favorite.propertyId)}
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-7 w-7 sm:h-8 sm:w-8 bg-white/90 hover:bg-white"
                          onClick={() => handleShare(favorite)}
                        >
                          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Saved {new Date(favorite.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <CardContent className="p-3 sm:p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                          <Link
                            href={`/${favorite.propertyType === "property" ? "properties" : "lands"}/${favorite.propertyId}`}
                          >
                            {favorite.title}
                          </Link>
                        </h3>
                        <div className="text-right">
                          <div className="text-lg sm:text-xl font-bold text-blue-600">
                            {currencyLoading ? "Loading..." : convertAndFormat(favorite.price)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="text-xs sm:text-sm">{favorite.address}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex gap-1 sm:gap-2">
                          <Link
                            href={`/${favorite.propertyType === "property" ? "properties" : "lands"}/${favorite.propertyId}`}
                          >
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm h-8 sm:h-9">
                              View Details
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleShare(favorite)}
                            className="text-xs sm:text-sm h-8 sm:h-9"
                          >
                            Share
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm h-8 sm:h-9"
                          onClick={() => handleRemoveFavorite(favorite.propertyId)}
                        >
                          Remove
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
            ? `/${shareModal.property.propertyType === "property" ? "properties" : "lands"}/${shareModal.property.propertyId}`
            : ""
        }
        propertyImage={shareModal.property?.image}
        propertyPrice={
          shareModal.property ? (currencyLoading ? "Loading..." : convertAndFormat(shareModal.property.price)) : ""
        }
      />
    </div>
  )
}
