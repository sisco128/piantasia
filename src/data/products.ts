import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'tranquil-dreams',
    name: "Tranquil Dreams",
    description: "A calming blend of chamomile, lavender, and rose petals",
    price: "$24.99",
    image: "/lavanda.png",
    badge: "Bestseller"
  },
  {
    id: 'forest-harmony',
    name: "Forest Harmony",
    description: "Earthy blend of sage, eucalyptus, and pine needles",
    price: "$26.99",
    image: "/terra.jpg",
    badge: "New"
  },
  {
    id: 'zen-garden',
    name: "Zen Garden",
    description: "Meditative blend of lotus, jasmine, and green tea",
    price: "$25.99",
    image: "/menta.jpeg",
  }
];
