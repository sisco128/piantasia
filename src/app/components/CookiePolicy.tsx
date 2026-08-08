import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import { openCookiePreferences } from '@/lib/consent';

export function CookiePolicy() {
  useDocumentTitle('Cookie Policy | Piantasia');

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
          Cookie Policy
        </h1>

        <p className="font-sans text-sm text-[#2B5142]/75 mb-12">
          Last updated: August 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              What cookies are
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              Cookies are small files a website stores in your browser. Some are needed for the site to work at all; others tell the site something about how it is being used.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              We only use two kinds, described below. Nothing beyond the strictly necessary ones is set until you agree.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Strictly necessary
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              These make the shop function. They remember what you have put in your cart and which shipping country you selected, and they store the cookie choice you make so we do not ask again on every page. They contain no personal data and are not shared with anyone.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Your cart is kept in your browser&apos;s local storage. Your consent choice is stored in a cookie named{' '}
              <code className="font-mono text-sm text-[#2B5142]">cc_cookie</code>, which lasts six months. Because these are required for a service you asked for, they do not need your consent — and they cannot be switched off.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Analytics
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-4">
              With your consent we use Google Analytics 4, loaded through Google Tag Manager, to see which pages and blends people look at and where they lose interest. We use it to improve the shop — not to build a profile of you, and not for advertising. Advertising and personalisation signals are switched off.
            </p>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-6">
              If you decline, these cookies are never set, and any previously set ones are deleted. Google may still receive an anonymous, cookie-free signal that a page was viewed; it cannot be tied to you or to your other visits.
            </p>

            <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[480px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#2B5142]/15">
                    <th className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 font-medium py-3 pr-4">
                      Cookie
                    </th>
                    <th className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 font-medium py-3 pr-4">
                      Duration
                    </th>
                    <th className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 font-medium py-3">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#2B5142]/10">
                    <td className="font-mono text-sm text-[#2B5142] py-4 pr-4 align-top">_ga</td>
                    <td className="font-sans text-sm text-[#2B5142]/80 py-4 pr-4 align-top">2 years</td>
                    <td className="font-sans text-sm text-[#2B5142]/80 py-4 align-top">
                      Distinguishes one visitor from another.
                    </td>
                  </tr>
                  <tr className="border-b border-[#2B5142]/10">
                    <td className="font-mono text-sm text-[#2B5142] py-4 pr-4 align-top">
                      _ga_TVBY8TXE8J
                    </td>
                    <td className="font-sans text-sm text-[#2B5142]/80 py-4 pr-4 align-top">2 years</td>
                    <td className="font-sans text-sm text-[#2B5142]/80 py-4 align-top">
                      Keeps track of the current visit.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mt-6">
              Both are set by Google. See{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors"
              >
                Google&apos;s privacy policy
              </a>{' '}
              for how they handle the data.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Payments
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Checkout happens on Stripe&apos;s own pages, not ours, so Stripe sets no cookies on piantasia.eu. Once you are redirected there, Stripe&apos;s own policies apply — see our{' '}
              <Link
                to="/privacy"
                className="text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Changing your mind
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed mb-6">
              You can change or withdraw your consent whenever you like — there is a “Cookie settings” link at the bottom of every page, or use the button below. Withdrawing it deletes the analytics cookies straight away. You can also clear cookies in your browser&apos;s own settings.
            </p>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="inline-flex items-center justify-center bg-[#2B5142] text-white font-sans text-base font-medium px-8 py-3 rounded-full hover:bg-[#1F3B2F] transition-colors"
            >
              Cookie settings
            </button>
          </section>

          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-4">
              Questions
            </h2>
            <p className="font-sans text-base text-[#2B5142]/80 leading-relaxed">
              Write to{' '}
              <a
                href="mailto:annalisa@piantasia.eu"
                className="text-[#8B7BA8] hover:text-[#2B5142] underline transition-colors"
              >
                annalisa@piantasia.eu
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
