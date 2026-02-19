import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <a href="/#products" className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded">
              Products
            </a>
            <a href="/#about" className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded">
              About
            </a>
            <a href="/#contact" className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded">
              Contact
            </a>
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
          className={`md:hidden border-t border-[#2B5142]/10 overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-60 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col space-y-4" role="menu">
            <a 
              href="/#products" 
              className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] rounded py-1"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Products
            </a>
            <a 
              href="/#about" 
              className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] rounded py-1"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              About
            </a>
            <a 
              href="/#contact" 
              className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] rounded py-1"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}