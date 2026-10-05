import React, { useState } from 'react';
import { Eye, Type, Wifi, Check } from 'lucide-react';

interface AccessibilityProps {
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  fontSizeLevel: number;
  setFontSizeLevel: (v: number | ((prev: number) => number)) => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityProps> = ({
  highContrast,
  setHighContrast,
  fontSizeLevel,
  setFontSizeLevel,
}) => {
  const [dataSaver, setDataSaver] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="no-print fixed bottom-5 left-4 sm:left-6 z-40">
      {isOpen ? (
        <div className="bg-white border-2 border-stone-800 shadow-xl rounded-xl p-3 flex flex-col gap-2 min-w-[240px] text-xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Accessibility & Mobile
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-500 hover:text-stone-900 font-bold px-1.5 py-0.5 text-sm"
              aria-label="Close accessibility controls"
            >
              ✕
            </button>
          </div>

          {/* Text Size */}
          <div className="flex items-center justify-between py-1">
            <span className="text-stone-700 flex items-center gap-1.5 font-medium">
              <Type className="w-3.5 h-3.5 text-emerald-800" /> Font Scale:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFontSizeLevel(prev => Math.max(0, prev - 1))}
                disabled={fontSizeLevel <= 0}
                className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded font-semibold disabled:opacity-40"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="font-mono px-1 font-bold">
                {fontSizeLevel === 0 ? '100%' : fontSizeLevel === 1 ? '115%' : '130%'}
              </span>
              <button
                onClick={() => setFontSizeLevel(prev => Math.min(2, prev + 1))}
                disabled={fontSizeLevel >= 2}
                className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded font-semibold disabled:opacity-40"
                title="Increase font size"
              >
                A+
              </button>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between py-1">
            <span className="text-stone-700 flex items-center gap-1.5 font-medium">
              <Eye className="w-3.5 h-3.5 text-emerald-800" /> High Contrast:
            </span>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${
                highContrast
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              {highContrast ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Low Bandwidth Mode */}
          <div className="flex items-center justify-between py-1">
            <span className="text-stone-700 flex items-center gap-1.5 font-medium">
              <Wifi className="w-3.5 h-3.5 text-emerald-800" /> 2G / 3G Light:
            </span>
            <button
              onClick={() => setDataSaver(!dataSaver)}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${
                dataSaver
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              {dataSaver ? 'Active' : 'Normal'}
            </button>
          </div>

          <div className="text-[10px] text-stone-500 pt-1 border-t border-stone-100">
            Optimized for low-spec Android & Feature phones.
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-stone-900 text-white p-2.5 rounded-full shadow-lg hover:bg-emerald-900 transition-all flex items-center gap-2 text-xs font-semibold px-3 border border-stone-700 focus:ring-2 focus:ring-emerald-500"
          aria-label="Open accessibility settings"
        >
          <Eye className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Access Options</span>
        </button>
      )}
    </div>
  );
};
