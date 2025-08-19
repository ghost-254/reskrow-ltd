"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "@/utils/firebase/config"

export interface UserProfile {
  uid: string
  agentName: string
  agentPhone: string
  agentEmail: string
  agentPhoto?: string
  createdAt: Date
  updatedAt: Date
}

export function useUserProfile() {
  const [user] = useAuthState(auth)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const profileDoc = await getDoc(doc(db, "users", user.uid))
        if (profileDoc.exists()) {
          const data = profileDoc.data()
          setProfile({
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as UserProfile)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return false

    try {
      const updatedProfile = {
        uid: user.uid,
        agentEmail: user.email || "",
        ...profileData,
        updatedAt: new Date(),
        ...(profile ? {} : { createdAt: new Date() }),
      }

      await setDoc(doc(db, "users", user.uid), updatedProfile, { merge: true })
      setProfile(updatedProfile as UserProfile)
      return true
    } catch (error) {
      console.error("Error updating profile:", error)
      return false
    }
  }

  return {
    profile,
    loading,
    updateProfile,
    hasProfile: !!profile,
  }
}
