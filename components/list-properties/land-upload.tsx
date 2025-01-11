"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LandForm from "./landform";
import { ArrowLeft } from "lucide-react";

interface LandUploadProps {
  onBack: () => void;
}

export default function LandUpload({ onBack }: LandUploadProps) {
  return (
    <div className="max-w-4xl mx-auto">
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
          <h2 className="text-3xl font-bold mb-6">Upload Land</h2>
          <LandForm />
        </CardContent>
      </Card>
    </div>
  );
}
