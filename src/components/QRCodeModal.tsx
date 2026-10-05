import React, { useEffect, useState } from 'react';
import { QrCode, Download, Printer, Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { TrustLogo } from './TrustLogo';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl?: string;
  title?: string;
  subtitle?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  targetUrl = 'https://afzalcharitabletrust.org.bd/donate',
  title = 'Official Trust QR Code',
  subtitle = 'For Event Scanning, Field Volunteers & Printed Materials'
}) => {
  const [qrSrc, setQrSrc] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'donate' | 'membership' | 'general'>('donate');
  const [copied, setCopied] = useState(false);

  const getUrlForType = (type: 'donate' | 'membership' | 'general') => {
    switch (type) {
      case 'donate':
        return 'https://afzalcharitabletrust.org.bd/donate?ref=event_qr';
      case 'membership':
        return 'https://afzalcharitabletrust.org.bd/membership?ref=event_qr';
      case 'general':
      default:
        return 'https://afzalcharitabletrust.org.bd/?ref=event_qr';
    }
  };

  const activeUrl = targetUrl || getUrlForType(selectedType);

  useEffect(() => {
    if (isOpen) {
      generateQrDataUrl(activeUrl, 320).then(url => setQrSrc(url));
    }
  }, [isOpen, activeUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#0f5132] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrustLogo size="md" variant="seal" />
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight text-white">{title}</h3>
              <p className="text-xs text-emerald-100">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close QR Modal"
          >
            ✕
          </button>
        </div>

        {/* Tab switch for QR Purpose */}
        <div className="p-4 bg-stone-50 border-b border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
            Select Event Scan Target:
          </div>
          <div className="grid grid-cols-3 gap-1 bg-stone-200/70 p-1 rounded-lg">
            <button
              onClick={() => setSelectedType('donate')}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedType === 'donate'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Direct Donate
            </button>
            <button
              onClick={() => setSelectedType('membership')}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedType === 'membership'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Member ৳250
            </button>
            <button
              onClick={() => setSelectedType('general')}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedType === 'general'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Trust Portal
            </button>
          </div>
        </div>

        {/* QR Body */}
        <div className="p-6 flex flex-col items-center text-center">
          <div className="relative p-3 bg-white rounded-xl border-2 border-stone-800 shadow-sm">
            {qrSrc ? (
              <img
                src={qrSrc}
                alt="Afzal Charitable Trust Official QR Code"
                className="w-56 h-56 object-contain"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-stone-400 text-sm">
                Generating QR...
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <TrustLogo size="xs" variant="seal" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Official Verified QR · Trust Seal Certified</span>
          </div>

          <p className="mt-2 text-xs text-stone-600 max-w-xs">
            Scan using any mobile camera or bKash / Nagad / banking apps to instantly connect with Afzal Charitable Trust.
          </p>

          <div className="mt-3 w-full p-2 bg-stone-100 rounded-lg flex items-center justify-between text-xs text-stone-600 font-mono overflow-hidden">
            <span className="truncate max-w-[260px]">{activeUrl}</span>
            <button
              onClick={handleCopyLink}
              className="text-emerald-800 hover:text-emerald-950 font-sans font-bold flex items-center gap-1 shrink-0 ml-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-2">
          {qrSrc && (
            <a
              href={qrSrc}
              download="afzal_charitable_trust_qr.png"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Image (PNG)</span>
            </a>
          )}
          <button
            onClick={handlePrint}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Event Poster</span>
          </button>
        </div>
      </div>
    </div>
  );
};
