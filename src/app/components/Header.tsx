import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/0c9c94ee17a0572c7443134e0f4fe04bc7274d8f.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#F5F2ED] sticky top-0 z-50 border-b border-[#2B5142]/10">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-[#2B5142] text-white px-4 py-2 rounded z-50">
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" aria-label="Piantasia - Go to homepage">
              <img src={logo} alt="Piantasia logo" className="h-16 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <a href="#products" className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded">
              Products
            </a>
            <a href="#about" className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded">
              About
            </a>
            <a href="#benefits" className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded">
              Benefits
            </a>
            <a href="#contact" className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded">
              Contact
            </a>
          </nav>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.etsy.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#2B5142] text-white px-6 py-2.5 rounded-full hover:bg-[#1F3B2F] transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2"
              aria-label="Shop on Etsy (opens in new tab)"
            >
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              <span className="hidden sm:inline">Shop on Etsy</span>
            </a>
            
            <button 
              className="md:hidden p-2 text-[#2B5142] focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] focus:ring-offset-2 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav 
            id="mobile-menu"
            className="md:hidden py-4 border-t border-[#2B5142]/10"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-4" role="menu">
              <a 
                href="#products" 
                className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] rounded"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                Products
              </a>
              <a 
                href="#about" 
                className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] rounded"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                About
              </a>
              <a 
                href="#benefits" 
                className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] rounded"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                Benefits
              </a>
              <a 
                href="#contact" 
                className="text-[#2B5142] hover:text-[#8B7BA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B7BA8] rounded"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}