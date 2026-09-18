// Visual fallback SVG generator matching the client's lehenga photographs
// Used gracefully if the immutable asset file is waiting to sync in the preview environment

interface LehengaVisualMeta {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  name: string;
  embroideryTitle: string;
}

const LEHENGA_VISUALS: Record<string, LehengaVisualMeta> = {
  'IMG_20260917_204813_114.jpg': {
    primaryColor: '#8E1616',
    secondaryColor: '#D84040',
    accentColor: '#E6B325',
    name: 'Scarlet Red Bandhani',
    embroideryTitle: 'Heavy Gold Zari & Gotta Patti Border',
  },
  'IMG_20260917_204829_669.jpg': {
    primaryColor: '#121212',
    secondaryColor: '#7A0C16',
    accentColor: '#D4AF37',
    name: 'Jet Black & Crimson',
    embroideryTitle: 'Multi-Color Mirror Handwork Panel',
  },
  'IMG_20260917_204802_757.jpg': {
    primaryColor: '#F7F4EB',
    secondaryColor: '#C41E5D',
    accentColor: '#E0AA3E',
    name: 'Pearl White & Rani Pink',
    embroideryTitle: 'Multi-Color Patola Border & Pink Dupatta',
  },
  'IMG_20260917_204832_870.jpg': {
    primaryColor: '#4A0E17',
    secondaryColor: '#1F2421',
    accentColor: '#C5A880',
    name: 'Maroon & Antique Black',
    embroideryTitle: 'Heritage Patola Print & Bandhani Dupatta',
  },
  'IMG_20260917_204836_235.jpg': {
    primaryColor: '#800040',
    secondaryColor: '#0E1A36',
    accentColor: '#FFD700',
    name: 'Royal Magenta & Navy',
    embroideryTitle: 'Botanical Floral Hem with Gold Gota',
  },
  'IMG_20260917_204839_902.jpg': {
    primaryColor: '#39174A',
    secondaryColor: '#B0830D',
    accentColor: '#F2C94C',
    name: 'Royal Purple & Mustard',
    embroideryTitle: 'Broad Zari Floral Border & Corset Choli',
  },
  'IMG_20260917_204843_035.jpg': {
    primaryColor: '#4A5B36',
    secondaryColor: '#133924',
    accentColor: '#E5C07B',
    name: 'Olive Mehndi & Emerald',
    embroideryTitle: 'Vintage Floral Border & Emerald Scallop',
  },
  'IMG_20260917_204729_676.jpg': {
    primaryColor: '#0E4856',
    secondaryColor: '#15616D',
    accentColor: '#F08A5D',
    name: 'Peacock Teal Multi-Patch',
    embroideryTitle: 'Heritage Kutch Temple & Mirror Border',
  },
  'IMG_20260917_204729_674.jpg': {
    primaryColor: '#0C3559',
    secondaryColor: '#C71585',
    accentColor: '#FAD02C',
    name: 'Royal Peacock & Rani Pink',
    embroideryTitle: 'Gold Gotta Lines & Circular Floral Chakras',
  },
  'IMG_20260917_204729_677.jpg': {
    primaryColor: '#F5F5F0',
    secondaryColor: '#9B111E',
    accentColor: '#2D5A27',
    name: 'Ivory White & Crimson',
    embroideryTitle: 'Temple Elephant & Bandhani Thread Border',
  },
};

export function getLehengaFallbackSvg(filename: string): string {
  const cleanName = filename.replace(/^\//, '');
  const meta = LEHENGA_VISUALS[cleanName] || {
    primaryColor: '#0C182B',
    secondaryColor: '#4A0E17',
    accentColor: '#C5A880',
    name: 'Shree Fashion Collection',
    embroideryTitle: 'Pure Blooming Vichitra Silk',
  };

  const isLight = meta.primaryColor === '#F7F4EB' || meta.primaryColor === '#F5F5F0';
  const textColor = isLight ? '#1A1A1A' : '#FAF9F6';
  const subtextColor = isLight ? '#4A4A4A' : '#E8E5DD';

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${meta.primaryColor}" />
      <stop offset="60%" stop-color="${meta.primaryColor}" />
      <stop offset="100%" stop-color="${meta.secondaryColor}" />
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="${isLight ? '0.2' : '0.08'}" />
      <stop offset="100%" stop-color="#000000" stop-opacity="${isLight ? '0.15' : '0.4'}" />
    </radialGradient>
    <pattern id="zariMotif" width="60" height="60" patternUnits="userSpaceOnUse">
      <circle cx="30" cy="30" r="1.5" fill="${meta.accentColor}" opacity="0.35" />
      <path d="M 30,15 L 35,30 L 30,45 L 25,30 Z" fill="none" stroke="${meta.accentColor}" stroke-width="0.75" opacity="0.25" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="1000" fill="url(#bgGrad)" />
  <rect width="800" height="1000" fill="url(#vignette)" />
  <rect width="800" height="1000" fill="url(#zariMotif)" />

  <!-- Outer Zari Border -->
  <rect x="25" y="25" width="750" height="950" rx="16" fill="none" stroke="${meta.accentColor}" stroke-width="2" stroke-dasharray="8 4" opacity="0.6" />
  <rect x="35" y="35" width="730" height="930" rx="12" fill="none" stroke="${meta.accentColor}" stroke-width="1" opacity="0.4" />

  <!-- Corner Ornaments -->
  <g stroke="${meta.accentColor}" stroke-width="1.5" fill="none" opacity="0.7">
    <path d="M 45,65 L 65,45 M 45,45 L 75,45 M 45,45 L 45,75" />
    <path d="M 755,65 L 735,45 M 755,45 L 725,45 M 755,45 L 755,75" />
    <path d="M 45,935 L 65,955 M 45,955 L 75,955 M 45,955 L 45,925" />
    <path d="M 755,935 L 735,955 M 755,955 L 725,955 M 755,955 L 755,925" />
  </g>

  <!-- Top Brand Tag -->
  <text x="400" y="95" text-anchor="middle" font-family="serif" font-size="16" font-weight="600" letter-spacing="8" fill="${meta.accentColor}">SHREE FASHION COLLECTION</text>
  <text x="400" y="125" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="500" letter-spacing="3" fill="${subtextColor}" opacity="0.85">PURE BLOOMING VICHITRA SILK • ₹1,500</text>

  <!-- Stylized Lehenga Silhouette Graphic -->
  <g transform="translate(400, 480) scale(0.85)">
    <!-- Dupatta Drape Curve -->
    <path d="M -140,-260 Q -10,-290 120,-240 Q 180,-140 170,120 Q 150,220 90,260" fill="none" stroke="${meta.accentColor}" stroke-width="3" stroke-linecap="round" opacity="0.75" />
    
    <!-- Choli Silhouette -->
    <path d="M -70,-220 Q 0,-240 70,-220 L 60,-120 Q 0,-105 -60,-120 Z" fill="${meta.secondaryColor}" stroke="${meta.accentColor}" stroke-width="2.5" />
    <!-- Choli Neckline & Embroidery -->
    <path d="M -40,-220 Q 0,-180 40,-220" fill="none" stroke="${meta.accentColor}" stroke-width="2" />
    <circle cx="0" cy="-155" r="5" fill="${meta.accentColor}" />
    
    <!-- Waist Band -->
    <rect x="-65" y="-105" width="130" height="14" rx="3" fill="${meta.accentColor}" />

    <!-- Flared Lehenga Skirt (7.5m Royal Flair representation) -->
    <path d="M -60,-90 Q 0,-85 60,-90 L 260,250 Q 0,290 -260,250 Z" fill="${meta.primaryColor}" stroke="${meta.accentColor}" stroke-width="3" />
    
    <!-- Pleat Lines -->
    <g stroke="${meta.accentColor}" stroke-width="1.2" opacity="0.45">
      <path d="M -50,-90 L -210,255" />
      <path d="M -30,-88 L -130,265" />
      <path d="M -10,-86 L -40,270" />
      <path d="M 10,-86 L 40,270" />
      <path d="M 30,-88 L 130,265" />
      <path d="M 50,-90 L 210,255" />
    </g>

    <!-- Heavy Hem Zari Border (Heavy Embroidery Thread & Handwork) -->
    <path d="M -260,210 Q 0,250 260,210 L 260,250 Q 0,290 -260,250 Z" fill="${meta.accentColor}" opacity="0.9" />
    <path d="M -255,175 Q 0,215 255,175 L 255,195 Q 0,235 -255,195 Z" fill="${meta.secondaryColor}" stroke="${meta.accentColor}" stroke-width="1.5" />
  </g>

  <!-- Badges Container -->
  <g transform="translate(400, 780)">
    <!-- 7.50M Flair Pill -->
    <rect x="-170" y="0" width="105" height="30" rx="15" fill="${meta.accentColor}" opacity="0.95" />
    <text x="-117" y="19" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#0C182B">7.50M FLAIR</text>

    <!-- CAN CAN Pill -->
    <rect x="-55" y="0" width="110" height="30" rx="15" fill="#FAF9F6" opacity="0.95" />
    <text x="0" y="19" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#0C182B">CAN CAN PATTA</text>

    <!-- 3.5KG WEIGHT Pill -->
    <rect x="65" y="0" width="105" height="30" rx="15" fill="${meta.accentColor}" opacity="0.95" />
    <text x="117" y="19" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#0C182B">3.5 KG WEIGHT</text>
  </g>

  <!-- Product Title & Spec in Card -->
  <text x="400" y="850" text-anchor="middle" font-family="serif" font-size="24" font-weight="600" fill="${textColor}">${meta.name}</text>
  <text x="400" y="880" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="400" fill="${subtextColor}">${meta.embroideryTitle}</text>
  <text x="400" y="910" text-anchor="middle" font-family="sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="${meta.accentColor}">STITCHED CHOLI • 4.30M DUPATTA • ALL SIZES</text>

  <!-- Client Asset Label -->
  <rect x="250" y="930" width="300" height="24" rx="6" fill="#000000" opacity="0.4" />
  <text x="400" y="946" text-anchor="middle" font-family="monospace" font-size="10" fill="#FFFFFF" opacity="0.9">${cleanName}</text>
</svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
