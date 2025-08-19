"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserProfile } from "@/hooks/useUserProfile"
import { useToast } from "@/hooks/use-toast"
import { User, Phone } from "lucide-react"

interface ProfileSetupProps {
  onComplete?: () => void
  showTitle?: boolean
}

export default function ProfileSetup({ onComplete, showTitle = true }: ProfileSetupProps) {
  const { profile, updateProfile } = useUserProfile()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    agentName: profile?.agentName || "",
    agentPhone: profile?.agentPhone || "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agentName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name.",
        variant: "destructive",
      })
      return
    }

    if (!formData.agentPhone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const success = await updateProfile(formData)
      if (success) {
        toast({
          title: "Profile Updated",
          description: "Your agent profile has been saved successfully.",
        })
        onComplete?.()
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        {showTitle && (
          <>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>Set up your agent information to start listing properties</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agentName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="agentName"
              value={formData.agentName}
              onChange={(e) => setFormData((prev) => ({ ...prev, agentName: e.target.value }))}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agentPhone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number *
            </Label>
            <Input
              id="agentPhone"
              value={formData.agentPhone}
              onChange={(e) => setFormData((prev) => ({ ...prev, agentPhone: e.target.value }))}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : profile ? "Update Profile" : "Complete Setup"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
