import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="floating-whatsapp-container"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group"
        >
          {/* Refined, Slightly Reduced Size FAB (Compact on mobile) */}
          <a
            id="floating-whatsapp-fab"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1B4332] hover:bg-[#143326] text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-lg border border-[#55D688]/40 transition-all duration-150 transform hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55D688] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#55D688]"></span>
            </span>
            <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#55D688]" />
            {/* On mobile, keep compact; show text on sm and up */}
            <span className="text-xs font-semibold tracking-wide font-sans hidden sm:inline">
              Chat on WhatsApp
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
