"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Sign In Successful",
          description: "Welcome back!",
        })
        // Refresh the page with a loading effect
        router.refresh()
        setLoading(true) // Keep loading state true for the refresh
        router.push('/')
        window.location.reload()
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Unable to connect. Please check your internet connection.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="john@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <><LoadingSpinner size={16} className="mr-2" /> Signing In...</> : "Sign In"}
        </Button>
      </form>
      <div className="text-center text-sm">
        <Link href="/auth/forgot-password" className="text-primary hover:underline">
          Forgot your password?
        </Link>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link href="/auth?tab=signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}

