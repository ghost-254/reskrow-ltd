'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProfileForm from '@/components/ProfileForm'
import { useFirebase } from '@/app/firebase-provider'
import { LoadingSpinner } from "@/components/LoadingSpinner"

export default function ProfilePage() {
  const { user, loading } = useFirebase()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingSpinner size={48} />
  }

  if (!user) {
    return null
  }

  return <ProfileForm user={user} />
}

