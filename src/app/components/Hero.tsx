"use client";

import { ChevronDown } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from './ui/carousel';
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

// Array di immagini per il carousel
const heroImages = [
  "/carousel-1.png",
  "/carousel-2.png",
  "/carousel-3.png",
];

export function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Carousel Background */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className="absolute inset-0"
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full pl-0">
              <div className="relative h-screen w-full overflow-hidden">
                <img 
                  key={`${index}-${current}`} // Force re-render on slide change
                  src={image} 
                  alt={`Hero background ${index + 1}`} 
                  className="w-full h-full object-cover"
                  style={{
                    animation: current === index ? 'zoom-out 2s ease-out forwards' : 'none',
                    transform: 'scale(1.08)',
                  }}
                />
                {/* Dark overlay mask for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            {/* Tagline */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight tracking-tight">
              Natural herbal blends for a healthier alternative
            </h1>
            <h2 className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Discover our carefully crafted smoking substitutes made from organic herbs and botanicals
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-white text-[#2B5142] px-10 py-5 rounded-full hover:bg-[#F5F2ED] transition-all transform hover:scale-105 shadow-2xl text-lg font-medium">
                Shop Now
              </button>
              <button className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full hover:bg-white hover:text-[#2B5142] transition-all text-lg font-medium">
                Learn Why
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - positioned at bottom */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <ChevronDown className="w-10 h-10 text-white/60 mx-auto" />
        </div>
      </div>

      {/* Slide Indicators - positioned below viewport */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              current === index
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
