import React, { useState } from 'react';
import { FileText, Bell, Search, Printer, Share2, Download, ArrowRight, X, AlertTriangle } from 'lucide-react';
import { INITIAL_NOTICES, TRUST_NAME } from '../data/mockData';
import { Notice } from '../types';
import { TrustLogo } from './TrustLogo';

interface NoticeBoardProps {
  onOpenShare: (title: string, text: string) => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ onOpenShare }) => {
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNoticeModal, setActiveNoticeModal] = useState<Notice | null>(null);

  const categories = ['All', 'Scholarship', 'Relief Drive', 'Annual Report', 'Circular'];

  const filteredNotices = notices.filter(n => {
    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch = 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200" id="notices">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-emerald-700" />
              <span>Official Communications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Trust Notice Board & Gazettes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Official circulars, academic scholarship calls, disaster relief mobilizations, and audited financial statements.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notices, Ref No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-700"
            />
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {categories.map(cat => (
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
        </div>

        {/* Notice List Table / Card Rows */}
        <div className="space-y-3.5">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setActiveNoticeModal(notice)}
              className="group p-5 bg-[#FAFAF8] hover:bg-white border border-stone-200 hover:border-emerald-700/60 rounded-xl shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                {/* Zero-Pill Metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-sans">
                  <span className="font-mono text-emerald-900 font-semibold">{notice.refNo}</span>
                  <span aria-hidden="true">·</span>
                  <span>{notice.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{notice.date}</span>
                  {notice.isUrgent && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-700 font-bold uppercase tracking-wide flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Urgent Deadline
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-emerald-900 leading-snug transition-colors">
                  {notice.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2">
                  {notice.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="text-xs font-semibold text-emerald-800 group-hover:underline flex items-center gap-1">
                  Read Gazette <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <div className="text-center py-10 bg-stone-50 rounded-xl border border-dashed border-stone-300 text-stone-500 text-xs">
              No notices match your criteria.
            </div>
          )}
        </div>

      </div>

      {/* Notice Reader Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-900 font-semibold mb-1">
                  <span>{activeNoticeModal.refNo}</span>
                  <span>·</span>
                  <span>{activeNoticeModal.date}</span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 leading-snug">
                  {activeNoticeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="text-stone-400 hover:text-stone-700 text-2xl p-1 shrink-0 ml-4"
                aria-label="Close Notice"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Gazette View */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="text-center pb-4 border-b border-stone-200 flex flex-col items-center">
                <TrustLogo size="lg" variant="seal" className="mb-2" />
                <div className="text-xs uppercase tracking-widest font-bold text-stone-500">
                  Official Gazette of Board of Trustees
                </div>
                <div className="font-serif font-bold text-xl text-emerald-950 mt-0.5">
                  {TRUST_NAME}
                </div>
              </div>

              <div className="text-xs sm:text-sm text-stone-800 leading-relaxed space-y-4">
                <p>{activeNoticeModal.content}</p>
                <p>
                  For inquiries or physical submission of verified document dossiers, please visit 
                  the respective field branch or email the administrative secretariat at 
                  <span className="font-mono text-emerald-900 font-bold ml-1">secretariat@afzalcharitabletrust.org.bd</span>.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                <div>
                  <span className="block font-bold text-stone-900">{activeNoticeModal.signatory}</span>
                  <span className="text-stone-500 font-serif italic">Afzal Charitable Trust, Bangladesh</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] text-stone-400">Authenticated Gazette Record</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Notice</span>
              </button>

              <button
                onClick={() => onOpenShare(
                  activeNoticeModal.title,
                  `Important Notice from Afzal Charitable Trust: ${activeNoticeModal.title} (Ref: ${activeNoticeModal.refNo})`
                )}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Circular</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
