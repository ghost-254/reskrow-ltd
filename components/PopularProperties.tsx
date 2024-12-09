import { PropertySlider } from './PropertySlider'

const residentials = [
  {
    id: '1',
    image: '/resd1.jpg',
    price: 20000,
    title: 'Modern Marvel Estate',
    description: 'A contemporary haven offering breathtaking architectural design and luxury amenities in Paradise Valley.',
  },
  {
    id: '2',
    image: '/resd2.jpg',
    price: 12000,
    title: 'Cedar Ridge Manor',
    description: 'Charming countryside residence surrounded by lush greenery and peaceful landscapes.',
  },
  {
    id: '3',
    image: '/resd3.jpg',
    price: 70000,
    title: 'Summerhill Estate',
    description: 'Elegant hillside property featuring stunning views and plenty of space for your dream home.',
  },
  {
    id: '4',
    image: '/resd4.jpg',
    price: 80000,
    title: 'Riverstone Manor',
    description: 'Luxurious riverside retreat with expansive grounds and picturesque water views.',
  },
  {
    id: '5',
    image: '/resd5.webp',
    price: 82000,
    title: 'Kingstown Palace',
    description: 'Grand estate with regal charm, offering panoramic city views and sophisticated living spaces.',
  },
]

const commercials = [
  {
    id: '1',
    image: '/comm1.webp',
    price: 1015000,
    title: 'Downtown Office Tower',
    description: 'Luxurious office suites with panoramic city views in the bustling downtown area.',
  },

  {
    id: '2',
    image: '/comm2.webp',
    price: 3150090,
    title: 'H-Town Tower',
    description: 'Modern commercial space designed for corporate excellence, located in a prime urban hub.',
  },

  {
    id: '3',
    image: '/comm4.jpg',
    price: 5785000,
    title: 'South Avenue Office Tower',
    description: 'Elegant business space with high-tech facilities and easy access to major transport links.',
  },

  {
    id: '4',
    image: '/comm5.jpg',
    price: 3190500,
    title: 'Killtown Tower',
    description: 'Sophisticated office spaces tailored for professionals, located in a thriving commercial zone.',
  },

  {
    id: '5',
    image: '/comm6.jpeg',
    price: 5410090,
    title: 'North Avenue Office Tower',
    description: 'State-of-the-art commercial property offering premium amenities in a prestigious location.',
  },
]

const industrials = [
  {
    id: '1',
    image: '/indus1.jpeg',
    price: 3031005,
    title: 'High-Capacity Logistics Hub',
    description: 'Expansive warehouse with modern amenities and proximity to major transportation routes.',
  },

  {
    id: '2',
    image: '/indus2.jpg',
    price: 3486000,
    title: 'Advanced Manufacturing Facility',
    description: 'A versatile industrial space designed for manufacturing and production with cutting-edge infrastructure.',
  },

  {
    id: '3',
    image: '/indus3.webp',
    price: 30926400,
    title: 'Strategic Distribution Center',
    description: 'Perfectly located distribution center with seamless access to key trade routes.',
  },

  {
    id: '4',
    image: '/indus4.webp',
    price: 1453000,
    title: 'Versatile Storage Complex',
    description: 'Multi-functional storage facility with customizable space for a variety of industrial needs.',
  },

  {
    id: '5',
    image: '/indus5.jpeg',
    price: 31369000,
    title: 'Premium Industrial Plot',
    description: 'Spacious industrial land with pre-installed utilities, ready for custom development.',
  },
]


const lands = [
  {
    id: '1',
    image: '/raw1.jpg',
    price: 109500,
    title: 'Scenic Countryside Acreage',
    description: 'A perfect location for a serene retreat, nestled amidst rolling hills and lush greenery.',
  },

  {
    id: '2',
    image: '/raw2.jpg',
    price: 116500,
    title: 'Commercial Corner Plot',
    description: 'High-visibility corner lot ideal for retail or business development in a bustling area.',
  },

  {
    id: '3',
    image: '/raw3.jpg',
    price: 150810,
    title: 'Waterfront Paradise',
    description: 'Breathtaking land with direct access to a tranquil lake, ideal for luxury residential development.',
  },

  {
    id: '4',
    image: '/raw4.jpeg',
    price: 351500,
    title: 'Urban Development Gem',
    description: 'Prime land in a thriving urban hub, perfect for mixed-use or high-rise projects.',
  },

  {
    id: '5',
    image: '/raw5.jpg',
    price: 1145090,
    title: 'Sprawling Agricultural Land',
    description: 'Expansive farmland offering fertile soil and abundant space for agricultural ventures.',
  },
]

export function PopularProperties() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="space-y-16">
        <PropertySlider title="Popular Residencies" properties={residentials} />
        <PropertySlider title="Popular Commercial Properties" properties={commercials} />
        <PropertySlider title="Popular Industrial Properties" properties={industrials} />
        <PropertySlider title="Popular Land Properties" properties={lands} />
      </div>
    </section>
  )
}

