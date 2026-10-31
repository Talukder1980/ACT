import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  Send, 
  Printer, 
  CheckCircle2, 
  CreditCard, 
  Share2, 
  QrCode, 
  ShieldCheck, 
  Mail, 
  Heart,
  ArrowRight,
  Eye,
  RefreshCw,
  Copy,
  Check,
  Calendar,
  User,
  FileText,
  Layers,
  Tag,
  ChevronRight,
  DollarSign,
  Award,
  Globe,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GIFT_CARD_TIERS, TRUST_NAME, TRUST_MOTTO, TRUST_ESTABLISHED } from '../data/mockData';
import { GiftCardTier, PurchasedGiftCard } from '../types';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { TrustLogo } from './TrustLogo';
import { useContent } from '../context/ContentContext';

interface GiftCardsSectionProps {
  onOpenShare: (title: string, text: string) => void;
}

// Sample recent gift card dedications for social proof & inspiration
const RECENT_COMMUNITY_GIFTS = [
  { id: 'rc-1', tier: '$25 Scholar Patron', cause: 'Rural Girls STEM Labs', purchaser: 'Amina K. (London)', recipient: 'Sumaiya Akter', time: '18 mins ago' },
  { id: 'rc-2', tier: '$50 Medical Lifeline', cause: 'Cataract Eye Surgeries', purchaser: 'Dr. Rafiqul & Farzana (Dhaka)', recipient: 'In Memory of Late Parents', time: '1 hour ago' },
  { id: 'rc-3', tier: '$100 Community Transformer', cause: 'Vocational Sewing Kits', purchaser: 'Tanvir Hossain (Toronto)', recipient: 'Fatema Khatun', time: '3 hours ago' },
  { id: 'rc-4', tier: '$15 NutriCare Guardian', cause: 'Emergency Food Hamper', purchaser: 'Nabila & Friends (Sydney)', recipient: 'Riverbank Erosion Families', time: '5 hours ago' }
];

export const GiftCardsSection: React.FC<GiftCardsSectionProps> = ({ onOpenShare }) => {
  const { content, isAdminLoggedIn, openAdminTab } = useContent();
  const giftCardTiers = content.giftCards;
  // Selected Tier (default $25)
  const [selectedTier, setSelectedTier] = useState<GiftCardTier>(giftCardTiers[2] || GIFT_CARD_TIERS[2]);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  
  // Checkout Form State
  const [purchaserName, setPurchaserName] = useState('');
  const [purchaserEmail, setPurchaserEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [occasion, setOccasion] = useState('In Honor of Someone Special');
  const [deliveryOption, setDeliveryOption] = useState<'recipient' | 'purchaser' | 'both'>('recipient');
  const [personalMessage, setPersonalMessage] = useState('May this gift bring joy, dignity, and flourishing hope to those who need it most.');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'bank'>('card');
  
  // Custom cause dedication override (if user wants a specific pillar)
  const [selectedCauseOverride, setSelectedCauseOverride] = useState<string>('');
  
  // Submission & Dispatch state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchStage, setDispatchStage] = useState<string>('');
  
  // Generated Certificate state
  const [activeCertificate, setActiveCertificate] = useState<PurchasedGiftCard | null>(null);
  const [certificateQrUrl, setCertificateQrUrl] = useState<string>('');
  
  // Interactive Email Preview Modal
  const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState(false);
  
  // Resend Email Form inside Certificate View
  const [resendEmailAddress, setResendEmailAddress] = useState('');
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  
  // Copy to clipboard status
  const [isCopied, setIsCopied] = useState(false);

  const handleOpenPurchase = (tier: GiftCardTier) => {
    setSelectedTier(tier);
    setSelectedCauseOverride('');
    setActiveCertificate(null);
    setIsPurchaseModalOpen(true);
  };

  const handleCompletePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purchaserName.trim() || !purchaserEmail.trim()) return;
    if ((deliveryOption === 'recipient' || deliveryOption === 'both') && (!recipientName.trim() || !recipientEmail.trim())) return;

    setIsSubmitting(true);
    setDispatchStage('Securing philanthropic transaction token...');

    const voucherCode = `ACT-GIFT-${selectedTier.amountUSD}-${Math.floor(10000 + Math.random() * 90000)}`;
    const certificateNumber = `ACT-GIFT-CERT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const effectiveCause = selectedCauseOverride || selectedTier.charitableCause;

    const qrUrl = await generateQrDataUrl(
      `https://afzalcharitabletrust.org.bd/gift-verify?voucher=${voucherCode}&cert=${certificateNumber}`,
      180
    );

    // Multi-step animated dispatch simulation
    setTimeout(() => {
      setDispatchStage('Rendering official cryptographic digital certificate with Trust Seal...');
    }, 400);

    setTimeout(() => {
      setDispatchStage(
        deliveryOption === 'recipient' 
          ? `Dispatching email package to ${recipientEmail} (with CC to ${purchaserEmail})...`
          : deliveryOption === 'both'
          ? `Dispatching parallel certificate packages to ${recipientEmail} and ${purchaserEmail}...`
          : `Dispatching printable certificate package to ${purchaserEmail}...`
      );
    }, 900);

    setTimeout(() => {
      const cardRecord: PurchasedGiftCard = {
        cardId: `card-${Date.now()}`,
        certificateNumber,
        voucherCode,
        amountUSD: selectedTier.amountUSD,
        approxBDT: selectedTier.approxBDT,
        tierName: selectedTier.tierName,
        charitableCause: effectiveCause,
        causeCategory: selectedTier.causeCategory,
        causePillar: selectedTier.causePillar,
        purchaserName: purchaserName.trim(),
        purchaserEmail: purchaserEmail.trim(),
        recipientName: recipientName.trim() || purchaserName.trim(),
        recipientEmail: recipientEmail.trim() || purchaserEmail.trim(),
        deliveryOption,
        occasion,
        personalMessage: personalMessage.trim(),
        datePurchased: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        colorTheme: selectedTier.gradient,
        fontStyleClass: selectedTier.fontStyleClass,
        fontFamilyName: selectedTier.fontFamilyName,
        paymentMethod: paymentMethod === 'card' ? 'International Credit/Debit Card' : paymentMethod === 'bkash' ? 'bKash / Nagad Instant Mobile MFS' : 'Institutional Bank Wire Transfer',
        emailDispatchedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      };

      setCertificateQrUrl(qrUrl);
      setActiveCertificate(cardRecord);
      setIsSubmitting(false);
      setDispatchStage('');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore fallback
      }
    }, 1500);
  };

  const handleCopyVoucher = () => {
    if (!activeCertificate) return;
    const shareText = `Afzal Charitable Trust Gift Card Voucher: ${activeCertificate.voucherCode} ($${activeCertificate.amountUSD} USD / ৳${activeCertificate.approxBDT.toLocaleString()} BDT dedicated for ${activeCertificate.charitableCause}). Verify: https://afzalcharitabletrust.org.bd/gift-verify?voucher=${activeCertificate.voucherCode}`;
    navigator.clipboard.writeText(shareText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleResendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmailAddress.trim()) return;
    setResendStatus('sending');
    setTimeout(() => {
      setResendStatus('sent');
      setTimeout(() => {
        setResendStatus('idle');
        setResendEmailAddress('');
      }, 3000);
    }, 900);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-stone-200" id="giftcards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dedicated Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold shadow-xs">
              <Gift className="w-4 h-4 text-rose-600" />
              <span>Dedicated Philanthropic Gifting Pavilion</span>
            </div>
            {isAdminLoggedIn && (
              <button
                onClick={() => openAdminTab('giftcards')}
                className="text-[10px] font-bold text-rose-900 hover:text-rose-950 flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-300"
              >
                <Gift className="w-3 h-3" />
                <span>Edit Gift Cards CMS</span>
              </button>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Humanitarian Gift Cards: Gifts That Dignify & Transform
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
            Choose from six purposeful gift card options from <strong>$5 to $100</strong>, each crafted with a 
            <strong> unique color palette and distinct font design</strong>. When you dedicate a card, 
            an official cryptographic Digital Gift Certificate is instantly emailed to you or your designated recipient, 
            clearly certifying the exact value and the charitable cause it directly funds.
          </p>

          {/* Official Website Direct Advisory Note */}
          <div className="mt-5 p-3.5 bg-white border border-emerald-700/40 rounded-2xl shadow-xs max-w-2xl mx-auto flex items-center justify-center gap-2.5 text-xs text-stone-800 text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
            <span>
              <strong className="text-emerald-950">Institutional Notice for Supporters:</strong> Supporters purchase gift cards <strong>through this official portal only</strong>. Certificates are instantly dispatched to recipient emails with verifiable QR authentication.
            </span>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 max-w-5xl mx-auto">
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 text-center shadow-2xs">
            <span className="text-xs font-bold text-emerald-900 uppercase block tracking-wider">6 Distinct Values</span>
            <span className="text-sm font-serif font-bold text-stone-800">$5 to $100 USD (৳600 - ৳12k)</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 text-center shadow-2xs">
            <span className="text-xs font-bold text-rose-900 uppercase block tracking-wider">Unique Color & Fonts</span>
            <span className="text-sm font-serif font-bold text-stone-800">6 Bespoke Typographic Themes</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 text-center shadow-2xs">
            <span className="text-xs font-bold text-blue-900 uppercase block tracking-wider">Direct Trust Pillars</span>
            <span className="text-sm font-serif font-bold text-stone-800">Clearly Stated Charitable Cause</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 text-center shadow-2xs">
            <span className="text-xs font-bold text-amber-900 uppercase block tracking-wider">Automated Email Delivery</span>
            <span className="text-sm font-serif font-bold text-stone-800">Instant PDF & QR Certificate</span>
          </div>
        </div>

        {/* Six Cards Grid in Six Different Colors & Unique Fonts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {giftCardTiers.map((tier) => {
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border-2 ${tier.accentBorder} bg-gradient-to-br ${tier.gradient} text-white group overflow-hidden`}
              >
                {/* Background decorative watermark */}
                <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-white select-none">
                  <Gift className="w-48 h-48" />
                </div>

                <div>
                  {/* Card Header Top */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/20">
                    <div className="flex items-center gap-2">
                      <TrustLogo size="xs" />
                      <span className="text-[11px] uppercase tracking-widest font-semibold text-white/90">
                        {TRUST_NAME}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-mono font-bold text-white shadow-2xs">
                      ৳{tier.approxBDT.toLocaleString()} BDT
                    </span>
                  </div>

                  {/* Typographic Badge & Unique Font Name Tag */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-black/25 text-[10px] font-medium tracking-wide uppercase text-white/90 border border-white/10">
                      {tier.fontFamilyName}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-bold text-white uppercase tracking-wider">
                      {tier.causePillar}
                    </span>
                  </div>

                  {/* Distinctive Amount & Title rendered with that tier's unique font */}
                  <div className="my-5">
                    <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-1 tabular-nums drop-shadow-sm flex items-baseline gap-1">
                      <span>${tier.amountUSD}</span>
                      <span className="text-sm font-normal text-white/80">USD</span>
                    </div>

                    {/* Unique Font Applied to Title */}
                    <h3 className={`text-xl sm:text-2xl text-white drop-shadow-sm ${tier.fontStyleClass} mt-1 leading-snug`}>
                      {tier.tierName}
                    </h3>
                  </div>

                  {/* Charitable Cause Highlight Badge */}
                  <div className="mb-4 bg-white/15 backdrop-blur-xs rounded-xl p-3 border border-white/20">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-200 mb-1">
                      <Heart className="w-3.5 h-3.5 fill-amber-200" />
                      <span>Dedicated Charitable Cause:</span>
                    </div>
                    <div className="text-xs font-semibold text-white leading-snug">
                      {tier.charitableCause}
                    </div>
                    <div className="text-[11px] text-white/70 mt-0.5 font-medium">
                      Category: {tier.causeCategory}
                    </div>
                  </div>

                  {/* Impact Description with High Legibility */}
                  <p className="text-xs text-white/90 leading-relaxed bg-black/20 p-3 rounded-xl backdrop-blur-2xs border border-white/10 mb-6">
                    {tier.impactDescription}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-white/15">
                  <button
                    onClick={() => handleOpenPurchase(tier)}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95"
                  >
                    <Gift className="w-4 h-4 text-emerald-800" />
                    <span>Purchase ${tier.amountUSD} Gift Card</span>
                    <ArrowRight className="w-4 h-4 text-stone-500" />
                  </button>
                  <div className="flex items-center justify-between text-[10px] text-white/80 mt-2 px-1">
                    <span>Includes Custom Email Dispatch</span>
                    <span>Verified QR Certificate</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Community Dedications Stream & Value Callout */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                Recent Supporter Dedications
              </span>
              <h4 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                Inspiring Solidarity Across Bangladesh & Global Diaspora
              </h4>
            </div>
            <button
              onClick={() => handleOpenPurchase(giftCardTiers[giftCardTiers.length - 1] || giftCardTiers[0])}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0 shadow-xs flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Dedicate Premier $100 Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RECENT_COMMUNITY_GIFTS.map(gift => (
              <div key={gift.id} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950">{gift.tier}</span>
                  <span className="text-[10px] text-stone-400">{gift.time}</span>
                </div>
                <div className="text-stone-700 font-medium truncate">
                  Cause: <em>{gift.cause}</em>
                </div>
                <div className="text-[11px] text-stone-500 truncate">
                  By {gift.purchaser} → {gift.recipient}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>100% Guaranteed Digital Delivery:</strong> Both purchaser and recipient receive instant verified certificates with official Trust Deed references.
              </span>
            </div>
            <span className="font-mono text-emerald-900 font-bold text-[11px] shrink-0">
              Trust Deed TR-4821
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* PURCHASE CHECKOUT & DIGITAL CERTIFICATE MODAL */}
      {/* ========================================================================= */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[94vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header Styled with Current Tier's Theme */}
            <div className={`p-5 sm:p-6 bg-gradient-to-r ${selectedTier.gradient} text-white flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                      {selectedTier.causePillar} · {selectedTier.tierName}
                    </span>
                    <span className="px-2 py-0.2 rounded-full bg-black/20 text-[10px] font-mono text-white">
                      {selectedTier.fontFamilyName}
                    </span>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold leading-tight ${selectedTier.fontStyleClass}`}>
                    ${selectedTier.amountUSD} USD Gift Card
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    Approx. ৳{selectedTier.approxBDT.toLocaleString()} BDT · Dedicated to {selectedTier.charitableCause}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsPurchaseModalOpen(false);
                  setActiveCertificate(null);
                }}
                className="text-white/80 hover:text-white text-2xl p-2 rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            {activeCertificate ? (
              /* ======================================================= */
              /* STATE A: GENERATED DIGITAL GIFT CERTIFICATE & ACTIONS   */
              /* ======================================================= */
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
                
                {/* Email Delivery Confirmation Alert Banner */}
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950 space-y-1">
                    <strong className="block font-bold text-sm text-emerald-900">
                      Digital Gift Certificate Successfully Emailed!
                    </strong>
                    <p>
                      {activeCertificate.deliveryOption === 'recipient' && (
                        <>An official digital certificate was dispatched directly to <strong>{activeCertificate.recipientEmail}</strong> with your personal dedication, with a confirmation copy sent to <strong>{activeCertificate.purchaserEmail}</strong>.</>
                      )}
                      {activeCertificate.deliveryOption === 'both' && (
                        <>Parallel official digital certificate packages have been emailed to both <strong>{activeCertificate.recipientEmail}</strong> and <strong>{activeCertificate.purchaserEmail}</strong>.</>
                      )}
                      {activeCertificate.deliveryOption === 'purchaser' && (
                        <>The official certificate package has been emailed to you at <strong>{activeCertificate.purchaserEmail}</strong> for personal presentation or printout.</>
                      )}
                    </p>
                    <div className="text-[11px] text-emerald-800 font-mono pt-1">
                      Dispatched at: {activeCertificate.emailDispatchedAt} · Voucher Code: {activeCertificate.voucherCode}
                    </div>
                  </div>
                </div>

                {/* THE HIGH-FIDELITY DIGITAL GIFT CERTIFICATE */}
                <div className="certificate-print-area p-5 sm:p-7 bg-[#FAF9F5] border-4 border-amber-600/70 rounded-3xl shadow-md text-stone-900 relative overflow-hidden">
                  
                  {/* Decorative Border & Seal */}
                  <div className="border-2 border-stone-300/80 p-5 sm:p-6 rounded-2xl space-y-5 bg-white/70 backdrop-blur-2xs">
                    
                    {/* Certificate Top Header */}
                    <div className="text-center space-y-1.5 pb-4 border-b border-stone-200">
                      <div className="flex justify-center mb-1">
                        <TrustLogo size="lg" variant="seal" />
                      </div>
                      <span className="text-[11px] uppercase tracking-widest text-emerald-900 font-bold block">
                        Official Philanthropic Digital Gift Certificate
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 tracking-tight">
                        {TRUST_NAME}
                      </h3>
                      <div className="text-xs font-serif italic text-stone-600">
                        {TRUST_MOTTO} · Est. {TRUST_ESTABLISHED} · Trust Deed Reg. No. TR-4821
                      </div>
                    </div>

                    {/* Recipient Presentation */}
                    <div className="text-center py-2 space-y-2">
                      <span className="text-xs font-serif italic text-stone-500 uppercase tracking-widest block">
                        This Philanthropic Gift Is Dedicated With Honor To
                      </span>
                      <h4 className={`text-2xl sm:text-4xl text-stone-900 inline-block px-6 py-1 border-b-2 border-amber-600 font-serif font-bold`}>
                        {activeCertificate.recipientName}
                      </h4>

                      {activeCertificate.occasion && (
                        <div className="text-xs font-semibold text-emerald-900 uppercase tracking-wider mt-1">
                          Occasion: {activeCertificate.occasion}
                        </div>
                      )}
                    </div>

                    {/* Stated Value and Dedicated Charitable Cause */}
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-center">
                      <div className="text-xs text-stone-600">
                        In solemn recognition of a benevolent contribution of
                      </div>
                      <div className={`text-2xl sm:text-3xl font-bold text-stone-900 ${activeCertificate.fontStyleClass}`}>
                        ${activeCertificate.amountUSD} USD <span className="text-base font-normal text-stone-600">(৳{activeCertificate.approxBDT.toLocaleString()} BDT)</span>
                      </div>
                      <div className="text-xs text-stone-700 max-w-lg mx-auto">
                        Generously dedicated by <strong>{activeCertificate.purchaserName}</strong> in direct support of:
                      </div>
                      
                      {/* Clearly Stated Charitable Cause Banner */}
                      <div className="p-3 bg-emerald-900 text-white rounded-xl shadow-xs text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
                        <Award className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>{activeCertificate.causePillar}: {activeCertificate.charitableCause}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 italic max-w-md mx-auto">
                        100% of this gift value has been allocated to our field teams under verified institutional supervision.
                      </p>
                    </div>

                    {/* Personal Dedication Message */}
                    {activeCertificate.personalMessage && (
                      <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80 text-center text-xs italic text-stone-800">
                        "{activeCertificate.personalMessage}"
                      </div>
                    )}

                    {/* Bottom Metadata & Scannable QR Verification */}
                    <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                      <div className="text-left space-y-1">
                        <div>
                          <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">Certificate Serial</span>
                          <strong className="font-mono text-emerald-950 text-xs">{activeCertificate.certificateNumber}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">Voucher Verification Code</span>
                          <strong className="font-mono text-stone-900 text-xs">{activeCertificate.voucherCode}</strong>
                        </div>
                        <div className="text-[10px] text-stone-500">
                          Date: {activeCertificate.datePurchased} · Method: {activeCertificate.paymentMethod}
                        </div>
                      </div>

                      {certificateQrUrl && (
                        <div className="text-center shrink-0">
                          <img src={certificateQrUrl} alt="Gift Verification QR" className="w-20 h-20 rounded-xl border border-stone-300 p-1 bg-white shadow-2xs mx-auto" />
                          <span className="text-[9px] font-mono text-emerald-900 block mt-1 font-bold uppercase">
                            Official QR Authentication
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Interactive Tool Actions */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* View Dispatched Email */}
                    <button
                      type="button"
                      onClick={() => setIsEmailPreviewOpen(true)}
                      className="py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <Mail className="w-4 h-4 text-amber-300" />
                      <span>View Dispatched Email</span>
                    </button>

                    {/* Print Certificate */}
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Certificate PDF</span>
                    </button>

                    {/* Copy Voucher */}
                    <button
                      type="button"
                      onClick={handleCopyVoucher}
                      className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 border border-stone-300 transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-stone-600" />
                          <span>Copy Voucher Details</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Resend / Forward Email Form */}
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                    <form onSubmit={handleResendEmail} className="flex flex-col sm:flex-row items-center gap-2">
                      <div className="flex-1 w-full text-left">
                        <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                          Need to send an additional copy to another email address?
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. colleague@organization.org"
                          value={resendEmailAddress}
                          onChange={(e) => setResendEmailAddress(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={resendStatus === 'sending'}
                        className="w-full sm:w-auto px-4 py-2 mt-auto bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-lg transition-colors shrink-0 disabled:opacity-60"
                      >
                        {resendStatus === 'sending' ? 'Sending...' : resendStatus === 'sent' ? 'Dispatched!' : 'Forward Email'}
                      </button>
                    </form>
                    {resendStatus === 'sent' && (
                      <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Additional gift certificate email successfully dispatched!</span>
                      </div>
                    )}
                  </div>

                  {/* Reset to Gift Another Card */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCertificate(null);
                        setRecipientName('');
                        setRecipientEmail('');
                      }}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
                    >
                      ← Dedicate & Purchase Another Gift Card
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* ======================================================= */
              /* STATE B: MULTI-STEP GIFT CARD PURCHASE FORM             */
              /* ======================================================= */
              <form onSubmit={handleCompletePurchase} className="p-5 sm:p-7 overflow-y-auto space-y-5">
                
                {/* 1. Tier Switcher (All 6 options with unique color & font badges) */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    1. Choose or Change Gift Card Tier (6 Distinct Options)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {giftCardTiers.map(t => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setSelectedTier(t)}
                        className={`p-2.5 rounded-2xl text-xs font-bold border-2 transition-all text-center flex flex-col items-center justify-between relative ${
                          selectedTier.id === t.id
                            ? `${t.accentBorder} bg-stone-900 text-white ring-2 ring-emerald-800/30 shadow-md`
                            : 'border-stone-200 text-stone-700 bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-base font-black">${t.amountUSD}</span>
                        <span className="text-[10px] opacity-80">৳{t.approxBDT}</span>
                        <span className={`text-[9px] mt-1 line-clamp-1 ${selectedTier.id === t.id ? 'text-amber-300' : 'text-stone-500'}`}>
                          {t.tierName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Charitable Cause Confirmation */}
                <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-stone-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs">
                    <Award className="w-4 h-4 text-emerald-800" />
                    <span>2. Designated Charitable Cause Supported by this ${selectedTier.amountUSD} Gift:</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-900 pl-5">
                    {selectedTier.causePillar}: {selectedTier.charitableCause}
                  </div>
                  <p className="text-[11px] text-stone-600 pl-5 leading-relaxed">
                    {selectedTier.impactDescription}
                  </p>
                </div>

                {/* 3. Recipient Information */}
                <div className="pt-2 border-t border-stone-200">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-2">
                    3. Recipient Information (Who should this gift certificate honor?)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Recipient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Farzana Yasmin"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Recipient Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. farzana@email.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Occasion / Dedication Type
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                    >
                      <option value="In Honor of Someone Special">In Honor of Someone Special</option>
                      <option value="In Loving Memory (Sadaqah Jariyah)">In Loving Memory (Sadaqah Jariyah)</option>
                      <option value="Birthday Blessing">Birthday Blessing</option>
                      <option value="Wedding / Anniversary Celebration">Wedding / Anniversary Celebration</option>
                      <option value="Eid Mubarak / Festive Gift">Eid Mubarak / Festive Gift</option>
                      <option value="General Humanitarian Solidarity">General Humanitarian Solidarity</option>
                    </select>
                  </div>
                </div>

                {/* 4. Purchaser Information */}
                <div className="pt-2 border-t border-stone-200">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-2">
                    4. Your Information (Supporter / Donor)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariqul Islam"
                        value={purchaserName}
                        onChange={(e) => setPurchaserName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Your Email (for receipt & certificate copy) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. tariqul@email.com"
                        value={purchaserEmail}
                        onChange={(e) => setPurchaserEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Delivery Preference (Email to Recipient vs Purchaser vs Both) */}
                <div className="pt-2 border-t border-stone-200">
                  <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                    5. Certificate Email Dispatch Destination
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryOption('recipient')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        deliveryOption === 'recipient'
                          ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-700'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold text-stone-900">Email Recipient</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Send directly to recipient, with CC to me</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryOption('both')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        deliveryOption === 'both'
                          ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-700'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold text-stone-900">Email Both</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Parallel delivery to recipient & purchaser</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryOption('purchaser')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        deliveryOption === 'purchaser'
                          ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-700'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold text-stone-900">Email Me Only</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">I will hand-deliver or print it out myself</div>
                    </button>
                  </div>
                </div>

                {/* 6. Personal Dedication Message */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    6. Personal Dedication Message (Printed on Certificate & Included in Email)
                  </label>
                  <textarea
                    rows={2}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="Write a warm note of blessing, celebration, or remembrance..."
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                  />
                </div>

                {/* 7. Payment Method & Summary */}
                <div className="pt-2 border-t border-stone-200 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      7. Select Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                          paymentMethod === 'card'
                            ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-800'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        Credit / Debit Card
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                          paymentMethod === 'bkash'
                            ? 'border-pink-600 bg-pink-50 text-pink-950 ring-1 ring-pink-600'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        bKash / Nagad MFS
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bank')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                          paymentMethod === 'bank'
                            ? 'border-stone-900 bg-stone-100 text-stone-950 ring-1 ring-stone-900'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        Bank Wire Transfer
                      </button>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-500 block">Total Dedicated Contribution:</span>
                      <strong className="text-xl font-serif text-emerald-950">
                        ${selectedTier.amountUSD} USD <span className="text-xs font-sans font-normal text-stone-500">(approx. ৳{selectedTier.approxBDT.toLocaleString()} BDT)</span>
                      </strong>
                    </div>
                    <div className="text-right text-xs text-stone-600 font-medium">
                      <span className="text-emerald-800 font-bold block">100% Direct Allocation</span>
                      <span className="text-[10px] text-stone-500">Zero Administrative Cut</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                        <span>{dispatchStage || 'Processing Gift Card & Dispatching Certificate...'}</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-300" />
                        <span>Complete Purchase of ${selectedTier.amountUSD} Gift Card & Dispatch Certificate</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-stone-500 flex items-center justify-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Official direct gateway. Tamper-proof certificate generated with Trust Deed TR-4821.</span>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIMULATED DISPATCHED EMAIL PREVIEW MODAL */}
      {/* ========================================================================= */}
      {isEmailPreviewOpen && activeCertificate && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Email Client Header */}
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-300" />
                <span className="font-bold">Dispatched Email Preview · Simulated Recipient Inbox</span>
              </div>
              <button
                onClick={() => setIsEmailPreviewOpen(false)}
                className="text-stone-300 hover:text-white text-lg p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Email Meta Headers */}
            <div className="p-4 bg-stone-50 border-b border-stone-200 text-xs text-stone-700 space-y-1 font-mono">
              <div><strong className="text-stone-900">From:</strong> Afzal Charitable Trust &lt;gifts@afzalcharitabletrust.org.bd&gt;</div>
              <div><strong className="text-stone-900">To:</strong> {activeCertificate.recipientEmail} {activeCertificate.deliveryOption !== 'purchaser' ? `(CC: ${activeCertificate.purchaserEmail})` : ''}</div>
              <div><strong className="text-stone-900">Subject:</strong> You have received a ${activeCertificate.amountUSD} USD Philanthropic Gift Certificate from {activeCertificate.purchaserName}!</div>
              <div><strong className="text-stone-900">Date:</strong> {activeCertificate.datePurchased} at {activeCertificate.emailDispatchedAt}</div>
            </div>

            {/* HTML Email Body Container */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
              <div className="text-center pb-4 border-b border-stone-200">
                <TrustLogo size="md" variant="horizontal" />
              </div>

              <div className="text-sm font-bold text-stone-900">
                Dear {activeCertificate.recipientName},
              </div>

              <p>
                We are delighted to inform you that <strong>{activeCertificate.purchaserName}</strong> has dedicated a 
                philanthropic gift card in your honor through <strong>{TRUST_NAME}</strong>.
              </p>

              {/* Gift Highlights Box */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 space-y-2">
                <div className="flex items-center justify-between font-bold text-emerald-950">
                  <span className="text-sm">Philanthropic Gift Value:</span>
                  <span className="text-base font-serif">${activeCertificate.amountUSD} USD (৳{activeCertificate.approxBDT.toLocaleString()} BDT)</span>
                </div>
                <div className="text-xs text-emerald-900">
                  <strong>Dedicated Charitable Cause:</strong> {activeCertificate.causePillar} · {activeCertificate.charitableCause}
                </div>
                <div className="text-[11px] text-emerald-800">
                  <strong>Voucher Code:</strong> <span className="font-mono">{activeCertificate.voucherCode}</span>
                </div>
              </div>

              {/* Dedication Quote */}
              {activeCertificate.personalMessage && (
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs italic text-stone-800">
                  <strong>Personal message from {activeCertificate.purchaserName}:</strong>
                  <p className="mt-1">"{activeCertificate.personalMessage}"</p>
                </div>
              )}

              <p className="text-xs text-stone-600">
                An official, high-resolution cryptographic Digital Gift Certificate with verifiable QR authentication has been generated and attached to this email dispatch. You may download, print, or share it anytime.
              </p>

              {/* Attachment Preview Box */}
              <div className="p-3 bg-stone-100 rounded-xl border border-stone-300 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span className="font-semibold text-stone-800">{activeCertificate.certificateNumber}.pdf</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsEmailPreviewOpen(false);
                    window.print();
                  }}
                  className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded text-[11px] font-bold"
                >
                  Download / Print
                </button>
              </div>

              <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-500 space-y-1">
                <div>Afzal Charitable Trust · Registered Non-Profit Charter, Bangladesh</div>
                <div>Headquarters: 48/A Kazi Nazrul Islam Avenue, Dhaka-1215, Bangladesh</div>
                <div>Web: https://afzalcharitabletrust.org.bd · Direct Gateway TR-4821</div>
              </div>
            </div>

            {/* Email Modal Footer */}
            <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEmailPreviewOpen(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold"
              >
                Close Email Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
