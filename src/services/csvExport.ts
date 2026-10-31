/**
 * CSV Database Export & Import Engine for Afzal Charitable Trust
 * RFC 4180 Compliant with Escaping for commas, quotes, and line breaks
 */

import { 
  DonationRecord, 
  MemberRecord, 
  VolunteerRegistration, 
  PurchasedGiftCard, 
  SubscriberRecord,
  Pillar,
  Campaign,
  Notice 
} from '../types';

export function escapeCsvCell(value: any): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function arrayToCsvRow(cells: any[]): string {
  return cells.map(escapeCsvCell).join(',');
}

export function downloadCsvFile(filename: string, csvContent: string) {
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 1. Donations Table CSV
export function exportDonationsToCsv(donations: DonationRecord[]): string {
  const headers = [
    'Receipt No',
    'Date',
    'Donor Name',
    'Donor Email',
    'Donor Phone',
    'Amount (BDT)',
    'Campaign / Cause',
    'Payment Method',
    'Status',
    'Anonymous'
  ];
  const rows = donations.map(d => [
    d.receiptNo,
    d.date,
    d.donorName,
    d.donorEmail || '',
    d.donorPhone || '',
    d.amountBDT,
    d.campaignTitle,
    d.paymentMethod || 'bKash Online',
    d.status || 'Completed',
    d.isAnonymous ? 'Yes' : 'No'
  ]);
  return [arrayToCsvRow(headers), ...rows.map(arrayToCsvRow)].join('\r\n');
}

// 2. Lifetime Memberships CSV
export function exportMembershipsToCsv(members: MemberRecord[]): string {
  const headers = [
    'Member ID',
    'Certificate Serial',
    'Full Name',
    'Email Address',
    'Phone Number',
    'District / Division',
    'Occupation',
    'Blood Group',
    'Fee (BDT)',
    'Registration Date',
    'Valid Until',
    'Payment Method',
    'Status'
  ];
  const rows = members.map(m => [
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
    m.validUntil,
    m.paymentMethod,
    m.status
  ]);
  return [arrayToCsvRow(headers), ...rows.map(arrayToCsvRow)].join('\r\n');
}

// 3. Volunteer Corps Dossier CSV
export function exportVolunteersToCsv(volunteers: VolunteerRegistration[]): string {
  const headers = [
    'Volunteer ID',
    'Full Name',
    'Email Address',
    'Phone Number',
    'District',
    'Primary Expertise',
    'Secondary Skills',
    'Focus Areas',
    'Availability',
    'Joined Date',
    'Motivation Note'
  ];
  const rows = volunteers.map(v => [
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
  ]);
  return [arrayToCsvRow(headers), ...rows.map(arrayToCsvRow)].join('\r\n');
}

// 4. Charitable Gift Cards CSV
export function exportGiftCardsToCsv(cards: PurchasedGiftCard[]): string {
  const headers = [
    'Certificate Number',
    'Voucher Code',
    'Tier Name',
    'Amount (USD)',
    'Approx (BDT)',
    'Charitable Cause',
    'Cause Pillar',
    'Sender Name',
    'Sender Email',
    'Recipient Name',
    'Recipient Email',
    'Delivery Option',
    'Date Purchased',
    'Payment Method',
    'Message'
  ];
  const rows = cards.map(c => [
    c.certificateNumber,
    c.voucherCode,
    c.tierName,
    c.amountUSD,
    c.approxBDT,
    c.charitableCause,
    c.causePillar,
    c.purchaserName,
    c.purchaserEmail,
    c.recipientName,
    c.recipientEmail,
    c.deliveryOption,
    c.datePurchased,
    c.paymentMethod,
    c.personalMessage
  ]);
  return [arrayToCsvRow(headers), ...rows.map(arrayToCsvRow)].join('\r\n');
}

// 5. Subscribers CSV
export function exportSubscribersToCsv(subscribers: SubscriberRecord[]): string {
  const headers = ['Subscriber ID', 'Email Address', 'Date Subscribed', 'Source'];
  const rows = subscribers.map(s => [
    s.id,
    s.email,
    s.subscribedAt,
    s.source
  ]);
  return [arrayToCsvRow(headers), ...rows.map(arrayToCsvRow)].join('\r\n');
}

// 6. 16 Core Action Pillars CSV
export function exportPillarsToCsv(pillars: Pillar[]): string {
  const headers = ['Pillar ID', 'Title', 'Category', 'Summary', 'Impact Metrics', 'Detailed Description'];
  const rows = pillars.map(p => [
    p.id,
    p.title,
    p.category,
    p.summary,
    p.impactMetrics,
    p.description
  ]);
  return [arrayToCsvRow(headers), ...rows.map(arrayToCsvRow)].join('\r\n');
}

// 7. Relief Campaigns CSV
export function exportCampaignsToCsv(campaigns: Campaign[]): string {
  const headers = ['Campaign ID', 'Title', 'Category', 'Target (BDT)', 'Raised (BDT)', 'Donors Count', 'Urgency', 'Beneficiaries', 'Description'];
  const rows = campaigns.map(c => [
    c.id,
    c.title,
    c.category,
    c.targetBDT,
    c.raisedBDT,
    c.donorsCount,
    c.urgency,
    c.beneficiaries,
    c.description
  ]);
  return [arrayToCsvRow(headers), ...rows.map(arrayToCsvRow)].join('\r\n');
}

// 8. Notices CSV
export function exportNoticesToCsv(notices: Notice[]): string {
  const headers = ['Notice ID', 'Reference No', 'Title', 'Category', 'Publish Date', 'Content', 'Attachment Name'];
  const rows = notices.map(n => [
    n.id,
    n.refNo,
    n.title,
    n.category,
    n.date,
    n.content,
    n.attachmentName || ''
  ]);
  return [arrayToCsvRow(headers), ...rows.map(arrayToCsvRow)].join('\r\n');
}

// CSV Parser supporting quotes and multiline fields
export function parseCsv(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuote = false;

  const text = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if (char === '\n' && !insideQuote) {
      currentRow.push(currentCell.trim());
      if (currentRow.some(cell => cell.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some(cell => cell.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}
