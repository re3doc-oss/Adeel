import React from 'react';
import { X, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { ServiceItem, Language } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  lang: Language;
  onOpenQuote: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenQuote,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#083120] text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/20">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              Al Adeel Core Capability
            </span>
            <h3 className="text-xl font-bold font-serif text-white">
              {service.title} Services
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close service details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-200">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-bold font-serif text-gray-900">
                {service.badge}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Standard Turnaround: {service.turnaround} across UAE</span>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Key Features & Production Capabilities
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Materials & Popular Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#faf8f5] rounded-xl border border-amber-900/10">
              <span className="text-xs font-bold text-gray-900 uppercase block mb-2">
                Supported Substrates & Materials
              </span>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                {service.materials.map((mat, i) => (
                  <li key={i}>{mat}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-[#faf8f5] rounded-xl border border-amber-900/10">
              <span className="text-xs font-bold text-gray-900 uppercase block mb-2">
                Frequently Ordered Products
              </span>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                {service.popularItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Need custom specs or bulk corporate orders?
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenQuote(service.id);
              }}
              className="px-5 py-2.5 rounded-lg bg-[#b87e2a] hover:bg-[#a36e22] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Quote For {service.title}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
