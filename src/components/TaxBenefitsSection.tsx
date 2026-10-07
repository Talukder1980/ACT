import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Receipt, 
  Calculator, 
  Award, 
  FileCheck, 
  ExternalLink, 
  CheckCircle2, 
  Printer, 
  Share2, 
  HelpCircle, 
  ArrowRight,
  TrendingUp,
  Download,
  Percent,
  Building2,
  Lock
} from 'lucide-react';
import { TRUST_NAME } from '../data/mockData';
import { TrustLogo } from './TrustLogo';

interface TaxBenefitsSectionProps {
  onOpenDonate?: (amount?: number) => void;
  onOpenShare?: (title: string, text: string) => void;
}

export const TaxBenefitsSection: React.FC<TaxBenefitsSectionProps> = ({
  onOpenDonate,
  onOpenShare
}) => {
  // Calculator State
  const [calcDonationAmount, setCalcDonationAmount] = useState<number>(25000);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Calculations in BDT
  // Standard Individual Tax Rebate under Bangladesh Income Tax Act 2023 is generally 15% on allowable donation
  const rebateRate = 0.15;
  const estimatedTaxRebate = Math.round(calcDonationAmount * rebateRate);
  const netEffectiveCost = Math.max(0, calcDonationAmount - estimatedTaxRebate);

  const presets = [5000, 15000, 25000, 50000, 100000, 250000];

  const handlePresetClick = (amount: number) => {
    setCalcDonationAmount(amount);
  };

  const handleProceedDonation = () => {
    if (onOpenDonate) {
      onOpenDonate(calcDonationAmount);
    } else {
      const el = document.querySelector('#donations');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'Are donations to Afzal Charitable Trust legally tax-deductible in Bangladesh?',
      a: 'Yes. Afzal Charitable Trust is an officially registered non-profit philanthropic institution (Reg. Deed TR-4821). Donations qualify for tax rebate under the provisions of the Income Tax Act, 2023 (Sixth Schedule, Part 3, and statutory NBR notifications), allowing individual taxpayers up to a 15% rebate on eligible donations against payable income tax.'
    },
    {
      q: 'How do I obtain my official NBR-compliant tax deduction receipt?',
      a: 'Immediately upon completing your contribution through this official website, the system automatically generates an authenticated, serialized Money Receipt & Tax Certificate with a cryptographic QR code. A copy is also instantly delivered to your email.'
    },
    {
      q: 'Can corporate entities claim CSR deductions for grants made to the Trust?',
      a: 'Yes. Corporate donations allocated to our designated health camps, orphan education initiatives, clean water plants, and flood relief are recognized under standard Corporate Social Responsibility (CSR) expenditure guidelines and qualify for eligible corporate tax benefits.'
    },
    {
      q: 'How do I claim this rebate when filing my annual tax return on e-TIN (etaxnbr.gov.bd)?',
      a: 'When preparing your annual return on the NBR portal (etaxnbr.gov.bd) or paper form, enter your donation amount in the Investment & Tax Rebate Schedule (Schedule 5), and attach or upload your Trust Tax Certificate PDF containing our verified registration number.'
    }
  ];

  return (
    <section 
      id="tax-benefits" 
      className="py-16 sm:py-20 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-b border-stone-200 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-950 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>NBR Statutory Recognition · Income Tax Act 2023 · SRO No. 192</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Tax Benefits for Donors in Bangladesh
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Support life-changing humanitarian programs across Bangladesh while maximizing your fiscal efficiency. 
            Contributions to <strong>{TRUST_NAME}</strong> are eligible for legitimate income tax rebates for individual and corporate taxpayers.
          </p>
        </div>

        {/* 3 Core Tax Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          {/* Card 1: 15% Tax Rebate */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:border-emerald-600/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-900 mb-5 group-hover:scale-105 transition-transform">
                <Percent className="w-6 h-6 text-emerald-800" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 block mb-1">
                Individual Taxpayers
              </span>
              <h3 className="font-serif font-bold text-xl text-stone-900 leading-snug mb-2">
                Up to 15% Tax Rebate
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Under the Sixth Schedule (Part 3) of the Income Tax Act 2023, individual donors in Bangladesh are entitled to claim up to a 15% tax rebate on eligible donations against their total income tax liability.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs text-emerald-900 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Direct deduction from final payable tax</span>
            </div>
          </div>

          {/* Card 2: CSR & Corporate Philanthropy */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:border-amber-500/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-950 mb-5 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6 text-amber-800" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 block mb-1">
                Corporate & Business Grants
              </span>
              <h3 className="font-serif font-bold text-xl text-stone-900 leading-snug mb-2">
                Eligible CSR Expenditure
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Corporate donations directed to our medical relief camps, digital education hubs, orphan shelter, and flood rescue qualify as sanctioned Corporate Social Responsibility (CSR) disbursements.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs text-amber-950 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Full institutional audited utilization proof</span>
            </div>
          </div>

          {/* Card 3: Instant Verified QR Receipt */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:border-blue-500/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100/70 border border-blue-200 flex items-center justify-center text-blue-900 mb-5 group-hover:scale-105 transition-transform">
                <Receipt className="w-6 h-6 text-blue-800" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-800 block mb-1">
                NBR-Compliant Documentation
              </span>
              <h3 className="font-serif font-bold text-xl text-stone-900 leading-snug mb-2">
                QR-Verified E-Certificates
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every contribution generated through this platform immediately issues a serialized Money Receipt and Tax Exemption Certificate with verified QR validation suitable for e-TIN upload on <em>etaxnbr.gov.bd</em>.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs text-blue-950 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Government Trust Reg. No. TR-4821</span>
            </div>
          </div>

        </div>

        {/* Interactive Tax Rebate Calculator & Impact Leverage */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400 shadow-xl mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 6 cols: Calculator Inputs */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-amber-400 text-stone-950">
                  <Calculator className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
                  Interactive Tax Rebate Estimator
                </span>
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white leading-tight">
                Calculate How Much You Save on Your Annual Tax
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Estimate the approximate tax savings on your charitable contribution in Bangladesh. The tax rebate directly lowers your net income tax bill.
              </p>

              {/* Slider Input */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-200">
                    Planned Donation Amount (BDT):
                  </label>
                  <span className="font-serif font-bold text-2xl text-amber-300 tabular-nums">
                    ৳{calcDonationAmount.toLocaleString()}
                  </span>
                </div>

                <input
                  type="range"
                  min={2000}
                  max={300000}
                  step={1000}
                  value={calcDonationAmount}
                  onChange={(e) => setCalcDonationAmount(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-emerald-800/80 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                <div className="flex justify-between text-[10px] text-emerald-300/80 font-mono">
                  <span>৳2,000</span>
                  <span>৳100,000</span>
                  <span>৳200,000</span>
                  <span>৳300,000</span>
                </div>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-stone-300">Quick Amounts:</span>
                {presets.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePresetClick(amt)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      calcDonationAmount === amt
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'bg-emerald-800/80 hover:bg-emerald-800 text-white border border-emerald-700/80'
                    }`}
                  >
                    ৳{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Right 6 cols: Calculated Breakdown Results */}
            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/20 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                Estimated Fiscal Breakdown
              </span>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
                <div className="p-3.5 bg-black/20 rounded-xl border border-white/10">
                  <span className="text-[11px] text-stone-300 block mb-0.5">
                    Estimated Tax Rebate (15%):
                  </span>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-400 tabular-nums">
                    -৳{estimatedTaxRebate.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-200 block mt-0.5">
                    Saved from payable tax
                  </span>
                </div>

                <div className="p-3.5 bg-black/20 rounded-xl border border-white/10">
                  <span className="text-[11px] text-stone-300 block mb-0.5">
                    Net Effective Cost to You:
                  </span>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300 tabular-nums">
                    ৳{netEffectiveCost.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-amber-200/90 block mt-0.5">
                    Actual out-of-pocket
                  </span>
                </div>
              </div>

              {/* Humanitarian Benefit Highlight */}
              <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-700/60 flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-200 leading-snug">
                  <strong>Full Humanitarian Deployment:</strong> While your net cost after rebate is only 
                  <strong className="text-amber-300"> ৳{netEffectiveCost.toLocaleString()}</strong>, the entire 
                  <strong className="text-white"> ৳{calcDonationAmount.toLocaleString()}</strong> goes directly to feed families, cure blindness, or educate orphan children.
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleProceedDonation}
                  className="w-full sm:flex-1 py-3 px-5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <span>Donate ৳{calcDonationAmount.toLocaleString()} & Get Tax Certificate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowCertificateModal(true)}
                  className="w-full sm:w-auto py-3 px-4 bg-white/15 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all border border-white/30 flex items-center justify-center gap-1.5"
                >
                  <FileCheck className="w-4 h-4 text-amber-300" />
                  <span>Preview Certificate</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 3 Steps: How to Claim Your Tax Rebate */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-1">
              Step-by-Step Filing Process
            </span>
            <h3 className="font-serif font-bold text-2xl text-stone-900">
              How to Claim Your Tax Rebate in 3 Simple Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-3 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-mono font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900">
                Donate on This Official Portal
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Send your contribution via bKash, Nagad, Visa, Mastercard, or Bank Transfer. Our system generates your serialized digital tax receipt with official Trust Seal immediately.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-3 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-mono font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900">
                Download QR-Encoded Tax Certificate
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Save the digital certificate (PDF) delivered to your screen and email. The certificate includes Trust Deed Registration No. TR-4821 and a tamper-proof QR validation link.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-3 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-mono font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900">
                Submit with Annual Return on e-TIN
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                When filing your annual return on <em>etaxnbr.gov.bd</em>, enter your contribution under Schedule 5 (Tax Rebate for Donations) and attach your certificate to claim your allowable rebate.
              </p>
            </div>

          </div>
        </div>

        {/* Accordion FAQ for Donors */}
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-stone-500 block">
              Legal & Fiscal Clarity
            </span>
            <h4 className="font-serif font-bold text-xl text-stone-900">
              Frequently Asked Tax Questions
            </h4>
          </div>

          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-stone-900 hover:text-emerald-900"
              >
                <span className="font-serif font-bold text-sm sm:text-base">
                  {faq.q}
                </span>
                <span className="text-base text-stone-400 shrink-0 font-bold">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>

              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-10 p-4 bg-stone-100/80 rounded-2xl border border-stone-200 text-center max-w-2xl mx-auto text-[11px] text-stone-500 leading-normal">
          <p>
            <strong>Statutory Disclaimer:</strong> Tax rebate rates and maximum allowable investment ceilings are governed by the Income Tax Act, 2023, and circulars of the National Board of Revenue (NBR), Government of the People’s Republic of Bangladesh. Donors are advised to consult their professional tax advisor for specific threshold calculations.
          </p>
        </div>

      </div>

      {/* Official Sample Tax Exemption Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Bar */}
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrustLogo size="xs" variant="seal" />
                <span className="font-serif font-bold text-sm text-white">
                  Sample Official Tax Exemption Certificate & Receipt
                </span>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-white/80 hover:text-white text-xl p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Certificate Preview Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div className="certificate-print-area bg-[#FAF9F5] p-6 sm:p-8 rounded-2xl border-4 border-emerald-900 text-center space-y-4 shadow-sm relative">
                {/* Watermark Logo */}
                <div className="flex justify-center mb-1">
                  <TrustLogo size="md" variant="seal" />
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-950 block">
                    People’s Humanitarian Movement of Bangladesh
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
                    {TRUST_NAME}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                    Govt. Trust Deed Registration No. TR-4821 (Dhaka) · NBR SRO No. 192
                  </p>
                </div>

                <div className="w-16 h-0.5 bg-amber-500 mx-auto" />

                <div className="py-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                    Official Tax Deduction Receipt & Certificate
                  </span>
                  <div className="mt-3 text-xs text-stone-700 leading-relaxed max-w-md mx-auto">
                    This certifies that a voluntary philanthropic contribution of <strong>৳{calcDonationAmount.toLocaleString()}</strong> has been officially credited to the humanitarian funds of <em>{TRUST_NAME}</em>. This receipt qualifies for tax rebate under the Sixth Schedule of the Income Tax Act, 2023.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left text-[11px] bg-white p-3 rounded-xl border border-stone-200 max-w-md mx-auto">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Receipt Serial:</span>
                    <strong className="font-mono text-stone-900">ACT-TAX-2026-7841</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Date of Contribution:</span>
                    <strong className="text-stone-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Tax Rebate Claimable (15%):</span>
                    <strong className="font-mono text-emerald-800">৳{estimatedTaxRebate.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Verification Status:</span>
                    <strong className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified & Cryptographic</span>
                    </strong>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-stone-400 font-mono">
                  Issued under seal of the Board of Trustees · Authorized for NBR Submission
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Sample Certificate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
                >
                  Close Preview
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
