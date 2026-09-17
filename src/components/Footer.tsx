import React from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { MessageCircle } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const { brandName, tagline, footer } = STORE_CONFIG;

  return (
    <footer className="bg-[#081220] text-[#D8DFE9] py-14 sm:py-16 border-t border-[#16253D] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Brand Name */}
        <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.25em] text-[#FAF9F6] uppercase mb-1">
          {brandName}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm tracking-[0.2em] text-[#C5A880] uppercase font-medium mb-3">
          {tagline}
        </p>

        {/* Demo Concept Digital Catalogue statement */}
        <p className="text-xs sm:text-sm text-[#8B9BB4] max-w-md mx-auto mb-6 font-light leading-relaxed">
          {footer.note}
        </p>

        {/* WhatsApp CTA Button */}
        <a
          id="footer-whatsapp-cta-btn"
          href={buildWhatsAppLink(footer.whatsappButtonText)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF9F6] hover:bg-[#EAE6DE] text-[#0C182B] text-xs font-semibold tracking-[0.16em] uppercase shadow-md transition-all duration-150 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span>{footer.whatsappButtonText}</span>
        </a>

        {/* Minimal Copyright */}
        <div className="mt-10 pt-6 border-t border-[#16253D] w-full text-center">
          <p className="text-[11px] text-[#5A687D] tracking-wider uppercase font-medium">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
