import React, { useState, useEffect } from 'react';
import { STORE_CONFIG } from './config';
import { PRODUCTS } from './data/products';
import { CategoryType, Product } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductGrid } from './components/ProductGrid';
import { WhyThisCatalogue } from './components/WhyThisCatalogue';
import { FeedbackSection } from './components/FeedbackSection';
import { WhatsAppFinalCta } from './components/WhatsAppFinalCta';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    // Smooth scroll to the featured edit section
    const element = document.getElementById('featured-edit-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const element = document.getElementById('featured-edit-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCollections = () => {
    const element = document.getElementById('featured-edit-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateCategories = () => {
    const element = document.getElementById('categories-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0C182B] flex flex-col selection:bg-[#0C182B] selection:text-[#FAF9F6] font-sans antialiased">
      {/* Top Header: AZORIA with Home, Collections, Categories and WhatsApp Enquire */}
      <Header
        onNavigateHome={handleNavigateHome}
        onNavigateCollections={handleNavigateCollections}
        onNavigateCategories={handleNavigateCategories}
      />

      {/* Main Flow */}
      <main className="flex-1">
        {/* Editorial Fashion Hero Section */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Shop by Category: Festive Wear, Designer Wear, Occasion Wear, New Arrivals */}
        <CategoryShowcase
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Featured Collection: "Featured Edit", 2-column mobile grid, Sample products */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenDetail={handleOpenProductDetail}
        />

        {/* Customer-Facing Concept Value: "Your Collection, Beautifully Presented" */}
        <WhyThisCatalogue />

        {/* Dedicated Feedback & Ratings Section (Demo) */}
        <FeedbackSection />

        {/* Final WhatsApp Call to Action: "Explore the AZORIA Collection" */}
        <WhatsAppFinalCta />
      </main>

      {/* Minimal Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Persistent Floating WhatsApp Consultation Button */}
      <FloatingWhatsApp />

      {/* Polished Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProductDetail}
        onSelectProduct={handleOpenProductDetail}
        allProducts={PRODUCTS}
      />
    </div>
  );
}
