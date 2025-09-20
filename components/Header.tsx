'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { UserNav } from './UserNav'
import { ThemeSwitcher } from './ThemeSwitcher'
import { auth } from '@/utils/firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileMenu } from './MobileMenu';

export default function Header() {
  const [user, loading] = useAuthState(auth);

  return (
    <header className="bg-background border-b relative z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Reskrow Logo"
                width={120}
                height={40}
                className="h-8 w-auto dark:brightness-0 dark:invert"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary">
                Properties <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/properties">View Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/properties/residentials">Residential</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/properties/commercials">Commercial</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/properties/industrials">Industrial</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/properties/lands">Raw Land</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/rent" className="text-foreground hover:text-primary">Rent</Link>
            <Link href="/buy" className="text-foreground hover:text-primary">Buy</Link>
            <Link href="/escrow" className="text-foreground hover:text-primary">Escrow</Link>
            <Link href="/contact" className="text-foreground hover:text-primary">Contact Us</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {!loading && (user ? (
              <>
                <Button asChild variant="ghost">
                  <Link href="/properties/create">List Property</Link>
                </Button> 
                <UserNav user={user} />
              </>
            ) : (
              <Button asChild variant="outline">
                <Link href="/auth">Sign Up / Sign In</Link>
              </Button>
            ))}
            <ThemeSwitcher />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

