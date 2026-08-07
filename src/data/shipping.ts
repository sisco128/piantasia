/**
 * Display-only mirror of the shipping rates in piantapi/lib/shipping.ts.
 * The backend is authoritative for what is charged; a mismatch here only
 * affects the estimate shown in the cart drawer. Keep the two in sync.
 *
 * Italy first (default and home market), then alphabetical.
 */

export interface ShippingCountry {
  code: string;
  label: string;
  amountCents: number;
}

export const SHIPPING_COUNTRIES: ShippingCountry[] = [
  { code: 'IT', label: 'Italy', amountCents: 699 },
  { code: 'AT', label: 'Austria', amountCents: 599 },
  { code: 'BE', label: 'Belgium', amountCents: 599 },
  { code: 'HR', label: 'Croatia', amountCents: 699 },
  { code: 'CZ', label: 'Czechia', amountCents: 599 },
  { code: 'DK', label: 'Denmark', amountCents: 699 },
  { code: 'FI', label: 'Finland', amountCents: 899 },
  { code: 'FR', label: 'France', amountCents: 599 },
  { code: 'DE', label: 'Germany', amountCents: 499 },
  { code: 'GR', label: 'Greece', amountCents: 899 },
  { code: 'HU', label: 'Hungary', amountCents: 699 },
  { code: 'IE', label: 'Ireland', amountCents: 899 },
  { code: 'NL', label: 'Netherlands', amountCents: 599 },
  { code: 'PL', label: 'Poland', amountCents: 599 },
  { code: 'PT', label: 'Portugal', amountCents: 899 },
  { code: 'RO', label: 'Romania', amountCents: 899 },
  { code: 'SK', label: 'Slovakia', amountCents: 699 },
  { code: 'SI', label: 'Slovenia', amountCents: 699 },
  { code: 'ES', label: 'Spain', amountCents: 699 },
  { code: 'SE', label: 'Sweden', amountCents: 699 },
];

export const DEFAULT_COUNTRY = 'IT';

export function isShippingCountry(code: string): boolean {
  return SHIPPING_COUNTRIES.some((c) => c.code === code);
}

export function shippingCentsForCountry(code: string): number {
  const country =
    SHIPPING_COUNTRIES.find((c) => c.code === code) ??
    SHIPPING_COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY);
  return country?.amountCents ?? 0;
}
