import { Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openCookiePreferences } from '@/lib/consent';

export function Footer() {
  return (
    <footer className="bg-[#2B5142] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <img src="/logo-piantasia.png" alt="Piantasia" className="h-10 md:h-12 w-auto mb-4" />
            <p className="text-white/80 text-sm md:text-base mb-4 max-w-md">
              Piantasia offers premium herbal blends as natural alternatives. All our products are organic, sustainably sourced, and crafted with care.
            </p>
            <div className="flex items-center space-x-2">
              <a 
                href="https://www.instagram.com/Piantasia.eu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Follow us on Instagram (opens in new tab)"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:hello@piantasia.eu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Email hello@piantasia.eu"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#products" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  Products
                </a>
              </li>
              <li>
                <a href="/#about" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  About
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  Journal
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-base md:text-lg mb-3 md:mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/legal-notice" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="text-white/80 hover:text-white transition-colors text-sm md:text-base text-left"
                >
                  Cookie settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-white/60 text-xs sm:text-sm">
            © 2026 Piantasia. All rights reserved. | This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}