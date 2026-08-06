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
}

type CartAction =
  | { type: 'ADD_ITEM'; productId: string; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'SET_COUNTRY'; country: string }
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
      return isShippingCountry(action.country) ? { ...state, country: action.country } : state;
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

function loadInitialState(): CartState {
  const fallback: CartState = { items: [], country: DEFAULT_COUNTRY };
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
    const country =
      typeof parsed.country === 'string' && isShippingCountry(parsed.country)
        ? parsed.country
        : DEFAULT_COUNTRY;
    return { items, country };
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
      addItem: (productId, quantity) => dispatch({ type: 'ADD_ITEM', productId, quantity }),
      removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: 'SET_QUANTITY', productId, quantity }),
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
