"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase/config";
import { PropertyCard } from "@/components/PropertyCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Link } from "lucide-react";

interface Property {
  id: string;
  title: string;
  images: string[];
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

interface Land {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: string;
  size: string;
  type: string;
  address: string;
  availability: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [lands, setLands] = useState<Land[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [loadingLands, setLoadingLands] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoadingProperties(true);
      try {
        const collectionRef = collection(db, "properties");
        const snapshot = await getDocs(collectionRef);
        const propertiesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Property[];
        setProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoadingProperties(false);
      }
    };

    const fetchLands = async () => {
      setLoadingLands(true);
      try {
        const collectionRef = collection(db, "lands");
        const snapshot = await getDocs(collectionRef);
        const landsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Land[];
        setLands(landsData);
      } catch (error) {
        console.error("Error fetching lands:", error);
      } finally {
        setLoadingLands(false);
      }
    };

    fetchProperties();
    fetchLands();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search properties..." />
        </div>
        <div>
          <Label htmlFor="type">Property Type</Label>
          <Select>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="land">Land</SelectItem>
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
              <SelectItem value="0-100000">$0 - $100,000</SelectItem>
              <SelectItem value="100000-250000">$100,000 - $250,000</SelectItem>
              <SelectItem value="250000-500000">$250,000 - $500,000</SelectItem>
              <SelectItem value="500000+">$500,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button className="w-full">Search</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {loadingProperties ? (
          <LoadingSpinner size={48} />
        ) : properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          properties.map((property) => (
            <PropertyCard
              link={`/properties/${property.id}`}
              key={property.id}
              id={property.id}
              image={property.images[0]}
              price={property.price}
              title={property.title}
              description={property.description}
            />
          ))
        )}
      </div>

      <h1 className="text-3xl font-bold mb-8">Lands</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loadingLands ? (
          <LoadingSpinner size={48} />
        ) : lands.length === 0 ? (
          <p>No lands found.</p>
        ) : (
          lands.map((land) => (
            <PropertyCard
              link={`/lands/${land.id}`}
              key={land.id}
              id={land.id}
              image={land.images[0]}
              price={Number(land.price)}
              title={land.name}
              description={land.description}
            />
          ))
        )}
      </div>
    </div>
  );
}
