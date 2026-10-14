/**
 * Display-only price helpers. products.json stores prices as display strings
 * ("€13"); what customers are actually charged is resolved server-side
 * from Stripe by piantapi, so parsing here is cosmetic.
 */

export function parsePriceCents(price: string): number {
  const match = price.replace(',', '.').match(/(\d+(?:\.\d+)?)/);
  return match?.[1] ? Math.round(parseFloat(match[1]) * 100) : 0;
}

export function formatCents(cents: number): string {
  const euros = cents / 100;
  return Number.isInteger(euros) ? `€${euros}` : `€${euros.toFixed(2)}`;
}
