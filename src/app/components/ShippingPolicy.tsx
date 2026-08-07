import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function ShippingPolicy() {
  useDocumentTitle('Shipping Policy | Piantasia');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />

      <main className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#2B5142]/75 hover:text-[#2B5142] transition-colors text-sm mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to homepage
        </Link>

        <h1 className="font-heading text-4xl lg:text-5xl text-[#2B5142] leading-tight mb-10">
          Shipping Policy
        </h1>

        <p className="font-sans text-sm text-[#2B5142]/75 mb-12">
          Last updated: March 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Preparation and dispatch
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Orders are prepared in small batches and shipped within a few working days.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Delivery times
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Shipping times may vary depending on the destination.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Carrier delays
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Once an order has been shipped, Piantasia is not responsible for delays caused by the carrier.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Shipping address
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Please ensure that your shipping information is correct at checkout.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Piantasia cannot be held responsible for lost shipments due to incorrect addresses.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
