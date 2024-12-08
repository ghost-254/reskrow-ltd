"use client"

import { useState, useEffect } from 'react'
import { Handshake, Banknote, ArrowLeftRight, CheckCircle2, Wallet } from 'lucide-react'

const steps = [
  { icon: Handshake, text: "Buyer and seller agree on terms" },
  { icon: Banknote, text: "Buyer pays Reskrow.com" },
  { icon: ArrowLeftRight, text: "Seller transfers the property ownership" },
  { icon: CheckCircle2, text: "Buyer inspects & approves property" },
  { icon: Wallet, text: "Reskrow.com pays the seller" },
]

export function EscrowSteps() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-primary">Buy or sell your property safely and confidently</h3>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center transition-all duration-300 p-4 rounded-lg ${
              activeStep === index ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'
            }`}
          >
            <step.icon size={32} className="mr-4" />
            <span>{index + 1}. {step.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
