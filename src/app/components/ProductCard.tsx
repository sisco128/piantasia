import { ShoppingCart, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

export function ProductCard({ name, description, price, image, badge }: ProductCardProps) {
  return (
    <article 
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
      aria-label={`Product: ${name}`}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-[#F5F2ED]">
        <ImageWithFallback 
          src={image} 
          alt={`${name} - ${description}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {badge && (
          <span 
            className="absolute top-4 right-4 bg-white text-[#2B5142] border border-[#2B5142] px-3 py-1 rounded-full text-sm font-medium"
            aria-label={`Badge: ${badge}`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl text-[#2B5142] mb-2">{name}</h3>
        <p className="text-[#2B5142]/70 text-sm mb-2 flex-grow">{description}</p>
        <div className="flex items-center gap-1.5 mb-4">
          <Package className="w-3.5 h-3.5 text-[#2B5142]/60" />
          <p className="text-[#2B5142]/60 text-xs font-medium">11 grammi</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl text-[#2B5142]" aria-label={`Price: ${price}`}>{price}</span>
          <button 
            className="bg-[#2B5142] text-white p-3 rounded-full hover:bg-[#1F3B2F] transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}