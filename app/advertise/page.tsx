'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Target, BarChart, DollarSign, Users, CheckCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  adType: z.string().min(2, {
    message: "Please specify the type of advertisement.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function AdvertisePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      adType: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    emailjs.send(
      'service_95g6zzv',
      'template_8nedhy7',
      values,
      'adm7pFVfMWg7MS2ni'
    ).then((result) => {
      setIsSubmitting(false)
      toast({
        title: "Quote Request Sent",
        description: "We've received your request and will get back to you soon.",
      })
      form.reset()
    }, (error) => {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "There was an error sending your request. Please try again.",
        variant: "destructive",
      })
    })
  }

  const adTypes = [
    { icon: Megaphone, title: "Banner Ads", description: "Eye-catching visual ads displayed prominently on our website" },
    { icon: Users, title: "Sponsored Content", description: "Informative articles or blog posts related to your services" },
    { icon: Target, title: "Targeted Email Campaigns", description: "Reach our subscribers directly in their inbox" },
    { icon: BarChart, title: "Featured Listings", description: "Highlight your properties or services in our search results" },
  ]

  const benefits = [
    { icon: Target, title: "Targeted Audience", description: "Reach potential customers actively looking for real estate services" },
    { icon: BarChart, title: "Increased Visibility", description: "Boost your brand awareness in the competitive real estate market" },
    { icon: DollarSign, title: "Cost-Effective", description: "Flexible pricing options to suit businesses of all sizes" },
    { icon: CheckCircle, title: "Quality Traffic", description: "Connect with high-intent users more likely to convert" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-primary">Advertise with Reskrow</h1>
          <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
            Reach a targeted audience of real estate professionals and enthusiasts. Boost your brand visibility and drive quality leads to your business.
          </p>
        </div>
      </section>
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">Our Advertising Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {adTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">Why Advertise with Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">How It Works</h2>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <ol className="list-decimal list-inside space-y-4">
                <li>Submit your advertisement details using the form below.</li>
                <li>Our team will review your request and prepare a custom quote based on your needs and budget.</li>
                <li>We'll reach out to discuss the details, answer any questions, and finalize the agreement.</li>
                <li>Once approved, we'll work with you to create and optimize your ad content.</li>
                <li>Your ad will be placed on our platform, reaching thousands of potential customers in the real estate market.</li>
                <li>We'll provide regular performance reports and work with you to maximize your campaign's effectiveness.</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">Request a Quote</h2>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Get Started with Your Ad Campaign</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you with a custom quote.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Advertisement Type</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Banner Ad, Sponsored Content" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your product or service and your advertising goals" 
                            {...field} 
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? "Sending..." : "Request Quote"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

