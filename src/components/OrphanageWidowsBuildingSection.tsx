import React, { useState } from 'react';
import { 
  Home, 
  Heart, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Share2, 
  ShieldCheck, 
  QrCode, 
  DollarSign, 
  Users, 
  Flame, 
  Award,
  Layers,
  ArrowRight,
  Sun,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BuildingGiftTier, BuildingGiftRecord } from '../types';
import { TRUST_NAME, TRUST_MOTTO, TRUST_LOGO_SRC } from '../data/mockData';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { TrustLogo } from './TrustLogo';

interface OrphanageWidowsBuildingSectionProps {
  onOpenShare: (title: string, text: string) => void;
}

export const OrphanageWidowsBuildingSection: React.FC<OrphanageWidowsBuildingSectionProps> = ({ onOpenShare }) => {
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
  const BDT_TO_USD = 120;

  // Tracker State for the Building
  const [targetBDT, setTargetBDT] = useState<number>(6000000); // ৳60 Lakh BDT (~$50,000 USD)
  const [raisedBDT, setRaisedBDT] = useState<number>(4380000); // ৳43.8 Lakh BDT (~$36,500 USD)
  const [totalBuildingDonors, setTotalBuildingDonors] = useState<number>(584);
  const [bricksGifted, setBricksGifted] = useState<number>(24500);

  // Construction Stages
  const constructionPhases = [
    { name: 'Phase 1: Deep Piling & Seismic Foundation', status: 'Completed', percent: 100 },
    { name: 'Phase 2: Ground Floor Dining & Medical Wing', status: 'Completed', percent: 100 },
    { name: 'Phase 3: 1st Floor Orphan Dormitories & Classrooms', status: 'In Progress', percent: 78 },
    { name: 'Phase 4: 2nd Floor Elderly Widows Sanctuaries', status: 'Active Construction', percent: 58 },
    { name: 'Phase 5: Rooftop Solar Grid & Water Filtration Plant', status: 'Upcoming', percent: 32 }
  ];

  // Special Gift Tiers
  const giftTiers: BuildingGiftTier[] = [
    {
      id: 'brick-pack',
      amountUSD: 15,
      amountBDT: 1800,
      title: '100 Structural Bricks & Mortar',
      subtitle: 'Foundation Sustainer',
      description: 'Funds 100 high-tensile fired clay bricks and mortar mix for the exterior protective perimeter.',
      iconName: 'Layers',
      brickCount: 100
    },
    {
      id: 'resident-bed',
      amountUSD: 50,
      amountBDT: 6000,
      title: 'Resident Comfort Bed & Storage Locker',
      subtitle: 'Living Sanctuary Gift',
      description: 'Provides a solid timber single bed, orthopedic mattress, bedding, and secure wardrobe for an orphan or widow.',
      iconName: 'Home',
      isPopular: true
    },
    {
      id: 'study-station',
      amountUSD: 100,
      amountBDT: 12000,
      title: 'Orphan Tech Study Station',
      subtitle: 'Empowerment Gift',
      description: 'Funds study desks, LED reading lamps, and reference textbooks for the children’s integrated study pavilion.',
      iconName: 'Award'
    },
    {
      id: 'solar-water',
      amountUSD: 250,
      amountBDT: 30000,
      title: 'Solar Clean Water & Sanitization Unit',
      subtitle: 'Perpetual Health Gift',
      description: 'Sponsors continuous solar-pumped clean drinking water and hygienic washroom amenities for 130 residents.',
      iconName: 'Sun'
    },
    {
      id: 'room-endowment',
      amountUSD: 500,
      amountBDT: 60000,
      title: 'Resident Room Naming Plaque',
      subtitle: 'Enduring Sadaqah Jariyah',
      description: 'Inscribes an engraved brass dedication plaque bearing your loved one’s name on a resident sanctuary suite.',
      iconName: 'Building2',
      isPopular: true
    },
    {
      id: 'wing-benefactor',
      amountUSD: 1000,
      amountBDT: 120000,
      title: 'Sanctuary Wing Pillar Patron',
      subtitle: 'Grand Memorial Dedication',
      description: 'Permanently carves your family or honoree’s dedication at the central foyer memorial column.',
      iconName: 'Heart'
    }
  ];

  // Initial Donor Wall of Honor
  const [wallOfHonor, setWallOfHonor] = useState<BuildingGiftRecord[]>([
    {
      id: 'bg-1',
      certificateNo: 'ACT-BLD-CERT-8841',
      donorName: 'Dr. Tariqul Islam & Sabiha Islam',
      donorEmail: 'tariqul@example.com',
      amountBDT: 60000,
      amountUSD: 500,
      giftTierTitle: 'Resident Room Naming Plaque',
      dedicationType: 'In Loving Memory of',
      honoreeName: 'Late Alhaj Nurul Islam (Father)',
      message: 'May this sanctuary be a continuous light and source of eternal mercy.',
      date: 'March 24, 2026',
      plaqueLocation: 'Widows Sanctuary Suite 204'
    },
    {
      id: 'bg-2',
      certificateNo: 'ACT-BLD-CERT-8819',
      donorName: 'Rehana Akhter (London)',
      donorEmail: 'rehana.uk@example.com',
      amountBDT: 30000,
      amountUSD: 250,
      giftTierTitle: 'Solar Clean Water & Sanitization Unit',
      dedicationType: 'Sadaqah Jariyah for',
      honoreeName: 'The Departed Elders of the Akhter Family',
      message: 'Praying for peace and shelter for every orphan in Bangladesh.',
      date: 'March 18, 2026',
      plaqueLocation: 'Ground Floor Pure Water Filtration Plant'
    },
    {
      id: 'bg-3',
      certificateNo: 'ACT-BLD-CERT-8790',
      donorName: 'Kazi Moinuddin Ahmed',
      donorEmail: 'kazi.moin@example.com',
      amountBDT: 12000,
      amountUSD: 100,
      giftTierTitle: 'Orphan Tech Study Station',
      dedicationType: 'Celebration of',
      honoreeName: 'Birth of Granddaughter Sophia',
      message: 'Sharing our joy by gifting education to children without parents.',
      date: 'March 05, 2026',
      plaqueLocation: 'Orphan Study Library Desk 12'
    }
  ]);

  // Modal State
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<BuildingGiftTier>(giftTiers[1]);
  const [customAmountBDT, setCustomAmountBDT] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [dedicationType, setDedicationType] = useState('In Loving Memory of');
  const [honoreeName, setHonoreeName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Issued Certificate State
  const [issuedCertificate, setIssuedCertificate] = useState<BuildingGiftRecord | null>(null);
  const [certQrUrl, setCertQrUrl] = useState<string>('');
  const [searchWallQuery, setSearchWallQuery] = useState('');

  const formatMoney = (bdt: number) => {
    if (currency === 'USD') {
      return `$${Math.round(bdt / BDT_TO_USD).toLocaleString()}`;
    }
    return `৳${bdt.toLocaleString()}`;
  };

  const overallPercent = Math.min(100, Math.round((raisedBDT / targetBDT) * 100));

  const handleOpenGiftModal = (tier?: BuildingGiftTier) => {
    if (tier) setSelectedTier(tier);
    setIssuedCertificate(null);
    setIsGiftModalOpen(true);
  };

  const handleCompleteGift = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmountBDT = customAmountBDT ? parseInt(customAmountBDT, 10) : selectedTier.amountBDT;
    if (!finalAmountBDT || finalAmountBDT <= 0) return;

    setIsSubmitting(true);
    const certNo = `ACT-BLD-CERT-${Math.floor(1000 + Math.random() * 9000)}`;
    const qr = await generateQrDataUrl(`https://afzalcharitabletrust.org.bd/building-cert/${certNo}`, 170);

    setTimeout(() => {
      const newRecord: BuildingGiftRecord = {
        id: `bg-${Date.now()}`,
        certificateNo: certNo,
        donorName: isAnonymous ? 'Anonymous Benefactor' : (donorName.trim() || 'Generous Supporter'),
        donorEmail: donorEmail.trim(),
        amountBDT: finalAmountBDT,
        amountUSD: Math.round(finalAmountBDT / BDT_TO_USD),
        giftTierTitle: selectedTier.title,
        dedicationType,
        honoreeName: honoreeName.trim() || 'Vulnerable Mothers & Children of Bangladesh',
        message: personalMessage.trim() || 'With heartfelt prayers for the residents of the Sanctuary.',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        plaqueLocation: `Sanctuary Memorial Wing, Level ${Math.floor(1 + Math.random() * 3)}`,
        isAnonymous
      };

      setRaisedBDT(prev => prev + finalAmountBDT);
      setTotalBuildingDonors(prev => prev + 1);
      const addedBricks = selectedTier.brickCount ?? 0;
      if (addedBricks > 0) {
        setBricksGifted(prev => prev + addedBricks);
      }
      setWallOfHonor(prev => [newRecord, ...prev]);
      setCertQrUrl(qr);
      setIssuedCertificate(newRecord);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 1100);
  };

  const filteredWall = wallOfHonor.filter(item => {
    const q = searchWallQuery.toLowerCase();
    return (
      item.donorName.toLowerCase().includes(q) ||
      item.honoreeName.toLowerCase().includes(q) ||
      item.certificateNo.toLowerCase().includes(q) ||
      item.giftTierTitle.toLowerCase().includes(q)
    );
  });

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FAFAF8] via-amber-50/20 to-[#FAF9F5] border-b border-stone-300" id="orphanage-widows-building">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-3 shadow-xs">
            <Building2 className="w-4 h-4 text-amber-800" />
            <span>Special Capital Endowment Project</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Special Gift for Orphanage & Widows Home Building
          </h2>
          <div className="w-20 h-1 bg-amber-600 mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
            A permanent sanctuary under construction in Bangladesh to provide loving shelter, nourishment, medical care, 
            and education for <strong>80 orphan children</strong> and <strong>50 destitute elderly widows</strong>. 
            Dedicate bricks, rooms, and perpetual Sadaqah Jariyah in honor of your loved ones.
          </p>

          {/* Official Website-Only Gifting Advisory Note */}
          <div className="mt-5 p-3.5 bg-white border border-amber-500/50 rounded-2xl shadow-xs max-w-2xl mx-auto flex items-center justify-center gap-2.5 text-xs text-stone-800 text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
            <span>
              <strong className="text-emerald-950">Direct Contribution Policy:</strong> Supporters will send their gift <strong>through this website only</strong> to guarantee official registration in the building ledger, plaque engraving on the Sanctuary Wall of Honor, and authentic dedication certification.
            </span>
          </div>
        </div>

        {/* Featured Image & Live Gift Tracker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left: Building Photograph (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-stone-300 shadow-xl bg-stone-900 group">
              <img
                src="/src/assets/images/building_orphanage_widows_1791220922823.jpg"
                alt="Sanctuary of Dignity Orphanage and Widows Home construction site in Bangladesh"
                className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-emerald-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-md border border-emerald-500/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Construction Active · Sylhet Char Zone</span>
              </div>

              {/* Photo Overlay Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                <h4 className="font-serif font-bold text-lg text-white">
                  Afzal Sanctuary of Dignity Complex
                </h4>
                <p className="text-xs text-stone-200 mt-1 leading-snug">
                  4-Story Earth-quake Resistant Masonry · 130 Permanent Residents · Solar Water & School Wing
                </p>
              </div>
            </div>
          </div>

          {/* Right: Specialized Building Gift Tracker (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-6">
            
            {/* Tracker Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">
                  Building Gift Tracker
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 mt-0.5">
                  Construction Mobilization Status
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                <button
                  onClick={() => setCurrency('BDT')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${currency === 'BDT' ? 'bg-white text-emerald-950 shadow-xs' : 'text-stone-600'}`}
                >
                  ৳ BDT
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${currency === 'USD' ? 'bg-white text-emerald-950 shadow-xs' : 'text-stone-600'}`}
                >
                  $ USD
                </button>
              </div>
            </div>

            {/* Raised vs Target Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-900 tracking-wider block">
                  Total Gifts Mobilized
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-950 tabular-nums">
                  {formatMoney(raisedBDT)}
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">
                  Project Budget Target
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  {formatMoney(targetBDT)}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider block">
                  Benefactors Joined
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-amber-950 tabular-nums">
                  {totalBuildingDonors} Donors
                </span>
              </div>
            </div>

            {/* Master Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">Overall Construction & Furnishing Completion</span>
                <span className="font-mono font-bold text-emerald-900">{overallPercent}% Completed</span>
              </div>
              <div className="w-full h-3.5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-500 rounded-full transition-all duration-700"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
            </div>

            {/* Construction Phases Progress Ticker */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Engineering Milestone Breakdown:
              </span>
              <div className="space-y-2 text-xs">
                {constructionPhases.map((phase) => (
                  <div key={phase.name} className="flex items-center justify-between gap-2 p-2 bg-stone-50 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-2 truncate">
                      {phase.percent === 100 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        </div>
                      )}
                      <span className="font-medium text-stone-800 truncate">{phase.name}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-stone-600 shrink-0 tabular-nums">
                      {phase.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => handleOpenGiftModal()}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-amber-500 hover:scale-[1.01] active:scale-95"
              >
                <Heart className="w-4 h-4 text-emerald-950 fill-emerald-950" />
                <span>Gift to the Orphanage & Widows Home Now</span>
              </button>
            </div>

          </div>

        </div>

        {/* Special Building Gift Tiers Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Select Your Building Contribution
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              Building Gift Packages & Dedication Options
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Every building gift receives an authentic, printable Certificate of Building Dedication and inscription on the Wall of Honor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-6 bg-white border-2 transition-all flex flex-col justify-between hover:shadow-xl ${
                  tier.isPopular ? 'border-amber-400 shadow-md ring-1 ring-amber-400/40' : 'border-stone-200 shadow-xs'
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-3 right-6 bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs border border-amber-500">
                    High Impact Choice
                  </span>
                )}

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-200 shadow-2xs">
                      {tier.id === 'brick-pack' && <Layers className="w-6 h-6 text-emerald-800" />}
                      {tier.id === 'resident-bed' && <Home className="w-6 h-6 text-emerald-800" />}
                      {tier.id === 'study-station' && <Award className="w-6 h-6 text-emerald-800" />}
                      {tier.id === 'solar-water' && <Sun className="w-6 h-6 text-amber-600" />}
                      {tier.id === 'room-endowment' && <Building2 className="w-6 h-6 text-emerald-800" />}
                      {tier.id === 'wing-benefactor' && <Heart className="w-6 h-6 text-rose-600" />}
                    </div>

                    <div className="text-right">
                      <div className="font-black text-2xl text-stone-900 font-sans tabular-nums">
                        ${tier.amountUSD} <span className="text-xs font-normal text-stone-500">USD</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-900">
                        ৳{tier.amountBDT.toLocaleString()} BDT
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                    {tier.subtitle}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-stone-900 leading-snug mt-0.5 mb-2">
                    {tier.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6">
                    {tier.description}
                  </p>
                </div>

                <button
                  onClick={() => handleOpenGiftModal(tier)}
                  className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Gift This Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Sanctuary Donor Wall of Honor */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-stone-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h4 className="font-serif font-bold text-lg sm:text-xl text-stone-900">
                  Sanctuary Donor Wall of Honor
                </h4>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Perpetual dedications inscribed at the permanent building entrance foyer.
              </p>
            </div>

            {/* Wall Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search honored names..."
                value={searchWallQuery}
                onChange={(e) => setSearchWallQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWall.map((record) => (
              <div 
                key={record.id}
                className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pb-1 border-b border-stone-200/60">
                    <span className="text-emerald-950 font-bold">{record.certificateNo}</span>
                    <span>{record.date}</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                      {record.dedicationType}
                    </span>
                    <h5 className="font-serif font-bold text-base text-stone-900 leading-snug">
                      {record.honoreeName}
                    </h5>
                    <div className="text-xs text-stone-600 mt-1">
                      Gifted by: <strong>{record.donorName}</strong>
                    </div>
                  </div>

                  {record.message && (
                    <p className="text-[11px] text-stone-600 italic bg-white p-2 rounded-lg border border-stone-200 mt-2">
                      "{record.message}"
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500 font-medium truncate max-w-[150px]">
                    {record.giftTierTitle}
                  </span>
                  <strong className="text-emerald-950 font-serif tabular-nums">
                    {formatMoney(record.amountBDT)}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Gifting & Dedication Certificate Modal */}
      {isGiftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-[#0f5132] to-[#14532d] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <TrustLogo size="sm" variant="seal" />
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white leading-tight">
                    Dedicate a Special Building Gift
                  </h3>
                  <p className="text-xs text-emerald-200">Orphanage & Widows Home Sanctuary</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsGiftModalOpen(false);
                  setIssuedCertificate(null);
                }}
                className="text-white/80 hover:text-white text-2xl p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Content: If Certificate issued, show printable certificate */}
            {issuedCertificate ? (
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950">
                    <strong className="block font-bold text-sm text-emerald-900">
                      Building Gift Registered & Inscribed!
                    </strong>
                    Your gift has been recorded in the Building Gift Tracker and scheduled for engraving on the Sanctuary Wall of Honor.
                  </div>
                </div>

                {/* Printable Certificate Frame */}
                <div className="certificate-print-area p-6 sm:p-8 bg-[#FAF9F5] border-4 border-amber-600 rounded-2xl shadow-md text-stone-900 relative">
                  <div className="border border-stone-300 p-5 rounded-xl space-y-4">
                    
                    <div className="text-center space-y-1">
                      <div className="flex justify-center mb-1">
                        <TrustLogo size="lg" variant="seal" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-emerald-950 font-bold block">
                        Sanctuary of Dignity · Capital Endowment Charter
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
                        {TRUST_NAME}
                      </h3>
                      <div className="text-xs font-serif italic text-stone-600">
                        Certificate of Building Dedication & Perpetual Sadaqah
                      </div>
                    </div>

                    <div className="text-center py-2 space-y-2">
                      <span className="text-xs font-serif italic text-stone-500 uppercase tracking-widest">
                        {issuedCertificate.dedicationType}
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 border-b border-stone-300 pb-2 inline-block px-8">
                        {issuedCertificate.honoreeName}
                      </h4>
                      <p className="text-xs text-stone-700 max-w-lg mx-auto leading-relaxed pt-1">
                        Dedicated with eternal devotion by <strong>{issuedCertificate.donorName}</strong> for the 
                        construction of the <strong>Orphanage & Widows Home Complex</strong> in Bangladesh. 
                        Sponsoring the <em>{issuedCertificate.giftTierTitle}</em> with a gift of 
                        <strong> ৳{issuedCertificate.amountBDT.toLocaleString()} BDT (${issuedCertificate.amountUSD} USD)</strong>.
                      </p>
                    </div>

                    {issuedCertificate.message && (
                      <div className="bg-white/80 p-3 rounded-xl border border-stone-200 text-center text-xs italic text-stone-700">
                        "{issuedCertificate.message}"
                      </div>
                    )}

                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-stone-500 block uppercase">Registration Code</span>
                        <strong className="font-mono text-emerald-950">{issuedCertificate.certificateNo}</strong>
                        <div className="text-[10px] text-stone-500 mt-0.5">Location: {issuedCertificate.plaqueLocation}</div>
                      </div>

                      {certQrUrl && (
                        <div className="text-center">
                          <img src={certQrUrl} alt="Building Verification QR" className="w-16 h-16 rounded border border-stone-300" />
                          <span className="text-[8px] font-mono text-emerald-900 block mt-0.5 font-bold uppercase">
                            Verify Inscription
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Building Certificate</span>
                  </button>
                  <button
                    onClick={() => onOpenShare(
                      'Orphanage & Widows Home Building Dedication',
                      `I just dedicated a special building gift for the Orphanage & Widows Home through Afzal Charitable Trust in honor of ${issuedCertificate.honoreeName}!`
                    )}
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

              </div>
            ) : (
              /* Gifting Form */
              <form onSubmit={handleCompleteGift} className="p-6 sm:p-8 overflow-y-auto space-y-4">
                
                {/* Select Tier */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Select Building Gift Package
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {giftTiers.map(t => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => {
                          setSelectedTier(t);
                          setCustomAmountBDT('');
                        }}
                        className={`p-2 rounded-xl text-xs font-bold border-2 transition-all text-left flex flex-col justify-between ${
                          selectedTier.id === t.id && !customAmountBDT
                            ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-800/20'
                            : 'border-stone-200 text-stone-700 bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        <span className="font-sans font-bold">${t.amountUSD} USD</span>
                        <span className="text-[11px] font-mono text-emerald-900">৳{t.amountBDT.toLocaleString()}</span>
                        <span className="text-[10px] text-stone-500 font-normal truncate mt-1">{t.title}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-2.5">
                    <input
                      type="number"
                      placeholder="Or enter custom gift amount in ৳ BDT..."
                      value={customAmountBDT}
                      onChange={(e) => setCustomAmountBDT(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                {/* Dedication Type & Honoree */}
                <div className="pt-2 border-t border-stone-100 space-y-3">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                    Memorial / Dedication Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Dedication Purpose *
                      </label>
                      <select
                        value={dedicationType}
                        onChange={(e) => setDedicationType(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                      >
                        <option value="In Loving Memory of">In Loving Memory of</option>
                        <option value="Sadaqah Jariyah for">Sadaqah Jariyah for</option>
                        <option value="Celebration of">Celebration of</option>
                        <option value="Dedicated by Family of">Dedicated by Family of</option>
                        <option value="General Building Gift for">General Building Gift for</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Name of Honoree / Loved One *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Late Begum Shamsun Nahar (Mother)"
                        value={honoreeName}
                        onChange={(e) => setHonoreeName(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Donor Details */}
                <div className="pt-2 border-t border-stone-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isAnonymous}
                        placeholder="e.g. Engr. Asadullah"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Your Email (for digital certificate) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. asadullah@email.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="bld-anon"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4"
                    />
                    <label htmlFor="bld-anon" className="text-xs text-stone-600 cursor-pointer">
                      Keep my name anonymous on the public Wall of Honor (certificate will still be emailed to you)
                    </label>
                  </div>
                </div>

                {/* Blessing Message */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Prayer or Message (Printed on Dedication Certificate)
                  </label>
                  <textarea
                    rows={2}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="May this building stand as a beacon of love, shelter, and continuous blessings..."
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                  />
                </div>

                {/* Submit */}
                <div className="pt-3 border-t border-stone-100">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>
                      <strong>Important Notice:</strong> Supporters will send their gift through this website only. Dedication certificates are generated immediately through this official channel.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Registering Building Gift & Issuing Certificate...</span>
                    ) : (
                      <>
                        <Building2 className="w-4 h-4 text-amber-300" />
                        <span>Confirm ৳{(customAmountBDT ? parseInt(customAmountBDT, 10) || 0 : selectedTier.amountBDT).toLocaleString()} Gift & Inscribe Dedication</span>
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
