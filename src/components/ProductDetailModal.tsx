import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { buildProductWhatsAppLink, STORE_CONFIG } from '../config';
import { getLehengaFallbackSvg } from '../utils/productImages';
import { ProductReviewsSection } from './ProductReviewsSection';
import {
  X,
  MessageCircle,
  Share2,
  ChevronLeft,
  Check,
  Sparkles,
  Layers,
  Scissors,
  Feather,
  Scale,
  Award,
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
  const [currentImgSrc, setCurrentImgSrc] = useState<string>('');

  useEffect(() => {
    setActiveImageIndex(0);
    if (product) {
      document.body.style.overflow = 'hidden';
      setCurrentImgSrc(product.images[0]);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const handleImgError = () => {
    setCurrentImgSrc(getLehengaFallbackSvg(product.images[activeImageIndex] || product.images[0]));
  };

  const whatsappUrl = buildProductWhatsAppLink(product.name, product.priceDisplay);
  const prefilledMessage = `Hi Shree Fashion Collection, I am interested in ordering the "${product.name}" (${product.priceDisplay}, Pure blooming Vichitra silk, 7.5m flair). Could you please share availability and delivery details?`;

  // Related products from same category or collection
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} | ${STORE_CONFIG.brandName}`,
      text: `Take a look at ${product.name} (${product.priceDisplay}) from ${STORE_CONFIG.brandName}:`,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0C182B]/80 backdrop-blur-sm flex justify-center p-0 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-none sm:max-h-[94vh] border border-[#E9E5DD]">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-[#FAF9F6]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-[#E9E5DD] flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#0C182B] uppercase hover:text-[#C5A880] active:scale-95 transition-all p-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Catalogue</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#EAE6DE] text-[#0C182B] transition-colors relative cursor-pointer"
              title="Share Link"
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
            {/* Left: Large Product Visual */}
            <div className="space-y-3">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#0C182B] border border-[#E9E5DD] shadow-md">
                <img
                  src={currentImgSrc || product.images[0]}
                  alt={product.name}
                  onError={handleImgError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />

                {/* Badges Overlay */}
                <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C5A880] text-[#0C182B] shadow-md">
                    {product.priceDisplay} Flat
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-[#0C182B]/90 text-[#FAF9F6] backdrop-blur-xs border border-white/10">
                    7.50m Royal Flair
                  </span>
                </div>

                <div className="absolute bottom-3.5 right-3.5 z-10">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase bg-black/80 text-white backdrop-blur-xs">
                    Weight 3.5kg
                  </span>
                </div>
              </div>

              {/* Client Asset Verification Tag */}
              <div className="p-2.5 rounded-xl bg-[#F0F4F8] border border-[#D5E0EA] text-[11px] text-[#334E68] flex items-center justify-between">
                <span className="font-medium text-[#0C182B]">Client Product Asset:</span>
                <code className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#CBD5E1] text-[#1E293B]">
                  {product.images[0].replace(/^\//, '')}
                </code>
              </div>
            </div>

            {/* Right: Specifications & CTAs */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Category & Brand */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                    {STORE_CONFIG.brandName} • {product.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#1E824C] tracking-wider uppercase bg-[#E8F8F0] px-2.5 py-0.5 rounded-full border border-[#C2EBD4]">
                    Ready Stock • All Sizes
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#0C182B] leading-tight">
                  {product.name}
                </h1>

                {/* Pricing & Quality Banner */}
                <div className="p-4 rounded-2xl bg-[#F5EFEB] border border-[#DFCFC4] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#846654] uppercase tracking-wider font-bold">
                      Complete 3-Piece Set Price
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0C182B] mt-0.5">
                      {product.priceDisplay}
                    </div>
                    <div className="text-[11px] text-[#634E3F] mt-0.5 font-medium">
                      Includes Lehenga + Stitched Choli + 4.30m Dupatta
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#966324] bg-white px-2.5 py-1 rounded-full border border-[#E0AA3E]/40 shadow-xs">
                      <Award className="w-3.5 h-3.5 text-[#E0AA3E]" />
                      <span>One Level Up</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0C182B] bg-white px-2.5 py-1 rounded-full border border-[#C5A880]/40 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>A-One Quality</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0C182B] mb-1.5">
                    Design & Silhouette
                  </h3>
                  <p className="text-sm text-[#3A475A] leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {/* Detailed 3-Piece Specification Cards */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0C182B] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#C5A880]" />
                    <span>Exact Product Specifications</span>
                  </h3>

                  {/* Choli Spec */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E9E5DD] shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="font-semibold text-xs text-[#0C182B] flex items-center gap-1.5">
                        <Scissors className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Choli (Blouse)</span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#EBF5FB] text-[#2471A3] px-2 py-0.5 rounded">
                        Fully Stitched
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-[#7A889B] block">Fabric:</span>
                        <span className="font-medium text-[#2C3E50]">{product.choli.fabric}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#7A889B] block">Inner:</span>
                        <span className="font-medium text-[#2C3E50]">{product.choli.inner}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] text-[#7A889B] block">Work:</span>
                        <span className="font-medium text-[#2C3E50]">{product.choli.work}</span>
                      </div>
                      <div className="col-span-2 text-[11px] font-semibold text-[#1E824C]">
                        Size: {product.choli.size}
                      </div>
                    </div>
                  </div>

                  {/* Lehenga Spec */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E9E5DD] shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="font-semibold text-xs text-[#0C182B] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Lehenga (Skirt)</span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#FEF9E7] text-[#B7950B] px-2 py-0.5 rounded">
                        7.50M Royal Flair
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-[#7A889B] block">Fabric:</span>
                        <span className="font-medium text-[#2C3E50]">{product.lehenga.fabric}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#7A889B] block">Inner:</span>
                        <span className="font-medium text-[#2C3E50]">{product.lehenga.inner}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#7A889B] block">Flair:</span>
                        <span className="font-medium text-[#0C182B] font-bold">{product.lehenga.flair}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#7A889B] block">Construction:</span>
                        <span className="font-medium text-[#2C3E50]">{product.lehenga.construction}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] text-[#7A889B] block">Work:</span>
                        <span className="font-medium text-[#2C3E50]">{product.lehenga.work}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dupatta Spec & Weight */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-white border border-[#E9E5DD]">
                      <div className="font-semibold text-xs text-[#0C182B] flex items-center gap-1 mb-1">
                        <Feather className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Dupatta (4.30 Meter)</span>
                      </div>
                      <div className="text-[11px] text-[#2C3E50] space-y-0.5">
                        <div><span className="text-[#7A889B]">Fabric:</span> {product.dupatta.fabric}</div>
                        <div><span className="text-[#7A889B]">Work:</span> {product.dupatta.work}</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#E9E5DD] flex flex-col justify-between">
                      <div className="font-semibold text-xs text-[#0C182B] flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Total Garment Weight</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-base font-bold text-[#0C182B]">{product.weight}</span>
                        <span className="text-[10px] text-[#7A889B] block">Heavyweight luxury bridal feel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Conversion Section: Enquire on WhatsApp */}
              <div className="pt-4 border-t border-[#E9E5DD] space-y-3">
                <a
                  id="modal-whatsapp-enquire-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] text-xs sm:text-sm font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 shadow-md shadow-black/10 transition-all duration-150 transform active:scale-[0.99] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>Order on WhatsApp (₹1,500)</span>
                </a>

                {/* WhatsApp Message Preview */}
                <div className="p-3 rounded-xl bg-[#F0F4F8] border border-[#D5E0EA] text-[11px] text-[#334E68] flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#0C182B] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-[#0C182B]">
                      Pre-filled WhatsApp Message:
                    </span>
                    <span className="italic">
                      "{prefilledMessage}"
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Reviews Section */}
          <ProductReviewsSection product={product} />

          {/* Related Pieces Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-[#E9E5DD]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-[#0C182B]">
                  More from {product.category}
                </h3>
                <span className="text-xs text-[#7A889B]">Flat ₹1,500 Each</span>
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
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#0C182B] mb-2">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        onError={(e) => {
                          e.currentTarget.src = getLehengaFallbackSvg(rel.images[0]);
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-xs font-serif text-[#0C182B] truncate">
                      {rel.name}
                    </div>
                    <div className="text-[10px] font-bold text-[#0C182B] mt-0.5">
                      {rel.priceDisplay}
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
