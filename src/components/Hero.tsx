import React from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { MessageCircle, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { hero, festivalSeason, whatsappNumber } = STORE_CONFIG;

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#2D0A11] text-[#FAF7F2]">
      {/* Background Image with Rich Festive Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.heroImage}
          alt={hero.headline}
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24060C] via-[#350C15]/80 to-[#24060C]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C59A45]/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
        {/* Eyebrow / Festive Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
          <span>{hero.badge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
          <span>{festivalSeason}</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#FAF7F2] leading-[1.15] max-w-3xl mb-6">
          {hero.headline}
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#E8DFC8] font-light max-w-2xl mx-auto leading-relaxed mb-10">
          {hero.subtext}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md sm:max-w-none mb-12">
          {/* Primary CTA: Explore Collection */}
          <button
            id="hero-explore-collection-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF7F2] text-[#350C15] hover:bg-[#EFE7DC] font-semibold text-sm sm:text-base tracking-wide uppercase shadow-lg shadow-black/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
          >
            <span>{hero.primaryCtaText}</span>
            <ArrowDown className="w-4 h-4 text-[#350C15]" />
          </button>

          {/* Secondary CTA: Chat on WhatsApp */}
          <a
            id="hero-chat-whatsapp-btn"
            href={buildWhatsAppLink(STORE_CONFIG.defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1B4332] hover:bg-[#143326] text-[#FAF7F2] font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 border border-[#55D688]/30 shadow-lg shadow-black/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5 text-[#55D688]" />
            <span>{hero.secondaryCtaText}</span>
          </a>
        </div>

        {/* Value Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-[#D4AF37]/20 w-full max-w-2xl text-xs text-[#E8DFC8]">
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>100% Authentic Handloom Silks</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Instant WhatsApp Enquiry</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Live Video Call Showcase</span>
          </div>
        </div>
      </div>
    </section>
  );
};
