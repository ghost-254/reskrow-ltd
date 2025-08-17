//components/list-properties/upload-selection.tsx

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Trees } from "lucide-react"
import PropertyUpload from "./property-upload"
import LandUpload from "./land-upload"

export default function UploadSelection() {
  const [selectedType, setSelectedType] = useState<"property" | "land" | null>(null)

  if (selectedType === "property") {
    return <PropertyUpload onBack={() => setSelectedType(null)} />
  }

  if (selectedType === "land") {
    return <LandUpload onBack={() => setSelectedType(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">List Your Property</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the type of property you'd like to list. Our comprehensive forms will help you create a professional
            listing that attracts the right buyers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardContent className="p-0">
              <Button
                onClick={() => setSelectedType("property")}
                className="w-full h-full flex flex-col items-center justify-center p-12 space-y-6 bg-white hover:bg-blue-50 transition-colors duration-300"
                variant="ghost"
              >
                <div className="p-6 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                  <Building size={48} className="text-blue-600" />
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900 block mb-2">Residential Property</span>
                  <span className="text-gray-600">Houses, Apartments, Condos & More</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardContent className="p-0">
              <Button
                onClick={() => setSelectedType("land")}
                className="w-full h-full flex flex-col items-center justify-center p-12 space-y-6 bg-white hover:bg-green-50 transition-colors duration-300"
                variant="ghost"
              >
                <div className="p-6 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors duration-300">
                  <Trees size={48} className="text-green-600" />
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900 block mb-2">Land & Lots</span>
                  <span className="text-gray-600">Residential, Commercial & Agricultural Land</span>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
