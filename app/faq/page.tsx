'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Phone, Mail, MapPin } from 'lucide-react'

const faqCategories = [
  {
    title: "General Questions",
    questions: [
      {
        q: "What services does Reskrow Real Estate offer?",
        a: "Reskrow Real Estate offers a comprehensive range of services including property listings, buying and selling assistance, rental management, property valuation, and escrow services for secure transactions."
      },
      {
        q: "How do I start my property search with Reskrow?",
        a: "You can start your property search by visiting our 'Properties' page, where you can filter listings based on your preferences such as location, price range, property type, and more."
      },
      {
        q: "Is Reskrow Real Estate licensed and insured?",
        a: "Yes, Reskrow Real Estate is fully licensed and insured. We comply with all local and national regulations to ensure the highest standards of service and protection for our clients."
      }
    ]
  },
  {
    title: "Buying Property",
    questions: [
      {
        q: "How long does the home buying process usually take?",
        a: "The home buying process can vary, but typically takes 30-90 days from offer acceptance to closing. Factors such as financing, inspections, and negotiations can affect the timeline."
      },
      {
        q: "What documents do I need to buy a property?",
        a: "Required documents usually include proof of identity, proof of income, bank statements, tax returns, and employment verification. Specific requirements may vary based on the type of property and financing."
      },
      {
        q: "How much down payment do I need to buy a home?",
        a: "Down payment requirements can vary, but typically range from 3% to 20% of the purchase price. Some special programs may offer lower down payment options. We can help you explore financing options that best suit your situation."
      }
    ]
  },
  {
    title: "Selling Property",
    questions: [
      {
        q: "How does Reskrow determine the value of my property?",
        a: "We use a combination of methods including comparative market analysis, property condition assessment, and consideration of unique features. Our experienced agents will provide a comprehensive valuation to help you price your property competitively."
      },
      {
        q: "What can I do to prepare my home for sale?",
        a: "To prepare your home for sale, consider decluttering, deep cleaning, making minor repairs, enhancing curb appeal, and possibly staging. Our agents can provide personalized advice to maximize your property's appeal."
      },
      {
        q: "How long will it take to sell my property?",
        a: "The time to sell can vary greatly depending on factors such as location, price, property condition, and market conditions. On average, properties in our market sell within 30-60 days, but we'll work with you to develop a strategy for your specific situation."
      }
    ]
  },
  {
    title: "Escrow Services",
    questions: [
      {
        q: "What is escrow and why is it important?",
        a: "Escrow is a financial arrangement where a third party holds and regulates payment of funds on behalf of two parties in a transaction. It's important because it provides security and peace of mind for both buyers and sellers in real estate transactions."
      },
      {
        q: "How does Reskrow's escrow service work?",
        a: "Our escrow service acts as a neutral third party, holding funds and documents until all conditions of the sale are met. We manage the transfer of funds and ensure all necessary paperwork is completed, providing a secure and smooth transaction process."
      },
      {
        q: "What are the fees for using Reskrow's escrow service?",
        a: "Our escrow fees are typically 1.5% of the transaction value, with a minimum fee of $100 and a maximum of $5,000. Exact fees may vary based on the complexity of the transaction. We provide transparent pricing and will discuss all fees upfront."
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <p className="text-center text-muted-foreground mb-8">
        Find answers to common questions about Reskrow Real Estate services, buying and selling properties, and our escrow process.
      </p>

      <div className="mb-8">
        <Input
          type="search"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>

      {filteredFAQs.map((category, index) => (
        <Card key={index} className="mb-8">
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Phone className="mr-2" />
              <span>+254 208000664</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2" />
              <span>info@reskrow.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <span>Reskrow Building, Forest-Line Road, Olkeri Primary School Ngong&apos;</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
            <CardDescription>Our team is here to assist you with any questions or concerns.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

