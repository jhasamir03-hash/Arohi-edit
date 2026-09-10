import React from 'react';
import { STORE_CONFIG } from '../config';
import { CategoryType } from '../types';
import { MapPin, Clock, Heart, Sparkles, Phone } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: CategoryType | 'All') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const { brandName, tagline, storeLocations, footer, categories } = STORE_CONFIG;

  return (
    <footer className="bg-[#20040A] text-[#E8DFC8] pt-16 pb-12 border-t border-[#D4AF37]/30 relative overflow-hidden">
      {/* Subtle festive background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#C59A45]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Brand Identity Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/5 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Festive Showroom</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.25em] text-[#FAF7F2] uppercase mb-1">
            {brandName}
          </h2>

          <p className="text-xs tracking-[0.35em] text-[#C59A45] font-semibold uppercase mb-4">
            {tagline}
          </p>

          <p className="text-xs sm:text-sm text-[#D3C7B5] leading-relaxed font-light max-w-lg mx-auto mb-4">
            {footer.about}
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-[#E6CA65] bg-[#350C15]/70 px-4 py-1.5 rounded-full border border-[#D4AF37]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{footer.deliveryNotice}</span>
          </div>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mt-8" />
        </div>

        {/* Informational Columns (No WhatsApp or Share buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-[#D4AF37]/15 text-center md:text-left">
          {/* Col 1: Festival Collections */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h4 className="font-serif text-xs font-semibold tracking-[0.2em] text-[#FAF7F2] uppercase">
              Festival Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#D3C7B5]">
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  All Ethnic Pieces (15)
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelectCategory(c.id)}
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Boutique Stores */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h4 className="font-serif text-xs font-semibold tracking-[0.2em] text-[#FAF7F2] uppercase">
              Boutique Stores
            </h4>
            <div className="space-y-3 text-xs text-[#D3C7B5]">
              {storeLocations.map((loc, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="font-medium text-[#FAF7F2] flex items-center justify-center md:justify-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C59A45]" />
                    <span>{loc.city}</span>
                  </div>
                  <p className="text-[#A89F91] text-[11px]">{loc.address}</p>
                  <p className="text-[11px] text-[#C59A45]/80 flex items-center justify-center md:justify-start gap-1">
                    <Clock className="w-3 h-3 text-[#C59A45]" />
                    {loc.timing}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Boutique Concierge Details */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h4 className="font-serif text-xs font-semibold tracking-[0.2em] text-[#FAF7F2] uppercase">
              Boutique Concierge
            </h4>
            <p className="text-xs text-[#D3C7B5] leading-relaxed max-w-xs">
              Personal styling consultations, blouse tailoring, and video appointments during regular store hours.
            </p>
            <div className="text-xs text-[#FAF7F2] space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-[#D4AF37]">
                <Phone className="w-3.5 h-3.5" />
                <span>Store Desk: +91 70331 42912</span>
              </div>
              <p className="text-[11px] text-[#A89F91]">
                Kolkata & Jamshedpur Flagships
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A6B] gap-4 text-center sm:text-left">
          <p>{footer.copyright}</p>
          <div className="flex items-center justify-center gap-1.5 text-[#A89F91]">
            <span>Crafted for Indian Ethnic Boutiques with</span>
            <Heart className="w-3 h-3 text-[#B3394B] fill-current inline" />
            <span>• Festival Digital Catalog</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
