import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, MessageCircle, Send, Sparkles, Clock, Truck, ShieldCheck } from 'lucide-react';
import { Language, ServiceId } from '../types';
import { calculateQuote, formatAed, EMIRATE_DELIVERY_FEES } from '../utils/quoteCalculator';

interface QuotePageProps {
  lang: Language;
  initialServiceId?: string;
}

export const QuotePage: React.FC<QuotePageProps> = ({
  lang,
  initialServiceId = 'printing',
}) => {
  const validServiceId: ServiceId = ['printing', 'embroidery', 'advertising', 'corporate-gifts'].includes(initialServiceId)
    ? (initialServiceId as ServiceId)
    : 'printing';

  const [serviceId, setServiceId] = useState<ServiceId>(validServiceId);
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

  const handleServiceChange = (newService: ServiceId) => {
    setServiceId(newService);
    const firstOption = productOptions[newService][0];
    setSubType(firstOption.id);
    setQuantity(firstOption.defaultQty);
  };

  React.useEffect(() => {
    if (initialServiceId && ['printing', 'embroidery', 'advertising', 'corporate-gifts'].includes(initialServiceId)) {
      handleServiceChange(initialServiceId as ServiceId);
    }
  }, [initialServiceId]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Save lead to cPanel MySQL database via PHP backend API
    const selectedProductName = productOptions[serviceId].find((p) => p.id === subType)?.label || subType;
    fetch('/api/save-lead.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName,
        companyName,
        phone: clientPhone,
        email: clientEmail,
        service: serviceId,
        product: selectedProductName,
        quantity,
        emirate,
        totalAed: formatAed(estimate.totalAed),
        notes,
      }),
    }).catch(err => console.log('MySQL lead save note:', err));
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
    window.open(`https://wa.me/971562612617?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 bg-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-left rtl:text-right">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block mb-2">
          {lang === 'ar' ? 'طلب عرض سعر رسمي' : 'Instant Estimation & Inquiry'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-serif">
          {lang === 'ar' ? 'حساب تكلفة الطباعة والتطريز والإعلان' : 'Get an Official Quotation in UAE'}
        </h1>
        <p className="mt-3 text-base text-gray-600 max-w-2xl leading-relaxed">
          {lang === 'ar'
            ? 'احصل على تسعير فوري ومباشر مع حساب نسبة الخصم للكميات وضريبة القيمة المضافة 5% وخيارات التوصيل لكافة الإمارات.'
            : 'Configure your branding specifications, calculate volume-discounted AED pricing with 5% UAE VAT, and submit directly to our production team in Dubai.'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="bg-[#faf8f5] rounded-3xl p-8 sm:p-12 border border-amber-900/10 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h2 className="text-3xl font-bold font-serif text-gray-900">
              Quotation Request Received!
            </h2>

            <p className="text-base text-gray-700 leading-relaxed">
              Thank you, <strong className="text-gray-900">{clientName}</strong>. Your inquiry for{' '}
              <strong>{quantity} units</strong> has been assigned to an Al Adeel Advertising specialist in Dubai. We will call you at <strong className="text-gray-900">{clientPhone}</strong> shortly.
            </p>

            <div className="p-5 bg-white rounded-2xl border border-amber-200 text-left text-sm text-gray-800 space-y-2">
              <div className="flex justify-between font-bold text-base text-[#b87e2a]">
                <span>Estimated Total (incl. 5% VAT):</span>
                <span>{formatAed(estimate.totalAed)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Production Lead Time:</span>
                <span>{estimate.estimatedDays} Business Days</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Emirate:</span>
                <span>{emirate}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={openWhatsAppInquiry}
                className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Instant WhatsApp Confirmation</span>
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="py-3.5 px-6 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm cursor-pointer"
              >
                Calculate Another Order
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Form Controls */}
            <div className="lg:col-span-7 bg-[#faf8f5] p-6 sm:p-8 rounded-3xl border border-amber-900/10 space-y-6 text-left rtl:text-right">
              
              {/* Step 1: Service Category */}
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
                  1. Service Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['printing', 'embroidery', 'advertising', 'corporate-gifts'] as ServiceId[]).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleServiceChange(id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold capitalize border transition-all cursor-pointer ${
                        serviceId === id
                          ? 'bg-[#083120] text-white border-[#083120] shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-amber-400'
                      }`}
                    >
                      {id.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Product */}
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  2. Product Specification
                </label>
                <select
                  value={subType}
                  onChange={(e) => setSubType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {productOptions[serviceId].map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 3: Quantity & Delivery Emirate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    3. Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Tiered wholesale discounts up to 30% automatically applied.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    4. UAE Delivery Emirate
                  </label>
                  <select
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {Object.keys(EMIRATE_DELIVERY_FEES).map((em) => (
                      <option key={em} value={em}>
                        {em}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rushDelivery}
                    onChange={(e) => setRushDelivery(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-gray-900">Expedited Rush Production (+25%)</span>
                    <span className="text-gray-500 block">Fast-track delivery in 24 - 48 hours within UAE</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasArtwork}
                    onChange={(e) => setHasArtwork(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-gray-900">I have ready design/artwork or logo file</span>
                    <span className="text-gray-500 block">Complimentary artwork pre-flight check by our designers</span>
                  </div>
                </label>
              </div>

              {/* Contact Information */}
              <div className="pt-2 border-t border-gray-200 space-y-3">
                <span className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Contact Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Company Name *"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone (+971 50 ... ) *"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Additional notes, pantone thread colors, or delivery instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

            </div>

            {/* Right 5 Columns: Live Price Breakdown Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#083120] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-500/30 text-left rtl:text-right">
                <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Live Price Breakdown
                  </span>
                  <span className="text-xs bg-emerald-900 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-700/60 font-semibold">
                    Direct Dubai Factory
                  </span>
                </div>

                <div className="space-y-3 pt-5 text-sm">
                  <div className="flex justify-between text-emerald-100">
                    <span>Base Unit Rate:</span>
                    <span className="font-semibold text-white">{formatAed(estimate.unitPriceAed)} / unit</span>
                  </div>
                  <div className="flex justify-between text-emerald-100">
                    <span>Order Quantity:</span>
                    <span className="font-semibold text-white">{quantity} units</span>
                  </div>
                  <div className="flex justify-between text-emerald-100">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-white">{formatAed(estimate.subtotalAed)}</span>
                  </div>
                  {estimate.rushFeeAed > 0 && (
                    <div className="flex justify-between text-amber-300">
                      <span>Express Turnaround:</span>
                      <span>+{formatAed(estimate.rushFeeAed)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-100">
                    <span>Delivery to {emirate}:</span>
                    <span className="font-semibold text-white">
                      {estimate.deliveryFeeAed === 0 ? 'FREE' : formatAed(estimate.deliveryFeeAed)}
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-100">
                    <span>UAE VAT (5%):</span>
                    <span className="font-semibold text-white">{formatAed(estimate.vatAed)}</span>
                  </div>

                  <div className="pt-4 mt-2 border-t border-emerald-800/80 flex justify-between items-baseline">
                    <span className="text-base font-bold text-white">Estimated Total:</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#d4af37]">
                      {formatAed(estimate.totalAed)}
                    </span>
                  </div>

                  <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-800/60 text-xs text-emerald-200 mt-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Estimated Lead Time: <strong>{estimate.estimatedDays} Business Days</strong></span>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-6 space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#c59239] to-[#b87e2a] hover:from-[#d8a141] hover:to-[#c59239] text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Official Quote Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsAppInquiry}
                    className="w-full py-3 px-6 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Instant WhatsApp Inquiry (+971 56 261 2617)</span>
                  </button>
                </div>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
