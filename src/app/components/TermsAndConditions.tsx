import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

const policyLinkClass =
  'text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors';

export function TermsAndConditions() {
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
          Terms and Conditions
        </h1>

        <p className="font-sans text-sm text-[#2B5142]/75 mb-12">
          Last updated: March 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Agreement
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              By placing an order through this website, you agree to the following terms.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Products
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              All Piantasia blends are handmade using natural botanicals.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Variations in texture, color, and composition may occur and are part of the nature of the product.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Use
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Piantasia products are intended for aromatic and decorative use only.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              We are not responsible for any use outside of this intended context.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Pricing
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              All prices are listed in EUR.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              According to §19 UStG (small business regulation), VAT is not charged.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Payment
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Payments are processed securely via Stripe.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Shipping
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Orders are prepared in small batches and shipped within a reasonable timeframe.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Delivery times may vary depending on location.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              For preparation times, carrier responsibility, and address accuracy, see our{' '}
              <Link to="/shipping-policy" className={policyLinkClass}>
                Shipping Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Returns
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Returns are accepted within 14 days of delivery, provided the product is unused and in its original condition.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Opened products cannot be returned for hygiene reasons.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              For how to start a return, contact details, and return shipping costs, see our{' '}
              <Link to="/return-policy" className={policyLinkClass}>
                Return Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Liability
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Piantasia is not liable for improper use of its products or for any indirect damages resulting from their use.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Applicable law
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              German law applies.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
