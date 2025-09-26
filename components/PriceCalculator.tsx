"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaMoneyBillWave, FaCalculator, FaPercentage, FaHome, FaArrowRight } from "react-icons/fa"
import { TestimonialsCarousel } from "./TestimonialsCarousel"
import Link from "next/link"

export function PriceCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>("")
  const [results, setResults] = useState<{
    escrowFee: number
    titleInsurance: number
    recordingFees: number
    total: number
    netToSeller: number
  } | null>(null)

  const calculateFees = () => {
    const price = Number.parseFloat(purchasePrice)
    if (!price || price <= 0) return

    // Calculate typical escrow fees (these are example rates)
    const escrowFeeRate = 0.002 // 0.2%
    const titleInsuranceRate = 0.005 // 0.5%
    const recordingFees = 5000

    const escrowFee = price * escrowFeeRate
    const titleInsurance = price * titleInsuranceRate
    const total = escrowFee + titleInsurance + recordingFees
    const netToSeller = price - total

    setResults({
      escrowFee,
      titleInsurance,
      recordingFees,
      total,
      netToSeller,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="purchase-price" className="text-sm font-medium">
            Purchase Price (KES)
          </Label>
          <div className="relative">
            <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="purchase-price"
              type="number"
              placeholder="50,000,000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Button onClick={calculateFees} className="w-full" size="lg">
          <FaCalculator className="w-4 h-4 mr-2" />
          Calculate Fees
        </Button>
      </div>

      {results && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FaPercentage className="w-5 h-5 text-primary" />
              Fee Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Escrow Fee (0.2%)</span>
              <span className="font-medium">{formatCurrency(results.escrowFee)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Title Insurance (0.5%)</span>
              <span className="font-medium">{formatCurrency(results.titleInsurance)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Recording Fees</span>
              <span className="font-medium">{formatCurrency(results.recordingFees)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t-2 border-primary/20 bg-primary/5 -mx-6 px-6 rounded-lg">
              <span className="font-semibold text-primary">Total Fees</span>
              <span className="font-bold text-lg text-primary">{formatCurrency(results.total)}</span>
            </div>
            <div className="flex justify-between items-center py-2 mt-4">
              <span className="font-semibold">Net to Seller</span>
              <span className="font-bold text-lg text-green-600">{formatCurrency(results.netToSeller)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6 pt-6 border-t border-border">
        <Button size="lg" className="w-full text-lg py-6 group">
          Get Started Now
          <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Ready to Experience the Future of Escrow?</h3>
          <p className="text-muted-foreground">
            Join thousands of satisfied customers who trust Reskrow for their real estate transactions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="default" className="text-lg px-8 py-4 group">
              <Link href="/buy" className="flex items-center">
                <FaHome className="w-5 h-5 mr-3" />
                I'm Buying
                <FaArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 group bg-transparent">
              <Link href="/sell" className="flex items-center">
                <FaMoneyBillWave className="w-5 h-5 mr-3" />
                I'm Selling
                <FaArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="pt-6 border-t border-border">
            <TestimonialsCarousel />
          </div>
        </div>
      </div>
    </div>
  )
}
