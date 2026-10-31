import React from 'react';
import { Factory, Award, ShieldCheck, Users, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface AboutPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  return (
    <div className="py-12 bg-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-left rtl:text-right">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block mb-2">
          {lang === 'ar' ? 'من نحن' : 'About Al Adeel Advertising LLC'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-serif">
          {lang === 'ar' ? 'شريككم الموثوق في عالم الطباعة والتطريز والإعلان' : 'Your Trusted Branding Partner in Dubai, UAE'}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
          Headquartered in Dubai, Al Adeel Advertising LLC has grown into a leading turnkey printing, computerised embroidery, signage, and corporate advertising manufacturer serving businesses across the seven emirates of the United Arab Emirates.
        </p>
      </div>

      {/* Story & Facility Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left rtl:text-right">
          
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
              Direct In-House Manufacturing Without Middlemen
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Unlike advertising agencies that broker production to third parties, Al Adeel Advertising owns and operates its full production machinery in Dubai. This enables strict quality inspection, guaranteed turnaround timelines, and competitive factory-direct pricing for corporate clients.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-800">
                  <strong>Industrial Multi-Head Tajima Embroidery:</strong> High-definition thread digitizing and 3D puff embroidery.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-800">
                  <strong>Japanese Wide-Format & UV Flatbed Printers:</strong> Rich 1440 DPI outdoor-durable color reproduction.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-800">
                  <strong>3M Certified Vehicle Branding Bays:</strong> Precision vinyl wrapping and full fleet graphics approved by RTA.
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('quote')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Request Quotation</span>
                <span>→</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-gray-50 aspect-[4/3]">
            <img
              src="/images/hero-showcase.png"
              alt="Al Adeel Production Showroom in Dubai"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

      {/* 4 Feature Pillars */}
      <div className="bg-[#faf8f5] py-14 border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left rtl:text-right">
            
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs">
              <Factory className="w-8 h-8 text-[#b87e2a] mb-3" />
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">Dubai Facility</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dedicated printing and embroidery workshop with state-of-the-art machinery.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs">
              <Award className="w-8 h-8 text-[#b87e2a] mb-3" />
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">Quality Guaranteed</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Premium materials, German embroidery threads, and fade-resistant outdoor UV inks.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs">
              <ShieldCheck className="w-8 h-8 text-[#b87e2a] mb-3" />
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">UAE Compliance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Full assistance with Dubai Municipality approvals and RTA vehicle branding permits.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs">
              <MapPin className="w-8 h-8 text-[#b87e2a] mb-3" />
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">UAE-Wide Delivery</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Reliable door-to-door delivery across Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, and UAQ.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
