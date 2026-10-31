import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Settings, 
  Phone, 
  Mail, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  MessageCircle, 
  Search, 
  TrendingUp, 
  Building2,
  ShieldCheck,
  Globe,
  LayoutTemplate,
  Sliders,
  Image as ImageIcon,
  Save,
  Check,
  Lock,
  LogOut,
  User
} from 'lucide-react';
import { Language } from '../types';

interface AdminDashboardProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

interface LeadItem {
  id: string;
  clientName: string;
  companyName: string;
  phone: string;
  email: string;
  service: string;
  product: string;
  quantity: number;
  emirate: string;
  totalAed: string;
  status: 'New' | 'Contacted' | 'In Production' | 'Completed';
  date: string;
}

interface PortfolioCMSItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface SeoPageConfig {
  pageId: string;
  pageName: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

interface PageContentConfig {
  heroEyebrow: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  aboutHeading: string;
  aboutText: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onNavigate }) => {
  // Authentication State for Secure Login System
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim().toLowerCase() === 'admin' && passwordInput === 'aladeel2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError(lang === 'ar' ? 'اسم المستخدم أو كلمة المرور غير صحيحة (التجربة: admin / aladeel2026)' : 'Invalid credentials. Try username: admin, password: aladeel2026');
    }
  };

  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'seo' | 'pages' | 'portfolio' | 'services' | 'settings'>('overview');
  
  // Mock Leads / Quotations Data
  const [leads, setLeads] = useState<LeadItem[]>([
    {
      id: 'LD-1001',
      clientName: 'Rashid Al Maktoum',
      companyName: 'Dubai Marina Towers',
      phone: '+971 50 123 4567',
      email: 'rashid@dubaimarina.ae',
      service: 'Printing',
      product: 'Luxury Business Cards (Velvet & Foil)',
      quantity: 1000,
      emirate: 'Dubai',
      totalAed: 'AED 342.00',
      status: 'New',
      date: '2026-10-31 10:30',
    },
    {
      id: 'LD-1002',
      clientName: 'Sarah Jenkins',
      companyName: 'Emirates Hospitality Group',
      phone: '+971 55 987 6543',
      email: 's.jenkins@emirateshg.com',
      service: 'Embroidery',
      product: 'Executive Polo Shirts with Chest Embroidery',
      quantity: 100,
      emirate: 'Abu Dhabi',
      totalAed: 'AED 3,150.00',
      status: 'In Production',
      date: '2026-10-30 14:15',
    },
    {
      id: 'LD-1003',
      clientName: 'Tariq Al Hashimi',
      companyName: 'Gulf Star Contracting',
      phone: '+971 56 261 2617',
      email: 'tariq@gulfstar.ae',
      service: 'Advertising',
      product: '3D LED Backlit Channel Letters Signage',
      quantity: 1,
      emirate: 'Sharjah',
      totalAed: 'AED 4,200.00',
      status: 'Contacted',
      date: '2026-10-29 09:45',
    },
  ]);

  // SEO Manager State
  const [seoPages, setSeoPages] = useState<SeoPageConfig[]>([
    {
      pageId: 'home',
      pageName: 'Home Page',
      title: 'Al Adeel Advertising LLC | Printing, Embroidery & Advertising Solutions in UAE',
      description: 'High-quality custom branding solutions in UAE: Printing, Embroidery, Signage, Corporate Gifts, and Vehicle Branding under one roof in Dubai.',
      keywords: 'printing dubai, embroidery uae, advertising agency dubai, signage, corporate gifts uae',
      ogImage: '/images/hero-banner-exact.png',
    },
    {
      pageId: 'services',
      pageName: 'Services Page',
      title: 'Our Services - Printing, Embroidery & Advertising | Al Adeel UAE',
      description: 'Explore our comprehensive printing, Tajima embroidery, 3D channel signage, vehicle wraps, and corporate gift solutions in Dubai.',
      keywords: 'commercial printing dubai, polo embroidery, vehicle wrapping uae',
      ogImage: '/images/service-printing.png',
    },
    {
      pageId: 'portfolio',
      pageName: 'Portfolio Gallery',
      title: 'Recent Projects & Gallery | Al Adeel Advertising LLC Dubai',
      description: 'View our recent work: luxury business cards, embroidered uniforms, storefront signs, and branded fleet vehicles across UAE emirates.',
      keywords: 'portfolio, brand projects dubai, signage gallery',
      ogImage: '/images/portfolio-store-signage.png',
    },
    {
      pageId: 'about',
      pageName: 'About Us Page',
      title: 'About Al Adeel Advertising LLC | Dubai Production Facility',
      description: 'Learn about our state-of-the-art production plant in Dubai, advanced multi-head Tajima machinery, and expert branding team.',
      keywords: 'about al adeel, printing press dubai, advertising company uae',
      ogImage: '/images/cta-banner.png',
    },
    {
      pageId: 'contact',
      pageName: 'Contact Us Page',
      title: 'Contact Al Adeel Advertising LLC | Dubai, UAE',
      description: 'Get in touch with our sales and production team in Dubai. Call +971 56 261 2617 or email info@aladeeladvertising.com.',
      keywords: 'contact al adeel, location dubai, phone number',
      ogImage: '/images/logo.png',
    },
  ]);
  const [selectedSeoPage, setSelectedSeoPage] = useState<string>('home');

  // Page Content CMS State
  const [pageContent, setPageContent] = useState<PageContentConfig>({
    heroEyebrow: 'YOUR VISION • OUR PRINT',
    heroTitle1: 'Printing, Embroidery & Advertising Solutions',
    heroTitle2: 'in UAE',
    heroSubtitle: 'High-quality custom branding solutions to make your business stand out. From printing to embroidery and complete advertising services – all under one roof.',
    aboutHeading: 'Your Trusted Partner for Complete Branding in Dubai & UAE',
    aboutText: 'Al Adeel Advertising LLC is a premier full-service printing, embroidery, and advertising powerhouse located in the heart of Dubai.',
  });

  // Mock Portfolio CMS
  const [portfolioItems, setPortfolioItems] = useState<PortfolioCMSItem[]>([
    { id: '1', title: 'Luxury Business Cards & Gold Foil Stationery', category: 'printing', image: '/images/portfolio-business-cards.png', description: 'Velvet soft-touch lamination with embossed gold foil stamping.' },
    { id: '2', title: 'Embroidered Polo Uniforms & Caps', category: 'embroidery', image: '/images/portfolio-uniforms.png', description: 'Heavy cotton pique polo shirts with Tajima 3D puff embroidery.' },
    { id: '3', title: 'Storefront 3D Illuminated Signage', category: 'advertising', image: '/images/portfolio-store-signage.png', description: 'Cast acrylic letters with high-efficiency waterproof LED modules.' },
    { id: '4', title: 'Full Commercial Fleet & Van Wrap', category: 'advertising', image: '/images/portfolio-vehicle-branding.png', description: '3M cast adhesive wrap film with UV protective laminate.' },
  ]);
  const [newPortfolioTitle, setNewPortfolioTitle] = useState('');
  const [newPortfolioCategory, setNewPortfolioCategory] = useState('printing');
  const [newPortfolioDesc, setNewPortfolioDesc] = useState('');

  // Contact settings state
  const [phoneSetting, setPhoneSetting] = useState('+971 56 261 2617');
  const [emailInfo, setEmailInfo] = useState('info@aladeeladvertising.com');
  const [emailAdeel, setEmailAdeel] = useState('adeel@aladeeladvertising.com');
  const [emailCarina, setEmailCarina] = useState('carina@aladeeladvertising.com');
  const [emailNoor, setEmailNoor] = useState('noor@aladeeladvertising.com');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleStatusChange = (id: string, newStatus: LeadItem['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioTitle) return;
    const newItem: PortfolioCMSItem = {
      id: String(Date.now()),
      title: newPortfolioTitle,
      category: newPortfolioCategory,
      image: '/images/portfolio-business-cards.png',
      description: newPortfolioDesc || 'Custom branding solution designed and produced in Dubai.',
    };
    setPortfolioItems([...portfolioItems, newItem]);
    setNewPortfolioTitle('');
    setNewPortfolioDesc('');
  };

  const currentSeo = seoPages.find(s => s.pageId === selectedSeoPage) || seoPages[0];

  // ==============================================================
  // SECURE LOGIN SCREEN IF NOT AUTHENTICATED
  // ==============================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#051d13] flex items-center justify-center p-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-emerald-900/20 text-left rtl:text-right space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#051d13] text-amber-400 flex items-center justify-center mx-auto shadow-lg font-serif font-bold text-2xl border border-amber-400/30">
              A
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 font-serif">Al Adeel Admin Secure Login</h2>
            <p className="text-xs text-gray-500">Authorized personnel only (Dubai Production Facility)</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Username / Admin ID</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400 rtl:left-auto rtl:right-3.5" />
                <input
                  type="text"
                  placeholder="admin"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden rtl:pl-4 rtl:pr-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400 rtl:left-auto rtl:right-3.5" />
                <input
                  type="password"
                  placeholder="aladeel2026"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden rtl:pl-4 rtl:pr-10"
                  required
                />
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">Default demo credentials: username: <strong>admin</strong>, password: <strong>aladeel2026</strong></span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Secure Admin Login
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-bold text-gray-600 hover:text-amber-700 transition-colors cursor-pointer"
            >
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==============================================================
  // AUTHENTICATED DASHBOARD & CMS PRO
  // ==============================================================
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-left rtl:text-right" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#051d13] text-gray-300 flex-shrink-0 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-emerald-900/60 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
              A
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-sm">Advanced CMS Pro</h3>
              <span className="text-[11px] text-emerald-400 block">Al Adeel Advertising LLC</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#b87e2a] text-white shadow-md' : 'hover:bg-emerald-950 text-gray-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{lang === 'ar' ? 'لوحة التحكم الرئيسية' : 'Dashboard Overview'}</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'leads' ? 'bg-[#b87e2a] text-white shadow-md' : 'hover:bg-emerald-950 text-gray-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'ar' ? 'طلبات الأسعار والعملاء' : 'Quotation Leads'}</span>
              <span className="ml-auto bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'seo' ? 'bg-[#b87e2a] text-white shadow-md' : 'hover:bg-emerald-950 text-gray-300'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إدارة السيو (SEO Manager)' : 'SEO & Meta Tags'}</span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'pages' ? 'bg-[#b87e2a] text-white shadow-md' : 'hover:bg-emerald-950 text-gray-300'
              }`}
            >
              <LayoutTemplate className="w-4 h-4" />
              <span>{lang === 'ar' ? 'محرر محتوى الصفحات' : 'Page Content CMS'}</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'portfolio' ? 'bg-[#b87e2a] text-white shadow-md' : 'hover:bg-emerald-950 text-gray-300'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إدارة معرض الأعمال' : 'Portfolio Manager'}</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'services' ? 'bg-[#b87e2a] text-white shadow-md' : 'hover:bg-emerald-950 text-gray-300'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إدارة الأسعار والخدمات' : 'Services & Pricing'}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'settings' ? 'bg-[#b87e2a] text-white shadow-md' : 'hover:bg-emerald-950 text-gray-300'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إعدادات الاتصال والفرق' : 'Contact Settings'}</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-emerald-900/65 space-y-3">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تسجيل الخروج (Logout)' : 'Admin Logout'}</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-200 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>← {lang === 'ar' ? 'العودة للموقع الرئيسي' : 'Back to Website'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif">
              {activeTab === 'overview' && (lang === 'ar' ? 'لوحة القيادة والأداء العام' : 'Advanced Dashboard Overview')}
              {activeTab === 'leads' && (lang === 'ar' ? 'إدارة طلبات الأسعار والعملاء المحتملين' : 'Quotation Leads & Inquiries')}
              {activeTab === 'seo' && (lang === 'ar' ? 'إدارة محرك البحث والسيو (SEO & Meta Tags)' : 'SEO & Meta Tag Manager')}
              {activeTab === 'pages' && (lang === 'ar' ? 'محرر محتوى صفحات الموقع (Page Content CMS)' : 'Page Content Editor CMS')}
              {activeTab === 'portfolio' && (lang === 'ar' ? 'إدارة معرض الأعمال والمشاريع' : 'Portfolio & Gallery Manager')}
              {activeTab === 'services' && (lang === 'ar' ? 'إدارة الخدمات والأسعار التنافسية' : 'Services & Pricing Engine')}
              {activeTab === 'settings' && (lang === 'ar' ? 'إعدادات الاتصال والفرق' : 'Contact Details & Team Emails')}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {lang === 'ar' 
                ? 'نظام إدارة محتوى متقدم (CMS) للتحكم الكامل بموقع شركة العادل'
                : 'Advanced CMS studio for full control over SEO, page text, portfolio items, and leads.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'ar' ? 'المشرف مسجل الدخول' : 'Authenticated as Admin'}</span>
            </span>
          </div>
        </div>

        {/* ========================================================== */}
        {/* TAB 1: OVERVIEW & STATS                                    */}
        {/* ========================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Inquiries</span>
                  <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{leads.length + 24}</h3>
                  <span className="text-xs text-emerald-600 font-semibold mt-1 block">↑ +18% this month</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pipeline Value</span>
                  <h3 className="text-3xl font-extrabold text-gray-900 mt-1">AED 48,950</h3>
                  <span className="text-xs text-emerald-600 font-semibold mt-1 block">Active corporate orders</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Production</span>
                  <h3 className="text-3xl font-extrabold text-gray-900 mt-1">12 Orders</h3>
                  <span className="text-xs text-amber-600 font-semibold mt-1 block">Tajima & UV Printing</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">WhatsApp Inquiries</span>
                  <h3 className="text-3xl font-extrabold text-gray-900 mt-1">142</h3>
                  <span className="text-xs text-emerald-600 font-semibold mt-1 block">+971 56 261 2617 active</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Recent Leads Table Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-serif text-gray-900">Recent Quotation Requests</h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-bold text-[#b87e2a] hover:underline cursor-pointer"
                >
                  View All Leads →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="bg-gray-50 text-gray-600 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Lead ID</th>
                      <th className="px-4 py-3">Client & Company</th>
                      <th className="px-4 py-3">Service & Product</th>
                      <th className="px-4 py-3">Emirate</th>
                      <th className="px-4 py-3">Total AED</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold text-gray-900">{lead.id}</td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-gray-900 block">{lead.clientName}</span>
                          <span className="text-gray-500 text-[11px]">{lead.companyName}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-800 block">{lead.service}</span>
                          <span className="text-gray-500 text-[11px]">{lead.product} ({lead.quantity} units)</span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 font-medium">{lead.emirate}</td>
                        <td className="px-4 py-3 font-bold text-amber-700">{lead.totalAed}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            lead.status === 'New' ? 'bg-amber-100 text-amber-800' :
                            lead.status === 'In Production' ? 'bg-blue-100 text-blue-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: QUOTATION LEADS & INQUIRIES                         */}
        {/* ========================================================== */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold font-serif text-gray-900">All Client Quotation Requests</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Total Leads: <strong>{leads.length}</strong></span>
              </div>
            </div>

            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-amber-700">{lead.id}</span>
                      <span className="text-xs text-gray-400">• {lead.date}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-gray-900">{lead.clientName} <span className="text-xs text-gray-500 font-normal">({lead.companyName})</span></h4>
                    
                    <p className="text-xs text-gray-600 font-medium">
                      Service: <strong className="text-gray-900">{lead.service}</strong> → {lead.product} ({lead.quantity} units) | Delivery: {lead.emirate}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-amber-700 font-bold">
                        <Phone className="w-3.5 h-3.5" /> {lead.phone}
                      </a>
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-amber-700 font-bold">
                        <Mail className="w-3.5 h-3.5" /> {lead.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="text-right rtl:text-left">
                      <span className="text-xs text-gray-400 block">Total Quotation</span>
                      <strong className="text-lg font-extrabold text-amber-700">{lead.totalAed}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${lead.clientName},%20regarding%20your%20quotation%20for%20${lead.service}%20(${lead.totalAed}).`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>

                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        className="px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs font-bold text-gray-700 cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Production">In Production</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        aria-label="Delete Lead"
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 3: ADVANCED SEO MANAGER                                */}
        {/* ========================================================== */}
        {activeTab === 'seo' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6 max-w-4xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-gray-900">Search Engine Optimization (SEO) & Meta Tags</h3>
                <p className="text-xs text-gray-500">Manage page titles, meta descriptions, and OpenGraph tags for Dubai & UAE rankings.</p>
              </div>
              <div className="flex gap-2">
                {seoPages.map((p) => (
                  <button
                    key={p.pageId}
                    onClick={() => setSelectedSeoPage(p.pageId)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      selectedSeoPage === p.pageId ? 'bg-[#b87e2a] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p.pageName}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`SEO settings for ${currentSeo.pageName} saved successfully!`);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Meta Browser Title (&lt;title&gt;)</label>
                <input
                  type="text"
                  value={currentSeo.title}
                  onChange={(e) => {
                    const updated = seoPages.map(s => s.pageId === selectedSeoPage ? { ...s, title: e.target.value } : s);
                    setSeoPages(updated);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Meta Description (&lt;meta name="description"&gt;)</label>
                <textarea
                  rows={3}
                  value={currentSeo.description}
                  onChange={(e) => {
                    const updated = seoPages.map(s => s.pageId === selectedSeoPage ? { ...s, description: e.target.value } : s);
                    setSeoPages(updated);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Target Keywords</label>
                <input
                  type="text"
                  value={currentSeo.keywords}
                  onChange={(e) => {
                    const updated = seoPages.map(s => s.pageId === selectedSeoPage ? { ...s, keywords: e.target.value } : s);
                    setSeoPages(updated);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">OpenGraph Social Share Image URL (og:image)</label>
                <input
                  type="text"
                  value={currentSeo.ogImage}
                  onChange={(e) => {
                    const updated = seoPages.map(s => s.pageId === selectedSeoPage ? { ...s, ogImage: e.target.value } : s);
                    setSeoPages(updated);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save SEO Config for {currentSeo.pageName}
              </button>
            </form>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 4: PAGE CONTENT EDITOR (CMS)                           */}
        {/* ========================================================== */}
        {activeTab === 'pages' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6 max-w-4xl">
            <div>
              <h3 className="text-lg font-bold font-serif text-gray-900">Page Content & Heading Editor</h3>
              <p className="text-xs text-gray-500">Edit key headlines, taglines, and banner text across the website in real-time.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Page content updated successfully!');
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Eyebrow (e.g. YOUR VISION • OUR PRINT)</label>
                <input
                  type="text"
                  value={pageContent.heroEyebrow}
                  onChange={(e) => setPageContent({ ...pageContent, heroEyebrow: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Title Line 1</label>
                  <input
                    type="text"
                    value={pageContent.heroTitle1}
                    onChange={(e) => setPageContent({ ...pageContent, heroTitle1: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Title Highlight (in UAE)</label>
                  <input
                    type="text"
                    value={pageContent.heroTitle2}
                    onChange={(e) => setPageContent({ ...pageContent, heroTitle2: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Subtitle Paragraph</label>
                <textarea
                  rows={3}
                  value={pageContent.heroSubtitle}
                  onChange={(e) => setPageContent({ ...pageContent, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">About Us Heading</label>
                <input
                  type="text"
                  value={pageContent.aboutHeading}
                  onChange={(e) => setPageContent({ ...pageContent, aboutHeading: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Page Content CMS
              </button>
            </form>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 5: PORTFOLIO & GALLERY MANAGER                         */}
        {/* ========================================================== */}
        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-8">
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-2">Add New Portfolio Project</h3>
              <form onSubmit={handleAddPortfolio} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Project Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Expo 2024 Branded Stand"
                    value={newPortfolioTitle}
                    onChange={(e) => setNewPortfolioTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                  <select
                    value={newPortfolioCategory}
                    onChange={(e) => setNewPortfolioCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium cursor-pointer"
                  >
                    <option value="printing">Printing</option>
                    <option value="embroidery">Embroidery</option>
                    <option value="advertising">Advertising</option>
                    <option value="signage">Signage</option>
                    <option value="corporate-gifts">Corporate Gifts</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer h-[42px]"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-4">Existing Portfolio Gallery Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 flex flex-col justify-between">
                    <div className="h-40 overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-bold text-amber-300 uppercase">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-3">
                      <h4 className="text-sm font-bold text-gray-900 leading-snug">{item.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                      <button
                        onClick={() => setPortfolioItems(portfolioItems.filter(p => p.id !== item.id))}
                        className="w-full py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Project
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 6: SERVICES & PRICING ENGINE                           */}
        {/* ========================================================== */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-gray-900">UAE Services & Volume Pricing Configuration</h3>
              <button
                onClick={() => alert('New service category added successfully!')}
                className="px-4 py-2 rounded-xl bg-[#b87e2a] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Service Category
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Printing (Commercial & Large Format)', base: 'AED 0.36 / unit', turnaround: '24-48 Hours', status: 'Active' },
                { name: 'Embroidery (Polo Shirts & Caps)', base: 'AED 35.00 / unit', turnaround: '3-5 Business Days', status: 'Active' },
                { name: 'Advertising & Signage (3D LED Letters)', base: 'AED 4,200 / unit', turnaround: '4-7 Business Days', status: 'Active' },
                { name: 'Corporate Gifts (VIP Gift Sets)', base: 'AED 45.00 / unit', turnaround: '2-4 Business Days', status: 'Active' },
              ].map((srv, i) => (
                <div key={i} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">{srv.status}</span>
                    <span className="text-xs text-gray-500 font-medium">Lead Time: {srv.turnaround}</span>
                  </div>
                  <h4 className="text-base font-bold text-gray-900">{srv.name}</h4>
                  <p className="text-xs text-gray-600 font-semibold">Base Rate: <strong className="text-amber-700">{srv.base}</strong></p>
                  <div className="pt-2 border-t border-gray-200 flex items-center gap-2">
                    <button onClick={() => alert(`Editing pricing for ${srv.name}`)} className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-1">
                      <Edit3 className="w-3.5 h-3.5" /> Edit Pricing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 7: CONTACT & TEAM SETTINGS                             */}
        {/* ========================================================== */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs max-w-2xl">
            <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">Company & Team Contact Settings</h3>
            <p className="text-xs text-gray-500 mb-6">Update official contact details displayed across the entire UAE website.</p>

            {savedMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Contact settings updated successfully across website!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Direct Phone & WhatsApp Number</label>
                <input
                  type="text"
                  value={phoneSetting}
                  onChange={(e) => setPhoneSetting(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">General & Quotations Email</label>
                <input
                  type="email"
                  value={emailInfo}
                  onChange={(e) => setEmailInfo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Adeel (Executive Email)</label>
                <input
                  type="email"
                  value={emailAdeel}
                  onChange={(e) => setEmailAdeel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Carina (Sales & Accounts Email)</label>
                <input
                  type="email"
                  value={emailCarina}
                  onChange={(e) => setEmailCarina(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Noor (Client Relations Email)</label>
                <input
                  type="email"
                  value={emailNoor}
                  onChange={(e) => setEmailNoor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Save Contact Settings
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};
