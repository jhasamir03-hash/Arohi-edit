import React, { useState, useEffect } from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappUrl = buildWhatsAppLink(STORE_CONFIG.defaultWhatsappMessage);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero-section');
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        setIsVisible(heroRect.bottom <= 100);
      } else {
        setIsVisible(window.scrollY > 350);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group animate-fade-in">
      <a
        id="floating-whatsapp-fab"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] p-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-lg border border-[#C5A880]/40 transition-all duration-150 transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Enquire on WhatsApp"
        title="Enquire on WhatsApp"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
        </span>
        <MessageCircle className="w-4 h-4 text-[#25D366]" />
        <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
          Enquire on WhatsApp
        </span>
      </a>
    </div>
  );
};
