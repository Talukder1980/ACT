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
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GIFT_CARD_TIERS, TRUST_NAME, TRUST_MOTTO } from '../data/mockData';
import { GiftCardTier, PurchasedGiftCard } from '../types';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { TrustLogo } from './TrustLogo';

interface GiftCardsSectionProps {
  onOpenShare: (title: string, text: string) => void;
}

export const GiftCardsSection: React.FC<GiftCardsSectionProps> = ({ onOpenShare }) => {
  const [selectedTier, setSelectedTier] = useState<GiftCardTier>(GIFT_CARD_TIERS[2]); // Default $25
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaserName, setPurchaserName] = useState('');
  const [purchaserEmail, setPurchaserEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('With heartfelt blessings and solidarity for the people of Bangladesh.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Purchased Card & Certificate State
  const [activeCertificate, setActiveCertificate] = useState<PurchasedGiftCard | null>(null);
  const [certificateQrUrl, setCertificateQrUrl] = useState<string>('');

  const handleOpenPurchase = (tier: GiftCardTier) => {
    setSelectedTier(tier);
    setActiveCertificate(null);
    setIsPurchaseModalOpen(true);
  };

  const handleCompletePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purchaserName || !purchaserEmail || !recipientName || !recipientEmail) return;

    setIsSubmitting(true);
    const voucherCode = `ACT-GIFT-${selectedTier.amountUSD}-${Math.floor(10000 + Math.random() * 90000)}`;

    const qrUrl = await generateQrDataUrl(
      `https://afzalcharitabletrust.org.bd/gift-verify?voucher=${voucherCode}`,
      160
    );

    setTimeout(() => {
      const cardRecord: PurchasedGiftCard = {
        cardId: `card-${Date.now()}`,
        voucherCode,
        amountUSD: selectedTier.amountUSD,
        approxBDT: selectedTier.approxBDT,
        tierName: selectedTier.tierName,
        purchaserName: purchaserName.trim(),
        purchaserEmail: purchaserEmail.trim(),
        recipientName: recipientName.trim(),
        recipientEmail: recipientEmail.trim(),
        personalMessage: personalMessage.trim(),
        datePurchased: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        colorTheme: selectedTier.gradient
      };

      setCertificateQrUrl(qrUrl);
      setActiveCertificate(cardRecord);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 1100);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-stone-200" id="giftcards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dedicated Separate Space Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold mb-3 shadow-xs">
            <Gift className="w-4 h-4 text-rose-600" />
            <span>Dedicated Charitable Gifting Pavilion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Humanitarian Gift Cards: Meaningful Gifts That Transform Lives
          </h2>
          <div className="w-20 h-1 bg-amber-600 mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
            Choose from six purposeful gift cards ranging from $5 to $100. 
            Dedicate aid in honor of a loved one, friend, or colleague. 
            We automatically dispatch an official verified Gift Certificate with custom QR verification straight to their email.
          </p>

          {/* Official Website-Only Gifting Advisory Note */}
          <div className="mt-5 p-3.5 bg-white border border-emerald-700/40 rounded-2xl shadow-xs max-w-2xl mx-auto flex items-center justify-center gap-2.5 text-xs text-stone-800 text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
            <span>
              <strong className="text-emerald-950">Important Notice for Supporters:</strong> Supporters will send their gift <strong>through this official website only</strong> to ensure verified allocation, instant digital certificate issuance, and authentic email dispatch.
            </span>
          </div>
        </div>

        {/* Six Cards Grid in Six Different Colors & Clear Fonts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {GIFT_CARD_TIERS.map((tier) => {
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-2 ${tier.accentBorder} bg-gradient-to-br ${tier.gradient} text-white group`}
              >
                <div>
                  {/* Card Header Top */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/20">
                    <div className="flex items-center gap-2">
                      <TrustLogo size="xs" />
                      <span className="text-[11px] uppercase tracking-widest font-semibold text-white/90">
                        Afzal Charitable Trust
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-mono font-bold text-white">
                      ৳{tier.approxBDT.toLocaleString()} BDT
                    </span>
                  </div>

                  {/* Clear Distinctive Typography for Amount & Title */}
                  <div className="my-6">
                    <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-1 tabular-nums drop-shadow-xs">
                      ${tier.amountUSD} <span className="text-lg font-normal text-white/80">USD</span>
                    </div>

                    <h3 className={`text-xl sm:text-2xl text-white drop-shadow-xs ${tier.fontStyleClass} mt-2`}>
                      {tier.tierName}
                    </h3>
                  </div>

                  {/* Impact Description with High Legibility */}
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed bg-black/15 p-3.5 rounded-xl backdrop-blur-2xs border border-white/10 mb-6">
                    {tier.impactDescription}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-2">
                  <button
                    onClick={() => handleOpenPurchase(tier)}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95"
                  >
                    <Gift className="w-4 h-4 text-emerald-800" />
                    <span>Purchase ${tier.amountUSD} Gift Card</span>
                    <ArrowRight className="w-4 h-4 text-stone-500" />
                  </button>
                  <div className="text-center text-[10px] text-white/70 mt-2 font-medium">
                    Includes Email Dispatch & Digital Certificate
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition Callout Strip */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                Instant Digital Delivery & Certificate Verification
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                Both purchaser and recipient receive a high-resolution, printable PDF Gift Certificate with official Trust Seal.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleOpenPurchase(GIFT_CARD_TIERS[5])}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shrink-0 transition-colors"
          >
            Gift $100 Card
          </button>
        </div>

      </div>

      {/* Gift Card Purchase & Certificate Modal */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className={`p-5 bg-gradient-to-r ${selectedTier.gradient} text-white flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight">
                    Gift ${selectedTier.amountUSD} · {selectedTier.tierName}
                  </h3>
                  <p className="text-xs text-white/80">Approx. ৳{selectedTier.approxBDT.toLocaleString()} BDT</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsPurchaseModalOpen(false);
                  setActiveCertificate(null);
                }}
                className="text-white/80 hover:text-white text-2xl p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* If Certificate Generated */}
            {activeCertificate ? (
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Email Confirmation Notice */}
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950">
                    <strong className="block font-bold text-sm text-emerald-900">
                      Gift Certificate Dispatched to {activeCertificate.recipientEmail}!
                    </strong>
                    A personalized certificate has been emailed to the recipient with your custom blessing. 
                    A copy was also sent to your email ({activeCertificate.purchaserEmail}).
                  </div>
                </div>

                {/* Printable Digital Gift Certificate */}
                <div className="certificate-print-area p-6 sm:p-8 bg-[#FAF9F5] border-4 border-amber-600/80 rounded-2xl shadow-md text-stone-900 relative overflow-hidden">
                  
                  {/* Decorative Border */}
                  <div className="border border-stone-300 p-5 rounded-xl space-y-4">
                    <div className="text-center space-y-1">
                      <div className="flex justify-center mb-1">
                        <TrustLogo size="lg" variant="seal" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-emerald-900 font-bold block">
                        Official Philanthropic Gift Certificate
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
                        {TRUST_NAME}
                      </h3>
                      <div className="text-xs font-serif italic text-stone-600">
                        {TRUST_MOTTO}
                      </div>
                    </div>

                    <div className="text-center py-2">
                      <p className="text-xs font-serif italic text-stone-500">Presented with honor to</p>
                      <h4 className="text-xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 border-b border-stone-300 pb-1 inline-block px-6">
                        {activeCertificate.recipientName}
                      </h4>
                      <p className="text-xs text-stone-700 font-sans mt-3 max-w-md mx-auto">
                        In recognition of a benevolent gift of <strong>${activeCertificate.amountUSD} USD (৳{activeCertificate.approxBDT.toLocaleString()} BDT)</strong> 
                        dedicated by <strong>{activeCertificate.purchaserName}</strong> toward the 
                        <em> {activeCertificate.tierName}</em> initiative in Bangladesh.
                      </p>
                    </div>

                    {/* Dedication Message */}
                    {activeCertificate.personalMessage && (
                      <div className="bg-white/80 p-3 rounded-xl border border-stone-200 text-center text-xs italic text-stone-700">
                        "{activeCertificate.personalMessage}"
                      </div>
                    )}

                    {/* Metadata & Scannable QR */}
                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-stone-500 block uppercase">Voucher Code</span>
                        <strong className="font-mono text-emerald-950">{activeCertificate.voucherCode}</strong>
                        <div className="text-[10px] text-stone-500 mt-0.5">Date: {activeCertificate.datePurchased}</div>
                      </div>

                      {certificateQrUrl && (
                        <div className="text-center">
                          <img src={certificateQrUrl} alt="Gift Verification QR" className="w-16 h-16 rounded border border-stone-300" />
                          <span className="text-[8px] font-mono text-emerald-900 block mt-0.5 font-bold uppercase">
                            Scan to Verify
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Gift Certificate</span>
                  </button>

                  <button
                    onClick={() => onOpenShare(
                      'Afzal Charitable Trust Gift Card',
                      `I just dedicated a $${activeCertificate.amountUSD} Gift Card to ${activeCertificate.recipientName} through Afzal Charitable Trust! Join us in empowering Bangladesh.`
                    )}
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Purchase Form */
              <form onSubmit={handleCompletePurchase} className="p-6 sm:p-8 overflow-y-auto space-y-4">
                
                {/* Select from the 6 cards */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Choose Gift Card Tier (6 Available)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {GIFT_CARD_TIERS.map(t => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setSelectedTier(t)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold border-2 transition-all text-center flex flex-col items-center justify-center ${
                          selectedTier.id === t.id
                            ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-800/20'
                            : 'border-stone-200 text-stone-600 bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-sm">${t.amountUSD}</span>
                        <span className="text-[10px] text-stone-500 font-normal">৳{t.approxBDT}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-2">
                    1. Recipient Information (Who receives the Gift Certificate?)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                </div>

                {/* Purchaser Details */}
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-2">
                    2. Your Information (Supporter)
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
                        Your Email (for receipt) *
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

                {/* Personal Blessing / Dedication Message */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Personal Dedication Message (Printed on Certificate)
                  </label>
                  <textarea
                    rows={2}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="Write a warm note of blessing, celebration, or remembrance..."
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                  />
                </div>

                {/* Payment Breakdown & Confirm */}
                <div className="pt-3 border-t border-stone-100">
                  <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-stone-500 block">Total Due:</span>
                      <strong className="text-lg font-serif text-emerald-950">
                        ${selectedTier.amountUSD} USD <span className="text-xs font-sans font-normal text-stone-500">(approx. ৳{selectedTier.approxBDT.toLocaleString()} BDT)</span>
                      </strong>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-stone-600 font-medium">
                      <CreditCard className="w-4 h-4 text-emerald-700" />
                      <span>Instant Voucher Dispatch</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>
                      <strong>Official Direct Gateway:</strong> Supporters will send their gift through this website only. No outside transaction handles are permitted.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Issuing Gift Certificate & Notifying Recipient...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-300" />
                        <span>Purchase ${selectedTier.amountUSD} Gift Card & Dispatch Certificate</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
