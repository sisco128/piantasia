import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';
import { Header } from './Header';
import { Footer } from './Footer';
import { ArticleCard } from './ArticleCard';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function BlogIndexPage() {
  useDocumentTitle('Journal — Rituals, Botanicals and Harm Reduction | Piantasia');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
        <Link
          to="/"
          className="font-sans inline-flex items-center gap-2 text-[#2B5142]/75 hover:text-[#2B5142] transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        <div className="text-center mb-10 md:mb-14">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#2B5142] mb-3 md:mb-4">
            The journal
          </h1>
          <p className="text-base md:text-lg text-[#2B5142]/70 max-w-2xl mx-auto">
            Notes on rituals, botanicals and slow moments.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-[#2B5142]/60 py-16">No articles yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
