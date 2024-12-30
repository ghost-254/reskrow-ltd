"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from '@/utils/firebase/config'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/utils/firebase/config'
import { Eye, EyeOff } from 'lucide-react';


export function SignUpForm() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [displayName, setDisplayName] = useState("")
const [loading, setLoading] = useState(false)
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const { toast } = useToast()
const router = useRouter()

const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (!emailPattern.test(email)) {
    toast({
      title: "Invalid Email",
      description: "Please enter a valid email address.",
      variant: "destructive",
    })
    setLoading(false)
    return
  }

  if (!passwordPattern.test(password)) {
    toast({
      title: "Weak Password",
      description: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      variant: "destructive",
    })
    setLoading(false)
    return
  }

  if (password !== confirmPassword) {
    toast({
      title: "Password Mismatch",
      description: "Passwords do not match.",
      variant: "destructive",
    })
    setLoading(false)
    return
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update display name
    await updateProfile(user, { displayName })

    // Insert user details into Firestore
    await setDoc(doc(db, 'users', user.uid), {
      displayName,
      email: user.email,
    })

    await sendEmailVerification(user, {
      url: `${window.location.origin}/auth/verification-success`, // Redirect URL on email confirmation
    })

    toast({
      title: "Sign Up Successful",
      description: "Please check your email to confirm your account.",
    })
    router.push('/auth?tab=signin')
  } catch (error: any) {
    console.error("Sign up failed:", error)
    toast({
      title: "Sign Up Failed",
      description: error.message,
      variant: "destructive",
    })
  } finally {
    setLoading(false)
  }
}

return (
  <div className="space-y-6">
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          placeholder="Your display name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </div>
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
      <div className="space-y-2 relative">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-1 top-7 h-7 w-7"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-1 top-7 h-7 w-7"
        >
          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <><LoadingSpinner size={16} className="mr-2" /> Signing Up...</> : "Sign Up"}
      </Button>
    </form>
    <div className="text-center text-sm text-muted-foreground">
      Already have an account?{' '}
      <Link href="/auth?tab=signin" className="text-primary hover:underline">
        Sign in
      </Link>
    </div>
  </div>
)
}

