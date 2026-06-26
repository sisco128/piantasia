import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Article } from '@/types/product';

export function formatArticleDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function ArticleCard({ article }: { article: Article }) {
  const meta = [article.category, formatArticleDate(article.publishedAt)].filter(Boolean).join(' · ');

  return (
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
        {meta && <p className="text-xs uppercase tracking-widest text-[#8B7BA8] mb-2">{meta}</p>}
        <h3 className="text-lg md:text-xl text-[#2B5142] mb-2 leading-snug">{article.title}</h3>
        {article.excerpt && (
          <p className="text-sm text-[#2B5142]/70 leading-relaxed flex-grow">{article.excerpt}</p>
        )}
        <span className="mt-4 text-sm font-medium text-[#2B5142] group-hover:text-[#1F3B2F]">
          Read article →
        </span>
      </div>
    </Link>
  );
}
