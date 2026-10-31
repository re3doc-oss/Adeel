import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, ServiceId } from '../types';
import { SERVICES_DATA, TRANSLATIONS } from '../data/content';

interface ServicesSectionProps {
  lang: Language;
  onNavigateToServices: (serviceId?: ServiceId) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onNavigateToServices,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="services" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-left rtl:text-right">
          <div className="max-w-xl">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block mb-2">
              {t.services.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 font-serif tracking-tight">
              {t.services.heading}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-lg">
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
              {t.services.subheading}
            </p>
            <button
              onClick={() => onNavigateToServices()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-900 text-gray-800 text-xs sm:text-sm font-semibold transition-colors flex-shrink-0 cursor-pointer hover:bg-gray-50"
            >
              <span>{t.services.viewAll}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => onNavigateToServices(service.id)}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-amber-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left rtl:text-right">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-serif group-hover:text-[#b87e2a] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Learn More link */}
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#b87e2a] transition-colors mt-auto pt-2 border-t border-gray-50">
                  <span>{t.services.learnMore}</span>
                  <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
