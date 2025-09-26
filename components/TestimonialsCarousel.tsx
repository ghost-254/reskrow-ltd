"use client"

import { useState, useEffect } from "react"
import { FaStar } from "react-icons/fa"

const testimonials = [
  {
    text: "Reskrow made our home purchase incredibly smooth. The transparency and speed were amazing!",
    author: "Sarah M.",
    role: "Recent Home Buyer",
  },
  {
    text: "The digital escrow process saved us weeks compared to traditional methods. Highly recommend!",
    author: "Michael R.",
    role: "First-Time Buyer",
  },
  {
    text: "Selling our property was stress-free with Reskrow. The real-time updates kept us informed throughout.",
    author: "Jennifer L.",
    role: "Property Seller",
  },
  {
    text: "As a real estate agent, I've used many escrow services. Reskrow is by far the most efficient.",
    author: "David K.",
    role: "Real Estate Agent",
  },
  {
    text: "The fee calculator was spot-on and there were no hidden surprises. Very transparent pricing.",
    author: "Amanda T.",
    role: "Home Seller",
  },
  {
    text: "Customer support was exceptional. They answered all our questions within minutes.",
    author: "Robert P.",
    role: "Investment Property Buyer",
  },
  {
    text: "The mobile app made it easy to track our escrow progress on the go. Very convenient!",
    author: "Lisa H.",
    role: "Relocating Buyer",
  },
  {
    text: "Closed our refinance in record time. The digital document signing was seamless.",
    author: "Carlos M.",
    role: "Homeowner",
  },
  {
    text: "Reskrow's security features gave us complete peace of mind during our transaction.",
    author: "Emily S.",
    role: "Luxury Home Buyer",
  },
  {
    text: "The step-by-step guidance made the complex escrow process easy to understand.",
    author: "James W.",
    role: "First-Time Seller",
  },
  {
    text: "Fastest escrow closing I've ever experienced. The team was professional and efficient.",
    author: "Maria G.",
    role: "Real Estate Investor",
  },
  {
    text: "The automated updates and notifications kept everyone in the loop. No more phone tag!",
    author: "Thomas B.",
    role: "Commercial Property Buyer",
  },
  {
    text: "Saved thousands in fees compared to traditional escrow companies. Great value!",
    author: "Rachel D.",
    role: "Condo Seller",
  },
  {
    text: "The integration with our lender made the process incredibly smooth and coordinated.",
    author: "Kevin J.",
    role: "Home Buyer",
  },
  {
    text: "24/7 access to documents and status updates was a game-changer for our busy schedule.",
    author: "Nicole F.",
    role: "Working Professional",
  },
  {
    text: "The escrow team caught potential issues early and resolved them quickly. True professionals.",
    author: "Steven C.",
    role: "Property Developer",
  },
  {
    text: "Multiple property transactions made easy with Reskrow's portfolio management features.",
    author: "Patricia A.",
    role: "Real Estate Investor",
  },
  {
    text: "The environmental impact of going paperless was important to us. Reskrow delivered perfectly.",
    author: "Daniel O.",
    role: "Eco-Conscious Buyer",
  },
  {
    text: "International transaction support made our overseas property purchase possible and simple.",
    author: "Yuki T.",
    role: "International Buyer",
  },
  {
    text: "The detailed analytics and reporting helped us make informed decisions throughout the process.",
    author: "Michelle V.",
    role: "Corporate Real Estate Manager",
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center justify-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>

      <div className="transition-all duration-500 ease-in-out">
        <blockquote className="text-lg italic text-muted-foreground min-h-[3rem] flex items-center justify-center text-center">
          "{currentTestimonial.text}"
        </blockquote>
        <cite className="text-sm text-muted-foreground/75 mt-2 block text-center">
          - {currentTestimonial.author}, {currentTestimonial.role}
        </cite>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-1 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
