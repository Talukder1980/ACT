import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Facebook, Twitter, Linkedin, ExternalLink } from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  url?: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  title = 'Share Afzal Charitable Trust Impact',
  text = 'Support Afzal Charitable Trust: Transforming lives across Bangladesh through education, healthcare, and poverty relief.',
  url = window.location.href
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${text}\n`);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      href: `https://api.whatsapp.com/send?text=${encodedText}${encodedUrl}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-stone-900 hover:bg-stone-800 text-white',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-sky-700 hover:bg-sky-800 text-white',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${text}\n${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">{title}</h3>
              <p className="text-xs text-stone-500">Inspire others to join our humanitarian mission</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-xl p-1"
            aria-label="Close share dialog"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs text-stone-600 italic border-l-2 border-emerald-700 pl-3 py-1 mb-5 bg-stone-50 rounded-r">
            "{text}"
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {shareLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-100">
            <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Direct Link:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={url}
                className="w-full text-xs font-mono bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 text-stone-700 outline-none select-all"
              />
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
