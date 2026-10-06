import React, { useState } from 'react';
import { 
  Heart, 
  Award, 
  QrCode, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck, 
  ExternalLink,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Lock,
  Scale,
  FileText
} from 'lucide-react';
import { TRUST_NAME, TRUST_MOTTO, TRUST_ESTABLISHED } from '../data/mockData';
import { TrustLogo } from './TrustLogo';
import { LegalModal } from './LegalModal';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface FooterProps {
  onOpenQr: () => void;
  onOpenMembership: () => void;
  onOpenDonate: () => void;
  onOpenShare: (title: string, text: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQr,
  onOpenMembership,
  onOpenDonate,
  onOpenShare,
}) => {
  const { t } = useLanguage();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms'>('privacy');

  const openLegal = (tab: 'privacy' | 'terms') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Mandate (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <TrustLogo size="md" variant="horizontal" dark showSubtitle />

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Dedicated to uplifting underprivileged communities across Bangladesh through 
              education, healthcare, poverty relief, and social welfare with transparency and compassion.
            </p>

            <div className="text-xs text-amber-300/90 font-serif italic">
              {TRUST_MOTTO}
            </div>

            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700 text-xs text-stone-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Direct Gifting Policy:</strong> Supporters will send their gift and contributions <strong>through this official website only</strong>. The Trust never solicits donations through personal payment accounts.
              </span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={onOpenQr}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold border border-stone-700 transition-colors"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>Event & Printed QR Code</span>
              </button>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Humanitarian Portals
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#mission-vision" className="hover:text-white transition-colors">
                  Mission & Vision Statements
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-white transition-colors">
                  16 Action Pillars
                </a>
              </li>
              <li>
                <a href="#orphanage-widows-building" className="hover:text-amber-300 transition-colors font-medium">
                  Orphanage & Widows Home Building
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-amber-300 transition-colors">
                  Lifetime Membership (৳250) & Certificate
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-white transition-colors">
                  Trust Notice Board & Gazettes
                </a>
              </li>
              <li>
                <a href="#donations" className="hover:text-white transition-colors">
                  Donation Progress Tracker
                </a>
              </li>
              <li>
                <a href="#volunteer" className="hover:text-amber-300 transition-colors font-medium">
                  Volunteer Corps Enlistment
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Documentary Photo Gallery
                </a>
              </li>
              <li>
                <a href="#giftcards" className="hover:text-rose-300 transition-colors">
                  Charitable Gift Cards ($5 - $100)
                </a>
              </li>
              <li>
                <a href="#tax-benefits" className="hover:text-amber-300 transition-colors font-medium">
                  Tax Benefits for Donors (15% NBR Rebate)
                </a>
              </li>
              <li className="pt-2 border-t border-stone-800">
                <button
                  onClick={() => openLegal('privacy')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-left text-stone-300"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Website Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('terms')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-left text-stone-300"
                >
                  <Scale className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terms & Conditions of Service</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Head Office & Operations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Secretariat & Headquarters
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Trust Bhaban, Level 4, Plot 12, Road 7, Dhanmondi, Dhaka-1205, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+880 2 9876543 / +880 1712 000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@afzalcharitabletrust.org.bd</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Govt. Trust Deed Registration No. TR-4821</span>
              </div>
            </div>
          </div>

          {/* Social & Sharing (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Share Our Work
            </h4>
            <p className="text-xs text-stone-400">
              Help us expand our reach by sharing our milestone achievements.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onOpenShare(
                  'Afzal Charitable Trust',
                  'Support Afzal Charitable Trust: Transforming lives across Bangladesh through education, healthcare, and poverty relief.'
                )}
                className="p-2 rounded-lg bg-stone-800 hover:bg-emerald-900 text-stone-300 hover:text-white transition-colors"
                title="Share Trust Website"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenShare('Afzal Charitable Trust', 'Check out the noble initiatives of Afzal Charitable Trust in Bangladesh!')}
                className="p-2 rounded-lg bg-stone-800 hover:bg-blue-900 text-stone-300 hover:text-white transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenShare('Afzal Charitable Trust', 'Empowering communities across Bangladesh with Afzal Charitable Trust.')}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenShare('Afzal Charitable Trust', 'Discover the humanitarian programs of Afzal Charitable Trust.')}
                className="p-2 rounded-lg bg-stone-800 hover:bg-sky-900 text-stone-300 hover:text-white transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {TRUST_NAME}. {t('footer.copyright', 'All rights reserved. Operated under solemn humanitarian charter in Bangladesh.')}
          </div>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px]">
            <LanguageSelector variant="compact" dark />
            <span>·</span>
            <button
              onClick={() => openLegal('privacy')}
              className="text-stone-400 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              {t('footer.privacy', 'Privacy Policy')}
            </button>
            <span>·</span>
            <button
              onClick={() => openLegal('terms')}
              className="text-stone-400 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              {t('footer.terms', 'Terms & Conditions')}
            </button>
            <span>·</span>
            <span>{t('footer.transparency', 'Transparency & Audit')}</span>
            <span>·</span>
            <span>{t('footer.nonDiscrimination', 'Non-Discrimination Policy')}</span>
            <span>·</span>
            <span>{t('footer.taxExempt', 'Tax Exemption SRO No. 192')}</span>
          </div>
        </div>

      </div>

      {/* Official Legal & Privacy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
      />
    </footer>
  );
};
