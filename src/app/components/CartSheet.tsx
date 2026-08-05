import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Minus, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { products } from '@/data/products';
import { SHIPPING_COUNTRIES, shippingCentsForCountry } from '@/data/shipping';
import { createCheckoutSession } from '@/lib/api';
import { MAX_QUANTITY, useCart } from '@/app/cart/CartContext';
import { formatCents, parsePriceCents } from '@/app/cart/prices';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

export function CartSheet() {
  const {
    items,
    country,
    count,
    subtotalCents,
    removeItem,
    setQuantity,
    setCountry,
    isOpen,
    openCart,
    closeCart,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shippingCents = shippingCentsForCountry(country);

  const handleCheckout = async () => {
    if (items.length === 0 || isCheckingOut) return;
    setIsCheckingOut(true);
    try {
      const { url } = await createCheckoutSession(
        items.map(({ productId, quantity }) => ({ productId, quantity })),
        country
      );
      window.location.assign(url);
      // Keep the spinner on while the browser navigates away.
    } catch {
      toast.error('Something went wrong starting checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetContent
        side="right"
        className="bg-[#F5F2ED] w-full sm:max-w-md border-[#2B5142]/10"
        aria-describedby={undefined}
      >
        <SheetHeader className="border-b border-[#2B5142]/10">
          <SheetTitle className="font-heading text-2xl text-[#2B5142]">
            Your ritual{count > 0 ? ` (${count})` : ''}
          </SheetTitle>
          <SheetDescription className="sr-only">Shopping cart</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-sans text-base text-[#2B5142]/70">Your ritual awaits.</p>
            <Link
              to="/#products"
              onClick={closeCart}
              className="font-sans text-[#8B7BA8] hover:text-[#2B5142] transition-colors underline"
            >
              Explore the blends
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-4 space-y-4">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <li key={item.productId} className="flex gap-3 bg-white rounded-2xl p-3">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5F2ED] shrink-0">
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-sans text-base text-[#2B5142] truncate">
                          {product.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="p-1 text-[#2B5142]/50 hover:text-[#2B5142] transition-colors"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <X className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="font-sans text-sm text-[#2B5142]/70">{product.price}</p>
                      <div className="mt-auto flex items-center gap-3">
                        <div className="inline-flex items-center border border-[#2B5142]/20 rounded-full">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.productId, item.quantity - 1)}
                            className="p-1.5 text-[#2B5142] hover:text-[#8B7BA8] transition-colors disabled:opacity-40"
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span
                            className="font-sans text-sm text-[#2B5142] min-w-[1.5rem] text-center"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= MAX_QUANTITY}
                            className="p-1.5 text-[#2B5142] hover:text-[#8B7BA8] transition-colors disabled:opacity-40"
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="ml-auto font-sans text-sm text-[#2B5142]">
                          {formatCents(parsePriceCents(product.price) * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-[#2B5142]/10 p-4 space-y-4">
              <div>
                <label
                  htmlFor="cart-country"
                  className="font-sans block text-xs uppercase tracking-widest text-[#2B5142]/75 mb-2"
                >
                  Ship to
                </label>
                <select
                  id="cart-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="font-sans w-full bg-white border border-[#2B5142]/20 rounded-xl px-3 py-2.5 text-base text-[#2B5142] focus:outline-none focus:ring-2 focus:ring-[#8B7BA8]"
                >
                  {SHIPPING_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-sans text-sm text-[#2B5142]/80">
                  <span>Subtotal</span>
                  <span>{formatCents(subtotalCents)}</span>
                </div>
                <div className="flex justify-between font-sans text-sm text-[#2B5142]/80">
                  <span>Shipping estimate</span>
                  <span>{formatCents(shippingCents)}</span>
                </div>
                <p className="font-sans text-xs text-[#2B5142]/60 pt-1">
                  Discount codes can be entered at checkout.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2B5142] text-white font-sans text-base font-medium px-10 py-4 rounded-full hover:bg-[#1F3B2F] transition-colors disabled:opacity-60"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Preparing checkout…
                  </>
                ) : (
                  'Checkout'
                )}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
