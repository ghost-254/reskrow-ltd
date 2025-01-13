"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Stepper } from "../ui/Stepper";
import Image from "next/image";
import { Upload, X, ChevronLeft, ChevronRight } from "lucide-react";
import { propertyTypes } from "@/constants/constants";
import dynamic from "next/dynamic";
import { db, storage } from "@/utils/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "@/app/firebase-provider";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../LoadingSpinner";
import { LeafletMapProps } from "@/components/LeafletMap";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
}) as React.FC<LeafletMapProps>;

interface FormData {
  step1: {
    propertyType: string;
    propertySubtype: string;
    listingType: string;
    price: number | null;
  };
  step2: {
    title: string;
    description: string;
    bedrooms: number | null;
    bathrooms: number | null;
    garages: number | null;
    area: number | null;
  };
  step3: {
    address: string;
    location: {
      lat: number | null;
      lng: number | null;
    };
  };
  step4: {
    images: File[];
    video: File | null;
  };
}

const initialFormData: FormData = {
  step1: {
    propertyType: "",
    propertySubtype: "",
    listingType: "",
    price: null,
  },
  step2: {
    title: "",
    description: "",
    bedrooms: null,
    bathrooms: null,
    garages: null,
    area: null,
  },
  step3: {
    address: "",
    location: {
      lat: null,
      lng: null,
    },
  },
  step4: {
    images: [],
    video: null,
  },
};

const listingTypes = ["For Sale", "For Rent", "For Lease"];

const steps = ["Basic Info", "Property Details", "Location", "Media"];

export default function PropertyForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, loading } = useFirebase();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    step: keyof FormData,
    field: string,
    value: string | number | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value === "" ? null : value,
      },
    }));
  };

  const handleLocationChange = (field: "lat" | "lng", value: string) => {
    setFormData((prev) => ({
      ...prev,
      step3: {
        ...prev.step3,
        location: {
          ...prev.step3.location,
          [field]: value === "" ? null : Number(value),
        },
      },
    }));
  };

  const handleMapClick = (coordinates: [number, number]) => {
    setMarkerPosition(coordinates);
    setFormData((prev) => ({
      ...prev,
      step3: {
        ...prev.step3,
        location: {
          lat: coordinates[0],
          lng: coordinates[1],
        },
      },
    }));
  };

  const updateAddress = (newAddress: string) => {
    setFormData((prev) => ({
      ...prev,
      step3: {
        ...prev.step3,
        address: newAddress,
      },
    }));
  };

  const handleAddressChange = (newAddress: string) => {
    updateAddress(newAddress);
  };

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      step4: {
        ...prev.step4,
        images: [...prev.step4.images, ...newImages],
      },
    }));

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleVideoUpload = (files: FileList) => {
    if (files[0]) {
      setFormData((prev) => ({
        ...prev,
        step4: {
          ...prev.step4,
          video: files[0],
        },
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      step4: {
        ...prev.step4,
        images: prev.step4.images.filter((_, i) => i !== index),
      },
    }));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      toast({
        title: "Error Listing Property",
        description: "Please complete all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const uploadedImages = await Promise.all(
        formData.step4.images.map(async (image) => {
          const storageRef = ref(
            storage,
            `propertyImages/${new Date().getTime()}-${image.name}`
          );
          await uploadBytes(storageRef, image);
          return await getDownloadURL(storageRef);
        })
      );

      // let videoUrl = null;
      // if (video) {
      //   const videoRef = ref(
      //     storage,
      //     `propertyVideos/${new Date().getTime()}-${video.name}`
      //   );
      //   await uploadBytes(videoRef, video);
      //   videoUrl = await getDownloadURL(videoRef);
      // }

      // Save data to Firestore

      const collectionRef = collection(db, "properties");

      //destructure the data
      const flattenedData = {
        ...formData.step1,
        ...formData.step2,
        ...formData.step3,
        images: uploadedImages,
        video: null,
        createdAt: serverTimestamp(),
        uid: user?.uid,
      };

      await addDoc(collectionRef, flattenedData);

      toast({
        title: "Property Listed Successfully!",
        description: "You have created a new property listing.",
      });

      // Reset form after submission
      setFormData(initialFormData);
      setImagePreviews([]);
      setCurrentStep(0);

      router.push("/properties");
    } catch (error) {
      console.error("Error listing property:", error);
      toast({
        title: "Error Listing Property",
        description:
          "There was an error listing your property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return (
          formData.step1.propertyType !== "" &&
          formData.step1.propertySubtype !== "" &&
          formData.step1.listingType !== "" &&
          formData.step1.price !== null
        );
      case 1:
        return (
          formData.step2.title !== "" &&
          formData.step2.description !== "" &&
          formData.step2.bedrooms !== null &&
          formData.step2.bathrooms !== null &&
          formData.step2.area !== null
        );
      case 2:
        return (
          formData.step3.address !== "" &&
          formData.step3.location.lat !== null &&
          formData.step3.location.lng !== null
        );
      case 3:
        return formData.step4.images.length > 0;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      toast({
        title: "Error Listing Property",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Stepper activeStep={currentStep} steps={steps} className="mb-8" />

      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="pt-6 px-8">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={formData.step1.propertyType}
                    onValueChange={(value) =>
                      handleInputChange("step1", "propertyType", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a property type" />
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
                  <Label htmlFor="propertySubtype">Property Subtype</Label>
                  <Select
                    value={formData.step1.propertySubtype}
                    onValueChange={(value) =>
                      handleInputChange("step1", "propertySubtype", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a subtype" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.step1.propertyType &&
                        propertyTypes[
                          formData.step1
                            .propertyType as keyof typeof propertyTypes
                        ].map((subtype) => (
                          <SelectItem key={subtype} value={subtype}>
                            {subtype}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="listingType">Listing Type</Label>
                  <Select
                    value={formData.step1.listingType}
                    onValueChange={(value) =>
                      handleInputChange("step1", "listingType", value)
                    }
                  >
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
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={
                      formData.step1.price === null ? "" : formData.step1.price
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "step1",
                        "price",
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.step2.title}
                  onChange={(e) =>
                    handleInputChange("step2", "title", e.target.value)
                  }
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.step2.description}
                  onChange={(e) =>
                    handleInputChange("step2", "description", e.target.value)
                  }
                  required
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={
                      formData.step2.bedrooms === null
                        ? ""
                        : formData.step2.bedrooms
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "step2",
                        "bedrooms",
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={
                      formData.step2.bathrooms === null
                        ? ""
                        : formData.step2.bathrooms
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "step2",
                        "bathrooms",
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="garages">Garages</Label>
                  <Input
                    id="garages"
                    type="number"
                    value={
                      formData.step2.garages === null
                        ? ""
                        : formData.step2.garages
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "step2",
                        "garages",
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={
                      formData.step2.area === null ? "" : formData.step2.area
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "step2",
                        "area",
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.step3.address}
                  onChange={(e) =>
                    handleInputChange("step3", "address", e.target.value)
                  }
                  placeholder="Enter address"
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
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="images">Property Images</Label>
                <div
                  className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors duration-200 ease-in-out hover:border-primary cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e.target.files!)}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop images here
                    </p>
                  </div>
                </div>
              </div>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={preview}
                        alt={`Property image ${index + 1}`}
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
              {/* <div>
                <Label htmlFor="video">Property Video</Label>
                <div
                  className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors duration-200 ease-in-out hover:border-primary cursor-pointer"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleVideoUpload(e.target.files!)}
                    ref={videoInputRef}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload a video
                    </p>
                  </div>
                </div>
              </div> */}
              {formData.step4.video && (
                <p className="text-sm text-gray-600">
                  Video uploaded: {formData.step4.video.name}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button type="button" onClick={prevStep} variant="outline">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className={currentStep === 0 ? "ml-auto" : ""}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                className={currentStep === 0 ? "ml-auto" : ""}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size={20} className="mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
