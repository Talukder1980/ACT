import React, { useState } from 'react';
import { 
  GraduationCap, 
  HeartPulse, 
  HandCoins, 
  ShieldAlert, 
  Home, 
  Droplet, 
  Landmark, 
  Megaphone, 
  Leaf, 
  Laptop, 
  Users, 
  Globe, 
  HandHeart, 
  ShieldCheck, 
  Compass, 
  TrendingUp,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { TRUST_PILLARS } from '../data/mockData';
import { Pillar } from '../types';

interface PillarsGridProps {
  onOpenDonate: (causeName?: string) => void;
  onOpenShare: (title: string, text: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  HeartPulse,
  HandCoins,
  ShieldAlert,
  Home,
  Droplet,
  Landmark,
  Megaphone,
  Leaf,
  Laptop,
  Users,
  Globe,
  HandHeart,
  ShieldCheck,
  Compass,
  TrendingUp
};

export const PillarsGrid: React.FC<PillarsGridProps> = ({ onOpenDonate, onOpenShare }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePillarModal, setActivePillarModal] = useState<Pillar | null>(null);

  const categories = ['All', 'Education', 'Health', 'Welfare', 'Empowerment', 'Global & Society'];

  const filteredPillars = TRUST_PILLARS.filter((pillar) => {
    const matchesCategory = selectedCategory === 'All' || pillar.category === selectedCategory;
    const matchesSearch = 
      pillar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pillar.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pillar.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200" id="pillars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
              Humanitarian Mandate
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              16 Core Areas of Action & Social Transformation
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Each pillar operates with specialized field teams, transparent allocation, and community-led monitoring across Bangladesh.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pillars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
            />
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-stone-400 ml-auto hidden sm:inline tabular-nums">
            Showing {filteredPillars.length} of {TRUST_PILLARS.length}
          </span>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPillars.map((pillar, idx) => {
            const IconComponent = iconMap[pillar.iconName] || Sparkles;
            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillarModal(pillar)}
                className="group relative bg-[#FAFAF8] hover:bg-white rounded-2xl p-5 border border-stone-200 hover:border-emerald-700/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 font-semibold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-emerald-900 leading-snug transition-colors mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500 font-medium truncate max-w-[170px]">
                    {pillar.impactMetrics}
                  </span>
                  <span className="text-emerald-800 group-hover:translate-x-1 transition-transform inline-flex items-center font-bold">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPillars.length === 0 && (
          <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-500 text-sm">No pillars found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-2 text-xs font-bold text-emerald-800 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* Deep-Dive Pillar Modal */}
      {activePillarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-[#0f5132] text-white p-6 relative">
              <div className="flex items-center gap-2 text-xs text-emerald-200 uppercase tracking-widest font-semibold mb-2">
                <span>Core Pillar · {activePillarModal.category}</span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white pr-8 leading-snug">
                {activePillarModal.title}
              </h3>
              <button
                onClick={() => setActivePillarModal(null)}
                className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Program Overview
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {activePillarModal.description}
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Real-World Benchmark:</span>
                </div>
                <div className="text-xs text-emerald-800 font-medium">
                  {activePillarModal.impactMetrics}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Managed by ACT Field Directorate</span>
                <span>Active in 64 Districts</span>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center gap-2">
              <button
                onClick={() => {
                  const title = activePillarModal.title;
                  setActivePillarModal(null);
                  onOpenDonate(title);
                }}
                className="flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Pledge Aid for this Cause
              </button>
              <button
                onClick={() => {
                  onOpenShare(
                    activePillarModal.title,
                    `Support Afzal Charitable Trust's initiative in ${activePillarModal.title}. Join us in building a better Bangladesh!`
                  );
                }}
                className="py-2.5 px-3 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-semibold"
              >
                Share Initiative
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
