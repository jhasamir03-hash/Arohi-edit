import React from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFinalCta: React.FC = () => {
  const { finalCta } = STORE_CONFIG;

  return (
    <section className="py-16 sm:py-24 bg-[#0A1628] text-[#FAF9F6] relative overflow-hidden">
      {/* Subtle deep navy gradient & glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#16253D]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0C182B]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#C5A880] uppercase mb-3">
          AZORIA • Designer Women's Wear
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF9F6] tracking-tight mb-4">
          {finalCta.headline}
        </h2>

        <p className="text-base sm:text-lg text-[#BAC7DA] max-w-xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
          {finalCta.subtext}
        </p>

        {/* Big Main WhatsApp CTA Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          <a
            id="final-section-whatsapp-btn"
            href={buildWhatsAppLink(finalCta.buttonText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-[#FAF9F6] hover:bg-[#EAE6DE] text-[#0C182B] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-xl transition-all duration-150 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>{finalCta.buttonText}</span>
          </a>

          <span className="text-[11px] text-[#7A8C9E] tracking-wider uppercase font-medium mt-2">
            Direct 1-on-1 Consultation • Demonstrative Sample Journey
          </span>
        </div>
      </div>
    </section>
  );
};
