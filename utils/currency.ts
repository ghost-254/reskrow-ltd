interface CurrencyRates {
    [key: string]: number
  }
  
  interface CurrencyInfo {
    code: string
    symbol: string
    name: string
  }
  
  // Currency mapping by country
  const COUNTRY_CURRENCY_MAP: { [key: string]: string } = {
    US: "USD",
    KE: "KES", // Kenya
    UG: "UGX", // Uganda
    TZ: "TZS", // Tanzania
    RW: "RWF", // Rwanda
    NG: "NGN", // Nigeria
    GH: "GHS", // Ghana
    ZA: "ZAR", // South Africa
    GB: "GBP",
    EU: "EUR",
    CA: "CAD",
    AU: "AUD",
    HK: "HKD",
    SG: "SGD",
    IN: "INR",
    CN: "CNY",
    JP: "JPY",
  }
  
  const CURRENCY_INFO: { [key: string]: CurrencyInfo } = {
    USD: { code: "USD", symbol: "$", name: "US Dollar" },
    KES: { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
    UGX: { code: "UGX", symbol: "USh", name: "Ugandan Shilling" },
    TZS: { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling" },
    RWF: { code: "RWF", symbol: "RF", name: "Rwandan Franc" },
    NGN: { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
    GHS: { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
    ZAR: { code: "ZAR", symbol: "R", name: "South African Rand" },
    GBP: { code: "GBP", symbol: "£", name: "British Pound" },
    EUR: { code: "EUR", symbol: "€", name: "Euro" },
    CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    HKD: { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
    SGD: { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
    INR: { code: "INR", symbol: "₹", name: "Indian Rupee" },
    CNY: { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  }
  
  // Mock exchange rates (in production, fetch from a real API)
  const MOCK_EXCHANGE_RATES: CurrencyRates = {
    USD: 0.128, // 1 HKD = 0.128 USD
    KES: 16.5, // 1 HKD = 16.5 KES
    UGX: 473, // 1 HKD = 473 UGX
    TZS: 320, // 1 HKD = 320 TZS
    RWF: 175, // 1 HKD = 175 RWF
    NGN: 200, // 1 HKD = 200 NGN
    GHS: 2.0, // 1 HKD = 2.0 GHS
    ZAR: 2.3, // 1 HKD = 2.3 ZAR
    GBP: 0.1, // 1 HKD = 0.10 GBP
    EUR: 0.12, // 1 HKD = 0.12 EUR
    CAD: 0.17, // 1 HKD = 0.17 CAD
    AUD: 0.19, // 1 HKD = 0.19 AUD
    HKD: 1.0, // Base currency
    SGD: 0.17, // 1 HKD = 0.17 SGD
    INR: 10.7, // 1 HKD = 10.7 INR
    CNY: 0.92, // 1 HKD = 0.92 CNY
    JPY: 19.2, // 1 HKD = 19.2 JPY
  }
  
  export async function getUserLocation(): Promise<string> {
    try {
      // Try to get user's country from IP geolocation
      const response = await fetch("https://ipapi.co/json/")
      const data = await response.json()
      return data.country_code || "US"
    } catch (error) {
      console.log("[v0] Failed to get user location, defaulting to US:", error)
      return "US" // Default to US
    }
  }
  
  export function getCurrencyByCountry(countryCode: string): string {
    return COUNTRY_CURRENCY_MAP[countryCode] || "USD"
  }
  
  export function getCurrencyInfo(currencyCode: string): CurrencyInfo {
    return CURRENCY_INFO[currencyCode] || CURRENCY_INFO.USD
  }
  
  export function convertPrice(priceInHKD: number, targetCurrency: string): number {
    const rate = MOCK_EXCHANGE_RATES[targetCurrency] || MOCK_EXCHANGE_RATES.USD
    return priceInHKD * rate
  }
  
  export function formatPrice(price: number, currencyCode: string): string {
    const currencyInfo = getCurrencyInfo(currencyCode)
  
    // Format based on currency
    if (currencyCode === "JPY" || currencyCode === "UGX" || currencyCode === "RWF") {
      // No decimal places for these currencies
      return `${currencyInfo.symbol}${Math.round(price).toLocaleString()}`
    } else {
      return `${currencyInfo.symbol}${price.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`
    }
  }
  
  export async function getLocalizedPrice(priceInHKD: number): Promise<string> {
    try {
      const countryCode = await getUserLocation()
      const currencyCode = getCurrencyByCountry(countryCode)
      const convertedPrice = convertPrice(priceInHKD, currencyCode)
      return formatPrice(convertedPrice, currencyCode)
    } catch (error) {
      console.log("[v0] Failed to get localized price, using USD:", error)
      const convertedPrice = convertPrice(priceInHKD, "USD")
      return formatPrice(convertedPrice, "USD")
    }
  }
  