import React, { useState, useMemo } from 'react';
import { Product, CategoryType } from '../types';
import { STORE_CONFIG } from '../config';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: CategoryType | 'All';
  onSelectCategory: (cat: CategoryType | 'All') => void;
  onOpenDetail: (product: Product) => void;
}

type BadgeFilter = 'All' | 'New' | 'Bestseller' | 'Festive Pick';
type PriceFilter = 'All' | 'under-3000' | '3000-8000' | 'above-8000';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBadge, setSelectedBadge] = useState<BadgeFilter>('All');
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter>('All');

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Badge curation match
      if (selectedBadge !== 'All' && item.badge !== selectedBadge) {
        return false;
      }

      // Price range match
      if (selectedPrice === 'under-3000' && item.price >= 3000) {
        return false;
      }
      if (selectedPrice === '3000-8000' && (item.price < 3000 || item.price > 8000)) {
        return false;
      }
      if (selectedPrice === 'above-8000' && item.price <= 8000) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesFabric = item.fabric.toLowerCase().includes(query);
        const matchesColors = item.colors.some((c) => c.toLowerCase().includes(query));
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesColors && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, selectedBadge, selectedPrice, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedBadge !== 'All' ||
    selectedPrice !== 'All' ||
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    onSelectCategory('All');
    setSelectedBadge('All');
    setSelectedPrice('All');
    setSearchQuery('');
  };

  return (
    <section id="collection-grid" className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#E8DFC8] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] text-[#C59A45] uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Showroom Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#350C15] font-normal tracking-tight">
              {selectedCategory === 'All' ? 'The Complete Festive Edit' : selectedCategory}
            </h2>
            <p className="text-xs sm:text-sm text-[#8C7A6B] mt-1 font-normal">
              Showing {filteredProducts.length} handcrafted {filteredProducts.length === 1 ? 'piece' : 'pieces'} ready for immediate WhatsApp reservation
            </p>
          </div>

          {/* Simple Clean Search Bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="product-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saree, kurti, silk..."
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#E8DFC8] rounded-full text-xs sm:text-sm text-[#241A1C] placeholder-[#8C7A6B] focus:outline-none focus:border-[#C59A45] focus:ring-1 focus:ring-[#C59A45] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#241A1C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-4 mb-8">
          {/* Main Category Tabs (Horizontal Scroll on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-[#4A0E17] text-[#FAF7F2] shadow-sm'
                  : 'bg-white text-[#4A0E17] border border-[#E8DFC8] hover:bg-[#EFE7DC]'
              }`}
            >
              All Categories ({products.length})
            </button>
            {STORE_CONFIG.categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#4A0E17] text-[#FAF7F2] shadow-sm'
                      : 'bg-white text-[#4A0E17] border border-[#E8DFC8] hover:bg-[#EFE7DC]'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Secondary Sub-filters: Curations & Price */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {/* Curation Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider mr-1 hidden sm:inline">
                Curations:
              </span>
              {(['All', 'New', 'Bestseller', 'Festive Pick'] as BadgeFilter[]).map((badge) => (
                <button
                  key={badge}
                  onClick={() => setSelectedBadge(badge)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedBadge === badge
                      ? 'bg-[#C59A45] text-[#24060C] font-semibold'
                      : 'bg-[#EFE7DC]/50 text-[#6E5D53] hover:bg-[#EFE7DC]'
                  }`}
                >
                  {badge === 'All' ? 'All Tags' : badge}
                </button>
              ))}
            </div>

            {/* Price Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider mr-1 hidden sm:inline">
                Price:
              </span>
              {[
                { id: 'All', label: 'All' },
                { id: 'under-3000', label: '< ₹3,000' },
                { id: '3000-8000', label: '₹3K – ₹8K' },
                { id: 'above-8000', label: '> ₹8,000' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPrice(p.id as PriceFilter)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedPrice === p.id
                      ? 'bg-[#1B4332] text-white font-semibold'
                      : 'bg-[#EFE7DC]/50 text-[#6E5D53] hover:bg-[#EFE7DC]'
                  }`}
                >
                  {p.label}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="px-2.5 py-1 text-xs text-[#5A121F] font-semibold hover:underline flex items-center gap-1 ml-1"
                >
                  <X className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-12 text-center max-w-md mx-auto my-8 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#EFE7DC] flex items-center justify-center mx-auto mb-4 text-[#5A121F]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#241A1C] mb-1">
              No matching pieces found
            </h3>
            <p className="text-xs sm:text-sm text-[#8C7A6B] mb-5">
              Try adjusting your search or resetting category and price filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-full bg-[#4A0E17] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#350C15] transition-colors"
            >
              Show All 15 Pieces
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
