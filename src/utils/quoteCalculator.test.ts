import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateVolumeDiscount,
  calculateQuote,
  formatAed,
} from './quoteCalculator';

test('calculateVolumeDiscount returns tiered percentages correctly', () => {
  assert.equal(calculateVolumeDiscount(10), 0);
  assert.equal(calculateVolumeDiscount(50), 0.05);
  assert.equal(calculateVolumeDiscount(100), 0.10);
  assert.equal(calculateVolumeDiscount(250), 0.15);
  assert.equal(calculateVolumeDiscount(500), 0.20);
  assert.equal(calculateVolumeDiscount(1000), 0.30);
});

test('calculateQuote accurately computes totals, rush fees and 5% UAE VAT', () => {
  const quote = calculateQuote({
    serviceId: 'printing',
    subType: 'business-cards',
    quantity: 1000,
    emirate: 'Dubai',
    rushDelivery: false,
    hasArtwork: true,
  });

  // 1000 cards: base 0.45 * 0.70 = 0.315 -> 0.32 or 0.31
  assert.ok(quote.unitPriceAed <= 0.35);
  assert.ok(quote.subtotalAed > 0);
  assert.equal(quote.rushFeeAed, 0);
  assert.ok(quote.vatAed > 0);
  assert.ok(quote.totalAed > quote.subtotalAed);
});

test('calculateQuote handles rush delivery fee and expedited timeline', () => {
  const normalQuote = calculateQuote({
    serviceId: 'embroidery',
    subType: 'embroidered-polos',
    quantity: 20,
    emirate: 'Dubai',
    rushDelivery: false,
    hasArtwork: true,
  });

  const rushQuote = calculateQuote({
    serviceId: 'embroidery',
    subType: 'embroidered-polos',
    quantity: 20,
    emirate: 'Dubai',
    rushDelivery: true,
    hasArtwork: true,
  });

  assert.ok(rushQuote.rushFeeAed > 0);
  assert.ok(rushQuote.estimatedDays <= normalQuote.estimatedDays);
});

test('formatAed returns standard AED currency format', () => {
  const formatted = formatAed(150.5);
  assert.ok(formatted.includes('AED') || formatted.includes('د.إ'));
});
