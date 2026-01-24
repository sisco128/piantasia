import { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

export interface Benefit {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}
