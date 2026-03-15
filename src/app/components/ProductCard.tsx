import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  descriptor?: string;
  tastingNotes?: string;
  weight: string;
  portions?: string;
  price: string;
  images: string[];
  badge?: string;
  externalUrl?: string;
}

export function ProductCard({ id, name, tagline, descriptor, tastingNotes, weight, portions, price, images, badge, externalUrl }: ProductCardProps) {
  const subtitle = descriptor || tastingNotes || tagline;
  const weightLine = [weight, portions].filter(Boolean).join(' · ');

  const cardClass = "group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2";

  const content = (
    <>
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
        {subtitle && (
          <p className="text-[#2B5142]/70 text-sm mb-3 flex-grow">{subtitle}</p>
        )}
        <div className="flex items-center justify-between mt-auto">
          {weightLine && (
            <span className="text-[#2B5142]/70 text-sm font-medium">{weightLine}</span>
          )}
          <span className="text-xl md:text-2xl text-[#2B5142] ml-auto">{price}</span>
        </div>
      </div>
    </>
  );

  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        aria-label={`${name} — ${subtitle || 'View product'}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={`/product/${id}`}
      className={cardClass}
      aria-label={`${name} — ${subtitle || 'View product'}`}
    >
      {content}
    </Link>
  );
}