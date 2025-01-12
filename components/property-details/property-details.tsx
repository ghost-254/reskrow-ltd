"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase/config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "../LoadingSpinner";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

interface Property {
  id: string;
  title: string;
  images: string[];
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: {
    lat: number;
    lng: number;
  };
}

export default function PropertyDetails({ id }: { id: string }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() } as Property);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // if (!property) {
  //   return <div>Property not found</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-12">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">
            {property && property.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="relative h-96 mb-4">
                <Image
                  src={selectedImage || property!.images[0]}
                  alt={property!.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {property!.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="relative h-24">
                    <Image
                      src={image}
                      alt={`${property!.title} - Image ${index + 2}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      onClick={() => setSelectedImage(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    ${property!.price.toLocaleString()}
                  </h2>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-semibold">{property!.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-semibold">{property!.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-semibold">{property!.area} sq ft</p>
                    </div>
                  </div>
                  <p className="mb-4">{property!.description}</p>
                  <Button className="w-full">Contact Agent</Button>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <LeafletMap
                      center={[property!.location.lat, property!.location.lng]}
                      zoom={20}
                      markerPosition={[
                        property!.location.lat,
                        property!.location.lng,
                      ]}
                      addressInput={null}
                      showSearch={false}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
