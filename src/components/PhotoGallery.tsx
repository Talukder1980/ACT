import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Users, Share2, Maximize2, X, ArrowUpRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/mockData';
import { GalleryPhoto } from '../types';

interface PhotoGalleryProps {
  onOpenShare: (title: string, text: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onOpenShare }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = ['All', 'Education', 'Healthcare', 'Poverty Relief', 'Empowerment'];

  const filteredPhotos = GALLERY_PHOTOS.filter(photo => {
    return selectedCategory === 'All' || photo.category === selectedCategory;
  });

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-emerald-700" />
              <span>Documentary Field Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Real-World Impact & Voices Across Bangladesh
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Visual dispatches from our active educational pavilions, mobile surgery clinics, flood shelters, and youth vocational hubs.
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
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
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative bg-[#FAFAF8] rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-stone-800 border border-stone-200 shadow-2xs">
                  {photo.category}
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Overlay Info on Image */}
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs font-sans">
                  <span className="flex items-center gap-1 text-emerald-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300" /> {photo.location}
                  </span>
                  <span className="flex items-center gap-1 text-stone-300">
                    <Calendar className="w-3.5 h-3.5" /> {photo.date}
                  </span>
                </div>
              </div>

              {/* Caption Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-emerald-900 leading-snug transition-colors">
                    {photo.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                  <span className="text-emerald-800 font-bold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-700" />
                    {photo.beneficiaryImpact}
                  </span>
                  <span className="text-stone-500 group-hover:text-stone-900 font-medium flex items-center gap-0.5">
                    View Dispatch <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/9] bg-stone-950 overflow-hidden">
              <img
                src={activePhoto.imageSrc}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {activePhoto.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-700" /> {activePhoto.location}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activePhoto.date}</span>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-snug">
                {activePhoto.title}
              </h3>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {activePhoto.caption}
              </p>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-950 font-bold block">
                    Beneficiary Impact Milestone
                  </span>
                  <span className="text-sm font-serif font-bold text-emerald-900">
                    {activePhoto.beneficiaryImpact}
                  </span>
                </div>
                <button
                  onClick={() => onOpenShare(
                    activePhoto.title,
                    `Seeing the impact: ${activePhoto.title} in ${activePhoto.location} by Afzal Charitable Trust. Real lives changed in Bangladesh!`
                  )}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Milestone</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
