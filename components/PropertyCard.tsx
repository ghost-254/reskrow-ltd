'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
  image: string
  price: number
  title: string
  description: string
}

export function PropertyCard({ image, price, title, description }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <div className="text-xl font-semibold text-orange-500">
          ${price.toLocaleString()}
        </div>
        <h3 className="text-lg font-bold text-indigo-900 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 flex-1">
          {description}
        </p>
      </div>
    </div>
  )
}

