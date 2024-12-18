'use client'

import React from "react"
import { Phone, Mail, MessageSquare, PhoneIcon as WhatsappIcon } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"

const ContactSection = () => {
  const handleCallNow = () => {
    window.open("tel:+254208000664", "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppChat = () => {
    window.open("https://wa.me/254715666140", "_blank", "noopener,noreferrer");
  };

  const handleEmailNow = () => {
    window.open("mailto:info@reskrow.com", "_blank", "noopener,noreferrer");
  };

  const handleAdvertNow = () => {
    window.open("mailto:adverts@reskrow.com", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact-us" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Left side */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <span className="text-orange-500 text-lg font-semibold">Our Contacts</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Easy to contact us</h2>
          <p className="text-gray-600 mb-8">
            We are always ready to help by providing the best services for you. We
            believe a good place to live or build a home can make your life better.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactMode
              icon={<Phone className="w-6 h-6" />}
              title="Call"
              info="+254 208000664"
              action={handleCallNow}
              buttonText="Call Now"
            />
            <ContactMode
              icon={<WhatsappIcon className="w-6 h-6" />}
              title="WhatsApp Chat"
              info="+254 715 666140"
              action={handleWhatsAppChat}
              buttonText="WhatsApp Chat Now"
            />
            <ContactMode
              icon={<Mail className="w-6 h-6" />}
              title="Email Us"
              info="info@reskrow.com"
              action={handleEmailNow}
              buttonText="Email Us Now!"
            />
            <ContactMode
              icon={<MessageSquare className="w-6 h-6" />}
              title="Advert Center"
              info="adverts@reskrow.com"
              action={handleAdvertNow}
              buttonText="Advertise with Us Now!"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/contact.jpg"
              alt="Contact Us"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface ContactModeProps {
  icon: React.ReactNode
  title: string
  info: string
  action: () => void
  buttonText: string
}

const ContactMode: React.FC<ContactModeProps> = ({ icon, title, info, action, buttonText }) => (
  <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
    <div className="flex items-center mb-4">
      <div className="bg-blue-100 p-2 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{info}</p>
      </div>
    </div>
    <Button
      onClick={action}
      className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-300"
    >
      {buttonText}
    </Button>
  </div>
)

export default ContactSection

