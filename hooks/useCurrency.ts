"use client"

import { useState, useEffect } from "react"
import { getUserLocation, getCurrencyByCountry, getCurrencyInfo, convertPrice, formatPrice } from "@/utils/currency"

interface CurrencyHook {
  currency: string
  currencySymbol: string
  loading: boolean
  convertAndFormat: (priceInHKD: number) => string
}

export function useCurrency(): CurrencyHook {
  const [currency, setCurrency] = useState("USD")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        const countryCode = await getUserLocation()
        const currencyCode = getCurrencyByCountry(countryCode)
        setCurrency(currencyCode)
      } catch (error) {
        console.log("[v0] Failed to initialize currency, using USD:", error)
        setCurrency("USD")
      } finally {
        setLoading(false)
      }
    }

    initializeCurrency()
  }, [])

  const convertAndFormat = (priceInHKD: number): string => {
    const convertedPrice = convertPrice(priceInHKD, currency)
    return formatPrice(convertedPrice, currency)
  }

  const currencyInfo = getCurrencyInfo(currency)

  return {
    currency,
    currencySymbol: currencyInfo.symbol,
    loading,
    convertAndFormat,
  }
}
