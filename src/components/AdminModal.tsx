import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
  Heart,
  FileText,
  DollarSign,
  Gift,
  Scale,
  Camera,
  Layers,
  HelpCircle,
  Eye,
  Info,
  Database,
  Table,
  Cloud,
  FileSpreadsheet,
  RefreshCw,
  FileDown,
  FileUp,
  Mail,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { useContent, CsvTableType } from '../context/ContentContext';
import { Pillar, Campaign, Notice, GiftCardTier, GalleryPhoto } from '../types';
import { TrustLogo } from './TrustLogo';

export const AdminModal: React.FC = () => {
  const {
    content,
    updateGeneral,
    updateHero,
    updateMissionVision,
    updatePillars,
    updatePillar,
    addPillar,
    deletePillar,
    updateBuildingProject,
    updateCampaigns,
    updateCampaign,
    addCampaign,
    deleteCampaign,
    updateNotices,
    updateNotice,
    addNotice,
    deleteNotice,
    updateGiftCards,
    updateGiftCard,
    updateTaxBenefits,
    updateGallery,
    updateGalleryPhoto,
    addGalleryPhoto,
    deleteGalleryPhoto,
    exportContentJson,
    importContentJson,
    resetToDefaults,
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    logoutAdmin,
    activeAdminTab,
    setActiveAdminTab,

    // Operational Database & Google Sheets
    donations,
    memberships,
    volunteers,
    giftCards,
    subscribers,
    downloadTableCsv,
    importTableCsv,
    googleUser,
    googleAccessToken,
    googleSheetConfig,
    isSyncingGoogleSheet,
    syncStatusMessage,
    connectGoogleAccount,
    disconnectGoogleAccount,
    createAndSyncGoogleSpreadsheet,
    syncNowToGoogleSheet,
    setGoogleSpreadsheetId
  } = useContent();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Database Tab States
  const [customSheetTitle, setCustomSheetTitle] = useState('Afzal Charitable Trust - Master Database 2026');
  const [manualSheetId, setManualSheetId] = useState('');
  const [selectedCsvType, setSelectedCsvType] = useState<CsvTableType>('donations');
  const [csvInputContent, setCsvInputContent] = useState('');
  const [csvResultNotice, setCsvResultNotice] = useState<string | null>(null);

  // Pillar Editor state
  const [editingPillarId, setEditingPillarId] = useState<string | null>(null);
  const [isAddingPillar, setIsAddingPillar] = useState(false);
  const [newPillar, setNewPillar] = useState<Pillar>({
    id: `pillar-${Date.now()}`,
    title: '',
    category: 'Welfare',
    summary: '',
    description: '',
    impactMetrics: '',
    iconName: 'HeartHandshake'
  });

  // Campaign Editor state
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [isAddingCampaign, setIsAddingCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Campaign>({
    id: `camp-${Date.now()}`,
    title: '',
    category: 'Relief Drive',
    description: '',
    targetBDT: 1000000,
    raisedBDT: 250000,
    donorsCount: 45,
    image: '/src/assets/images/project_winter_poverty_aid_1791208410622.jpg',
    beneficiaries: '500 Families',
    urgency: 'High'
  });

  // Notice Editor state
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [newNotice, setNewNotice] = useState<Notice>({
    id: `not-${Date.now()}`,
    refNo: `ACT/GEN/2026/${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    title: '',
    category: 'Circular',
    isUrgent: false,
    excerpt: '',
    content: '',
    signatory: 'Chairman, Board of Trustees'
  });

  // Photo Editor state
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState<GalleryPhoto>({
    id: `gal-${Date.now()}`,
    title: '',
    category: 'Education',
    location: 'Sylhet, Bangladesh',
    date: 'April 2026',
    imageSrc: '/src/assets/images/hero_community_empowerment_1791208356769.jpg',
    caption: '',
    beneficiaryImpact: '250 Beneficiaries'
  });

  if (!isAdminPanelOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportContentJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `afzal-charitable-trust-cms-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Website content exported as JSON file successfully!');
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const success = importContentJson(importJsonText);
    if (success) {
      setImportError(false);
      setImportJsonText('');
      showToast('All website content imported and applied successfully!');
    } else {
      setImportError(true);
    }
  };

  const handleReset = () => {
    resetToDefaults();
    setConfirmResetOpen(false);
    showToast('Website restored to official verified default content.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-stone-50 rounded-3xl max-w-6xl w-full h-[94vh] shadow-2xl border border-stone-300 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Navbar Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-800 text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-base sm:text-lg text-white">
                  Content Management System (Admin CMS)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-[10px] font-mono text-emerald-300 border border-emerald-700">
                  Live Editing
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Afzal Charitable Trust · Changes immediately update the live website and persist in local storage.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminPanelOpen(false)}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Close panel to view live website"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Live Site</span>
            </button>

            <button
              onClick={handleExport}
              className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Export complete backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="p-2 rounded-xl bg-stone-800 hover:bg-rose-900/80 text-stone-400 hover:text-white transition-colors"
              title="Log Out of Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAdminPanelOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="bg-emerald-800 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shrink-0 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-300" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">✕</button>
          </div>
        )}

        {/* Main Workspace: Sidebar Tabs + Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-white border-r border-stone-200 overflow-x-auto md:overflow-y-auto p-3 flex md:flex-col gap-1 shrink-0">
            <span className="hidden md:block text-[10px] uppercase font-bold text-stone-400 px-3 py-1 tracking-wider">
              Website Sections
            </span>

            {[
              { id: 'general', label: '1. General & Contact', icon: Building2 },
              { id: 'hero', label: '2. Hero & Banner', icon: Sparkles },
              { id: 'mission', label: '3. Mission & Vision', icon: FileText },
              { id: 'pillars', label: '4. 16 Core Pillars', icon: Layers },
              { id: 'building', label: '5. Sanctuary Building', icon: Building2 },
              { id: 'campaigns', label: '6. Donation Drives', icon: Heart },
              { id: 'notices', label: '7. Notice Board', icon: Info },
              { id: 'giftcards', label: '8. Gift Cards (6 Tiers)', icon: Gift },
              { id: 'tax', label: '9. Tax Benefits (NBR)', icon: Scale },
              { id: 'gallery', label: '10. Photo Gallery', icon: Camera },
              { id: 'database', label: '11. Cloud Sheets & CSV Database', icon: Database },
              { id: 'backup', label: '12. Backup & Reset', icon: Download },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2.5 whitespace-nowrap ${
                    activeAdminTab === tab.id
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${activeAdminTab === tab.id ? 'text-amber-300' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Form Editor Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
            
            {/* ======================================================== */}
            {/* TAB 1: GENERAL & CONTACT SETTINGS                        */}
            {/* ======================================================== */}
            {activeAdminTab === 'general' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Institutional Identity & Contact Settings
                  </h3>
                  <p className="text-xs text-stone-500">
                    Update the official name, motto, registration numbers, contact hotline, and banking accounts.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-stone-100 pb-2">
                    A. Institutional Identity
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Trust Name</label>
                      <input
                        type="text"
                        value={content.general.trustName}
                        onChange={(e) => {
                          updateGeneral({ trustName: e.target.value });
                          showToast('Trust Name updated');
                        }}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Established Year</label>
                      <input
                        type="text"
                        value={content.general.establishedYear}
                        onChange={(e) => {
                          updateGeneral({ establishedYear: e.target.value });
                          showToast('Established Year updated');
                        }}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Official Motto</label>
                    <input
                      type="text"
                      value={content.general.motto}
                      onChange={(e) => {
                        updateGeneral({ motto: e.target.value });
                        showToast('Motto updated');
                      }}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Trust Deed Registration</label>
                      <input
                        type="text"
                        value={content.general.trustDeedReg}
                        onChange={(e) => updateGeneral({ trustDeedReg: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Tax Exemption SRO Number</label>
                      <input
                        type="text"
                        value={content.general.taxExemptSRO}
                        onChange={(e) => updateGeneral({ taxExemptSRO: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Membership Annual Subscription (BDT)</label>
                    <input
                      type="number"
                      value={content.general.membershipFeeBDT}
                      onChange={(e) => updateGeneral({ membershipFeeBDT: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-stone-100 pb-2">
                    B. Official Contact & Headquarters
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Official Contact Email</label>
                      <input
                        type="email"
                        value={content.general.contactEmail}
                        onChange={(e) => updateGeneral({ contactEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Trust Hotline / Phone</label>
                      <input
                        type="text"
                        value={content.general.hotlinePhone}
                        onChange={(e) => updateGeneral({ hotlinePhone: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Support & Cloud Database Gmail Account
                    </label>
                    <input
                      type="email"
                      value={content.general.supportGmail || ''}
                      onChange={(e) => updateGeneral({ supportGmail: e.target.value })}
                      placeholder="e.g. support.afzaltrust@gmail.com"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Dedicated Gmail account used for donor support communications and Google Sheets database storage.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Physical Headquarters Address</label>
                    <textarea
                      rows={2}
                      value={content.general.hqAddress}
                      onChange={(e) => updateGeneral({ hqAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-stone-100 pb-2">
                    C. Institutional Bank & Mobile MFS Accounts
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={content.general.bankName}
                        onChange={(e) => updateGeneral({ bankName: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Branch Name</label>
                      <input
                        type="text"
                        value={content.general.bankBranch}
                        onChange={(e) => updateGeneral({ bankBranch: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Account Title</label>
                      <input
                        type="text"
                        value={content.general.accountName}
                        onChange={(e) => updateGeneral({ accountName: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        value={content.general.accountNumber}
                        onChange={(e) => updateGeneral({ accountNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Routing Number</label>
                      <input
                        type="text"
                        value={content.general.routingNumber}
                        onChange={(e) => updateGeneral({ routingNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">SWIFT Code</label>
                      <input
                        type="text"
                        value={content.general.swiftCode}
                        onChange={(e) => updateGeneral({ swiftCode: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">bKash / Nagad Merchant</label>
                      <input
                        type="text"
                        value={content.general.bkashMerchant}
                        onChange={(e) => updateGeneral({ bkashMerchant: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: HERO & BANNER EDITOR                              */}
            {/* ======================================================== */}
            {activeAdminTab === 'hero' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Hero Section & Top Visuals
                  </h3>
                  <p className="text-xs text-stone-500">
                    Customize the homepage main headline, subtitle, action buttons, and hero photograph.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Super-Title Badge</label>
                    <input
                      type="text"
                      value={content.hero.badgeText}
                      onChange={(e) => {
                        updateHero({ badgeText: e.target.value });
                        showToast('Hero badge updated');
                      }}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Headline (Prefix)</label>
                      <input
                        type="text"
                        value={content.hero.headline}
                        onChange={(e) => {
                          updateHero({ headline: e.target.value });
                          showToast('Hero headline updated');
                        }}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Headline Highlight (Colored text)</label>
                      <input
                        type="text"
                        value={content.hero.headlineHighlight}
                        onChange={(e) => {
                          updateHero({ headlineHighlight: e.target.value });
                          showToast('Hero headline highlight updated');
                        }}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Hero Subtitle Paragraph</label>
                    <textarea
                      rows={3}
                      value={content.hero.subtitle}
                      onChange={(e) => {
                        updateHero({ subtitle: e.target.value });
                        showToast('Hero subtitle updated');
                      }}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Primary CTA Button Label</label>
                      <input
                        type="text"
                        value={content.hero.primaryCtaText}
                        onChange={(e) => updateHero({ primaryCtaText: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Secondary CTA Button Label</label>
                      <input
                        type="text"
                        value={content.hero.secondaryCtaText}
                        onChange={(e) => updateHero({ secondaryCtaText: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-emerald-900">
                      Hero Image Settings
                    </label>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Hero Image Path / URL</label>
                      <input
                        type="text"
                        value={content.hero.imageSrc}
                        onChange={(e) => {
                          updateHero({ imageSrc: e.target.value });
                          showToast('Hero image path updated');
                        }}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-500">Preset Photos:</span>
                      <button
                        type="button"
                        onClick={() => updateHero({ imageSrc: '/src/assets/images/hero_community_empowerment_1791208356769.jpg' })}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] rounded"
                      >
                        Community Empowerment Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => updateHero({ imageSrc: '/src/assets/images/hero_humanitarian_bangladesh_1791220911416.jpg' })}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] rounded"
                      >
                        Humanitarian Relief Photo
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Caption Title</label>
                        <input
                          type="text"
                          value={content.hero.captionTitle}
                          onChange={(e) => updateHero({ captionTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Caption Description</label>
                        <input
                          type="text"
                          value={content.hero.captionSubtitle}
                          onChange={(e) => updateHero({ captionSubtitle: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: MISSION & VISION                                  */}
            {/* ======================================================== */}
            {activeAdminTab === 'mission' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Mission & Vision Statements
                  </h3>
                  <p className="text-xs text-stone-500">
                    Edit foundational statements, institutional core values, and strategic vision goals.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-stone-100 pb-2">
                    Mission Statement
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Mission Heading</label>
                    <input
                      type="text"
                      value={content.missionVision.missionTitle}
                      onChange={(e) => updateMissionVision({ missionTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Mission Statement</label>
                    <textarea
                      rows={4}
                      value={content.missionVision.missionStatement}
                      onChange={(e) => updateMissionVision({ missionStatement: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-stone-100 pb-2">
                    Vision Statement
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Vision Heading</label>
                    <input
                      type="text"
                      value={content.missionVision.visionTitle}
                      onChange={(e) => updateMissionVision({ visionTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Vision Statement</label>
                    <textarea
                      rows={4}
                      value={content.missionVision.visionStatement}
                      onChange={(e) => updateMissionVision({ visionStatement: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: 16 CORE PILLARS                                   */}
            {/* ======================================================== */}
            {activeAdminTab === 'pillars' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      16 Core Pillars of Action ({content.pillars.length} Active)
                    </h3>
                    <p className="text-xs text-stone-500">
                      Edit any pillar title, category, summary, long description, or impact statistics.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsAddingPillar(true);
                      setEditingPillarId(null);
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 self-start shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Pillar</span>
                  </button>
                </div>

                {/* Add Pillar Form Drawer */}
                {isAddingPillar && (
                  <div className="p-5 bg-white rounded-2xl border-2 border-emerald-600 shadow-md space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-emerald-950">Add New Pillar of Action</h4>
                      <button onClick={() => setIsAddingPillar(false)} className="text-stone-400 hover:text-stone-700">✕</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Pillar Title *</label>
                        <input
                          type="text"
                          required
                          value={newPillar.title}
                          onChange={(e) => setNewPillar({ ...newPillar, title: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                        <select
                          value={newPillar.category}
                          onChange={(e) => setNewPillar({ ...newPillar, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        >
                          <option value="Education">Education</option>
                          <option value="Health">Health</option>
                          <option value="Welfare">Welfare</option>
                          <option value="Empowerment">Empowerment</option>
                          <option value="Global & Society">Global & Society</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Short Summary</label>
                      <input
                        type="text"
                        value={newPillar.summary}
                        onChange={(e) => setNewPillar({ ...newPillar, summary: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Full Mission Description</label>
                      <textarea
                        rows={2}
                        value={newPillar.description}
                        onChange={(e) => setNewPillar({ ...newPillar, description: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Impact Metrics Stat</label>
                      <input
                        type="text"
                        value={newPillar.impactMetrics}
                        onChange={(e) => setNewPillar({ ...newPillar, impactMetrics: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingPillar(false)}
                        className="px-3 py-1.5 bg-stone-100 text-stone-700 text-xs rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newPillar.title.trim()) return;
                          addPillar(newPillar);
                          setIsAddingPillar(false);
                          setNewPillar({
                            id: `pillar-${Date.now()}`,
                            title: '',
                            category: 'Welfare',
                            summary: '',
                            description: '',
                            impactMetrics: '',
                            iconName: 'HeartHandshake'
                          });
                          showToast('New pillar added successfully!');
                        }}
                        className="px-4 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-lg"
                      >
                        Save New Pillar
                      </button>
                    </div>
                  </div>
                )}

                {/* Pillars List */}
                <div className="space-y-3">
                  {content.pillars.map((pillar, idx) => (
                    <div 
                      key={pillar.id}
                      className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-sm text-stone-900">{pillar.title}</span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-[10px] font-semibold text-stone-600">
                            {pillar.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingPillarId(editingPillarId === pillar.id ? null : pillar.id)}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs rounded-lg flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>{editingPillarId === pillar.id ? 'Close' : 'Edit'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete pillar "${pillar.title}"?`)) {
                                deletePillar(pillar.id);
                                showToast('Pillar deleted');
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete Pillar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Summary preview */}
                      <p className="text-xs text-stone-600 pl-8">
                        {pillar.summary}
                      </p>

                      {/* Inline Edit Form for this pillar */}
                      {editingPillarId === pillar.id && (
                        <div className="pt-3 border-t border-stone-100 pl-8 space-y-3 bg-stone-50/70 p-3 rounded-xl mt-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Title</label>
                            <input
                              type="text"
                              value={pillar.title}
                              onChange={(e) => updatePillar(pillar.id, { title: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Category</label>
                              <select
                                value={pillar.category}
                                onChange={(e) => updatePillar(pillar.id, { category: e.target.value as any })}
                                className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                              >
                                <option value="Education">Education</option>
                                <option value="Health">Health</option>
                                <option value="Welfare">Welfare</option>
                                <option value="Empowerment">Empowerment</option>
                                <option value="Global & Society">Global & Society</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Impact Metrics Stat</label>
                              <input
                                type="text"
                                value={pillar.impactMetrics}
                                onChange={(e) => updatePillar(pillar.id, { impactMetrics: e.target.value })}
                                className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Summary</label>
                            <input
                              type="text"
                              value={pillar.summary}
                              onChange={(e) => updatePillar(pillar.id, { summary: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Full Description</label>
                            <textarea
                              rows={2}
                              value={pillar.description}
                              onChange={(e) => updatePillar(pillar.id, { description: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div className="text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingPillarId(null);
                                showToast('Pillar saved!');
                              }}
                              className="px-3 py-1 bg-emerald-800 text-white text-xs font-semibold rounded-md"
                            >
                              Done Editing
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 5: SANCTUARY BUILDING (ORPHANAGE & WIDOWS HOME)      */}
            {/* ======================================================== */}
            {activeAdminTab === 'building' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Sanctuary of Dignity (Orphanage & Widows Home)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Configure the landmark capital construction appeal, progress numbers, and narrative.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Building Project Title</label>
                    <input
                      type="text"
                      value={content.buildingProject.title}
                      onChange={(e) => updateBuildingProject({ title: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={content.buildingProject.subtitle}
                      onChange={(e) => updateBuildingProject({ subtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Story Narrative</label>
                    <textarea
                      rows={3}
                      value={content.buildingProject.narrative}
                      onChange={(e) => updateBuildingProject({ narrative: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Target BDT</label>
                      <input
                        type="number"
                        value={content.buildingProject.targetBDT}
                        onChange={(e) => updateBuildingProject({ targetBDT: parseInt(e.target.value, 10) || 0 })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Current Raised BDT</label>
                      <input
                        type="number"
                        value={content.buildingProject.raisedBDT}
                        onChange={(e) => updateBuildingProject({ raisedBDT: parseInt(e.target.value, 10) || 0 })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Donors Count</label>
                      <input
                        type="number"
                        value={content.buildingProject.donorsCount}
                        onChange={(e) => updateBuildingProject({ donorsCount: parseInt(e.target.value, 10) || 0 })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Site Location</label>
                      <input
                        type="text"
                        value={content.buildingProject.location}
                        onChange={(e) => updateBuildingProject({ location: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Current Construction Phase</label>
                      <input
                        type="text"
                        value={content.buildingProject.currentPhase}
                        onChange={(e) => updateBuildingProject({ currentPhase: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Building Image URL</label>
                    <input
                      type="text"
                      value={content.buildingProject.imageSrc}
                      onChange={(e) => updateBuildingProject({ imageSrc: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 6: DONATION DRIVES & CAMPAIGNS                       */}
            {/* ======================================================== */}
            {activeAdminTab === 'campaigns' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      Active Relief Drives & Campaigns ({content.campaigns.length})
                    </h3>
                    <p className="text-xs text-stone-500">
                      Manage ongoing humanitarian appeals, progress bars, donor counters, and target amounts.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsAddingCampaign(true);
                      setEditingCampaignId(null);
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 self-start shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Campaign</span>
                  </button>
                </div>

                {/* Add Campaign Form Drawer */}
                {isAddingCampaign && (
                  <div className="p-5 bg-white rounded-2xl border-2 border-emerald-600 shadow-md space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-emerald-950">Add New Humanitarian Drive</h4>
                      <button onClick={() => setIsAddingCampaign(false)} className="text-stone-400 hover:text-stone-700">✕</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Campaign Title *</label>
                        <input
                          type="text"
                          required
                          value={newCampaign.title}
                          onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                        <input
                          type="text"
                          value={newCampaign.category}
                          onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Target BDT</label>
                        <input
                          type="number"
                          value={newCampaign.targetBDT}
                          onChange={(e) => setNewCampaign({ ...newCampaign, targetBDT: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Raised BDT</label>
                        <input
                          type="number"
                          value={newCampaign.raisedBDT}
                          onChange={(e) => setNewCampaign({ ...newCampaign, raisedBDT: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Urgency</label>
                        <select
                          value={newCampaign.urgency}
                          onChange={(e) => setNewCampaign({ ...newCampaign, urgency: e.target.value as any })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        >
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Ongoing">Ongoing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={newCampaign.description}
                        onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingCampaign(false)}
                        className="px-3 py-1.5 bg-stone-100 text-stone-700 text-xs rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newCampaign.title.trim()) return;
                          addCampaign(newCampaign);
                          setIsAddingCampaign(false);
                          showToast('New campaign added!');
                        }}
                        className="px-4 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-lg"
                      >
                        Publish Campaign
                      </button>
                    </div>
                  </div>
                )}

                {/* Campaigns List */}
                <div className="space-y-3">
                  {content.campaigns.map((camp) => {
                    const percent = Math.min(100, Math.round((camp.raisedBDT / camp.targetBDT) * 100));
                    return (
                      <div key={camp.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-sm text-stone-900">{camp.title}</span>
                            <span className="ml-2 text-xs text-stone-500 font-mono">({percent}% funded)</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                              {camp.urgency}
                            </span>
                            <button
                              type="button"
                              onClick={() => setEditingCampaignId(editingCampaignId === camp.id ? null : camp.id)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs rounded-lg"
                            >
                              {editingCampaignId === camp.id ? 'Close' : 'Edit'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete campaign "${camp.title}"?`)) {
                                  deleteCampaign(camp.id);
                                  showToast('Campaign deleted');
                                }
                              }}
                              className="p-1 text-stone-400 hover:text-rose-600 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Inline Campaign Editor */}
                        {editingCampaignId === camp.id && (
                          <div className="p-3 bg-stone-50 rounded-xl space-y-3 border border-stone-200">
                            <div>
                              <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Campaign Title</label>
                              <input
                                type="text"
                                value={camp.title}
                                onChange={(e) => updateCampaign(camp.id, { title: e.target.value })}
                                className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div>
                                <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Target BDT</label>
                                <input
                                  type="number"
                                  value={camp.targetBDT}
                                  onChange={(e) => updateCampaign(camp.id, { targetBDT: parseInt(e.target.value, 10) || 0 })}
                                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Raised BDT</label>
                                <input
                                  type="number"
                                  value={camp.raisedBDT}
                                  onChange={(e) => updateCampaign(camp.id, { raisedBDT: parseInt(e.target.value, 10) || 0 })}
                                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Donors Count</label>
                                <input
                                  type="number"
                                  value={camp.donorsCount}
                                  onChange={(e) => updateCampaign(camp.id, { donorsCount: parseInt(e.target.value, 10) || 0 })}
                                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Description</label>
                              <textarea
                                rows={2}
                                value={camp.description}
                                onChange={(e) => updateCampaign(camp.id, { description: e.target.value })}
                                className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 7: NOTICE BOARD & CIRCULARS                          */}
            {/* ======================================================== */}
            {activeAdminTab === 'notices' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      Trust Notice Board & Gazettes ({content.notices.length})
                    </h3>
                    <p className="text-xs text-stone-500">
                      Publish official announcements, scholarship notices, audit reports, and circulars.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsAddingNotice(true);
                      setEditingNoticeId(null);
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 self-start shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Notice</span>
                  </button>
                </div>

                {/* Add Notice Form */}
                {isAddingNotice && (
                  <div className="p-5 bg-white rounded-2xl border-2 border-emerald-600 shadow-md space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-emerald-950">Publish New Official Notice</h4>
                      <button onClick={() => setIsAddingNotice(false)} className="text-stone-400 hover:text-stone-700">✕</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Notice Title *</label>
                        <input
                          type="text"
                          required
                          value={newNotice.title}
                          onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Reference Number</label>
                        <input
                          type="text"
                          value={newNotice.refNo}
                          onChange={(e) => setNewNotice({ ...newNotice, refNo: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Excerpt / Brief Summary</label>
                      <input
                        type="text"
                        value={newNotice.excerpt}
                        onChange={(e) => setNewNotice({ ...newNotice, excerpt: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Full Gazette / Notice Content</label>
                      <textarea
                        rows={3}
                        value={newNotice.content}
                        onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingNotice(false)}
                        className="px-3 py-1.5 bg-stone-100 text-stone-700 text-xs rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newNotice.title.trim()) return;
                          addNotice(newNotice);
                          setIsAddingNotice(false);
                          showToast('Notice published successfully!');
                        }}
                        className="px-4 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-lg"
                      >
                        Publish Official Notice
                      </button>
                    </div>
                  </div>
                )}

                {/* Notices List */}
                <div className="space-y-3">
                  {content.notices.map(notice => (
                    <div key={notice.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[10px] text-stone-400 block">{notice.refNo} · {notice.date}</span>
                          <span className="font-bold text-sm text-stone-900">{notice.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingNoticeId(editingNoticeId === notice.id ? null : notice.id)}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs rounded-lg"
                          >
                            {editingNoticeId === notice.id ? 'Close' : 'Edit'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete notice "${notice.title}"?`)) {
                                deleteNotice(notice.id);
                                showToast('Notice deleted');
                              }
                            }}
                            className="p-1 text-stone-400 hover:text-rose-600 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {editingNoticeId === notice.id && (
                        <div className="p-3 bg-stone-50 rounded-xl space-y-2 border border-stone-200 mt-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-700">Title</label>
                            <input
                              type="text"
                              value={notice.title}
                              onChange={(e) => updateNotice(notice.id, { title: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-700">Full Content</label>
                            <textarea
                              rows={3}
                              value={notice.content}
                              onChange={(e) => updateNotice(notice.id, { content: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 8: GIFT CARDS PAVILION (6 TIERS)                     */}
            {/* ======================================================== */}
            {activeAdminTab === 'giftcards' && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Humanitarian Gift Cards (6 Tiers)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Edit amounts, dedicated charitable causes, impact descriptions, and font styling for each tier.
                  </p>
                </div>

                <div className="space-y-4">
                  {content.giftCards.map((tier) => (
                    <div key={tier.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-black text-stone-900">${tier.amountUSD}</span>
                          <div>
                            <span className="font-bold text-sm text-stone-900 block">{tier.tierName}</span>
                            <span className="text-xs text-stone-500 font-mono">Approx. ৳{tier.approxBDT.toLocaleString()} BDT</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
                          {tier.causePillar}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Tier Name</label>
                          <input
                            type="text"
                            value={tier.tierName}
                            onChange={(e) => updateGiftCard(tier.id, { tierName: e.target.value })}
                            className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Dedicated Charitable Cause</label>
                          <input
                            type="text"
                            value={tier.charitableCause}
                            onChange={(e) => updateGiftCard(tier.id, { charitableCause: e.target.value })}
                            className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Impact Description (What this gift provides)</label>
                        <textarea
                          rows={2}
                          value={tier.impactDescription}
                          onChange={(e) => updateGiftCard(tier.id, { impactDescription: e.target.value })}
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 9: TAX BENEFITS & FAQS                               */}
            {/* ======================================================== */}
            {activeAdminTab === 'tax' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Tax Benefits & NBR Statutory Settings
                  </h3>
                  <p className="text-xs text-stone-500">
                    Configure donor tax rebate rates under the Bangladesh Income Tax Act 2023 and update FAQs.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Standard Rebate Rate (%)</label>
                      <input
                        type="number"
                        value={content.taxBenefits.rebatePercent}
                        onChange={(e) => updateTaxBenefits({ rebatePercent: parseInt(e.target.value, 10) || 0 })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Statutory Reference</label>
                      <input
                        type="text"
                        value={content.taxBenefits.statutoryReference}
                        onChange={(e) => updateTaxBenefits({ statutoryReference: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Tax Exemption Summary Description</label>
                    <textarea
                      rows={3}
                      value={content.taxBenefits.description}
                      onChange={(e) => updateTaxBenefits({ description: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 10: PHOTO GALLERY                                    */}
            {/* ======================================================== */}
            {activeAdminTab === 'gallery' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      Documentary Photo Gallery ({content.gallery.length} Photos)
                    </h3>
                    <p className="text-xs text-stone-500">
                      Manage visual proof-of-impact photographs, locations, and captions.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddingPhoto(true)}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 self-start shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Photo</span>
                  </button>
                </div>

                {/* Add Photo Form */}
                {isAddingPhoto && (
                  <div className="p-5 bg-white rounded-2xl border-2 border-emerald-600 shadow-md space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-emerald-950">Add Documentary Photo</h4>
                      <button onClick={() => setIsAddingPhoto(false)} className="text-stone-400 hover:text-stone-700">✕</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Photo Title *</label>
                        <input
                          type="text"
                          required
                          value={newPhoto.title}
                          onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Location in Bangladesh</label>
                        <input
                          type="text"
                          value={newPhoto.location}
                          onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Image Path / URL</label>
                      <input
                        type="text"
                        value={newPhoto.imageSrc}
                        onChange={(e) => setNewPhoto({ ...newPhoto, imageSrc: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Caption</label>
                      <input
                        type="text"
                        value={newPhoto.caption}
                        onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingPhoto(false)}
                        className="px-3 py-1.5 bg-stone-100 text-stone-700 text-xs rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newPhoto.title.trim()) return;
                          addGalleryPhoto(newPhoto);
                          setIsAddingPhoto(false);
                          showToast('Photo added to gallery!');
                        }}
                        className="px-4 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-lg"
                      >
                        Save Photo
                      </button>
                    </div>
                  </div>
                )}

                {/* Photos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.gallery.map(photo => (
                    <div key={photo.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900">{photo.title}</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove photo "${photo.title}"?`)) {
                              deleteGalleryPhoto(photo.id);
                              showToast('Photo removed');
                            }
                          }}
                          className="text-stone-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="h-32 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                        <img src={photo.imageSrc} alt={photo.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="text-[11px] text-stone-500 flex items-center justify-between">
                        <span>{photo.location}</span>
                        <span>{photo.beneficiaryImpact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 11: CLOUD GOOGLE SHEETS & CSV DATABASE               */}
            {/* ======================================================== */}
            {activeAdminTab === 'database' && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-300">
                      External Database Architecture
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 font-mono text-[10px] font-bold uppercase tracking-wider border border-blue-300">
                      Google Sheets v4 API
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-2">
                    Separate Cloud Database: Google Sheets & CSV Files
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Store, manage, and continuously synchronize all website records (donations, lifetime members, volunteers, gift cards, subscribers, and site content) in a separate Google Sheets database or download individual CSV spreadsheet files.
                  </p>
                </div>

                {/* 1. GOOGLE SHEETS CLOUD DATABASE INTEGRATION */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                        <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-stone-900">
                          Google Sheets Master Database
                        </h4>
                        <p className="text-xs text-stone-500">
                          Multi-tab real-time spreadsheet on Google Drive
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {googleUser ? (
                        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-semibold text-emerald-950">
                            {googleUser.email}
                          </span>
                          <button
                            type="button"
                            onClick={disconnectGoogleAccount}
                            className="text-[11px] text-stone-400 hover:text-rose-600 font-medium ml-1"
                          >
                            Disconnect
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
                          Not Connected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Account Connect Action */}
                  {!googleUser ? (
                    <div className="p-4 bg-gradient-to-r from-emerald-950 to-stone-900 text-white rounded-2xl border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                          Step 1: Connect Support & Database Google Account
                        </span>
                        <p className="text-xs text-stone-300 max-w-lg leading-relaxed">
                          Sign in with Google to grant permission for Google Sheets and Drive. You can select your dedicated support Gmail (<strong className="text-amber-200">{content.general.supportGmail || 'support.afzaltrust@gmail.com'}</strong>) or any other Google account.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={async () => {
                          const ok = await connectGoogleAccount();
                          if (ok) showToast('Google account connected successfully!');
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Connect Support Gmail</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Active Spreadsheet Details */}
                      {googleSheetConfig.spreadsheetId ? (
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                                Linked Google Spreadsheet
                              </span>
                              <div className="font-mono text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-1.5 mt-0.5">
                                <span>{googleSheetConfig.spreadsheetId}</span>
                              </div>
                            </div>

                            <a
                              href={googleSheetConfig.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${googleSheetConfig.spreadsheetId}/edit`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs w-fit"
                            >
                              <span>Open in Google Sheets</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          <div className="text-[11px] text-emerald-900 flex flex-wrap items-center gap-4 pt-1 border-t border-emerald-200/60">
                            <span><strong>Status:</strong> Active & Connected</span>
                            <span><strong>Owner Account:</strong> {googleUser.email}</span>
                            {googleSheetConfig.lastSyncedAt && (
                              <span><strong>Last Full Sync:</strong> {googleSheetConfig.lastSyncedAt}</span>
                            )}
                          </div>
                        </div>
                      ) : null}

                      {/* Sync & Provision Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                          <span className="text-xs font-bold text-stone-900 block">
                            Create Master Spreadsheet
                          </span>
                          <p className="text-[11px] text-stone-500">
                            Creates a fresh Google Spreadsheet in your Drive with 9 dedicated tabs (Donations, Members, Volunteers, Gift Cards, Subscribers, Pillars, etc.) and auto-populates all records.
                          </p>
                          <div className="pt-2">
                            <button
                              type="button"
                              disabled={isSyncingGoogleSheet}
                              onClick={async () => {
                                try {
                                  await createAndSyncGoogleSpreadsheet(customSheetTitle);
                                  showToast('Master Google Spreadsheet created and synced!');
                                } catch (err: any) {
                                  showToast(`Error: ${err.message}`);
                                }
                              }}
                              className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                              <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                              <span>{isSyncingGoogleSheet ? 'Provisioning Spreadsheet...' : 'Create & Sync Master Spreadsheet'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                          <span className="text-xs font-bold text-stone-900 block">
                            Sync All Records Now
                          </span>
                          <p className="text-[11px] text-stone-500">
                            Pushes all current donations, membership registrations, volunteer dossiers, and site pillars to your active Google Spreadsheet.
                          </p>
                          <div className="pt-2">
                            <button
                              type="button"
                              disabled={isSyncingGoogleSheet || !googleSheetConfig.spreadsheetId}
                              onClick={async () => {
                                try {
                                  const count = await syncNowToGoogleSheet();
                                  showToast(`Synced ${count} cells to Google Sheets successfully!`);
                                } catch (err: any) {
                                  showToast(`Error: ${err.message}`);
                                }
                              }}
                              className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                              <RefreshCw className={`w-4 h-4 text-emerald-400 ${isSyncingGoogleSheet ? 'animate-spin' : ''}`} />
                              <span>{isSyncingGoogleSheet ? 'Syncing Tables...' : 'Sync All Tables to Google Sheets'}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Manual Linker */}
                      <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center gap-2">
                        <span className="text-xs font-medium text-stone-600 whitespace-nowrap">
                          Or link existing Sheet ID/URL:
                        </span>
                        <input
                          type="text"
                          value={manualSheetId}
                          onChange={(e) => setManualSheetId(e.target.value)}
                          placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                          className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-mono text-stone-900 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!manualSheetId.trim()) return;
                            setGoogleSpreadsheetId(manualSheetId);
                            setManualSheetId('');
                            showToast('Linked custom Google Spreadsheet!');
                          }}
                          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap"
                        >
                          Link Sheet
                        </button>
                      </div>

                      {syncStatusMessage && (
                        <div className="p-2.5 rounded-xl bg-stone-100 text-[11px] font-mono text-stone-700 flex items-center gap-2">
                          <Info className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                          <span>{syncStatusMessage}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 9 Sheets Tab Directory Overview */}
                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                      Master Spreadsheet Tabs Structure (9 Separate Sheets):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {[
                        { name: 'Donations_Pledges', count: `${donations.length} records` },
                        { name: 'Lifetime_Memberships', count: `${memberships.length} members` },
                        { name: 'Volunteer_Corps', count: `${volunteers.length} volunteers` },
                        { name: 'Gift_Certificates', count: `${giftCards.length} cards` },
                        { name: 'Newsletter_Subscribers', count: `${subscribers.length} emails` },
                        { name: 'Trust_16_Pillars', count: `${content.pillars.length} pillars` },
                        { name: 'Relief_Campaigns', count: `${content.campaigns.length} drives` },
                        { name: 'Official_Notices', count: `${content.notices.length} notices` },
                        { name: 'Trust_Settings', count: '15 keys' },
                      ].map((tab, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                          <span className="font-mono text-[11px] font-medium text-stone-800">{tab.name}</span>
                          <span className="text-[10px] text-stone-500 bg-white px-1.5 py-0.5 rounded border border-stone-200">{tab.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. SEPARATE CSV FILE DATABASE ENGINE */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                      <Table className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        Separate CSV File Database (Instant Downloads)
                      </h4>
                      <p className="text-xs text-stone-500">
                        Export individual database tables as RFC 4180 compliant CSV files with full utf-8 character support
                      </p>
                    </div>
                  </div>

                  {/* Individual CSV Download Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { id: 'donations' as CsvTableType, title: 'Donations Table', filename: 'donations.csv', count: donations.length, label: 'Donation Records' },
                      { id: 'memberships' as CsvTableType, title: 'Memberships Table', filename: 'memberships.csv', count: memberships.length, label: 'Lifetime Members' },
                      { id: 'volunteers' as CsvTableType, title: 'Volunteers Table', filename: 'volunteers.csv', count: volunteers.length, label: 'Corps Registrations' },
                      { id: 'giftCards' as CsvTableType, title: 'Gift Cards Table', filename: 'gift_cards.csv', count: giftCards.length, label: 'Certificates' },
                      { id: 'subscribers' as CsvTableType, title: 'Subscribers Table', filename: 'subscribers.csv', count: subscribers.length, label: 'Email Subscribers' },
                      { id: 'pillars' as CsvTableType, title: '16 Pillars Table', filename: 'pillars.csv', count: content.pillars.length, label: 'Action Pillars' },
                      { id: 'campaigns' as CsvTableType, title: 'Campaigns Table', filename: 'campaigns.csv', count: content.campaigns.length, label: 'Relief Drives' },
                      { id: 'notices' as CsvTableType, title: 'Notices Table', filename: 'notices.csv', count: content.notices.length, label: 'Official Gazettes' }
                    ].map(tbl => (
                      <div key={tbl.id} className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-stone-900">{tbl.title}</span>
                            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {tbl.count}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500 block mt-0.5 font-mono">{tbl.filename}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            downloadTableCsv(tbl.id);
                            showToast(`Downloaded ${tbl.filename}`);
                          }}
                          className="mt-3 w-full py-1.5 px-3 bg-white hover:bg-stone-100 text-stone-800 rounded-xl text-xs font-semibold border border-stone-300 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <FileDown className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Download CSV</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Complete Consolidated Archive Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        downloadTableCsv('all');
                        showToast('Complete Master Database CSV downloaded!');
                      }}
                      className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <Download className="w-4 h-4 text-amber-300" />
                      <span>Download Consolidated Database Archive (All Tables CSV)</span>
                    </button>
                  </div>
                </div>

                {/* 3. CSV IMPORT & RESTORE TOOL */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
                      <FileUp className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        CSV File Import & Table Restorer
                      </h4>
                      <p className="text-xs text-stone-500">
                        Upload or paste comma-separated values to append or restore records into the database
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Select Target Table
                        </label>
                        <select
                          value={selectedCsvType}
                          onChange={(e) => setSelectedCsvType(e.target.value as CsvTableType)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                        >
                          <option value="donations">Donations Table</option>
                          <option value="memberships">Lifetime Memberships Table</option>
                          <option value="subscribers">Newsletter Subscribers Table</option>
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Or Choose Local CSV File
                        </label>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const text = event.target?.result as string;
                                setCsvInputContent(text || '');
                              };
                              reader.readAsText(file);
                            }
                          }}
                          className="w-full text-xs text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Raw CSV Data
                      </label>
                      <textarea
                        rows={4}
                        value={csvInputContent}
                        onChange={(e) => setCsvInputContent(e.target.value)}
                        placeholder="Receipt No,Date,Donor Name,Donor Email,Donor Phone,Amount (BDT),Campaign / Cause,Payment Method,Status,Anonymous&#10;ACT-DON-9921,October 31, 2026,Rahim Uddin,rahim@example.com,+880 1711,5000,Cataract Surgery,bKash,Verified,No"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      {csvResultNotice && (
                        <span className="text-xs font-semibold text-emerald-800">
                          {csvResultNotice}
                        </span>
                      )}
                      <div className="ml-auto">
                        <button
                          type="button"
                          disabled={!csvInputContent.trim()}
                          onClick={() => {
                            const result = importTableCsv(selectedCsvType, csvInputContent);
                            setCsvResultNotice(result.message);
                            if (result.success) {
                              setCsvInputContent('');
                              showToast(result.message);
                            }
                          }}
                          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-colors"
                        >
                          <FileUp className="w-3.5 h-3.5" />
                          <span>Parse & Import Records</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 12: BACKUP, EXPORT & RESET                           */}
            {/* ======================================================== */}
            {activeAdminTab === 'backup' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Backup, Export & Disaster Recovery
                  </h3>
                  <p className="text-xs text-stone-500">
                    Save a full snapshot of your customized website, migrate content to another environment, or restore official defaults.
                  </p>
                </div>

                {/* 1. Export JSON */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span>Export Entire Site Content as JSON</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Downloads a complete, timestamped `.json` file containing all text, pillars, campaigns, notices, and settings.
                  </p>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>Download JSON Content Backup</span>
                  </button>
                </div>

                {/* 2. Import JSON */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                    <Upload className="w-4 h-4 text-blue-700" />
                    <span>Import & Restore Content from JSON</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Paste previously exported JSON content below to restore all website data immediately.
                  </p>
                  {importError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Invalid JSON format. Please verify the code and try again.</span>
                    </div>
                  )}
                  <form onSubmit={handleImport} className="space-y-3">
                    <textarea
                      rows={5}
                      value={importJsonText}
                      onChange={(e) => {
                        setImportJsonText(e.target.value);
                        if (importError) setImportError(false);
                      }}
                      placeholder="Paste JSON content here..."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:bg-white"
                    />
                    <button
                      type="submit"
                      disabled={!importJsonText.trim()}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                    >
                      Apply Imported JSON to Site
                    </button>
                  </form>
                </div>

                {/* 3. Reset to Defaults */}
                <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-rose-950 font-bold text-sm">
                    <RotateCcw className="w-4 h-4 text-rose-700" />
                    <span>Reset Website to Official Default Charter</span>
                  </div>
                  <p className="text-xs text-rose-800">
                    Warning: This will discard all custom changes and restore the website to the official initial state.
                  </p>
                  {confirmResetOpen ? (
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl"
                      >
                        Yes, Confirm Full Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmResetOpen(false)}
                        className="px-3 py-2 bg-white text-stone-700 text-xs font-semibold rounded-xl border border-stone-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmResetOpen(true)}
                      className="px-4 py-2 bg-white hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-xl text-xs font-bold"
                    >
                      Reset to Official Defaults...
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
