const heroImage = "/piantasia-hero-bg-20260129.png";

export function Hero() {
  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-screen overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <div className="relative min-h-[70vh] md:min-h-screen w-full h-full overflow-hidden">
          <img 
            src={heroImage} 
            alt="Hero background" 
            className="w-full h-full object-cover animate-zoom-out"
          />
          {/* Dark overlay mask for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full min-h-[70vh] md:min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            {/* Tagline */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight tracking-tight">
              Unwind with Botanical Blends
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-white font-light mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto">
              Hand-crafted from selected dried plants, designed with balance in mind.
            </h2>

            {/* CTA Button */}
            <div className="flex justify-center items-center">
              <a 
                href="#products" 
                onClick={handleScrollToProducts}
                className="bg-transparent border-2 border-white text-white px-6 sm:px-8 md:px-10 py-2.5 md:py-3 rounded-lg hover:bg-white hover:text-[#2B5142] transition-all text-base md:text-lg font-medium inline-block"
              >
                Explore All Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
