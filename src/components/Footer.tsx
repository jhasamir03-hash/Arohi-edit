import React from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { CategoryType } from '../types';
import { MapPin, Phone, Clock, MessageCircle, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: CategoryType | 'All') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const { brandName, tagline, storeLocations, footer, categories } = STORE_CONFIG;

  return (
    <footer className="bg-[#24060C] text-[#E8DFC8] pt-14 pb-10 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#FAF7F2] uppercase">
                {brandName}
              </span>
              <p className="text-[10px] tracking-[0.3em] text-[#C59A45] font-semibold uppercase mt-0.5">
                {tagline}
              </p>
            </div>
            <p className="text-xs text-[#D3C7B5] leading-relaxed font-light">
              {footer.about}
            </p>
            <div className="text-xs text-[#C59A45] flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{footer.deliveryNotice}</span>
            </div>
          </div>

          {/* Quick Categories Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF7F2] uppercase">
              Festival Collections
            </h4>
            <ul className="space-y-2 text-xs">
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

          {/* Boutique Flagships (Kolkata & Jamshedpur) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF7F2] uppercase">
              Boutique Stores
            </h4>
            <div className="space-y-3 text-xs">
              {storeLocations.map((loc, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-medium text-[#FAF7F2] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C59A45]" />
                    <span>{loc.city}</span>
                  </div>
                  <p className="text-[#A89F91] pl-5">{loc.address}</p>
                  <p className="text-[11px] text-[#8C7A6B] pl-5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C59A45]" />
                    {loc.timing}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Concierge Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF7F2] uppercase">
              WhatsApp Concierge
            </h4>
            <p className="text-xs text-[#D3C7B5] leading-relaxed">
              Order assistance, custom sizing, live video viewing, and international shipping queries.
            </p>
            <a
              href={buildWhatsAppLink(STORE_CONFIG.defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1B4332] hover:bg-[#143326] text-white text-xs font-semibold tracking-wider transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#55D688]" />
              <span>Connect on WhatsApp</span>
            </a>
            <div className="text-[11px] text-[#8C7A6B] pt-1">
              Store Support: +91 99999 99999
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A6B] gap-4">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-1 text-[#A89F91]">
            <span>Crafted for Indian Ethnic Boutiques with</span>
            <Heart className="w-3 h-3 text-[#B3394B] fill-current inline" />
            <span>• Festival Digital Catalog</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
