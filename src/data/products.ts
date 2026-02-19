import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'blend-01',
    name: 'Blend 01',
    tagline: 'Uplifting and clear, ideal for daytime rituals.',
    tastingNotes: 'Fresh, green, lightly sweet.',
    ingredients: [
      'Mullein',
      'Raspberry Leaf',
      'Peppermint',
      'Lemon Balm',
      'Marshmallow Leaf',
      'Damiana',
    ],
    origin: 'Hand-selected, cleaned and sorted. Made in Berlin.',
    weight: '11.1 grams',
    portions: '~45 portions',
    disclaimer:
      'For aromatic purposes only, store in a cool, dry place. Keep out of reach of children.',
    price: '€13',
    image: '/menta.png',
  },
  {
    id: 'blend-02',
    name: 'Blend 02',
    tagline: 'Calming and soothing, designed for evening rituals.',
    tastingNotes: 'Soft, floral, warm.',
    ingredients: [
      'Raspberry Leaf',
      'Passiflora',
      'Lavender',
      'Chamomile',
      'Marshmallow Leaf',
      'Damiana',
    ],
    origin: 'Hand-selected, cleaned and sorted. Made in Berlin.',
    weight: '11.1 grams',
    portions: '~45 portions',
    disclaimer:
      'For aromatic purposes only, store in a cool, dry place. Keep out of reach of children.',
    price: '€13',
    image: '/lavanda.png',
    badge: 'Bestseller',
  },
  {
    id: 'blend-03',
    name: 'Blend 03',
    tagline: 'Grounding and balanced, for everyday use.',
    tastingNotes: 'Clean, neutral, perfect filler.',
    ingredients: [
      'Marshmallow Leaf',
      'Mullein',
      'Passiflora',
      'Raspberry Leaf',
      'Lemon Balm',
      'Linden Flower',
    ],
    origin: 'Hand-selected, cleaned and sorted. Made in Berlin.',
    weight: '11.1 grams',
    portions: '~45 portions',
    disclaimer:
      'For aromatic purposes only, store in a cool, dry place. Keep out of reach of children.',
    price: '€13',
    image: '/terra.png',
    badge: 'New',
  },
];
