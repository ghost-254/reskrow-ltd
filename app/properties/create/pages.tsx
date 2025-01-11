"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { db, storage } from "@/utils/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { propertyTypes } from "@/constants/constants";
import dynamic from "next/dynamic";
import { useFirebase } from "@/app/firebase-provider";
import { useTheme } from "next-themes";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  onMapClick: (coordinates: [number, number]) => void;
  onAddressChange?: (address: string) => void;

  markerPosition?: [number, number] | null;
}

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
}) as React.FC<LeafletMapProps>;

const formSchema = z.object({
  step1: z.object({
    propertyType: z
      .string()
      .min(1, { message: "Please select a property type" }),
    propertySubtype: z
      .string()
      .min(1, { message: "Please select a property subtype" }),
    listingType: z.enum(["sale", "rent", "lease"]),
    price: z.number().min(1, { message: "Please enter a valid price" }),
  }),
  step2: z.object({
    title: z.string().min(1, { message: "Please enter a title" }),
    description: z.string().min(1, { message: "Please enter a description" }),
    bedrooms: z.number().min(0, { message: "Please enter number of bedrooms" }),
    bathrooms: z
      .number()
      .min(0, { message: "Please enter number of bathrooms" }),
    garages: z.number().min(0, { message: "Please enter number of garages" }),
    area: z.number().min(0, { message: "Please enter the property area" }),
  }),
  step3: z.object({
    address: z.string().min(1, { message: "Please enter an address" }),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  step4: z.object({
    images: z
      .array(z.instanceof(File))
      .min(1, { message: "Please select at least one image" }),
    video: z.instanceof(File).nullable(),
  }),
});

export default function CreatePropertyPage() {
  const [step, setStep] = useState(1);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedSubtype, setSelectedSubtype] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user, loading } = useFirebase();
  const { resolvedTheme } = useTheme();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAddressChange = (newAddress: string) => {
    updateAddress(newAddress);
  };

  interface FormData {
    step1: {
      propertyType: string;
      propertySubtype: string;
      listingType: string;
      price: number;
    };
    step2: {
      title: string;
      description: string;
      bedrooms: number;
      bathrooms: number;
      garages: number;
      area: number;
    };
    step3: {
      address: string;
      location: {
        lat: number;
        lng: number;
      };
    };
    step4: {
      images: File[];
      video: File | null;
    };
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      step1: {
        propertyType: "",
        propertySubtype: "",
        listingType: "sale",
        price: 0,
      },
      step2: {
        title: "",
        description: "",
        bedrooms: 0,
        bathrooms: 0,
        garages: 0,
        area: 0,
      },
      step3: {
        address: "",
        location: { lat: 0, lng: 0 },
      },
      step4: {
        images: [],
        video: null,
      },
    },
  });

  const handleMapClick = (coordinates: [number, number]) => {
    setValue("step3.location", { lat: coordinates[0], lng: coordinates[1] });
    setMarkerPosition(coordinates);
  };

  const handleNext = () => {
    if (step < 4) {
      // Validate current step data before moving to next
      switch (step) {
        case 1:
          if (
            errors.step1?.propertyType ||
            errors.step1?.propertySubtype ||
            errors.step1?.price ||
            !selectedPropertyType ||
            !selectedSubtype
          ) {
            toast({
              title: "Validation Error",
              description: "Please fill out all required fields for this step.",
              variant: "destructive",
            });
            return;
          }
          break;
        case 2:
          if (
            errors.step2?.title ||
            errors.step2?.description ||
            errors.step2?.bedrooms ||
            errors.step2?.bathrooms ||
            errors.step2?.garages ||
            errors.step2?.area
          ) {
            toast({
              title: "Validation Error",
              description: "Please fill out all required fields for this step.",
              variant: "destructive",
            });
            return;
          }
          break;
        case 3:
          if (errors.step3?.address || !markerPosition) {
            toast({
              title: "Validation Error",
              description:
                "Please enter an address and select a location on the map.",
              variant: "destructive",
            });
            return;
          }
          break;
        case 4:
          if (errors.step4?.images) {
            toast({
              title: "Validation Error",
              description: "Please select at least one image.",
              variant: "destructive",
            });
            return;
          }
          break;
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePropertyTypeChange = (value: string) => {
    // Correct type here
    setSelectedPropertyType(value);
    setValue("step1.propertyType", value);
    setSelectedSubtype("");
  };

  const handleSubtypeChange = (value: string) => {
    // Correct type here
    setSelectedSubtype(value);
    setValue("step1.propertySubtype", value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      setValue("step4.images", Array.from(e.target.files));
    }
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
      setValue("step4.video", e.target.files[0]);
    } else {
      setVideo(null);
      setValue("step4.video", null);
    }
  };

  const percentageComplete = ((step - 1) / 3) * 100;

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      console.log("========CLICKED");
      setIsLoading(true);
      const imageUrls: string[] = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(
            storage,
            `propertyImages/${new Date().getTime()}-${image.name}`
          );
          await uploadBytes(storageRef, image);
          return await getDownloadURL(storageRef);
        })
      );

      // let videoUrl: string | null = null;
      // if (video) {
      //   const videoRef = ref(
      //     storage,
      //     `propertyVideos/${new Date().getTime()}-${video.name}`
      //   );
      //   await uploadBytes(videoRef, video);

      //   videoUrl = await getDownloadURL(videoRef);
      // }

      const propertyData = {
        ...data.step1,
        ...data.step2,
        ...data.step3,
        images: imageUrls,
        video: null,
        uid: user?.uid,
        createdAt: serverTimestamp(),
      };

      const collectionRef = collection(db, "properties");

      await addDoc(collectionRef, propertyData);

      toast({
        title: "Property Listed Successfully!",
        description: "You have created a new property listing.",
      });
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
  });

  const updateAddress = (newAddress: string) => {
    setValue("step3.address", newAddress, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[index]);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleImageUpload(files);
  };

  const handleImageUpload = (files: File[]) => {
    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmitForm = async (data: FormData) => {
    console.log("Form submitted:", data);
    setIsLoading(true);
    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(
            storage,
            `propertyImages/${new Date().getTime()}-${image.name}`
          );
          await uploadBytes(storageRef, image);
          return await getDownloadURL(storageRef);
        })
      );

      let videoUrl = null;
      if (video) {
        const videoRef = ref(
          storage,
          `propertyVideos/${new Date().getTime()}-${video.name}`
        );
        await uploadBytes(videoRef, video);
        videoUrl = await getDownloadURL(videoRef);
      }

      const propertyData = {
        ...data.step1,
        ...data.step2,
        ...data.step3,
        images: imageUrls,
        video: videoUrl,
        uid: user?.uid,
        createdAt: serverTimestamp(),
      };

      console.log("Property data:", propertyData);

      const collectionRef = collection(db, "properties");
      await addDoc(collectionRef, propertyData);

      toast({
        title: "Property Listed Successfully!",
        description: "You have created a new property listing.",
      });
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

  const handleClick = () => {
    console.log("Clicked");
    handleSubmit(handleSubmitForm)();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <form onSubmit={handleClick} className="space-y-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-primary">
          List Your Property
        </h1>

        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                Step {step} of 4
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primary">
                {percentageComplete}% Complete
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
            <div
              style={{ width: `${percentageComplete}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
            ></div>
          </div>
        </div>

        {step === 1 && (
          <div className="md:grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select onValueChange={handlePropertyTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(propertyTypes).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.step1?.propertyType && (
                <p className="text-red-500 text-sm">
                  {errors.step1?.propertyType.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor="propertySubtype">Property Subtype</Label>
              <Select
                onValueChange={handleSubtypeChange}
                disabled={!selectedPropertyType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Subtype" />
                </SelectTrigger>
                <SelectContent>
                  {selectedPropertyType &&
                    propertyTypes[
                      selectedPropertyType as keyof typeof propertyTypes
                    ].map((subtype) => (
                      <SelectItem key={subtype} value={subtype}>
                        {subtype}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.step1?.propertySubtype && (
                <p className="text-red-500 text-sm">
                  {errors.step1?.propertySubtype.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Label htmlFor="listingType">Listing Type</Label>
              <Select {...register("step1.listingType")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Listing Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="lease">For Lease</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                placeholder="Enter price"
                {...register("step1.price", { required: true })}
              />
              {errors.step1?.price && (
                <p className="text-red-500 text-sm">
                  {errors.step1?.price.message}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="md:grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter title"
                {...register("step2.title", { required: true })}
              />
              {errors.step2?.title && (
                <p className="text-red-500 text-sm">
                  {errors.step2?.title.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter description"
                {...register("step2.description", { required: true })}
              />
              {errors.step2?.description && (
                <p className="text-red-500 text-sm">
                  {errors.step2?.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2 col-span-2 lg:col-span-1">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                type="number"
                placeholder="Enter number of bedrooms"
                {...register("step2.bedrooms", { required: true })}
              />
              {errors.step2?.bedrooms && (
                <p className="text-red-500 text-sm">
                  {errors.step2?.bedrooms.message}
                </p>
              )}
            </div>
            <div className="space-y-2 col-span-2 lg:col-span-1">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                type="number"
                placeholder="Enter number of bathrooms"
                {...register("step2.bathrooms", { required: true })}
              />
              {errors.step2?.bathrooms && (
                <p className="text-red-500 text-sm">
                  {errors.step2?.bathrooms.message}
                </p>
              )}
            </div>
            <div className="space-y-2 col-span-2 lg:col-span-1">
              <Label htmlFor="garages">Garages</Label>
              <Input
                type="number"
                placeholder="Enter number of garages"
                {...register("step2.garages", { required: true })}
              />
              {errors.step2?.garages && (
                <p className="text-red-500 text-sm">
                  {errors.step2?.garages.message}
                </p>
              )}
            </div>

            <div className="space-y-2 col-span-2 lg:col-span-1">
              <Label htmlFor="area">Area (sqft)</Label>
              <Input
                type="number"
                placeholder="Enter property area"
                {...register("step2.area", { required: true })}
              />
              {errors.step2?.area && (
                <p className="text-red-500 text-sm">
                  {errors.step2?.area.message}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter address"
                {...register("step3.address", { required: true })}
              />
              {errors.step3?.address && (
                <p className="text-red-500 text-sm">
                  {errors.step3?.address.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <LeafletMap
                center={markerPosition || [-1.286389, 36.817223]} // Default center
                zoom={13}
                onMapClick={handleMapClick}
                markerPosition={markerPosition}
                onAddressChange={handleAddressChange}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div>
              <Label htmlFor="images">Land Images</Label>
              <div
                className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors duration-200 ease-in-out hover:border-primary cursor-pointer"
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
          </div>
        )}

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            variant="secondary"
          >
            Back
          </Button>
          {step < 4 ? (
            <Button type="button" onClick={handleNext} disabled={isLoading}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading}>
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
      </form>
    </div>
  );
}
