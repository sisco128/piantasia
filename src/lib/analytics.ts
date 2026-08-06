/**
 * GA4 Enhanced Ecommerce events pushed to the GTM dataLayer (container
 * GTM-NC4ZRNJH, see index.html). This only pushes events — a GA4 tag with
 * "Send Ecommerce data" enabled must exist in GTM for them to reach
 * Analytics.
 */
import { products } from '@/data/products';
import type { CartItem } from '@/app/cart/CartContext';
import { parsePriceCents } from '@/app/cart/prices';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

interface EcommerceItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

function itemFor(productId: string, quantity: number): EcommerceItem | null {
  const product = products.find((p) => p.id === productId);
  if (!product) return null;
  return {
    item_id: product.id,
    item_name: product.name,
    price: parsePriceCents(product.price) / 100,
    quantity,
  };
}

function itemsFor(items: CartItem[]): EcommerceItem[] {
  return items
    .map((i) => itemFor(i.productId, i.quantity))
    .filter((i): i is EcommerceItem => i !== null);
}

function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}

function cartValue(items: EcommerceItem[]): number {
  return roundCents(items.reduce((sum, i) => sum + i.price * i.quantity, 0));
}

function pushEcommerceEvent(event: string, ecommerce: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // Clear the previous ecommerce object first, per GA4/GTM recommendation,
  // so values don't leak between successive events.
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({ event, ecommerce });
}

export function trackAddToCart(productId: string, quantity: number): void {
  const item = itemFor(productId, quantity);
  if (!item) return;
  pushEcommerceEvent('add_to_cart', {
    currency: 'EUR',
    value: cartValue([item]),
    items: [item],
  });
}

export function trackRemoveFromCart(productId: string, quantity: number): void {
  const item = itemFor(productId, quantity);
  if (!item) return;
  pushEcommerceEvent('remove_from_cart', {
    currency: 'EUR',
    value: cartValue([item]),
    items: [item],
  });
}

export function trackViewCart(items: CartItem[]): void {
  const mapped = itemsFor(items);
  if (mapped.length === 0) return;
  pushEcommerceEvent('view_cart', {
    currency: 'EUR',
    value: cartValue(mapped),
    items: mapped,
  });
}

export function trackBeginCheckout(items: CartItem[]): void {
  const mapped = itemsFor(items);
  if (mapped.length === 0) return;
  pushEcommerceEvent('begin_checkout', {
    currency: 'EUR',
    value: cartValue(mapped),
    items: mapped,
  });
}

const PURCHASE_TRACKED_KEY = 'piantasia-purchase-tracked';

/**
 * Fires at most once per transaction id (guards against the success page
 * being refreshed or StrictMode's effect double-invoke in dev causing a
 * duplicate purchase event).
 */
export function trackPurchase(opts: {
  transactionId: string;
  value: number;
  currency: string;
  items: Array<{ name: string; quantity: number }>;
}): void {
  try {
    const raw = sessionStorage.getItem(PURCHASE_TRACKED_KEY);
    const tracked: string[] = raw ? JSON.parse(raw) : [];
    if (tracked.includes(opts.transactionId)) return;
    sessionStorage.setItem(
      PURCHASE_TRACKED_KEY,
      JSON.stringify([...tracked, opts.transactionId].slice(-10))
    );
  } catch {
    // sessionStorage unavailable — fire anyway rather than silently dropping the event.
  }
  pushEcommerceEvent('purchase', {
    transaction_id: opts.transactionId,
    value: opts.value,
    currency: opts.currency.toUpperCase(),
    items: opts.items.map((i) => ({ item_name: i.name, quantity: i.quantity })),
  });
}
