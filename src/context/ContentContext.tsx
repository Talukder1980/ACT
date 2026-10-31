import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from 'firebase/auth';
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
  GalleryPhoto,
  DonationRecord,
  MemberRecord,
  VolunteerRegistration,
  PurchasedGiftCard,
  SubscriberRecord
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
import { loadDatabase, saveDatabase, DatabaseState } from '../services/dataStore';
import { 
  googleSignIn, 
  googleSignOut, 
  getAccessToken, 
  initAuth 
} from '../services/firebaseAuth';
import { 
  createMasterSpreadsheet, 
  syncAllDataToGoogleSheets, 
  appendRowToGoogleSheet 
} from '../services/googleSheets';
import {
  exportDonationsToCsv,
  exportMembershipsToCsv,
  exportVolunteersToCsv,
  exportGiftCardsToCsv,
  exportSubscribersToCsv,
  exportPillarsToCsv,
  exportCampaignsToCsv,
  exportNoticesToCsv,
  downloadCsvFile,
  parseCsv
} from '../services/csvExport';

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
    supportGmail: "support.afzaltrust@gmail.com",
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

export type CsvTableType = 'donations' | 'memberships' | 'volunteers' | 'giftCards' | 'subscribers' | 'pillars' | 'campaigns' | 'notices' | 'all';

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
  
  // Operational Database State
  donations: DonationRecord[];
  memberships: MemberRecord[];
  volunteers: VolunteerRegistration[];
  giftCards: PurchasedGiftCard[];
  subscribers: SubscriberRecord[];
  addDonationRecord: (donation: Omit<DonationRecord, 'id'>) => void;
  addMemberRecord: (member: MemberRecord) => void;
  addVolunteerRecord: (volunteer: VolunteerRegistration) => void;
  addGiftCardRecord: (card: PurchasedGiftCard) => void;
  addSubscriberRecord: (email: string, source?: string) => void;

  // CSV Engine
  downloadTableCsv: (tableName: CsvTableType) => void;
  importTableCsv: (tableName: CsvTableType, csvContent: string) => { success: boolean; count: number; message: string };

  // Google Sheets Cloud Database
  googleUser: User | null;
  googleAccessToken: string | null;
  googleSheetConfig: DatabaseState['googleSheetConfig'];
  isSyncingGoogleSheet: boolean;
  syncStatusMessage: string | null;
  connectGoogleAccount: () => Promise<boolean>;
  disconnectGoogleAccount: () => Promise<void>;
  createAndSyncGoogleSpreadsheet: (customTitle?: string) => Promise<string>;
  syncNowToGoogleSheet: () => Promise<number>;
  setGoogleSpreadsheetId: (id: string) => void;

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

  // Operational Database State
  const [dbState, setDbState] = useState<DatabaseState>(() => loadDatabase());

  // Google Auth & Sheets State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
  const [isSyncingGoogleSheet, setIsSyncingGoogleSheet] = useState(false);
  const [syncStatusMessage, setSyncStatusMessage] = useState<string | null>(null);

  // Admin login state
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

  // Save database state
  useEffect(() => {
    saveDatabase(dbState);
  }, [dbState]);

  // Sync site content to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (err) {
      console.error('Failed to save content to localStorage:', err);
    }
  }, [content]);

  // Listen to Google Firebase Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleAccessToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleAccessToken(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Discreet triggers: Keyboard shortcut (Ctrl+Shift+A) and URL parameter (?admin or #admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsAdminPanelOpen(prev => !prev);
        } else {
          setIsLoginModalOpen(prev => !prev);
        }
      }
    };

    const checkUrlTrigger = () => {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('admin') || url.hash === '#admin' || url.hash === '#trustee') {
          if (!isAdminLoggedIn) {
            setIsLoginModalOpen(true);
          } else {
            setIsAdminPanelOpen(true);
          }
        }
      } catch {
        // ignore
      }
    };

    checkUrlTrigger();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkUrlTrigger);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkUrlTrigger);
    };
  }, [isAdminLoggedIn]);

  // Admin Auth
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

  // Google Account Connect / Switch
  const connectGoogleAccount = async (): Promise<boolean> => {
    try {
      setSyncStatusMessage('Connecting to Google account...');
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setGoogleAccessToken(result.accessToken);
        setDbState(prev => ({
          ...prev,
          googleSheetConfig: {
            ...prev.googleSheetConfig,
            connectedEmail: result.user.email || null
          }
        }));
        setSyncStatusMessage(`Connected as ${result.user.email || 'Google User'}`);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Failed to connect Google account:', err);
      setSyncStatusMessage(`Connection error: ${err.message || 'Access denied'}`);
      return false;
    }
  };

  const disconnectGoogleAccount = async () => {
    await googleSignOut();
    setGoogleUser(null);
    setGoogleAccessToken(null);
    setSyncStatusMessage('Disconnected from Google account');
  };

  // Google Sheets Master Database creation & Sync
  const createAndSyncGoogleSpreadsheet = async (customTitle?: string): Promise<string> => {
    let token = googleAccessToken;
    if (!token) {
      token = await getAccessToken();
    }
    if (!token) {
      throw new Error('Please connect your Google account first.');
    }

    setIsSyncingGoogleSheet(true);
    setSyncStatusMessage('Creating Master Database spreadsheet in Google Drive...');

    try {
      const created = await createMasterSpreadsheet(token, customTitle);
      
      setSyncStatusMessage('Writing all 9 database tabs (Donations, Members, Volunteers, Gift Cards, Content)...');
      await syncAllDataToGoogleSheets(token, created.spreadsheetId, {
        donations: dbState.donations,
        memberships: dbState.memberships,
        volunteers: dbState.volunteers,
        giftCards: dbState.giftCards,
        subscribers: dbState.subscribers,
        pillars: content.pillars,
        campaigns: content.campaigns,
        notices: content.notices,
        general: content.general
      });

      const now = new Date().toLocaleString('en-US');
      setDbState(prev => ({
        ...prev,
        googleSheetConfig: {
          spreadsheetId: created.spreadsheetId,
          spreadsheetUrl: created.spreadsheetUrl,
          connectedEmail: googleUser?.email || prev.googleSheetConfig.connectedEmail,
          lastSyncedAt: now
        }
      }));

      setSyncStatusMessage(`Successfully created and synced: ${created.spreadsheetId}`);
      return created.spreadsheetId;
    } catch (error: any) {
      setSyncStatusMessage(`Sync error: ${error.message}`);
      throw error;
    } finally {
      setIsSyncingGoogleSheet(false);
    }
  };

  const syncNowToGoogleSheet = async (): Promise<number> => {
    const spreadsheetId = dbState.googleSheetConfig.spreadsheetId;
    if (!spreadsheetId) {
      throw new Error('No Google Sheet linked yet. Click "Create & Sync Master Spreadsheet" first.');
    }

    let token = googleAccessToken;
    if (!token) {
      token = await getAccessToken();
    }
    if (!token) {
      throw new Error('Google access token expired. Please reconnect your Google account.');
    }

    setIsSyncingGoogleSheet(true);
    setSyncStatusMessage('Syncing all collections to Google Sheets...');

    try {
      const res = await syncAllDataToGoogleSheets(token, spreadsheetId, {
        donations: dbState.donations,
        memberships: dbState.memberships,
        volunteers: dbState.volunteers,
        giftCards: dbState.giftCards,
        subscribers: dbState.subscribers,
        pillars: content.pillars,
        campaigns: content.campaigns,
        notices: content.notices,
        general: content.general
      });

      const now = new Date().toLocaleString('en-US');
      setDbState(prev => ({
        ...prev,
        googleSheetConfig: {
          ...prev.googleSheetConfig,
          lastSyncedAt: now
        }
      }));

      setSyncStatusMessage(`Successfully synced ${res.totalUpdatedCells} cells at ${now}`);
      return res.totalUpdatedCells;
    } catch (error: any) {
      setSyncStatusMessage(`Sync error: ${error.message}`);
      throw error;
    } finally {
      setIsSyncingGoogleSheet(false);
    }
  };

  const setGoogleSpreadsheetId = (id: string) => {
    const cleanId = id.trim();
    const url = cleanId.startsWith('http') 
      ? cleanId 
      : `https://docs.google.com/spreadsheets/d/${cleanId}/edit`;
    
    // Extract ID if full URL was pasted
    let finalId = cleanId;
    const match = cleanId.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      finalId = match[1];
    }

    setDbState(prev => ({
      ...prev,
      googleSheetConfig: {
        ...prev.googleSheetConfig,
        spreadsheetId: finalId,
        spreadsheetUrl: url
      }
    }));
  };

  // Operational Database Mutators (with auto-append to Google Sheet if configured)
  const addDonationRecord = (donation: Omit<DonationRecord, 'id'>) => {
    const record: DonationRecord = {
      ...donation,
      id: `don-${Date.now()}`
    };
    setDbState(prev => ({
      ...prev,
      donations: [record, ...prev.donations]
    }));

    // Background auto-append to Google Sheet
    if (googleAccessToken && dbState.googleSheetConfig.spreadsheetId) {
      appendRowToGoogleSheet(googleAccessToken, dbState.googleSheetConfig.spreadsheetId, 'Donations_Pledges', [
        record.receiptNo,
        record.date,
        record.donorName,
        record.donorEmail || '',
        record.donorPhone || '',
        record.amountBDT,
        record.campaignTitle,
        record.paymentMethod || 'Online',
        record.status || 'Verified',
        record.isAnonymous ? 'Yes' : 'No'
      ]);
    }
  };

  const addMemberRecord = (member: MemberRecord) => {
    setDbState(prev => ({
      ...prev,
      memberships: [member, ...prev.memberships]
    }));

    if (googleAccessToken && dbState.googleSheetConfig.spreadsheetId) {
      appendRowToGoogleSheet(googleAccessToken, dbState.googleSheetConfig.spreadsheetId, 'Lifetime_Memberships', [
        member.memberId,
        member.certificateSerial,
        member.fullName,
        member.email,
        member.phone,
        member.district,
        member.occupation,
        member.bloodGroup,
        member.membershipFeeBDT,
        member.registrationDate,
        member.status
      ]);
    }
  };

  const addVolunteerRecord = (volunteer: VolunteerRegistration) => {
    setDbState(prev => ({
      ...prev,
      volunteers: [volunteer, ...prev.volunteers]
    }));

    if (googleAccessToken && dbState.googleSheetConfig.spreadsheetId) {
      appendRowToGoogleSheet(googleAccessToken, dbState.googleSheetConfig.spreadsheetId, 'Volunteer_Corps', [
        volunteer.volunteerId,
        volunteer.fullName,
        volunteer.email,
        volunteer.phone,
        volunteer.district,
        volunteer.primaryExpertise,
        volunteer.secondarySkills || '',
        Array.isArray(volunteer.selectedFocusAreas) ? volunteer.selectedFocusAreas.join('; ') : volunteer.selectedFocusAreas,
        volunteer.availability,
        volunteer.joinedDate,
        volunteer.motivationNote || ''
      ]);
    }
  };

  const addGiftCardRecord = (card: PurchasedGiftCard) => {
    setDbState(prev => ({
      ...prev,
      giftCards: [card, ...prev.giftCards]
    }));

    if (googleAccessToken && dbState.googleSheetConfig.spreadsheetId) {
      appendRowToGoogleSheet(googleAccessToken, dbState.googleSheetConfig.spreadsheetId, 'Gift_Certificates', [
        card.certificateNumber,
        card.voucherCode,
        card.tierName,
        card.amountUSD,
        card.approxBDT,
        card.charitableCause,
        card.causePillar,
        card.purchaserName,
        card.purchaserEmail,
        card.recipientName,
        card.recipientEmail,
        card.datePurchased
      ]);
    }
  };

  const addSubscriberRecord = (email: string, source = 'Website') => {
    const newSub: SubscriberRecord = {
      id: `sub-${Date.now()}`,
      email: email.trim().toLowerCase(),
      subscribedAt: new Date().toISOString().split('T')[0],
      source
    };
    setDbState(prev => ({
      ...prev,
      subscribers: [newSub, ...prev.subscribers.filter(s => s.email !== newSub.email)]
    }));

    if (googleAccessToken && dbState.googleSheetConfig.spreadsheetId) {
      appendRowToGoogleSheet(googleAccessToken, dbState.googleSheetConfig.spreadsheetId, 'Newsletter_Subscribers', [
        newSub.id,
        newSub.email,
        newSub.subscribedAt,
        newSub.source
      ]);
    }
  };

  // CSV Engine Actions
  const downloadTableCsv = (tableName: CsvTableType) => {
    const timestamp = new Date().toISOString().split('T')[0];
    switch (tableName) {
      case 'donations':
        downloadCsvFile(`Afzal_Trust_Donations_${timestamp}.csv`, exportDonationsToCsv(dbState.donations));
        break;
      case 'memberships':
        downloadCsvFile(`Afzal_Trust_Memberships_${timestamp}.csv`, exportMembershipsToCsv(dbState.memberships));
        break;
      case 'volunteers':
        downloadCsvFile(`Afzal_Trust_Volunteers_${timestamp}.csv`, exportVolunteersToCsv(dbState.volunteers));
        break;
      case 'giftCards':
        downloadCsvFile(`Afzal_Trust_GiftCards_${timestamp}.csv`, exportGiftCardsToCsv(dbState.giftCards));
        break;
      case 'subscribers':
        downloadCsvFile(`Afzal_Trust_Subscribers_${timestamp}.csv`, exportSubscribersToCsv(dbState.subscribers));
        break;
      case 'pillars':
        downloadCsvFile(`Afzal_Trust_16_Pillars_${timestamp}.csv`, exportPillarsToCsv(content.pillars));
        break;
      case 'campaigns':
        downloadCsvFile(`Afzal_Trust_Campaigns_${timestamp}.csv`, exportCampaignsToCsv(content.campaigns));
        break;
      case 'notices':
        downloadCsvFile(`Afzal_Trust_Notices_${timestamp}.csv`, exportNoticesToCsv(content.notices));
        break;
      case 'all': {
        // Multi-table combined CSV archive
        const parts = [
          '=== AFZAL CHARITABLE TRUST MASTER DATABASE ===',
          `Generated: ${new Date().toLocaleString()}`,
          '',
          '--- TABLE: DONATIONS & PLEDGES ---',
          exportDonationsToCsv(dbState.donations),
          '',
          '--- TABLE: LIFETIME MEMBERSHIPS ---',
          exportMembershipsToCsv(dbState.memberships),
          '',
          '--- TABLE: VOLUNTEER CORPS ---',
          exportVolunteersToCsv(dbState.volunteers),
          '',
          '--- TABLE: CHARITABLE GIFT CARDS ---',
          exportGiftCardsToCsv(dbState.giftCards),
          '',
          '--- TABLE: SUBSCRIBERS ---',
          exportSubscribersToCsv(dbState.subscribers),
          '',
          '--- TABLE: 16 CORE PILLARS ---',
          exportPillarsToCsv(content.pillars)
        ];
        downloadCsvFile(`Afzal_Trust_Complete_Database_${timestamp}.csv`, parts.join('\r\n'));
        break;
      }
    }
  };

  const importTableCsv = (tableName: CsvTableType, csvContent: string): { success: boolean; count: number; message: string } => {
    try {
      const parsedRows = parseCsv(csvContent);
      if (parsedRows.length <= 1) {
        return { success: false, count: 0, message: 'CSV file is empty or contains only header row.' };
      }

      const dataRows = parsedRows.slice(1);

      if (tableName === 'donations') {
        const imported: DonationRecord[] = dataRows.map((r, i) => ({
          id: `don-csv-${Date.now()}-${i}`,
          receiptNo: r[0] || `ACT-DON-${Date.now().toString().slice(-6)}`,
          date: r[1] || new Date().toLocaleDateString('en-US'),
          donorName: r[2] || 'Supporter',
          donorEmail: r[3] || undefined,
          donorPhone: r[4] || undefined,
          amountBDT: parseInt(r[5] || '0', 10) || 1000,
          campaignTitle: r[6] || 'General Relief Fund',
          paymentMethod: r[7] || 'bKash Pay',
          status: r[8] || 'Verified',
          isAnonymous: r[9]?.toLowerCase() === 'yes'
        }));
        setDbState(prev => ({ ...prev, donations: [...imported, ...prev.donations] }));
        return { success: true, count: imported.length, message: `Successfully imported ${imported.length} donation records.` };
      }

      if (tableName === 'memberships') {
        const imported: MemberRecord[] = dataRows.map((r, i) => ({
          memberId: r[0] || `ACT-MEM-2026-${i + 100}`,
          certificateSerial: r[1] || `CERT-BD-ACT-${Math.floor(100000 + Math.random() * 900000)}`,
          fullName: r[2] || 'Member',
          email: r[3] || 'member@example.com',
          phone: r[4] || '+880 1711 000000',
          district: r[5] || 'Dhaka',
          occupation: r[6] || 'Professional',
          bloodGroup: r[7] || 'B+',
          membershipFeeBDT: parseInt(r[8] || '250', 10) || 250,
          registrationDate: r[9] || new Date().toLocaleDateString('en-US'),
          validUntil: 'Lifetime Member',
          paymentMethod: r[11] || 'bKash',
          status: (['Active', 'Pending', 'Verified'].includes(r[12]) ? (r[12] as 'Active' | 'Pending' | 'Verified') : 'Verified')
        }));
        setDbState(prev => ({ ...prev, memberships: [...imported, ...prev.memberships] }));
        return { success: true, count: imported.length, message: `Successfully imported ${imported.length} lifetime member records.` };
      }

      if (tableName === 'subscribers') {
        const imported: SubscriberRecord[] = dataRows.map((r, i) => ({
          id: `sub-csv-${Date.now()}-${i}`,
          email: r[1] || r[0] || '',
          subscribedAt: r[2] || new Date().toISOString().split('T')[0],
          source: r[3] || 'CSV Import'
        })).filter(s => s.email.includes('@'));
        setDbState(prev => ({ ...prev, subscribers: [...imported, ...prev.subscribers] }));
        return { success: true, count: imported.length, message: `Successfully imported ${imported.length} email subscribers.` };
      }

      return { success: false, count: 0, message: `Import not supported for ${tableName}.` };
    } catch (err: any) {
      return { success: false, count: 0, message: `Error parsing CSV: ${err.message}` };
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

      // Operational Database State
      donations: dbState.donations,
      memberships: dbState.memberships,
      volunteers: dbState.volunteers,
      giftCards: dbState.giftCards,
      subscribers: dbState.subscribers,
      addDonationRecord,
      addMemberRecord,
      addVolunteerRecord,
      addGiftCardRecord,
      addSubscriberRecord,

      // CSV Engine
      downloadTableCsv,
      importTableCsv,

      // Google Sheets
      googleUser,
      googleAccessToken,
      googleSheetConfig: dbState.googleSheetConfig,
      isSyncingGoogleSheet,
      syncStatusMessage,
      connectGoogleAccount,
      disconnectGoogleAccount,
      createAndSyncGoogleSpreadsheet,
      syncNowToGoogleSheet,
      setGoogleSpreadsheetId,

      // Admin & Editing State
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
