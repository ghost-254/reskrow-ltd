'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export function useGeocoding() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const geocode = async (address: string): Promise<[number, number] | null> => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&limit=1`
      )

      if (!response.ok) {
        throw new Error(`Geocoding failed with status ${response.status}`)
      }

      const data = await response.json()

      if (data.length === 0) {
        toast({
          title: 'Geocoding failed',
          description: 'Could not find coordinates for the provided address.',
          variant: 'destructive',
        })
        return null
      }

      const latitude = parseFloat(data[0].lat)
      const longitude = parseFloat(data[0].lon)

      return [latitude, longitude]
    } catch (error) {
      console.error('Geocoding error:', error)
      toast({
        title: 'Geocoding failed',
        description: 'There was an error during geocoding. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setLoading(false)
    }
  }

  return { geocode, loading }
}

