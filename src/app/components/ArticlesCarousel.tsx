import { Link } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import { articles } from '@/data/articles';
import { ArticleCard } from './ArticleCard';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

export function ArticlesCarousel() {
  if (!articles.length) return null;

  return (
    <section id="blog" className="scroll-mt-16 md:scroll-mt-20 py-12 md:py-16 lg:py-20 bg-[#F5F2ED]">
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
          <CarouselContent className="py-4">
            {articles.map((article) => (
              <CarouselItem key={article.id} className="sm:basis-1/2 lg:basis-1/3">
                <ArticleCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/blog"
            className="font-sans inline-flex items-center gap-2 text-[#2B5142] hover:text-[#1F3B2F] transition-colors text-sm font-medium underline underline-offset-4"
          >
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
