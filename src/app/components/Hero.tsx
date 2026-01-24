import { ChevronDown } from 'lucide-react';

// Hero background image - local asset
const forestImage = "/piantasia-bg-20260124.png";

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={forestImage} 
          alt="Forest background" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay mask for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

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
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="bg-white text-[#2B5142] px-10 py-5 rounded-full hover:bg-[#F5F2ED] transition-all transform hover:scale-105 shadow-2xl text-lg font-medium">
                Shop Now
              </button>
              <button className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full hover:bg-white hover:text-[#2B5142] transition-all text-lg font-medium">
                Learn Why
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce mt-8">
              <ChevronDown className="w-10 h-10 text-white/60 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}