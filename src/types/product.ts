import { ReactNode } from 'react';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface Product {
  id: string;
  productType: 'blend' | 'bundle';
  name: string;
  tagline: string;
  tastingNotes: string;
  ingredients: string[];
  origin: string;
  weight: string;
  portions: string;
  disclaimer: string;
  price: string;
  images: string[];
  badge?: string;
  descriptor?: string;
  description?: string;
}

export interface Benefit {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export interface Review {
  id: string;
  authorName: string;
  country?: string;
  rating: number;
  title?: string;
  body: string;
}

export interface Article {
  id: string; // slug
  title: string;
  seoTitle?: string; // <title> for search engines; defaults to "<title> | Piantasia"
  metaDescription?: string; // meta description for search engines; defaults to the site-wide one
  language: string;
  translationKey?: string;
  pinned?: boolean; // shown first in the journal, before the newest articles // same value on every language version of one article
  excerpt?: string;
  cover?: string; // image URL
  content?: BlocksContent;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
}
