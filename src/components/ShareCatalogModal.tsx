import React, { useState } from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config';
import { X, Copy, Check, MessageCircle, QrCode, Instagram, Sparkles, Smartphone } from 'lucide-react';

interface ShareCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareCatalogModal: React.FC<ShareCatalogModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `✨ Explore ${STORE_CONFIG.brandName}'s ${STORE_CONFIG.festivalCollectionName} — curated sarees and timeless festive ethnic-wear: ${currentUrl}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8DFC8] overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4A0E17] hover:bg-[#EFE7DC] rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-3 text-[#4A0E17]">
            <QrCode className="w-6 h-6 text-[#C59A45]" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-[#241A1C]">
            Share Digital Showroom
          </h3>
          <p className="text-xs text-[#8C7A6B] mt-1">
            One link for your Instagram Bio, WhatsApp broadcast & in-store QR stands
          </p>
        </div>

        {/* Demo QR Code Visual */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] flex flex-col items-center justify-center mb-6 shadow-xs">
          <div className="relative p-3 bg-white border-2 border-[#4A0E17] rounded-xl shadow-inner">
            {/* High-contrast stylized SVG QR code representation */}
            <svg
              className="w-40 h-40"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" fill="#FFFFFF" />
              {/* Corner Position Detection Squares */}
              <rect x="10" y="10" width="26" height="26" fill="#350C15" rx="3" />
              <rect x="15" y="15" width="16" height="16" fill="#FFFFFF" />
              <rect x="18" y="18" width="10" height="10" fill="#350C15" />

              <rect x="64" y="10" width="26" height="26" fill="#350C15" rx="3" />
              <rect x="69" y="15" width="16" height="16" fill="#FFFFFF" />
              <rect x="72" y="18" width="10" height="10" fill="#350C15" />

              <rect x="10" y="64" width="26" height="26" fill="#350C15" rx="3" />
              <rect x="15" y="69" width="16" height="16" fill="#FFFFFF" />
              <rect x="18" y="72" width="10" height="10" fill="#350C15" />

              {/* Data Blocks Pattern */}
              <rect x="42" y="12" width="6" height="6" fill="#C59A45" />
              <rect x="52" y="16" width="6" height="6" fill="#350C15" />
              <rect x="42" y="24" width="6" height="6" fill="#350C15" />
              <rect x="50" y="28" width="8" height="6" fill="#C59A45" />

              <rect x="14" y="44" width="6" height="6" fill="#350C15" />
              <rect x="24" y="48" width="6" height="6" fill="#C59A45" />
              <rect x="34" y="42" width="6" height="6" fill="#350C15" />

              <rect x="44" y="42" width="12" height="12" fill="#350C15" rx="2" />
              <rect x="47" y="45" width="6" height="6" fill="#FFFFFF" />

              <rect x="62" y="44" width="6" height="6" fill="#C59A45" />
              <rect x="74" y="46" width="10" height="6" fill="#350C15" />
              <rect x="86" y="42" width="4" height="6" fill="#350C15" />

              <rect x="42" y="64" width="8" height="6" fill="#350C15" />
              <rect x="54" y="68" width="6" height="6" fill="#C59A45" />
              <rect x="46" y="76" width="6" height="8" fill="#350C15" />
              <rect x="64" y="66" width="6" height="6" fill="#350C15" />
              <rect x="76" y="72" width="8" height="6" fill="#C59A45" />
              <rect x="68" y="80" width="12" height="6" fill="#350C15" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-[#FAF7F2] p-1 rounded-full shadow border border-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5 text-[#4A0E17]" />
              </span>
            </div>
          </div>
          <span className="text-[11px] text-[#6E5D53] mt-3 font-medium flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-[#C59A45]" />
            Scan to test mobile showroom on your phone
          </span>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#E8DFC8] mb-4">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent text-xs text-[#241A1C] px-2 focus:outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-[#4A0E17] hover:bg-[#350C15] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#55D688]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#143326] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#55D688]" />
            <span>Share via WhatsApp Broadcast</span>
          </a>

          <div className="text-[11px] text-[#8C7A6B] text-center pt-2">
            Add this link to your <strong>Instagram Bio</strong>: <span className="text-[#4A0E17]">"Tap our bio link to browse The Festive Edit 2026"</span>
          </div>
        </div>
      </div>
    </div>
  );
};
