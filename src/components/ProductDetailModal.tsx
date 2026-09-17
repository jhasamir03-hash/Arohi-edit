import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { buildProductWhatsAppLink, STORE_CONFIG } from '../config';
import { ProductReviewsSection } from './ProductReviewsSection';
import {
  X,
  MessageCircle,
  Share2,
  ChevronLeft,
  Check,
  Sparkles,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  allProducts,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    setActiveImageIndex(0);
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const whatsappUrl = buildProductWhatsAppLink(product.name);
  const prefilledMessage = `Hi AZORIA, I'm interested in the ${product.name} from the new season edit. Could you share more details?`;

  // Related products from same category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} | AZORIA`,
      text: `Take a look at ${product.name} from AZORIA's New Season Edit:`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Dismissed
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareData.text} ${window.location.href}`
        );
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2000);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0C182B]/75 backdrop-blur-sm flex justify-center p-0 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-none sm:max-h-[94vh] border border-[#E9E5DD]">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-[#FAF9F6]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-[#E9E5DD] flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#0C182B] uppercase hover:text-[#C5A880] active:scale-95 transition-all p-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#EAE6DE] text-[#0C182B] transition-colors relative cursor-pointer"
              title="Share Silhouette Link"
              aria-label="Share"
            >
              {copiedNotification ? (
                <Check className="w-4 h-4 text-[#25D366]" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
              {copiedNotification && (
                <span className="absolute right-0 top-full mt-1 text-[10px] bg-[#0C182B] text-white px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link Copied
                </span>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EAE6DE] text-[#0C182B] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {/* Left: Large Product Visual & Thumbnail Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F2EFE9] border border-[#E9E5DD] shadow-xs">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />

                {/* Sample Product Floating Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#0C182B]/90 text-[#FAF9F6] backdrop-blur-xs shadow-sm">
                    Sample Product
                  </span>
                </div>
              </div>

              {/* Thumbnails if multiple images exist */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#0C182B] ring-2 ring-[#0C182B]/20 scale-102'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Editorial Specifications & CTAs */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                    {product.category}
                  </span>
                  <span className="text-[11px] font-medium text-[#7A889B] tracking-wider uppercase bg-[#F2EFE9] px-2.5 py-0.5 rounded-full border border-[#E9E5DD]">
                    Sample Concept
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#0C182B] leading-tight">
                  {product.name}
                </h1>

                {/* Sample Reference Price Note */}
                {product.samplePriceDisplay && (
                  <div className="p-3.5 rounded-xl bg-[#F4F1EA] border border-[#E9E5DD]">
                    <div className="text-xs text-[#5A687D] uppercase tracking-wider font-semibold">
                      Indicative Reference
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-[#0C182B] mt-0.5">
                      {product.samplePriceDisplay}
                    </div>
                    <p className="text-[11px] text-[#7A889B] mt-1 leading-relaxed">
                      Sample reference for demo purposes. Custom sizing and bespoke consultations handled directly via WhatsApp.
                    </p>
                  </div>
                )}

                {/* Neutral Description */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0C182B] mb-2">
                    Design & Silhouette
                  </h3>
                  <p className="text-sm text-[#3A475A] leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-[#E9E5DD]">
                  <div className="p-3 rounded-xl bg-white border border-[#E9E5DD]">
                    <span className="text-[10px] text-[#7A889B] uppercase tracking-wider font-semibold block mb-0.5">
                      Fabric Composition
                    </span>
                    <span className="font-medium text-[#0C182B]">{product.fabric}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E9E5DD]">
                    <span className="text-[10px] text-[#7A889B] uppercase tracking-wider font-semibold block mb-0.5">
                      Occasion Styling
                    </span>
                    <span className="font-medium text-[#0C182B]">
                      {product.occasion || 'Evening & Festive Receptions'}
                    </span>
                  </div>
                </div>

                {/* Color Variations */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-semibold text-[#0C182B] uppercase tracking-wider block">
                      Sample Palette
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {product.colors.map((color) => {
                        const hex = product.colorHexes?.[color] || '#0C182B';
                        return (
                          <div
                            key={color}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E9E5DD] text-xs text-[#0C182B]"
                          >
                            <span
                              className="w-3 h-3 rounded-full border border-black/10"
                              style={{ backgroundColor: hex }}
                            />
                            <span>{color}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tailoring & Drape Details */}
                {product.details && product.details.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#E9E5DD]">
                    <span className="text-xs font-semibold text-[#0C182B] uppercase tracking-wider block">
                      Garment Specifications
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#4C5B70]">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#C5A880] mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Primary Conversion Section: Enquire on WhatsApp */}
              <div className="pt-4 border-t border-[#E9E5DD] space-y-3">
                <a
                  id="modal-whatsapp-enquire-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 shadow-md shadow-black/10 transition-all duration-150 transform active:scale-[0.99] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>Enquire on WhatsApp</span>
                </a>

                {/* Demonstrative pre-filled message callout box */}
                <div className="p-3 rounded-xl bg-[#F0F4F8] border border-[#D5E0EA] text-[11px] text-[#334E68] flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#0C182B] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-[#0C182B]">
                      Demonstrated WhatsApp Customer Journey:
                    </span>
                    <span className="italic">
                      "{prefilledMessage}"
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Silhouette Reviews & Ratings (Demo) */}
          <ProductReviewsSection product={product} />

          {/* Related Silhouettes Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-[#E9E5DD]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-[#0C182B]">
                  More from {product.category}
                </h3>
                <span className="text-xs text-[#7A889B]">Sample Edit</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setActiveImageIndex(0);
                    }}
                    className="group bg-white rounded-xl border border-[#E9E5DD] overflow-hidden p-2 flex flex-col cursor-pointer hover:border-[#C5A880] transition-colors"
                  >
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#F2EFE9] mb-2">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-xs font-serif text-[#0C182B] truncate">
                      {rel.name}
                    </div>
                    <div className="text-[10px] text-[#7A889B] mt-0.5">
                      {rel.samplePriceDisplay}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
