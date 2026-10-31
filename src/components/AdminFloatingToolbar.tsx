import React, { useState } from 'react';
import { Edit3, Settings, LogOut, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const AdminFloatingToolbar: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    setIsAdminPanelOpen, 
    logoutAdmin 
  } = useContent();

  const [isDismissed, setIsDismissed] = useState(false);

  // COMPLETELY HIDE FROM LIVE WEBSITE FOR REGULAR VISITORS
  if (!isAdminLoggedIn || isDismissed) {
    return null;
  }

  return (
    <aside 
      aria-label="Administrative controls"
      className="fixed bottom-20 left-4 z-40 flex items-center gap-2 select-none no-print animate-in slide-in-from-bottom-2 duration-200"
    >
      <div className="bg-stone-950/95 text-white py-1.5 px-3 rounded-2xl shadow-2xl border border-stone-800 backdrop-blur-md flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-[11px] tracking-wide text-stone-300">
            Trustee Mode
          </span>
        </div>

        <div className="h-4 w-px bg-stone-800" />

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
          title="Log Out Trustee Mode"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 text-stone-500 hover:text-stone-300 rounded"
          title="Hide this bar (press Ctrl+Shift+A to reopen)"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
