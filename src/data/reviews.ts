import { Review } from '@/types/product';
import data from './reviews.json';

// Reviews are edited directly in reviews.json (see CLAUDE.md), in the order
// they appear on the homepage.
export const reviews: Review[] = data as Review[];
