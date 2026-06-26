import { ReactNode } from 'react';

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
  buyUrl?: string;
  descriptor?: string;
  moodLines?: string[];
  sensoryPyramid?: {
    top: string;
    heart: string;
    base: string;
  };
  ingredientNotes?: Record<string, string>;
  description?: string;
  ritual?: {
    when: string;
    how: string;
    time: string;
    context: string;
  };
}

export interface Benefit {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}
