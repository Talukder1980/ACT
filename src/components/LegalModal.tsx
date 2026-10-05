import React, { useState } from 'react';
import { ShieldCheck, FileText, X, Printer, Lock, Scale, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { TRUST_NAME, TRUST_MOTTO } from '../data/mockData';
import { TrustLogo } from './TrustLogo';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <TrustLogo size="xs" variant="seal" />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                Governance, Trust & Legal Compliance
              </span>
              <h3 id="legal-modal-title" className="font-serif font-bold text-base sm:text-lg text-white">
                Official Institutional Policies
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-800 text-xs font-semibold text-white transition-colors"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors text-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 sm:px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'privacy'
                ? 'border-emerald-800 text-emerald-950 bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>Website Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'terms'
                ? 'border-emerald-800 text-emerald-950 bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Terms & Conditions of Service</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
          
          {/* Metadata Banner */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-950">
            <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <strong>Legal Notice:</strong> This document governs your usage of the official web portal of <strong>{TRUST_NAME}</strong> (registered under Deed No. TR-4821, Dhaka, Bangladesh). Effective Date: October 2026.
            </div>
          </div>

          {activeTab === 'privacy' ? (
            /* ==================== PRIVACY POLICY ==================== */
            <div className="space-y-6">
              
              <div className="border-b border-stone-200 pb-3">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                  Website Privacy Policy
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Last Updated: October 2026 · Committed to absolute transparency and data protection.
                </p>
              </div>

              {/* Section 1 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">1</span>
                  <span>Commitment to Supporter Privacy</span>
                </h3>
                <p>
                  At <strong>{TRUST_NAME}</strong>, we consider the trust of our donors, lifetime members, volunteers, and beneficiaries our highest institutional asset. This Privacy Policy details how we collect, safeguard, utilize, and protect personal information provided through our official website (<code className="text-emerald-900 bg-emerald-50 px-1 py-0.5 rounded font-mono text-xs">afzalcharitabletrust.org.bd</code>).
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">2</span>
                  <span>Information We Collect</span>
                </h3>
                <p>When you interact with our web portal, we may collect the following categories of information:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                  <li><strong>Identification & Contact Data:</strong> Full legal name, email address, mobile phone number (WhatsApp enabled), residential district / division in Bangladesh, and occupational background.</li>
                  <li><strong>Philanthropic & Transaction Data:</strong> Contribution amounts (in BDT or USD), dedicated focus area, payment method referenced (bKash, Nagad, Card, Bank Wire), transaction serials, and date of contribution.</li>
                  <li><strong>Membership & Certificate Details:</strong> Lifetime membership subscription data (৳250), blood group, and personalized certificate issuance credentials.</li>
                  <li><strong>Volunteer Credentials:</strong> Areas of professional expertise, skills, emergency deployment availability, and selected focus pillars.</li>
                  <li><strong>Gift Dedications:</strong> Names of honorees, memorial prayers, and recipient email addresses for gift card dispatches.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">3</span>
                  <span>How We Use Your Information</span>
                </h3>
                <p>We process your data exclusively for lawful charitable administration, including:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                  <li>Generating official digital certificates (Membership, Volunteer Passes, Building Memorials, Gift Cards) encoded with authentic scannable QR verification.</li>
                  <li>Issuing official donation receipts and documentation eligible for tax-exemption under National Board of Revenue (NBR) statutory provisions.</li>
                  <li>Mobilizing registered volunteers for emergency flood relief, healthcare camps, and local community aid in designated districts.</li>
                  <li>Sending monthly email updates, financial audit gazettes, and urgent humanitarian relief appeals (with 1-click unsubscribe).</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">4</span>
                  <span>Payment Security & Website-Only Direct Policy</span>
                </h3>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-950 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Direct Website-Only Transaction Mandate</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Supporters will send their gifts, subscriptions, and donations <strong>through this website only</strong>. 
                    {TRUST_NAME} does not store raw credit/debit card numbers or mobile wallet PINs on our servers. 
                    All payment processing is executed via verified bank-grade SSL gateways and verified Trust merchant numbers.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">5</span>
                  <span>Non-Disclosure & Data Protection</span>
                </h3>
                <p>
                  <strong>We never sell, rent, lease, or trade personal supporter information</strong> to commercial marketers, advertising agencies, or political campaigns. Personal data is shared only with certified internal trust trustees, field operations leads, and authorized financial auditing firms under strict confidentiality agreements.
                </p>
              </div>

              {/* Section 6 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">6</span>
                  <span>Donor Anonymity & Public Ledgers</span>
                </h3>
                <p>
                  Supporters who dedicate building gifts, memorial bricks, or general donations have the explicit right to request full anonymity. When the anonymous option is selected, names are withheld from public walls of honor and ledgers, while official receipts are delivered privately to your email.
                </p>
              </div>

              {/* Section 7 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">7</span>
                  <span>Your Data Rights & Contact</span>
                </h3>
                <p>
                  Under applicable laws of Bangladesh, you retain the right to inspect your stored registration record, update contact details, or request total deletion from our newsletter and volunteer registries.
                </p>
                <div className="p-3 bg-stone-100 rounded-xl text-xs space-y-1">
                  <div><strong>Trust Data Protection Desk:</strong> <span className="font-mono">privacy@afzalcharitabletrust.org.bd</span></div>
                  <div><strong>Secretariat:</strong> Trust Bhaban, Level 4, Plot 12, Road 7, Dhanmondi, Dhaka-1205, Bangladesh</div>
                </div>
              </div>

            </div>
          ) : (
            /* ==================== TERMS & CONDITIONS ==================== */
            <div className="space-y-6">
              
              <div className="border-b border-stone-200 pb-3">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                  Terms & Conditions of Service
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Last Updated: October 2026 · Governing all access, contributions, and memberships.
                </p>
              </div>

              {/* Terms Section 1 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">1</span>
                  <span>Acceptance of Agreement</span>
                </h3>
                <p>
                  By accessing, browsing, registering, or transmitting contributions through <code className="text-emerald-900 bg-emerald-50 px-1 py-0.5 rounded font-mono text-xs">afzalcharitabletrust.org.bd</code>, you legally accept and agree to be bound by these Terms and Conditions and our Constitution. If you do not agree, you must refrain from using this website.
                </p>
              </div>

              {/* Terms Section 2 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">2</span>
                  <span>Legal Charter & Institutional Status</span>
                </h3>
                <p>
                  <strong>{TRUST_NAME}</strong> is an authorized, non-profit, non-political philanthropic trust registered under the Trusts Act (Reg. Deed TR-4821) in the People's Republic of Bangladesh. All programs operate strictly under its non-discriminatory humanitarian charter to serve human beings regardless of race, creed, religion, or gender.
                </p>
              </div>

              {/* Terms Section 3 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">3</span>
                  <span>Website-Only Gifting & Anti-Fraud Protection</span>
                </h3>
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-950 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>Fraud Prevention Warning</span>
                  </div>
                  <p className="text-xs text-stone-700">
                    Supporters will send their gifts, building funds, and membership payments <strong>through this official website only</strong>. The Trust never solicits donations via unauthorized personal cash collection agents, unverified third-party bank accounts, or unofficial social media handles. The Trust accepts no legal responsibility for funds sent to unverified personal parties.
                  </p>
                </div>
              </div>

              {/* Terms Section 4 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">4</span>
                  <span>Donations, Membership Fees & Refund Policy</span>
                </h3>
                <p>
                  All contributions made to {TRUST_NAME} (including general relief funds, ৳250 lifetime membership subscriptions, gift card vouchers, and Orphanage & Widows Home building gifts) represent irrevocable philanthropic donations.
                </p>
                <p className="text-stone-600 text-xs">
                  Refunds are granted strictly in the event of an inadvertent technical duplicate transaction or confirmed unauthorized card processing, provided written notice with proof of debit is submitted to <span className="font-mono">accounts@afzalcharitabletrust.org.bd</span> within fourteen (14) calendar days of transaction date.
                </p>
              </div>

              {/* Terms Section 5 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">5</span>
                  <span>Digital Certificates & Credential Integrity</span>
                </h3>
                <p>
                  Certificates issued by this platform (Member Certificates, Dedication Vouchers, Volunteer Passes, and Memorial Plaques) are certified instruments incorporating digital cryptographic serials and online verification QR codes.
                </p>
                <p className="text-stone-600 text-xs">
                  Any digital tampering, falsification of serial numbers, commercial sale of certificates, or unauthorized claims of Trust representation is strictly prohibited and subject to legal prosecution under the Digital Security Act and penal laws of Bangladesh.
                </p>
              </div>

              {/* Terms Section 6 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">6</span>
                  <span>Volunteer Code of Conduct</span>
                </h3>
                <p>
                  Enrolled volunteers serve in an honorary humanitarian capacity. Volunteers agree to uphold compassionate conduct, zero harassment, strict child protection protocols, and total neutrality during aid distributions. {TRUST_NAME} reserves the right to revoke volunteer accreditation passes at its sole discretion upon breach of ethics.
                </p>
              </div>

              {/* Terms Section 7 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">7</span>
                  <span>Intellectual Property & Media Attribution</span>
                </h3>
                <p>
                  All photography, documentary videos, trust logos, texts, gazettes, and architectural renderings are the proprietary property of {TRUST_NAME}. Supporters and media outlets are granted permission to share materials for educational, reporting, and fundraising purposes provided full attribution to <em>{TRUST_NAME}</em> is maintained.
                </p>
              </div>

              {/* Terms Section 8 */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-xs flex items-center justify-center font-mono">8</span>
                  <span>Governing Law & Legal Jurisdiction</span>
                </h3>
                <p>
                  These Terms shall be interpreted and governed in accordance with the laws of the People's Republic of Bangladesh. Any dispute arising in connection with the Trust shall fall under the exclusive jurisdiction of the competent courts of Dhaka, Bangladesh.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            Official Charter of <strong>{TRUST_NAME}</strong> · Non-Profit Trust Registration TR-4821
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl font-bold text-xs transition-colors"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
