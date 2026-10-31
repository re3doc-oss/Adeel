import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PortfolioSection } from '../components/PortfolioSection';
import { CtaBanner } from '../components/CtaBanner';
import { Language, ServiceId } from '../types';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: string, params?: { serviceId?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, onNavigate }) => {
  return (
    <div>
      {/* Side-by-side Hero with center fade */}
      <Hero
        lang={lang}
        onNavigate={(page, params) => onNavigate(page, params)}
      />

      {/* Services Section */}
      <ServicesSection
        lang={lang}
        onNavigateToServices={(serviceId) => onNavigate('services', { serviceId })}
      />

      {/* Why Choose Al Adeel */}
      <WhyChooseUs lang={lang} />

      {/* Portfolio Section */}
      <PortfolioSection
        lang={lang}
        onNavigateToPortfolio={() => onNavigate('portfolio')}
        onNavigateToQuote={(category) => onNavigate('quote', { serviceId: category })}
      />

      {/* CTA Banner */}
      <CtaBanner
        lang={lang}
        onOpenQuote={() => onNavigate('quote')}
      />
    </div>
  );
};
