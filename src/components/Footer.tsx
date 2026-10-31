import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Language, ServiceId } from '../types';
import { PageRoute } from '../types/routes';
import { TRANSLATIONS } from '../data/content';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageRoute, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer id="footer" className="bg-[#051d13] text-gray-300 pt-16 pb-8 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-emerald-800/40 text-left rtl:text-right">
          
          {/* Col 1: Brand & Socials (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="cursor-pointer" onClick={() => onNavigate('home')}>
              <BrandLogo variant="dark" size="lg" />
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            {/* Social Icons matching design */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-200 hover:text-white hover:border-amber-400 hover:bg-amber-600 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.2 22 12z"/>
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-200 hover:text-white hover:border-amber-400 hover:bg-amber-600 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-200 hover:text-white hover:border-amber-400 hover:bg-amber-600 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-200 hover:text-white hover:border-amber-400 hover:bg-amber-600 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-200 hover:text-white hover:border-amber-400 hover:bg-amber-600 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/70">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-amber-400 transition-colors cursor-pointer text-amber-300 font-semibold">
                  ⚙️ Admin CMS
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Services (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.footer.ourServices}
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/70">
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'printing' })} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Printing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'embroidery' })} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Embroidery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'advertising' })} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Advertising
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'corporate-gifts' })} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Corporate Gifts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'advertising' })} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Signage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'advertising' })} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Vehicle Branding
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.footer.contactUs}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-emerald-100/70">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+971562612617" className="hover:text-white transition-colors font-medium">
                  +971 56 261 2617
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1 text-xs">
                  <a href="mailto:info@aladeeladvertising.com" className="hover:text-white transition-colors block text-emerald-200">
                    info@aladeeladvertising.com
                  </a>
                  <a href="mailto:adeel@aladeeladvertising.com" className="hover:text-white transition-colors block text-emerald-100/70">
                    adeel@aladeeladvertising.com
                  </a>
                  <a href="mailto:carina@aladeeladvertising.com" className="hover:text-white transition-colors block text-emerald-100/70">
                    carina@aladeeladvertising.com
                  </a>
                  <a href="mailto:noor@aladeeladvertising.com" className="hover:text-white transition-colors block text-emerald-100/70">
                    noor@aladeeladvertising.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-white block font-medium">Dubai, UAE</span>
                  <span className="text-[11px] text-emerald-200/60">Our Location</span>
                </div>
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/971562612617?text=Hello%20Al%20Adeel%20Advertising,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-emerald-100 bg-emerald-900/50 hover:bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-700/50 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.footer.whatsapp}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.footer.newsletter}
            </h4>
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              {t.footer.newsletterDesc}
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.newsletterPlaceholder}
                className="w-full pl-3.5 pr-12 rtl:pr-3.5 rtl:pl-12 py-2.5 text-xs rounded-lg bg-white text-gray-900 placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                aria-label={t.footer.subscribeBtn}
                className="absolute right-1 rtl:right-auto rtl:left-1 top-1 bottom-1 px-3 bg-[#b87e2a] hover:bg-[#a36e22] text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-300 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Thank you for subscribing!</span>
              </p>
            )}
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-100/60 gap-4">
          <div>
            <span>{t.footer.copyright}</span>
          </div>

          <div className="hidden md:block">
            <span className="font-mono text-emerald-200/80 tracking-wide">
              {t.footer.domain}
            </span>
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              {t.nav.home}
            </button>
            <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
              {t.nav.services}
            </button>
            <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors cursor-pointer">
              {t.nav.portfolio}
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              {t.nav.about}
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
              {t.nav.contact}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
