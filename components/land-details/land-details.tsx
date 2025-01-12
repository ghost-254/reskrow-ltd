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

interface Land {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: string;
  size: string;
  type: string;
  address: string;
  availability: string; // Lease or for sale
  location: {
    lat: number;
    lng: number;
  };
}

export default function LandDetails({ id }: { id: string }) {
  const [land, setLand] = useState<Land | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLand = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "lands", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLand({ id: docSnap.id, ...docSnap.data() } as Land);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching land:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLand();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-12">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">{land && land.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="relative h-96 mb-4">
                <Image
                  src={selectedImage || land!.images[0]}
                  alt={land!.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {land!.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="relative h-24">
                    <Image
                      src={image}
                      alt={`${land!.name} - Image ${index + 2}`}
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
                    ${Number(land!.price).toLocaleString()}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="font-semibold">{land!.size} acres</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-semibold">{land!.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Availability</p>
                      <p className="font-semibold">{land!.availability}</p>
                    </div>
                  </div>
                  <p className="mb-4">{land!.description}</p>
                  <Button className="w-full">Contact Agent</Button>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <LeafletMap
                      center={[land!.location.lat, land!.location.lng]}
                      zoom={20}
                      markerPosition={[land!.location.lat, land!.location.lng]}
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
