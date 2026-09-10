import React from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { MessageCircle, Video, Scissors, Truck, Clock, Sparkles } from 'lucide-react';

export const WhatsAppFinalCta: React.FC = () => {
  const { brandName, festivalCollectionName, whatsappNumber } = STORE_CONFIG;

  const quickQuestions = [
    {
      title: 'Schedule a Video Call',
      desc: 'Inspect fabric & sheen live via WhatsApp video call before ordering.',
      icon: Video,
      message: `Hi ${brandName}, I would like to schedule a quick WhatsApp video call to see pieces from ${festivalCollectionName}.`,
    },
    {
      title: 'Custom Stitching / Sizing',
      desc: 'Enquire about matching blouses, falls & pico, or custom tailoring.',
      icon: Scissors,
      message: `Hi ${brandName}, do you provide custom blouse stitching and size alterations for your festive collection?`,
    },
    {
      title: 'Express Festival Delivery',
      desc: 'Check fast delivery dates to your city across India.',
      icon: Truck,
      message: `Hi ${brandName}, I need an outfit delivered before festival celebrations. What is the fastest delivery timeframe?`,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-xs font-semibold tracking-wider text-[#1B4332] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
          <span>One-Tap Boutique Assistance</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#350C15] font-normal tracking-tight max-w-2xl mx-auto mb-4">
          Have Questions? Chat Directly With Our Boutique Team
        </h2>

        <p className="text-sm sm:text-base text-[#6E5D53] max-w-xl mx-auto mb-8 font-light">
          No automated bots. When you tap below, you connect straight with our in-house ethnic stylists on WhatsApp.
        </p>

        {/* Big Main CTA Button */}
        <div className="mb-10">
          <a
            id="final-section-whatsapp-btn"
            href={buildWhatsAppLink(STORE_CONFIG.defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 rounded-full bg-[#1B4332] hover:bg-[#143326] text-white font-semibold text-base sm:text-lg tracking-wide shadow-xl shadow-[#1B4332]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-6 h-6 text-[#55D688]" />
            <span>Chat With Us on WhatsApp</span>
          </a>
          <div className="text-xs text-[#8C7A6B] mt-2.5 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#C59A45]" />
            <span>Typically replies within 10–15 minutes during store hours</span>
          </div>
        </div>

        {/* Quick Assistance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {quickQuestions.map((q, index) => {
            const Icon = q.icon;
            return (
              <a
                key={index}
                href={buildWhatsAppLink(q.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs hover:shadow-md hover:border-[#C59A45]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-center mb-3 text-[#4A0E17] group-hover:bg-[#4A0E17] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-medium text-[#241A1C] mb-1">
                    {q.title}
                  </h3>
                  <p className="text-xs text-[#6E5D53] leading-relaxed font-light">
                    {q.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F2EDE4] flex items-center text-xs font-semibold text-[#1B4332] group-hover:text-[#143326] gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#55D688]" />
                  <span>Tap to ask on WhatsApp &rarr;</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
