"use client"

import { useState, useEffect } from "react"
import { collection, doc, setDoc, deleteDoc, query, where, onSnapshot } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "@/utils/firebase/config"

export interface FavoriteProperty {
  id: string
  propertyId: string
  propertyType: "property" | "land"
  userId: string
  title: string
  price: number
  image: string
  address: string
  createdAt: Date
}

export function useFavorites() {
  const [user] = useAuthState(auth)
  const [favorites, setFavorites] = useState<FavoriteProperty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setFavorites([])
      setLoading(false)
      return
    }

    const favoritesQuery = query(collection(db, "favorites"), where("userId", "==", user.uid))

    const unsubscribe = onSnapshot(favoritesQuery, (snapshot) => {
      const favoritesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as FavoriteProperty[]

      setFavorites(favoritesData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  const addToFavorites = async (
    propertyId: string,
    propertyType: "property" | "land",
    propertyData: {
      title: string
      price: number
      image: string
      address: string
    },
  ) => {
    if (!user) {
      // You could show a login modal here
      alert("Please log in to save properties")
      return
    }

    try {
      const favoriteId = `${user.uid}_${propertyId}`
      await setDoc(doc(db, "favorites", favoriteId), {
        propertyId,
        propertyType,
        userId: user.uid,
        title: propertyData.title,
        price: propertyData.price,
        image: propertyData.image,
        address: propertyData.address,
        createdAt: new Date(),
      })
    } catch (error) {
      console.error("Error adding to favorites:", error)
    }
  }

  const removeFromFavorites = async (propertyId: string) => {
    if (!user) return

    try {
      const favoriteId = `${user.uid}_${propertyId}`
      await deleteDoc(doc(db, "favorites", favoriteId))
    } catch (error) {
      console.error("Error removing from favorites:", error)
    }
  }

  const isFavorite = (propertyId: string) => {
    return favorites.some((fav) => fav.propertyId === propertyId)
  }

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    isLoggedIn: !!user,
  }
}
