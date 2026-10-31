export type Language = 'en' | 'ar';

export type ServiceId = 'printing' | 'embroidery' | 'advertising' | 'corporate-gifts';

export type PortfolioCategory = 'all' | 'printing' | 'embroidery' | 'advertising' | 'signage' | 'corporate-gifts';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  badge: string;
  image: string;
  description: string;
  features: string[];
  materials: string[];
  turnaround: string;
  popularItems: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  description: string;
  specs: {
    material: string;
    finish: string;
    turnaround: string;
    minOrder: string;
  };
  tags: string[];
}

export interface QuoteCalculationInput {
  serviceId: ServiceId;
  subType: string;
  quantity: number;
  emirate: string;
  rushDelivery: boolean;
  hasArtwork: boolean;
}

export interface QuoteEstimate {
  unitPriceAed: number;
  subtotalAed: number;
  rushFeeAed: number;
  deliveryFeeAed: number;
  vatAed: number;
  totalAed: number;
  estimatedDays: number;
}
