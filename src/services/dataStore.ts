/**
 * Central Operational Database Store for Afzal Charitable Trust
 * Tracks Donations, Memberships, Volunteers, Gift Cards, and Subscribers with LocalStorage & Auto-Sync
 */

import { 
  DonationRecord, 
  MemberRecord, 
  VolunteerRegistration, 
  PurchasedGiftCard, 
  SubscriberRecord 
} from '../types';
import { INITIAL_RECENT_DONORS } from '../data/mockData';

const DB_STORAGE_KEY = 'act_operational_database_v1';

export interface DatabaseState {
  donations: DonationRecord[];
  memberships: MemberRecord[];
  volunteers: VolunteerRegistration[];
  giftCards: PurchasedGiftCard[];
  subscribers: SubscriberRecord[];
  googleSheetConfig: {
    spreadsheetId: string | null;
    spreadsheetUrl: string | null;
    connectedEmail: string | null;
    lastSyncedAt: string | null;
  };
}

export const INITIAL_DATABASE: DatabaseState = {
  donations: [
    {
      id: 'don-001',
      receiptNo: 'ACT-DON-2026-0891',
      date: 'October 28, 2026',
      donorName: 'Dr. Rafiqul Islam & Family',
      donorEmail: 'dr.rafiq@example.com',
      donorPhone: '+880 1711 234567',
      amountBDT: 25000,
      campaignTitle: 'Free Cataract Surgeries & Mobile Clinic',
      paymentMethod: 'bKash Merchant Pay',
      status: 'Verified',
      isAnonymous: false
    },
    {
      id: 'don-002',
      receiptNo: 'ACT-DON-2026-0892',
      date: 'October 29, 2026',
      donorName: 'Ayesha Siddiqua',
      donorEmail: 'ayesha.s@example.com',
      donorPhone: '+880 1819 889900',
      amountBDT: 5000,
      campaignTitle: 'Rural Girls STEM Education Classrooms',
      paymentMethod: 'Nagad Pay',
      status: 'Verified',
      isAnonymous: false
    },
    {
      id: 'don-003',
      receiptNo: 'ACT-DON-2026-0893',
      date: 'October 30, 2026',
      donorName: 'Anonymous Supporter (London)',
      donorEmail: 'diaspora.donor@example.co.uk',
      amountBDT: 15000,
      campaignTitle: 'Emergency Flood Relief & Food Hampers',
      paymentMethod: 'Islami Bank Direct Wire',
      status: 'Verified',
      isAnonymous: true
    },
    {
      id: 'don-004',
      receiptNo: 'ACT-DON-2026-0894',
      date: 'October 30, 2026',
      donorName: 'Engr. Tanvir Ahmed',
      donorEmail: 'tanvir.eng@example.com',
      amountBDT: 10000,
      campaignTitle: 'Third-Gender Micro-Enterprise Grants',
      paymentMethod: 'bKash Merchant Pay',
      status: 'Verified',
      isAnonymous: false
    },
    {
      id: 'don-005',
      receiptNo: 'ACT-DON-2026-0895',
      date: 'October 31, 2026',
      donorName: 'Shamsul Alam Chowdhury',
      donorEmail: 'shamsul.c@example.com',
      amountBDT: 50000,
      campaignTitle: 'Emergency Flood Relief & Food Hampers',
      paymentMethod: 'Bank Transfer (IBBL)',
      status: 'Verified',
      isAnonymous: false
    }
  ],
  memberships: [
    {
      memberId: 'ACT-MEM-2026-0101',
      certificateSerial: 'CERT-BD-ACT-884910',
      fullName: 'Tahmina Begum',
      email: 'tahmina.begum@example.com',
      phone: '+880 1711 234567',
      district: 'Habiganj, Sylhet',
      occupation: 'School Educator',
      bloodGroup: 'A+',
      registrationDate: 'January 14, 2026',
      validUntil: 'Lifetime Member',
      membershipFeeBDT: 250,
      paymentMethod: 'bKash Pay',
      status: 'Verified'
    },
    {
      memberId: 'ACT-MEM-2026-0102',
      certificateSerial: 'CERT-BD-ACT-884911',
      fullName: 'Kamrul Hasan',
      email: 'kamrul.hasan@example.com',
      phone: '+880 1819 345678',
      district: 'Dhaka',
      occupation: 'Software Engineer',
      bloodGroup: 'B+',
      registrationDate: 'February 02, 2026',
      validUntil: 'Lifetime Member',
      membershipFeeBDT: 250,
      paymentMethod: 'Nagad Pay',
      status: 'Verified'
    },
    {
      memberId: 'ACT-MEM-2026-0103',
      certificateSerial: 'CERT-BD-ACT-884912',
      fullName: 'Dr. Nusrat Jahan',
      email: 'nusrat.jahan@example.com',
      phone: '+880 1912 456789',
      district: 'Chattogram',
      occupation: 'Medical Doctor',
      bloodGroup: 'O+',
      registrationDate: 'March 18, 2026',
      validUntil: 'Lifetime Member',
      membershipFeeBDT: 250,
      paymentMethod: 'bKash Pay',
      status: 'Verified'
    }
  ],
  volunteers: [
    {
      volunteerId: 'ACT-VOL-2026-0042',
      fullName: 'Nasir Uddin',
      email: 'nasir.volunteer@example.com',
      phone: '+880 1712 998877',
      district: 'Kurigram',
      primaryExpertise: 'Disaster Rescue & Water Sanitation',
      secondarySkills: 'First Aid Certified, Speedboat Operator',
      selectedFocusAreas: ['Poverty Relief', 'Medical and Healthcare Assistance', 'Volunteering'],
      availability: 'Emergency / Rapid Deployment',
      motivationNote: 'Dedicated to serving river erosion victims and northern cold wave affected char residents.',
      joinedDate: 'February 2026'
    },
    {
      volunteerId: 'ACT-VOL-2026-0043',
      fullName: 'Fatema Tuz Zohra',
      email: 'fatema.zohra@example.com',
      phone: '+880 1814 112233',
      district: 'Sylhet',
      primaryExpertise: 'Teaching & Digital Literacy',
      secondarySkills: 'Graphic Design & Children Counseling',
      selectedFocusAreas: ['Education, Research and Scholarships', 'Cyber and Digital Literacy'],
      availability: 'Weekends Only',
      motivationNote: 'Desire to provide coding classes and English coaching to orphan children in Habiganj.',
      joinedDate: 'March 2026'
    }
  ],
  giftCards: [
    {
      cardId: 'GC-2026-7841',
      certificateNumber: 'ACT-GC-2026-7841',
      voucherCode: 'ACT-HOPE-8842',
      amountUSD: 25,
      approxBDT: 3000,
      tierName: 'Visionary Healer',
      charitableCause: 'Restoring Elderly Sight & Cataract Surgery',
      causeCategory: 'Healthcare & Mobility',
      causePillar: 'Pillar 02',
      purchaserName: 'Imran Hossain',
      purchaserEmail: 'imran.hossain@example.com',
      recipientName: 'Farhana Ahmed',
      recipientEmail: 'farhana.a@example.com',
      deliveryOption: 'both',
      personalMessage: 'Wishing you happiness on your birthday through the gift of sight for a grandmother.',
      datePurchased: 'October 25, 2026',
      colorTheme: 'Emerald',
      fontStyleClass: 'font-mono uppercase',
      fontFamilyName: 'JetBrains Mono',
      paymentMethod: 'Credit Card',
      emailDispatchedAt: 'October 25, 2026'
    }
  ],
  subscribers: [
    { id: 'sub-1', email: 'supporter1@gmail.com', subscribedAt: '2026-10-15', source: 'Website Footer' },
    { id: 'sub-2', email: 'diaspora.usa@yahoo.com', subscribedAt: '2026-10-20', source: 'Newsletter Modal' },
    { id: 'sub-3', email: 'dhaka.volunteer@gmail.com', subscribedAt: '2026-10-27', source: 'Membership Form' }
  ],
  googleSheetConfig: {
    spreadsheetId: null,
    spreadsheetUrl: null,
    connectedEmail: null,
    lastSyncedAt: null
  }
};

export function loadDatabase(): DatabaseState {
  try {
    const raw = localStorage.getItem(DB_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...INITIAL_DATABASE,
        ...parsed,
        googleSheetConfig: {
          ...INITIAL_DATABASE.googleSheetConfig,
          ...(parsed.googleSheetConfig || {})
        }
      };
    }
  } catch (err) {
    console.error('Failed to parse database from localStorage:', err);
  }
  return INITIAL_DATABASE;
}

export function saveDatabase(db: DatabaseState) {
  try {
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.error('Failed to save database to localStorage:', err);
  }
}
