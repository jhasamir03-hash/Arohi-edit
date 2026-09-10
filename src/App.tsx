import React, { useState, useEffect } from 'react';
import { STORE_CONFIG } from './config';
import { PRODUCTS } from './data/products';
import { CategoryType, Product } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedShowcase } from './components/FeaturedShowcase';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { EditorialStory } from './components/EditorialStory';
import { WhatsAppFinalCta } from './components/WhatsAppFinalCta';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ShareCatalogModal } from './components/ShareCatalogModal';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Sync with URL query or hash on mount to support direct product/category deep-links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product=')) {
        const productId = hash.replace('#product=', '');
        const found = PRODUCTS.find((p) => p.id === productId);
        if (found) {
          setSelectedProduct(found);
        }
      } else if (hash.startsWith('#category=')) {
        const categoryName = decodeURIComponent(hash.replace('#category=', '')) as CategoryType;
        if (STORE_CONFIG.categories.some((c) => c.id === categoryName)) {
          setSelectedCategory(categoryName);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when a product is opened
  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
    window.location.hash = `product=${product.id}`;
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
    if (window.location.hash.startsWith('#product=')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleSelectCategory = (category: CategoryType | 'All') => {
    setSelectedCategory(category);
    // Smooth scroll to the collection grid
    const element = document.getElementById('collection-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const element = document.getElementById('collection-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241A1C] flex flex-col selection:bg-[#B3394B] selection:text-white font-sans">
      {/* Top Header */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onNavigateHome={handleNavigateHome}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section with WhatsApp and Explore CTAs */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Featured Handpicked Highlights / Bestsellers / New Arrivals */}
        <FeaturedShowcase
          products={PRODUCTS}
          onOpenDetail={handleOpenProductDetail}
          onExploreAll={handleExploreClick}
        />

        {/* Visual Category Showcase (Sarees, Kurtis, Suits, Festive Picks, Kids Ethnic Wear) */}
        <CategoryShowcase
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Full Collection Showroom with Category Tabs, Search & Filters */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenDetail={handleOpenProductDetail}
        />

        {/* Editorial Story / Brand Breathing Moment */}
        <EditorialStory />

        {/* Closing WhatsApp Concierge Section with Quick Question Cards */}
        <WhatsAppFinalCta />
      </main>

      {/* Footer with Boutique Stores & Info */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProductDetail}
        onSelectProduct={handleOpenProductDetail}
        allProducts={PRODUCTS}
      />

      {/* Share / QR Code Modal for store owners and customers */}
      <ShareCatalogModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
