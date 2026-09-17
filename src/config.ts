import { CatalogConfig, CategoryInfo } from './types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'Festive Wear',
    name: 'Festive Wear',
    tagline: 'Refined celebratory silhouettes with artisan textures',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'Designer Wear',
    name: 'Designer Wear',
    tagline: 'Sculpted cuts, contemporary drapes & statement tailoring',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'Occasion Wear',
    name: 'Occasion Wear',
    tagline: 'Timeless gala gowns, cape sets & cocktail ensembles',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'New Arrivals',
    name: 'New Arrivals',
    tagline: 'Fresh season releases and bespoke capsule previews',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
  },
];

export const STORE_CONFIG: CatalogConfig = {
  brandName: 'AZORIA',
  tagline: "Designer Women's Wear",
  seasonEditName: 'The New Season Edit',
  whatsappNumber: '910000000000', // Configurable placeholder WhatsApp number
  defaultWhatsappMessage: "Hi AZORIA, I'm interested in this collection. Could you share more details?",
  categories: CATEGORIES_DATA,

  hero: {
    label: "AZORIA — DESIGNER WOMEN'S WEAR",
    headline: 'The New Season Edit',
    subheadline: 'Discover refined silhouettes designed for every special occasion.',
    primaryCtaText: 'Explore Collection',
    secondaryCtaText: 'Enquire on WhatsApp',
    // High-fashion editorial photography placeholder
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop&q=85',
  },

  whyThisCatalogue: {
    headline: 'Your Collection, Beautifully Presented',
    text: 'One simple link where customers can browse your collection, explore products and enquire directly.',
    highlights: [
      {
        title: 'Editorial Presentation',
        description: 'Clean, mobile-first design with high-resolution visuals and generous whitespace.',
      },
      {
        title: 'Frictionless Browsing',
        description: 'No app installs, account sign-ups, or complicated checkouts required.',
      },
      {
        title: 'Direct 1-on-1 Enquiry',
        description: 'Single-tap transition from visual discovery into personal WhatsApp conversation.',
      },
    ],
  },

  finalCta: {
    headline: 'Explore the AZORIA Collection',
    subtext: 'Browse the edit and enquire directly.',
    buttonText: 'Chat on WhatsApp',
  },

  footer: {
    brandName: 'AZORIA',
    descriptor: "Designer Women's Wear",
    conceptNote: 'A demo concept digital catalogue.',
    note: 'A demo concept digital catalogue.',
    whatsappButtonText: 'Enquire on WhatsApp',
    copyright: '© 2026 AZORIA. Designer Women’s Wear. Demo catalogue concept.',
  },
};

/**
 * Builds a universal WhatsApp click-to-chat URL with pre-filled text.
 * Configured with sample demonstrative number.
 */
export function buildWhatsAppLink(customMessage?: string): string {
  const phone = STORE_CONFIG.whatsappNumber;
  const message = customMessage || STORE_CONFIG.defaultWhatsappMessage;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a direct product enquiry WhatsApp link
 */
export function buildProductWhatsAppLink(productName: string): string {
  const message = `Hi AZORIA, I'm interested in the ${productName} from the new season edit. Could you share more details?`;
  return buildWhatsAppLink(message);
}
