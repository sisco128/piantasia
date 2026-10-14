import { Product } from '@/types/product';
import data from './products.json';

// Products are edited directly in products.json (see CLAUDE.md). The price
// here is display-only: what customers pay comes from Stripe via piantapi,
// looked up by the product id.
export const products: Product[] = data as Product[];
