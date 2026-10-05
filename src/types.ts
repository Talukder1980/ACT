export interface Pillar {
  id: string;
  title: string;
  category: 'Welfare' | 'Education' | 'Health' | 'Empowerment' | 'Global & Society';
  summary: string;
  description: string;
  impactMetrics: string;
  iconName: string;
}

export interface Notice {
  id: string;
  refNo: string;
  date: string;
  title: string;
  category: 'Scholarship' | 'Tender' | 'Circular' | 'Relief Drive' | 'Annual Report';
  isUrgent?: boolean;
  excerpt: string;
  content: string;
  signatory: string;
}

export interface Campaign {
  id: string;
  title: string;
  category: string;
  description: string;
  targetBDT: number;
  raisedBDT: number;
  donorsCount: number;
  image: string;
  beneficiaries: string;
  urgency: 'High' | 'Ongoing' | 'Critical';
}

export interface DonorContribution {
  id: string;
  name: string;
  amountBDT: number;
  campaignTitle: string;
  timeAgo: string;
  isAnonymous?: boolean;
}

export interface MemberRecord {
  memberId: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  occupation: string;
  bloodGroup: string;
  registrationDate: string;
  validUntil: string;
  membershipFeeBDT: number;
  certificateSerial: string;
  paymentMethod: string;
  status: 'Active' | 'Pending' | 'Verified';
}

export interface GiftCardTier {
  id: string;
  amountUSD: number;
  approxBDT: number;
  tierName: string;
  impactDescription: string;
  bgColorClass: string;
  textColorClass: string;
  accentBorder: string;
  fontStyleClass: string;
  gradient: string;
}

export interface PurchasedGiftCard {
  cardId: string;
  voucherCode: string;
  amountUSD: number;
  approxBDT: number;
  tierName: string;
  purchaserName: string;
  purchaserEmail: string;
  recipientName: string;
  recipientEmail: string;
  personalMessage: string;
  datePurchased: string;
  colorTheme: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Education' | 'Healthcare' | 'Poverty Relief' | 'Empowerment' | 'Environment';
  location: string;
  date: string;
  imageSrc: string;
  caption: string;
  beneficiaryImpact: string;
}

export interface BuildingGiftTier {
  id: string;
  amountUSD: number;
  amountBDT: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  brickCount?: number;
  isPopular?: boolean;
}

export interface BuildingGiftRecord {
  id: string;
  certificateNo: string;
  donorName: string;
  donorEmail: string;
  amountBDT: number;
  amountUSD: number;
  giftTierTitle: string;
  dedicationType: string;
  honoreeName: string;
  message: string;
  date: string;
  plaqueLocation: string;
  isAnonymous?: boolean;
}

export interface VolunteerRegistration {
  volunteerId: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  primaryExpertise: string;
  secondarySkills?: string;
  selectedFocusAreas: string[];
  availability: 'Weekends Only' | 'Emergency / Rapid Deployment' | 'Flexible Weekdays' | 'Remote / Digital Only';
  motivationNote?: string;
  joinedDate: string;
}


