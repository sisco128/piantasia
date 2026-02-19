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
        <main className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
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

  const hasSecondImage = product.images.length > 1;

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />

      <main>
        {/* Back link */}
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 pt-6 md:pt-10">
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 text-[#2B5142]/50 hover:text-[#2B5142] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All products
          </Link>
        </div>

        {/* S01 — Hero */}
        <section className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <ImageWithFallback
                src={product.images[0]}
                alt={product.name}
                className="w-full max-h-[700px] object-contain"
              />
            </div>

            {/* Identity column — 40% on desktop */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              {product.badge && (
                <span className="inline-block text-xs uppercase tracking-widest text-[#8B7BA8] mb-4">
                  {product.badge}
                </span>
              )}

              <h1 className="font-heading text-4xl lg:text-6xl text-[#2B5142] leading-tight mb-6">
                {product.name}
              </h1>

              {/* L2 — Descriptor (tastingNotes) */}
              <p className="font-sans text-xl lg:text-2xl text-[#2B5142] mb-3">
                {product.descriptor || product.tastingNotes}
              </p>

              {/* L3 — Narrative (tagline) */}
              <p className="font-sans text-base lg:text-lg text-[#2B5142]/60 mb-10">
                {product.tagline}
              </p>

              <p className="font-heading text-3xl lg:text-4xl text-[#2B5142] mb-6">
                {product.price}
              </p>

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

        {/* S02 — Mood / Landscape */}
        {(hasSecondImage || (product.moodLines && product.moodLines.length > 0)) && (
          <section className="py-20 md:py-28 lg:py-36">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
              {hasSecondImage && (
                <div className="overflow-hidden rounded-2xl">
                  <ImageWithFallback
                    src={product.images[1]}
                    alt={`${product.name} — botanical landscape`}
                    className="w-full object-cover"
                  />
                </div>
              )}
              {product.moodLines && product.moodLines.length > 0 && (
                <div className="max-w-[640px] mx-auto text-center mt-10 md:mt-12 space-y-4">
                  {product.moodLines.map((line, i) => (
                    <p
                      key={i}
                      className="font-sans text-lg lg:text-xl italic text-[#2B5142]/70"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* S03 — Sensory Pyramid (conditional) */}
        {product.sensoryPyramid && (
          <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
              <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/50 mb-10">
                Sensory Profile
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {(['top', 'heart', 'base'] as const).map((layer) => (
                  <div key={layer}>
                    <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/40 mb-2">
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
              <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/50 mb-10">
                Botanical Composition
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                {product.ingredients.map((ingredient) => (
                  <div
                    key={ingredient}
                    className="border-b border-[#2B5142]/[0.06] pb-4"
                  >
                    <p className="font-sans text-base text-[#2B5142]">
                      {ingredient}
                    </p>
                    {product.ingredientNotes?.[ingredient] && (
                      <p className="font-sans text-sm text-[#2B5142]/50 mt-1">
                        {product.ingredientNotes[ingredient]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* S05 — Ritual (conditional) */}
        {product.ritual && (
          <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
              <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/50 mb-10">
                Ritual
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {(['when', 'how', 'time', 'context'] as const).map((field) => (
                  <div key={field}>
                    <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/40 mb-2">
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

        {/* S06 — Object & Materiality */}
        <section className="py-12 md:py-16 lg:py-20 border-t border-[#2B5142]/10">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#2B5142]/50 mb-10">
              Object
            </p>
            <div className="space-y-4">
              {product.origin && (
                <p className="font-sans text-base text-[#2B5142]">
                  {product.origin}
                </p>
              )}
              <div className="flex flex-wrap gap-x-10 gap-y-2">
                {product.weight && (
                  <p className="font-sans text-base text-[#2B5142]/70">
                    {product.weight}
                  </p>
                )}
                {product.portions && (
                  <p className="font-sans text-base text-[#2B5142]/70">
                    {product.portions}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* S07 — Disclaimer */}
        {product.disclaimer && (
          <section className="py-8 md:py-10 border-t border-[#2B5142]/10">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
              <p className="font-sans text-xs text-[#2B5142]/30 leading-relaxed max-w-[640px]">
                {product.disclaimer}
              </p>
            </div>
          </section>
        )}

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
      </main>

      <Footer />
    </div>
  );
}
