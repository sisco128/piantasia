import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  weight: string;
  price: string;
  images: string[];
  badge?: string;
}

export function ProductCard({ id, name, tagline, weight, price, images, badge }: ProductCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2"
      aria-label={`${name} — ${tagline || 'View product'}`}
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-[#F5F2ED]">
        <ImageWithFallback
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {badge && (
          <span
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white text-[#2B5142] border border-[#2B5142] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-medium"
          >
            {badge}
          </span>
        )}
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl text-[#2B5142] mb-1">{name}</h3>
        {tagline && (
          <p className="text-[#2B5142]/70 text-sm mb-3 flex-grow">{tagline}</p>
        )}
        <div className="flex items-center justify-between mt-auto">
          {weight && (
            <span className="text-[#2B5142]/60 text-xs font-medium">{weight}</span>
          )}
          <span className="text-xl md:text-2xl text-[#2B5142] ml-auto">{price}</span>
        </div>
      </div>
    </Link>
  );
}