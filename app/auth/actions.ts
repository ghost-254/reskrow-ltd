'use server'

import { auth } from '@/utils/firebase/config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { redirect } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"


export async function login(formData: FormData) {
  const { toast } = useToast()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    await signInWithEmailAndPassword(auth, email, password)
    redirect('/')
  } catch (error: any) {
    toast({
      title: "Login Failed",
      description: error.message,
      variant: "destructive",
    })
  }
}

export async function signup(formData: FormData) {
  const { toast } = useToast()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(userCredential.user)

    toast({
      title: "Signup Successful",
      description: "Verification email sent. Check your inbox.",
    })

    redirect('/auth?message=Verification email sent')
  } catch (error: any) {
    toast({
      title: "Signup Failed",
      description: error.message,
      variant: "destructive",
    })
  }
}

