//compoments/list-properties/property-upload.tsx


"use client"
import { Button } from "@/components/ui/button"
import PropertyForm from "./property-form"
import { ArrowLeft } from "lucide-react"

interface PropertyUploadProps {
  onBack: () => void
}

export default function PropertyUpload({ onBack }: PropertyUploadProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <Button onClick={onBack} variant="ghost" className="mb-6 flex items-center hover:bg-white/50 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to selection
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Property</h1>
          <p className="text-gray-600">Fill out the details below to create your property listing</p>
        </div>

        <PropertyForm />
      </div>
    </div>
  )
}
