import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '@/app/cart/CartContext';
import { getCheckoutSessionSummary } from '@/lib/api';
import { trackPurchase } from '@/lib/analytics';
import { Header } from './Header';
import { Footer } from './Footer';

export function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Idempotent, so StrictMode's double-invoke is harmless.
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    getCheckoutSessionSummary(sessionId).then((summary) => {
      if (cancelled || !summary) return;
      trackPurchase({
        transactionId: sessionId,
        value: summary.amountTotal / 100,
        currency: summary.currency,
        items: summary.items,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />
      <main className="max-w-[640px] mx-auto px-6 sm:px-8 py-20 md:py-28 text-center">
        <h1 className="font-heading text-4xl lg:text-5xl text-[#2B5142] mb-6">
          {sessionId ? 'Thank you for your order' : 'Thank you'}
        </h1>
        <p className="font-sans text-base md:text-lg text-[#2B5142]/80 mb-4">
          Your ritual is on its way. We&apos;ve received your order and sent a
          confirmation email with the details.
        </p>
        <p className="font-sans text-base text-[#2B5142]/60 mb-10">
          If it doesn&apos;t arrive within a few minutes, check your spam folder or
          write to hello@piantasia.eu.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-[#2B5142] text-white font-sans text-base font-medium px-10 py-4 rounded-full hover:bg-[#1F3B2F] transition-colors"
        >
          Back to Piantasia
        </Link>
      </main>
      <Footer />
    </div>
  );
}
