'use client'

import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import emailjs from '@emailjs/browser'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Clock, Send, Home, ActivityIcon as Ad } from 'lucide-react'
import Link from 'next/link'

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await emailjs.send(
        'service_xx6xdbq',
        'template_d13p3kz',
        data,
        'A-fP1LuJZRDHQGw7W'
      )
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      })
      reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2" /> Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>+254 208000664</p>
            <p>+254 715666140 (WhatsApp)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2" /> Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>info@reskrow.com</p>
            <p>support@reskrow.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" /> Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Reskrow Building, Forest-Line Road,</p>
            <p>Olkeri Primary School Ngong&apos;</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Monday - Friday: 9am - 5pm</p>
            <p>Saturday: 10am - 2pm</p>
            <p>Sunday: Closed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input placeholder="Your Name" {...register("name")} />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Input type="email" placeholder="Your Email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Input placeholder="Subject" {...register("subject")} />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>
              <div>
                <Textarea placeholder="Your Message" {...register("message")} />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visit Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7763234727246!2d36.69972121475715!3d-1.3774712935833095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjInMzguOSJTIDM2wrA0MicwNi45IkU!5e0!3m2!1sen!2sus!4v1625581339750!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="mr-2" /> Explore Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Discover your dream home or investment opportunity with our extensive property listings.</p>
            <Button asChild>
              <Link href="/properties">View Properties</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ad className="mr-2" /> Advertise with Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Reach thousands of potential buyers and sellers by advertising your property or services with us.</p>
            <Button asChild>
              <Link href="/advertise">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

