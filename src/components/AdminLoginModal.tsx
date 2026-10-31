import React, { useState } from 'react';
import { Lock, ShieldCheck, Key, AlertCircle, ArrowRight, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { TrustLogo } from './TrustLogo';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAdmin, setIsAdminPanelOpen } = useContent();
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passkey);
    if (success) {
      setError(false);
      setIsLoginModalOpen(false);
      setIsAdminPanelOpen(true);
      setPasskey('');
    } else {
      setError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    setPasskey('admin2026');
    const success = loginAdmin('admin2026');
    if (success) {
      setError(false);
      setIsLoginModalOpen(false);
      setIsAdminPanelOpen(true);
      setPasskey('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white relative">
          <button
            onClick={() => {
              setIsLoginModalOpen(false);
              setError(false);
            }}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 block">
                Official Administrative Control
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                Trustee & CMS Portal
              </h3>
            </div>
          </div>
          <p className="text-xs text-white/80 mt-2">
            Authenticate to access live content editing, manage pillars, circulars, donation goals, and institutional data.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Invalid passkey. Use demo passkey <strong>admin2026</strong> below.</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Enter Administrator Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter passkey (e.g. admin2026)"
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  if (error) setError(false);
                }}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                autoFocus
              />
              <Key className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Quick Demo Credential Button for Convenience */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase font-bold">Standard Passkey</span>
              <code className="font-mono text-emerald-950 font-bold">admin2026</code>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              1-Click Fill & Sign In
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-amber-300" />
            <span>Unlock Admin CMS Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center text-[11px] text-stone-500">
          Afzal Charitable Trust · Authorized Board of Trustees Only (TR-4821)
        </div>
      </div>
    </div>
  );
};
