import { CatalogConfig, CategoryInfo } from './types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'Festive Wear',
    name: 'Festive Wear',
    tagline: 'Bandhani, patola & auspicious festive lehengas in blooming Vichitra silk',
    image: '/IMG_20260917_204813_114.jpg',
  },
  {
    id: 'Designer Wear',
    name: 'Designer Wear',
    tagline: 'Intricate mirror work, heritage kutch patchwork & statement drapes',
    image: '/IMG_20260917_204829_669.jpg',
  },
  {
    id: 'Occasion Wear',
    name: 'Occasion Wear',
    tagline: 'Royal purple, emerald & magenta evening lehengas with 7.50m flair',
    image: '/IMG_20260917_204839_902.jpg',
  },
  {
    id: 'New Arrivals',
    name: 'New Arrivals',
    tagline: 'Latest blooming Vichitra silk additions with fully stitched cholis',
    image: '/IMG_20260917_204729_674.jpg',
  },
];

export const STORE_CONFIG: CatalogConfig = {
  brandName: 'Shree Fashion Collection',
  tagline: 'Pure Blooming Vichitra Silk Collection',
  seasonEditName: 'Festive & Wedding Lehenga Edit',
  whatsappNumber: '910000000000', // Configurable WhatsApp enquiry number
  defaultWhatsappMessage:
    "Hi Shree Fashion Collection, I'm interested in your Pure Blooming Vichitra Silk Lehenga Collection (₹1,500, 7.5m flair). Please share availability and ordering details.",
  categories: CATEGORIES_DATA,

  hero: {
    label: 'SHREE FASHION COLLECTION — PURE BLOOMING VICHITRA SILK',
    headline: 'Royal 7.50M Flair Lehengas',
    subheadline:
      'Pure blooming Vichitra silk sets with heavy embroidery thread & hand work, fully stitched choli, 4.30m dupatta, and attached can can patta at ₹1,500.',
    primaryCtaText: 'Explore Collection',
    secondaryCtaText: 'Enquire on WhatsApp',
    heroImage: '/IMG_20260917_204832_870.jpg',
  },

  whyThisCatalogue: {
    headline: 'Pure Silk Craftsmanship & Extraordinary Value',
    text: 'Browse the entire 10-piece collection, inspect detailed embroidery specifications, and enquire directly on WhatsApp.',
    highlights: [
      {
        title: '7.50 Meter Royal Flair with Can Can',
        description:
          'Every lehenga features massive 7.50 meter flair structured with attached canvas patta and can can for royal volume.',
      },
      {
        title: 'Fully Stitched All-Size Choli',
        description:
          'Crafted in pure blooming Vichitra silk with micro silk inner and heavy embroidery thread & hand work. All sizes available.',
      },
      {
        title: '4.30M Dupatta & 3.5kg Heavy Weight',
        description:
          'Authentic 3.5kg luxury weight with matching 4.30 meter extra-long dupatta and guaranteed A-One Quality.',
      },
    ],
  },

  finalCta: {
    headline: 'Order from Shree Fashion Collection',
    subtext: 'Flat ₹1,500 for every piece. Direct 1-on-1 assistance via WhatsApp.',
    buttonText: 'Chat on WhatsApp',
  },

  footer: {
    brandName: 'Shree Fashion Collection',
    descriptor: 'Pure Blooming Vichitra Silk Lehengas • ₹1,500 Flat',
    conceptNote: 'Digital catalogue showcasing authentic client photography.',
    note: 'Pure blooming Vichitra silk with heavy embroidery thread & hand work.',
    whatsappButtonText: 'Enquire on WhatsApp',
    copyright: '© 2026 Shree Fashion Collection. All rights reserved.',
  },
};

/**
 * Builds a universal WhatsApp click-to-chat URL with pre-filled text.
 */
export function buildWhatsAppLink(customMessage?: string): string {
  const phone = STORE_CONFIG.whatsappNumber;
  const message = customMessage || STORE_CONFIG.defaultWhatsappMessage;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a direct product enquiry WhatsApp link
 */
export function buildProductWhatsAppLink(productName: string, priceDisplay: string = '₹1,500'): string {
  const message = `Hi Shree Fashion Collection, I am interested in ordering the "${productName}" (${priceDisplay}, Pure blooming Vichitra silk, 7.5m flair). Could you please share availability and delivery details?`;
  return buildWhatsAppLink(message);
}
