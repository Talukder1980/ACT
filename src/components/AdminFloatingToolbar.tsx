import React, { useState } from 'react';
import { ShieldCheck, Lock, Edit3, Settings, LogOut, ChevronUp, ChevronDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const AdminFloatingToolbar: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    setIsAdminPanelOpen, 
    setIsLoginModalOpen, 
    logoutAdmin,
    openAdminTab 
  } = useContent();

  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside 
      aria-label="Administrative controls"
      className="fixed bottom-20 left-4 z-40 flex flex-col items-start gap-1 select-none no-print"
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="p-2 rounded-full bg-stone-900/90 text-amber-400 hover:text-white shadow-lg border border-stone-700 transition-all hover:scale-105"
          title="Open Admin CMS Bar"
        >
          <Settings className="w-4 h-4" />
        </button>
      ) : (
        <div className="bg-stone-950/95 text-white p-2 rounded-2xl shadow-2xl border border-stone-800 backdrop-blur-md flex items-center gap-2 text-xs animate-in slide-in-from-left duration-200">
          <div className="flex items-center gap-1.5 pl-1.5">
            <span className={`w-2 h-2 rounded-full ${isAdminLoggedIn ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="font-bold text-[11px] tracking-wide text-stone-300">
              {isAdminLoggedIn ? 'CMS Active' : 'Admin'}
            </span>
          </div>

          <div className="h-4 w-px bg-stone-800" />

          {isAdminLoggedIn ? (
            <>
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                className="px-2.5 py-1 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
                title="Open CMS Editor"
              >
                <Edit3 className="w-3 h-3 text-amber-300" />
                <span>Edit Site</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="p-1 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-2.5 py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-[11px] flex items-center gap-1 transition-colors"
              title="Sign in with Trustee Passkey"
            >
              <Lock className="w-3 h-3" />
              <span>Sign In (admin2026)</span>
            </button>
          )}

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-stone-500 hover:text-stone-300 rounded"
            title="Minimize"
          >
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      )}
    </aside>
  );
};
