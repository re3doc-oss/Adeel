import React, { useState, useRef, useEffect } from 'react';
import { Phone, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { UaeFlag } from './UaeFlag';
import { Language } from '../types';
import { PageRoute } from '../types/routes';
import { TRANSLATIONS, SERVICES_DATA } from '../data/content';

interface NavbarProps {
  lang: Language;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, params?: any) => void;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  currentPage,
  onNavigate,
  onToggleLang,
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageRoute, params?: any) => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    onNavigate(page, params);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 rtl:space-x-reverse text-[15px] font-medium text-gray-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`relative transition-colors hover:text-amber-700 cursor-pointer ${
                currentPage === 'home' ? 'text-amber-700 font-bold' : ''
              }`}
            >
              {t.nav.home}
              {currentPage === 'home' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>

            {/* Services with dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => handleNavClick('services')}
                onMouseEnter={() => setServicesOpen(true)}
                className={`flex items-center gap-1.5 transition-colors hover:text-amber-700 py-2 cursor-pointer ${
                  currentPage === 'services' ? 'text-amber-700 font-bold' : ''
                }`}
                aria-expanded={servicesOpen}
              >
                <span>{t.nav.services}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div
                  onMouseLeave={() => setServicesOpen(false)}
                  className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {SERVICES_DATA.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleNavClick('services', { serviceId: service.id })}
                      className="w-full text-left rtl:text-right px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <span className="font-medium">{service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                    </button>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                    <button
                      onClick={() => handleNavClick('services')}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-900 cursor-pointer"
                    >
                      {t.nav.allServices} →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('portfolio')}
              className={`relative transition-colors hover:text-amber-700 cursor-pointer ${
                currentPage === 'portfolio' ? 'text-amber-700 font-bold' : ''
              }`}
            >
              {t.nav.portfolio}
              {currentPage === 'portfolio' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`relative transition-colors hover:text-amber-700 cursor-pointer ${
                currentPage === 'about' ? 'text-amber-700 font-bold' : ''
              }`}
            >
              {t.nav.about}
              {currentPage === 'about' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`relative transition-colors hover:text-amber-700 cursor-pointer ${
                currentPage === 'contact' ? 'text-amber-700 font-bold' : ''
              }`}
            >
              {t.nav.contact}
              {currentPage === 'contact' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`relative transition-colors hover:text-amber-700 cursor-pointer ${
                currentPage === 'admin' ? 'text-amber-700 font-bold' : ''
              }`}
            >
              ⚙️ Admin CMS
              {currentPage === 'admin' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6">
            {/* Phone & Location */}
            <a
              href="tel:+971562612617"
              className="flex items-center gap-2.5 text-left rtl:text-right group"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Phone className="w-4 h-4 fill-emerald-600" />
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {t.topBar.phone}
                </span>
                <span className="block text-xs text-gray-500 font-normal">
                  {t.topBar.location}
                </span>
              </div>
            </a>

            {/* "Get a Quote →" Button */}
            <button
              onClick={() => handleNavClick('quote')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#b87e2a] hover:bg-[#a36e22] active:bg-[#8f5e1b] text-white text-sm font-semibold shadow-xs transition-all hover:shadow-md cursor-pointer"
            >
              <span>{t.nav.quoteBtn}</span>
              <span className="text-white">→</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              title="Toggle Language"
            >
              <span className={lang === 'en' ? 'font-bold text-gray-900' : 'text-gray-500'}>EN</span>
              <span className="text-gray-300">|</span>
              <span className={lang === 'ar' ? 'font-bold text-gray-900' : 'text-gray-500'}>AR</span>
              <UaeFlag className="w-4 h-3 ml-0.5" />
            </button>
          </div>

          {/* Mobile Navigation Row */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('quote')}
              className="px-2.5 py-1.5 rounded-md bg-[#b87e2a] text-white text-[11px] font-bold"
            >
              {t.nav.quoteBtn}
            </button>

            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2 py-1.5 rounded border border-gray-200 text-xs font-semibold text-gray-700"
            >
              <span>{lang.toUpperCase()}</span>
              <UaeFlag className="w-3.5 h-2.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-700 hover:text-gray-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-100 py-3 px-2 space-y-2 bg-white animate-in slide-in-from-top-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left rtl:text-right px-3 py-2 text-sm font-semibold rounded-lg ${
                currentPage === 'home' ? 'bg-amber-50 text-amber-800' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`block w-full text-left rtl:text-right px-3 py-2 text-sm font-semibold rounded-lg ${
                currentPage === 'services' ? 'bg-amber-50 text-amber-800' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className={`block w-full text-left rtl:text-right px-3 py-2 text-sm font-semibold rounded-lg ${
                currentPage === 'portfolio' ? 'bg-amber-50 text-amber-800' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.portfolio}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`block w-full text-left rtl:text-right px-3 py-2 text-sm font-semibold rounded-lg ${
                currentPage === 'about' ? 'bg-amber-50 text-amber-800' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`block w-full text-left rtl:text-right px-3 py-2 text-sm font-semibold rounded-lg ${
                currentPage === 'contact' ? 'bg-amber-50 text-amber-800' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.contact}
            </button>
            <button
              onClick={() => handleNavClick('quote')}
              className={`block w-full text-left rtl:text-right px-3 py-2 text-sm font-bold rounded-lg ${
                currentPage === 'quote' ? 'bg-[#b87e2a] text-white' : 'text-[#b87e2a] hover:bg-amber-50'
              }`}
            >
              {t.nav.quoteBtn} (Instant Calculator) →
            </button>

            <div className="pt-2 border-t border-gray-100">
              <a
                href="tel:+971562612617"
                className="flex items-center gap-2 text-xs font-bold text-gray-800 px-3 py-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+971 56 261 2617 (Dubai, UAE)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
