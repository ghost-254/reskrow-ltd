'use client'

import * as React from 'react'
import { Children, cloneElement, isValidElement } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

const steps = [
  {
    title: 'Basic Information',
    description: 'Enter basic details about your property',
    content: <p>Basic Information Content</p>
  },
  {
    title: 'Location',
    description: 'Select the location of your property on the map',
    content: <p>Location Content</p>
  },
  {
    title: 'Media',
    description: 'Upload photos and videos of your property',
    content: <p>Media Content</p>
  },
  {
    title: 'Listing Type',
    description: 'Choose how you want to list your property',
    content: <p>Listing Type Content</p>
  },
]

interface StepperProps {
  activeStep: number
  onNext: () => void
  onPrevious: () => void
  steps: { title: string, description: string, content: React.ReactNode }[]
  progress: number
  onSubmit: (data: any) => void
}

export function Stepper({ activeStep, onNext, onPrevious, steps, progress, onSubmit }: StepperProps) {
  return (
    <div className="w-full">
      <nav className="flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={cn(
                "relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium",
                activeStep === index
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-300 bg-transparent text-gray-500",
                index === steps.length - 1 ? 'sr-only' : ''
              )}
            >
              {activeStep > index ? (
                <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-4 w-4" />
                </div>
              ) : (
                index + 1
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-1 w-10 bg-gray-200",
                  activeStep > index ? "bg-primary" : ""
                )}
              />
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className="mt-12">
        {steps.map((step, index) => (
          <Step key={index} active={activeStep === index}>
            {activeStep === index && (
              <div className="space-y-8 mt-8">
                {step.content}
                <div className="flex justify-between">
                  <Button type="button" onClick={onPrevious} disabled={activeStep === 0}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button type="submit" onClick={onSubmit}>
                      Submit
                    </Button>
                  ) : (
                    <Button type="button" onClick={onNext}>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Step>
        ))}
      </div>
      <div className="mt-4 text-center">
        {progress > 0 && <p>{progress}% Complete</p>}
      </div>
    </div>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 text-white",
        className
      )}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Step({ children, active }: { children: React.ReactNode; active: boolean }) {
  return <>{children}</>;
}

