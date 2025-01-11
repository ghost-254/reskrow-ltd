"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Trees } from "lucide-react";
import PropertyUpload from "./property-upload";
import LandUpload from "./land-upload";

export default function UploadSelection() {
  const [selectedType, setSelectedType] = useState<"property" | "land" | null>(
    null
  );

  if (selectedType === "property") {
    return <PropertyUpload onBack={() => setSelectedType(null)} />;
  }

  if (selectedType === "land") {
    return <LandUpload onBack={() => setSelectedType(null)} />;
  }

  return (
    <div className="flex-grow container mx-auto px-8 py-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        What would you like to upload?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <Button
              onClick={() => setSelectedType("property")}
              className="w-full h-full flex flex-col items-center justify-center p-8 space-y-4"
              variant="ghost"
            >
              <Building size={64} />
              <span className="text-xl font-semibold">Property</span>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <Button
              onClick={() => setSelectedType("land")}
              className="w-full h-full flex flex-col items-center justify-center p-8 space-y-4"
              variant="ghost"
            >
              <Trees size={64} />
              <span className="text-xl font-semibold">Land</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
