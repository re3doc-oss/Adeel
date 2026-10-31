import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Check, Award } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onNavigate: (page: 'quote' | 'portfolio', params?: any) => void;
}

interface ItemHotspot {
  id: string;
  name: string;
  nameAr: string;
  category: 'embroidery' | 'printing' | 'advertising' | 'corporate-gifts';
  badge: string;
  badgeAr: string;
  specs: string[];
  specsAr: string[];
  xPercent: number;
  yPercent: number;
}

const HERO_HOTSPOTS: ItemHotspot[] = [
  {
    id: 'polo-shirt',
    name: 'Custom Embroidered Polo Shirts',
    nameAr: 'قمصان بولو مطرزة بشعار الشركة',
    category: 'embroidery',
    badge: 'Your Logo, Our Stitch',
    badgeAr: 'شعارك بأدق غرزة تطريز',
    specs: [
      '100% Premium Cotton Pique (220-240 GSM)',
      'Tajima Multi-Head 3D Gold Embroidery',
      'Washable & Colorfast German Madeira Thread',
      'Available in all corporate colorways',
    ],
    specsAr: [
      'قطن بيكيه فاخر 100% (220-240 جم)',
      'تطريز ذهبي مجسم 3D بمكائن تاجيما اليابانية',
      'خيوط ماديرا الألمانية المقاومة للغسيل',
      'متوفر بجميع الألوان الرسمية للشركات',
    ],
    xPercent: 67.5,
    yPercent: 57.5,
  },
  {
    id: 'rollup-banner',
    name: 'Roll-Up Display Banner',
    nameAr: 'رول اب بانر إعلاني فاخر',
    category: 'advertising',
    badge: 'Brand Your Business Bigger',
    badgeAr: 'حضور أكبر لعلامتك التجارية',
    specs: [
      'Ultra-Smooth Tearproof Matte Blockout Vinyl',
      'High-Precision 2400 DPI UV Photo Printing',
      'Heavy-Duty Aluminum Retractable Cassette',
      'Supplied with padded travel carry bag',
    ],
    specsAr: [
      'فينيل مطفأ عازل للضوء فائق النعومة ومقاوم للتمزق',
      'طباعة صور UV عالية الدقة 2400 DPI',
      'قاعدة ألمنيوم صلبة ومتينة لسهولة الحمل',
      'مزود بحقيبة نقل مبطنة فاخرة',
    ],
    xPercent: 53.8,
    yPercent: 36.5,
  },
  {
    id: 'feather-flag',
    name: 'Outdoor Teardrop Feather Flag',
    nameAr: 'أعلام الريشة الإعلانية الخارجية',
    category: 'advertising',
    badge: 'UAE Weather & Wind Resistant',
    badgeAr: 'مقاوم للرياح وحرارة شمس الإمارات',
    specs: [
      'Sublimated UV-Resistant Satin Polyester',
      'Double-Sided Mirror Print Penetration',
      'Flexible Aviation-Grade Carbon Pole',
      'Heavy Cross-Base with Water Donut Weight',
    ],
    specsAr: [
      'قماش بوليستر ساتان معالج ضد أشعة الشمس UV',
      'طباعة حرارية متينة واضحة من الجهتين',
      'سارية كربونية مرنة فائقة المتانة',
      'قاعدة صليبية ثقيلة مزودة بوزن مائي',
    ],
    xPercent: 91.2,
    yPercent: 32.5,
  },
  {
    id: 'embroidered-cap',
    name: '3D Puff Embroidered Cap',
    nameAr: 'كابات مطرزة بتطريز بارز 3D',
    category: 'embroidery',
    badge: 'Premium Structured Headwear',
    badgeAr: 'كابات عالية الجودة بهوية مخصصة',
    specs: [
      'Structured 6-Panel Heavy Cotton Twill',
      'High-Density 3D Puff Foam Embroidery',
      'Adjustable Brass Buckle Closure',
      'Pre-Curved Visor with Contrast Sandwich',
    ],
    specsAr: [
      'قطن ثقيل 6 أجزاء متماسكة وعالية الجودة',
      'تطريز بارز ثلاثي الأبعاد 3D عالي الكثافة',
      'حزام إغلاق نحاسي خلفي قابل للتعديل',
      'مقدمة مقوسة مع تفاصيل حياكة احترافية',
    ],
    xPercent: 62.2,
    yPercent: 81.5,
  },
  {
    id: 'corporate-gifts',
    name: 'VIP Corporate Gift Box & Stationery',
    nameAr: 'أطقم الهدايا الترويجية ومستلزمات الشركات',
    category: 'corporate-gifts',
    badge: 'Executive Brand Elevation',
    badgeAr: 'هدايا لكبار الشخصيات والعملاء',
    specs: [
      'Debossed Gold Foil PU Leather Diary (A5)',
      'Precision Laser-Engraved Metal Ballpoint Pen',
      'Ceramic Full-Color Printed Corporate Mug',
      'Luxury Rigid Presentation Box with Foam Inlay',
    ],
    specsAr: [
      'أجندة A5 جلد فاخر بختم ذهبي بارز',
      'قلم معدني أنيق محفور بالليزر بدقة متناهية',
      'مج سيراميك بطباعة حرارية كاملة الألوان',
      'علبة هدايا كرتونية صلبة ومبطنة بإسفنج ليزري',
    ],
    xPercent: 77.5,
    yPercent: 78.5,
  },
];

// Ambient floating gold dust motes
const SPARKLES = [
  { id: 1, x: 55, y: 30, size: 4, delay: '0s', duration: '4.2s' },
  { id: 2, x: 63, y: 22, size: 3, delay: '1.2s', duration: '3.8s' },
  { id: 3, x: 72, y: 35, size: 5, delay: '0.6s', duration: '4.6s' },
  { id: 4, x: 82, y: 25, size: 3.5, delay: '2.1s', duration: '4.0s' },
  { id: 5, x: 68, y: 75, size: 4, delay: '1.8s', duration: '3.6s' },
  { id: 6, x: 91, y: 55, size: 3, delay: '0.9s', duration: '4.4s' },
  { id: 7, x: 50, y: 65, size: 4.5, delay: '2.5s', duration: '4.8s' },
];

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate }) => {
  const [activeHotspot, setActiveHotspot] = useState<ItemHotspot | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

  return (
    <section className="relative w-full bg-[#fcfbfa] overflow-hidden border-b border-amber-900/10">
      <div className="relative w-full max-w-[1600px] mx-auto select-none">
        
        {/* ============================================================== */}
        {/* BASE HERO IMAGE (Exact 100% pixel fidelity from original design) */}
        {/* ============================================================== */}
        <img
          src="/images/hero-banner-exact.png"
          alt="Al Adeel Advertising LLC - Printing, Embroidery & Advertising Solutions in UAE"
          className="w-full h-auto block select-none pointer-events-none"
        />

        {/* ============================================================== */}
        {/* ANIMATED MERCHANDISE ITEM LAYERS (Shirts, Banners, Gifts)     */}
        {/* ============================================================== */}
        {animationsEnabled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            
            {/* 1. ANIMATED ROLL-UP BANNER (Gentle sway + metallic light sheen) */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '52.6%',
                top: '21.4%',
                width: '8.5%',
                height: '51.2%',
                transformOrigin: 'bottom center',
                animation: 'heroSway 4.8s ease-in-out infinite',
                WebkitMaskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
              }}
            >
              <img
                src="/images/hero-rollup.png"
                alt="Rollup Banner"
                className="w-full h-full object-cover"
              />
              {/* Metallic Light Sheen Sweep */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                style={{
                  animation: 'heroSheenSweep 4.5s ease-in-out infinite',
                }}
              />
            </div>

            {/* 2. ANIMATED POLO SHIRTS (Green Polo + White Polo: gentle breathing + gold glint) */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '61.6%',
                top: '47.6%',
                width: '17.5%',
                height: '38.1%',
                transformOrigin: 'center bottom',
                animation: 'heroBreathing 3.6s ease-in-out infinite',
                WebkitMaskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
              }}
            >
              <img
                src="/images/hero-shirts.png"
                alt="Embroidered Shirts"
                className="w-full h-full object-cover"
              />

              {/* Silk/Cotton Shimmer Wave */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent pointer-events-none"
                style={{
                  animation: 'heroSheenSweep 5s ease-in-out 1s infinite',
                }}
              />

              {/* Gold Embroidery Starburst Twinkle on Green Polo Chest Logo */}
              <div
                className="absolute top-[32%] left-[48%] w-5 h-5 pointer-events-none"
                style={{
                  animation: 'heroGoldStarburst 3.5s ease-out infinite',
                }}
              >
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_8px_#f59e0b]" />
                  <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-amber-300 to-transparent shadow-[0_0_8px_#f59e0b]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                </div>
              </div>
            </div>

            {/* 3. ANIMATED OUTDOOR FEATHER FLAG (Wind flutter sway) */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '87.7%',
                top: '15.5%',
                width: '11.2%',
                height: '67.9%',
                transformOrigin: 'bottom center',
                animation: 'heroWindFlutter 5.2s ease-in-out infinite',
                WebkitMaskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
              }}
            >
              <img
                src="/images/hero-flag.png"
                alt="Feather Flag Banner"
                className="w-full h-full object-cover"
              />

              {/* Satin Flag Light Wave */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
                style={{
                  animation: 'heroSheenSweep 4.2s ease-in-out 0.8s infinite',
                }}
              />
            </div>

            {/* 4. ANIMATED EMBROIDERED CAP (Gentle lift + gold stitch shimmer) */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '58.4%',
                top: '70.2%',
                width: '13.8%',
                height: '26.2%',
                transformOrigin: 'center bottom',
                animation: 'heroCapFloat 4.0s ease-in-out 0.6s infinite',
                WebkitMaskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
              }}
            >
              <img
                src="/images/hero-cap.png"
                alt="Embroidered Cap"
                className="w-full h-full object-cover"
              />

              {/* Cap Logo Sparkle */}
              <div
                className="absolute top-[48%] left-[48%] w-3.5 h-3.5 pointer-events-none"
                style={{
                  animation: 'heroGoldStarburst 4.2s ease-out 1.5s infinite',
                }}
              >
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#f59e0b]" />
                </div>
              </div>
            </div>

            {/* 5. ANIMATED LUXURY GIFTS & GOLD FOIL DIARY (Gleam highlight) */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '73.3%',
                top: '65.5%',
                width: '15.4%',
                height: '31.0%',
                transformOrigin: 'center bottom',
                animation: 'heroCapFloat 4.4s ease-in-out 1.2s infinite',
                WebkitMaskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 96% 96% at 50% 50%, black 85%, transparent 100%)',
              }}
            >
              <img
                src="/images/hero-gifts.png"
                alt="Corporate Gifts"
                className="w-full h-full object-cover"
              />

              {/* Gold Foil Sweep */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent pointer-events-none"
                style={{
                  animation: 'heroSheenSweep 4.8s ease-in-out 2s infinite',
                }}
              />
            </div>

            {/* 6. STOREFRONT ILLUMINATED 3D CHANNEL LETTERS (Warm Neon Breathing) */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '38%',
                top: '4%',
                width: '46%',
                height: '18%',
                animation: 'heroNeonPulse 3.4s ease-in-out infinite',
              }}
            >
              <div className="w-full h-full bg-amber-400/20 blur-xl rounded-full" />
            </div>

            {/* 7. AMBIENT GOLD DUST PARTICLES */}
            {SPARKLES.map((sp) => (
              <div
                key={sp.id}
                className="absolute rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b] pointer-events-none"
                style={{
                  left: `${sp.x}%`,
                  top: `${sp.y}%`,
                  width: `${sp.size}px`,
                  height: `${sp.size}px`,
                  animation: `heroDustFloat ${sp.duration} ease-in-out ${sp.delay} infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* ============================================================== */}
        {/* INTERACTIVE PULSING PRODUCT HOTSPOTS (Pins over items)         */}
        {/* ============================================================== */}
        {HERO_HOTSPOTS.map((item) => {
          const isSelected = activeHotspot?.id === item.id;
          return (
            <div
              key={item.id}
              className="absolute z-20"
              style={{
                left: `${item.xPercent}%`,
                top: `${item.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Pulsing Target Beacon Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isSelected ? null : item);
                }}
                onMouseEnter={() => setActiveHotspot(item)}
                aria-label={`Inspect ${item.name}`}
                className="relative group p-1.5 focus:outline-hidden cursor-pointer"
              >
                {/* Expanding Pulse Ring */}
                <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping duration-1000 pointer-events-none" />

                {/* Inner Glow Beacon */}
                <span
                  className={`relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-300 shadow-md ${
                    isSelected
                      ? 'bg-amber-600 border-white text-white scale-110 shadow-amber-500/50'
                      : 'bg-emerald-950/90 border-amber-400 text-amber-300 group-hover:scale-115 group-hover:bg-amber-600 group-hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>

                {/* Hover Tooltip Label (Desktop) */}
                <span className="hidden md:inline-block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded-md bg-gray-900/90 text-[10px] font-bold text-amber-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                  {lang === 'ar' ? item.nameAr : item.name}
                </span>
              </button>
            </div>
          );
        })}

        {/* ============================================================== */}
        {/* INTERACTIVE PRODUCT POPOVER CARD                               */}
        {/* ============================================================== */}
        {activeHotspot && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute z-30 right-4 top-4 sm:right-6 sm:top-6 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-amber-900/20 text-left rtl:text-right transition-all duration-300 animate-in fade-in zoom-in-95"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveHotspot(null)}
              aria-label="Close"
              className="absolute top-3 right-3 rtl:right-auto rtl:left-3 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Tag & Title */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#b87e2a] mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? activeHotspot.badgeAr : activeHotspot.badge}</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-gray-900 font-serif leading-snug">
              {lang === 'ar' ? activeHotspot.nameAr : activeHotspot.name}
            </h4>

            {/* Specs Bullet Points */}
            <ul className="mt-2.5 space-y-1.5 text-xs text-gray-600">
              {(lang === 'ar' ? activeHotspot.specsAr : activeHotspot.specs).map((spec, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={() => {
                  onNavigate('quote', { serviceId: activeHotspot.category });
                  setActiveHotspot(null);
                }}
                className="flex-1 px-3 py-2 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'طلب عرض سعر لهذا المنتج' : 'Get Quote for This'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>

              <button
                onClick={() => {
                  onNavigate('portfolio');
                  setActiveHotspot(null);
                }}
                className="px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'المعرض' : 'Portfolio'}
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* INTERACTIVE HOTSPOTS FOR ORIGINAL BUTTONS                       */}
        {/* Hotspot 1: "Get a Quote →" button matching exact coordinate     */}
        {/* ============================================================== */}
        <button
          onClick={() => onNavigate('quote')}
          aria-label="Get a Quote"
          className="absolute top-[57.5%] left-[4.3%] w-[15.8%] h-[10.5%] rounded-md cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-amber-400/80 hover:bg-amber-500/10 active:bg-amber-600/20"
          title="Get a Quote"
        >
          <span className="sr-only">Get a Quote</span>
        </button>

        {/* Hotspot 2: "View Portfolio ▶" button matching exact coordinate */}
        <button
          onClick={() => onNavigate('portfolio')}
          aria-label="View Portfolio"
          className="absolute top-[57.5%] left-[21.2%] w-[16.2%] h-[10.5%] rounded-md cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-gray-400/80 hover:bg-black/5 active:bg-black/10"
          title="View Portfolio"
        >
          <span className="sr-only">View Portfolio</span>
        </button>

        {/* ============================================================== */}
        {/* ANIMATION CONTROL BADGE (Bottom Right Indicator)               */}
        {/* ============================================================== */}
        <div className="absolute bottom-2.5 right-3 rtl:right-auto rtl:left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] text-amber-200 border border-amber-400/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">
            {lang === 'ar' ? 'معروضات متحركة حية' : 'Live Animated Merchandise'}
          </span>
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="ml-1 text-[10px] text-gray-300 hover:text-white underline cursor-pointer"
            title="Toggle Animation"
          >
            {animationsEnabled ? (lang === 'ar' ? 'إيقاف' : 'Pause') : (lang === 'ar' ? 'تشغيل' : 'Play')}
          </button>
        </div>

      </div>
    </section>
  );
};
