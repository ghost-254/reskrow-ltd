
'use client'

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

export default function DisclaimerPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Disclaimer</h1>

      <Card className="mb-8 bg-primary/5 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The information provided on this website is for general informational purposes only and does not constitute professional advice. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-secondary/5 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-secondary">No Warranty</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Reskrow Real Estate does not warrant that the website will be uninterrupted or error-free, and we will not be liable for any interruptions or errors. We also do not warrant that the website or the server that makes it available are free of viruses or other harmful components.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-accent/5 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-accent">External Links</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This website may contain links to external websites that are not under the control of Reskrow Real Estate. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
        </CardContent>
      </Card>

      {/* Placeholder for an image related to disclaimer/legal matters */}
      <div className="relative aspect-[16/9] w-full mb-8 overflow-hidden rounded-lg shadow-md">
        <Image
          src="/disclaimer.png"
          alt="Image related to disclaimer/legal matters"
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
            If you have any questions about this disclaimer, please contact us at legal@reskrow.com.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

