import { CatalogConfig } from './types';

export const STORE_CONFIG: CatalogConfig = {
  brandName: 'AAROHI',
  tagline: 'The Navratri Edit 2026',
  festivalCollectionName: 'The Navratri Edit 2026',
  festivalSeason: 'Navratri Festive Celebration',
  whatsappNumber: '917033142912',
  defaultWhatsappMessage: "Hi, I'd like to know more about your Navratri Edit 2026 collection.",
  
  hero: {
    badge: '✦ SHUBH NAVRATRI COLLECTION ✦',
    headline: 'The Navratri Edit 2026',
    subtext: '9 Nights of Sacred Grace & Celebration. Handwoven Banarasi weaves, authentic Garba mirror-work kurtis, and royal festive ensembles.',
    primaryCtaText: 'Explore Navratri Collection',
    secondaryCtaText: 'Chat on WhatsApp',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=85',
    heroMobileImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=85',
  },

  editorialStory: {
    eyebrow: 'THE NAVRATRI CRAFT NOTE',
    title: 'Woven for the 9 Nights of Radiance',
    quote: 'From the sacred dawn of Ghatasthapana to the rhythmic swirls of midnight Garba, every drape honors the celebratory spirit of Navratri.',
    body: 'Handpicked from master weavers and karigars across Varanasi, Chanderi, and Gujarat, our 2026 Navratri Edit unites auspicious zaris, mirror-work embellishments, and pure handloom silks designed for every festive night.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85',
    artisanNote: 'Direct Artisan Weaves • Authentic Silk Mark • Handcrafted Detailing',
  },

  brandColors: {
    primaryMaroon: '#5A121F', // Deep Royal Maroon
    accentGold: '#C59A45',    // Muted Regal Gold
    deepEmerald: '#1B4332',   // Festive Forest Emerald
    warmSand: '#EFE7DC',      // Elegant Sand
    darkCharcoal: '#1F1819',  // Deep Dark Charcoal for text
    softCream: '#FAF7F2',     // Editorial Background
  },

  categories: [
    {
      id: 'Sarees',
      name: 'Sarees',
      tagline: 'Handloom Banarasi & Heirloom Silk weaves',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'Kurtis',
      name: 'Kurtis',
      tagline: 'Garba mirror-work & Lucknowi Chikankari kurtis',
    },
    {
      id: 'Suits',
      name: 'Suits',
      tagline: 'Flared Anarkalis & Festive Chinon sets',
    },
    {
      id: 'Festive Picks',
      name: 'Festive Picks',
      tagline: 'Royal 9-Nights showstopper drapes',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'Kids Ethnic Wear',
      name: 'Kids Ethnic Wear',
      tagline: 'Festive twirl lehengas & kurta-dhoti sets',
    },
  ],

  storeLocations: [
    {
      city: 'Flagship Atelier',
      address: 'Central Heritage Galleria, Main Boutique Boulevard',
      timing: '10:30 AM – 8:30 PM (All 7 Days)',
      phone: '+91 70331 42912',
    },
    {
      city: 'Studio Showroom',
      address: 'Artisan Arcade, Suite 104, Royal Palace Enclave',
      timing: '10:30 AM – 8:00 PM (Mon–Sat)',
      phone: '+91 70331 42912',
    },
  ],

  footer: {
    about: 'A boutique celebrating authentic Indian weaves, festival craftsmanship, and heirloom silhouettes.',
    timing: 'Store Hours: 10:30 AM – 8:30 PM IST',
    deliveryNotice: 'Navratri Delivery: Express shipping across India. Live video styling & fabric inspection available on WhatsApp.',
    copyright: '© 2026 AAROHI. All rights reserved. The Navratri Edit.',
  },
};

/**
 * Builds the WhatsApp direct chat link
 */
export function buildWhatsAppLink(message?: string): string {
  const number = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(message || STORE_CONFIG.defaultWhatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Builds the WhatsApp product enquiry link
 * Strictly formats as: "Hi, I'm interested in [PRODUCT NAME]." as mandated
 */
export function buildProductWhatsAppLink(productName: string): string {
  const message = `Hi, I'm interested in ${productName}.`;
  return buildWhatsAppLink(message);
}
