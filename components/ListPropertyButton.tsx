'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ListPropertyButton() {
  return (
    <Button asChild variant="ghost">
      <Link href="/properties/create">List Property</Link>
    </Button>
  )
}

