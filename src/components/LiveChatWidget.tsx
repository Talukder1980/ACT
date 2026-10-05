import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Sparkles, 
  Phone, 
  Check, 
  ExternalLink,
  Award,
  Heart,
  HelpCircle,
  Clock
} from 'lucide-react';
import { TrustLogo } from './TrustLogo';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'whatsapp' | 'messenger'>('whatsapp');
  const [userMessage, setUserMessage] = useState('');
  const [quickSentNotice, setQuickSentNotice] = useState(false);

  // Trust Contact Config
  const TRUST_WHATSAPP_NUMBER = '8801712000000'; // Bangladesh format
  const TRUST_MESSENGER_PAGE = 'afzalcharitabletrust'; // Facebook Page Username / ID

  const quickPrompts = [
    {
      id: 'building',
      label: 'Orphanage & Widows Home Gift',
      text: 'Hello, I want to dedicate a special gift (bricks/room endowment) for the Orphanage & Widows Home Building Project.'
    },
    {
      id: 'membership',
      label: '৳250 Membership & Certificate',
      text: 'Hello Afzal Charitable Trust, I would like guidance on completing my ৳250 Lifetime Membership and obtaining my verified Member Certificate.'
    },
    {
      id: 'donation',
      label: 'Donation Confirmation & bKash',
      text: 'Hello, I would like to make/confirm a donation to the ongoing humanitarian relief fund via bKash/Nagad.'
    },
    {
      id: 'scholarship',
      label: 'Scholarship Application',
      text: 'Hello, I am interested in applying for the 2026 Academic Meritorious Scholarship program announced on the Notice Board.'
    },
    {
      id: 'volunteer',
      label: 'Volunteer Enrollment',
      text: 'Peace be upon you. I would like to join the Afzal Charitable Trust nationwide youth volunteer corps.'
    }
  ];

  const handleSend = (platform: 'whatsapp' | 'messenger', textToSend?: string) => {
    const message = (textToSend || userMessage).trim() || 'Hello Afzal Charitable Trust, I am contacting you through your official website.';
    const encoded = encodeURIComponent(message);

    if (platform === 'whatsapp') {
      const url = `https://wa.me/${TRUST_WHATSAPP_NUMBER}?text=${encoded}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Facebook Messenger direct URL
      const url = `https://m.me/${TRUST_MESSENGER_PAGE}?ref=${encodeURIComponent('web_chat')}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    setQuickSentNotice(true);
    setTimeout(() => setQuickSentNotice(false), 3000);
  };

  return (
    <div className="no-print fixed bottom-5 right-4 sm:right-6 z-40 font-sans">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-[#0f5132] hover:bg-emerald-900 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-amber-400 focus:outline-none focus:ring-4 focus:ring-emerald-700/30"
            aria-label="Open Live Chat on WhatsApp and Messenger"
          >
            {/* Dual Icons: WhatsApp & Messenger */}
            <div className="flex items-center -space-x-1.5">
              <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs border border-white">
                <MessageCircle className="w-4 h-4 fill-white" />
              </span>
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs border border-white">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.45 5.513 3.722 7.185V22l3.418-1.875c.917.254 1.888.391 2.86.391 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.008 12.443l-2.56-2.73-4.996 2.73 5.496-5.836 2.624 2.73 4.932-2.73-5.496 5.836z" />
                </svg>
              </span>
            </div>
            
            <div className="hidden sm:flex flex-col text-left pr-1">
              <span className="text-xs font-bold leading-tight">Chat with Trust</span>
              <span className="text-[10px] text-amber-200">WhatsApp & Messenger</span>
            </div>

            {/* Pulse Indicator */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-white"></span>
            </span>
          </button>
        </div>
      )}

      {/* Chat Box Drawer / Modal */}
      {isOpen && (
        <div 
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-300 w-[calc(100vw-2rem)] sm:w-[380px] overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200"
          style={{ maxHeight: 'min(560px, 85vh)' }}
          role="dialog"
          aria-label="Live Chat Support"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0f5132] to-[#14532d] text-white p-4 sm:p-5 flex items-start justify-between relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <TrustLogo size="sm" variant="seal" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white leading-tight">
                  Afzal Charitable Trust Helpdesk
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-200 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online · Dhaka HQ Secretariat</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Platform Switcher Tabs */}
          <div className="bg-stone-100 p-2 border-b border-stone-200 flex items-center gap-1.5">
            <button
              onClick={() => setActivePlatform('whatsapp')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activePlatform === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Chat</span>
            </button>

            <button
              onClick={() => setActivePlatform('messenger')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activePlatform === 'messenger'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.45 5.513 3.722 7.185V22l3.418-1.875c.917.254 1.888.391 2.86.391 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.008 12.443l-2.56-2.73-4.996 2.73 5.496-5.836 2.624 2.73 4.932-2.73-5.496 5.836z" />
              </svg>
              <span>Messenger</span>
            </button>
          </div>

          {/* Message History & Content */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-stone-50">
            
            {/* Trust Automated Greeting */}
            <div className="flex items-start gap-2.5">
              <TrustLogo size="xs" />
              <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-stone-200 text-xs text-stone-800 shadow-2xs leading-relaxed max-w-[85%]">
                <p className="font-semibold text-emerald-950 mb-1">
                  Assalamu Alaikum & Greetings!
                </p>
                <p>
                  How can we assist you today? You can connect directly with our dedicated trust officers via{' '}
                  <strong className={activePlatform === 'whatsapp' ? 'text-emerald-700' : 'text-blue-700'}>
                    {activePlatform === 'whatsapp' ? 'WhatsApp (+880 1712-000000)' : 'Facebook Messenger'}
                  </strong>.
                </p>
                <div className="text-[10px] text-stone-400 mt-1 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> Average response: &lt; 15 mins
                </div>
              </div>
            </div>

            {/* Quick Inquiry Buttons */}
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Frequently Asked Topics:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => {
                      setUserMessage(prompt.text);
                      handleSend(activePlatform, prompt.text);
                    }}
                    className="p-2.5 bg-white hover:bg-emerald-50/70 border border-stone-200 hover:border-emerald-500 text-stone-800 rounded-xl text-left text-xs transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <span className="group-hover:text-emerald-900 font-medium">{prompt.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>

            {quickSentNotice && (
              <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-xl text-xs flex items-center gap-2 border border-emerald-300 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Redirecting to your {activePlatform === 'whatsapp' ? 'WhatsApp' : 'Messenger'} app...</span>
              </div>
            )}
          </div>

          {/* Interactive Chat Input Box */}
          <div className="p-3 bg-white border-t border-stone-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={
                  activePlatform === 'whatsapp'
                    ? 'Type message to WhatsApp (+880 1712...)'
                    : 'Type message to Messenger...'
                }
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend(activePlatform);
                  }
                }}
                className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              />
              <button
                onClick={() => handleSend(activePlatform)}
                className={`p-2.5 rounded-xl text-white transition-all shadow-sm ${
                  activePlatform === 'whatsapp'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                title={`Send via ${activePlatform === 'whatsapp' ? 'WhatsApp' : 'Messenger'}`}
                aria-label={`Send message on ${activePlatform}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-stone-500 px-1">
              <span>Secure Trust Helpline</span>
              <span>Available 24/7 for Emergency Aid</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
