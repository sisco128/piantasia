import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { ProductCard } from '@/app/components/ProductCard';
import { ProductPage } from '@/app/components/ProductPage';
import { CheckoutSuccess } from '@/app/components/CheckoutSuccess';
import { ReviewsCarousel } from '@/app/components/ReviewsCarousel';
import { ArticlesCarousel } from '@/app/components/ArticlesCarousel';
import { ArticlePage } from '@/app/components/ArticlePage';
import { BlogIndexPage } from '@/app/components/BlogIndexPage';
import { PrivacyPolicy } from '@/app/components/PrivacyPolicy';
import { ReturnPolicy } from '@/app/components/ReturnPolicy';
import { ShippingPolicy } from '@/app/components/ShippingPolicy';
import { TermsAndConditions } from '@/app/components/TermsAndConditions';
import { LegalNotice } from '@/app/components/LegalNotice';
import { Footer } from '@/app/components/Footer';
import { FaqSection } from '@/app/components/FaqSection';
import { products } from '@/data/products';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import { benefits } from '@/data/benefits';

function HomePage() {
  const location = useLocation();

  useDocumentTitle('Piantasia | Tobacco-Free Herbal Blends — Rethink the gesture');

  useEffect(() => {
    // Stripe cancel_url lands here; window.location (not router state) so the
    // replaceState cleanup also guards against StrictMode double-invoke.
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'cancelled') {
      toast('Checkout cancelled — your cart is saved.');
      params.delete('checkout');
      const query = params.toString();
      window.history.replaceState(
        null,
        '',
        window.location.pathname + (query ? `?${query}` : '') + window.location.hash
      );
    }
  }, []);

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && ['products', 'about', 'faq', 'contact'].includes(hash)) {
      const el = document.getElementById(hash);
      if (el) {
        const t = requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return () => cancelAnimationFrame(t);
      }
    }
    return undefined;
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />
      <Hero />

      {/* Benefits Section */}
      <section id="benefits" className="py-12 md:py-16 lg:py-20 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id} 
                className="bg-white p-4 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base text-[#2B5142] font-semibold">{benefit.title}</h3>
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-[#8B7BA8]/20 rounded-full text-[#2B5142] flex-shrink-0">
                    {benefit.icon}
                  </div>
                </div>
                <p className="text-sm text-[#2B5142]/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsCarousel />

      {/* Products Section */}
      <section id="products" className="scroll-mt-16 md:scroll-mt-20 py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B5142] mb-3 md:mb-4">A blend for every ritual</h2>
            <p className="text-base md:text-lg text-[#2B5142]/70 max-w-2xl mx-auto">
              Explore blends for different moments and intentions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section — two alternating blocks */}
      <section id="about" className="scroll-mt-16 md:scroll-mt-20 py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#8B7BA8]/10 to-[#C67C4F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
          {/* Block 1: text left, image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#2B5142] mb-4 md:mb-6">
                About Piantasia
              </h2>
              <p className="text-base md:text-lg text-[#2B5142]/80 mb-4 md:mb-6">
                Piantasia was born from the desire to revisit a gesture: I wanted to transform something automatic into something intentional.
                To keep the pleasure of the ritual, but make it chosen rather than conditioned.
              </p>
              <p className="text-base md:text-lg text-[#2B5142]/80 mb-4 md:mb-6">
                That curiosity led me to explore dried plants, textures and aromas, and how different leaves could interact with each other.
                What began as personal experimentation slowly started to resonate with others, sparking interest and conversation.
              </p>
              <p className="text-base md:text-lg text-[#2B5142]/80">
                That response encouraged me to expand the project and make these blends available beyond my own circle.
              </p>
            </div>
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/home-about-1.png"
                alt="About Piantasia"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Block 2: image left, text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/home-about-2.png"
                alt="The name Piantasia"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#2B5142] mb-4 md:mb-6">
                The name
              </h2>
              <p className="text-base md:text-lg text-[#2B5142]/80 mb-4 md:mb-6">
                The name Piantasia brings together two words:
                Pianta, the Italian word for plant, and Fantasia, meaning imagination.
                Together they represent a playful yet intentional exploration of the botanical world.
              </p>
              <p className="text-base md:text-lg text-[#2B5142]/80 mb-4 md:mb-6">
                The name is also a quiet tribute to Mother Earth&apos;s Plantasia by Mort Garson, an album that captures a dreamy, open landscape where imagination can move freely.
                That same sense of soft, boundless exploration lives at the core of this project.
              </p>
              <p className="text-base md:text-lg text-[#2B5142]/80">
                Piantasia is about redefining a gesture. Not removing it, not judging it, but transforming it into something lighter and more conscious.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-16 md:scroll-mt-20 py-16 md:py-20 lg:py-28 bg-white">
        <div className="max-w-[640px] mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#2B5142] mb-4 md:mb-6">
            Get in touch
          </h2>
          <p className="font-sans text-base md:text-lg text-[#2B5142]/60 mb-8 md:mb-10">
            Reach out on Instagram or write to hello@piantasia.eu
          </p>
          <a
            href="https://www.instagram.com/Piantasia.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#2B5142] text-white font-sans text-base font-medium px-10 py-4 rounded-full hover:bg-[#1F3B2F] transition-colors"
          >
            Message us on Instagram
          </a>
        </div>
      </section>

      {/* Blog Section */}
      <ArticlesCarousel />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<ArticlePage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/legal-notice" element={<LegalNotice />} />
    </Routes>
  );
}