import React, { useState } from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { MessageCircle, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateCollections: () => void;
  onNavigateCategories: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onNavigateCollections,
  onNavigateCategories,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (callback: () => void) => {
    callback();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E9E5DD] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          {/* Left: Mobile Toggle & Desktop Navigation */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#0C182B] hover:bg-[#F2EFE9] rounded-lg transition-colors cursor-pointer lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button
                onClick={onNavigateHome}
                className="text-xs tracking-[0.18em] uppercase font-medium text-[#0C182B] hover:text-[#C5A880] transition-colors py-1 cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={onNavigateCollections}
                className="text-xs tracking-[0.18em] uppercase font-medium text-[#3A475A] hover:text-[#0C182B] transition-colors py-1 cursor-pointer"
              >
                Collections
              </button>
              <button
                onClick={onNavigateCategories}
                className="text-xs tracking-[0.18em] uppercase font-medium text-[#3A475A] hover:text-[#0C182B] transition-colors py-1 cursor-pointer"
              >
                Categories
              </button>
            </nav>
          </div>

          {/* Center: Text Logo (No Subheading) */}
          <div
            onClick={onNavigateHome}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer flex items-center justify-center group select-none text-center max-w-[65%] sm:max-w-none"
          >
            <span className="font-serif text-lg sm:text-2xl lg:text-3xl font-semibold tracking-[0.22em] sm:tracking-[0.28em] text-[#0C182B] group-hover:text-[#16253D] transition-colors uppercase whitespace-nowrap truncate sm:overflow-visible">
              {STORE_CONFIG.brandName}
            </span>
          </div>

          {/* Right Action: WhatsApp Icon / Button */}
          <div className="flex items-center justify-end">
            <a
              id="header-whatsapp-btn"
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] text-xs font-medium tracking-wider uppercase shadow-xs transition-all duration-150 active:scale-95 cursor-pointer border border-[#0C182B]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden sm:inline">Enquire</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-t border-[#E9E5DD] px-5 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick(onNavigateHome)}
              className="text-left text-sm tracking-[0.18em] uppercase font-semibold text-[#0C182B] py-2 border-b border-[#E9E5DD]/60"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick(onNavigateCollections)}
              className="text-left text-sm tracking-[0.18em] uppercase font-medium text-[#3A475A] py-2 border-b border-[#E9E5DD]/60"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick(onNavigateCategories)}
              className="text-left text-sm tracking-[0.18em] uppercase font-medium text-[#3A475A] py-2 border-b border-[#E9E5DD]/60"
            >
              Categories
            </button>
          </nav>

          <div className="pt-2">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0C182B] text-[#FAF9F6] text-xs font-semibold tracking-wider uppercase shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
