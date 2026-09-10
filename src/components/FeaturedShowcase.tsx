import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, Flame, Star, ArrowRight } from 'lucide-react';

interface FeaturedShowcaseProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onExploreAll: () => void;
}

type ShowcaseTab = 'featured' | 'bestsellers' | 'new';

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({
  products,
  onOpenDetail,
  onExploreAll,
}) => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('featured');

  const displayedProducts = React.useMemo(() => {
    if (activeTab === 'bestsellers') {
      return products.filter((p) => p.badge === 'Bestseller');
    }
    if (activeTab === 'new') {
      return products.filter((p) => p.badge === 'New');
    }
    // 'featured' tab: items with featured: true or badge: 'Festive Pick'
    return products.filter((p) => p.featured || p.badge === 'Festive Pick').slice(0, 4);
  }, [products, activeTab]);

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] text-[#C59A45] uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Highlights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#350C15] font-normal tracking-tight">
              Featured Festival Edits
            </h2>
            <p className="text-xs sm:text-sm text-[#8C7A6B] mt-1">
              Top curated picks for Navratri evenings and Diwali celebrations
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-[#EFE7DC]/60 p-1 rounded-full border border-[#E8DFC8] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                activeTab === 'featured'
                  ? 'bg-[#4A0E17] text-white shadow-xs'
                  : 'text-[#6E5D53] hover:text-[#4A0E17]'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Festive Picks</span>
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                activeTab === 'bestsellers'
                  ? 'bg-[#4A0E17] text-white shadow-xs'
                  : 'text-[#6E5D53] hover:text-[#4A0E17]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#B7410E]" />
              <span>Bestsellers</span>
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                activeTab === 'new'
                  ? 'bg-[#4A0E17] text-white shadow-xs'
                  : 'text-[#6E5D53] hover:text-[#4A0E17]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>New Arrivals</span>
            </button>
          </div>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>

        {/* Explore All Link */}
        <div className="mt-8 text-center">
          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#4A0E17] hover:text-[#722F37] uppercase tracking-wider group"
          >
            <span>Browse Complete Collection ({products.length} Designs)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
