'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <Menu className="h-6 w-6" />
      </Button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/properties" className="text-foreground hover:text-primary">Properties</Link>
            <Link href="/rentals" className="text-foreground hover:text-primary">Rentals</Link>
            <Link href="/escrow" className="text-foreground hover:text-primary">Escrow</Link>
            <Link href="/contact" className="text-foreground hover:text-primary">Contact Us</Link>
          </nav>
        </div>
      )}
    </div>
  )
}

