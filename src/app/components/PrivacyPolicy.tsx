import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

export function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        <p className="font-sans text-sm text-[#2B5142]/75 mb-12">
          Last updated: February 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Overview
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Piantasia ("we", "us", "our") respects your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data. We are committed to minimal data collection and do not use any tracking, analytics, or advertising technologies on our website.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              What we collect
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Our website does not collect any personal data. We do not use cookies, analytics tools, tracking pixels, or any form of user monitoring.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              The only moment personal data is processed is when you make a purchase. At that point, you are redirected to Stripe, our payment processor, who handles the transaction securely on their platform.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Payment processing
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              We use Stripe to process all payments. When you click a purchase link on our product pages, you are taken to a Stripe-hosted checkout page. Stripe collects the information necessary to complete your transaction, including your name, email address, shipping address, and payment details.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Stripe processes this data in accordance with their own privacy policy. We receive only the information needed to fulfill your order (name, shipping address, email, and order details). We do not store your payment card information. For more details, see{' '}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors"
              >
                Stripe's Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              How we use your data
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              The order information we receive from Stripe is used solely to fulfill and ship your order, communicate with you about your purchase, and comply with legal obligations. We do not use your data for marketing purposes unless you explicitly opt in.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Data sharing
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              We do not sell, trade, or share your personal data with third parties, except as necessary to fulfill your order (e.g., shipping carriers) or as required by law.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Your rights
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Under the General Data Protection Regulation (GDPR), you have the right to access, correct, or delete any personal data we hold about you. You may also request a copy of your data or ask us to restrict its processing. To exercise any of these rights, please contact us via Instagram at{' '}
              <a
                href="https://www.instagram.com/Piantasia.eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors"
              >
                @Piantasia.eu
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Changes to this policy
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
