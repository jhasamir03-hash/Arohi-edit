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
      {/* Top subtle editorial brand announcement banner */}
      <div className="bg-[#0C182B] text-[#FAF9F6] px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] uppercase text-center flex items-center justify-center gap-2">
        <span className="text-[#C5A880] font-bold">{STORE_CONFIG.brandName}</span>
        <span className="text-white/30">•</span>
        <span className="text-[#FAF9F6]/90">Pure Blooming Vichitra Silk • ₹1,500 Flat</span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="hidden sm:inline text-[#FAF9F6]/80 text-[10px] tracking-[0.15em]">
          7.50M Royal Flair with Can Can
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#0C182B] hover:bg-[#F2EFE9] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo / Brand Name */}
          <div
            onClick={onNavigateHome}
            className="cursor-pointer flex flex-col items-center lg:items-start group select-none"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.28em] text-[#0C182B] group-hover:text-[#16253D] transition-colors uppercase pl-1">
              {STORE_CONFIG.brandName}
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#C5A880] uppercase font-medium">
              {STORE_CONFIG.tagline}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
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

          {/* Right Action: WhatsApp Icon / Button */}
          <div className="flex items-center gap-3">
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
