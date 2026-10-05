import { Pillar, Notice, Campaign, GiftCardTier, GalleryPhoto } from '../types';

export const TRUST_NAME = "Afzal Charitable Trust";
export const TRUST_ESTABLISHED = "2018";
export const TRUST_MOTTO = "Compassion · Empowerment · Human Dignity";
export const MEMBERSHIP_FEE_BDT = 250;
export const TRUST_LOGO_SRC = "/src/assets/images/trust_emblem_logo_1791220901781.jpg";

export const bangladeshDistricts: string[] = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barishal', 'Bhola', 'Bogura', 'Brahmanbaria', 'Chandpur',
  'Chattogram', 'Chuadanga', "Cox's Bazar", 'Cumilla', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni',
  'Gaibandha', 'Gazipur', 'Gopalganj', 'Habiganj', 'Jamalpur', 'Jashore', 'Jhalokathi', 'Jhenaidah',
  'Joypurhat', 'Khagrachhari', 'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 'Lakshmipur', 'Lalmonirhat',
  'Madaripur', 'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar', 'Munshiganj', 'Mymensingh', 'Naogaon',
  'Narail', 'Narayanganj', 'Narsingdi', 'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna',
  'Panchagarh', 'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur', 'Satkhira',
  'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet', 'Tangail', 'Thakurgaon'
];

export const MISSION_STATEMENT = "Afzal Charitable Trust is dedicated to uplifting underprivileged and vulnerable communities across Bangladesh by providing essential support in education, healthcare, poverty relief, and social welfare. We strive to create an inclusive and equitable society through compassionate service, sustainable development initiatives, and empowerment programs that enable individuals to live with dignity and self-reliance. Guided by transparency, non-discrimination, and collaboration, we work tirelessly to build a brighter, healthier, and more prosperous future for all.";

export const VISION_STATEMENT = "Afzal Charitable Trust envisions a Bangladesh where every individual, regardless of background or circumstance, has access to education, healthcare, and basic necessities for a life of dignity and opportunity. We aspire to build an inclusive, compassionate, and self-reliant society free from poverty, discrimination, and suffering. Through sustained efforts and collective partnership, we strive to create lasting change that empowers communities and transforms lives for generations to come.";

export const TRUST_PILLARS: Pillar[] = [
  {
    id: 'education-scholarships',
    title: 'Education, Research and Scholarships',
    category: 'Education',
    summary: 'Stipends, educational materials, and scientific research grants for meritorious yet disadvantaged students.',
    description: 'Providing full school and higher-education scholarships, establishing digital libraries in rural upazilas, and funding community action research on social mobility and primary education retention.',
    impactMetrics: '4,200+ Students Supported across 18 Districts',
    iconName: 'GraduationCap'
  },
  {
    id: 'medical-healthcare',
    title: 'Medical and Healthcare Assistance',
    category: 'Health',
    summary: 'Free clinic outreach, maternal care, life-saving surgery grants, and emergency medicine distribution.',
    description: 'Operating mobile health camps, sponsoring pediatric and cataract surgeries, subsidizing diagnostic tests for impoverished families, and setting up primary medical aid centers.',
    impactMetrics: '28,500+ Patients Treated Free of Cost',
    iconName: 'HeartPulse'
  },
  {
    id: 'poverty-relief',
    title: 'Poverty Relief',
    category: 'Welfare',
    summary: 'Direct food rations, emergency seasonal support, and sustainable micro-livelihood grants.',
    description: 'Comprehensive sustenance programs delivering monthly family nutrition hampers, emergency flood response dry packs, and providing rickshaws and sewing equipment to break cycles of poverty.',
    impactMetrics: '52,000+ Food Packages Distributed',
    iconName: 'HandCoins'
  },
  {
    id: 'vulnerable-persons',
    title: 'Assistance to Vulnerable Persons',
    category: 'Welfare',
    summary: 'Specialized aid for persons with disabilities, widows, and climate-displaced river erosion victims.',
    description: 'Wheelchair and assistive device distribution, legal aid for neglected widows, and rehabilitation shelters for communities rendered homeless by riverbank erosion in northern and coastal zones.',
    impactMetrics: '1,800+ Assistive Devices & Shelters Provided',
    iconName: 'ShieldAlert'
  },
  {
    id: 'old-age-orphanage',
    title: 'Old Age Home and Orphanage Initiatives',
    category: 'Welfare',
    summary: 'Dignified shelter, balanced nutrition, healthcare, and holistic upbringing for elders and orphans.',
    description: 'Supporting senior care sanctuaries where abandoned elders live in comfort, alongside loving residential homes for orphan children with integrated schooling, recreation, and mentoring.',
    impactMetrics: '350+ Resident Seniors & Children Under Direct Care',
    iconName: 'Home'
  },
  {
    id: 'public-utility',
    title: 'Charitable and General Public Utility',
    category: 'Welfare',
    summary: 'Clean arsenic-free deep tube-wells, community sanitization facilities, and disaster refuge spaces.',
    description: 'Constructing community drinking water stations, solar-powered lighting in remote char settlements, and public sanitation complexes to ensure fundamental civic hygiene for rural villagers.',
    impactMetrics: '120+ Deep Tube Wells & Water Filtration Plants',
    iconName: 'Droplet'
  },
  {
    id: 'fundraising-endowments',
    title: 'Fundraising, Property and Endowments',
    category: 'Global & Society',
    summary: 'Ethical endowment management, Waqf stewardship, and transparent philanthropic donor governance.',
    description: 'Stewarding trust endowments and community-donated real estate to generate recurring humanitarian revenue, audited quarterly with publicly published compliance reports.',
    impactMetrics: '100% Audited Transparency & Perpetual Waqf Yields',
    iconName: 'Landmark'
  },
  {
    id: 'citizen-journalism',
    title: 'Citizen Journalism',
    category: 'Global & Society',
    summary: 'Empowering grassroots youth and community voices to document local social issues and rights violations.',
    description: 'Training rural youth, women, and marginalized persons in fact-based citizen reporting, mobile journalism, and community grievance documentation to spur administrative accountability.',
    impactMetrics: '240+ Grassroots Reporters Trained across 6 Divisions',
    iconName: 'Megaphone'
  },
  {
    id: 'environmental-awareness',
    title: 'Environmental Awareness',
    category: 'Welfare',
    summary: 'Mangrove and native tree afforestation, plastic reduction campaigns, and climate resilience education.',
    description: 'Leading massive native tree plantation drives across cyclone-prone coastal belts, organizing river cleaning drives, and running eco-clubs in schools to foster environmental custodianship.',
    impactMetrics: '85,000+ Native Trees Planted & Nurtured',
    iconName: 'Leaf'
  },
  {
    id: 'digital-learning-security',
    title: 'Digital Learning and Security',
    category: 'Education',
    summary: 'Free computer coding labs, cybersecurity awareness workshops, and women-in-tech digital training.',
    description: 'Democratizing technology by installing solar-powered computing hubs in under-resourced schools, teaching digital literacy, freelance skills, online safety, and cyber-hygiene against digital fraud.',
    impactMetrics: '3,100+ Youth Certified in Digital Skills',
    iconName: 'Laptop'
  },
  {
    id: 'third-gender-initiatives',
    title: 'Third gender or Transgender Initiatives',
    category: 'Empowerment',
    summary: 'Inclusion, healthcare, rights advocacy, vocational tailoring, and dignified employment creation.',
    description: 'Dedicated empowerment circles for Hijra and third-gender citizens, offering dignity stipend programs, beauty and tailoring apprenticeship, healthcare access, and anti-discrimination awareness.',
    impactMetrics: '480+ Transgender Beneficiaries Empowered',
    iconName: 'Users'
  },
  {
    id: 'national-international-collab',
    title: 'National and International Collaboration',
    category: 'Global & Society',
    summary: 'Partnerships with global diaspora, development agencies, and domestic universities.',
    description: 'Uniting Bangladeshi diaspora philanthropists, international NGOs, and domestic medical colleges to multiply resources, transfer technology, and execute large-scale joint relief missions.',
    impactMetrics: '22 Strategic Institutional Alliances',
    iconName: 'Globe'
  },
  {
    id: 'volunteering',
    title: 'Volunteering',
    category: 'Empowerment',
    summary: 'Mobilizing a dynamic youth volunteer corps for emergency response and grassroots civic drives.',
    description: 'A nationwide brigade of trained volunteer leaders who mobilize within hours of cyclones or floods, organize blood donation drives, and spearhead weekend education camps in informal settlements.',
    impactMetrics: '1,500+ Active Registered Volunteers Nationwide',
    iconName: 'HandHeart'
  },
  {
    id: 'drug-awareness',
    title: 'Advocacy and awareness against drugs',
    category: 'Health',
    summary: 'Youth anti-substance seminars, family counseling, and rehabilitation support networks.',
    description: 'Conducting vibrant school and madrasa anti-drug campaigns, sports alternatives, psychological counseling for youth battling addiction, and subsidized admission to accredited rehab centers.',
    impactMetrics: '45,000+ Students Reached with Anti-Drug Seminars',
    iconName: 'ShieldCheck'
  },
  {
    id: 'beyond-borders',
    title: 'Beyond Borders',
    category: 'Global & Society',
    summary: 'Humanitarian solidarity with refugees and international crisis-affected populations.',
    description: 'Cross-border humanitarian emergency aid for displaced communities, providing clean water wells, infant nutrition, and warm blankets in refugee settlement complexes.',
    impactMetrics: '15,000+ Displaced Individuals Reached',
    iconName: 'Compass'
  },
  {
    id: 'social-enterprise',
    title: 'Social Enterprise Development',
    category: 'Empowerment',
    summary: 'Artisan handicraft cooperatives, rural dairy farms, and sustainable micro-ventures for women.',
    description: 'Fostering self-reliance by incubating micro-enterprises: organic honey harvesting, nakshi kantha embroidery cooperatives, and community poultry farms that plow profits back into village welfare.',
    impactMetrics: '38 Active Self-Sustaining Community Enterprises',
    iconName: 'TrendingUp'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-01',
    refNo: 'ACT/HQ/ADM/2026/089',
    date: 'March 28, 2026',
    title: 'Annual Meritorious Scholarship Applications Open (Higher Secondary & Undergraduate)',
    category: 'Scholarship',
    isUrgent: true,
    excerpt: 'Afzal Charitable Trust announces the 2026-27 scholarship session for talented students from underprivileged backgrounds across all 64 districts.',
    content: 'Afzal Charitable Trust invites applications for the 2026 Academic Meritorious Stipend Program. Eligible students enrolled in recognized government colleges and public universities facing financial hardship are requested to submit academic transcripts, proof of enrollment, and local government recommendation letters through our online portal or local trust liaison offices by May 15, 2026. Selected scholars will receive monthly education grants of ৳3,000 - ৳5,000 alongside textbook allowances.',
    signatory: 'Chairman, Board of Trustees'
  },
  {
    id: 'not-02',
    refNo: 'ACT/MED/2026/044',
    date: 'March 22, 2026',
    title: 'Three-Day Free Eye Surgery & Cataract Camp in Kurigram District',
    category: 'Relief Drive',
    isUrgent: false,
    excerpt: 'Collaborative medical mission providing 200+ free lens implantations and 1,500 ophthalmic screenings in northern flood-prone char areas.',
    content: 'In continuation of our healthcare accessibility mission, Afzal Charitable Trust in conjunction with volunteer ophthalmic surgeons from Dhaka Medical College will host a 3-day surgical eye camp at Ulipur Upazila Health Complex, Kurigram from April 18 to 20, 2026. Free medicines, diagnostic screenings, surgical kits, and customized eye-glasses will be provided to all eligible elderly villagers without any charges.',
    signatory: 'Director of Healthcare Operations'
  },
  {
    id: 'not-03',
    refNo: 'ACT/FIN/2025/REP-09',
    date: 'February 15, 2026',
    title: 'Publication of Annual Audited Financial & Impact Report (FY 2024-2025)',
    category: 'Annual Report',
    isUrgent: false,
    excerpt: 'In keeping with our foundational commitment to radical transparency, our complete financial statement and program audit are now available.',
    content: 'The Board of Trustees is pleased to release the complete, independent Chartered Accountant Audit Report for Fiscal Year 2024-2025. Over 91.4% of every donated Taka went directly to field beneficiaries in education, poverty relief, and community health. Download the complete 48-page comprehensive impact audit from our records office or online library.',
    signatory: 'Chief Financial Trustee'
  },
  {
    id: 'not-04',
    refNo: 'ACT/SOC/2026/012',
    date: 'January 10, 2026',
    title: 'Vocational Sewing & IT Center Inauguration for Third-Gender Community in Gazipur',
    category: 'Circular',
    isUrgent: false,
    excerpt: 'Establishment of permanent livelihood incubation center accommodating 60 trainees per batch with monthly dignity allowances.',
    content: 'We are thrilled to announce the opening of the Gazipur Center for Inclusivity & Livelihood. The facility features 25 commercial sewing machines, 15 modern desktop workstations, and dedicated counseling facilities aimed at mainstreaming third-gender and vulnerable youth into dignified corporate and self-employed livelihoods.',
    signatory: 'Director of Community Empowerment'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-01',
    title: 'Emergency Flood Rehabilitation & Clean Water Filtration Units',
    category: 'Poverty & Disaster Relief',
    description: 'Installing 25 solar-powered clean water plants and rebuilding storm-damaged homes for riverbank erosion families in northern Bangladesh.',
    targetBDT: 1500000,
    raisedBDT: 1125000,
    donorsCount: 384,
    image: '/src/assets/images/project_winter_poverty_aid_1791208410622.jpg',
    beneficiaries: '3,500 Families',
    urgency: 'Critical'
  },
  {
    id: 'camp-02',
    title: 'Rural Girls STEM & Digital Learning Classrooms',
    category: 'Education & Innovation',
    description: 'Supplying 60 refurbished laptops, high-speed satellite connectivity, and mentor fellowships to 4 girls schools in underprivileged rural upazilas.',
    targetBDT: 850000,
    raisedBDT: 620000,
    donorsCount: 219,
    image: '/src/assets/images/hero_community_empowerment_1791208356769.jpg',
    beneficiaries: '1,200 High School Students',
    urgency: 'Ongoing'
  },
  {
    id: 'camp-03',
    title: 'Free Cataract Surgeries & Elderly Care Mobile Clinic',
    category: 'Medical Assistance',
    description: 'Restoring sight for 300 destitute elderly grandmothers and grandfathers living in isolated char islands who cannot afford private surgical treatment.',
    targetBDT: 1200000,
    raisedBDT: 980000,
    donorsCount: 312,
    image: '/src/assets/images/project_medical_relief_1791208375776.jpg',
    beneficiaries: '300 Elderly Patients',
    urgency: 'High'
  },
  {
    id: 'camp-04',
    title: 'Third-Gender & Vulnerable Youth Micro-Enterprise Grants',
    category: 'Empowerment & Inclusion',
    description: 'Providing seed capital, sewing tools, and marketing support to 50 third-gender and disabled entrepreneurs to launch sustainable home businesses.',
    targetBDT: 750000,
    raisedBDT: 580000,
    donorsCount: 178,
    image: '/src/assets/images/project_vocational_skills_1791208393498.jpg',
    beneficiaries: '50 Micro-Enterprises',
    urgency: 'Ongoing'
  }
];

export const INITIAL_RECENT_DONORS = [
  { id: 'don-1', name: 'Dr. Rafiqul Islam & Family', amountBDT: 25000, campaignTitle: 'Free Cataract Surgeries', timeAgo: '12 mins ago' },
  { id: 'don-2', name: 'Ayesha Siddiqua', amountBDT: 5000, campaignTitle: 'Rural Girls STEM Classrooms', timeAgo: '45 mins ago' },
  { id: 'don-3', name: 'Anonymous Supporter (London)', amountBDT: 15000, campaignTitle: 'Emergency Flood Rehabilitation', timeAgo: '2 hours ago', isAnonymous: true },
  { id: 'don-4', name: 'Engr. Tanvir Ahmed', amountBDT: 10000, campaignTitle: 'Third-Gender Micro-Enterprise Grants', timeAgo: '4 hours ago' },
  { id: 'don-5', name: 'Shamsul Alam Chowdhury', amountBDT: 50000, campaignTitle: 'Emergency Flood Rehabilitation', timeAgo: 'Yesterday' }
];

export const GIFT_CARD_TIERS: GiftCardTier[] = [
  {
    id: 'gift-tier-5',
    amountUSD: 5,
    approxBDT: 600,
    tierName: 'Seed of Hope',
    impactDescription: 'Provides nutritious school meals and essential stationery sets for 3 primary students for a full week.',
    bgColorClass: 'bg-rose-50 border-rose-300 text-rose-950',
    textColorClass: 'text-rose-700',
    accentBorder: 'border-rose-400',
    fontStyleClass: 'font-sans font-medium',
    gradient: 'from-rose-500 to-red-600'
  },
  {
    id: 'gift-tier-15',
    amountUSD: 15,
    approxBDT: 1800,
    tierName: 'NutriCare Guardian',
    impactDescription: 'Funds a complete 1-month family emergency nutrition & dry food ration hamper in remote char areas.',
    bgColorClass: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    textColorClass: 'text-emerald-700',
    accentBorder: 'border-emerald-400',
    fontStyleClass: 'font-serif font-semibold tracking-wide',
    gradient: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'gift-tier-25',
    amountUSD: 25,
    approxBDT: 3000,
    tierName: 'Youth Scholar Patron',
    impactDescription: 'Covers full tuition, textbooks, and exam registrations for a talented village high school girl.',
    bgColorClass: 'bg-blue-50 border-blue-300 text-blue-950',
    textColorClass: 'text-blue-700',
    accentBorder: 'border-blue-400',
    fontStyleClass: 'font-sans font-bold tracking-tight',
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'gift-tier-50',
    amountUSD: 50,
    approxBDT: 6000,
    tierName: 'Medical Lifeline',
    impactDescription: 'Sponsors a complete cataract eye surgery or emergency prescription medicines for an abandoned senior citizen.',
    bgColorClass: 'bg-amber-50 border-amber-300 text-amber-950',
    textColorClass: 'text-amber-800',
    accentBorder: 'border-amber-400',
    fontStyleClass: 'font-serif italic font-medium',
    gradient: 'from-amber-600 to-yellow-700'
  },
  {
    id: 'gift-tier-75',
    amountUSD: 75,
    approxBDT: 9000,
    tierName: 'Sanctuary & Warmth',
    impactDescription: 'Supplies 15 warm winter blankets, thermal clothing, and emergency storm roof sheets for 3 vulnerable households.',
    bgColorClass: 'bg-purple-50 border-purple-300 text-purple-950',
    textColorClass: 'text-purple-700',
    accentBorder: 'border-purple-400',
    fontStyleClass: 'font-sans font-semibold tracking-wider uppercase',
    gradient: 'from-purple-600 to-violet-800'
  },
  {
    id: 'gift-tier-100',
    amountUSD: 100,
    approxBDT: 12000,
    tierName: 'Community Transformer',
    impactDescription: 'Funds a commercial sewing machine starter kit and vocational training for a third-gender or widowed artisan.',
    bgColorClass: 'bg-slate-900 border-amber-400 text-amber-50',
    textColorClass: 'text-amber-300',
    accentBorder: 'border-amber-400',
    fontStyleClass: 'font-serif font-bold tracking-normal',
    gradient: 'from-stone-900 via-neutral-900 to-stone-800'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Rural Education & Digital Literacy Drive',
    category: 'Education',
    location: 'Baniachong, Habiganj',
    date: 'February 2026',
    imageSrc: '/src/assets/images/hero_humanitarian_bangladesh_1791220911416.jpg',
    caption: 'Volunteer educators guiding village students with freshly provided STEM textbooks and digital learning kits in an open pavilion.',
    beneficiaryImpact: '140 Students Equipped'
  },
  {
    id: 'gal-2',
    title: 'Free Primary Healthcare & Diagnostic Camp',
    category: 'Healthcare',
    location: 'Razarhat, Kurigram',
    date: 'January 2026',
    imageSrc: '/src/assets/images/medical_camp_bangladesh_1791220934334.jpg',
    caption: 'Dedicated doctors performing cardiac screenings, diabetes tests, and distribution of essential medicines to elderly villagers.',
    beneficiaryImpact: '680 Elderly & Children Treated'
  },
  {
    id: 'gal-3',
    title: 'Inclusive Vocational Computer & Tailoring Lab',
    category: 'Empowerment',
    location: 'Tongi, Gazipur',
    date: 'March 2026',
    imageSrc: '/src/assets/images/vocational_training_center_1791220945792.jpg',
    caption: 'Third-gender and marginalized youths learning digital graphic skills and garment fabrication for independent sustainable livelihoods.',
    beneficiaryImpact: '45 Trainees Graduated'
  },
  {
    id: 'gal-4',
    title: 'Winter Warmth & Emergency Nutrition Aid',
    category: 'Poverty Relief',
    location: 'Gaibandha River Islands',
    date: 'December 2025',
    imageSrc: '/src/assets/images/winter_poverty_aid_1791220961101.jpg',
    caption: 'Distribution of thick thermal blankets and nutrient-rich food packs to river erosion affected families facing severe winter cold.',
    beneficiaryImpact: '1,200 Families Supported'
  }
];
