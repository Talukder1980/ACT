import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'en' | 'bn' | 'de' | 'fr' | 'ja' | 'ko';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'bn', name: 'Bangla', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
];

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Brand & Motto
    'trust.name': 'Afzal Charitable Trust',
    'trust.motto': 'Compassion · Empowerment · Human Dignity',
    'trust.registered': 'Registered Non-Profit Trust · Bangladesh',
    'trust.est': 'Reg. Est. 2026',
    'trust.officialDirect': 'Direct Contribution Policy: Supporters will send their gifts through this official website only.',

    // Navigation
    'nav.allPortals': 'All Portals & Menu',
    'nav.buildingSanctuary': 'Building Sanctuary',
    'nav.membership': 'Membership (৳250)',
    'nav.donate': 'Donate Now',
    'nav.eventQr': 'Event QR',
    'nav.menu': 'Menu',
    'nav.pillars': '16 Humanitarian Pillars',
    'nav.orphanage': 'Orphanage & Widows Home',
    'nav.giftcards': 'Charitable Gift Cards ($5 - $100)',
    'nav.donations': 'Live Donation Tracker',
    'nav.volunteer': 'Volunteer Corps Enlistment',
    'nav.notices': 'Trust Notice Board & Gazettes',
    'nav.gallery': 'Documentary Photo Gallery',
    'nav.language': 'Language',

    // Hero Section
    'hero.badge': 'Humanitarian Aid & Community Empowerment',
    'hero.headline': 'Restoring Hope & Upholding Human Dignity Across Bangladesh',
    'hero.subheadline': 'Afzal Charitable Trust is dedicated to uplifting vulnerable communities through education, emergency healthcare, poverty alleviation, orphan care, and grassroots social development.',
    'hero.explorePillars': 'Explore 16 Core Pillars',
    'hero.buildingAppeal': 'Sanctuary Building Appeal',
    'hero.patientsTreated': '28,500+ Patients Treated Free',
    'hero.studentsSupported': '4,200+ Scholarships Awarded',
    'hero.treesPlanted': '85,000+ Native Trees Planted',
    'hero.districtsCovered': '64 Districts Covered',

    // Orphanage & Widows Building
    'building.title': 'Sanctuary of Dignity: Orphanage & Elderly Widows Home',
    'building.subtitle': 'Constructing a permanent residential sanctuary for 80 orphan children and 50 abandoned elderly widows in Habiganj, Sylhet.',
    'building.dedicateGift': 'Dedicate a Building Gift',
    'building.giftTiers': '6 Endowed Gift Dedication Packages',

    // Volunteer Section
    'volunteer.title': 'Volunteer Signup & Community Mobilization',
    'volunteer.subtitle': 'Join the Afzal Humanitarian Volunteer Corps. Mobilizing doctors, educators, engineers, students, and citizens across 64 districts.',
    'volunteer.step1': '1. Contact Information & Location',
    'volunteer.step2': '2. Professional Background & Area of Expertise',
    'volunteer.step3': '3. 16 Core Areas of Action (Trust Pillars)',
    'volunteer.step4': '4. Deployment Availability & Motivation',
    'volunteer.selectAll': 'Select All 16',
    'volunteer.submit': 'Submit Volunteer Registration & Generate Official Pass',
    'volunteer.qrScan': 'Volunteer Signup QR Code',
    'volunteer.qrScanSub': 'Scan with smartphone camera to open form on mobile',

    // Gift Cards
    'giftcards.title': 'Dedicated Charitable Gift Cards',
    'giftcards.subtitle': 'Honor loved ones with purposeful giving from $5 to $100 across 6 distinct humanitarian tiers with authentic QR vouchers.',

    // Common Buttons & Badges
    'btn.print': 'Print',
    'btn.share': 'Share',
    'btn.close': 'Close',
    'btn.verify': 'Verify',
    'btn.learnMore': 'Learn More',
    'btn.viewAll': 'View All',
    'btn.agree': 'I Understand & Agree',

    // Footer
    'footer.privacy': 'Website Privacy Policy',
    'footer.terms': 'Terms & Conditions of Service',
    'footer.transparency': 'Transparency & Audit',
    'footer.nonDiscrimination': 'Non-Discrimination Policy',
    'footer.taxExempt': 'Tax Exemption SRO No. 192',
    'footer.copyright': 'All rights reserved. Operated under solemn humanitarian charter in Bangladesh.'
  },

  bn: {
    // Brand & Motto
    'trust.name': 'আফজাল চ্যারিটেবল ট্রাস্ট',
    'trust.motto': 'সহমর্মিতা · ক্ষমতায়ন · মানবিক মর্যাদা',
    'trust.registered': 'নিবন্ধিত অলাভজনক ট্রাস্ট · বাংলাদেশ',
    'trust.est': 'নিবন্ধন প্রতিষ্ঠিত ২০২৬',
    'trust.officialDirect': 'সরাসরি অনুদান নীতি: শুভানুধ্যায়ীরা শুধুমাত্র এই অফিসিয়াল ওয়েবসাইটের মাধ্যমেই অনুদান পাঠাবেন।',

    // Navigation
    'nav.allPortals': 'সকল পোর্টাল ও মেনু',
    'nav.buildingSanctuary': 'আবাসন ভবন প্রকল্প',
    'nav.membership': 'আজীবন সদস্যপদ (৳২৫০)',
    'nav.donate': 'অনুদান দিন',
    'nav.eventQr': 'ইভেন্ট কিউআর',
    'nav.menu': 'মেনু',
    'nav.pillars': '১৬টি মানবিক স্তম্ভ',
    'nav.orphanage': 'এতিমখানা ও বিধবা নিবাস',
    'nav.giftcards': 'চ্যারিটেবল গিফট কার্ড ($৫ - $১০০)',
    'nav.donations': 'লাইভ অনুদান ট্র্যাকার',
    'nav.volunteer': 'স্বেচ্ছাসেবক হিসেবে যোগদান',
    'nav.notices': 'ট্রাস্ট নোটিশ বোর্ড ও গেজেট',
    'nav.gallery': 'ডকুমেন্টারি ফটো গ্যালারি',
    'nav.language': 'ভাষা',

    // Hero Section
    'hero.badge': 'মানবিক সহায়তা ও তৃণমূল ক্ষমতায়ন',
    'hero.headline': 'বাংলাদেশজুড়ে আশা জাগিয়ে তোলা এবং মানবিক মর্যাদা প্রতিষ্ঠা',
    'hero.subheadline': 'আফজাল চ্যারিটেবল ট্রাস্ট শিক্ষা, জরুরি স্বাস্থ্যসেবা, দারিদ্র্য বিমোচন, এতিম প্রতিপালন ও সমাজকল্যাণে তৃণমূল সুবিধাবঞ্চিতদের সেবায় নিবেদিত।',
    'hero.explorePillars': '১৬টি কর্মক্ষেত্র দেখুন',
    'hero.buildingAppeal': 'আবাসন ভবন নির্মাণ আবেদন',
    'hero.patientsTreated': '২৮,৫০০+ রোগীর বিনামূল্যে চিকিৎসা',
    'hero.studentsSupported': '৪,২০০+ মেধা বৃত্তি প্রদান',
    'hero.treesPlanted': '৮৫,০০০+ বৃক্ষরোপণ সম্পন্ন',
    'hero.districtsCovered': '৬৪টি জেলায় মানবিক সেবা',

    // Orphanage & Widows Building
    'building.title': 'মর্যাদার নীড়: এতিমখানা ও বৃদ্ধা বিধবা আশ্রয়কেন্দ্র',
    'building.subtitle': 'হবিগঞ্জের বাহুবলে ৮০ জন এতিম শিশু ও ৫০ জন নিঃস্ব বৃদ্ধা বিধবার জন্য একটি স্থায়ী আবাসিক আশ্রয়কেন্দ্র নির্মাণ হচ্ছে।',
    'building.dedicateGift': 'ভবন নির্মাণে সদকা করুন',
    'building.giftTiers': '৬টি বিশেষ নির্মাণ উৎসর্গ প্যাকেজ',

    // Volunteer Section
    'volunteer.title': 'স্বেচ্ছাসেবক নিবন্ধন ও তৃণমূল জাগরণ',
    'volunteer.subtitle': 'আফজাল মানবিক স্বেচ্ছাসেবক দলে যোগ দিন। ৬৪ জেলার চিকিৎসক, শিক্ষক, প্রকৌশলী ও তরুণদের সংঘবদ্ধ প্ল্যাটফর্ম।',
    'volunteer.step1': '১. যোগাযোগের তথ্য ও অবস্থান',
    'volunteer.step2': '২. পেশাগত অভিজ্ঞতা ও দক্ষতার ক্ষেত্র',
    'volunteer.step3': '৩. ১৬টি প্রধান কর্মক্ষেত্র (ট্রাস্ট স্তম্ভ)',
    'volunteer.step4': '৪. সেবায় অংশগ্রহণের সময় ও প্রেরণা',
    'volunteer.selectAll': '১৬টি ক্ষেত্র নির্বাচন করুন',
    'volunteer.submit': 'স্বেচ্ছাসেবক নিবন্ধন সম্পন্ন করুন ও আইডি পাস পান',
    'volunteer.qrScan': 'মোবাইল স্বেচ্ছাসেবক কিউআর কোড',
    'volunteer.qrScanSub': 'স্মার্টফোন ক্যামেরা দিয়ে স্ক্যান করে সরাসরি ফরমে প্রবেশ করুন',

    // Gift Cards
    'giftcards.title': 'উৎসর্গীকৃত মানবিক উপহার কার্ড',
    'giftcards.subtitle': '$৫ থেকে $১০০ পর্যন্ত ৬টি স্বতন্ত্র মানবিক স্তরে প্রিয়জনদের সম্মান জানাতে তাৎক্ষণিক কিউআর ভাউচার উপহার দিন।',

    // Common Buttons & Badges
    'btn.print': 'প্রিন্ট করুন',
    'btn.share': 'শেয়ার করুন',
    'btn.close': 'বন্ধ করুন',
    'btn.verify': 'যাচাই করুন',
    'btn.learnMore': 'আরও জানুন',
    'btn.viewAll': 'সব দেখুন',
    'btn.agree': 'আমি সম্মত ও অবগত',

    // Footer
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.terms': 'সেবার শর্তাবলী ও নীতিমালা',
    'footer.transparency': 'স্বচ্ছতা ও নিরীক্ষা',
    'footer.nonDiscrimination': 'অ-বৈষম্য নীতি',
    'footer.taxExempt': 'কর অব্যাহতি এসআরও নং ১৯২',
    'footer.copyright': 'সর্বস্বত্ব সংরক্ষিত। বাংলাদেশে প্রাতিষ্ঠানিক মানবিক সনদের অধীনে পরিচালিত।'
  },

  de: {
    // Brand & Motto
    'trust.name': 'Afzal Charitable Trust',
    'trust.motto': 'Mitgefühl · Befähigung · Menschenwürde',
    'trust.registered': 'Registrierte gemeinnützige Stiftung · Bangladesch',
    'trust.est': 'Gegr. 2026',
    'trust.officialDirect': 'Offizielle Spendenrichtlinie: Unterstützer überweisen ihre Spenden ausschließlich über diese offizielle Website.',

    // Navigation
    'nav.allPortals': 'Alle Portale & Menü',
    'nav.buildingSanctuary': 'Bauprojekt Zuflucht',
    'nav.membership': 'Mitgliedschaft (৳250)',
    'nav.donate': 'Jetzt spenden',
    'nav.eventQr': 'Event QR',
    'nav.menu': 'Menü',
    'nav.pillars': '16 Humanitäre Säulen',
    'nav.orphanage': 'Waisenhaus & Witwenheim',
    'nav.giftcards': 'Spenden-Geschenkkarten ($5 - $100)',
    'nav.donations': 'Live-Spenden-Tracker',
    'nav.volunteer': 'Freiwilligen-Registrierung',
    'nav.notices': 'Mitteilungen & Berichte',
    'nav.gallery': 'Fotogalerie',
    'nav.language': 'Sprache',

    // Hero Section
    'hero.badge': 'Humanitäre Hilfe & Gemeinschaftsentwicklung',
    'hero.headline': 'Hoffnung schenken und die Menschenwürde in Bangladesch wahren',
    'hero.subheadline': 'Der Afzal Charitable Trust widmet sich der Unterstützung hilfsbedürftiger Gemeinschaften durch Bildung, Notfallversorgung, Armutsbekämpfung und Waisenfürsorge.',
    'hero.explorePillars': '16 Kernbereiche entdecken',
    'hero.buildingAppeal': 'Bauaufruf für die Zuflucht',
    'hero.patientsTreated': 'Über 28.500 Patienten kostenlos behandelt',
    'hero.studentsSupported': 'Über 4.200 Stipendien vergeben',
    'hero.treesPlanted': 'Über 85.000 Bäume gepflanzt',
    'hero.districtsCovered': 'Alle 64 Distrikte abgedeckt',

    // Orphanage & Widows Building
    'building.title': 'Zuflucht der Würde: Waisenhaus & Alten-Witwenheim',
    'building.subtitle': 'Errichtung einer dauerhaften Wohnstätte für 80 Waisenkinder und 50 verarmte Witwen in Habiganj, Sylhet.',
    'building.dedicateGift': 'Bausteinspende widmen',
    'building.giftTiers': '6 Stiftungs-Widmungspakete',

    // Volunteer Section
    'volunteer.title': 'Freiwilligen-Anmeldung & Bürgerengagement',
    'volunteer.subtitle': 'Treten Sie dem Afzal Volunteer Corps bei. Ärzte, Lehrkräfte, Ingenieure und Studierende in 64 Distrikten.',
    'volunteer.step1': '1. Kontaktinformationen & Standort',
    'volunteer.step2': '2. Beruflicher Hintergrund & Fachwissen',
    'volunteer.step3': '3. 16 Kern-Aktionsbereiche (Stiftungs-Säulen)',
    'volunteer.step4': '4. Einsatzbereitschaft & Motivation',
    'volunteer.selectAll': 'Alle 16 Bereiche wählen',
    'volunteer.submit': 'Anmeldung einreichen & Ausweis generieren',
    'volunteer.qrScan': 'Freiwilligen-QR-Code',
    'volunteer.qrScanSub': 'Mit Smartphone scannen, um Formular mobil zu öffnen',

    // Gift Cards
    'giftcards.title': 'Wohltätige Geschenkkarten',
    'giftcards.subtitle': 'Schenken Sie mit Sinn von $5 bis $100 in 6 humanitären Stufen mit offiziellem QR-Zertifikat.',

    // Common Buttons & Badges
    'btn.print': 'Drucken',
    'btn.share': 'Teilen',
    'btn.close': 'Schließen',
    'btn.verify': 'Verifizieren',
    'btn.learnMore': 'Mehr erfahren',
    'btn.viewAll': 'Alle ansehen',
    'btn.agree': 'Ich stimme zu',

    // Footer
    'footer.privacy': 'Datenschutzerklärung',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.transparency': 'Transparenz & Wirtschaftsprüfung',
    'footer.nonDiscrimination': 'Antidiskriminierungsrichtlinie',
    'footer.taxExempt': 'Steuerbefreiung SRO Nr. 192',
    'footer.copyright': 'Alle Rechte vorbehalten. Gegründet unter humanitärer Charta in Bangladesch.'
  },

  fr: {
    // Brand & Motto
    'trust.name': 'Afzal Charitable Trust',
    'trust.motto': 'Compassion · Autonomie · Dignité Humaine',
    'trust.registered': 'Fondation caritative enregistrée · Bangladesh',
    'trust.est': 'Fondée en 2026',
    'trust.officialDirect': 'Politique de contribution officielle : Les donateurs effectuent leurs dons uniquement via ce site officiel.',

    // Navigation
    'nav.allPortals': 'Tous les portails & Menu',
    'nav.buildingSanctuary': 'Projet du Sanctuaire',
    'nav.membership': 'Adhésion (৳250)',
    'nav.donate': 'Faire un don',
    'nav.eventQr': 'QR Événement',
    'nav.menu': 'Menu',
    'nav.pillars': '16 Piliers Humanitaires',
    'nav.orphanage': 'Orphelinat & Foyer de Veuves',
    'nav.giftcards': 'Cartes Cadeaux Caritatives ($5 - $100)',
    'nav.donations': 'Suivi des Dons en Direct',
    'nav.volunteer': 'Rejoindre les Bénévoles',
    'nav.notices': 'Avis Officiels & Gazette',
    'nav.gallery': 'Galerie Documentaire',
    'nav.language': 'Langue',

    // Hero Section
    'hero.badge': 'Aide Humanitaire & Développement Communautaire',
    'hero.headline': 'Restaurer l’espoir et préserver la dignité humaine au Bangladesh',
    'hero.subheadline': 'Afzal Charitable Trust soutient les populations défavorisées par l’éducation, les soins médicaux gratuits, la lutte contre la pauvreté et la protection des orphelins.',
    'hero.explorePillars': 'Découvrir les 16 Piliers',
    'hero.buildingAppeal': 'Appel aux Dons pour le Bâtiment',
    'hero.patientsTreated': '+28 500 patients soignés gratuitement',
    'hero.studentsSupported': '+4 200 bourses d’études accordées',
    'hero.treesPlanted': '+85 000 arbres indigènes plantés',
    'hero.districtsCovered': 'Présent dans 64 districts',

    // Orphanage & Widows Building
    'building.title': 'Sanctuaire de la Dignité : Orphelinat & Foyer pour Veuves Âgées',
    'building.subtitle': 'Construction d’une résidence sécurisée pour 80 orphelins et 50 veuves démunies à Habiganj, Sylhet.',
    'building.dedicateGift': 'Dédier un don de construction',
    'building.giftTiers': '6 formules de dédicace de bâtiment',

    // Volunteer Section
    'volunteer.title': 'Inscription des Bénévoles & Mobilisation',
    'volunteer.subtitle': 'Rejoignez le Corps des Bénévoles Humanitaires Afzal. Médecins, enseignants, ingénieurs et citoyens unis.',
    'volunteer.step1': '1. Coordonnées et localisation',
    'volunteer.step2': '2. Profil professionnel & expertise',
    'volunteer.step3': '3. 16 Domaines d’action prioritaires (Piliers)',
    'volunteer.step4': '4. Disponibilités et motivation',
    'volunteer.selectAll': 'Sélectionner les 16 domaines',
    'volunteer.submit': 'Valider l’inscription et générer le badge officiel',
    'volunteer.qrScan': 'QR Code d’inscription bénévole',
    'volunteer.qrScanSub': 'Scannez avec un smartphone pour ouvrir le formulaire',

    // Gift Cards
    'giftcards.title': 'Cartes Cadeaux Caritatives',
    'giftcards.subtitle': 'Offrez un geste porteur de sens de 5$ à 100$ parmi 6 échelons humanitaires avec certificat QR.',

    // Common Buttons & Badges
    'btn.print': 'Imprimer',
    'btn.share': 'Partager',
    'btn.close': 'Fermer',
    'btn.verify': 'Vérifier',
    'btn.learnMore': 'En savoir plus',
    'btn.viewAll': 'Voir tout',
    'btn.agree': 'J’accepte et je comprends',

    // Footer
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions Générales d’Utilisation',
    'footer.transparency': 'Transparence & Audit',
    'footer.nonDiscrimination': 'Charte de Non-Discrimination',
    'footer.taxExempt': 'Exonération fiscale SRO N° 192',
    'footer.copyright': 'Tous droits réservés. Fonctionne sous charte caritative au Bangladesh.'
  },

  ja: {
    // Brand & Motto
    'trust.name': 'アフザル慈善信託基金',
    'trust.motto': '慈悲 · 自立支援 · 人間の尊厳',
    'trust.registered': 'バングラデシュ公認 非営利慈善信託',
    'trust.est': '設立 2026年',
    'trust.officialDirect': '公式直接寄付方針：支援者の皆様からのご寄付は、当公式サイトのみを通じて受け付けております。',

    // Navigation
    'nav.allPortals': '全ポータル＆メニュー',
    'nav.buildingSanctuary': '保護施設建設プロジェクト',
    'nav.membership': '終身会員登録 (৳250)',
    'nav.donate': '今すぐ寄付する',
    'nav.eventQr': '公式QRコード',
    'nav.menu': 'メニュー',
    'nav.pillars': '16の人道支援活動の柱',
    'nav.orphanage': '孤児院・高齢未亡人保護ホーム',
    'nav.giftcards': '慈善ギフトカード ($5 - $100)',
    'nav.donations': 'ライブ寄付トラッカー',
    'nav.volunteer': 'ボランティア登録',
    'nav.notices': '公式公告・活動報告',
    'nav.gallery': '活動写真ギャラリー',
    'nav.language': '言語',

    // Hero Section
    'hero.badge': '人道支援と地域社会の自立支援',
    'hero.headline': 'バングラデシュ全土に希望を取り戻し、人間の尊厳を守る',
    'hero.subheadline': 'アフザル慈善信託は、教育支援、緊急医療キャンプ、貧困救済、孤児養育、環境保全を通じて、最も脆弱な地域社会を支えています。',
    'hero.explorePillars': '16の活動領域を見る',
    'hero.buildingAppeal': '保護ホーム建設支援',
    'hero.patientsTreated': '28,500名以上の無料診療実施',
    'hero.studentsSupported': '4,200名以上の奨学金給付',
    'hero.treesPlanted': '85,000本以上の植樹達成',
    'hero.districtsCovered': '全64県で活動展開中',

    // Orphanage & Widows Building
    'building.title': '尊厳の聖域：孤児と高齢未亡人のための保護施設',
    'building.subtitle': 'シルヘット管区ハビガンジにて、80人の孤児と50人の身寄りのない未亡人のための恒久的な居住施設を建設しています。',
    'building.dedicateGift': '建設寄付を捧げる',
    'building.giftTiers': '6つの建設寄贈パッケージ',

    // Volunteer Section
    'volunteer.title': 'ボランティア登録と地域動員',
    'volunteer.subtitle': 'アフザル人道ボランティア部隊に参加してください。全国64県の医師、教育者、技術者、学生が活躍中。',
    'volunteer.step1': '1. 連絡先と居住地',
    'volunteer.step2': '2. 専門分野・職業的バックグラウンド',
    'volunteer.step3': '3. 16の人道支援重点領域（活動の柱）',
    'volunteer.step4': '4. 参加可能時期と志望動機',
    'volunteer.selectAll': '全16分野を選択',
    'volunteer.submit': 'ボランティア登録を完了し認証パスを発行',
    'volunteer.qrScan': 'ボランティア登録QRコード',
    'volunteer.qrScanSub': 'スマホのカメラでスキャンして簡単登録',

    // Gift Cards
    'giftcards.title': '慈善ギフトカードプログラム',
    'giftcards.subtitle': '$5から$100まで、愛する人の名において意義ある支援を届ける6つの人道支援ギフト。',

    // Common Buttons & Badges
    'btn.print': '印刷する',
    'btn.share': '共有する',
    'btn.close': '閉じる',
    'btn.verify': '認証確認',
    'btn.learnMore': '詳細を見る',
    'btn.viewAll': 'すべて表示',
    'btn.agree': '同意して確認しました',

    // Footer
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    'footer.transparency': '透明性と監査報告',
    'footer.nonDiscrimination': '無差別・公平性の誓約',
    'footer.taxExempt': '税免除認可 SRO第192号',
    'footer.copyright': '無断転載を禁じます。バングラデシュ信託法規に基づき厳正に運営されています。'
  },

  ko: {
    // Brand & Motto
    'trust.name': '아프잘 자선 신탁재단',
    'trust.motto': '자비 · 역량 강화 · 인간의 존엄',
    'trust.registered': '방글라데시 등록 공익 자선재단',
    'trust.est': '설립 2026년',
    'trust.officialDirect': '공식 직접 기부 정책: 후원자 여러분의 소중한 후원금은 본 공식 웹사이트를 통해서만 접수됩니다.',

    // Navigation
    'nav.allPortals': '전체 포털 & 메뉴',
    'nav.buildingSanctuary': '보호시설 건축 프로젝트',
    'nav.membership': '평생회원 등록 (৳250)',
    'nav.donate': '지금 기부하기',
    'nav.eventQr': '이벤트 QR',
    'nav.menu': '메뉴',
    'nav.pillars': '16대 인도주의 활동 기둥',
    'nav.orphanage': '고아원 및 고령 과부 보금자리',
    'nav.giftcards': '자선 기부 기프트카드 ($5 - $100)',
    'nav.donations': '실시간 기부 모금 현황',
    'nav.volunteer': '자원봉사단 등록',
    'nav.notices': '공식 공지사항 및 활동보고',
    'nav.gallery': '활동 사진 갤러리',
    'nav.language': '언어',

    // Hero Section
    'hero.badge': '인도주의적 구호 및 지역사회 자립 지원',
    'hero.headline': '방글라데시 전역에 희망을 되찾고 인간의 존엄성을 수호합니다',
    'hero.subheadline': '아프잘 자선재단은 교육, 무료 의료 캠프, 빈곤 구제, 고아 양육, 환경 보호를 통해 가장 소외된 이웃을 섬깁니다.',
    'hero.explorePillars': '16대 핵심 활동 보기',
    'hero.buildingAppeal': '보금자리 건축 후원',
    'hero.patientsTreated': '28,500명 이상 무료 진료',
    'hero.studentsSupported': '4,200명 이상 장학금 수여',
    'hero.treesPlanted': '85,000그루 이상 나무 심기',
    'hero.districtsCovered': '방글라데시 64개 전 지역 활동',

    // Orphanage & Widows Building
    'building.title': '존엄의 안식처: 고아 및 독거 과부 주거 보호시설',
    'building.subtitle': '실렛 하비간즈에 80명의 고아와 50명의 홀몸 어르신을 위한 영구 주거 안식처를 건립하고 있습니다.',
    'building.dedicateGift': '건축 후원금 헌액하기',
    'building.giftTiers': '6가지 건축 헌액 패키지',

    // Volunteer Section
    'volunteer.title': '자원봉사자 모집 및 지역 연대',
    'volunteer.subtitle': '아프잘 인도주의 자원봉사단에 함께하세요. 전국 64개 지구의 의료진, 교육자, 공학도, 청년 연대.',
    'volunteer.step1': '1. 연락처 및 거주 지역',
    'volunteer.step2': '2. 전문 직종 및 보유 역량',
    'volunteer.step3': '3. 16대 인도주의 활동 영역 (재단 핵심 기둥)',
    'volunteer.step4': '4. 참여 가능 일정 및 지원 동기',
    'volunteer.selectAll': '16개 전 영역 선택',
    'volunteer.submit': '자원봉사 등록 완료 및 공식 인증패스 발급',
    'volunteer.qrScan': '자원봉사 등록 QR코드',
    'volunteer.qrScanSub': '스마트폰 카메라로 스캔하여 모바일로 신청하세요',

    // Gift Cards
    'giftcards.title': '의미 있는 자선 기프트카드',
    'giftcards.subtitle': '$5부터 $100까지 소중한 사람의 이름으로 6가지 인도주의 구호에 동참하는 공식 QR 카드.',

    // Common Buttons & Badges
    'btn.print': '인쇄하기',
    'btn.share': '공유하기',
    'btn.close': '닫기',
    'btn.verify': '인증 조회',
    'btn.learnMore': '자세히 보기',
    'btn.viewAll': '전체 보기',
    'btn.agree': '동의하고 확인했습니다',

    // Footer
    'footer.privacy': '개인정보 처리방침',
    'footer.terms': '이용약관 및 정책',
    'footer.transparency': '투명성 및 외부 회계감사',
    'footer.nonDiscrimination': '차별 금지 헌장',
    'footer.taxExempt': '세제 혜택 인가 SRO 제192호',
    'footer.copyright': '모든 권리 보유. 방글라데시 신탁법령에 따라 정직하고 투명하게 운영됩니다.'
  }
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageMeta[];
  currentMeta: LanguageMeta;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('act_language') as SupportedLanguage;
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('act_language', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const defaultDict = TRANSLATIONS['en'];
    if (defaultDict && defaultDict[key]) {
      return defaultDict[key];
    }
    return fallback || key;
  };

  const currentMeta = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES, currentMeta }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
