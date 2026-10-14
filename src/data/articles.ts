import { Article } from '@/types/product';
import data from './articles.json';

// Blog articles are edited directly in articles.json (see CLAUDE.md). The
// body uses the Strapi blocks format, kept from when the CMS managed them.
// Newest first, whatever order the file is in — the CMS used to sort them.
export const articles: Article[] = [...(data as Article[])].sort((a, b) =>
  (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')
);
