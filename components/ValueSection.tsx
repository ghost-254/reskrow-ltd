'use client'

import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Heart, DollarSign, ShieldCheck, HeadphonesIcon } from 'lucide-react'

export default function ValueSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden">
          <Image
            src="/r1.png"
            alt="Modern architectural building"
            style={{ objectFit: 'cover' }}
            priority
            height={600}
            width={500}
          />
        </div>

        <div className="space-y-6 sm:mt-1">
          <div className="space-y-2">
            <h3 className="text-orange-500 text-xl font-semibold">Our Value</h3>
            <h2 className="text-4xl font-bold text-primary">Value We Give to You</h2>
            <p className="text-muted-foreground">
              We are dedicated to providing you with a seamless and secure real estate experience. 
              Whether you're buying, selling, or using our escrow services, we ensure that every 
              step of the process is easy, transparent, and beneficial for you.
            </p>
            <p className="text-muted-foreground">
              We believe that finding the right property or making a secure transaction can 
              positively impact your quality of life.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-semibold text-left">Best interest rates on the market</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Reskrow offers competitive interest rates that make purchasing your dream 
                property affordable. We work with trusted financial partners to secure the best 
                rates for our clients, helping you save money and invest wisely in your future.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-semibold text-left">Prevent unstable prices</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Our market analysis and pricing strategies help protect you from market volatility. 
                We ensure fair and stable pricing through thorough research and expert valuation 
                methods.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-semibold text-left">Secure transactions with escrow services</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Our escrow services provide a secure and trusted platform for all your real estate 
                transactions. We act as a neutral third party to ensure both buyers and sellers are 
                protected throughout the process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                    <HeadphonesIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="font-semibold text-left">Expert support and consultation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Our team of experienced real estate professionals is always ready to provide 
                expert guidance and support. We offer personalized consultation services to help 
                you make informed decisions about your real estate investments.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

