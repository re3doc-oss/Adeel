import React, { useState, useMemo } from 'react';
import { X, Calculator, CheckCircle2, MessageCircle, Send, Sparkles } from 'lucide-react';
import { Language, ServiceId } from '../types';
import { calculateQuote, formatAed, PRODUCT_PRICING, EMIRATE_DELIVERY_FEES } from '../utils/quoteCalculator';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialServiceId?: ServiceId;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialServiceId = 'printing',
}) => {
  const [serviceId, setServiceId] = useState<ServiceId>(initialServiceId);
  const [subType, setSubType] = useState<string>('business-cards');
  const [quantity, setQuantity] = useState<number>(500);
  const [emirate, setEmirate] = useState<string>('Dubai');
  const [rushDelivery, setRushDelivery] = useState<boolean>(false);
  const [hasArtwork, setHasArtwork] = useState<boolean>(true);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('+971 ');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Products available per service
  const productOptions: Record<ServiceId, { id: string; label: string; defaultQty: number }[]> = {
    printing: [
      { id: 'business-cards', label: 'Luxury Business Cards (Velvet & Foil)', defaultQty: 500 },
      { id: 'flyers-brochures', label: 'Corporate Brochures & Folders', defaultQty: 250 },
      { id: 'banners-rollups', label: 'Rollup Banners & Display Stands', defaultQty: 2 },
      { id: 'stickers-labels', label: 'Die-Cut Waterproof Vinyl Stickers', defaultQty: 500 },
    ],
    embroidery: [
      { id: 'embroidered-polos', label: 'Executive Polo Shirts with Chest Embroidery', defaultQty: 25 },
      { id: 'embroidered-caps', label: 'Structured 3D Puff Embroidered Caps', defaultQty: 30 },
      { id: 'workwear-uniforms', label: 'Industrial & Hospitality Workwear', defaultQty: 20 },
    ],
    advertising: [
      { id: '3d-store-signage', label: '3D LED Backlit Channel Letters Signage', defaultQty: 1 },
      { id: 'lightboxes', label: 'Custom Storefront Lightbox Sign', defaultQty: 1 },
      { id: 'vehicle-branding', label: 'Full Commercial Van Branding & Wrap', defaultQty: 1 },
      { id: 'acrylic-displays', label: 'Acrylic Countertop & Reception Displays', defaultQty: 5 },
    ],
    'corporate-gifts': [
      { id: 'luxury-gift-sets', label: 'VIP Executive Box (Diary, Pen, Mug, Flash)', defaultQty: 25 },
      { id: 'branded-notebooks-pens', label: 'Hardcover PU Notebook & Laser Pen Set', defaultQty: 50 },
      { id: 'thermal-mugs-bottles', label: 'Double-Wall Thermal Vacuum Flasks', defaultQty: 50 },
    ],
  };

  // Sync subType when service changes
  const handleServiceChange = (newService: ServiceId) => {
    setServiceId(newService);
    const firstOption = productOptions[newService][0];
    setSubType(firstOption.id);
    setQuantity(firstOption.defaultQty);
  };

  const estimate = useMemo(() => {
    return calculateQuote({
      serviceId,
      subType,
      quantity,
      emirate,
      rushDelivery,
      hasArtwork,
    });
  }, [serviceId, subType, quantity, emirate, rushDelivery, hasArtwork]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const openWhatsAppInquiry = () => {
    const selectedProductName = productOptions[serviceId].find((p) => p.id === subType)?.label || subType;
    const text = encodeURIComponent(
      `Hello Al Adeel Advertising LLC,\n\nI would like to request an official quotation:\n` +
      `• Service: ${serviceId.toUpperCase()}\n` +
      `• Product: ${selectedProductName}\n` +
      `• Quantity: ${quantity}\n` +
      `• Delivery Emirate: ${emirate}\n` +
      `• Rush Delivery: ${rushDelivery ? 'Yes (Express)' : 'Standard'}\n` +
      `• Estimated Total: ${formatAed(estimate.totalAed)}\n\n` +
      `Client: ${clientName || 'Valued Customer'} (${companyName || 'Corporate Client'})\n` +
      `Phone: ${clientPhone}\n` +
      `Email: ${clientEmail}`
    );
    window.open(`https://wa.me/971501234567?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-amber-900/10">
        
        {/* Header */}
        <div className="bg-[#083120] text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white">
                {lang === 'ar' ? 'طلب عرض سعر فوري' : 'Get an Instant Quotation'}
              </h3>
              <p className="text-xs text-emerald-200/80">
                {lang === 'ar' ? 'شركة العادل للإعلانات ذ.م.م - دبي' : 'Al Adeel Advertising LLC • Dubai, UAE'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {submitted ? (
            <div className="py-12 px-6 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold font-serif text-gray-900">
                {lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Quotation Request Received!'}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Thank you, <strong className="text-gray-900">{clientName || 'valued customer'}</strong>. Our production team in Dubai has received your request for <strong>{quantity} units</strong>. A dedicated account specialist will contact you at <strong>{clientPhone}</strong> within 30 minutes.
              </p>
              
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Estimated Total (incl. 5% VAT):</span>
                  <span>{formatAed(estimate.totalAed)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Production Lead Time:</span>
                  <span>{estimate.estimatedDays} Business Days</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={openWhatsAppInquiry}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+971 50 123 4567)</span>
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="py-3 px-6 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Configurator */}
              <div className="lg:col-span-7 space-y-5 text-left rtl:text-right">
                {/* Step 1: Select Service */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    1. Select Service Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['printing', 'embroidery', 'advertising', 'corporate-gifts'] as ServiceId[]).map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleServiceChange(id)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize border transition-all cursor-pointer ${
                          serviceId === id
                            ? 'bg-[#083120] text-white border-[#083120] shadow-xs'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-amber-400'
                        }`}
                      >
                        {id.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Product Subtype */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    2. Select Product Type
                  </label>
                  <select
                    value={subType}
                    onChange={(e) => setSubType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {productOptions[serviceId].map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 3: Quantity & Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                      3. Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100000"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      Higher quantity automatically unlocks volume discounts (up to 30%).
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                      4. UAE Delivery Emirate
                    </label>
                    <select
                      value={emirate}
                      onChange={(e) => setEmirate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      {Object.keys(EMIRATE_DELIVERY_FEES).map((em) => (
                        <option key={em} value={em}>
                          {em}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Toggles */}
                <div className="space-y-2 pt-1 border-t border-gray-100">
                  <label className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rushDelivery}
                      onChange={(e) => setRushDelivery(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-gray-900">Rush Express Turnaround (+25%)</span>
                      <span className="text-gray-500 block">Fast-track delivery in 24 - 48 hours within UAE</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasArtwork}
                      onChange={(e) => setHasArtwork(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-gray-900">I already have vector artwork / logo</span>
                      <span className="text-gray-500 block">Our designers will verify your file resolution free of charge</span>
                    </div>
                  </label>
                </div>

                {/* Client Contact Inputs */}
                <div className="pt-2 border-t border-gray-100 space-y-3">
                  <span className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Your Contact Information
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="px-3.5 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="px-3.5 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone (+971 50 ... ) *"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="px-3.5 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="px-3.5 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Project notes, custom dimensions, or thread color specifications..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Right Column: Instant Live Estimate Card */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="bg-[#faf8f5] rounded-2xl border border-amber-900/10 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Live Cost Breakdown
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Direct Factory Price
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Unit Price:</span>
                      <span className="font-semibold text-gray-900">{formatAed(estimate.unitPriceAed)} / pc</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span className="font-semibold text-gray-900">{quantity} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-gray-900">{formatAed(estimate.subtotalAed)}</span>
                    </div>
                    {estimate.rushFeeAed > 0 && (
                      <div className="flex justify-between text-amber-700 font-medium">
                        <span>Rush Expedited Fee:</span>
                        <span>+{formatAed(estimate.rushFeeAed)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery to {emirate}:</span>
                      <span className="font-semibold text-gray-900">
                        {estimate.deliveryFeeAed === 0 ? 'FREE' : formatAed(estimate.deliveryFeeAed)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>UAE VAT (5%):</span>
                      <span className="font-semibold text-gray-900">{formatAed(estimate.vatAed)}</span>
                    </div>

                    <div className="pt-3 border-t border-amber-900/10 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-gray-900">Estimated Total:</span>
                      <span className="text-xl font-black text-[#b87e2a]">
                        {formatAed(estimate.totalAed)}
                      </span>
                    </div>

                    <div className="bg-amber-100/60 p-2.5 rounded-lg text-[11px] text-amber-900 mt-2">
                      ⏱ Production Lead Time: <strong>{estimate.estimatedDays} Business Days</strong>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-5 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Official Quote Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsAppInquiry}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#083120] hover:bg-[#062417] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Instant WhatsApp Quote (+971 50 123 4567)</span>
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
