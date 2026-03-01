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
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[50vh] md:min-h-[70vh]">
      {/* Left column — copy */}
      <div className="bg-[#F5F2ED] flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 md:py-16 order-1">
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-[#2B5142] mb-4 sm:mb-6 leading-tight tracking-tight text-left">
            Rethink the gesture
          </h1>
          <h2 className="font-sans text-lg sm:text-xl md:text-2xl text-[#2B5142] font-light mb-6 sm:mb-8 md:mb-12 text-left">
            Tobacco free herbal blends designed to turn a habit into a ritual.
          </h2>
          <div className="flex justify-start">
            <a
              href="#products"
              onClick={handleScrollToProducts}
              className="inline-flex items-center justify-center bg-[#2B5142] text-white font-sans text-base font-medium px-10 py-4 rounded-full hover:bg-[#1F3B2F] transition-colors"
            >
              Explore All Products
            </a>
          </div>
        </div>
      </div>

      {/* Right column — image */}
      <div className="relative min-h-[50vh] md:min-h-[70vh] h-full overflow-hidden order-2">
        <img
          src={heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover animate-zoom-out"
        />
      </div>
    </section>
  );
}
