"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import PropertyForm from "./property-form";
interface PropertyUploadProps {
  onBack: () => void;
}

export default function PropertyUpload({ onBack }: PropertyUploadProps) {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-6 flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to selection
      </Button>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold mb-6">Upload Property</h2>
          <PropertyForm />
        </CardContent>
      </Card>
    </div>
  );
}
