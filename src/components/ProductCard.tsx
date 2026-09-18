import React, { useState } from 'react';
import { Product } from '../types';
import { buildProductWhatsAppLink } from '../config';
import { getLehengaFallbackSvg } from '../utils/productImages';
import { ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(product.images[0]);

  const handleEnquireClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(buildProductWhatsAppLink(product.name, product.priceDisplay), '_blank', 'noopener,noreferrer');
  };

  const handleImageError = () => {
    // If the client image asset is not found on disk, gracefully use the styled SVG fallback
    setImgSrc(getLehengaFallbackSvg(product.images[0]));
    setImageLoaded(true);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative bg-white rounded-2xl border border-[#E9E5DD] hover:border-[#C5A880] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 active:scale-[0.99] select-none"
    >
      {/* Product Image Box (4:5 portrait aspect ratio) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0C182B]">
        <img
          src={imgSrc}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Top Badges: Category & Price Highlight */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0C182B]/90 text-[#FAF9F6] backdrop-blur-xs shadow-xs border border-white/10">
            {product.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-[#C5A880] text-[#0C182B] shadow-xs">
            {product.priceDisplay}
          </span>
        </div>

        {/* Bottom overlay badge on image: 7.50M Flair & Can Can */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-wider uppercase bg-black/75 text-[#FAF9F6] backdrop-blur-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
            <span>7.50m Flair + Can Can</span>
          </span>
          <span className="px-2 py-0.5 rounded-md text-[9px] font-medium tracking-wider uppercase bg-black/75 text-[#FAF9F6] backdrop-blur-xs">
            3.5kg
          </span>
        </div>

        {/* Hover Quick Action on desktop */}
        <div className="absolute inset-x-3 bottom-12 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <span className="bg-[#FAF9F6]/95 backdrop-blur-xs text-[#0C182B] text-xs font-semibold px-4 py-1.5 rounded-full shadow-md border border-[#E9E5DD] flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <span>View Full Specifications</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </span>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-3.5 sm:p-4.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Fabric / Silhouette descriptor */}
          <div className="text-[10px] sm:text-[11px] text-[#C5A880] font-semibold uppercase tracking-wider mb-1 truncate">
            {product.fabric}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-sm sm:text-base font-normal text-[#0C182B] group-hover:text-[#16253D] transition-colors leading-snug line-clamp-2 min-h-[2.4rem] sm:min-h-[2.6rem]">
            {product.name}
          </h3>

          {/* Quick Specifications Pill Bar */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[10px] bg-[#F2EFE9] text-[#4A5568] px-2 py-0.5 rounded-md font-medium">
              Stitched Choli
            </span>
            <span className="text-[10px] bg-[#F2EFE9] text-[#4A5568] px-2 py-0.5 rounded-md font-medium">
              4.30m Dupatta
            </span>
            <span className="text-[10px] bg-[#F2EFE9] text-[#4A5568] px-2 py-0.5 rounded-md font-medium">
              All Sizes
            </span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-3.5 pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-[#7A889B] uppercase tracking-wider font-semibold">
              Special Price
            </div>
            <div className="text-base sm:text-lg font-bold text-[#0C182B]">
              {product.priceDisplay}
            </div>
          </div>

          {/* Action Buttons: Details & Enquire */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(product);
              }}
              className="py-1.5 px-2.5 rounded-lg bg-[#FAF9F6] hover:bg-[#EAE6DE] text-[#0C182B] text-[11px] font-semibold tracking-wider uppercase border border-[#E9E5DD] transition-colors"
            >
              Details
            </button>

            <button
              type="button"
              onClick={handleEnquireClick}
              title="Enquire on WhatsApp"
              className="py-1.5 px-3 rounded-lg bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden xs:inline uppercase text-[10px]">Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
