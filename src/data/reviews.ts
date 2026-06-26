import { Review } from '@/types/product';
import generated from './reviews.generated.json';

// Reviews are managed in the Piantasia CMS and synced into
// reviews.generated.json at build time (see scripts/fetch-content.mjs).
// Do not edit the generated file by hand.
export const reviews: Review[] = generated as Review[];
