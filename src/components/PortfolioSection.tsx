import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, PortfolioCategory, PortfolioItem } from '../types';
import { PORTFOLIO_DATA, TRANSLATIONS } from '../data/content';

interface PortfolioSectionProps {
  lang: Language;
  onNavigateToPortfolio: () => void;
  onNavigateToQuote: (category?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  lang,
  onNavigateToPortfolio,
  onNavigateToQuote,
}) => {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('all');
  const t = TRANSLATIONS[lang];

  const filterKeys: PortfolioCategory[] = [
    'all',
    'printing',
    'embroidery',
    'advertising',
    'signage',
    'corporate-gifts',
  ];

  const filteredItems = activeFilter === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 text-left rtl:text-right">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block mb-2">
              {t.portfolio.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 font-serif tracking-tight">
              {t.portfolio.heading}
            </h2>
          </div>

          {/* Filter Pills and View Full Button */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-50 rounded-full border border-gray-200">
              {filterKeys.map((key) => {
                const isActive = activeFilter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0f241a] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                    }`}
                  >
                    {t.portfolio.filters[key]}
                  </button>
                );
              })}
            </div>

            {/* View Full Portfolio Button */}
            <button
              onClick={onNavigateToPortfolio}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-900 text-gray-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer hover:bg-gray-50"
            >
              <span>{t.portfolio.viewFull}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* 8 Portfolio Cards (4x2 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigateToQuote(item.category)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200/80 bg-white hover:border-amber-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Footer Bar */}
              <div className="p-4 flex items-center justify-between gap-3 bg-white">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#b87e2a] transition-colors leading-snug">
                  {item.title}
                </h3>
                
                {/* Round arrow button */}
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f241a] group-hover:border-[#0f241a] group-hover:text-white transition-all">
                  <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors rtl:rotate-180" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
