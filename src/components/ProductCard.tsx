import React from 'react';
import { Product } from '../types';
import { Clock, ArrowUpRight } from 'lucide-react';

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
        return 'bg-[#C59A45] text-[#24060C] font-semibold';
      case 'New':
        return 'bg-[#1B4332] text-[#FAF7F2] font-semibold';
      case 'Festive Pick':
        return 'bg-[#5A121F] text-[#FAF7F2] font-semibold';
      default:
        return 'bg-[#350C15] text-[#FAF7F2] font-semibold';
    }
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/70 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
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
              className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] tracking-wider uppercase shadow-xs ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          {isLimited && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#FDF2E9] text-[#B7410E] border border-[#FADBD8] flex items-center gap-1 shadow-xs">
              <Clock className="w-3 h-3 text-[#B7410E]" />
              <span>Limited Stock</span>
            </span>
          )}
        </div>

        {/* Clean "View Details" Hover Callout on Desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-[#FAF7F2]/95 backdrop-blur-sm text-[#350C15] text-xs font-semibold px-4 py-2 rounded-full shadow-md border border-[#E8DFC8] flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C59A45]" />
          </span>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-3.5 sm:p-4.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Fabric tag */}
          <div className="flex items-center justify-between text-[11px] text-[#8C7A6B] uppercase tracking-wider mb-1.5 font-medium">
            <span className="text-[#350C15]/70">{product.category}</span>
            <span className="text-[#C59A45]">•</span>
            <span className="truncate max-w-[130px] font-normal">{product.fabric}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-[#241A1C] group-hover:text-[#5A121F] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Short description preview on desktop */}
          <p className="text-xs text-[#6E5D53] line-clamp-2 mt-1.5 font-light leading-relaxed hidden sm:block">
            {product.description}
          </p>
        </div>

        {/* Price & Clean Information Row (NO WhatsApp Inquire button) */}
        <div className="mt-3.5 pt-3 border-t border-[#F2EDE4] flex items-end justify-between gap-2">
          {/* Visually Polished Rupee and Total Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-base sm:text-lg text-[#C59A45] leading-none">
                ₹
              </span>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#350C15] leading-none">
                {product.price.toLocaleString('en-IN')}
              </span>
            </div>

            {product.originalPrice && (
              <span className="text-[11px] text-[#8C7A6B] line-through mt-0.5">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color Preview Swatches on Card */}
          <div className="flex items-center gap-1.5 pb-0.5">
            {product.colors.map((colorName) => {
              const hex = product.colorHexes?.[colorName] || '#D4AF37';
              return (
                <span
                  key={colorName}
                  title={colorName}
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-black/15 shadow-2xs transition-transform group-hover:scale-110"
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
