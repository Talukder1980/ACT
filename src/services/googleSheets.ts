/**
 * Google Sheets API v4 Service for Afzal Charitable Trust Master Database
 * Handles multi-tab spreadsheet provisioning, batch syncing, and row appending.
 */

import { 
  DonationRecord, 
  MemberRecord, 
  VolunteerRegistration, 
  PurchasedGiftCard, 
  SubscriberRecord,
  Pillar,
  Campaign,
  Notice,
  GeneralContent
} from '../types';

export interface SyncDataPayload {
  donations: DonationRecord[];
  memberships: MemberRecord[];
  volunteers: VolunteerRegistration[];
  giftCards: PurchasedGiftCard[];
  subscribers: SubscriberRecord[];
  pillars: Pillar[];
  campaigns: Campaign[];
  notices: Notice[];
  general: GeneralContent;
}

export const SHEETS_TABS = [
  'Donations_Pledges',
  'Lifetime_Memberships',
  'Volunteer_Corps',
  'Gift_Certificates',
  'Newsletter_Subscribers',
  'Trust_16_Pillars',
  'Relief_Campaigns',
  'Official_Notices',
  'Trust_Settings'
];

/**
 * Creates a brand new Master Database Spreadsheet with styled separate tabs
 */
export async function createMasterSpreadsheet(accessToken: string, customTitle?: string): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  const title = customTitle || `Afzal Charitable Trust - Master Database 2026`;

  const requestBody = {
    properties: {
      title
    },
    sheets: SHEETS_TABS.map((tabName, index) => ({
      properties: {
        sheetId: index + 1,
        title: tabName,
        gridProperties: {
          frozenRowCount: 1
        }
      }
    }))
  };

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create Google Spreadsheet: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return {
    spreadsheetId: result.spreadsheetId,
    spreadsheetUrl: result.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${result.spreadsheetId}/edit`
  };
}

/**
 * Writes/Updates all 9 separate sheets in the Master Google Spreadsheet in one batch
 */
export async function syncAllDataToGoogleSheets(
  accessToken: string, 
  spreadsheetId: string, 
  payload: SyncDataPayload
): Promise<{ totalUpdatedCells: number }> {

  // 1. Donations Values
  const donationValues = [
    ['Receipt No', 'Date', 'Donor Name', 'Donor Email', 'Donor Phone', 'Amount (BDT)', 'Campaign / Cause', 'Payment Method', 'Status', 'Anonymous'],
    ...payload.donations.map(d => [
      d.receiptNo,
      d.date,
      d.donorName,
      d.donorEmail || '',
      d.donorPhone || '',
      d.amountBDT,
      d.campaignTitle,
      d.paymentMethod || 'bKash Online',
      d.status || 'Verified',
      d.isAnonymous ? 'Yes' : 'No'
    ])
  ];

  // 2. Memberships Values
  const membershipValues = [
    ['Member ID', 'Certificate Serial', 'Full Name', 'Email', 'Phone', 'District', 'Occupation', 'Blood Group', 'Fee (BDT)', 'Registration Date', 'Status'],
    ...payload.memberships.map(m => [
      m.memberId,
      m.certificateSerial,
      m.fullName,
      m.email,
      m.phone,
      m.district,
      m.occupation,
      m.bloodGroup,
      m.membershipFeeBDT,
      m.registrationDate,
      m.status
    ])
  ];

  // 3. Volunteers Values
  const volunteerValues = [
    ['Volunteer ID', 'Full Name', 'Email', 'Phone', 'District', 'Primary Expertise', 'Secondary Skills', 'Selected Focus Pillars', 'Availability', 'Joined Date', 'Motivation Note'],
    ...payload.volunteers.map(v => [
      v.volunteerId,
      v.fullName,
      v.email,
      v.phone,
      v.district,
      v.primaryExpertise,
      v.secondarySkills || '',
      Array.isArray(v.selectedFocusAreas) ? v.selectedFocusAreas.join('; ') : v.selectedFocusAreas,
      v.availability,
      v.joinedDate,
      v.motivationNote || ''
    ])
  ];

  // 4. Gift Cards Values
  const giftCardValues = [
    ['Certificate Number', 'Voucher Code', 'Tier', 'Amount (USD)', 'Approx (BDT)', 'Charitable Cause', 'Pillar', 'Sender Name', 'Sender Email', 'Recipient Name', 'Recipient Email', 'Purchased At'],
    ...payload.giftCards.map(g => [
      g.certificateNumber,
      g.voucherCode,
      g.tierName,
      g.amountUSD,
      g.approxBDT,
      g.charitableCause,
      g.causePillar,
      g.purchaserName,
      g.purchaserEmail,
      g.recipientName,
      g.recipientEmail,
      g.datePurchased
    ])
  ];

  // 5. Subscribers Values
  const subscriberValues = [
    ['Subscriber ID', 'Email Address', 'Date Subscribed', 'Source'],
    ...payload.subscribers.map(s => [
      s.id,
      s.email,
      s.subscribedAt,
      s.source
    ])
  ];

  // 6. 16 Core Pillars
  const pillarValues = [
    ['Pillar ID', 'Title', 'Category', 'Impact Metrics', 'Summary', 'Narrative Description'],
    ...payload.pillars.map(p => [
      p.id,
      p.title,
      p.category,
      p.impactMetrics,
      p.summary,
      p.description
    ])
  ];

  // 7. Campaigns
  const campaignValues = [
    ['Campaign ID', 'Title', 'Category', 'Target (BDT)', 'Raised (BDT)', 'Donors Count', 'Urgency', 'Beneficiaries Target'],
    ...payload.campaigns.map(c => [
      c.id,
      c.title,
      c.category,
      c.targetBDT,
      c.raisedBDT,
      c.donorsCount,
      c.urgency,
      c.beneficiaries
    ])
  ];

  // 8. Notices
  const noticeValues = [
    ['Notice ID', 'Reference No', 'Title', 'Category', 'Publish Date', 'Content', 'Attachment Name'],
    ...payload.notices.map(n => [
      n.id,
      n.refNo,
      n.title,
      n.category,
      n.date,
      n.content,
      n.attachmentName || ''
    ])
  ];

  // 9. Trust Settings & Secretariat
  const settingsValues = [
    ['Setting Key', 'Value', 'Description'],
    ['trustName', payload.general.trustName, 'Official Registered Institution Name'],
    ['establishedYear', payload.general.establishedYear, 'Year Founded & Chartered'],
    ['motto', payload.general.motto, 'Institutional Core Motto'],
    ['trustDeedReg', payload.general.trustDeedReg, 'Government Trust Registration Deed'],
    ['taxExemptSRO', payload.general.taxExemptSRO, 'NBR SRO Tax Exemption Law'],
    ['hotlinePhone', payload.general.hotlinePhone, 'Trust Help & Relief Helpline'],
    ['contactEmail', payload.general.contactEmail, 'Secretariat Inquiries Email'],
    ['supportGmail', payload.general.supportGmail || 'support.afzaltrust@gmail.com', 'Dedicated Support & Database Gmail Account'],
    ['hqAddress', payload.general.hqAddress, 'Secretariat & Headquarters Address'],
    ['bankName', payload.general.bankName, 'Designated Operating Bank'],
    ['bankBranch', payload.general.bankBranch, 'Bank Branch'],
    ['accountNumber', payload.general.accountNumber, 'Official Bank Account Number'],
    ['routingNumber', payload.general.routingNumber, 'Electronic Fund Routing Number'],
    ['swiftCode', payload.general.swiftCode, 'SWIFT / BIC Code'],
    ['bkashMerchant', payload.general.bkashMerchant, 'bKash MFS Merchant Number']
  ];

  const dataRanges = [
    { range: 'Donations_Pledges!A1', values: donationValues },
    { range: 'Lifetime_Memberships!A1', values: membershipValues },
    { range: 'Volunteer_Corps!A1', values: volunteerValues },
    { range: 'Gift_Certificates!A1', values: giftCardValues },
    { range: 'Newsletter_Subscribers!A1', values: subscriberValues },
    { range: 'Trust_16_Pillars!A1', values: pillarValues },
    { range: 'Relief_Campaigns!A1', values: campaignValues },
    { range: 'Official_Notices!A1', values: noticeValues },
    { range: 'Trust_Settings!A1', values: settingsValues }
  ];

  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: dataRanges
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to batch sync data to Google Sheets: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return {
    totalUpdatedCells: result.totalUpdatedCells || 0
  };
}

/**
 * Appends a single row to a given sheet tab (e.g. on new donation, member, or volunteer)
 */
export async function appendRowToGoogleSheet(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
  rowValues: any[]
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [rowValues]
        })
      }
    );

    return response.ok;
  } catch (error) {
    console.error(`Error appending row to Google Sheet ${sheetName}:`, error);
    return false;
  }
}
