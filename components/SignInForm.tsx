"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setSessionCookie } from '@/utils/firebase/auth';

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()
      await setSessionCookie(idToken)
      toast({
        title: "Sign In Successful",
        description: "Welcome back!",
      })
      router.push('/')
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message,
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

