import { QuoteCalculationInput, QuoteEstimate, ServiceId } from '../types';

export interface ServiceProductPricing {
  baseUnitAed: number;
  minQty: number;
  baseDays: number;
}

export const PRODUCT_PRICING: Record<string, ServiceProductPricing> = {
  // Printing
  'business-cards': { baseUnitAed: 0.45, minQty: 100, baseDays: 2 },
  'flyers-brochures': { baseUnitAed: 0.65, minQty: 250, baseDays: 3 },
  'banners-rollups': { baseUnitAed: 120, minQty: 1, baseDays: 1 },
  'stickers-labels': { baseUnitAed: 0.35, minQty: 200, baseDays: 2 },

  // Embroidery
  'embroidered-polos': { baseUnitAed: 35, minQty: 10, baseDays: 4 },
  'embroidered-caps': { baseUnitAed: 22, minQty: 15, baseDays: 3 },
  'workwear-uniforms': { baseUnitAed: 55, minQty: 10, baseDays: 5 },

  // Advertising
  '3d-store-signage': { baseUnitAed: 1450, minQty: 1, baseDays: 7 },
  'lightboxes': { baseUnitAed: 850, minQty: 1, baseDays: 5 },
  'vehicle-branding': { baseUnitAed: 1100, minQty: 1, baseDays: 4 },
  'acrylic-displays': { baseUnitAed: 220, minQty: 2, baseDays: 3 },

  // Corporate Gifts
  'luxury-gift-sets': { baseUnitAed: 85, minQty: 25, baseDays: 5 },
  'branded-notebooks-pens': { baseUnitAed: 28, minQty: 50, baseDays: 4 },
  'thermal-mugs-bottles': { baseUnitAed: 32, minQty: 30, baseDays: 3 },
};

export const EMIRATE_DELIVERY_FEES: Record<string, number> = {
  'Dubai': 25,
  'Abu Dhabi': 45,
  'Sharjah': 30,
  'Ajman': 30,
  'Ras Al Khaimah': 45,
  'Fujairah': 50,
  'Umm Al Quwain': 35,
};

export function calculateVolumeDiscount(quantity: number): number {
  if (quantity >= 1000) return 0.30; // 30% discount
  if (quantity >= 500) return 0.20;  // 20% discount
  if (quantity >= 250) return 0.15;  // 15% discount
  if (quantity >= 100) return 0.10;  // 10% discount
  if (quantity >= 50) return 0.05;   // 5% discount
  return 0;
}

export function calculateQuote(input: QuoteCalculationInput): QuoteEstimate {
  const product = PRODUCT_PRICING[input.subType] || {
    baseUnitAed: 50,
    minQty: 1,
    baseDays: 3,
  };

  const qty = Math.max(input.quantity || product.minQty, product.minQty);
  const discountRate = calculateVolumeDiscount(qty);
  const discountedUnit = Math.round(product.baseUnitAed * (1 - discountRate) * 100) / 100;
  
  const subtotal = Math.round(discountedUnit * qty * 100) / 100;
  
  // Rush fee is 25% of subtotal if enabled
  const rushFee = input.rushDelivery ? Math.round(subtotal * 0.25 * 100) / 100 : 0;
  
  // Delivery fee waived for orders above 400 AED in Dubai or 750 AED elsewhere
  const baseDelivery = EMIRATE_DELIVERY_FEES[input.emirate] ?? 35;
  const deliveryFee = (input.emirate === 'Dubai' && subtotal >= 400) || subtotal >= 750 ? 0 : baseDelivery;
  
  // UAE VAT is 5%
  const vat = Math.round((subtotal + rushFee) * 0.05 * 100) / 100;
  const total = Math.round((subtotal + rushFee + deliveryFee + vat) * 100) / 100;
  
  let days = product.baseDays;
  if (input.rushDelivery) {
    days = Math.max(1, Math.ceil(days / 2));
  }

  return {
    unitPriceAed: discountedUnit,
    subtotalAed: subtotal,
    rushFeeAed: rushFee,
    deliveryFeeAed: deliveryFee,
    vatAed: vat,
    totalAed: total,
    estimatedDays: days,
  };
}

export function formatAed(amount: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount).replace('AED', 'AED ');
}
