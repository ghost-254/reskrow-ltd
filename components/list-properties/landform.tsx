//components/list-properties/land-form-new.tsx

"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import { db, storage } from "@/utils/firebase/config"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDoc, collection } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { useFirebase } from "@/app/firebase-provider"
import dynamic from "next/dynamic"
import type { LeafletMapProps } from "@/components/LeafletMap"
import ProfileSetup from "@/components/ProfileSetup"
import { useUserProfile } from "@/hooks/useUserProfile"

const landTypes = [
  "Agricultural",
  "Residential",
  "Commercial",
  "Industrial",
  "Recreational",
  "Conservation",
  "Mixed-use",
  "Other",
]

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
}) as React.FC<LeafletMapProps>

const listingTypes = ["Sale", "Lease"]

export default function LandForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    address: "",
    price: "",
    size: "",
    availability: "",
    location: {
      lat: 0,
      lng: 0,
    },
  })

  const { user, loading } = useFirebase()
  const { toast } = useToast()
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null)
  const { profile, loading: profileLoading } = useUserProfile()

  const handleAvailabilityChange = (availability: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: availability,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleImageUpload = (files: File[]) => {
    const newImages = [...images, ...files]
    setImages(newImages)

    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...newPreviews])
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleImageUpload(files)
  }

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setImagePreviews((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[index])
      return prevPreviews.filter((_, i) => i !== index)
    })
  }

  const uploadImagesToStorage = async (): Promise<string[]> => {
    const uploadedImageUrls: string[] = []
    for (const image of images) {
      const storageRef = ref(storage, `land-images/${image.name}-${Date.now()}`)
      const uploadTask = uploadBytesResumable(storageRef, image)

      await new Promise<void>((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          uploadedImageUrls.push(downloadURL)
          resolve()
        })
      })
    }
    return uploadedImageUrls
  }

  const saveLandToFirestore = async (imageUrls: string[]) => {
    const mappedListingType = formData.availability.toLowerCase()

    const landData = {
      ...formData,
      listingType: mappedListingType, // Use listingType instead of availability
      availability: `For ${formData.availability}`, // Map "Sale" to "For Sale", "Lease" to "For Lease"
      images: imageUrls,
      agentId: user?.uid,
      agentName: profile?.agentName || user?.displayName || "Agent",
      agentPhone: profile?.agentPhone || user?.phoneNumber || "",
      agentEmail: profile?.agentEmail || user?.email || "",
      createdAt: new Date(),
    }
    const landCollection = collection(db, "lands")
    await addDoc(landCollection, landData)
  }

  const validateForm = () => {
    if (!formData.name) return "Land Name is required."
    if (!formData.type) return "Land Type is required."
    if (!formData.description) return "Description is required."
    if (!formData.address) return "Address is required."
    if (!formData.price || isNaN(Number(formData.price))) return "Price must be a valid number."
    if (!formData.size || isNaN(Number(formData.size))) return "Size must be a valid number."

    if (images.length === 0) return "At least one image is required."
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!profile) {
      toast({
        title: "Profile Required",
        description: "Please complete your agent profile before listing land.",
        variant: "destructive",
      })
      return
    }

    const errorMessage = validateForm()
    if (errorMessage) {
      toast({ title: "Validation Error", description: errorMessage })
      return
    }

    setIsUploading(true)

    try {
      const uploadedImages = await uploadImagesToStorage()

      await saveLandToFirestore(uploadedImages)

      toast({
        title: "Success",
        description: "Land uploaded successfully!",
      })

      // Reset form after successful submission
      setFormData({
        availability: "",
        name: "",
        description: "",
        type: "",
        address: "",
        price: "",
        size: "",
        location: {
          lat: 0,
          lng: 0,
        },
      })
      setImages([])
      setImagePreviews([])
    } catch (error) {
      console.error("Error uploading land:", error)
      toast({
        title: "Error",
        description: "Failed to upload land. Please try again.",
      })
    } finally {
      setIsUploading(false)
    }
  }

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
    updateAddress(newAddress)
  }

  const updateAddress = (newAddress: string) => {
    setFormData((prev) => ({
      ...prev,
      address: newAddress,
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (!profileLoading && !profile) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
            <p className="text-gray-600">You need to set up your agent profile before listing land</p>
          </div>
          <ProfileSetup onComplete={() => window.location.reload()} />
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Land Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="listingType">Listing Type</Label>
          <Select value={formData.availability} onValueChange={(value) => handleAvailabilityChange(value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a listing type" />
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
          <Label htmlFor="type">Land Type</Label>
          <Select name="type" value={formData.type} onValueChange={handleSelectChange} required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a land type" />
            </SelectTrigger>
            <SelectContent>
              {landTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
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
        <div>
          <Label htmlFor="price">Price (KES) *</Label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">KSh</span>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price in Kenya Shillings"
              required
              className="pl-12"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Enter the price in Kenya Shillings (KES). This will be stored as KES in the database.
          </p>
        </div>
        <div>
          <Label htmlFor="size">Size (acres)</Label>
          <Input
            id="size"
            name="size"
            type="number"
            value={formData.size}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="images">Land Images</Label>
        <div
          className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            ref={fileInputRef}
            className="hidden"
          />
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop images here</p>
          </div>
        </div>
      </div>
      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <Image
                src={preview || "/placeholder.svg"}
                alt={`Land image ${index + 1}`}
                width={200}
                height={200}
                className="object-cover rounded-lg w-full h-40"
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
            </div>
          ))}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Land"}
      </Button>
    </form>
  )
}
