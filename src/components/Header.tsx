import React, { useState } from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { MessageCircle, Share2, Sparkles, MapPin, X, Menu } from 'lucide-react';
import { CategoryType } from '../types';

interface HeaderProps {
  onSelectCategory: (cat: CategoryType | 'All') => void;
  selectedCategory: CategoryType | 'All';
  onOpenShareModal: () => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectCategory,
  selectedCategory,
  onOpenShareModal,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]/60 transition-all">
      {/* Top Festive Announcement Bar */}
      <div className="bg-[#4A0E17] text-[#F3E5D0] px-4 py-1.5 text-xs text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        <span>{STORE_CONFIG.festivalSeason} • Direct WhatsApp Boutique Support</span>
        <span className="hidden sm:inline text-[#D4AF37]/60">•</span>
        <span className="hidden sm:inline text-[#F3E5D0]/80">Jamshedpur & Kolkata Boutiques</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A0E17] hover:bg-[#EFE7DC] rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Identity / Center on mobile, left on desktop */}
          <div 
            onClick={onNavigateHome}
            className="cursor-pointer text-center lg:text-left flex flex-col items-center lg:items-start group"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#4A0E17] group-hover:text-[#722F37] transition-colors uppercase">
              {STORE_CONFIG.brandName}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#8C7A6B] font-medium uppercase mt-0.5">
              {STORE_CONFIG.tagline}
            </span>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-full ${
                selectedCategory === 'All'
                  ? 'bg-[#4A0E17] text-[#FAF7F2]'
                  : 'text-[#4A0E17]/80 hover:text-[#4A0E17] hover:bg-[#EFE7DC]/60'
              }`}
            >
              All Pieces
            </button>
            {STORE_CONFIG.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-full ${
                  selectedCategory === cat.id
                    ? 'bg-[#4A0E17] text-[#FAF7F2]'
                    : 'text-[#4A0E17]/80 hover:text-[#4A0E17] hover:bg-[#EFE7DC]/60'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>

          {/* Action CTAs: Share & WhatsApp */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              id="header-share-catalog-btn"
              onClick={onOpenShareModal}
              title="Share or scan QR code"
              className="p-2 sm:px-3 sm:py-2 text-[#4A0E17] hover:bg-[#EFE7DC] border border-[#E8DFC8] rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4 text-[#C59A45]" />
              <span className="hidden md:inline">Share Catalog</span>
            </button>

            <a
              id="header-whatsapp-chat-btn"
              href={buildWhatsAppLink(STORE_CONFIG.defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B4332] hover:bg-[#143326] text-[#FAF7F2] px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 shadow-sm transition-all transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#55D688]" />
              <span className="hidden sm:inline">WhatsApp Chat</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFC8] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="text-[11px] font-semibold tracking-wider text-[#8C7A6B] uppercase mb-1">
            Browse Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectCategory('All');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === 'All' ? 'bg-[#4A0E17] text-white' : 'bg-[#EFE7DC]/50 text-[#4A0E17]'
              }`}
            >
              ✦ All Collection
            </button>
            {STORE_CONFIG.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat.id ? 'bg-[#4A0E17] text-white' : 'bg-[#EFE7DC]/50 text-[#4A0E17]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8DFC8] flex items-center justify-between text-xs text-[#8C7A6B]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C59A45]" />
              Jamshedpur & Kolkata
            </span>
            <button
              onClick={() => {
                onOpenShareModal();
                setMobileMenuOpen(false);
              }}
              className="text-[#4A0E17] font-semibold underline underline-offset-2"
            >
              Get Store QR Code
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
