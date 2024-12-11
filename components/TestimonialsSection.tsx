'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCreative } from 'swiper/modules';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatarText: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Charles Nyaoke',
    avatarText: 'CN',
    text: 'Reskrow made buying my first home a breeze! The platform was easy to use, and their escrow service gave me peace of mind throughout the entire process. Highly recommend!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Neville Otieno',
    avatarText: 'NO',
    text: 'Selling my property through Reskrow was a fantastic experience. Their team was professional, responsive, and the escrow service ensured a secure and timely transaction.',
    rating: 4,
  },
  {
    id: '3',
    name: 'Brenda Cheruiyot',
    avatarText: 'BC',
    text: 'Reskrow simplified the complexities of real estate transactions. Their escrow service was invaluable, providing security and transparency throughout the process.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Dennis Oliech',
    avatarText: 'DO',
    text: 'I was impressed by the professionalism and efficiency of the Reskrow team. They made selling my property a stress-free experience.',
    rating: 4,
  },
  {
    id: '5',
    name: 'Esther Achieng',
    avatarText: 'EA',
    text: 'Reskrow is a game-changer in the real estate industry. Their platform is user-friendly, and their escrow service is top-notch.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Felix Omondi',
    avatarText: 'FO',
    text: 'I highly recommend Reskrow for anyone looking to buy or sell property. Their escrow service provides peace of mind and ensures a smooth transaction.',
    rating: 4,
  },
  {
    id: '7',
    name: 'Grace Wanjiku',
    avatarText: 'GW',
    text: 'Reskrow exceeded my expectations. Their team was knowledgeable, helpful, and the escrow service made the entire process seamless.',
    rating: 5,
  },
  {
    id: '8',
    name: 'Hillary Kiptoo',
    avatarText: 'HK',
    text: 'I had a great experience using Reskrow to buy my investment property. Their platform is intuitive, and their escrow service is reliable.',
    rating: 4,
  },
  {
    id: '9',
    name: 'Irene Awino',
    avatarText: 'IA',
    text: 'Reskrow made selling my property so much easier than I anticipated. Their team was supportive, and the escrow service ensured a secure transaction.',
    rating: 5,
  },
  {
    id: '10',
    name: 'James Mwangi',
    avatarText: 'JM',
    text: 'I am extremely satisfied with Reskrow\'s services. Their platform is innovative, and their escrow service is trustworthy.',
    rating: 4,
  },
];

export const TestimonialsSection: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">What Our Clients Say</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCreative]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop          
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-120%', 0, -500],
            },
            next: {
              translate: ['120%', 0, -500],
            },
          }}
          breakpoints={{
            640: { slidesPerView: 1.2, spaceBetween: 20 },
            768: { slidesPerView: 2.4, spaceBetween: 32 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="w-full max-w-5xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative overflow-hidden">
                <div className="flex items-center mb-4 space-x-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.avatarText}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-base md:text-lg">{testimonial.text}</p>
                <div className="absolute inset-0 rounded-lg border-2 border-primary/50 pointer-events-none animate-pulse"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

