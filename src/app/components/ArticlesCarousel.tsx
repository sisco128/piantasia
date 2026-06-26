import { Link } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import { articles } from '@/data/articles';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

function formatDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function ArticlesCarousel() {
  if (!articles.length) return null;

  return (
    <section id="blog" className="scroll-mt-16 md:scroll-mt-20 py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B5142] mb-3 md:mb-4">
            From the journal
          </h2>
          <p className="text-base md:text-lg text-[#2B5142]/70 max-w-2xl mx-auto">
            Notes on rituals, botanicals and slow moments.
          </p>
        </div>

        <Carousel
          opts={{ loop: articles.length > 1, align: 'start' }}
          plugins={[Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })]}
        >
          <CarouselContent>
            {articles.map((article) => {
              const meta = [article.category, formatDate(article.publishedAt)]
                .filter(Boolean)
                .join(' · ');
              return (
                <CarouselItem key={article.id} className="sm:basis-1/2 lg:basis-1/3">
                  <Link
                    to={`/blog/${article.id}`}
                    className="group h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2"
                    aria-label={article.title}
                  >
                    {article.cover && (
                      <div className="relative h-44 sm:h-48 overflow-hidden bg-[#F5F2ED]">
                        <ImageWithFallback
                          src={article.cover}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5 md:p-6 flex flex-col flex-grow">
                      {meta && (
                        <p className="text-xs uppercase tracking-widest text-[#8B7BA8] mb-2">{meta}</p>
                      )}
                      <h3 className="text-lg md:text-xl text-[#2B5142] mb-2 leading-snug">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-sm text-[#2B5142]/70 leading-relaxed flex-grow">
                          {article.excerpt}
                        </p>
                      )}
                      <span className="mt-4 text-sm font-medium text-[#2B5142] group-hover:text-[#1F3B2F]">
                        Read article →
                      </span>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
