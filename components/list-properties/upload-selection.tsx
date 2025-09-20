"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Building2, Factory, Trees } from "lucide-react"
import PropertyUpload from "./property-upload"
import LandUpload from "./land-upload"

export default function UploadSelection() {
  const [selectedType, setSelectedType] = useState<"residential" | "commercial" | "industrial" | "land" | null>(null)

  if (selectedType === "residential") {
    return <PropertyUpload onBack={() => setSelectedType(null)} propertyCategory="residential" />
  }

  if (selectedType === "commercial") {
    return <PropertyUpload onBack={() => setSelectedType(null)} propertyCategory="commercial" />
  }

  if (selectedType === "industrial") {
    return <PropertyUpload onBack={() => setSelectedType(null)} propertyCategory="industrial" />
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

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardContent className="p-0">
              <Button
                onClick={() => setSelectedType("residential")}
                className="w-full h-full flex flex-col items-center justify-center p-8 space-y-4 bg-white hover:bg-blue-50 transition-colors duration-300"
                variant="ghost"
              >
                <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                  <Building size={32} className="text-blue-600" />
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-gray-900 block mb-1">Residential</span>
                  <span className="text-sm text-gray-600">Houses, Apartments, Condos</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardContent className="p-0">
              <Button
                onClick={() => setSelectedType("commercial")}
                className="w-full h-full flex flex-col items-center justify-center p-8 space-y-4 bg-white hover:bg-purple-50 transition-colors duration-300"
                variant="ghost"
              >
                <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                  <Building2 size={32} className="text-purple-600" />
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-gray-900 block mb-1">Commercial</span>
                  <span className="text-sm text-gray-600">Offices, Retail, Hotels</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardContent className="p-0">
              <Button
                onClick={() => setSelectedType("industrial")}
                className="w-full h-full flex flex-col items-center justify-center p-8 space-y-4 bg-white hover:bg-orange-50 transition-colors duration-300"
                variant="ghost"
              >
                <div className="p-4 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                  <Factory size={32} className="text-orange-600" />
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-gray-900 block mb-1">Industrial</span>
                  <span className="text-sm text-gray-600">Factories, Warehouses</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardContent className="p-0">
              <Button
                onClick={() => setSelectedType("land")}
                className="w-full h-full flex flex-col items-center justify-center p-8 space-y-4 bg-white hover:bg-green-50 transition-colors duration-300"
                variant="ghost"
              >
                <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors duration-300">
                  <Trees size={32} className="text-green-600" />
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-gray-900 block mb-1">Raw Land</span>
                  <span className="text-sm text-gray-600">Agricultural, Development</span>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
