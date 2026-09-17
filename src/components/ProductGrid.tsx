import React, { useState, useMemo } from 'react';
import { Product, CategoryType } from '../types';
import { CATEGORIES_DATA } from '../config';
import { ProductCard } from './ProductCard';
import { Search, X } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: CategoryType | 'All';
  onSelectCategory: (cat: CategoryType | 'All') => void;
  onOpenDetail: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesFabric = item.fabric.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="featured-edit-section" className="py-14 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 border-b border-[#E9E5DD] pb-6 sm:pb-8">
          <div>
            <div className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#C5A880] uppercase mb-1.5">
              The Seasonal Selection
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C182B] font-normal tracking-tight">
              Featured Edit
            </h2>
            <p className="text-xs sm:text-sm text-[#5A687D] mt-2 font-normal">
              {selectedCategory === 'All'
                ? `Showing ${filteredProducts.length} sample silhouettes across all categories`
                : `Showing ${filteredProducts.length} sample silhouettes in ${selectedCategory}`}
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-[#7A889B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="product-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search silk, drape, cape, velvet..."
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#E9E5DD] rounded-full text-xs sm:text-sm text-[#0C182B] placeholder-[#8B9BB4] focus:outline-none focus:border-[#0C182B] focus:ring-1 focus:ring-[#0C182B] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A889B] hover:text-[#0C182B] p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          <button
            onClick={() => onSelectCategory('All')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-[0.12em] uppercase whitespace-nowrap active:scale-95 transition-all duration-150 cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#0C182B] text-[#FAF9F6] shadow-xs'
                : 'bg-white text-[#3A475A] border border-[#E9E5DD] hover:border-[#0C182B]'
            }`}
          >
            All Edits ({products.length})
          </button>

          {CATEGORIES_DATA.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-[0.12em] uppercase whitespace-nowrap active:scale-95 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0C182B] text-[#FAF9F6] shadow-xs'
                    : 'bg-white text-[#3A475A] border border-[#E9E5DD] hover:border-[#0C182B]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Mobile-First 2-Column Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl border border-[#E9E5DD] p-10 sm:p-14 text-center max-w-md mx-auto my-8 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#F4F1EA] flex items-center justify-center mx-auto mb-4 text-[#0C182B]">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-normal text-[#0C182B] mb-1">
              No matching silhouettes found
            </h3>
            <p className="text-xs text-[#5A687D] mb-6">
              Try a different keyword or view the complete seasonal edit.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#0C182B] text-[#FAF9F6] text-xs font-semibold tracking-wider uppercase hover:bg-[#16253D] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Subtle Sample Guidance Footer */}
        <div className="mt-12 text-center">
          <p className="text-[11px] text-[#7A889B] tracking-wider uppercase font-medium">
            Sample products and specifications shown for digital catalogue demonstration
          </p>
        </div>
      </div>
    </section>
  );
};
