//components/list-properties/land-upload-new.tsx

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LandForm from "./landform"
import { ArrowLeft } from "lucide-react"

interface LandUploadProps {
  onBack: () => void
}

export default function LandUpload({ onBack }: LandUploadProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <Button onClick={onBack} variant="ghost" className="mb-6 flex items-center hover:bg-white/50 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to selection
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Land</h1>
          <p className="text-gray-600">Fill out the details below to create your land listing</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-0">
          <CardContent className="p-8">
            <LandForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
