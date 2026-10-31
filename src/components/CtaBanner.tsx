import React from 'react';
import { Printer, Megaphone } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface CtaBannerProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ lang, onOpenQuote }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#072d1d] via-[#0b3d27] to-[#062417] text-white py-12 lg:py-16 border-t border-amber-500/20">
      {/* Authentic Dubai Skyline Silhouette from reference */}
      <div 
        className="absolute inset-0 bg-repeat-x bg-contain bg-center opacity-30 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "url('/images/cta-banner.png')", backgroundSize: 'cover' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#072d1d] via-transparent to-[#062417] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 text-left rtl:text-right space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif tracking-tight">
              {t.cta.heading}
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed max-w-lg">
              {t.cta.subtitle}
            </p>
          </div>

          {/* Center Button */}
          <div className="lg:col-span-3 flex justify-start lg:justify-center">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-[#c59239] to-[#b87e2a] hover:from-[#d8a141] hover:to-[#c59239] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.cta.button}</span>
              <span>→</span>
            </button>
          </div>

          {/* Right Highlights */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-4 border-t lg:border-t-0 lg:border-l rtl:lg:border-l-0 rtl:lg:border-r border-emerald-700/50 pt-6 lg:pt-0 lg:pl-6 rtl:lg:pl-0 rtl:lg:pr-6">
            
            {/* 1: Printing */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-11 h-11 rounded-full bg-[#041a10] border border-amber-400/40 flex items-center justify-center mb-2 shadow-inner group-hover:border-amber-400 transition-colors">
                <Printer className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {t.cta.feature1}
              </span>
              <span className="text-[11px] text-emerald-200/70 block mt-0.5">
                {t.cta.feature1Sub}
              </span>
            </div>

            {/* 2: Embroidery */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-11 h-11 rounded-full bg-[#041a10] border border-amber-400/40 flex items-center justify-center mb-2 shadow-inner group-hover:border-amber-400 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400 stroke-current fill-none stroke-2">
                  <path d="M12 2L4 20h4l2-5h4l2 5h4L12 2z" />
                  <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {t.cta.feature2}
              </span>
              <span className="text-[11px] text-emerald-200/70 block mt-0.5">
                {t.cta.feature2Sub}
              </span>
            </div>

            {/* 3: Advertising */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-11 h-11 rounded-full bg-[#041a10] border border-amber-400/40 flex items-center justify-center mb-2 shadow-inner group-hover:border-amber-400 transition-colors">
                <Megaphone className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {t.cta.feature3}
              </span>
              <span className="text-[11px] text-emerald-200/70 block mt-0.5">
                {t.cta.feature3Sub}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
