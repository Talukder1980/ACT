import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, SupportedLanguage } from '../context/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'compact' | 'expanded' | 'minimal';
  className?: string;
  dark?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'compact',
  className = '',
  dark = false
}) => {
  const { language, setLanguage, currentMeta } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'expanded') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-400">
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span>Select Website Language</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SUPPORTED_LANGUAGES.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold shadow-2xs'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base select-none">{item.flag}</span>
                  <div>
                    <span className="text-xs block leading-tight">{item.nativeName}</span>
                    <span className="text-[10px] text-stone-400 block">{item.name}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
          dark
            ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
            : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200 shadow-2xs'
        }`}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="text-sm select-none">{currentMeta.flag}</span>
        <span className="font-sans">{currentMeta.nativeName}</span>
        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-stone-200 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-stone-400 border-b border-stone-100 mb-1 flex items-center justify-between">
            <span>Website Language</span>
            <Globe className="w-3 h-3 text-emerald-700" />
          </div>

          <div className="space-y-0.5">
            {SUPPORTED_LANGUAGES.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  onClick={() => handleSelect(item.code)}
                  className={`w-full px-2.5 py-2 rounded-xl text-left transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-950 font-bold'
                      : 'hover:bg-stone-50 text-stone-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base select-none">{item.flag}</span>
                    <div className="leading-tight">
                      <span className="text-xs block">{item.nativeName}</span>
                      <span className="text-[10px] text-stone-400 block">{item.name}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
