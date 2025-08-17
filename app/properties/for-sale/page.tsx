"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function ForRentPage() {
  useEffect(() => {
    redirect("/properties?tab=rent")
  }, [])

  return null
}
