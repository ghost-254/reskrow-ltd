"use client"
import { useParams } from "next/navigation"
import LandDetails from "@/components/land-details/land-details"

export default function LandDetailPage() {
  const params = useParams()
  const id = params.id as string

  // Additional logic can be added here if needed

  return <LandDetails id={id} />
}
