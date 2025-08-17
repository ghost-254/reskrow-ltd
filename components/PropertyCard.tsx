import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Ruler, MapPin, Phone, Mail } from "lucide-react"

interface PropertyCardProps {
  id: string
  image: string
  price: number
  title: string
  description: string
  link: string
  bedrooms?: number
  bathrooms?: number
  area?: number
  location?: string
  agentName?: string
  agentPhone?: string
  listingType?: string
}

export function PropertyCard({
  id,
  image,
  price,
  title,
  description,
  link,
  bedrooms,
  bathrooms,
  area,
  location,
  agentName,
  agentPhone,
  listingType,
}: PropertyCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg?height=200&width=300&query=modern property"}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {listingType && <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700">{listingType}</Badge>}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className="text-lg font-bold text-gray-900">${price?.toLocaleString() || "0"}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={link} className="block">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>

        {location && (
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin size={14} className="mr-1" />
            <span className="text-sm">{location}</span>
          </div>
        )}

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        {(bedrooms || bathrooms || area) && (
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            {bedrooms && (
              <div className="flex items-center gap-1">
                <Bed size={14} />
                <span>{bedrooms} bed</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center gap-1">
                <Bath size={14} />
                <span>{bathrooms} bath</span>
              </div>
            )}
            {area && (
              <div className="flex items-center gap-1">
                <Ruler size={14} />
                <span>{area} sq ft</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              <Phone size={14} className="mr-1" />
              Contact
            </Button>
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              <Mail size={14} className="mr-1" />
              Email
            </Button>
          </div>
        </div>

        {agentName && <div className="mt-2 text-xs text-gray-500">Listed by {agentName}</div>}
      </CardContent>
    </Card>
  )
}
