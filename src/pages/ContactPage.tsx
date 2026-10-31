import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';
import { Language } from '../types';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+971 ');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-left rtl:text-right">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block mb-2">
          {lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-serif">
          {lang === 'ar' ? 'يسعدنا تواصلكم واستقبال استفساراتكم' : 'Contact Al Adeel Advertising LLC'}
        </h1>
        <p className="mt-3 text-base text-gray-600 max-w-2xl leading-relaxed">
          {lang === 'ar'
            ? 'فريقنا في دبي جاهز للرد على كافة استفساراتكم وتقديم المشورة الفنية وعروض الأسعار المناسبة لمشاريعكم.'
            : 'Visit our production facility in Dubai or contact our corporate sales team for inquiries, quotes, or custom branding samples.'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6 text-left rtl:text-right">
            
            {/* Phone Card */}
            <div className="p-6 bg-[#faf8f5] rounded-2xl border border-amber-900/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Direct Phone & WhatsApp</span>
                <a href="tel:+971562612617" className="text-lg font-bold text-gray-900 hover:text-[#b87e2a] transition-colors block mt-0.5">
                  +971 56 261 2617
                </a>
                <span className="text-xs text-gray-500 block mt-1">Direct sales, quotations & inquiries (Dubai, UAE)</span>
              </div>
            </div>

            {/* Email Card with All Official Team Emails */}
            <div className="p-6 bg-[#faf8f5] rounded-2xl border border-amber-900/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="w-full">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Official Email Contacts</span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1.5 border-b border-gray-200/60">
                    <span className="text-gray-600 font-medium">General & Quotations:</span>
                    <a href="mailto:info@aladeeladvertising.com" className="font-bold text-gray-900 hover:text-[#b87e2a] transition-colors">
                      info@aladeeladvertising.com
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1.5 border-b border-gray-200/60">
                    <span className="text-gray-600 font-medium">Adeel (Executive):</span>
                    <a href="mailto:adeel@aladeeladvertising.com" className="font-bold text-gray-900 hover:text-[#b87e2a] transition-colors">
                      adeel@aladeeladvertising.com
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1.5 border-b border-gray-200/60">
                    <span className="text-gray-600 font-medium">Carina (Sales & Accounts):</span>
                    <a href="mailto:carina@aladeeladvertising.com" className="font-bold text-gray-900 hover:text-[#b87e2a] transition-colors">
                      carina@aladeeladvertising.com
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-gray-600 font-medium">Noor (Client Relations):</span>
                    <a href="mailto:noor@aladeeladvertising.com" className="font-bold text-gray-900 hover:text-[#b87e2a] transition-colors">
                      noor@aladeeladvertising.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 bg-[#faf8f5] rounded-2xl border border-amber-900/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 text-white flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Showroom & Workshop</span>
                <span className="text-base font-bold text-gray-900 block mt-0.5">Dubai, United Arab Emirates</span>
                <span className="text-xs text-gray-500 block mt-1">Full production plant with client showroom</span>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <a
              href="https://wa.me/971562612617?text=Hello%20Al%20Adeel%20Advertising%20LLC,%20I%20would%20like%20to%20discuss%20a%20branding%20project."
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-between transition-colors shadow-md group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <span className="font-bold text-sm">Instant Chat on WhatsApp (+971 56 261 2617)</span>
              </div>
              <span className="text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">→</span>
            </a>

            {/* Working Hours */}
            <div className="p-4 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-gray-900 block">Working Hours:</span>
                <span>Saturday – Thursday: 8:30 AM to 8:00 PM (Friday Closed)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#faf8f5] p-8 rounded-3xl border border-amber-900/10 text-left rtl:text-right">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-gray-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out, <strong>{name}</strong>. Our customer support team in Dubai will reply to <strong>{email}</strong> within a few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#b87e2a] text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Al Hashimi"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. tariq@company.ae"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 ..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Commercial Printing">Commercial Printing</option>
                      <option value="Uniform Embroidery">Uniform Embroidery</option>
                      <option value="Storefront Signage">Storefront Signage</option>
                      <option value="Vehicle Branding">Vehicle Branding</option>
                      <option value="Corporate Gifts">Corporate Gifts</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your requirements, quantities, or delivery location in UAE..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
