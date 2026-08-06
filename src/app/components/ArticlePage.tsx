import { useEffect, createElement } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import type { ComponentProps } from 'react';

type BlocksComponents = NonNullable<ComponentProps<typeof BlocksRenderer>['blocks']>;
export type { BlocksContent };
import { articles } from '@/data/articles';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';

function formatDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const blockRenderers: BlocksComponents = {
  paragraph: ({ children }) => (
    <p className="font-sans text-base text-[#2B5142] leading-relaxed mb-5">{children}</p>
  ),
  heading: ({ children, level }) =>
    createElement(
      `h${level}`,
      { className: 'font-heading text-2xl lg:text-3xl text-[#2B5142] mt-8 mb-3' },
      children
    ),
  link: ({ children, url }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#8B7BA8] underline underline-offset-2 hover:text-[#2B5142]"
    >
      {children}
    </a>
  ),
  list: ({ children, format }) =>
    format === 'ordered' ? (
      <ol className="list-decimal pl-6 mb-5 space-y-1 text-[#2B5142]">{children}</ol>
    ) : (
      <ul className="list-disc pl-6 mb-5 space-y-1 text-[#2B5142]">{children}</ul>
    ),
  quote: ({ children }) => (
    <blockquote className="border-l-2 border-[#8B7BA8] pl-4 italic text-[#2B5142]/80 my-6">
      {children}
    </blockquote>
  ),
};

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F5F2ED]">
        <Header />
        <main className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
          <h1 className="text-3xl text-[#2B5142] mb-4">Article not found</h1>
          <Link to="/#blog" className="font-sans text-[#8B7BA8] hover:text-[#2B5142] underline">
            Back to the journal
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const meta = [
    article.category,
    formatDate(article.publishedAt),
    article.author,
    article.language?.toUpperCase(),
  ]
    .filter(Boolean)
    .join('  ·  ');

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />

      <main>
        <div className="max-w-[760px] mx-auto px-6 sm:px-8 pt-4 md:pt-6">
          <Link
            to="/#blog"
            className="font-sans inline-flex items-center gap-2 text-[#2B5142]/75 hover:text-[#2B5142] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            The journal
          </Link>
        </div>

        <article className="max-w-[760px] mx-auto px-6 sm:px-8 py-8 md:py-12">
          {meta && (
            <p className="font-sans text-xs uppercase tracking-widest text-[#8B7BA8] mb-4">{meta}</p>
          )}
          <h1 className="font-heading text-4xl lg:text-5xl text-[#2B5142] leading-tight mb-6">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="font-sans text-lg text-[#2B5142]/80 mb-8">{article.excerpt}</p>
          )}

          {article.cover && (
            <div className="rounded-2xl overflow-hidden mb-10 bg-[#F5F2ED]">
              <ImageWithFallback
                src={article.cover}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {article.content && article.content.length > 0 && (
            <div className="max-w-none">
              <BlocksRenderer content={article.content} blocks={blockRenderers} />
            </div>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[#2B5142]/10">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-xs text-[#2B5142]/70 bg-[#8B7BA8]/10 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
