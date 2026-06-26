import { Article } from '@/types/product';
import generated from './articles.generated.json';

// Articles are managed in the Piantasia CMS and synced into
// articles.generated.json at build time (see scripts/fetch-content.mjs).
// Do not edit the generated file by hand.
export const articles: Article[] = generated as Article[];
