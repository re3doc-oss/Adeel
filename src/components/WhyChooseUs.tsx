import React from 'react';
import { Gem, Truck, Sliders, MapPin } from 'lucide-react';
import { Language } from '../types';
import { WHY_CHOOSE_ITEMS, TRANSLATIONS } from '../data/content';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'diamond':
        return <Gem className="w-6 h-6 text-[#b87e2a]" />;
      case 'truck':
        return <Truck className="w-6 h-6 text-[#b87e2a]" />;
      case 'gears':
        return <Sliders className="w-6 h-6 text-[#b87e2a]" />;
      case 'pin':
      default:
        return <MapPin className="w-6 h-6 text-[#b87e2a]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-10 bg-[#faf8f5] border-y border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Title on the left */}
          <div className="lg:col-span-3 text-left rtl:text-right border-b lg:border-b-0 lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-amber-900/10 pb-4 lg:pb-0 lg:pr-6 rtl:lg:pr-0 rtl:lg:pl-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif leading-tight">
              {t.whyChoose.heading}
            </h2>
          </div>

          {/* 4 Pillars */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div key={item.id} className="flex items-start gap-3.5 text-left rtl:text-right">
                <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center flex-shrink-0 shadow-2xs">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug">
                    {lang === 'ar' ? item.titleAr : item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                    {lang === 'ar' ? item.descAr : item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
