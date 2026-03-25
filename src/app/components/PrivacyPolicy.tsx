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
          Last updated: March 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              General information
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              This website is operated by Piantasia.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              We take the protection of your personal data seriously. Personal data is processed in accordance with applicable data protection laws (GDPR).
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Data collection
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              When you place an order, personal data such as name, email address, and shipping information is collected.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Payments
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Payments are processed via Stripe. We do not store any payment details.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Please refer to{' '}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors"
              >
                Stripe&apos;s privacy policy
              </a>{' '}
              for more information.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Contact
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              If you contact us via email, your information will be stored for the purpose of processing your request.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Your rights
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              You have the right to access, correct, or delete your personal data at any time.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              For any privacy-related inquiries, please contact:{' '}
              <a
                href="mailto:annalisa@piantasia.eu"
                className="text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors"
              >
                annalisa@piantasia.eu
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
