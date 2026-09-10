import React from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { Sparkles, MessageSquareHeart } from 'lucide-react';

export const EditorialStory: React.FC = () => {
  const { editorialStory, brandName, festivalSeason } = STORE_CONFIG;

  return (
    <section className="py-16 sm:py-24 bg-[#350C15] text-[#FAF7F2] relative overflow-hidden">
      {/* Subtle gold ornamentation glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#C59A45]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-[#C59A45]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Editorial Image Box */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold frame offset */}
              <div className="absolute -inset-3 rounded-2xl border border-[#D4AF37]/30 transform -rotate-1 hidden sm:block pointer-events-none" />
              
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] shadow-2xl border border-[#D4AF37]/40 bg-[#24060C]">
                <img
                  src={editorialStory.image}
                  alt={editorialStory.title}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24060C]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 p-3 bg-[#24060C]/80 backdrop-blur-sm rounded-lg border border-[#D4AF37]/30 text-center">
                  <p className="text-xs text-[#E8DFC8] tracking-wider uppercase font-medium">
                    {editorialStory.artisanNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Text Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{editorialStory.eyebrow}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7F2] leading-tight tracking-tight">
              {editorialStory.title}
            </h2>

            <blockquote className="font-serif text-lg sm:text-xl text-[#E8DFC8] italic font-light border-l-0 lg:border-l-2 lg:border-[#D4AF37] lg:pl-4">
              "{editorialStory.quote}"
            </blockquote>

            <p className="text-sm sm:text-base text-[#D3C7B5] font-light leading-relaxed">
              {editorialStory.body}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <a
                href={buildWhatsAppLink(`Hi ${brandName}, I loved your story and would like assistance selecting sarees for ${festivalSeason}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#C59A45] text-[#24060C] font-semibold text-xs uppercase tracking-wider shadow-lg transition-all transform active:scale-95"
              >
                <MessageSquareHeart className="w-4 h-4" />
                <span>Consult Our Boutique Stylist</span>
              </a>
              <span className="text-xs text-[#E8DFC8]/70 italic">
                Complimentary festival styling on WhatsApp
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
