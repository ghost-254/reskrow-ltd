'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Star, MessageCircle, Target, Compass } from 'lucide-react'

const teamMembers = [
  {
    name: "Charles Nyaoke",
    role: "CEO and Founder",
    image: "/charles-nyaoke.jpg",
    email: "charles@reskrow.com",
    bio: "With over 15 years of experience in real estate, Charles founded Reskrow with a vision to revolutionize property transactions through technology and transparency. His deep understanding of the industry's challenges and opportunities has been instrumental in shaping Reskrow's innovative approach to real estate services."
  },
  {
    name: "Neville Otieno",
    role: "Full Stack Developer",
    image: "/neville-otieno.jpg",
    email: "neville@reskrow.com",
    bio: "Neville brings cutting-edge web development skills to Reskrow, ensuring our platform remains at the forefront of real estate technology. With a passion for creating seamless user experiences and robust backend systems, Neville plays a crucial role in translating our vision into a powerful, user-friendly platform."
  }
]

const stats = [
  { label: "Properties Sold", value: "1000+" },
  { label: "Happy Clients", value: "5000+" },
  { label: "Years of Experience", value: "15+" },
  { label: "Cities Covered", value: "50+" }
]

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero Section */}
      <section className="mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
        >
          About Reskrow
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-center text-muted-foreground mb-6"
        >
          Revolutionizing Real Estate Through Technology and Trust
        </motion.p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Transforming Real Estate Since 2008
          </Badge>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mb-12">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary flex items-center">
              <Target className="mr-2" /> Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground mb-4">
              At Reskrow, our mission is to revolutionize the real estate industry by making property transactions seamless, secure, and accessible to everyone. We are committed to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Leveraging cutting-edge technology to simplify complex real estate processes</li>
              <li>Providing transparent and trustworthy services that empower both buyers and sellers</li>
              <li>Offering innovative solutions that address the unique challenges of the real estate market</li>
              <li>Ensuring the highest standards of security and privacy in all transactions</li>
              <li>Continuously improving our platform based on user feedback and industry trends</li>
            </ul>
            <p className="text-lg text-foreground mt-4">
              By focusing on these core principles, we aim to transform the way people buy, sell, and invest in properties, making the entire process as easy as a few clicks while maintaining the highest levels of integrity and professionalism.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Vision Statement */}
      <section className="mb-20">
        <Card className="bg-secondary/10 border-secondary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-secondary flex items-center">
              <Compass className="mr-2" /> Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground mb-4">
              Reskrow envisions a future where the real estate industry is fully digitized, democratized, and accessible to all. Our vision encompasses:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>A global real estate marketplace where geographical boundaries no longer limit property transactions</li>
              <li>Artificial intelligence and machine learning powering personalized property recommendations and market insights</li>
              <li>Blockchain technology ensuring unparalleled security and transparency in all transactions</li>
              <li>Virtual and augmented reality experiences allowing immersive property tours from anywhere in the world</li>
              <li>Sustainable and smart properties that integrate seamlessly with our platform, promoting eco-friendly living</li>
            </ul>
            <p className="text-lg text-foreground mt-4">
              We strive to be at the forefront of this transformation, leading the charge in creating a more efficient, transparent, and accessible real estate ecosystem for generations to come. Our vision drives us to continually innovate and push the boundaries of what's possible in the world of real estate.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-12" />

      {/* Stats Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-accent/10 border-accent/20 text-center">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-accent">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-8">
          These numbers reflect our commitment to excellence and the trust our clients place in us. We're proud of our achievements, but we're even more excited about the future and the continued positive impact we'll make in the real estate industry.
        </p>
      </section>

      {/* Additional Links Section */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/testimonials" passHref>
            <Card className="bg-secondary/10 border-secondary/20 cursor-pointer hover:bg-secondary/20 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-secondary">
                  <Star className="mr-2" /> Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">Discover the real experiences of our clients and how Reskrow has transformed their real estate journeys. From first-time homebuyers to seasoned investors, hear their stories and see why they choose Reskrow.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Testimonials</Button>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/faq" passHref>
            <Card className="bg-accent/10 border-accent/20 cursor-pointer hover:bg-accent/20 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-accent">
                  <MessageCircle className="mr-2" /> FAQs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">Have questions about our services, the buying or selling process, or how our technology works? Our comprehensive FAQ section provides in-depth answers to common queries, helping you navigate the world of real estate with confidence.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View FAQs</Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Real Estate Journey?</h2>
        <p className="text-xl mb-8 text-muted-foreground">
          Join Reskrow today and experience the future of property transactions. Whether you're buying, selling, or investing, our innovative platform and expert team are here to guide you every step of the way. Take the first step towards a seamless real estate experience.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Get Started Today</Link>
        </Button>
      </section>
    </div>
  )
}

