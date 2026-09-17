import React from 'react';
import { CATEGORIES_DATA } from '../config';
import { CategoryType, Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
  products: Product[];
  selectedCategory: CategoryType | 'All';
  onSelectCategory: (category: CategoryType | 'All') => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
}) => {
  const getProductCount = (categoryId: CategoryType) => {
    return products.filter((p) => p.category === categoryId).length;
  };

  return (
    <section id="categories-section" className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-[#E9E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#C5A880] uppercase mb-2">
            Curated Lines
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C182B] tracking-tight font-normal">
            Shop by Category
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#4C5B70] font-normal leading-relaxed">
            Discover bespoke silhouettes, tailored cuts, and refined occasion ensembles.
          </p>
        </div>

        {/* Categories Grid - 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const count = getProductCount(cat.id);
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'All' : cat.id)}
                className={`group relative overflow-hidden rounded-2xl text-left aspect-[3/4] sm:aspect-[4/5] shadow-xs transition-all duration-300 transform active:scale-95 focus:outline-none cursor-pointer border ${
                  isSelected
                    ? 'border-[#C5A880] ring-2 ring-[#C5A880] shadow-md'
                    : 'border-[#E9E5DD] hover:border-[#C5A880]/60 hover:shadow-md'
                }`}
              >
                {/* Background Editorial Placeholder Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Deep Navy Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0C182B]/40 to-transparent group-hover:via-[#0C182B]/60 transition-colors" />

                {/* Selected Pill */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[#C5A880] text-[#0C182B] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                    Selected
                  </div>
                )}

                {/* Content at bottom of card */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-[#FAF9F6] z-10">
                  <div className="text-[10px] tracking-[0.2em] font-medium text-[#C5A880] uppercase">
                    {count} {count === 1 ? 'Design' : 'Designs'}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-normal tracking-wide text-[#FAF9F6] mt-0.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#D8DFE9] line-clamp-2 mt-1 font-light hidden sm:block">
                    {cat.tagline}
                  </p>

                  <div className="mt-3 flex items-center text-xs font-medium text-[#FAF9F6] gap-1.5 group-hover:text-[#C5A880] transition-colors">
                    <span className="tracking-wider uppercase text-[11px]">
                      {isSelected ? 'View Filtered' : 'Explore Category'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C5A880]" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Reset Filter Button if active */}
        {selectedCategory !== 'All' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => onSelectCategory('All')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#0C182B] text-xs font-semibold uppercase tracking-wider text-[#0C182B] hover:bg-[#0C182B] hover:text-[#FAF9F6] transition-colors cursor-pointer"
            >
              <span>Showing: {selectedCategory}</span>
              <span className="text-[#C5A880] font-bold">✕ Show All</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
