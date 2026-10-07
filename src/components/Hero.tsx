import React, { useEffect, useState } from 'react';
import { Award, Heart, QrCode, ArrowDown, ShieldCheck, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { TrustLogo } from './TrustLogo';

interface HeroProps {
  onOpenMembership: () => void;
  onOpenDonate: () => void;
  onOpenQr: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenMembership,
  onOpenDonate,
  onOpenQr
}) => {
  const [heroQrUrl, setHeroQrUrl] = useState<string>('');

  useEffect(() => {
    generateQrDataUrl('https://afzalcharitabletrust.org.bd/join?ref=hero_qr', 160)
      .then(url => setHeroQrUrl(url));
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Top Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 mb-4">
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/70">
            <TrustLogo size="xs" />
            <span>Registered Non-Profit Trust · Bangladesh</span>
          </span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>Reg. Est. 2026</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>16 Humanitarian Focus Areas</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span className="text-amber-700 font-medium">Annual Audit Certified</span>
        </div>

        {/* Official Website-Only Gifting Advisory Note */}
        <div className="bg-amber-50/90 border border-amber-300 rounded-xl px-3.5 py-2 mb-6 flex items-center gap-2 text-xs text-amber-950 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
          <span>
            <strong className="text-emerald-950 font-bold">Important Trust Advisory:</strong> Supporters will send their gifts, building endowments, and donations <strong>through this official website only</strong>. The Trust does not authorize any third-party collectors or personal cash agents.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative & Calls to Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Empowering Vulnerable Lives with Compassion, Dignity & Lasting Opportunity
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl font-normal">
              Afzal Charitable Trust is an independent humanitarian organization operating across Bangladesh. From rural scholarship labs and mobile healthcare to winter relief and transgender social enterprise, we build an inclusive society where no community is left behind.
            </p>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenMembership}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-95 border border-amber-500"
              >
                <Award className="w-4 h-4 text-emerald-950" />
                <span>Get Membership & Certificate (৳250)</span>
              </button>

              <button
                onClick={onOpenDonate}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-95"
              >
                <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                <span>Support Active Causes</span>
              </button>

              <button
                onClick={onOpenQr}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm border border-stone-300 shadow-xs transition-colors"
                title="Scan QR Code"
              >
                <QrCode className="w-4 h-4 text-emerald-800" />
                <span>Scan QR</span>
              </button>
            </div>

            {/* Quick Proof Strip */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-200">
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">4,200+</div>
                <div className="text-xs text-stone-600">Students & Scholars</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">28,500+</div>
                <div className="text-xs text-stone-600">Patients Treated</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">52,000+</div>
                <div className="text-xs text-stone-600">Relief Hampers</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">1,500+</div>
                <div className="text-xs text-stone-600">Volunteers Nationwide</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset with QR Code Inset (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-xl bg-stone-100 group">
              <img
                src="/src/assets/images/hero_community_empowerment_1791208356769.jpg"
                alt="Afzal Charitable Trust humanitarian community education drive in Bangladesh"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Real-World Field Impact · Habiganj, Sylhet</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-100 font-sans leading-snug">
                  Providing scholarships and digital education supplies for rural youth in under-served communities.
                </p>
              </div>

              {/* Embedded Event QR Code Pill */}
              <div 
                onClick={onOpenQr}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-stone-200 cursor-pointer hover:bg-white transition-all transform hover:scale-105"
                title="Click to expand official event QR code"
              >
                <div className="flex items-center gap-2">
                  {heroQrUrl ? (
                    <img src={heroQrUrl} alt="Scan for Trust info" className="w-12 h-12 rounded" />
                  ) : (
                    <QrCode className="w-12 h-12 text-emerald-800" />
                  )}
                  <div className="text-left hidden sm:block pr-1">
                    <span className="block text-[10px] font-bold text-stone-900 leading-tight">SCAN & JOIN</span>
                    <span className="block text-[9px] text-emerald-800 font-medium">Event & Print QR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notice Marquee Preview */}
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-stone-700">
              <div className="flex items-center gap-2 truncate">
                <span className="bg-emerald-800 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shrink-0">
                  Latest Notice
                </span>
                <span className="truncate font-medium text-stone-800">
                  Annual Meritorious Scholarship 2026 Applications Now Open
                </span>
              </div>
              <a
                href="#notices"
                className="text-emerald-900 font-bold hover:underline shrink-0 ml-2"
              >
                View Notice →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
