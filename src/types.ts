export type CategoryType = 'Sarees' | 'Kurtis' | 'Suits' | 'Festive Picks' | 'Kids Ethnic Wear';

export type ProductBadge = 'Bestseller' | 'New' | 'Festive Pick';

export type ProductAvailability = 'In Stock' | 'Limited Stock';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  badge?: ProductBadge;
  fabric: string;
  colors: string[];
  colorHexes?: Record<string, string>;
  availability: ProductAvailability;
  description: string;
  images: string[];
  featured?: boolean;
  occasion?: string;
  careInstructions?: string;
  fitNotes?: string;
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  tagline: string;
  image: string;
}

export interface StoreLocation {
  city: string;
  address: string;
  timing: string;
  phone: string;
}

export interface CatalogConfig {
  brandName: string;
  tagline: string;
  festivalCollectionName: string;
  festivalSeason: string;
  whatsappNumber: string;
  defaultWhatsappMessage: string;
  hero: {
    badge: string;
    headline: string;
    subtext: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    heroImage: string;
    heroMobileImage?: string;
  };
  editorialStory: {
    eyebrow: string;
    title: string;
    quote: string;
    body: string;
    image: string;
    artisanNote: string;
  };
  brandColors: {
    primaryMaroon: string;
    accentGold: string;
    deepEmerald: string;
    warmSand: string;
    darkCharcoal: string;
    softCream: string;
  };
  categories: CategoryInfo[];
  storeLocations: StoreLocation[];
  footer: {
    about: string;
    timing: string;
    deliveryNotice: string;
    copyright: string;
  };
}
