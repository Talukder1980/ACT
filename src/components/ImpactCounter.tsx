import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  Stethoscope, 
  GraduationCap, 
  Droplets, 
  Sliders, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';

interface ImpactCounterProps {
  totalRaisedBDT: number;
  currency: 'BDT' | 'USD';
  onDonateWithAmount: (amountBDT: number) => void;
}

export const ImpactCounter: React.FC<ImpactCounterProps> = ({
  totalRaisedBDT,
  currency,
  onDonateWithAmount
}) => {
  const [mode, setMode] = useState<'total' | 'simulator'>('total');
  const [simulatedBDT, setSimulatedBDT] = useState<number>(5000);
  const [showCostModel, setShowCostModel] = useState<boolean>(false);

  const BDT_TO_USD = 120;

  const formatAmount = (bdt: number) => {
    if (currency === 'USD') {
      return `$${Math.round(bdt / BDT_TO_USD).toLocaleString()}`;
    }
    return `৳${bdt.toLocaleString()}`;
  };

  const activeAmount = mode === 'total' ? totalRaisedBDT : simulatedBDT;

  // Impact Calculations (Based on standard Bangladesh humanitarian field costs)
  // 1 month family food hamper = ~৳1,800
  // Direct life touched (meals, water, warm clothing, vaccines) = ~৳400
  // Medical diagnostic / doctor treatment = ~৳1,200
  // Child education month / stationery = ~৳800
  // Solar clean water = ~2.5 Liters per ৳1 (filtration + deep tube well yield)
  const familiesHelped = Math.max(1, Math.floor(activeAmount / 1800));
  const livesTouched = Math.max(1, Math.floor(activeAmount / 400));
  const medicalScreenings = Math.max(1, Math.floor(activeAmount / 1200));
  const educationMonths = Math.max(1, Math.floor(activeAmount / 800));
  const waterLiters = Math.max(50, Math.floor(activeAmount * 2.5));

  const quickPresetsBDT = [1000, 2500, 5000, 10000, 25000, 50000];

  return (
    <div className="bg-gradient-to-br from-white via-emerald-50/30 to-stone-50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-900/15 shadow-sm mb-12">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-lg bg-emerald-800 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-[11px] uppercase font-bold tracking-widest text-emerald-900">
              Dynamic Beneficiary Impact Model
            </span>
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            Live Humanitarian Impact Counter
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Real-time estimation of lives touched and families sustained through mobilized community donations.
          </p>
        </div>

        {/* Mode Toggle Pills */}
        <div className="inline-flex p-1 bg-stone-200/90 rounded-2xl self-start md:self-auto shrink-0 shadow-inner">
          <button
            type="button"
            onClick={() => setMode('total')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'total'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
            <span>Current Mobilized Impact</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('simulator')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'simulator'
                ? 'bg-amber-400 text-stone-950 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-stone-900" />
            <span>Interactive Gift Simulator</span>
          </button>
        </div>
      </div>

      {/* Simulator Controls (Visible in Simulator Mode) */}
      {mode === 'simulator' && (
        <div className="my-6 p-5 bg-white rounded-2xl border border-amber-300 shadow-sm animate-in fade-in duration-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-stone-700 block">
                Simulate Your Gift Amount:
              </span>
              <span className="text-[11px] text-stone-500">
                Drag the slider or click a preset to see the immediate transformation:
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-950 tabular-nums">
              {formatAmount(simulatedBDT)}
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-1">
            <input
              type="range"
              min={500}
              max={50000}
              step={500}
              value={simulatedBDT}
              onChange={(e) => setSimulatedBDT(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>{formatAmount(500)}</span>
              <span>{formatAmount(10000)}</span>
              <span>{formatAmount(25000)}</span>
              <span>{formatAmount(50000)}</span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-stone-500 mr-1">Quick Select:</span>
            {quickPresetsBDT.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSimulatedBDT(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  simulatedBDT === p
                    ? 'bg-emerald-800 text-white shadow-2xs font-bold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {formatAmount(p)}
              </button>
            ))}
          </div>

          {/* Direct Donate Button From Simulator */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onDonateWithAmount(simulatedBDT)}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs hover:scale-[1.01]"
            >
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
              <span>Donate This Amount to Transform Lives ({formatAmount(simulatedBDT)})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Primary Impact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 my-6">
        
        {/* Metric 1: Families Nourished */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:border-amber-400 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-stone-400 uppercase font-bold tracking-wider">
              Nutrition
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
              {familiesHelped.toLocaleString()}
            </div>
            <h4 className="text-xs font-bold text-stone-800 mt-1 leading-snug">
              Families Nourished (1 Month)
            </h4>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Complete emergency hampers with rice, lentils, edible oil, and salt.
            </p>
          </div>
        </div>

        {/* Metric 2: Estimated Lives Touched */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:border-rose-400 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-rose-100" />
            </div>
            <span className="text-[10px] font-mono text-stone-400 uppercase font-bold tracking-wider">
              Reach
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-rose-950 tabular-nums">
              {livesTouched.toLocaleString()}
            </div>
            <h4 className="text-xs font-bold text-stone-800 mt-1 leading-snug">
              Estimated Lives Touched
            </h4>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Children, destitute seniors, and flood victims aided across 64 districts.
            </p>
          </div>
        </div>

        {/* Metric 3: Medical Screenings & Prescriptions */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:border-emerald-400 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-stone-400 uppercase font-bold tracking-wider">
              Clinical
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 tabular-nums">
              {medicalScreenings.toLocaleString()}
            </div>
            <h4 className="text-xs font-bold text-stone-800 mt-1 leading-snug">
              Medical Screenings & Care
            </h4>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Doctor consultations, cataract eye checks, and free essential medicines.
            </p>
          </div>
        </div>

        {/* Metric 4: Education Months Funded */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:border-blue-400 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-stone-400 uppercase font-bold tracking-wider">
              Learning
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-blue-950 tabular-nums">
              {educationMonths.toLocaleString()}
            </div>
            <h4 className="text-xs font-bold text-stone-800 mt-1 leading-snug">
              Student Education Months
            </h4>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Tuition stipends, digital classroom access, and academic stationery.
            </p>
          </div>
        </div>

        {/* Metric 5: Safe Drinking Water */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:border-cyan-400 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-800 border border-cyan-200 group-hover:scale-105 transition-transform">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-stone-400 uppercase font-bold tracking-wider">
              WASH
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-cyan-950 tabular-nums">
              {waterLiters.toLocaleString()} L
            </div>
            <h4 className="text-xs font-bold text-stone-800 mt-1 leading-snug">
              Liters of Safe Drinking Water
            </h4>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Deep tube-well yields preventing arsenic and waterborne illness.
            </p>
          </div>
        </div>

      </div>

      {/* Cost Model Equivalency Accordion / Transparency Footer */}
      <div className="pt-2 border-t border-stone-200">
        <button
          type="button"
          onClick={() => setShowCostModel(!showCostModel)}
          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition-colors"
        >
          <Info className="w-3.5 h-3.5 text-emerald-700" />
          <span>How are these impact numbers calculated? (Audited Cost Model)</span>
          <span className="text-[10px] text-stone-400">[{showCostModel ? 'Hide' : 'Show Breakdown'}]</span>
        </button>

        {showCostModel && (
          <div className="mt-3 p-4 bg-stone-100 rounded-2xl text-xs text-stone-700 space-y-2 animate-in fade-in duration-150">
            <p className="font-semibold text-stone-900">
              Cost Equivalency: ৳1,800 feeds 1 family for 1 month; ৳400 delivers direct essential relief to 1 individual; ৳1,200 funds clinical medicine & diagnostics; ৳800 supports 1 student month.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-[11px] text-stone-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Zero administrative cuts from direct aid</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Bulk local grain wholesale purchasing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Volunteer doctor honorary service hours</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Published quarterly transparency gazettes</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
