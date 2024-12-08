import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
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
  )
}

