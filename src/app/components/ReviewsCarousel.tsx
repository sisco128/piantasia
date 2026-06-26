import { Star } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import { reviews } from '@/data/reviews';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/piantasia.eu';
const MAX_BODY = 200;

function truncate(text: string, max = MAX_BODY): { text: string; truncated: boolean } {
  if (text.length <= max) return { text, truncated: false };
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  return {
    text: `${slice.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`,
    truncated: true,
  };
}

function firstNameOf(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function ReviewsCarousel() {
  if (!reviews.length) return null;

  return (
    <section id="reviews" className="py-12 md:py-16 lg:py-20 bg-[#8B7BA8]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B5142] mb-3 md:mb-4">
            Loved by our community
          </h2>
          <p className="text-base md:text-lg text-[#2B5142]/70 max-w-2xl mx-auto">
            Real rituals, in their own words.
          </p>
        </div>

        <Carousel
          opts={{ loop: true, align: 'start' }}
          plugins={[Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]}
        >
          <CarouselContent className="py-4">
            {reviews.map((review) => {
              const firstName = firstNameOf(review.authorName);
              const { text, truncated } = truncate(review.body);
              return (
                <CarouselItem
                  key={review.id}
                  className="sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full bg-white rounded-2xl shadow-lg p-6 flex flex-col">
                    <div className="flex gap-0.5 mb-3" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-[#E8A33D] fill-[#E8A33D]' : 'text-[#2B5142]/20'
                          }`}
                        />
                      ))}
                    </div>

                    {review.title && (
                      <h3 className="text-base md:text-lg font-semibold text-[#2B5142] mb-2">
                        {review.title}
                      </h3>
                    )}

                    <div className="flex-grow">
                      <p className="text-sm text-[#2B5142]/80 leading-relaxed">{text}</p>
                      {truncated && (
                        <a
                          href={TRUSTPILOT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm font-medium text-[#8B7BA8] hover:text-[#2B5142] underline underline-offset-2 transition-colors"
                        >
                          Read more
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#2B5142]/[0.08]">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#8B7BA8]/20 text-[#2B5142] text-sm font-semibold flex-shrink-0">
                        {firstName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#2B5142] truncate">{firstName}</p>
                        {review.country && (
                          <p className="text-xs text-[#2B5142]/60 truncate">{review.country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <div className="text-center mt-8 md:mt-10">
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans inline-flex items-center gap-2 text-[#2B5142]/75 hover:text-[#2B5142] transition-colors text-sm font-medium underline underline-offset-4"
          >
            Read all reviews on Trustpilot
          </a>
        </div>
      </div>
    </section>
  );
}
