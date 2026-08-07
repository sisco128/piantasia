import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function ReturnPolicy() {
  useDocumentTitle('Return Policy | Piantasia');

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
          Return Policy
        </h1>

        <p className="font-sans text-sm text-[#2B5142]/75 mb-12">
          Last updated: March 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Return window
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              You can request a return within 14 days of receiving your order.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              How to start a return
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              To initiate a return, contact us at:{' '}
              <a
                href="mailto:annalisa@piantasia.eu"
                className="text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors"
              >
                annalisa@piantasia.eu
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Condition of items
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Items must be unused and in their original condition.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Due to the nature of the products, opened items cannot be returned.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Shipping
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Return shipping costs are the responsibility of the customer.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
