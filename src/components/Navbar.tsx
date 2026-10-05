import React, { useState } from 'react';
import { Menu, X, QrCode, Heart, Award, ArrowUpRight } from 'lucide-react';
import { TrustLogo } from './TrustLogo';

interface NavbarProps {
  onOpenQr: () => void;
  onOpenMembership: () => void;
  onOpenDonate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQr,
  onOpenMembership,
  onOpenDonate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Pillars', href: '#pillars' },
    { label: 'Orphanage & Widows Home', href: '#orphanage-widows-building' },
    { label: 'Notice Board', href: '#notices' },
    { label: 'Donation Tracker', href: '#donations' },
    { label: 'Photo Gallery', href: '#gallery' },
    { label: 'Gift Cards', href: '#giftcards' },
    { label: 'Volunteer', href: '#volunteer' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-stone-950 hover:text-emerald-900 transition-colors py-2"
          >
            <TrustLogo size="sm" />
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap">
              Afzal Charitable Trust
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-emerald-800 hover:underline underline-offset-8 decoration-emerald-600/40 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenQr}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
              title="Official Event & Marketing QR Code"
              aria-label="Scan Event QR Code"
            >
              <QrCode className="w-4 h-4 text-emerald-800" />
              <span className="hidden sm:inline">Event QR</span>
            </button>

            <button
              onClick={onOpenMembership}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-950 bg-amber-300 hover:bg-amber-400 rounded-lg transition-colors shadow-sm border border-amber-400 whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-emerald-900" />
              <span>Membership (৳250)</span>
            </button>

            <button
              onClick={onOpenDonate}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
              <span>Donate</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2 border-b border-stone-100 pb-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMembership();
              }}
              className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-amber-300 hover:bg-amber-400 text-stone-900 text-xs font-bold shadow-sm"
            >
              <Award className="w-4 h-4 text-emerald-900" />
              <span>Member (৳250)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-sm"
            >
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
