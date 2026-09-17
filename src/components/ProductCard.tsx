import React, { useState } from 'react';
import { Product } from '../types';
import { buildProductWhatsAppLink } from '../config';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleEnquireClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(buildProductWhatsAppLink(product.name), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative bg-white rounded-2xl border border-[#E9E5DD] hover:border-[#C5A880]/70 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.99] select-none"
    >
      {/* Product Image Box (4:5 portrait aspect ratio) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4F1EA]">
        <img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Top Badges: Category & Sample Product Indicator */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase bg-[#0C182B]/85 text-[#FAF9F6] backdrop-blur-xs">
            {product.category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium tracking-wider uppercase bg-[#FAF9F6]/90 text-[#3A475A] border border-[#E9E5DD] backdrop-blur-xs">
            Sample
          </span>
        </div>

        {/* Hover Quick Action on desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <span className="bg-[#FAF9F6]/95 backdrop-blur-xs text-[#0C182B] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md border border-[#E9E5DD] flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </span>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-3 sm:p-4.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Fabric / Silhouette descriptor */}
          <div className="text-[10px] sm:text-[11px] text-[#5A687D] truncate mb-1 font-medium">
            {product.fabric}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-sm sm:text-base font-normal text-[#0C182B] group-hover:text-[#16253D] transition-colors leading-snug line-clamp-2 min-h-[2.4rem] sm:min-h-[2.75rem]">
            {product.name}
          </h3>
        </div>

        {/* Sample Reference / Actions Row */}
        <div className="mt-3 pt-2.5 border-t border-[#F2EFE9] flex flex-col gap-2">
          {product.samplePriceDisplay && (
            <div className="text-[11px] text-[#7A889B] font-medium">
              {product.samplePriceDisplay}
            </div>
          )}

          {/* Action Buttons: View Details & Enquire */}
          <div className="flex items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(product);
              }}
              className="flex-1 py-1.5 px-2 rounded-lg bg-[#FAF9F6] hover:bg-[#EAE6DE] text-[#0C182B] text-[11px] font-semibold tracking-wider uppercase border border-[#E9E5DD] transition-colors flex items-center justify-center gap-1"
            >
              <span>Details</span>
            </button>

            <button
              type="button"
              onClick={handleEnquireClick}
              title="Enquire on WhatsApp"
              className="py-1.5 px-2.5 rounded-lg bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span className="hidden xs:inline text-[10px] uppercase font-semibold">Enquire</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
