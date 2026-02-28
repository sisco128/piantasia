import { Heart, Leaf, Sparkles } from 'lucide-react';
import { Benefit } from '@/types/product';

export const benefits: Benefit[] = [
  {
    id: 'natural',
    icon: <Leaf className="w-4 h-4" />,
    title: "100% Natural",
    description: "All our blends are made from organic, sustainably sourced herbs"
  },
  {
    id: 'nicotine-free',
    icon: <Heart className="w-4 h-4" />,
    title: "Nicotine-Free",
    description: "A healthier alternative without addictive substances"
  },
  {
    id: 'crafted',
    icon: <Sparkles className="w-4 h-4" />,
    title: "Carefully Crafted",
    description: "Each blend is expertly formulated for optimal flavor and experience"
  }
];
