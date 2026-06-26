import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SECTION_IDS = ['products', 'about', 'faq', 'contact'] as const;

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="bg-[#F5F2ED] sticky top-0 z-50 border-b border-[#2B5142]/10">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-[#2B5142] text-white px-4 py-2 rounded z-50">
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" aria-label="Piantasia - Go to homepage">
              <img src="/logo-piantasia.png" alt="Piantasia logo" className="h-12 md:h-16 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation — plain <a> on home so only our scroll runs; Link when coming from other pages */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {SECTION_IDS.map((id) => {
              const label =
                id === 'products'
                  ? 'Products'
                  : id === 'about'
                    ? 'About'
                    : id === 'faq'
                      ? 'FAQ'
                      : 'Contact';
              const linkClass = 'text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded';
              return isHome ? (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  className={linkClass}
                >
                  {label}
                </a>
              ) : (
                <Link key={id} to={`/#${id}`} className={linkClass}>
                  {label}
                </Link>
              );
            })}
            <Link
              to="/blog"
              className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded"
            >
              Journal
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-[10px] text-[#2B5142] focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav 
          id="mobile-menu"
          className={`md:hidden border-t border-[#2B5142]/10 overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col space-y-4" role="menu">
            {SECTION_IDS.map((id) => {
              const label =
                id === 'products'
                  ? 'Products'
                  : id === 'about'
                    ? 'About'
                    : id === 'faq'
                      ? 'FAQ'
                      : 'Contact';
              const menuClass = 'text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] rounded py-1';
              return isHome ? (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => scrollToSection(id), 350);
                  }}
                  className={menuClass}
                  role="menuitem"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={id}
                  to={`/#${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={menuClass}
                  role="menuitem"
                >
                  {label}
                </Link>
              );
            })}
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] rounded py-1"
              role="menuitem"
            >
              Journal
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}