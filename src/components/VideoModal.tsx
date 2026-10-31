import React from 'react';
import { X, Play, CheckCircle, Factory, ShieldCheck, Award } from 'lucide-react';
import { Language } from '../types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenQuote: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0a1e15] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-amber-500/30">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-emerald-800/40 bg-[#061810]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-base font-bold font-serif text-white">
              Al Adeel Advertising LLC — Dubai Production Showcase
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close presentation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Visual Facility Tour */}
        <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center group">
          <img
            src="/images/hero-showcase.png"
            alt="Al Adeel Production Facility"
            className="w-full h-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

          {/* Animated Overlay Info */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between text-left">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-semibold backdrop-blur-md">
                Production Floor • Dubai, UAE
              </span>
              <span className="text-white/60 text-xs font-mono">
                1080p Full HD Studio Feed
              </span>
            </div>

            <div className="space-y-3 max-w-lg">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                Over a Decade of Excellence in Printing & Advertising
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Featuring state-of-the-art Japanese wide-format digital printers, multi-head Tajima embroidery stations, and certified 3M architectural vinyl wrapping bays.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="p-6 bg-[#061810] grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-emerald-900/40">
          <div className="flex items-center gap-3">
            <Factory className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">In-House Manufacturing</span>
              <span className="text-[11px] text-emerald-200/60">No third-party markups</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">Quality Assured</span>
              <span className="text-[11px] text-emerald-200/60">Strict QC before dispatch</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">UAE-Wide Delivery</span>
              <span className="text-[11px] text-emerald-200/60">Dubai, Abu Dhabi & All Emirates</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#04120c] flex items-center justify-between border-t border-emerald-950">
          <span className="text-xs text-gray-400">
            Ready to start your corporate branding project?
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="px-5 py-2.5 rounded-lg bg-[#b87e2a] hover:bg-[#a36e22] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Get a Quote Now →
          </button>
        </div>

      </div>
    </div>
  );
};
