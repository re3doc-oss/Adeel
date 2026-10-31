import React from 'react';
import { X, CheckCircle, Clock, Package, Sparkles } from 'lucide-react';
import { PortfolioItem, Language } from '../types';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  lang: Language;
  onRequestQuote: (item: PortfolioItem) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  item,
  onClose,
  onRequestQuote,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#083120] text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/20">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              Portfolio Item Details
            </span>
            <h3 className="text-lg font-bold font-serif text-white">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close portfolio modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Visual */}
          <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-[16/9] shadow-inner">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
              Project Overview
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#faf8f5] p-4 rounded-xl border border-amber-900/10">
            <div>
              <span className="text-[11px] text-gray-500 block uppercase font-semibold">Material</span>
              <span className="text-xs font-bold text-gray-900 mt-0.5 block">{item.specs.material}</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 block uppercase font-semibold">Finishing</span>
              <span className="text-xs font-bold text-gray-900 mt-0.5 block">{item.specs.finish}</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 block uppercase font-semibold">Turnaround</span>
              <span className="text-xs font-bold text-gray-900 mt-0.5 block flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                {item.specs.turnaround}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 block uppercase font-semibold">Minimum Order</span>
              <span className="text-xs font-bold text-gray-900 mt-0.5 block flex items-center gap-1">
                <Package className="w-3 h-3 text-emerald-600" />
                {item.specs.minOrder}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-gray-500">
            Manufactured in Dubai, UAE by Al Adeel Advertising LLC
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onRequestQuote(item);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#b87e2a] hover:bg-[#a36e22] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get a Quote For This</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
