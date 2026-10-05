/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MissionVision } from './components/MissionVision';
import { PillarsGrid } from './components/PillarsGrid';
import { OrphanageWidowsBuildingSection } from './components/OrphanageWidowsBuildingSection';
import { MembershipSection } from './components/MembershipSection';
import { NoticeBoard } from './components/NoticeBoard';
import { DonationTracker } from './components/DonationTracker';
import { PhotoGallery } from './components/PhotoGallery';
import { GiftCardsSection } from './components/GiftCardsSection';
import { VolunteerSection } from './components/VolunteerSection';
import { NewsletterSubscription } from './components/NewsletterSubscription';
import { Footer } from './components/Footer';
import { QRCodeModal } from './components/QRCodeModal';
import { SocialShareModal } from './components/SocialShareModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { LiveChatWidget } from './components/LiveChatWidget';

export default function App() {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [shareModalData, setShareModalData] = useState<{
    isOpen: boolean;
    title: string;
    text: string;
    url: string;
  }>({
    isOpen: false,
    title: '',
    text: '',
    url: ''
  });

  // Accessibility state for older mobile devices & low-contrast screens
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);

  const handleOpenQr = () => {
    setIsQrModalOpen(true);
  };

  const handleOpenShare = (title: string, text: string, url = window.location.href) => {
    setShareModalData({
      isOpen: true,
      title,
      text,
      url
    });
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fontSizeClass = 
    fontSizeLevel === 1 ? 'text-[105%]' : 
    fontSizeLevel === 2 ? 'text-[115%]' : '';

  const contrastClass = highContrast ? 'contrast-125 saturate-125' : '';

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAFAF8] text-[#1C1917] ${fontSizeClass} ${contrastClass}`}>
      {/* Skip to Content for Screen Readers & Keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:p-3 focus:bg-emerald-900 focus:text-white rounded-lg font-bold"
      >
        Skip to main content
      </a>

      {/* Top Bar Navigation */}
      <Navbar
        onOpenQr={handleOpenQr}
        onOpenMembership={() => handleScrollTo('membership')}
        onOpenDonate={() => handleScrollTo('donations')}
      />

      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenMembership={() => handleScrollTo('membership')}
          onOpenDonate={() => handleScrollTo('donations')}
          onOpenQr={handleOpenQr}
        />

        {/* 2. Official Mission & Vision Statements */}
        <MissionVision />

        {/* 3. 16 Core Pillars of Action */}
        <PillarsGrid
          onOpenDonate={(cause) => handleScrollTo('donations')}
          onOpenShare={handleOpenShare}
        />

        {/* 4. Special Gift for Orphanage & Widows Home Building (with dedicated Gift Tracker) */}
        <OrphanageWidowsBuildingSection
          onOpenShare={handleOpenShare}
        />

        {/* 5. Membership Subscription (৳250) & Verified Certificate */}
        <MembershipSection
          onOpenShare={handleOpenShare}
          onOpenQr={handleOpenQr}
        />

        {/* 5. Trust Notice Board */}
        <NoticeBoard
          onOpenShare={handleOpenShare}
        />

        {/* 6. Donation Progress Tracker & Live Drives */}
        <DonationTracker
          onOpenShare={handleOpenShare}
          onOpenQr={handleOpenQr}
        />

        {/* 7. Documentary Photo Gallery */}
        <PhotoGallery
          onOpenShare={handleOpenShare}
        />

        {/* 8. Dedicated Gift Cards Pavilion ($5 - $100 in 6 Colors & Clear Fonts) */}
        <GiftCardsSection
          onOpenShare={handleOpenShare}
        />

        {/* 9. Volunteer Signup & Community Mobilization */}
        <VolunteerSection
          onOpenShare={handleOpenShare}
        />

        {/* 10. Monthly Email Newsletter Subscription Form */}
        <NewsletterSubscription />
      </main>

      {/* 11. Institutional Footer */}
      <Footer
        onOpenQr={handleOpenQr}
        onOpenMembership={() => handleScrollTo('membership')}
        onOpenDonate={() => handleScrollTo('donations')}
        onOpenShare={handleOpenShare}
      />

      {/* Accessible Floating Toolbar for Older Mobile Devices */}
      <AccessibilityToolbar
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        fontSizeLevel={fontSizeLevel}
        setFontSizeLevel={setFontSizeLevel}
      />

      {/* QR Code Modal for Event Scanning & Printed Materials */}
      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      {/* Social Media Quick Share Modal */}
      <SocialShareModal
        isOpen={shareModalData.isOpen}
        onClose={() => setShareModalData(prev => ({ ...prev, isOpen: false }))}
        title={shareModalData.title}
        text={shareModalData.text}
        url={shareModalData.url}
      />

      {/* Floating Messenger & WhatsApp Live Chat Widget */}
      <LiveChatWidget />
    </div>
  );
}
