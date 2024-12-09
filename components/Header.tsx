import Link from 'next/link'
import { Button } from './ui/button'
import { UserNav } from './UserNav'
import { ThemeSwitcher } from './ThemeSwitcher'
import { createClient } from '@/utils/supabase/server'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileMenu } from './MobileMenu';
import { FiMenu, FiX } from 'react-icons/fi'

export default async function Header() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Reskrow
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
            <Link href="/sell" className="text-foreground hover:text-primary">Sell</Link>
            <Link href="/escrow" className="text-foreground hover:text-primary">Escrow</Link>
            <Link href="/contact" className="text-foreground hover:text-primary">Contact Us</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button asChild variant="ghost">
                  <Link href="/properties/create">List Property</Link>
                </Button>
                <ThemeSwitcher />
                <UserNav user={user} />
              </>
            ) : (
              <Button asChild variant="outline">
                <Link href="/auth">Sign Up / Sign In</Link>
              </Button>
            )}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

