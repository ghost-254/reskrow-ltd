"use client"

import { useState, useEffect } from "react"
import { getUserLocation, getCurrencyByCountry, getCurrencyInfo, formatPrice } from "@/utils/currency"

interface CurrencyHook {
  currency: string
  currencySymbol: string
  loading: boolean
  convertAndFormat: (priceInKES: number) => string
}

export function useCurrency(): CurrencyHook {
  const [currency, setCurrency] = useState("KES") // Default to KES
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        const countryCode = await getUserLocation()
        const currencyCode = getCurrencyByCountry(countryCode)
        setCurrency(currencyCode)
      } catch (error) {
        console.log("[v0] Failed to initialize currency, using KES:", error)
        setCurrency("KES")
      } finally {
        setLoading(false)
      }
    }

    initializeCurrency()
  }, [])

  const convertAndFormat = (priceInKES: number): string => {
    // Simplified to just format KES prices
    return formatPrice(priceInKES, "KES")
  }

  const currencyInfo = getCurrencyInfo(currency)

  return {
    currency,
    currencySymbol: currencyInfo.symbol,
    loading,
    convertAndFormat,
  }
}
