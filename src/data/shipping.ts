/**
 * Display-only mirror of the shipping zones in piantapi/lib/shipping.ts.
 * The backend is authoritative for what is charged; a mismatch here only
 * affects the estimate shown in the cart drawer. Keep the two in sync.
 * Flat €3.99 for now; zones are ready for per-country rates later.
 */

type ZoneId = 'IT' | 'DE' | 'FR' | 'PL' | 'EU';

const ZONE_RATES_CENTS: Record<ZoneId, number> = {
  IT: 399,
  DE: 399,
  FR: 399,
  PL: 399,
  EU: 399,
};

export interface ShippingCountry {
  code: string;
  label: string;
  zone: ZoneId;
}

export const SHIPPING_COUNTRIES: ShippingCountry[] = [
  { code: 'IT', label: 'Italy', zone: 'IT' },
  { code: 'DE', label: 'Germany', zone: 'DE' },
  { code: 'FR', label: 'France', zone: 'FR' },
  { code: 'PL', label: 'Poland', zone: 'PL' },
  { code: 'AT', label: 'Austria', zone: 'EU' },
  { code: 'BE', label: 'Belgium', zone: 'EU' },
  { code: 'BG', label: 'Bulgaria', zone: 'EU' },
  { code: 'HR', label: 'Croatia', zone: 'EU' },
  { code: 'CY', label: 'Cyprus', zone: 'EU' },
  { code: 'CZ', label: 'Czechia', zone: 'EU' },
  { code: 'DK', label: 'Denmark', zone: 'EU' },
  { code: 'EE', label: 'Estonia', zone: 'EU' },
  { code: 'FI', label: 'Finland', zone: 'EU' },
  { code: 'GR', label: 'Greece', zone: 'EU' },
  { code: 'HU', label: 'Hungary', zone: 'EU' },
  { code: 'IE', label: 'Ireland', zone: 'EU' },
  { code: 'LV', label: 'Latvia', zone: 'EU' },
  { code: 'LT', label: 'Lithuania', zone: 'EU' },
  { code: 'LU', label: 'Luxembourg', zone: 'EU' },
  { code: 'MT', label: 'Malta', zone: 'EU' },
  { code: 'NL', label: 'Netherlands', zone: 'EU' },
  { code: 'PT', label: 'Portugal', zone: 'EU' },
  { code: 'RO', label: 'Romania', zone: 'EU' },
  { code: 'SK', label: 'Slovakia', zone: 'EU' },
  { code: 'SI', label: 'Slovenia', zone: 'EU' },
  { code: 'ES', label: 'Spain', zone: 'EU' },
  { code: 'SE', label: 'Sweden', zone: 'EU' },
];

export const DEFAULT_COUNTRY = 'IT';

export function isShippingCountry(code: string): boolean {
  return SHIPPING_COUNTRIES.some((c) => c.code === code);
}

export function shippingCentsForCountry(code: string): number {
  const country = SHIPPING_COUNTRIES.find((c) => c.code === code);
  return country ? ZONE_RATES_CENTS[country.zone] : ZONE_RATES_CENTS.EU;
}
