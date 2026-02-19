import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F2ED]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl text-[#2B5142] mb-4">Product not found</h1>
          <Link
            to="/#products"
            className="text-[#8B7BA8] hover:text-[#2B5142] transition-colors underline"
          >
            Back to all products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <Link
          to="/#products"
          className="inline-flex items-center gap-2 text-[#2B5142]/70 hover:text-[#2B5142] transition-colors mb-6 md:mb-10 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          All products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#2B5142] mb-3">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-base md:text-lg text-[#2B5142]/80 mb-4">
                {product.tagline}
              </p>
            )}

            {product.tastingNotes && (
              <p className="text-sm text-[#2B5142]/60 italic mb-6 md:mb-8">
                {product.tastingNotes}
              </p>
            )}

            {product.ingredients.length > 0 && (
              <div className="mb-6 md:mb-8">
                <h2 className="text-sm font-semibold text-[#2B5142] uppercase tracking-wider mb-2">
                  Ingredients
                </h2>
                <p className="text-[#2B5142]/80 text-sm">
                  {product.ingredients.join(', ')}
                </p>
              </div>
            )}

            {product.origin && (
              <p className="text-sm text-[#2B5142]/70 mb-6 md:mb-8">
                {product.origin}
              </p>
            )}

            {(product.weight || product.portions) && (
              <p className="text-sm text-[#2B5142]/60 mb-6 md:mb-8">
                {[product.weight, product.portions].filter(Boolean).join(' · ')}
              </p>
            )}

            <div className="mt-auto pt-6 border-t border-[#2B5142]/10">
              <span className="text-3xl md:text-4xl text-[#2B5142]">
                {product.price}
              </span>
            </div>

            {product.disclaimer && (
              <p className="text-xs text-[#2B5142]/50 mt-6">
                {product.disclaimer}
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
