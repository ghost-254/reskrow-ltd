'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsPropertiesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleProperties = () => setIsPropertiesOpen(!isPropertiesOpen)

  const closeMenu = () => {
    setIsOpen(false)
    setIsPropertiesOpen(false)
  }

  return (
    <div className="md:hidden" ref={menuRef}>
      <Button variant="ghost" size="icon" onClick={toggleMenu} className="focus:outline-none">
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </Button>
      <div 
        className={`absolute top-16 left-0 right-0 bg-background border-b shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col">
          <div className="border-b">
            <button
              onClick={toggleProperties}
              className="flex justify-between items-center w-full p-4 text-foreground hover:text-primary hover:bg-muted/50"
            >
              Properties
              {isPropertiesOpen ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
            </button>
            {isPropertiesOpen && (
              <div className="bg-muted/30 pl-8">
                <Link href="/properties" className="block p-4 text-foreground hover:text-primary" onClick={closeMenu}>View Properties</Link>
                <Link href="/properties/residentials" className="block p-4 text-foreground hover:text-primary" onClick={closeMenu}>Residential</Link>
                <Link href="/properties/commercials" className="block p-4 text-foreground hover:text-primary" onClick={closeMenu}>Commercial</Link>
                <Link href="/properties/industrials" className="block p-4 text-foreground hover:text-primary" onClick={closeMenu}>Industrial</Link>
                <Link href="/properties/lands" className="block p-4 text-foreground hover:text-primary" onClick={closeMenu}>Raw Land</Link>
              </div>
            )}
          </div>
          <Link href="/rent" className="p-4 text-foreground hover:text-primary hover:bg-muted/50" onClick={closeMenu}>Rent</Link>
          <Link href="/buy" className="p-4 text-foreground hover:text-primary hover:bg-muted/50" onClick={closeMenu}>Buy</Link>
          <Link href="/sell" className="p-4 text-foreground hover:text-primary hover:bg-muted/50" onClick={closeMenu}>Sell</Link>
          <Link href="/escrow" className="p-4 text-foreground hover:text-primary hover:bg-muted/50" onClick={closeMenu}>Escrow</Link>
          <Link href="/contact" className="p-4 text-foreground hover:text-primary hover:bg-muted/50" onClick={closeMenu}>Contact Us</Link>
        </nav>
      </div>
    </div>
  )
}

