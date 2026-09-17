export type CategoryType = 'Festive Wear' | 'Designer Wear' | 'Occasion Wear' | 'New Arrivals';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  reviewerName: string;
  city?: string;
  rating: number;
  date: string;
  comment: string;
  fitFeedback?: string;
  verifiedPurchase?: boolean;
  helpfulCount: number;
}

export interface BoutiqueFeedback {
  id: string;
  name: string;
  city?: string;
  rating: number;
  date: string;
  feedbackType: 'Fabric Quality' | 'Festive Fitting' | 'Customer Care' | 'Delivery & Packaging';
  purchasedItem?: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  samplePrice?: number;
  samplePriceDisplay?: string;
  isSample: boolean;
  fabric: string;
  silhouette: string;
  colors: string[];
  colorHexes?: Record<string, string>;
  description: string;
  images: string[];
  featured?: boolean;
  occasion?: string;
  details?: string[];
  reviews?: ProductReview[];
  rating?: number;
  reviewCount?: number;
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  tagline: string;
  image: string;
}

export interface CatalogConfig {
  brandName: string;
  tagline: string;
  seasonEditName: string;
  whatsappNumber: string; // configurable placeholder
  defaultWhatsappMessage: string;
  categories: CategoryInfo[];
  hero: {
    label: string;
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    heroImage: string;
  };
  whyThisCatalogue: {
    headline: string;
    text: string;
    highlights: Array<{
      title: string;
      description: string;
    }>;
  };
  finalCta: {
    headline: string;
    subtext: string;
    buttonText: string;
  };
  footer: {
    brandName: string;
    descriptor: string;
    conceptNote: string;
    note: string;
    whatsappButtonText: string;
    copyright: string;
  };
}
