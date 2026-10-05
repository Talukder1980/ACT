import React, { useState } from 'react';

export const TRUST_LOGO_IMAGE = '/src/assets/images/trust_logo_est_2026_1791221984888.jpg';

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

  // Custom Copyright-Free Vector Emblem SVG Fallback (with EST. 2026)
  const VectorEmblem = (
    <div className={`${sizeMap[size]} rounded-full bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-900 border-2 border-amber-400 flex items-center justify-center shadow-xs shrink-0 relative overflow-hidden`}>
      <svg viewBox="0 0 100 100" className="w-[88%] h-[88%] text-amber-300" fill="currentColor">
        {/* Outer Ring Stars / Dots */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
        {/* Rising Sun Arc */}
        <path d="M35 40 A16 16 0 0 1 65 40 Z" fill="#FDE68A" opacity="0.9" />
        {/* Open Book of Knowledge / Constitution */}
        <path d="M30 64 Q50 60 50 70 Q50 60 70 64 L68 52 Q50 48 50 58 Q50 48 32 52 Z" fill="#FFFFFF" />
        {/* Flourishing Sprout / Tree of Dignity */}
        <path d="M50 30 C44 22 36 28 38 36 C44 36 48 34 50 44 C52 34 56 36 62 36 C64 28 56 22 50 30 Z" fill="#34D399" />
        <circle cx="50" cy="26" r="3" fill="#FBBF24" />
        {/* Caring Supporting Hands */}
        <path d="M26 58 C34 64 44 68 50 68 C56 68 66 64 74 58 C70 62 58 72 50 72 C42 72 30 62 26 58 Z" fill="#F59E0B" />
        {/* Explicit Inscription: EST. 2026 */}
        <text x="50" y="87" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#FDE68A" letterSpacing="0.8" fontFamily="serif">EST. 2026</text>
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
              Est. 2026 · Compassion · Empowerment · Dignity
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
