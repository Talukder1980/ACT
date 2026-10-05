import React, { useState } from 'react';

export const TRUST_LOGO_IMAGE = '/src/assets/images/trust_emblem_logo_1791220901781.jpg';

interface TrustLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'icon' | 'horizontal' | 'seal';
  showSubtitle?: boolean;
  className?: string;
  dark?: boolean;
}

export const TrustLogo: React.FC<TrustLogoProps> = ({
  size = 'md',
  variant = 'icon',
  showSubtitle = false,
  className = '',
  dark = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
  };

  const imageClass = `${sizeMap[size]} rounded-full object-cover shadow-2xs border border-amber-400/80 bg-white shrink-0`;

  // Custom Copyright-Free Vector Emblem SVG Fallback
  const VectorEmblem = (
    <div className={`${sizeMap[size]} rounded-full bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-900 border-2 border-amber-400 flex items-center justify-center shadow-xs shrink-0 relative overflow-hidden`}>
      <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-amber-300" fill="currentColor">
        {/* Outer Ring Stars / Dots */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
        {/* Rising Sun Arc */}
        <path d="M35 44 A16 16 0 0 1 65 44 Z" fill="#FDE68A" opacity="0.9" />
        {/* Open Book of Knowledge / Constitution */}
        <path d="M30 68 Q50 64 50 74 Q50 64 70 68 L68 56 Q50 52 50 62 Q50 52 32 56 Z" fill="#FFFFFF" />
        {/* Flourishing Sprout / Tree of Dignity */}
        <path d="M50 34 C44 26 36 32 38 40 C44 40 48 38 50 48 C52 38 56 40 62 40 C64 32 56 26 50 34 Z" fill="#34D399" />
        <circle cx="50" cy="30" r="3.5" fill="#FBBF24" />
        {/* Caring Supporting Hands */}
        <path d="M26 62 C34 68 44 72 50 72 C56 72 66 68 74 62 C70 66 58 76 50 76 C42 76 30 66 26 62 Z" fill="#F59E0B" />
      </svg>
    </div>
  );

  const renderedEmblem = imgError ? (
    VectorEmblem
  ) : (
    <img
      src={TRUST_LOGO_IMAGE}
      alt="Afzal Charitable Trust Official Seal"
      className={imageClass}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
    />
  );

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderedEmblem}
        <div className="flex flex-col text-left">
          <span className={`font-serif font-bold tracking-tight leading-tight ${
            size === 'lg' || size === 'xl' ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
          } ${dark ? 'text-white' : 'text-stone-900'}`}>
            Afzal Charitable Trust
          </span>
          {showSubtitle && (
            <span className={`text-[10px] sm:text-xs font-sans font-medium uppercase tracking-wider ${
              dark ? 'text-amber-300' : 'text-emerald-800'
            }`}>
              Compassion · Empowerment · Dignity
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'seal') {
    return (
      <div className={`relative inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-tr from-amber-500 via-amber-200 to-amber-600 shadow-md ${className}`}>
        <div className="p-0.5 rounded-full bg-white">
          {renderedEmblem}
        </div>
      </div>
    );
  }

  // default 'icon'
  return renderedEmblem;
};
