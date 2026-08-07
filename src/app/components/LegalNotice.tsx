import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function LegalNotice() {
  useDocumentTitle('Legal Notice | Piantasia');

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
          Legal Notice
        </h1>

        <p className="font-sans text-sm text-[#2B5142]/75 mb-12">
          Last updated: March 2026
        </p>

        <div className="space-y-10">
          <section>
            <p className="font-sans text-lg font-medium text-[#2B5142] mb-2">Piantasia</p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              A botanical project by
              <br />
              Annalisa Castellari
            </p>
            <address className="font-sans text-base text-[#2B5142]/80 leading-relaxed not-italic">
              Oberlandstr 2
              <br />
              12099 Berlin
              <br />
              Germany
            </address>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mt-4">
              Contact:{' '}
              <a
                href="mailto:annalisa@piantasia.eu"
                className="text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors"
              >
                annalisa@piantasia.eu
              </a>
            </p>
          </section>

          <hr className="border-[#2B5142]/15" />

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Responsible for content
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Annalisa Castellari
            </p>
            <address className="font-sans text-base text-[#2B5142]/80 leading-relaxed not-italic">
              Oberlandstr 2
              <br />
              12099 Berlin
              <br />
              Germany
            </address>
          </section>

          <hr className="border-[#2B5142]/15" />

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              VAT notice
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              This business operates under the small business regulation (§19 UStG).
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              VAT is not charged.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
