import React from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { Compass, Sparkles, MessageCircle, ArrowRight, Smartphone, Eye } from 'lucide-react';

export const WhyThisCatalogue: React.FC = () => {
  const { whyThisCatalogue } = STORE_CONFIG;

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-y border-[#E9E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#C5A880] uppercase mb-2">
            The Digital Catalogue Concept
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C182B] tracking-tight font-normal">
            {whyThisCatalogue.headline}
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-4" />
          <p className="text-base sm:text-lg text-[#4C5B70] leading-relaxed font-light">
            {whyThisCatalogue.text}
          </p>
        </div>

        {/* 3 Step Visual Journey */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9E5DD] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#0C182B] text-[#C5A880] flex items-center justify-center mb-5">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold text-[#7A889B] tracking-[0.2em] uppercase mb-1">
                Step 01
              </div>
              <h3 className="font-serif text-xl text-[#0C182B] mb-2 font-normal">
                Editorial Presentation
              </h3>
              <p className="text-sm text-[#5A687D] leading-relaxed font-light">
                Clean, mobile-first design with high-resolution visuals, refined typography, and generous whitespace.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2EFE9] text-xs font-medium text-[#0C182B] flex items-center gap-1">
              <span>Mobile-first layout</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9E5DD] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#0C182B] text-[#C5A880] flex items-center justify-center mb-5">
                <Eye className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold text-[#7A889B] tracking-[0.2em] uppercase mb-1">
                Step 02
              </div>
              <h3 className="font-serif text-xl text-[#0C182B] mb-2 font-normal">
                Frictionless Browsing
              </h3>
              <p className="text-sm text-[#5A687D] leading-relaxed font-light">
                No app installs, account sign-ups, or complicated checkouts. Customers simply browse your latest edit with ease.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2EFE9] text-xs font-medium text-[#0C182B] flex items-center gap-1">
              <span>Instant web link</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9E5DD] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#0C182B] text-[#C5A880] flex items-center justify-center mb-5">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="text-[11px] font-semibold text-[#7A889B] tracking-[0.2em] uppercase mb-1">
                Step 03
              </div>
              <h3 className="font-serif text-xl text-[#0C182B] mb-2 font-normal">
                Direct 1-on-1 Enquiry
              </h3>
              <p className="text-sm text-[#5A687D] leading-relaxed font-light">
                Single-tap transition from product interest into a personal WhatsApp conversation with pre-filled details.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2EFE9] text-xs font-medium text-[#0C182B] flex items-center gap-1">
              <span>WhatsApp conversion</span>
            </div>
          </div>
        </div>

        {/* Customer Journey Summary Strip */}
        <div className="rounded-2xl bg-[#0C182B] text-[#FAF9F6] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <div className="text-xs text-[#C5A880] tracking-[0.2em] uppercase font-semibold">
              The Intended Customer Journey
            </div>
            <div className="font-serif text-xl sm:text-2xl text-[#FAF9F6]">
              Instagram / WhatsApp → AZORIA Catalogue → WhatsApp Enquiry
            </div>
            <p className="text-xs sm:text-sm text-[#A0B0C8] font-light">
              Demonstrates a smooth digital presence for luxury women's wear clients.
            </p>
          </div>

          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#FAF9F6] text-[#0C182B] hover:bg-[#EAE6DE] text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap shadow-sm"
          >
            Experience Flow
          </a>
        </div>
      </div>
    </section>
  );
};
