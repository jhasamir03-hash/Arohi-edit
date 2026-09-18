import React from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { getLehengaFallbackSvg } from '../utils/productImages';
import { MessageCircle, ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { hero } = STORE_CONFIG;

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#0A1628] text-[#FAF9F6]">
      {/* Editorial Fashion Photography Background with Subtle Deep Navy Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.heroImage}
          alt={`${STORE_CONFIG.brandName} Festive Collection`}
          onError={(e) => {
            e.currentTarget.src = getLehengaFallbackSvg(hero.heroImage);
          }}
          className="w-full h-full object-cover object-center opacity-35 scale-102 transition-transform duration-1000"
          loading="eager"
        />
        {/* Deep Navy Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0C182B]/85 to-[#0A1628]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#16253D]/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center flex flex-col items-center">
        {/* Editorial Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF9F6]/10 border border-[#C5A880]/40 text-[#C5A880] text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-6 backdrop-blur-xs">
          <span>{hero.label}</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#FAF9F6] leading-[1.12] max-w-3xl mb-6">
          {hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-xl text-[#D8DFE9] font-light max-w-2xl mx-auto leading-relaxed mb-10 tracking-wide">
          {hero.subheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-sm sm:max-w-none mb-10">
          {/* Primary Button: Explore Collection */}
          <button
            id="hero-explore-collection-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF9F6] text-[#0C182B] hover:bg-[#EAE6DE] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-lg shadow-black/20 transition-all duration-150 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{hero.primaryCtaText}</span>
            <ArrowDown className="w-4 h-4 text-[#0C182B]" />
          </button>

          {/* Secondary Button: Enquire on WhatsApp */}
          <a
            id="hero-enquire-whatsapp-btn"
            href={buildWhatsAppLink(hero.secondaryCtaText)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#16253D] hover:bg-[#1E314F] text-[#FAF9F6] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 border border-[#C5A880]/30 shadow-lg shadow-black/20 transition-all duration-150 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>{hero.secondaryCtaText}</span>
          </a>
        </div>

        {/* Minimal Concept Caption Note */}
        <p className="text-[11px] tracking-[0.15em] uppercase text-[#8B9BB4] font-medium max-w-lg">
          Editorial Concept Demonstration • Modern Luxury Fashion Experience
        </p>
      </div>
    </section>
  );
};
