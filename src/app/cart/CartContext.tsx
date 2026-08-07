import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { products } from '@/data/products';
import { DEFAULT_COUNTRY, isShippingCountry } from '@/data/shipping';
import { trackAddToCart, trackRemoveFromCart, trackViewCart } from '@/lib/analytics';
import { fetchGeoCountry } from '@/lib/api';
import { parsePriceCents } from './prices';

const STORAGE_KEY = 'piantasia-cart-v1';
const STORAGE_VERSION = 1;
export const MAX_QUANTITY = 20;

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  country: string;
  /**
   * The country came from a saved cart or an explicit pick, so IP detection
   * must leave it alone. Derived on load, never persisted.
   */
  countryExplicit: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; productId: string; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'SET_COUNTRY'; country: string }
  | { type: 'SET_DETECTED_COUNTRY'; country: string }
  | { type: 'CLEAR' };

function clampQuantity(quantity: number): number {
  return Math.min(Math.max(Math.trunc(quantity), 0), MAX_QUANTITY);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const added = clampQuantity(action.quantity ?? 1) || 1;
      const existing = state.items.find((i) => i.productId === action.productId);
      const items = existing
        ? state.items.map((i) =>
            i.productId === action.productId
              ? { ...i, quantity: clampQuantity(i.quantity + added) || MAX_QUANTITY }
              : i
          )
        : [...state.items, { productId: action.productId, quantity: added }];
      return { ...state, items };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.productId !== action.productId) };
    case 'SET_QUANTITY': {
      const quantity = clampQuantity(action.quantity);
      if (quantity === 0) {
        return { ...state, items: state.items.filter((i) => i.productId !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, quantity } : i
        ),
      };
    }
    case 'SET_COUNTRY':
      return isShippingCountry(action.country)
        ? { ...state, country: action.country, countryExplicit: true }
        : state;
    case 'SET_DETECTED_COUNTRY':
      // Only fills a gap: never overrides a customer's own pick, and never
      // selects a country we don't ship to.
      return !state.countryExplicit && isShippingCountry(action.country)
        ? { ...state, country: action.country }
        : state;
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

function loadInitialState(): CartState {
  const fallback: CartState = {
    items: [],
    country: DEFAULT_COUNTRY,
    countryExplicit: false,
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as {
      version?: number;
      items?: unknown;
      country?: unknown;
    };
    if (parsed.version !== STORAGE_VERSION || !Array.isArray(parsed.items)) return fallback;
    const items: CartItem[] = [];
    for (const entry of parsed.items) {
      if (typeof entry !== 'object' || entry === null) continue;
      const { productId, quantity } = entry as Record<string, unknown>;
      if (typeof productId !== 'string' || typeof quantity !== 'number') continue;
      // Silently drop products no longer in the catalog.
      if (!products.some((p) => p.id === productId)) continue;
      const clamped = clampQuantity(quantity);
      if (clamped > 0 && !items.some((i) => i.productId === productId)) {
        items.push({ productId, quantity: clamped });
      }
    }
    // A country restored from storage is a pick the customer already made.
    // One that is no longer served counts as no pick, so detection can fill it.
    const savedCountry =
      typeof parsed.country === 'string' && isShippingCountry(parsed.country)
        ? parsed.country
        : null;
    return {
      items,
      country: savedCountry ?? DEFAULT_COUNTRY,
      countryExplicit: savedCountry !== null,
    };
  } catch {
    return fallback;
  }
}

interface CartContextValue {
  items: CartItem[];
  country: string;
  count: number;
  subtotalCents: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  setCountry: (country: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, items: state.items, country: state.country })
      );
    } catch {
      // Storage unavailable (private mode, quota) — cart still works in-memory.
    }
  }, [state]);

  useEffect(() => {
    // Fires at app mount rather than when the drawer opens, so the answer is
    // already in by the time the customer looks at the cart. The reducer drops
    // it if they have meanwhile picked a country themselves.
    let cancelled = false;
    fetchGeoCountry().then((country) => {
      if (!cancelled && country) dispatch({ type: 'SET_DETECTED_COUNTRY', country });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Runs after commit, so state.items is never stale here — unlike calling
    // trackViewCart directly from openCart(), which would close over the
    // cart as it was before a same-click addItem's dispatch had applied.
    if (isOpen) trackViewCart(state.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotalCents = state.items.reduce((sum, i) => {
      const product = products.find((p) => p.id === i.productId);
      return sum + (product ? parsePriceCents(product.price) * i.quantity : 0);
    }, 0);
    return {
      items: state.items,
      country: state.country,
      count,
      subtotalCents,
      addItem: (productId, quantity) => {
        dispatch({ type: 'ADD_ITEM', productId, quantity });
        trackAddToCart(productId, quantity ?? 1);
      },
      removeItem: (productId) => {
        const existing = state.items.find((i) => i.productId === productId);
        dispatch({ type: 'REMOVE_ITEM', productId });
        if (existing) trackRemoveFromCart(productId, existing.quantity);
      },
      setQuantity: (productId, quantity) => {
        const existing = state.items.find((i) => i.productId === productId);
        dispatch({ type: 'SET_QUANTITY', productId, quantity });
        if (!existing) return;
        const delta = clampQuantity(quantity) - existing.quantity;
        if (delta > 0) trackAddToCart(productId, delta);
        else if (delta < 0) trackRemoveFromCart(productId, -delta);
      },
      setCountry: (country) => dispatch({ type: 'SET_COUNTRY', country }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [state, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
