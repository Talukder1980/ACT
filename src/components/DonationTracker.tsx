import React, { useState } from 'react';
import { 
  Heart, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Share2, 
  CreditCard, 
  Printer, 
  Sparkles,
  QrCode,
  DollarSign,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_CAMPAIGNS, INITIAL_RECENT_DONORS } from '../data/mockData';
import { Campaign, DonorContribution } from '../types';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { TrustLogo } from './TrustLogo';

interface DonationTrackerProps {
  onOpenShare: (title: string, text: string) => void;
  onOpenQr: () => void;
  targetCausePreselect?: string;
}

export const DonationTracker: React.FC<DonationTrackerProps> = ({ 
  onOpenShare, 
  onOpenQr,
  targetCausePreselect
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [recentDonors, setRecentDonors] = useState<DonorContribution[]>(INITIAL_RECENT_DONORS);
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT'); // 1 USD ~ 120 BDT
  const BDT_TO_USD = 120;

  // Donation Modal State
  const [activeCampaignForDonation, setActiveCampaignForDonation] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [payMethod, setPayMethod] = useState<string>('bKash');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<{
    receiptNo: string;
    date: string;
    amountBDT: number;
    campaign: string;
    donor: string;
    qrUrl: string;
  } | null>(null);

  const formatAmount = (bdt: number) => {
    if (currency === 'USD') {
      return `$${Math.round(bdt / BDT_TO_USD).toLocaleString()}`;
    }
    return `৳${bdt.toLocaleString()}`;
  };

  const handleDonateClick = (campaign: Campaign) => {
    setActiveCampaignForDonation(campaign);
    setReceiptData(null);
  };

  const handleProcessDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCampaignForDonation) return;

    const finalAmount = customAmount ? parseInt(customAmount, 10) : donationAmount;
    if (!finalAmount || finalAmount <= 0) return;

    setIsSubmitting(true);

    const receiptNo = `ACT-DON-${Date.now().toString().slice(-6)}`;
    const donorDisplay = isAnonymous ? 'Anonymous Supporter' : (donorName.trim() || 'Generous Supporter');
    const qrUrl = await generateQrDataUrl(`https://afzalcharitabletrust.org.bd/receipt/${receiptNo}`, 160);

    setTimeout(() => {
      // Update Campaign raised amount
      setCampaigns(prev => prev.map(c => {
        if (c.id === activeCampaignForDonation.id) {
          return {
            ...c,
            raisedBDT: c.raisedBDT + finalAmount,
            donorsCount: c.donorsCount + 1
          };
        }
        return c;
      }));

      // Add to recent donors
      setRecentDonors(prev => [
        {
          id: `don-${Date.now()}`,
          name: donorDisplay,
          amountBDT: finalAmount,
          campaignTitle: activeCampaignForDonation.title,
          timeAgo: 'Just now',
          isAnonymous
        },
        ...prev.slice(0, 5)
      ]);

      setReceiptData({
        receiptNo,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        amountBDT: finalAmount,
        campaign: activeCampaignForDonation.title,
        donor: donorDisplay,
        qrUrl
      });

      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 1000);
  };

  const totalRaisedOverall = campaigns.reduce((acc, curr) => acc + curr.raisedBDT, 0);
  const totalTargetOverall = campaigns.reduce((acc, curr) => acc + curr.targetBDT, 0);
  const totalDonorsOverall = campaigns.reduce((acc, curr) => acc + curr.donorsCount, 0);

  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200" id="donations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
              Radical Philanthropic Transparency
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Donation Progress Tracker & Live Impact Drives
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Track real-time contributions, fund utilization, and urgent humanitarian targets across Bangladesh.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-stone-200/80 p-1 rounded-xl">
            <span className="text-xs font-semibold text-stone-600 pl-2">Display in:</span>
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'BDT' ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ৳ BDT
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'USD' ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Global Tracker Metric Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-b border-stone-100 pb-6 mb-6">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Total Mobilized Across All Drives
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1 tabular-nums">
                {formatAmount(totalRaisedOverall)}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Total Community Target
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 mt-1 tabular-nums">
                {formatAmount(totalTargetOverall)}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Verified Global Donors
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-700 mt-1 tabular-nums">
                {totalDonorsOverall.toLocaleString()} Supporters
              </div>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
              <span>Overall Campaign Fulfillment</span>
              <span className="font-mono text-emerald-900 font-bold tabular-nums">
                {Math.round((totalRaisedOverall / totalTargetOverall) * 100)}% Funded
              </span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
              <div 
                className="h-full bg-emerald-800 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(100, Math.round((totalRaisedOverall / totalTargetOverall) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {campaigns.map((camp) => {
            const percent = Math.min(100, Math.round((camp.raisedBDT / camp.targetBDT) * 100));
            return (
              <div 
                key={camp.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-700/60 transition-all"
              >
                <div>
                  {/* Campaign Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                    <img 
                      src={camp.image} 
                      alt={camp.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-stone-800 border border-stone-200">
                      {camp.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-900/90 text-white px-2.5 py-1 rounded text-[11px] font-mono font-bold">
                      {camp.urgency}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 leading-snug mb-2">
                      {camp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                      {camp.description}
                    </p>

                    <div className="text-xs text-stone-500 mb-3 flex items-center justify-between">
                      <span>Beneficiary Reach: <strong>{camp.beneficiaries}</strong></span>
                      <span className="font-mono tabular-nums">{camp.donorsCount} Donors</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-serif font-bold text-emerald-950 text-sm tabular-nums">
                          {formatAmount(camp.raisedBDT)}
                        </span>
                        <span className="text-stone-500 text-[11px] tabular-nums">
                          Target: {formatAmount(camp.targetBDT)}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                        <div 
                          className="h-full bg-emerald-800 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="text-right text-[11px] font-mono font-semibold text-emerald-900">
                        {percent}% Achieved
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleDonateClick(camp)}
                    className="flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
                    <span>Contribute Now</span>
                  </button>

                  <button
                    onClick={() => onOpenShare(
                      camp.title,
                      `Join me in supporting "${camp.title}" organized by Afzal Charitable Trust. Every contribution brings immediate relief in Bangladesh!`
                    )}
                    className="py-2.5 px-3 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-xl text-xs font-semibold"
                    title="Share this campaign"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Recent Donors Ticker */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <h4 className="font-serif font-bold text-base text-stone-900">
                Recent Trust Contributors
              </h4>
            </div>
            <span className="text-xs text-stone-500">Live verified ledger</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentDonors.map((donor) => (
              <div 
                key={donor.id}
                className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="text-stone-900 block truncate max-w-[170px]">{donor.name}</strong>
                  <span className="text-[11px] text-stone-500 block truncate max-w-[170px]">
                    {donor.campaignTitle}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif font-bold text-emerald-900 block tabular-nums">
                    {formatAmount(donor.amountBDT)}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">{donor.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Donation Modal & Immediate Receipt */}
      {activeCampaignForDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-5 bg-emerald-900 text-white flex items-start justify-between">
              <div>
                <span className="text-[11px] text-emerald-200 uppercase tracking-widest font-semibold block">
                  Support Charitable Cause
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-snug">
                  {activeCampaignForDonation.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveCampaignForDonation(null);
                  setReceiptData(null);
                }}
                className="text-white/80 hover:text-white text-xl p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* If Receipt is generated, display receipt */}
            {receiptData ? (
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-stone-900">
                    Thank You for Your Generosity!
                  </h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Your contribution has been successfully recorded in the Trust ledger.
                  </p>
                </div>

                {/* Printable Receipt Frame */}
                <div className="certificate-print-area p-5 bg-[#FAF9F5] border-2 border-stone-300 rounded-xl relative text-xs text-stone-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-300 pb-2">
                    <div className="flex items-center gap-2">
                      <TrustLogo size="sm" />
                      <div>
                        <strong className="font-serif text-sm text-emerald-950 block">AFZAL CHARITABLE TRUST</strong>
                        <span className="text-[10px] text-stone-500">Official Donation Acknowledgment</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-stone-600">{receiptData.receiptNo}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-stone-500 block">Donor Name:</span>
                      <strong>{receiptData.donor}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Date:</span>
                      <span>{receiptData.date}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Amount Contributed:</span>
                      <strong className="text-sm font-serif text-emerald-950">৳{receiptData.amountBDT.toLocaleString()} BDT</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Status:</span>
                      <span className="text-emerald-800 font-bold">Verified & Tax Exempt</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-500 max-w-[200px]">
                        Allocated to: {receiptData.campaign}
                      </p>
                    </div>
                    {receiptData.qrUrl && (
                      <img src={receiptData.qrUrl} alt="Receipt QR" className="w-14 h-14 rounded" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveCampaignForDonation(null);
                      setReceiptData(null);
                    }}
                    className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Donation Form */
              <form onSubmit={handleProcessDonation} className="p-6 overflow-y-auto space-y-4">
                {/* Preset Amounts */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Select Contribution Amount (BDT)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[500, 1000, 2500, 5000, 10000].map(amt => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setDonationAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          donationAmount === amt && !customAmount
                            ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        ৳{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <div className="mt-2.5">
                    <input
                      type="number"
                      placeholder="Or enter custom amount in ৳ BDT..."
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                {/* Donor Details */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      disabled={isAnonymous}
                      placeholder="e.g. Sultana Razia"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 disabled:opacity-50"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anon"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4"
                    />
                    <label htmlFor="anon" className="text-xs text-stone-600 cursor-pointer">
                      Make my donation anonymous on the public leaderboard
                    </label>
                  </div>
                </div>

                {/* Payment Channel */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Payment Gateway
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['bKash', 'Nagad', 'Card'].map(m => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => setPayMethod(m)}
                        className={`py-2 px-1 text-xs font-bold rounded-xl border text-center ${
                          payMethod === m 
                            ? 'bg-emerald-50 border-emerald-700 text-emerald-950 ring-1 ring-emerald-700'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>
                      <strong>Official Direct Gateway:</strong> Supporters will send their gift and donations through this website only. Tax-exemption receipts are issued immediately.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Processing Contribution...</span>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                        <span>Confirm ৳{(customAmount ? parseInt(customAmount, 10) || 0 : donationAmount).toLocaleString()} Donation</span>
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
