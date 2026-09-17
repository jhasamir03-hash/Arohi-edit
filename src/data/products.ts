import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'azoria-01',
    name: 'Midnight Silk Edit',
    category: 'Occasion Wear',
    samplePrice: 16500,
    samplePriceDisplay: 'Sample Reference: ₹16,500',
    isSample: true,
    fabric: 'Pure Raw Silk & Fluid Georgette',
    silhouette: 'Contemporary Draped Silhouette with Structured Bodice',
    colors: ['Midnight Navy', 'Deep Charcoal'],
    colorHexes: {
      'Midnight Navy': '#0C182B',
      'Deep Charcoal': '#1E2530',
    },
    description:
      'A refined evening silhouette crafted in deep midnight silk, featuring structured shoulder accents and a fluid asymmetric drape designed for modern formal occasions.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=85',
    ],
    featured: true,
    occasion: 'Evening Galas & Soirees',
    details: [
      'Pre-draped fluid silhouette with clean lines',
      'Concealed side zipper fastening',
      'Lined in lightweight breathable mulberry silk',
      'Sample specification for bespoke sizing demo',
    ],
  },
  {
    id: 'azoria-02',
    name: 'Ivory Statement Set',
    category: 'Festive Wear',
    samplePrice: 18500,
    samplePriceDisplay: 'Sample Reference: ₹18,500',
    isSample: true,
    fabric: 'Textured Chanderi Silk & Tissue Organza',
    silhouette: 'Relaxed Tunic with Fluid Flared Trousers',
    colors: ['Warm Ivory', 'Soft Champagne'],
    colorHexes: {
      'Warm Ivory': '#F5F2EB',
      'Soft Champagne': '#E8DFC8',
    },
    description:
      'Luminous warm ivory ensemble balancing minimalist geometry with rich textured chanderi silk. Designed for intimate festive dinners and daylight celebrations.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85',
    ],
    featured: true,
    occasion: 'Festive Luncheons & Ceremonies',
    details: [
      'Subtle tonal thread and micro-piping edges',
      'Tailored straight-cut trousers with elasticated back',
      'Handloom breathable silk blend',
      'Sample piece available for styling reference',
    ],
  },
  {
    id: 'azoria-03',
    name: 'Navy Occasion Set',
    category: 'Occasion Wear',
    samplePrice: 19800,
    samplePriceDisplay: 'Sample Reference: ₹19,800',
    isSample: true,
    fabric: 'Double Crepe Silk & Chiffon',
    silhouette: 'Floor-Length Anarkali Coat with Slim Trousers',
    colors: ['Deep Navy', 'Steel Blue'],
    colorHexes: {
      'Deep Navy': '#0A1526',
      'Steel Blue': '#2E415A',
    },
    description:
      'AZORIA signature deep navy tailored ensemble highlighting elongated vertical proportions, subtle matte-gold buttoning, and gentle flare motion.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=85',
    ],
    featured: true,
    occasion: 'Cocktail Evenings & Formal Receptions',
    details: [
      'Deep navy structured lapel and slit sleeves',
      'Paired with matching stretch-crepe trousers',
      'Clean tailored silhouette with zero excess bulk',
      'Custom sizing demonstration available via WhatsApp',
    ],
  },
  {
    id: 'azoria-04',
    name: 'Golden Evening Edit',
    category: 'Designer Wear',
    samplePrice: 22000,
    samplePriceDisplay: 'Sample Reference: ₹22,000',
    isSample: true,
    fabric: 'Metallic Lurex Organza & Raw Silk',
    silhouette: 'Modern Cape Overlay with Draped Inner Slip',
    colors: ['Muted Gold', 'Warm Taupe'],
    colorHexes: {
      'Muted Gold': '#C5A880',
      'Warm Taupe': '#8C7B6B',
    },
    description:
      'An understated champagne-gold evening cape featuring subtle metallic luster and refined fluid drapes. Conceived for sunset receptions and milestone occasions.',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85',
    ],
    featured: true,
    occasion: 'Sunset Soirees & Red Carpet Events',
    details: [
      'Fluid semi-sheer cape overlay with hand-rolled hems',
      'Slip cut on the bias for natural movement',
      'Non-tarnishing muted metallic fibers',
      'Sample garment profile for demonstration',
    ],
  },
  {
    id: 'azoria-05',
    name: 'Sapphire Draped Ensemble',
    category: 'Festive Wear',
    samplePrice: 17200,
    samplePriceDisplay: 'Sample Reference: ₹17,200',
    isSample: true,
    fabric: 'Crêpe de Chine & Tissue Silk',
    silhouette: 'Contemporary Saree Silhouette with Tailored Blouse',
    colors: ['Royal Sapphire', 'Midnight Indigo'],
    colorHexes: {
      'Royal Sapphire': '#132A4A',
      'Midnight Indigo': '#091524',
    },
    description:
      'A re-imagined pre-stitched drape in luminous sapphire crêpe, paired with a clean square-neck tailored bodice for effortless festive dressing.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=85',
    ],
    featured: false,
    occasion: 'Festive Dinners & Sangeet Ceremonies',
    details: [
      'Ready-to-wear pleated pallu requiring no pins',
      'Padded bodice with concealed back hook closure',
      'Soft featherweight drape for seamless mobility',
      'Sample garment reference',
    ],
  },
  {
    id: 'azoria-06',
    name: 'Noir Velvet Silhouette',
    category: 'Designer Wear',
    samplePrice: 24500,
    samplePriceDisplay: 'Sample Reference: ₹24,500',
    isSample: true,
    fabric: 'Micro Silk Velvet & Satin Georgette',
    silhouette: 'Structured Jacket with Fluid Flared Culottes',
    colors: ['Pitch Noir', 'Deep Navy'],
    colorHexes: {
      'Pitch Noir': '#0F1216',
      'Deep Navy': '#0C182B',
    },
    description:
      'Plush micro-velvet tailored into a clean sculpted jacket with tonal satin peak lapels. A definitive power silhouette for evening celebrations.',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=85',
    ],
    featured: false,
    occasion: 'Winter Formal Events & Galas',
    details: [
      'Sculpted shoulders with tailored internal chest canvas',
      'Silk satin piping along lapel and pockets',
      'High-waisted wide-leg culottes with deep pockets',
      'Sample preview piece',
    ],
  },
  {
    id: 'azoria-07',
    name: 'Champagne Organza Set',
    category: 'New Arrivals',
    samplePrice: 15800,
    samplePriceDisplay: 'Sample Reference: ₹15,800',
    isSample: true,
    fabric: 'Glass Organza & Mulberry Silk Slip',
    silhouette: 'Translucent Kimono-Sleeve Kurta & Cigarette Pants',
    colors: ['Champagne Mist', 'Opal Cream'],
    colorHexes: {
      'Champagne Mist': '#ECE6D8',
      'Opal Cream': '#F7F5EE',
    },
    description:
      'Ethereal sheer organza treated with subtle tone-on-tone structural pintucks. Lightweight, airy, and effortlessly sophisticated for high tea or daylight receptions.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85',
    ],
    featured: false,
    occasion: 'Intimate Ceremonies & Daytime Soirees',
    details: [
      'Geometric micro-tucks along yoke and cuffs',
      'Includes detachable 100% silk inner camisole',
      'Cigarette trousers with delicate hem slits',
      'Sample catalogue asset',
    ],
  },
  {
    id: 'azoria-08',
    name: 'Sculpted Azure Cape Set',
    category: 'New Arrivals',
    samplePrice: 21000,
    samplePriceDisplay: 'Sample Reference: ₹21,000',
    isSample: true,
    fabric: 'Italian Silk Crepe & Georgette',
    silhouette: 'Floor-Sweeping Structured Cape with Monotone Trousers',
    colors: ['Azure Navy', 'Deep Prussian'],
    colorHexes: {
      'Azure Navy': '#12243D',
      'Deep Prussian': '#091522',
    },
    description:
      'Clean architectural tailoring meets fluid textile drama in this dramatic floor-sweeping cape set, designed to make a confident, understated impression.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=85',
    ],
    featured: false,
    occasion: 'Cocktail Galas & Receptions',
    details: [
      'Precision shoulder pad structure with open front drape',
      'Hand-finished blind hems throughout',
      'Crease-resistant double crepe silk blend',
      'Demonstration piece for AZORIA seasonal capsule',
    ],
  },
];

/**
 * Format Indian Rupee currency for sample reference display
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const PRODUCTS = PRODUCTS_DATA;

