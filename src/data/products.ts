import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'lavanda',
    name: "Lavanda",
    description: "A calming blend of chamomile, lavender, and rose petals",
    price: "€15.00",
    image: "/lavanda.png",
    badge: "Bestseller"
  },
  {
    id: 'terra',
    name: "Terra",
    description: "Earthy blend of sage, eucalyptus, and pine needles",
    price: "€15.00",
    image: "/terra.png",
    badge: "New"
  },
  {
    id: 'menta',
    name: "Menta",
    description: "Meditative blend of lotus, jasmine, and green tea",
    price: "€15.00",
    image: "/menta.png",
  }
];
