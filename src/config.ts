import { CatalogConfig } from './types';

export const STORE_CONFIG: CatalogConfig = {
  brandName: 'AAROHI',
  tagline: 'The Festive Edit 2026',
  festivalCollectionName: 'The Festive Edit 2026',
  festivalSeason: 'Navratri & Diwali Celebration',
  whatsappNumber: '919999999999',
  defaultWhatsappMessage: "Hi, I'd like to know more about your Festive Edit 2026 collection.",
  
  hero: {
    badge: 'EXCLUSIVE FESTIVAL LAUNCH',
    headline: 'The Festive Edit 2026',
    subtext: 'Curated sarees and timeless ethnic pieces for every celebration.',
    primaryCtaText: 'Explore Collection',
    secondaryCtaText: 'Chat on WhatsApp',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=85',
    heroMobileImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=85',
  },

  editorialStory: {
    eyebrow: 'THE ARTISAN NOTE',
    title: 'Woven for the Lights of Navratri & Diwali',
    quote: 'Every drape tells a story of patience, heritage, and the celebratory rhythm of festive India.',
    body: 'Handpicked from master weavers across Varanasi, Chanderi, and Kanchipuram, our 2026 Festive Edit brings together heirloom zaris, gossamer silks, and contemporary festive silhouettes designed to be cherished across generations.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85',
    artisanNote: 'Direct Weaver Partnerships • Hand-Finished Borders • Authentic Silks',
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
      tagline: 'Banarasi, Kanjivaram & Organza weaves',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'Kurtis',
      name: 'Kurtis',
      tagline: 'Chikankari, Rayon & Mirror-work',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'Suits',
      name: 'Suits',
      tagline: 'Anarkalis, Palazzo sets & Chinon silks',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'Festive Picks',
      name: 'Festive Picks',
      tagline: 'Showstopper celebration ensembles',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'Kids Ethnic Wear',
      name: 'Kids Ethnic Wear',
      tagline: 'Mini lehengas & festive kurta sets',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80',
    },
  ],

  storeLocations: [
    {
      city: 'Kolkata Flagship',
      address: 'Park Street Extension, Near Allen Park, Kolkata 700016',
      timing: '10:30 AM – 8:30 PM (All 7 Days)',
      phone: '+91 99999 99999',
    },
    {
      city: 'Jamshedpur Boutique',
      address: 'Bistupur Main Road, Opp. Gopal Maidan, Jamshedpur 831001',
      timing: '10:30 AM – 8:00 PM (Mon–Sat)',
      phone: '+91 99999 99999',
    },
  ],

  footer: {
    about: 'A boutique celebrating Indian weaves, festival craftsmanship, and heirloom silhouettes since 2018.',
    timing: 'Store Hours: 10:30 AM – 8:30 PM IST',
    deliveryNotice: 'Festival Delivery: Ships within 24–48 hours across India. International dispatch available upon request on WhatsApp.',
    copyright: '© 2026 AAROHI. All rights reserved. The Festive Edit.',
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
 * Example: "Hi, I'm interested in the Noor Banarasi Saree from your Festive Edit 2026."
 */
export function buildProductWhatsAppLink(productName: string): string {
  const message = `Hi, I'm interested in the ${productName} from your ${STORE_CONFIG.festivalCollectionName}.`;
  return buildWhatsAppLink(message);
}
