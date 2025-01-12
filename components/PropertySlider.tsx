"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { PuffLoader } from "react-spinners";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Property {
  id: string;
  image: string;
  price: number;
  title: string;
  description: string;
}

interface PropertySliderProps {
  title: string;
  properties: Property[];
  isLoading?: boolean;
  isError?: boolean;
}

export function PropertySlider({
  title,
  properties,
  isLoading = false,
  isError = false,
}: PropertySliderProps) {
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-60vh">
        <PuffLoader color="#4066ff" size={80} />
      </div>
    );
  }

  return (
    <div className="r-wrapper">
      <div className="r-container">
        <div className="r-head mb-6">
          <span className="text-orange-500 text-lg">Best Choices</span>
          <h2 className="text-2xl font-bold text-indigo-900">{title}</h2>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="relative"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <PropertyCard
                image={property.image}
                price={property.price}
                title={property.title}
                description={property.description}
                id={""}
                link={""}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev absolute left-0 top-1/2 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
            <ChevronLeft className="h-6 w-6 text-indigo-900" />
          </div>
          <div className="swiper-button-next absolute right-0 top-1/2 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
            <ChevronRight className="h-6 w-6 text-indigo-900" />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
