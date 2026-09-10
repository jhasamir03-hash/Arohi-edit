import React from 'react';
import { Product } from '../types';
import { formatINR } from '../data/products';
import { buildProductWhatsAppLink } from '../config';
import { MessageCircle, Sparkles, Clock, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const isLimited = product.availability === 'Limited Stock';

  // Badge styling
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-[#C59A45] text-[#24060C]';
      case 'New':
        return 'bg-[#1B4332] text-[#FAF7F2]';
      case 'Festive Pick':
        return 'bg-[#5A121F] text-[#FAF7F2]';
      default:
        return 'bg-[#350C15] text-[#FAF7F2]';
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Product Image Box (4:5 portrait aspect ratio) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFE7DC]/40">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges (Left: Badge like Bestseller/New, Right: Limited Stock if applicable) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
          {product.badge ? (
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase shadow-sm ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          {isLimited ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#FDF2E9] text-[#B7410E] border border-[#FADBD8] flex items-center gap-1 shadow-sm">
              <Clock className="w-3 h-3 text-[#B7410E]" />
              Limited Stock
            </span>
          ) : null}
        </div>

        {/* Floating Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-2 bottom-2 hidden sm:flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-[#FAF7F2]/95 backdrop-blur-sm text-[#350C15] text-[11px] font-medium px-3 py-1.5 rounded-full shadow border border-[#E8DFC8] flex items-center gap-1">
            <span>View Details</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
          <a
            href={buildProductWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="bg-[#1B4332] hover:bg-[#143326] text-white p-2 rounded-full shadow-md transition-colors"
            title="Enquire directly on WhatsApp"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 text-[#55D688]" />
          </a>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-3.5 sm:p-4.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Fabric tag */}
          <div className="flex items-center justify-between text-[11px] text-[#8C7A6B] uppercase tracking-wider mb-1 font-medium">
            <span>{product.category}</span>
            <span className="text-[#C59A45]">•</span>
            <span className="truncate max-w-[120px]">{product.fabric}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-[#241A1C] group-hover:text-[#5A121F] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Short description preview on desktop */}
          <p className="text-xs text-[#6E5D53] line-clamp-2 mt-1 font-light leading-relaxed hidden sm:block">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 pt-3 border-t border-[#F2EDE4] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#4A0E17]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-[#A89F91] line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile One-Tap WhatsApp Button */}
          <a
            href={buildProductWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="sm:hidden bg-[#1B4332] text-white px-2.5 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 shadow-sm active:bg-[#143326]"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#55D688]" />
            <span>Enquire</span>
          </a>

          {/* Color Preview Swatches (Desktop) */}
          <div className="hidden sm:flex items-center gap-1.5">
            {product.colors.map((colorName) => {
              const hex = product.colorHexes?.[colorName] || '#D4AF37';
              return (
                <span
                  key={colorName}
                  title={colorName}
                  className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                  style={{ backgroundColor: hex }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
