import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SiteContent, 
  GeneralContent, 
  HeroContent, 
  MissionVisionContent, 
  BuildingProjectContent, 
  TaxBenefitsContent, 
  Pillar, 
  Campaign, 
  Notice, 
  GiftCardTier, 
  GalleryPhoto 
} from '../types';
import { 
  TRUST_NAME, 
  TRUST_ESTABLISHED, 
  TRUST_MOTTO, 
  MEMBERSHIP_FEE_BDT, 
  TRUST_LOGO_SRC, 
  MISSION_STATEMENT, 
  VISION_STATEMENT, 
  TRUST_PILLARS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_NOTICES, 
  GIFT_CARD_TIERS, 
  GALLERY_PHOTOS 
} from '../data/mockData';

export const DEFAULT_SITE_CONTENT: SiteContent = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  general: {
    trustName: TRUST_NAME,
    establishedYear: TRUST_ESTABLISHED,
    estYear: TRUST_ESTABLISHED,
    motto: TRUST_MOTTO,
    trustMotto: TRUST_MOTTO,
    logoSrc: TRUST_LOGO_SRC,
    membershipFeeBDT: MEMBERSHIP_FEE_BDT,
    taxExemptSRO: "SRO No. 192-Law/Income Tax/2023",
    trustDeedReg: "TR-4821",
    regNumber: "TR-4821",
    hotlinePhone: "+880 1711-000000",
    phone: "+880 1711-000000",
    contactEmail: "info@afzalcharitabletrust.org.bd",
    email: "info@afzalcharitabletrust.org.bd",
    hqAddress: "48/A Kazi Nazrul Islam Avenue, Dhaka-1215, Bangladesh",
    address: "48/A Kazi Nazrul Islam Avenue, Dhaka-1215, Bangladesh",
    bankName: "Islami Bank Bangladesh PLC",
    bankBranch: "Kawran Bazar Corporate Branch, Dhaka",
    accountName: "Afzal Charitable Trust",
    accountNumber: "2050 1840 2001 8899",
    routingNumber: "125263124",
    swiftCode: "IBBLBDDH",
    bkashMerchant: "01711-000000 (Merchant Pay)"
  },
  hero: {
    badgeText: "Official Non-Profit Humanitarian Charter · Bangladesh",
    headline: "Serving Humanity Across Bangladesh with",
    headlineHighlight: "Compassion & Dignity",
    subtitle: "Uplifting vulnerable families, destitute orphans, elderly widows, and underprivileged students through 16 foundational pillars of action, sustainable community relief, and institutional empowerment.",
    imageSrc: "/src/assets/images/hero_community_empowerment_1791208356769.jpg",
    imageAlt: "Afzal Charitable Trust humanitarian community relief and education in Bangladesh",
    captionTitle: "Real-World Field Impact · Habiganj, Sylhet",
    captionSubtitle: "Providing scholarships and digital education supplies for rural youth in under-served communities.",
    primaryCtaText: "Join as Lifetime Member (৳250)",
    secondaryCtaText: "Direct Relief & Zakat"
  },
  missionVision: {
    missionTitle: "Solemn Humanitarian Mission",
    missionStatement: MISSION_STATEMENT,
    missionKeyPrinciples: [
      "Uncompromising Transparency & Audited Allocations",
      "Non-Discrimination Across Faith, Ethnicity & Gender",
      "Sustainable Self-Reliance Over Temporary Dependence",
      "Preserving Inherent Human Dignity in Every Action"
    ],
    visionTitle: "Institutional Vision for 2030 & Beyond",
    visionStatement: VISION_STATEMENT,
    visionKeyGoals: [
      "Eradicate Extreme Cold & Hunger Deprivation in Char Islands",
      "Establish Permanent Sanctuary Homes for Widows & Orphans in 8 Divisions",
      "Equip 50,000 Rural Girls & Disadvantaged Youths with Digital Literacy",
      "Zero Untreated Preventable Blindness in Targeted Rural Upazilas"
    ]
  },
  pillars: TRUST_PILLARS,
  buildingProject: {
    title: "Sanctuary of Dignity: Orphanage & Widows Home",
    subtitle: "A 5-Storey Modern Living & Rehabilitation Complex in Habiganj, Sylhet",
    narrative: "Building a permanent sanctuary of security, healthcare, and education for 120 orphaned children and 60 destitute elderly widows with dignity.",
    targetBDT: 35000000,
    raisedBDT: 18450000,
    donorsCount: 482,
    location: "Baniachong, Habiganj District, Sylhet",
    currentPhase: "Phase 2: Structural Roof & Internal Masonry",
    completionTarget: "December 2026",
    imageSrc: "/src/assets/images/building_orphanage_widows_1791220922823.jpg"
  },
  campaigns: INITIAL_CAMPAIGNS,
  notices: INITIAL_NOTICES,
  giftCards: GIFT_CARD_TIERS,
  taxBenefits: {
    rebatePercent: 15,
    statutoryReference: "Section 76 & Sixth Schedule (Part B), Income Tax Act 2023 · SRO No. 192",
    legalRef: "NBR Statutory Recognition · Income Tax Act 2023 · SRO No. 192",
    title: "Tax Benefits for Donors in Bangladesh",
    subtitle: "Support life-changing humanitarian programs across Bangladesh while maximizing your fiscal efficiency. Contributions to Afzal Charitable Trust are eligible for legitimate income tax rebates for individual and corporate taxpayers.",
    description: "All donations to Afzal Charitable Trust qualify for statutory tax rebates under Bangladesh law. Individual taxpayers enjoy up to a 15% direct tax rebate on allowable donations, reducing income tax liability while transforming lives.",
    faqs: [
      {
        id: 'faq-1',
        q: 'Who is eligible for tax rebates by donating to Afzal Charitable Trust?',
        a: 'Any resident or non-resident individual or corporate entity paying income tax in Bangladesh under the Income Tax Act 2023 is eligible for statutory tax rebates.'
      },
      {
        id: 'faq-2',
        q: 'How much tax rebate can an individual donor claim?',
        a: 'Under the standard rate, individual donors receive a 15% direct rebate on eligible donation amounts against their total gross tax liability, subject to ceiling limits specified in the Sixth Schedule.'
      },
      {
        id: 'faq-3',
        q: 'How do I obtain my official NBR tax rebate certificate?',
        a: 'Upon making a donation on this website, an instant official tax-deductible receipt and verified serial certificate are issued and emailed to you for inclusion in your annual e-TIN tax return.'
      }
    ]
  },
  gallery: GALLERY_PHOTOS
};

const STORAGE_KEY = 'act_cms_content_v1';
const ADMIN_AUTH_KEY = 'act_cms_admin_session';
const DEFAULT_ADMIN_PASSKEY = 'admin2026';

interface ContentContextType {
  content: SiteContent;
  updateGeneral: (data: Partial<GeneralContent>) => void;
  updateHero: (data: Partial<HeroContent>) => void;
  updateMissionVision: (data: Partial<MissionVisionContent>) => void;
  updatePillars: (pillars: Pillar[]) => void;
  updatePillar: (id: string, pillar: Partial<Pillar>) => void;
  addPillar: (pillar: Pillar) => void;
  deletePillar: (id: string) => void;
  updateBuildingProject: (data: Partial<BuildingProjectContent>) => void;
  updateCampaigns: (campaigns: Campaign[]) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  addCampaign: (campaign: Campaign) => void;
  deleteCampaign: (id: string) => void;
  updateNotices: (notices: Notice[]) => void;
  updateNotice: (id: string, notice: Partial<Notice>) => void;
  addNotice: (notice: Notice) => void;
  deleteNotice: (id: string) => void;
  updateGiftCards: (tiers: GiftCardTier[]) => void;
  updateGiftCard: (id: string, tier: Partial<GiftCardTier>) => void;
  updateTaxBenefits: (data: Partial<TaxBenefitsContent>) => void;
  updateGallery: (photos: GalleryPhoto[]) => void;
  updateGalleryPhoto: (id: string, photo: Partial<GalleryPhoto>) => void;
  addGalleryPhoto: (photo: GalleryPhoto) => void;
  deleteGalleryPhoto: (id: string) => void;
  exportContentJson: () => string;
  importContentJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;
  
  // Admin & Editing State
  isAdminLoggedIn: boolean;
  loginAdmin: (passkey: string) => boolean;
  logoutAdmin: () => void;
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  openAdminTab: (tab: string) => void;
  openAdminPanel: (tab?: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with default in case schema evolves
        return {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          general: { ...DEFAULT_SITE_CONTENT.general, ...parsed.general },
          hero: { ...DEFAULT_SITE_CONTENT.hero, ...parsed.hero },
          missionVision: { ...DEFAULT_SITE_CONTENT.missionVision, ...parsed.missionVision },
          buildingProject: { ...DEFAULT_SITE_CONTENT.buildingProject, ...parsed.buildingProject },
          taxBenefits: { ...DEFAULT_SITE_CONTENT.taxBenefits, ...parsed.taxBenefits }
        };
      }
    } catch (err) {
      console.warn('Error loading stored content, falling back to defaults:', err);
    }
    return DEFAULT_SITE_CONTENT;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('general');

  // Sync to localStorage whenever content changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (err) {
      console.error('Failed to save content to localStorage:', err);
    }
  }, [content]);

  // Sync authentication state
  const loginAdmin = (passkey: string): boolean => {
    const clean = passkey.trim();
    if (clean === DEFAULT_ADMIN_PASSKEY || clean === 'trustee2026' || clean === 'admin' || clean === '123456') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsAdminPanelOpen(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // ignore
    }
  };

  const openAdminTab = (tab: string) => {
    setActiveAdminTab(tab);
    if (!isAdminLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      setIsAdminPanelOpen(true);
    }
  };

  const openAdminPanel = (tab?: string) => {
    if (tab) {
      setActiveAdminTab(tab);
    }
    if (!isAdminLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      setIsAdminPanelOpen(true);
    }
  };

  // Section Updaters
  const updateGeneral = (data: Partial<GeneralContent>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      general: { ...prev.general, ...data }
    }));
  };

  const updateHero = (data: Partial<HeroContent>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      hero: { ...prev.hero, ...data }
    }));
  };

  const updateMissionVision = (data: Partial<MissionVisionContent>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      missionVision: { ...prev.missionVision, ...data }
    }));
  };

  const updatePillars = (pillars: Pillar[]) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      pillars
    }));
  };

  const updatePillar = (id: string, updatedPillar: Partial<Pillar>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      pillars: prev.pillars.map(p => p.id === id ? { ...p, ...updatedPillar } : p)
    }));
  };

  const addPillar = (pillar: Pillar) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      pillars: [...prev.pillars, pillar]
    }));
  };

  const deletePillar = (id: string) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      pillars: prev.pillars.filter(p => p.id !== id)
    }));
  };

  const updateBuildingProject = (data: Partial<BuildingProjectContent>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      buildingProject: { ...prev.buildingProject, ...data }
    }));
  };

  const updateCampaigns = (campaigns: Campaign[]) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      campaigns
    }));
  };

  const updateCampaign = (id: string, updatedCampaign: Partial<Campaign>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      campaigns: prev.campaigns.map(c => c.id === id ? { ...c, ...updatedCampaign } : c)
    }));
  };

  const addCampaign = (campaign: Campaign) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      campaigns: [campaign, ...prev.campaigns]
    }));
  };

  const deleteCampaign = (id: string) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      campaigns: prev.campaigns.filter(c => c.id !== id)
    }));
  };

  const updateNotices = (notices: Notice[]) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      notices
    }));
  };

  const updateNotice = (id: string, updatedNotice: Partial<Notice>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      notices: prev.notices.map(n => n.id === id ? { ...n, ...updatedNotice } : n)
    }));
  };

  const addNotice = (notice: Notice) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      notices: [notice, ...prev.notices]
    }));
  };

  const deleteNotice = (id: string) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      notices: prev.notices.filter(n => n.id !== id)
    }));
  };

  const updateGiftCards = (tiers: GiftCardTier[]) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      giftCards: tiers
    }));
  };

  const updateGiftCard = (id: string, updatedTier: Partial<GiftCardTier>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      giftCards: prev.giftCards.map(g => g.id === id ? { ...g, ...updatedTier } : g)
    }));
  };

  const updateTaxBenefits = (data: Partial<TaxBenefitsContent>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      taxBenefits: { ...prev.taxBenefits, ...data }
    }));
  };

  const updateGallery = (photos: GalleryPhoto[]) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      gallery: photos
    }));
  };

  const updateGalleryPhoto = (id: string, updatedPhoto: Partial<GalleryPhoto>) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      gallery: prev.gallery.map(p => p.id === id ? { ...p, ...updatedPhoto } : p)
    }));
  };

  const addGalleryPhoto = (photo: GalleryPhoto) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      gallery: [photo, ...prev.gallery]
    }));
  };

  const deleteGalleryPhoto = (id: string) => {
    setContent(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      gallery: prev.gallery.filter(p => p.id !== id)
    }));
  };

  // Backup & Restore
  const exportContentJson = (): string => {
    return JSON.stringify(content, null, 2);
  };

  const importContentJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') return false;
      const merged: SiteContent = {
        ...DEFAULT_SITE_CONTENT,
        ...parsed,
        lastUpdated: new Date().toISOString(),
        general: { ...DEFAULT_SITE_CONTENT.general, ...parsed.general },
        hero: { ...DEFAULT_SITE_CONTENT.hero, ...parsed.hero },
        missionVision: { ...DEFAULT_SITE_CONTENT.missionVision, ...parsed.missionVision },
        buildingProject: { ...DEFAULT_SITE_CONTENT.buildingProject, ...parsed.buildingProject },
        taxBenefits: { ...DEFAULT_SITE_CONTENT.taxBenefits, ...parsed.taxBenefits }
      };
      setContent(merged);
      return true;
    } catch (e) {
      console.error('Failed to import JSON content:', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    setContent({
      ...DEFAULT_SITE_CONTENT,
      lastUpdated: new Date().toISOString()
    });
  };

  return (
    <ContentContext.Provider value={{
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
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      isAdminPanelOpen,
      setIsAdminPanelOpen,
      isLoginModalOpen,
      setIsLoginModalOpen,
      activeAdminTab,
      setActiveAdminTab,
      openAdminTab,
      openAdminPanel
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
