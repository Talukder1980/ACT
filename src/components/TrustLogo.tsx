import React from 'react';

export const TRUST_LOGO_IMAGE = '/src/assets/images/trust_official_logo_1791209319086.jpg';

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
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
  };

  const imageClass = `${sizeMap[size]} rounded-full object-cover shadow-xs border border-amber-400/80 bg-white shrink-0`;

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={TRUST_LOGO_IMAGE}
          alt="Afzal Charitable Trust Official Seal"
          className={imageClass}
          referrerPolicy="no-referrer"
        />
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
          <img
            src={TRUST_LOGO_IMAGE}
            alt="Official Embossed Seal of Afzal Charitable Trust"
            className={`${sizeMap[size]} rounded-full object-cover`}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  // default 'icon'
  return (
    <img
      src={TRUST_LOGO_IMAGE}
      alt="Afzal Charitable Trust Logo"
      className={`${imageClass} ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};
