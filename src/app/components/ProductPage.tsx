import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductCard } from './ProductCard';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F2ED]">
        <Header />
        <main className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
          <h1 className="text-3xl text-[#2B5142] mb-4">Product not found</h1>
          <Link
            to="/#products"
            className="font-sans text-[#8B7BA8] hover:text-[#2B5142] transition-colors underline"
          >
            Back to all products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const otherProducts = products.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />

      <main>
        {/* Back link */}
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 pt-4 md:pt-6">
          <Link
            to="/#products"
            className="font-sans inline-flex items-center gap-2 text-[#2B5142]/75 hover:text-[#2B5142] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All products
          </Link>
        </div>

        {/* S01 — Hero */}
        <section className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
            <div className="lg:col-span-3 h-[42vh] max-h-[280px] lg:h-[500px] lg:max-h-[700px] overflow-hidden flex items-center justify-center bg-[#F5F2ED]">
              <ImageWithFallback
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Identity column — 40% on desktop */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              {product.badge && (
                <span className="font-sans inline-block text-xs uppercase tracking-widest text-[#8B7BA8] mb-4">
                  {product.badge}
                </span>
              )}

              <h1 className="font-heading text-4xl lg:text-6xl text-[#2B5142] leading-tight mb-6">
                {product.name}
              </h1>

              {/* Hero line — single style (L2) */}
              <p className="font-sans text-xl lg:text-2xl text-[#2B5142] mb-6">
                {product.descriptor || product.tastingNotes}
              </p>

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-6">
                <p className="font-heading text-3xl lg:text-4xl text-[#2B5142]">
                  {product.price}
                </p>
                {(product.weight || product.portions) && (
                  <p className="font-sans text-base text-[#2B5142]/70 text-right">
                    {[product.weight, product.portions].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>

              {product.buyUrl && (
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#2B5142] text-white font-sans text-base font-medium px-10 py-4 rounded-full hover:bg-[#1F3B2F] transition-colors w-full sm:w-auto"
                >
                  Add to ritual
                </a>
              )}
            </div>
          </div>
        </section>

        {/* S02 — Mood (conditional) */}
        {product.moodLines && product.moodLines.length > 0 && (
          <section className="py-20 md:py-28 lg:py-36">
            <div className="max-w-[640px] mx-auto px-6 sm:px-8 text-center space-y-4">
              {product.moodLines.map((line, i) => (
                <p
                  key={i}
                  className="font-sans text-lg lg:text-xl italic text-[#2B5142]/70"
                >
                  {line}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* S03 — Sensory Pyramid (conditional) */}
        {product.sensoryPyramid && (
          <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
              <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-10">
                Sensory Profile
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {(['top', 'heart', 'base'] as const).map((layer) => (
                  <div key={layer}>
                    <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/65 mb-2">
                      {layer}
                    </p>
                    <p className="font-sans text-base text-[#2B5142]">
                      {product.sensoryPyramid![layer]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* S04 — Botanical Composition */}
        {product.ingredients.length > 0 && (
          <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
              <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-10">
                Botanical Composition
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3 sm:gap-y-4 md:gap-y-5">
                {product.ingredients.map((ingredient) => (
                  <div
                    key={ingredient}
                    className="border-b border-[#2B5142]/[0.06] pb-3 sm:pb-4"
                  >
                    <p className="font-sans text-base text-[#2B5142]">
                      {ingredient}
                    </p>
                    {product.ingredientNotes?.[ingredient] && (
                      <p className="font-sans text-sm text-[#2B5142]/75 mt-1">
                        {product.ingredientNotes[ingredient]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Description */}
        {product.description && (
          <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
              <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-10">
                Description
              </p>
              <div className="space-y-6">
                {product.description
                  .split(/\n\n+/)
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p
                      key={i}
                      className="font-sans text-base text-[#2B5142] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* How to Use */}
        <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-10">
              How to Use
            </p>
            <div className="space-y-4">
              <p className="font-sans text-base text-[#2B5142] leading-relaxed">
                Our blends are hand crafted in small batches, gently cleaned from
                excess stems and lightly milled for a soft, workable texture.
              </p>
              <p className="font-sans text-base text-[#2B5142] leading-relaxed">
                Ready to use for your personal rituals, either on their own or
                combined with other herbs.
              </p>
            </div>
          </div>
        </section>

        {/* S05 — Ritual (conditional) */}
        {product.ritual && (
          <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
              <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-10">
                Ritual
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {(['when', 'how', 'time', 'context'] as const).map((field) => (
                  <div key={field}>
                    <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/65 mb-2">
                      {field}
                    </p>
                    <p className="font-sans text-base text-[#2B5142]">
                      {product.ritual![field]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sourcing */}
        <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-10">
              Sourcing
            </p>
            <div className="space-y-4">
              <p className="font-sans text-base text-[#2B5142] leading-relaxed">
                The herbs are sourced from Italy and Germany. Certified organic quality, free from pesticides, additives and artificial ingredients.
              </p>
              <p className="font-sans text-base text-[#2B5142] leading-relaxed">
                For aromatic and ritual use only. Not intended for medical purposes. Store in a cool, dry place. Keep out of reach of children.
              </p>
            </div>
          </div>
        </section>

        {/* S08 — Secondary CTA */}
        {product.buyUrl && (
          <section className="py-20 md:py-28 lg:py-36 border-t border-[#2B5142]/10">
            <div className="max-w-[640px] mx-auto px-6 sm:px-8 text-center">
              <p className="font-sans text-base lg:text-lg text-[#2B5142]/60 mb-8">
                Begin your ritual
              </p>
              <a
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#2B5142] text-white font-sans text-base font-medium px-10 py-4 rounded-full hover:bg-[#1F3B2F] transition-colors"
              >
                Add to ritual
              </a>
            </div>
          </section>
        )}

        {/* More blends */}
        {otherProducts.length > 0 && (
          <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
              <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/75 mb-10">
                More blends
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {otherProducts.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
