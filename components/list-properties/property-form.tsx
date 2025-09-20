//components/list-properties/property-form

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
  Camera,
  FileText,
  DollarSign,
  Bed,
  Bath,
  Car,
  Ruler,
  Calendar,
  Shield,
} from "lucide-react"
import { db, storage } from "@/utils/firebase/config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useFirebase } from "@/app/firebase-provider"
import { useRouter } from "next/navigation"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import dynamic from "next/dynamic"
import type { LeafletMapProps } from "@/components/LeafletMap"

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
}) as React.FC<LeafletMapProps>

interface FormData {
  // Basic Information
  title: string
  description: string
  propertyType: string
  propertySubtype: string
  listingType: string
  price: number | null
  priceType: string // monthly, yearly, total

  // Property Details
  bedrooms: number | null
  bathrooms: number | null
  halfBathrooms: number | null
  garages: number | null
  parkingSpaces: number | null
  area: number | null
  lotSize: number | null
  yearBuilt: number | null
  floors: number | null

  // Location
  address: string
  city: string
  state: string
  zipCode: string
  neighborhood: string
  location: {
    lat: number | null
    lng: number | null
  }

  // Features & Amenities
  features: string[]
  appliances: string[]
  utilities: string[]

  // Building Details
  buildingType: string
  condition: string
  furnished: string
  petPolicy: string

  // Financial Details
  hoa: number | null
  taxes: number | null
  insurance: number | null

  // Media
  images: File[]
  video: File | null

  // Agent Information
  agentName: string
  agentPhone: string
  agentEmail: string
}

const initialFormData: FormData = {
  title: "",
  description: "",
  propertyType: "",
  propertySubtype: "",
  listingType: "",
  price: null,
  priceType: "total",
  bedrooms: null,
  bathrooms: null,
  halfBathrooms: null,
  garages: null,
  parkingSpaces: null,
  area: null,
  lotSize: null,
  yearBuilt: null,
  floors: null,
  address: "",
  city: "",
  state: "",
  zipCode: "",
  neighborhood: "",
  location: { lat: null, lng: null },
  features: [],
  appliances: [],
  utilities: [],
  buildingType: "",
  condition: "",
  furnished: "",
  petPolicy: "",
  hoa: null,
  taxes: null,
  insurance: null,
  images: [],
  video: null,
  agentName: "",
  agentPhone: "",
  agentEmail: "",
}

const propertyTypes = {
  residential: ["House", "Apartment", "Condo", "Townhouse", "Villa", "Studio", "Loft", "Duplex"],
  commercial: ["Office", "Retail", "Warehouse", "Restaurant", "Hotel", "Mixed Use"],
  industrial: ["Factory", "Manufacturing", "Storage", "Distribution Center"],
}

const listingTypes = ["For Sale", "For Rent", "For Lease"]
const priceTypes = ["total", "monthly", "yearly"]
const buildingTypes = ["New Construction", "Resale", "Pre-Construction"]
const conditions = ["Excellent", "Good", "Fair", "Needs Work"]
const furnishedOptions = ["Furnished", "Semi-Furnished", "Unfurnished"]
const petPolicies = ["Pets Allowed", "No Pets", "Cats Only", "Dogs Only", "Case by Case"]

const availableFeatures = [
  "Swimming Pool",
  "Gym/Fitness Center",
  "Balcony",
  "Terrace",
  "Garden",
  "Fireplace",
  "Walk-in Closet",
  "Hardwood Floors",
  "Marble Floors",
  "High Ceilings",
  "Bay Windows",
  "Skylight",
  "Basement",
  "Attic",
  "Laundry Room",
  "Storage Room",
  "Maid's Room",
  "Study Room",
  "Home Office",
  "Wine Cellar",
  "Jacuzzi",
  "Sauna",
  "Elevator",
  "Security System",
  "Gated Community",
  "Concierge",
  "Doorman",
  "Valet Parking",
]

const availableAppliances = [
  "Refrigerator",
  "Dishwasher",
  "Washing Machine",
  "Dryer",
  "Microwave",
  "Oven",
  "Stove",
  "Garbage Disposal",
  "Wine Cooler",
  "Ice Maker",
  "Water Heater",
]

const availableUtilities = [
  "Electricity",
  "Water",
  "Gas",
  "Internet",
  "Cable TV",
  "Trash Collection",
  "Sewer",
  "Security",
  "Maintenance",
]

const steps = [
  { id: 0, title: "Basic Info", icon: Home },
  { id: 1, title: "Property Details", icon: Ruler },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Features", icon: Shield },
  { id: 4, title: "Media", icon: Camera },
  { id: 5, title: "Agent Info", icon: FileText },
]

interface PropertyFormProps {
  propertyCategory: string
}

export default function PropertyForm({ propertyCategory }: PropertyFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(0)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null)
  const { toast } = useToast()
  const { user, loading } = useFirebase()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: keyof FormData, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter((item) => item !== value),
    }))
  }

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files)
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))

    const newPreviews = newImages.map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(formData.title && formData.propertyType && formData.listingType && formData.price)
      case 1:
        return !!(formData.bedrooms !== null && formData.bathrooms !== null && formData.area)
      case 2:
        return !!(formData.address && formData.city && formData.state)
      case 3:
        return true // Features are optional
      case 4:
        return formData.images.length > 0
      case 5:
        return !!(formData.agentName && formData.agentPhone && formData.agentEmail)
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const uploadedImages = await Promise.all(
        formData.images.map(async (image) => {
          const storageRef = ref(storage, `propertyImages/${new Date().getTime()}-${image.name}`)
          await uploadBytes(storageRef, image)
          return await getDownloadURL(storageRef)
        }),
      )

      const collectionRef = collection(db, "properties")
      const propertyData = {
        ...formData,
        images: uploadedImages,
        createdAt: serverTimestamp(),
        agentId: user?.uid,
      }

      await addDoc(collectionRef, propertyData)

      toast({
        title: "Property Listed Successfully!",
        description: "Your property has been added to our listings.",
      })

      setFormData(initialFormData)
      setImagePreviews([])
      setCurrentStep(0)
      router.push("/properties")
    } catch (error) {
      console.error("Error listing property:", error)
      toast({
        title: "Error",
        description: "Failed to list property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const StepIcon = steps[currentStep].icon

  const handleMapClick = (coordinates: [number, number]) => {
    setMarkerPosition(coordinates)
    setFormData((prev) => ({
      ...prev,
      location: {
        lat: coordinates[0],
        lng: coordinates[1],
      },
    }))
  }

  const handleAddressChange = (newAddress: string) => {
    setFormData((prev) => ({
      ...prev,
      address: newAddress,
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    index <= currentStep ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  <Icon size={20} />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-0.5 mx-4 transition-colors ${
                      index < currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep].title}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <StepIcon size={24} />
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-base font-medium">
                    Property Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Beautiful 3BR Apartment with Ocean View"
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium">Property Type *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleInputChange("propertyType", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(propertyTypes).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Property Subtype *</Label>
                    <Select
                      value={formData.propertySubtype}
                      onValueChange={(value) => handleInputChange("propertySubtype", value)}
                      disabled={!formData.propertyType}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select subtype" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.propertyType &&
                          propertyTypes[formData.propertyType as keyof typeof propertyTypes]?.map((subtype) => (
                            <SelectItem key={subtype} value={subtype}>
                              {subtype}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-base font-medium">Listing Type *</Label>
                    <Select
                      value={formData.listingType}
                      onValueChange={(value) => handleInputChange("listingType", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select listing type" />
                      </SelectTrigger>
                      <SelectContent>
                        {listingTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Price *</Label>
                    <Input
                      type="number"
                      value={formData.price || ""}
                      onChange={(e) => handleInputChange("price", e.target.value ? Number(e.target.value) : null)}
                      placeholder="Enter price"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">Price Type</Label>
                    <Select value={formData.priceType} onValueChange={(value) => handleInputChange("priceType", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="total">Total Price</SelectItem>
                        <SelectItem value="monthly">Per Month</SelectItem>
                        <SelectItem value="yearly">Per Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your property in detail..."
                    rows={4}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Bed size={16} />
                      Bedrooms *
                    </Label>
                    <Input
                      type="number"
                      value={formData.bedrooms || ""}
                      onChange={(e) => handleInputChange("bedrooms", e.target.value ? Number(e.target.value) : null)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Bath size={16} />
                      Bathrooms *
                    </Label>
                    <Input
                      type="number"
                      value={formData.bathrooms || ""}
                      onChange={(e) => handleInputChange("bathrooms", e.target.value ? Number(e.target.value) : null)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Half Baths</Label>
                    <Input
                      type="number"
                      value={formData.halfBathrooms || ""}
                      onChange={(e) =>
                        handleInputChange("halfBathrooms", e.target.value ? Number(e.target.value) : null)
                      }
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Car size={16} />
                      Garages
                    </Label>
                    <Input
                      type="number"
                      value={formData.garages || ""}
                      onChange={(e) => handleInputChange("garages", e.target.value ? Number(e.target.value) : null)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Ruler size={16} />
                      Area (sq ft) *
                    </Label>
                    <Input
                      type="number"
                      value={formData.area || ""}
                      onChange={(e) => handleInputChange("area", e.target.value ? Number(e.target.value) : null)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Lot Size (sq ft)</Label>
                    <Input
                      type="number"
                      value={formData.lotSize || ""}
                      onChange={(e) => handleInputChange("lotSize", e.target.value ? Number(e.target.value) : null)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Calendar size={16} />
                      Year Built
                    </Label>
                    <Input
                      type="number"
                      value={formData.yearBuilt || ""}
                      onChange={(e) => handleInputChange("yearBuilt", e.target.value ? Number(e.target.value) : null)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-base font-medium">Building Type</Label>
                    <Select
                      value={formData.buildingType}
                      onValueChange={(value) => handleInputChange("buildingType", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {buildingTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-base font-medium">Condition</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-base font-medium">Furnished</Label>
                    <Select value={formData.furnished} onValueChange={(value) => handleInputChange("furnished", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {furnishedOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Street Address *</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter street address"
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-base font-medium">City *</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter city"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">State *</Label>
                    <Input
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="Enter state"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">ZIP Code</Label>
                    <Input
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="Enter ZIP code"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Neighborhood</Label>
                  <Input
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                    placeholder="Enter neighborhood name"
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location on Map</Label>
                  <LeafletMap
                    center={markerPosition || [-1.286389, 36.817223]}
                    zoom={13}
                    onMapClick={handleMapClick}
                    markerPosition={markerPosition}
                    onAddressChange={handleAddressChange}
                    showSearch={true}
                    addressInput={null}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2">
                      <DollarSign size={16} />
                      HOA Fee (monthly)
                    </Label>
                    <Input
                      type="number"
                      value={formData.hoa || ""}
                      onChange={(e) => handleInputChange("hoa", e.target.value ? Number(e.target.value) : null)}
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Property Taxes (yearly)</Label>
                    <Input
                      type="number"
                      value={formData.taxes || ""}
                      onChange={(e) => handleInputChange("taxes", e.target.value ? Number(e.target.value) : null)}
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Insurance (yearly)</Label>
                    <Input
                      type="number"
                      value={formData.insurance || ""}
                      onChange={(e) => handleInputChange("insurance", e.target.value ? Number(e.target.value) : null)}
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <Label className="text-base font-medium mb-4 block">Property Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={(checked) => handleArrayChange("features", feature, checked as boolean)}
                        />
                        <Label htmlFor={feature} className="text-sm font-normal cursor-pointer">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">Appliances Included</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableAppliances.map((appliance) => (
                      <div key={appliance} className="flex items-center space-x-2">
                        <Checkbox
                          id={appliance}
                          checked={formData.appliances.includes(appliance)}
                          onCheckedChange={(checked) => handleArrayChange("appliances", appliance, checked as boolean)}
                        />
                        <Label htmlFor={appliance} className="text-sm font-normal cursor-pointer">
                          {appliance}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">Utilities Included</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableUtilities.map((utility) => (
                      <div key={utility} className="flex items-center space-x-2">
                        <Checkbox
                          id={utility}
                          checked={formData.utilities.includes(utility)}
                          onCheckedChange={(checked) => handleArrayChange("utilities", utility, checked as boolean)}
                        />
                        <Label htmlFor={utility} className="text-sm font-normal cursor-pointer">
                          {utility}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Pet Policy</Label>
                  <Select value={formData.petPolicy} onValueChange={(value) => handleInputChange("petPolicy", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select pet policy" />
                    </SelectTrigger>
                    <SelectContent>
                      {petPolicies.map((policy) => (
                        <SelectItem key={policy} value={policy}>
                          {policy}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Property Images *</Label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Upload Property Images</p>
                    <p className="text-sm text-gray-500">Click to browse or drag and drop images here</p>
                    <p className="text-xs text-gray-400 mt-2">Recommended: At least 5 high-quality images</p>
                  </div>
                </div>

                {imagePreviews.length > 0 && (
                  <div>
                    <Label className="text-base font-medium mb-4 block">Uploaded Images ({imagePreviews.length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={preview || "/placeholder.svg"}
                            alt={`Property image ${index + 1}`}
                            width={200}
                            height={150}
                            className="object-cover rounded-lg w-full h-32"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {index === 0 && <Badge className="absolute bottom-2 left-2 bg-blue-600">Main Photo</Badge>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Agent Contact Information</h3>
                  <p className="text-gray-600">This information will be displayed to potential buyers/renters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium">Agent Name *</Label>
                    <Input
                      value={formData.agentName}
                      onChange={(e) => handleInputChange("agentName", e.target.value)}
                      placeholder="Enter agent name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Phone Number *</Label>
                    <Input
                      value={formData.agentPhone}
                      onChange={(e) => handleInputChange("agentPhone", e.target.value)}
                      placeholder="Enter phone number"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Email Address *</Label>
                  <Input
                    type="email"
                    value={formData.agentEmail}
                    onChange={(e) => handleInputChange("agentEmail", e.target.value)}
                    placeholder="Enter email address"
                    className="mt-2"
                  />
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Listing Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Property:</span> {formData.title || "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {formData.propertySubtype || "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Price:</span> $
                        {formData.price?.toLocaleString() || "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Bedrooms:</span> {formData.bedrooms || "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Bathrooms:</span> {formData.bathrooms || "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Area:</span>{" "}
                        {formData.area ? `${formData.area} sq ft` : "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Images:</span> {formData.images.length} uploaded
                      </div>
                      <div>
                        <span className="font-medium">Features:</span> {formData.features.length} selected
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 0 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>
              )}

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className={`flex items-center gap-2 ${currentStep === 0 ? "ml-auto" : ""}`}
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`flex items-center gap-2 ${currentStep === 0 ? "ml-auto" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size={20} className="mr-2" />
                      Publishing...
                    </>
                  ) : (
                    "Publish Listing"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
