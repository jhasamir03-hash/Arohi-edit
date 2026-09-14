import React from 'react';
import { CategoryType } from '../types';
import { Sparkles, Camera, MessageCircle } from 'lucide-react';

interface ProductImagePlaceholderProps {
  category: CategoryType;
  productName: string;
  fabric: string;
  variant?: 'card' | 'modal' | 'thumb';
  className?: string;
}

export const ProductImagePlaceholder: React.FC<ProductImagePlaceholderProps> = ({
  category,
  productName,
  fabric,
  variant = 'card',
  className = '',
}) => {
  // Render an elegant festive vector illustration contour for the specific silhouette
  const renderFestiveContour = () => {
    switch (category) {
      case 'Sarees':
        return (
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#C59A45]/70" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Elegant stylized Saree drape contour */}
            <path d="M22 10C26 8 38 8 42 10C45 16 47 26 48 38C49 46 45 56 42 58C36 60 28 60 22 58C19 56 15 46 16 38C17 26 19 16 22 10Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 18C28 20 36 24 44 26" strokeDasharray="2 2" />
            <path d="M18 28C28 30 38 34 46 36" strokeDasharray="2 2" />
            <path d="M17 38C27 40 37 44 47 46" strokeDasharray="2 2" />
            <path d="M24 10L32 58" strokeLinecap="round" opacity="0.4" />
            <circle cx="32" cy="7" r="2.5" fill="currentColor" />
          </svg>
        );
      case 'Kurtis':
        return (
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#C59A45]/70" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Flared Kurti silhouette */}
            <path d="M26 12C28 14 36 14 38 12L46 18L42 28L38 26V56H26V26L22 28L18 18L26 12Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 14V32" strokeLinecap="round" strokeDasharray="1.5 1.5" />
            <circle cx="32" cy="20" r="1.5" fill="currentColor" />
            <circle cx="32" cy="26" r="1.5" fill="currentColor" />
          </svg>
        );
      case 'Suits':
        return (
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#C59A45]/70" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Flared Anarkali / Suit silhouette with dupatta drape */}
            <path d="M28 12C30 14 34 14 36 12L44 18L40 26L48 56H16L24 26L20 18L28 12Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 16C28 26 36 40 46 48" strokeDasharray="2 2" strokeLinecap="round" />
            <path d="M20 52H44" strokeLinecap="round" opacity="0.6" />
          </svg>
        );
      case 'Kids Ethnic Wear':
        return (
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#C59A45]/70" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Mini festive twirl lehenga / kurta */}
            <path d="M26 14C28 16 36 16 38 14L44 20L40 28L48 54H16L24 28L20 20L26 14Z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="32" cy="38" r="3" strokeDasharray="1 1" />
            <path d="M22 46C28 48 36 48 42 46" strokeDasharray="2 2" />
          </svg>
        );
      default:
        return (
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#C59A45]/70" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Heirloom festive motif */}
            <circle cx="32" cy="32" r="20" strokeDasharray="3 3" />
            <path d="M32 16V48M16 32H48" strokeLinecap="round" opacity="0.4" />
            <circle cx="32" cy="32" r="4" fill="currentColor" />
          </svg>
        );
    }
  };

  if (variant === 'thumb') {
    return (
      <div className={`w-full h-full bg-[#FAF7F2] border border-[#E8DFC8] flex flex-col items-center justify-center text-center p-1 ${className}`}>
        <Camera className="w-4 h-4 text-[#C59A45] opacity-60" />
        <span className="text-[9px] text-[#8C7A6B] font-medium mt-0.5">Sample</span>
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <div
        className={`w-full h-full min-h-[380px] sm:min-h-[480px] bg-gradient-to-b from-[#FAF7F2] via-[#F3EBE0] to-[#FAF7F2] border border-[#E8DFC8]/60 flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden ${className}`}
      >
        {/* Subtle festive background geometry */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

        {/* Studio Sample Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#350C15]/10 border border-[#350C15]/20 text-[#350C15] text-[11px] font-semibold tracking-wider uppercase mb-5 z-10">
          <Sparkles className="w-3.5 h-3.5 text-[#C59A45]" />
          <span>Boutique Sample • Photo in Curation</span>
        </div>

        {/* Contour illustration */}
        <div className="p-4 rounded-full bg-white/70 border border-[#E8DFC8] shadow-xs mb-4 z-10">
          {renderFestiveContour()}
        </div>

        <div className="max-w-xs z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C59A45] mb-1">
            {fabric}
          </p>
          <h4 className="font-serif text-lg sm:text-xl text-[#350C15] font-medium leading-snug mb-2">
            {productName}
          </h4>
          <p className="text-xs text-[#6E5D53] leading-relaxed font-light">
            High-definition studio lookbook photograph currently in photography schedule.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B4332] bg-[#1B4332]/10 px-3.5 py-1.5 rounded-full border border-[#1B4332]/20">
            <MessageCircle className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>Request Fabric Video / Photos on WhatsApp</span>
          </div>
        </div>
      </div>
    );
  }

  // Default 'card' variant for ProductCard
  return (
    <div
      className={`w-full h-full aspect-[4/5] bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE4] to-[#FAF7F2] flex flex-col items-center justify-between p-4 text-center select-none relative overflow-hidden ${className}`}
    >
      {/* Background festive dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

      {/* Top Tag */}
      <div className="z-10 self-start">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs text-[#5A121F] text-[10px] font-semibold tracking-wider uppercase border border-[#E8DFC8] shadow-2xs">
          <Sparkles className="w-3 h-3 text-[#C59A45]" />
          <span>Boutique Sample</span>
        </span>
      </div>

      {/* Center Motif */}
      <div className="z-10 flex flex-col items-center my-auto py-2">
        <div className="p-3 rounded-2xl bg-white/60 border border-[#E8DFC8] shadow-2xs mb-2.5">
          {renderFestiveContour()}
        </div>
        <p className="text-[11px] tracking-wider uppercase text-[#C59A45] font-semibold">
          {category}
        </p>
        <p className="text-[11px] text-[#8C7A6B] font-light max-w-[170px] truncate">
          {fabric}
        </p>
      </div>

      {/* Bottom discreet callout */}
      <div className="z-10 w-full pt-2 border-t border-[#E8DFC8]/60 flex items-center justify-center gap-1 text-[10px] text-[#6E5D53] font-medium">
        <Camera className="w-3 h-3 text-[#C59A45]" />
        <span>Photo in curation • Tap to enquire</span>
      </div>
    </div>
  );
};
