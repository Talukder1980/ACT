import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  QrCode, 
  Heart, 
  Award, 
  ArrowRight, 
  ChevronDown,
  Building2,
  Sparkles,
  Gift,
  HeartHandshake,
  TrendingUp,
  Bell,
  Camera,
  ShieldCheck,
  Phone,
  Lock,
  Scale,
  Receipt
} from 'lucide-react';
import { TrustLogo } from './TrustLogo';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  onOpenQr: () => void;
  onOpenMembership: () => void;
  onOpenDonate: () => void;
}

interface NavCategoryItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQr,
  onOpenMembership,
  onOpenDonate,
}) => {
  const { t } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Grouped vertical menu items
  const menuCategories: { category: string; items: NavCategoryItem[] }[] = [
    {
      category: 'Capital Endowments & Core Pillars',
      items: [
        {
          id: 'orphanage',
          label: t('nav.orphanage', 'Orphanage & Widows Home'),
          href: '#orphanage-widows-building',
          icon: Building2,
          description: 'Special sanctuary construction project & 6 gift dedication packages.',
          badge: 'Active Appeal'
        },
        {
          id: 'pillars',
          label: t('nav.pillars', '16 Humanitarian Pillars'),
          href: '#pillars',
          icon: Sparkles,
          description: 'Education, medical camps, disaster rescue, poverty relief & welfare.'
        }
      ]
    },
    {
      category: 'Philanthropy & Dedicated Giving',
      items: [
        {
          id: 'giftcards',
          label: t('nav.giftcards', 'Charitable Gift Cards ($5 - $100)'),
          href: '#giftcards',
          icon: Gift,
          description: '6 purposeful gift tiers with instant email dispatch & QR certificates.'
        },
        {
          id: 'donations',
          label: t('nav.donations', 'Live Donation Tracker'),
          href: '#donations',
          icon: TrendingUp,
          description: 'Real-time relief campaign metrics and transparent fund allocation.'
        },
        {
          id: 'membership',
          label: t('nav.membership', 'Lifetime Membership (৳250)'),
          href: '#membership',
          icon: Award,
          description: 'Official member registry, digital ID, and authenticated certificate.'
        },
        {
          id: 'tax-benefits',
          label: t('nav.taxBenefits', 'Tax Benefits for Donors'),
          href: '#tax-benefits',
          icon: Receipt,
          description: '15% NBR tax rebate on donations under Bangladesh Income Tax Act 2023.',
          badge: '15% Rebate'
        }
      ]
    },
    {
      category: 'Community, Transparency & Media',
      items: [
        {
          id: 'volunteer',
          label: t('nav.volunteer', 'Volunteer Corps Enlistment'),
          href: '#volunteer',
          icon: HeartHandshake,
          description: 'Join 1,420+ volunteers across 64 districts in Bangladesh with verified pass.'
        },
        {
          id: 'notices',
          label: t('nav.notices', 'Trust Notice Board & Gazettes'),
          href: '#notices',
          icon: Bell,
          description: 'Official announcements, meeting minutes, and annual audited gazettes.'
        },
        {
          id: 'gallery',
          label: t('nav.gallery', 'Documentary Photo Gallery'),
          href: '#gallery',
          icon: Camera,
          description: 'Photographic evidence of relief distributions and rural medical camps.'
        }
      ]
    }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    setDropdownOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left: Brand Identity Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 text-stone-950 hover:text-emerald-900 transition-colors py-2"
            >
              <TrustLogo size="sm" />
              <div className="leading-tight">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 block">
                  {t('trust.name', 'Afzal Charitable Trust')}
                </span>
                <span className="text-[10px] text-stone-500 font-sans tracking-wide hidden sm:block">
                  {t('trust.registered', 'Registered Non-Profit Trust · Bangladesh')}
                </span>
              </div>
            </a>

            {/* Center: Clean Vertical Dropdown (Instead of showing all 7 links horizontal) */}
            <div className="hidden md:flex items-center gap-3">
              
              {/* Highlight Primary Button */}
              <button
                onClick={() => handleNavClick('#orphanage-widows-building')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200/80"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <Building2 className="w-3.5 h-3.5 text-emerald-800" />
                <span>{t('nav.buildingSanctuary', 'Building Sanctuary')}</span>
              </button>

              {/* Vertical Menu Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                    dropdownOpen 
                      ? 'bg-stone-100 border-stone-300 text-stone-900' 
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                  aria-expanded={dropdownOpen}
                >
                  <Menu className="w-4 h-4 text-emerald-800" />
                  <span>{t('nav.allPortals', 'All Portals & Menu')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Vertical Dropdown Panel */}
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-stone-200 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
                    <div className="px-2 py-1.5 border-b border-stone-100 mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-900 block">
                        Trust Navigation Directory
                      </span>
                      <p className="text-xs text-stone-500">
                        Select a portal to navigate directly
                      </p>
                    </div>

                    <div className="space-y-4">
                      {menuCategories.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-1">
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-2">
                            {group.category}
                          </span>
                          <div className="space-y-0.5">
                            {group.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => handleNavClick(item.href)}
                                  className="w-full p-2 rounded-xl text-left hover:bg-emerald-50/80 transition-colors flex items-start gap-2.5 group"
                                >
                                  <div className="p-1.5 rounded-lg bg-stone-100 text-stone-700 group-hover:bg-emerald-800 group-hover:text-white transition-colors shrink-0 mt-0.5">
                                    <Icon className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                                        {item.label}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded border border-amber-200">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-stone-500 truncate">
                                      {item.description}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 px-2">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          setDrawerOpen(true);
                        }}
                        className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1"
                      >
                        <span>Open Full Navigation Sheet</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Actions, Language Switcher & Universal Vertical Menu Trigger */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Language Switcher Dropdown */}
              <LanguageSelector variant="compact" />

              <button
                onClick={onOpenQr}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200"
                title="Event QR Code"
              >
                <QrCode className="w-4 h-4 text-emerald-800" />
                <span>{t('nav.eventQr', 'Event QR')}</span>
              </button>

              <button
                onClick={onOpenMembership}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-semibold text-emerald-950 bg-amber-300 hover:bg-amber-400 rounded-xl transition-colors shadow-2xs border border-amber-400 whitespace-nowrap"
              >
                <Award className="w-3.5 h-3.5 text-emerald-900" />
                <span>{t('nav.membership', 'Membership (৳250)')}</span>
              </button>

              <button
                onClick={onOpenDonate}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-2xs whitespace-nowrap"
              >
                <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
                <span>{t('nav.donate', 'Donate')}</span>
              </button>

              {/* Vertical Menu Trigger Button (Replaces cluttered horizontal links) */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-stone-800 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-xl border border-stone-300 text-xs sm:text-sm font-bold transition-colors"
                aria-label="Open Full Vertical Menu"
              >
                <Menu className="w-4 h-4 text-emerald-800" />
                <span>{t('nav.menu', 'Menu')}</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full Vertical Slide-Over Drawer (Clean, non-horizontal, categorized layout) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
              
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 to-stone-900 text-white flex items-center justify-between border-b border-emerald-800">
                <div className="flex items-center gap-2.5">
                  <TrustLogo size="xs" variant="seal" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                      Trust Navigation
                    </span>
                    <h3 className="font-serif font-bold text-base text-white">
                      Afzal Charitable Trust
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Vertical Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                
                {/* Official Advisory Notice */}
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong>Official Trust Note:</strong> All gifts, building endowments, and memberships are processed through this official website only.
                  </div>
                </div>

                {/* Language Switcher in Drawer */}
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <LanguageSelector variant="expanded" />
                </div>

                {/* Categorized Vertical Sections */}
                {menuCategories.map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-[11px] uppercase tracking-wider font-bold text-stone-400 border-b border-stone-100 pb-1.5">
                      {group.category}
                    </h4>

                    <div className="space-y-1.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.href)}
                            className="w-full p-3 rounded-2xl text-left bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all flex items-start gap-3 group"
                          >
                            <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 group-hover:bg-emerald-800 group-hover:text-amber-300 group-hover:border-emerald-800 transition-colors shrink-0 mt-0.5 shadow-2xs">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-emerald-950">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                                {item.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenMembership();
                    }}
                    className="p-3 bg-amber-300 hover:bg-amber-400 text-emerald-950 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs border border-amber-400"
                  >
                    <Award className="w-4 h-4 text-emerald-900" />
                    <span>Member (৳250)</span>
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenDonate();
                    }}
                    className="p-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                    <span>Donate Now</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenQr();
                  }}
                  className="w-full py-2 px-3 bg-white hover:bg-stone-100 text-stone-700 rounded-xl font-semibold text-xs border border-stone-300 flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Show Event & Mobile QR Code</span>
                </button>

                <div className="text-center text-[10px] text-stone-400 pt-1">
                  Afzal Charitable Trust · Est. 2026 · Reg. Deed TR-4821
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
