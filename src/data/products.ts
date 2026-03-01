import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'blend-01',
    name: 'Blend 01',
    tagline: 'Uplifting and clear, ideal for daytime rituals.',
    tastingNotes: 'Fresh, green, lightly sweet.',
    descriptor: 'Fresh and uplifting. Designed for daytime rituals.',
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
    images: ['/blend_01-1.png', '/blend_01-2.png'],
    buyUrl: 'https://buy.stripe.com/4gM9AMec974m78W47W1gs03',
    description:
      'Blend 01 is built around peppermint and soft leafy textures.\n\nLight and clear in character, with a gentle cooling nuance, it carries a fresh green profile reminiscent of shaded gardens and early mornings.\n\nThe texture is soft and fluffy, offering an even, balanced consistency and a clean aromatic expression.',
  },
  {
    id: 'blend-02',
    name: 'Blend 02',
    tagline: 'Calming and soothing, designed for evening rituals.',
    tastingNotes: 'Soft, floral, warm.',
    descriptor: 'Soft and floral. Designed for slower rituals.',
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
    images: ['/blend_02-1.png', '/blend_02-2.png'],
    badge: 'Bestseller',
    buyUrl: 'https://buy.stripe.com/14AaEQ7NLfASal86g41gs04',
    description:
      'Blend 02 is composed around raspberry leaf and delicate florals.\n\nGentle and rounded in character, it carries a subtle sweetness balanced by aromatic lavender and chamomile.\n\nThe texture is light yet structured, with soft leafy layers and a smooth botanical profile.',
  },
  {
    id: 'blend-03',
    name: 'Blend 03',
    tagline: 'Grounding and balanced, for everyday use.',
    tastingNotes: 'Clean, neutral, perfect filler.',
    descriptor: 'Clean and neutral. A versatile botanical base.',
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
    images: ['/blend_03-1.png', '/blend_03-2.png'],
    badge: 'New',
    buyUrl: 'https://buy.stripe.com/00w3coaZX2O650O7k81gs05',
    description:
      'Blend 03 is composed as a simple and balanced foundation.\n\nSoft in texture and neutral in aroma, it is designed to highlight the natural character of dried leaves without dominating the blend.\n\nMinimal and unobtrusive, it can be used on its own or as a base to combine with other botanicals.',
  },
];
