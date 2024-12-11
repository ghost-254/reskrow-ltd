'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

export default function DisputeResolutionPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Dispute Resolution</h1>

      <Card className="mb-8 bg-primary/5 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Our Commitment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            At Reskrow Real Estate, we are committed to providing a positive experience for all our users. We understand that disputes may arise from time to time, and we have established this Dispute Resolution Policy to address such situations fairly and efficiently.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-secondary/5 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-secondary">Informal Resolution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            As a first step, we encourage users to attempt to resolve disputes informally by contacting us directly. We will work with you to understand the issue and find a mutually agreeable solution.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-accent/5 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-accent">Mediation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            If informal resolution is unsuccessful, we may suggest mediation as a next step. Mediation involves a neutral third party who helps facilitate communication and negotiation between the disputing parties.
          </p>
        </CardContent>
      </Card>

      {/* Placeholder for an image related to dispute resolution/mediation */}
      <div className="relative aspect-[16/9] w-full mb-8 overflow-hidden rounded-lg shadow-md">
        <Image
          src="/dispute-resolution.png"
          alt="Image related to dispute resolution/mediation"
          fill
          className="object-cover"
        />
      </div>

      <Card className="bg-muted shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            If you have a dispute that you would like to resolve, please contact us at disputes@reskrow.com.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

