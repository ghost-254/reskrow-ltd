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
import Image from "next/image";
import { Upload, X } from "lucide-react";

const landTypes = [
  "Agricultural",
  "Residential",
  "Commercial",
  "Industrial",
  "Recreational",
  "Conservation",
  "Mixed-use",
  "Other",
];

export default function LandForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    address: "",
    price: "",
    size: "",
    zoning: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleImageUpload = (files: File[]) => {
    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleImageUpload(files);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[index]);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your function to upload the land
    console.log("Uploading land:", { ...formData, images });
    // Reset form after submission
    setFormData({
      name: "",
      description: "",
      type: "",
      address: "",
      price: "",
      size: "",
      zoning: "",
    });
    setImages([]);
    setImagePreviews([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Land Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="type">Land Type</Label>
          <Select
            name="type"
            value={formData.type}
            onValueChange={handleSelectChange}
            required
          >
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
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
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
        <div>
          <Label htmlFor="zoning">Zoning</Label>
          <Input
            id="zoning"
            name="zoning"
            value={formData.zoning}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
        </div>
      </div>
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
      <Button type="submit" className="w-full">
        Upload Land
      </Button>
    </form>
  );
}
