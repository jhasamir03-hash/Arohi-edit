import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);
  const whatsappUrl = buildWhatsAppLink(STORE_CONFIG.defaultWhatsappMessage);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero-section');
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        // Visible once the hero section has been scrolled past (bottom of hero is near top of viewport)
        setIsVisible(heroRect.bottom <= 120);
      } else {
        // Fallback to scroll position threshold
        setIsVisible(window.scrollY > 450);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="floating-whatsapp-container"
          initial={{ opacity: 0, scale: 0.85, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 18 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 group"
        >
          {/* Subtle Gentle Tooltip Callout */}
          {!isTooltipDismissed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="hidden sm:flex items-center gap-2 bg-[#2D0A11] text-[#FAF7F2] text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-[#D4AF37]/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Need help picking a saree? Chat with us!</span>
              <button
                onClick={() => setIsTooltipDismissed(true)}
                className="text-[#E8DFC8] hover:text-white ml-1 p-0.5 rounded transition-colors"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          {/* Floating Action Button */}
          <a
            id="floating-whatsapp-fab"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#1B4332] hover:bg-[#143326] text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border border-[#55D688]/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
            aria-label="Chat on WhatsApp with our boutique team"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55D688] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#55D688]"></span>
            </span>
            <MessageCircle className="w-5 h-5 text-[#55D688]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide font-sans">
              Chat on WhatsApp
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
