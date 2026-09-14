import React, { useState } from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { MessageCircle, Sparkles, X, Menu, Star } from 'lucide-react';
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
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToFeedback = () => {
    const el = document.getElementById('feedback-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]/70 transition-all">
      {/* Top Subtle Festive Ticker - Clean Navratri Edit without boutique text */}
      <div className="bg-[#350C15] text-[#F3E5D0] px-4 py-1.5 text-[11px] text-center font-medium tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
        <span className="font-semibold text-[#D4AF37]">Shubh Navratri • Festive Collection 2026</span>
        <span className="text-[#D4AF37]/50">•</span>
        <span className="text-[#F3E5D0]/90">Exclusive Festive Weaves & Garba Attires</span>
        <span className="hidden sm:inline text-[#D4AF37]/50">•</span>
        <span className="hidden sm:inline text-[#F3E5D0]/90">Direct Boutique Inquiries on WhatsApp</span>
      </div>

      {/* Main Navigation Bar - Sleek & Minimalist */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 -ml-1.5 text-[#350C15] hover:bg-[#EFE7DC]/60 active:scale-90 rounded-md transition-all duration-150 cursor-pointer"
              aria-label="Toggle categories"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Minimalist Brand Logo */}
          <div 
            onClick={onNavigateHome}
            className="cursor-pointer flex items-baseline gap-2 group active:scale-95 transition-transform duration-150 select-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#350C15] group-hover:text-[#5A121F] transition-colors uppercase">
              {STORE_CONFIG.brandName}
            </span>
            <span className="hidden sm:inline-block text-[9px] tracking-[0.3em] text-[#C59A45] font-semibold uppercase">
              {STORE_CONFIG.tagline}
            </span>
          </div>

          {/* Desktop Minimalist Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button
              onClick={() => onSelectCategory('All')}
              className={`text-xs tracking-wider uppercase font-medium transition-all relative py-1 active:scale-95 duration-150 cursor-pointer ${
                selectedCategory === 'All'
                  ? 'text-[#350C15] font-semibold'
                  : 'text-[#6E5D53] hover:text-[#350C15]'
              }`}
            >
              <span>All</span>
              {selectedCategory === 'All' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C59A45] rounded-full" />
              )}
            </button>

            {STORE_CONFIG.categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`text-xs tracking-wider uppercase font-medium transition-all relative py-1 active:scale-95 duration-150 cursor-pointer ${
                    isSelected
                      ? 'text-[#350C15] font-semibold'
                      : 'text-[#6E5D53] hover:text-[#350C15]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {isSelected && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C59A45] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Direct Link to Patron Feedback & Reviews */}
            <button
              onClick={handleScrollToFeedback}
              className="text-xs tracking-wider uppercase font-medium text-[#6E5D53] hover:text-[#350C15] transition-all relative py-1 active:scale-95 duration-150 cursor-pointer flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 text-[#C59A45] fill-[#C59A45]" />
              <span>Reviews & Feedback</span>
            </button>
          </nav>

          {/* Minimalist Right CTA: Direct WhatsApp Connect */}
          <div className="flex items-center">
            <a
              id="header-whatsapp-chat-btn"
              href={buildWhatsAppLink(STORE_CONFIG.defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B4332] hover:bg-[#143326] active:scale-95 text-[#FAF7F2] text-xs font-medium tracking-wide transition-all duration-150 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#55D688]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fast Horizontal Mobile Category Strip (Always 1-tap accessible on phone) */}
      <div className="lg:hidden border-t border-[#E8DFC8]/60 bg-[#FAF7F2] px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-[#350C15] text-[#FAF7F2] font-semibold shadow-xs'
              : 'bg-[#EFE7DC]/60 text-[#4A0E17]'
          }`}
        >
          All
        </button>
        {STORE_CONFIG.categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer ${
                isSelected
                  ? 'bg-[#350C15] text-[#FAF7F2] font-semibold shadow-xs'
                  : 'bg-[#EFE7DC]/60 text-[#4A0E17]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
        <button
          onClick={handleScrollToFeedback}
          className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer bg-[#FAF7F2] border border-[#E8DFC8] text-[#350C15] font-medium flex items-center gap-1"
        >
          <Star className="w-3 h-3 text-[#C59A45] fill-[#C59A45]" />
          <span>Reviews</span>
        </button>
      </div>

      {/* Expanded Minimalist Drawer for full overview */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[#E8DFC8] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-semibold tracking-widest text-[#8C7A6B] uppercase">
            Browse By Category
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectCategory('All');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer ${
                selectedCategory === 'All' ? 'bg-[#350C15] text-white shadow-xs' : 'bg-white border border-[#E8DFC8] text-[#350C15]'
              }`}
            >
              ✦ Complete Collection
            </button>
            {STORE_CONFIG.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer ${
                  selectedCategory === cat.id ? 'bg-[#350C15] text-white shadow-xs' : 'bg-white border border-[#E8DFC8] text-[#350C15]'
                }`}
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => {
                handleScrollToFeedback();
                setMobileMenuOpen(false);
              }}
              className="col-span-2 text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer bg-white border border-[#C59A45]/40 text-[#350C15] flex items-center justify-between"
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#C59A45] fill-[#C59A45]" />
                <span>Patron Feedback & Reviews</span>
              </div>
              <span className="text-[10px] text-[#8C7A6B]">4.9 ★</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
