import React from 'react';
import { STORE_CONFIG } from '../config';
import { CategoryType, Product } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryShowcaseProps {
  products: Product[];
  selectedCategory: CategoryType | 'All';
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
}) => {
  const { categories } = STORE_CONFIG;

  const getProductCount = (categoryId: CategoryType) => {
    return products.filter((p) => p.category === categoryId).length;
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] text-[#C59A45] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Silhouettes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#350C15] tracking-tight font-normal">
            Shop by Category
          </h2>
          <div className="w-12 h-0.5 bg-[#C59A45] mx-auto mt-3 mb-3"></div>
          <p className="text-sm sm:text-base text-[#6E5D53] font-normal">
            Discover handcrafted ensembles curated specifically for your celebratory gatherings.
          </p>
        </div>

        {/* Categories Grid (Mobile horizontal or 2-col, desktop 5-col) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {categories.map((cat) => {
            const count = getProductCount(cat.id);
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl text-left aspect-[4/5] sm:aspect-[3/4] shadow-sm transition-all duration-300 transform active:scale-95 focus:outline-none ${
                  isSelected
                    ? 'ring-3 ring-[#C59A45] ring-offset-2 ring-offset-[#FAF7F2]'
                    : 'hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Dark Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#24060C] via-[#24060C]/40 to-transparent group-hover:via-[#24060C]/60 transition-colors" />

                {/* Badge if selected */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 bg-[#C59A45] text-[#24060C] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Viewing
                  </div>
                )}

                {/* Content at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                  <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                    {count} {count === 1 ? 'Design' : 'Designs'}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg lg:text-xl font-medium tracking-wide mt-0.5 text-[#FAF7F2]">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#E8DFC8]/90 line-clamp-1 mt-0.5 font-light hidden sm:block">
                    {cat.tagline}
                  </p>

                  <div className="mt-2.5 flex items-center text-[10px] sm:text-xs font-medium text-[#FAF7F2] gap-1 group-hover:text-[#D4AF37] transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
