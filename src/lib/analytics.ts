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

/**
 * Sent by useDocumentTitle after the title is updated. GA4's own SPA page
 * views are switched off (they would report the previous page's title), so
 * this is the only source of page_view — including the first page load.
 */
export function trackPageView(pageTitle: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  });
}

export function trackViewItem(productId: string): void {
  const item = itemFor(productId, 1);
  if (!item) return;
  pushEcommerceEvent('view_item', {
    currency: 'EUR',
    value: item.price,
    items: [item],
  });
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

/**
 * The GA4 identifiers for this browser, read from the cookies the Google tag
 * sets. They travel with the checkout so the webhook can attribute its
 * server-side `purchase` to the same user and session — otherwise every sale
 * would look like it came out of nowhere.
 *
 * `purchase` is deliberately *not* sent from the browser: the customer often
 * never comes back from Stripe, and sales made through Payment Links never
 * touch the site at all. The webhook is the only place that sees them all.
 */
export function getGaIdentifiers(): { clientId: string | null; sessionId: string | null } {
  const read = (name: string): string | null => {
    try {
      const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
      return match?.[1] ?? null;
    } catch {
      return null;
    }
  };

  // _ga looks like "GA1.1.1234567890.1234567890"; the client id is the last two parts.
  const ga = read('_ga');
  const clientId = ga ? (ga.split('.').slice(-2).join('.') || null) : null;

  // _ga_<measurement id without the "G-"> looks like "GS1.1.<session id>.<n>...."
  const gaSession = read('_ga_TVBY8TXE8J');
  const sessionId = gaSession ? (gaSession.split('.')[2] ?? null) : null;

  return { clientId, sessionId };
}
