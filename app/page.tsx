//app/page.tsx

'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { LogoSlider } from '@/components/LogoSlider';
import { PopularProperties } from '@/components/PopularProperties';
import ContactSection from '@/components/ContactSection';
import Advertise from '@/components/Advertise';
import ValueSection from '@/components/ValueSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Reskrow Real Estate</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Find Your Dream Home</h2>
            <p className="mb-4">Browse through our extensive list of properties and find the perfect home for you and your family.</p>
            <Button asChild>
              <Link href="/properties">View Properties</Link>
            </Button>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">List Your Property</h2>
            <p className="mb-4">Are you a property owner? List your property with us and reach thousands of potential buyers or tenants.</p>
            <Button asChild>
              <Link href="/properties/create">List Property</Link>
            </Button>
          </div>
        </div>
      </div>

      <section className="bg-primary/5 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold leading-tight text-primary dark:text-white">
                  Discover Online<br />
                  Real Estate<br />
                  Marketplace
                </h2>
                <p className="text-lg text-muted-foreground max-w-md">
                  Explore a wide range of properties tailored to your needs, backed by trusted escrow support.
                </p>
                <p className="text-accent">
                  We hold your funds in trust until the seller delivers –<br />
                  say goodbye to scams and enjoy a secure, hassle-free transaction.
                </p>
              </div>

              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title/city/country"
                  className="pl-10 pr-20"
                />
                <Button className="absolute right-0 top-0 bottom-0 rounded-l-none">
                  Search
                </Button>
              </div>

              <div ref={ref} className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-4xl font-bold text-primary">
                    <CountUp end={9000} duration={2.5} start={inView ? 0 : undefined} />
                    <span className="text-accent">+</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Premium Products</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">
                    <CountUp end={5000} duration={2.5} start={inView ? 0 : undefined} />
                    <span className="text-accent">+</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">
                    <CountUp end={28} duration={2.5} start={inView ? 0 : undefined} />
                    <span className="text-accent">+</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Awards Winning</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-tl-[80px] rounded-tr-[80px]">
                <Image
                  src="/hero.png"
                  alt="Modern architectural building"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-tl-[80px] rounded-tr-[80px] bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <LogoSlider />
      <PopularProperties />
      <Advertise />
      <ValueSection />
      <ContactSection />
      <TestimonialsSection />
    </div>
  )
}

