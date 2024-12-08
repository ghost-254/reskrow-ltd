import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function RentalsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Rentals</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search rentals..." />
        </div>
        <div>
          <Label htmlFor="type">Property Type</Label>
          <Select>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">Price Range</Label>
          <Select>
            <SelectTrigger id="price">
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1000">$0 - $1,000 / month</SelectItem>
              <SelectItem value="1000-2000">$1,000 - $2,000 / month</SelectItem>
              <SelectItem value="2000-3000">$2,000 - $3,000 / month</SelectItem>
              <SelectItem value="3000+">$3,000+ / month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button className="w-full">Search</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rental property cards will be rendered here */}
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Sample Rental Property</h2>
          <p className="text-gray-600 mb-4">2 bed, 1 bath | 800 sqft</p>
          <p className="text-lg font-bold mb-4">$1,500 / month</p>
          <Button>View Details</Button>
        </div>
      </div>
    </div>
  )
}

