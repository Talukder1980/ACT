import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Download, 
  Share2, 
  Search, 
  Sparkles,
  CreditCard,
  QrCode,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { MemberRecord } from '../types';
import { MEMBERSHIP_FEE_BDT, TRUST_NAME, TRUST_MOTTO, TRUST_LOGO_SRC, bangladeshDistricts } from '../data/mockData';
import { TrustLogo } from './TrustLogo';

interface MembershipSectionProps {
  onOpenShare: (title: string, text: string) => void;
  onOpenQr: () => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onOpenShare, onOpenQr }) => {
  const [activeTab, setActiveTab] = useState<'register' | 'certificate' | 'verify'>('register');
  
  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    district: 'Dhaka',
    occupation: '',
    bloodGroup: 'B+',
    paymentMethod: 'bKash'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentMember, setCurrentMember] = useState<MemberRecord | null>(null);
  const [certificateQrUrl, setCertificateQrUrl] = useState<string>('');
  
  // Verify Search State
  const [verifyQuery, setVerifyQuery] = useState('');
  const [verifyResult, setVerifyResult] = useState<MemberRecord | null | 'not_found'>(null);

  // Pre-seeded verified member list for lookup testing
  const [membersRegistry, setMembersRegistry] = useState<MemberRecord[]>([
    {
      memberId: 'ACT-MEM-2026-0101',
      fullName: 'Tahmina Begum',
      email: 'tahmina.begum@example.com',
      phone: '+880 1711 234567',
      district: 'Habiganj, Sylhet',
      occupation: 'School Educator',
      bloodGroup: 'A+',
      registrationDate: 'January 14, 2026',
      validUntil: 'Lifetime Member',
      membershipFeeBDT: 250,
      certificateSerial: 'CERT-BD-ACT-89211',
      paymentMethod: 'bKash',
      status: 'Verified'
    },
    {
      memberId: 'ACT-MEM-2026-0245',
      fullName: 'Kamrul Hasan',
      email: 'kamrul.hasan@example.com',
      phone: '+880 1819 987654',
      district: 'Dhaka',
      occupation: 'Software Engineer',
      bloodGroup: 'O+',
      registrationDate: 'February 03, 2026',
      validUntil: 'Lifetime Member',
      membershipFeeBDT: 250,
      certificateSerial: 'CERT-BD-ACT-91042',
      paymentMethod: 'Nagad',
      status: 'Verified'
    }
  ]);

  const certificateRef = useRef<HTMLDivElement>(null);

  // Load QR whenever current member changes
  useEffect(() => {
    if (currentMember) {
      const verifyPayload = `https://afzalcharitabletrust.org.bd/verify?id=${currentMember.memberId}&cert=${currentMember.certificateSerial}`;
      generateQrDataUrl(verifyPayload, 180).then(url => setCertificateQrUrl(url));
    }
  }, [currentMember]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;

    setIsProcessing(true);

    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newMember: MemberRecord = {
        memberId: `ACT-MEM-2026-${randomSuffix}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        district: formData.district,
        occupation: formData.occupation.trim() || 'Philanthropic Member',
        bloodGroup: formData.bloodGroup,
        registrationDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        validUntil: 'Lifetime Member',
        membershipFeeBDT: MEMBERSHIP_FEE_BDT,
        certificateSerial: `CERT-BD-ACT-${Math.floor(100000 + Math.random() * 900000)}`,
        paymentMethod: formData.paymentMethod,
        status: 'Verified'
      };

      setMembersRegistry(prev => [newMember, ...prev]);
      setCurrentMember(newMember);
      setIsProcessing(false);
      setActiveTab('certificate');

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if not loaded
      }
    }, 1200);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleVerifySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = verifyQuery.trim().toLowerCase();
    if (!q) return;

    const found = membersRegistry.find(m => 
      m.memberId.toLowerCase() === q || 
      m.certificateSerial.toLowerCase() === q ||
      m.fullName.toLowerCase().includes(q)
    );

    if (found) {
      setVerifyResult(found);
    } else {
      setVerifyResult('not_found');
    }
  };

  const bangladeshDistricts = [
    'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
    'Comilla', 'Gazipur', 'Narayanganj', 'Habiganj', 'Kurigram', 'Bogra', 'Jessore', 'Cox\'s Bazar'
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200" id="membership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5 text-amber-800" />
            <span>Official Trust Membership · 250 Taka Subscription</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Become a Registered Member of Afzal Charitable Trust
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            For an annual contribution of only ৳250, receive your official verified Lifetime Member ID, 
            digitally signed Trust Certificate with QR authentication, and AGM participation rights.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="no-print max-w-md mx-auto mb-8 bg-stone-200/80 p-1.5 rounded-xl flex items-center gap-1">
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              activeTab === 'register'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            1. Subscription & Join (৳250)
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            disabled={!currentMember}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              activeTab === 'certificate'
                ? 'bg-white text-stone-900 shadow-sm'
                : currentMember
                ? 'text-stone-600 hover:text-stone-900'
                : 'text-stone-400 opacity-60 cursor-not-allowed'
            }`}
          >
            2. Member Certificate
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              activeTab === 'verify'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            3. Verify Member
          </button>
        </div>

        {/* Tab 1: Registration Form */}
        {activeTab === 'register' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Benefits & Information (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
                  Trust Membership Entitlements
                </span>
                <h3 className="font-serif font-bold text-xl text-stone-900 mt-1">
                  Why Subscribe to Afzal Charitable Trust?
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Personalized Member Certificate</span>
                    Includes trust embossed seal, verified Member ID, and scannable QR verification code.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Democratized 250 Taka Entry</span>
                    Affordable for students, teachers, grassroots volunteers, and diaspora supporters alike.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">AGM Voting & Advisory Voice</span>
                    Direct invitation to the Annual General Meeting to review financial audits and field initiatives.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Volunteer Field Corps Access</span>
                    Priority mobilization for disaster relief, free medical camps, and tree planting drives.
                  </div>
                </div>
              </div>

              {/* Fee Breakdown Box */}
              <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                    Annual Subscription:
                  </span>
                  <span className="text-2xl font-serif font-black text-amber-950">
                    ৳{MEMBERSHIP_FEE_BDT} <span className="text-xs font-sans font-normal text-stone-600">BDT</span>
                  </span>
                </div>
                <p className="text-[11px] text-amber-900/80 mt-1">
                  100% of proceeds fund educational scholarship allowances and emergency healthcare reserves.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Instant digital certificate generated upon payment confirmation.</span>
              </div>
            </div>

            {/* Right: Registration & Payment Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Member Registration Details
                  </h3>
                  <p className="text-xs text-stone-500">
                    Your details will be inscribed onto your official Trust Certificate.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Mahmudul Hasan / Farhana Chowdhury"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. member@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Mobile Phone (BD) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712 345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>
                </div>

                {/* District & Occupation & Blood Group */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      District *
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                    >
                      {bangladeshDistricts.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Occupation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Teacher, Student, Doctor"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Blood Group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Payment Channel Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Select 250 Taka Payment Channel
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'bKash', label: 'bKash', color: 'border-pink-500 text-pink-700 bg-pink-50' },
                      { id: 'Nagad', label: 'Nagad', color: 'border-orange-500 text-orange-700 bg-orange-50' },
                      { id: 'Rocket', label: 'Rocket', color: 'border-purple-500 text-purple-700 bg-purple-50' },
                      { id: 'Card', label: 'Card / Visa', color: 'border-blue-500 text-blue-700 bg-blue-50' }
                    ].map(method => (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`py-2 px-1 text-xs font-bold rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                          formData.paymentMethod === method.id
                            ? `${method.color} shadow-xs ring-2 ring-emerald-700/20`
                            : 'border-stone-200 text-stone-600 bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>
                      <strong>Official Verification Note:</strong> Supporters will send their gift and membership subscriptions through this website only.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <span>Verifying & Issuing Certificate...</span>
                    ) : (
                      <>
                        <Award className="w-4 h-4 text-amber-300" />
                        <span>Complete ৳250 Subscription & Generate Certificate</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-stone-500 mt-2">
                    Instant confirmation · Printable certificate with authentication QR code
                  </p>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* Tab 2: The Official Certificate */}
        {activeTab === 'certificate' && currentMember && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Actions Bar above certificate */}
            <div className="no-print bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-bold text-stone-800">
                  Certificate Verified: #{currentMember.memberId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintCertificate}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
                <button
                  onClick={() => onOpenShare(
                    'Afzal Charitable Trust Member Certificate',
                    `I am proud to be a registered Lifetime Member of Afzal Charitable Trust! Member ID: ${currentMember.memberId}. Join us in serving Bangladesh.`
                  )}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className="text-xs text-stone-600 hover:text-stone-900 font-medium px-2 py-1"
                >
                  New Registration
                </button>
              </div>
            </div>

            {/* Printable Certificate Frame */}
            <div 
              ref={certificateRef}
              className="certificate-print-area bg-[#FAF9F5] p-6 sm:p-10 lg:p-14 rounded-2xl border-4 sm:border-8 border-emerald-900 shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: '0 20px 40px -15px rgba(15, 81, 50, 0.2)'
              }}
            >
              {/* Inner Decorative Golden Border */}
              <div className="border-2 border-amber-600/70 p-6 sm:p-10 rounded-lg relative">
                
                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-900" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-emerald-900" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-emerald-900" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-emerald-900" />

                {/* Watermark Logo in center */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.05]">
                  <img src={TRUST_LOGO_SRC} alt="" className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover" />
                </div>

                {/* Certificate Header */}
                <div className="text-center space-y-2 relative z-10">
                  <div className="mx-auto flex justify-center mb-1">
                    <TrustLogo size="xl" variant="seal" />
                  </div>
                  
                  <div className="text-[11px] sm:text-xs uppercase tracking-widest text-emerald-950 font-bold">
                    People's Republic of Bangladesh
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-emerald-950 tracking-tight">
                    {TRUST_NAME}
                  </h1>

                  <div className="text-xs sm:text-sm text-stone-600 italic font-serif">
                    {TRUST_MOTTO}
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-4 py-1 bg-amber-100 text-amber-950 font-serif font-bold tracking-widest text-xs uppercase rounded-full border border-amber-400">
                      Certificate of Lifetime Membership
                    </span>
                  </div>
                </div>

                {/* Certificate Body Narrative */}
                <div className="text-center my-8 sm:my-10 space-y-4 relative z-10">
                  <p className="text-xs sm:text-sm text-stone-600 font-serif italic">
                    This is to formally certify that
                  </p>

                  <div className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 border-b-2 border-stone-400 pb-2 inline-block px-8 tracking-wide">
                    {currentMember.fullName}
                  </div>

                  <div className="text-xs sm:text-sm text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed pt-2">
                    Resident of <strong className="text-stone-900">{currentMember.district}</strong>, Bangladesh, 
                    has solemnly subscribed for <strong>৳250 Taka</strong> and been inducted as a registered 
                    <strong> Lifetime Humanitarian Member</strong> of Afzal Charitable Trust. 
                    Acknowledged for noble commitment toward uplifting education, healthcare, poverty relief, 
                    and societal dignity across Bangladesh.
                  </div>
                </div>

                {/* Certificate Metadata & QR Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-4 border-t border-stone-300/80 relative z-10">
                  
                  {/* Left: Member ID & Serial */}
                  <div className="space-y-1 text-left">
                    <div className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                      Membership Credentials
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-emerald-950">
                      ID: {currentMember.memberId}
                    </div>
                    <div className="font-mono text-[11px] text-stone-600">
                      Serial: {currentMember.certificateSerial}
                    </div>
                    <div className="text-[11px] text-stone-600">
                      Issue Date: {currentMember.registrationDate}
                    </div>
                  </div>

                  {/* Center: Real Scannable QR Code */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="p-2 bg-white rounded-lg border border-stone-400 shadow-xs inline-block">
                      {certificateQrUrl ? (
                        <img 
                          src={certificateQrUrl} 
                          alt="Certificate Verification QR Code" 
                          className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-stone-100 flex items-center justify-center text-xs">
                          QR Code
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-emerald-900 font-bold mt-1 tracking-wider uppercase">
                      Scan to Verify Certificate
                    </span>
                  </div>

                  {/* Right: Signatures & Seal */}
                  <div className="text-right space-y-3">
                    <div>
                      <div className="font-serif italic text-base sm:text-lg font-bold text-stone-900">
                        Afzal Hossain
                      </div>
                      <div className="w-32 ml-auto border-b border-stone-500 pt-0.5" />
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-600 mt-0.5">
                        Chairman, Board of Trustees
                      </div>
                    </div>

                    <div>
                      <div className="font-serif italic text-sm text-stone-800">
                        Nurul Amin FCA
                      </div>
                      <div className="w-28 ml-auto border-b border-stone-400 pt-0.5" />
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-stone-500 mt-0.5">
                        Secretary General & Trustee
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Bottom Download Note */}
            <div className="no-print text-center text-xs text-stone-500">
              Your official certificate has been registered on the Trust verification server. 
              You may print this document or present the scannable QR code at any Trust event.
            </div>

          </div>
        )}

        {/* Tab 3: Member Verification Lookup */}
        {activeTab === 'verify' && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <div className="text-center mb-6">
              <ShieldCheck className="w-10 h-10 text-emerald-800 mx-auto mb-2" />
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Official Trust Member Verification
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Enter any Member ID (e.g. ACT-MEM-2026-0101) or Certificate Serial to verify authenticity.
              </p>
            </div>

            <form onSubmit={handleVerifySearch} className="flex items-center gap-2 mb-6">
              <input
                type="text"
                placeholder="Enter Member ID or Name (e.g. ACT-MEM-2026-0101)"
                value={verifyQuery}
                onChange={(e) => setVerifyQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-none focus:border-emerald-700"
              />
              <button
                type="submit"
                className="py-2.5 px-5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Verify
              </button>
            </form>

            {/* Verify Results */}
            {verifyResult && verifyResult !== 'not_found' && (
              <div className="p-5 bg-emerald-50 border-2 border-emerald-500/80 rounded-xl animate-in fade-in">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    <span className="font-serif font-bold text-emerald-950 text-base">
                      Authentic Registered Member
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    {verifyResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-stone-700">
                  <div>
                    <span className="text-stone-500 block">Member Name:</span>
                    <strong className="text-stone-900 text-sm font-serif">{verifyResult.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Member ID:</span>
                    <strong className="font-mono text-emerald-950">{verifyResult.memberId}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">District:</span>
                    <span>{verifyResult.district}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Registration Date:</span>
                    <span>{verifyResult.registrationDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Certificate Serial:</span>
                    <span className="font-mono">{verifyResult.certificateSerial}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Subscription Status:</span>
                    <span className="text-emerald-800 font-bold">৳250 Verified Paid</span>
                  </div>
                </div>
              </div>
            )}

            {verifyResult === 'not_found' && (
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No member found matching "{verifyQuery}". Please verify the ID number or contact Trust HQ.</span>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
