import React from 'react';
import { Target, Compass, CheckCircle, ShieldCheck, Edit3 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const MissionVision: React.FC = () => {
  const { content, isAdminLoggedIn, openAdminTab } = useContent();
  const mv = content.missionVision;

  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200" id="mission-vision">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-800">
              Foundational Charter & Principles
            </span>
            {isAdminLoggedIn && (
              <button
                onClick={() => openAdminTab('mission')}
                className="text-[10px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Statements</span>
              </button>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Our Solemn Pledge to the People of Bangladesh
          </h2>
          <div className="w-16 h-0.5 bg-emerald-800 mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-stone-600">
            Founded on the pillars of non-discrimination, radical operational transparency, and lifelong human dignity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-900">{mv.missionTitle}</h3>
                    <span className="text-xs text-stone-500">Dedicated Service Across 64 Districts</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  CHARTER I
                </span>
              </div>

              {/* Exact Mission Statement from CMS */}
              <blockquote className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans pt-2">
                <span className="text-2xl font-serif text-emerald-800 font-bold mr-1">“</span>
                {mv.missionStatement}
                <span className="text-2xl font-serif text-emerald-800 font-bold ml-1">”</span>
              </blockquote>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 font-medium text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> Transparent Philanthropy
              </span>
              <span>Constitutional Mandate</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-xs">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-900">{mv.visionTitle}</h3>
                    <span className="text-xs text-stone-500">A Just, Equitable & Compassionate Future</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                  CHARTER II
                </span>
              </div>

              {/* Exact Vision Statement from CMS */}
              <blockquote className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans pt-2">
                <span className="text-2xl font-serif text-amber-600 font-bold mr-1">“</span>
                {mv.visionStatement}
                <span className="text-2xl font-serif text-amber-600 font-bold ml-1">”</span>
              </blockquote>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 font-medium text-amber-900">
                <CheckCircle className="w-4 h-4 text-amber-600" /> Generational Transformation
              </span>
              <span>National Impact Framework</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
