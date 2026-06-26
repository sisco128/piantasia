import { Product } from '@/types/product';
import generated from './products.generated.json';

// Products are managed in the Piantasia CMS and synced into
// products.generated.json at build time (see scripts/fetch-content.mjs).
// Do not edit the generated file by hand.
export const products: Product[] = generated as Product[];
