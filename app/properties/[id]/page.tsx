"use client"
import { useParams } from "next/navigation"
import PropertyDetails from "@/components/property-details"

export default function PropertyDetailPage() {
  const params = useParams()
  const id = params.id as string

  return <PropertyDetails id={id} />
}
