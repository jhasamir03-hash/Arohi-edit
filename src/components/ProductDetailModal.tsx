import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatINR } from '../data/products';
import { buildProductWhatsAppLink, STORE_CONFIG } from '../config';
import {
  X,
  MessageCircle,
  Clock,
  CheckCircle,
  Share2,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Video,
  Scissors,
  Truck,
  ArrowRight,
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

  // Reset active image when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    // Lock background scroll when detail modal is open
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

  const isLimited = product.availability === 'Limited Stock';
  const whatsappUrl = buildProductWhatsAppLink(product.name);

  // Related products from same category or festive picks
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.badge === 'Festive Pick'))
    .slice(0, 3);

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} | ${STORE_CONFIG.brandName}`,
      text: `Take a look at the ${product.name} (${formatINR(product.price)}) from ${STORE_CONFIG.brandName}'s ${STORE_CONFIG.festivalCollectionName}:`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback or user dismissed
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareData.text} ${window.location.href}`
        );
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex justify-center p-0 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-none sm:max-h-[92vh] border border-[#E8DFC8]">
        {/* Top Header Bar for Modal */}
        <div className="sticky top-0 z-20 bg-[#FAF7F2]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-[#E8DFC8] flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#4A0E17] uppercase hover:text-[#722F37] transition-colors p-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share piece"
              className="p-2 rounded-full text-[#4A0E17] hover:bg-[#EFE7DC] border border-[#E8DFC8] transition-colors relative"
            >
              <Share2 className="w-4 h-4" />
              {copiedNotification && (
                <span className="absolute -bottom-8 right-0 bg-[#350C15] text-white text-[10px] py-1 px-2 rounded shadow whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#4A0E17] hover:bg-[#EFE7DC] transition-colors"
              aria-label="Close product details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            {/* Left: Product Image Showcase */}
            <div className="space-y-3">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#EFE7DC]/50 border border-[#E8DFC8] shadow-inner">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#C59A45] text-[#24060C] shadow-md">
                      {product.badge}
                    </span>
                  )}
                  {isLimited ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#FDF2E9] text-[#B7410E] border border-[#FADBD8] flex items-center gap-1.5 shadow-md">
                      <Clock className="w-3.5 h-3.5 text-[#B7410E]" />
                      Limited Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#E8F8F5] text-[#0E6251] border border-[#A2D9CE] flex items-center gap-1.5 shadow-md">
                      <CheckCircle className="w-3.5 h-3.5 text-[#0E6251]" />
                      In Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Image Thumbnail Selector if multiple */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#4A0E17] scale-105 shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Angle ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Garment Editorial Specifications & CTAs */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Badge */}
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59A45]">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.fabric}</span>
                </div>

                {/* Product Name */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#241A1C] font-semibold leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex flex-wrap items-baseline gap-3">
                  <div className="flex items-baseline gap-1 bg-white px-4 py-2 rounded-xl border border-[#E8DFC8] shadow-2xs">
                    <span className="text-xl sm:text-2xl font-bold text-[#C59A45]">₹</span>
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#350C15]">
                      {product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {product.originalPrice && (
                    <div className="flex items-baseline gap-0.5 text-sm sm:text-base text-[#8C7A6B] line-through font-normal">
                      <span>₹</span>
                      <span>{product.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <span className="text-xs text-[#8C7A6B] font-light">
                    (Inclusive of all festival taxes)
                  </span>
                </div>

                {/* Editorial Description */}
                <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] shadow-xs">
                  <p className="text-sm sm:text-base text-[#3E332A] font-light leading-relaxed italic">
                    "{product.description}"
                  </p>
                </div>

                {/* Fabric & Material Details */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="bg-white p-3 rounded-xl border border-[#E8DFC8]">
                      <span className="text-[#8C7A6B] block text-[11px] uppercase tracking-wider mb-0.5">
                        Fabric Composition
                      </span>
                      <span className="font-medium text-[#241A1C]">{product.fabric}</span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#E8DFC8]">
                      <span className="text-[#8C7A6B] block text-[11px] uppercase tracking-wider mb-0.5">
                        Availability Status
                      </span>
                      <span
                        className={`font-semibold ${
                          isLimited ? 'text-[#B7410E]' : 'text-[#0E6251]'
                        }`}
                      >
                        {product.availability}
                      </span>
                    </div>
                  </div>

                  {/* Available Colors with Visual Swatches */}
                  <div className="bg-white p-3.5 rounded-xl border border-[#E8DFC8]">
                    <span className="text-[#8C7A6B] block text-[11px] uppercase tracking-wider mb-2">
                      Available Shades & Accents
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {product.colors.map((colorName) => {
                        const hex = product.colorHexes?.[colorName] || '#C59A45';
                        return (
                          <div
                            key={colorName}
                            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] text-xs font-medium text-[#241A1C]"
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: hex }}
                            />
                            <span>{colorName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Occasion & Fit Guidance */}
                  {product.occasion && (
                    <div className="text-xs text-[#6E5D53] space-y-1.5 pt-1">
                      <p>
                        <strong className="text-[#350C15] font-semibold">Recommended for: </strong>
                        {product.occasion}
                      </p>
                      {product.fitNotes && (
                        <p>
                          <strong className="text-[#350C15] font-semibold">Drape / Fit Note: </strong>
                          {product.fitNotes}
                        </p>
                      )}
                      {product.careInstructions && (
                        <p>
                          <strong className="text-[#350C15] font-semibold">Care: </strong>
                          {product.careInstructions}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Primary Conversion CTA Box */}
              <div className="space-y-3 pt-2">
                <a
                  id="product-detail-whatsapp-cta-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#1B4332] hover:bg-[#143326] text-white font-semibold text-base tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-[#1B4332]/30 transition-all transform active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 text-[#55D688]" />
                  <span>Enquire on WhatsApp</span>
                </a>

                {/* Contextual WhatsApp prompt preview */}
                <div className="text-center text-[11px] text-[#8C7A6B]">
                  Pre-fills message: <span className="italic">"Hi, I'm interested in the {product.name} from your Festive Edit 2026."</span>
                </div>

                {/* Boutique Concierge Trust Badges */}
                <div className="rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] p-3.5 grid grid-cols-3 gap-2 text-center text-[11px] text-[#6E5D53]">
                  <div className="flex flex-col items-center">
                    <Video className="w-4 h-4 text-[#C59A45] mb-1" />
                    <span className="font-medium text-[#241A1C]">Live Video Call</span>
                    <span className="text-[10px] text-[#8C7A6B]">Available on chat</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-[#E8DFC8]">
                    <Scissors className="w-4 h-4 text-[#C59A45] mb-1" />
                    <span className="font-medium text-[#241A1C]">Custom Blouse</span>
                    <span className="text-[10px] text-[#8C7A6B]">Stitching & fits</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="w-4 h-4 text-[#C59A45] mb-1" />
                    <span className="font-medium text-[#241A1C]">Express Dispatch</span>
                    <span className="text-[10px] text-[#8C7A6B]">Pan-India delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related / You May Also Like Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-[#E8DFC8]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg sm:text-xl text-[#350C15] font-medium">
                  More Festive Selections
                </h3>
                <span className="text-xs text-[#8C7A6B]">Handpicked for you</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="group cursor-pointer bg-white rounded-xl border border-[#E8DFC8] overflow-hidden p-2 shadow-2xs hover:shadow-sm transition-all"
                  >
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#EFE7DC] mb-2">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-[11px] text-[#8C7A6B] uppercase tracking-wider truncate">
                      {rel.category}
                    </div>
                    <div className="font-serif text-xs sm:text-sm font-medium text-[#241A1C] truncate group-hover:text-[#5A121F]">
                      {rel.name}
                    </div>
                    <div className="flex items-baseline gap-0.5 font-bold text-[#350C15] mt-1 text-xs sm:text-sm">
                      <span className="text-[#C59A45] font-semibold">₹</span>
                      <span>{rel.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Sticky Bottom Conversion Bar */}
        <div className="sm:hidden sticky bottom-0 z-20 bg-[#FAF7F2] px-4 py-3 border-t border-[#E8DFC8] flex items-center justify-between gap-3 shadow-lg">
          <div>
            <div className="text-[10px] text-[#8C7A6B] uppercase tracking-wider font-medium">Price</div>
            <div className="flex items-baseline gap-0.5 font-bold text-[#350C15]">
              <span className="text-sm font-semibold text-[#C59A45]">₹</span>
              <span className="text-lg tracking-tight font-extrabold">{product.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-full bg-[#1B4332] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md active:bg-[#143326]"
          >
            <MessageCircle className="w-4 h-4 text-[#55D688]" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
