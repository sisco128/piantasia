import { Article } from '@/types/product';
import data from './articles.json';

// Blog articles are edited directly in articles.json (see CLAUDE.md). The
// body uses the Strapi blocks format, kept from when the CMS managed them.
// Pinned articles first, then newest first, whatever order the file is in.
export const articles: Article[] = [...(data as Article[])].sort(
  (a, b) =>
    Number(!!b.pinned) - Number(!!a.pinned) ||
    (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')
);

/** Languages the journal is written in, in the order the switcher shows them. */
export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
] as const;

export const DEFAULT_LANGUAGE = 'en';

/** The visitor's browser language if the journal has it, English otherwise. */
export function preferredLanguage(): string {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;
  const wanted = (navigator.languages ?? [navigator.language]).map((l) => l.slice(0, 2).toLowerCase());
  return wanted.find((l) => LANGUAGES.some((x) => x.code === l)) ?? DEFAULT_LANGUAGE;
}

/** Every language version of an article, itself included. */
export function translationsOf(article: Article): Article[] {
  if (!article.translationKey) return [article];
  return articles.filter((a) => a.translationKey === article.translationKey);
}

/**
 * One version of each article: the one in `language` when it exists,
 * otherwise English, otherwise whichever version there is.
 */
export function articlesInLanguage(language: string): Article[] {
  const seen = new Set<string>();
  const result: Article[] = [];
  for (const article of articles) {
    const key = article.translationKey ?? article.id;
    if (seen.has(key)) continue;
    seen.add(key);
    const versions = translationsOf(article);
    result.push(
      versions.find((a) => a.language === language) ??
        versions.find((a) => a.language === DEFAULT_LANGUAGE) ??
        article
    );
  }
  return result;
}
