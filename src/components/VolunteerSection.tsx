import React, { useState, useEffect } from 'react';
import { 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  Share2, 
  ArrowRight,
  Stethoscope,
  GraduationCap,
  Ambulance,
  Trees,
  Camera,
  Scale,
  HandHeart,
  Clock,
  BookOpen,
  QrCode,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VolunteerRegistration } from '../types';
import { TRUST_NAME, TRUST_MOTTO, bangladeshDistricts } from '../data/mockData';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { TrustLogo } from './TrustLogo';

interface VolunteerSectionProps {
  onOpenShare: (title: string, text: string) => void;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({ onOpenShare }) => {
  // Available Focus Areas
  const FOCUS_AREAS = [
    { id: 'disaster', label: 'Disaster Relief & Flood Rescue', icon: Ambulance, description: 'Rapid field deployment, emergency rations delivery, flood boat operations.' },
    { id: 'healthcare', label: 'Free Medical Camps & Clinical Care', icon: Stethoscope, description: 'Physician consultations, mobile dispensaries, eye cataract screenings.' },
    { id: 'orphan-edu', label: 'Orphan Education & Tutoring', icon: GraduationCap, description: 'Academic mentoring, STEM coaching, book distribution for children.' },
    { id: 'widows-elderly', label: 'Widows Sanctuary & Senior Support', icon: HandHeart, description: 'Elderly companionship, nutritional assistance, care facility aid.' },
    { id: 'environment', label: 'Afforestation & Clean Water Units', icon: Trees, description: 'Tree seedling planting drives, tube-well setup, climate resilience.' },
    { id: 'vocational', label: 'Vocational Training & Livelihoods', icon: BookOpen, description: 'Sewing machine training, basic digital literacy, artisan workshops.' },
    { id: 'legal-aid', label: 'Human Rights & Free Legal Aid', icon: Scale, description: 'Legal counseling for marginalized families, document verification.' },
    { id: 'media-digital', label: 'Digital Storytelling & Photography', icon: Camera, description: 'Field documentary photography, social reporting, community awareness.' }
  ];

  // Expertise Categories
  const EXPERTISE_OPTIONS = [
    'Physician / Doctor (MBBS / Specialist)',
    'Nurse / Paramedic / Healthcare Worker',
    'School Teacher / College Professor / Educator',
    'Civil / Structural / Water Resource Engineer',
    'Software Engineer / IT & Digital Media Specialist',
    'Lawyer / Legal Researcher / Paralegal',
    'Psychologist / Mental Health Counselor',
    'Disaster & Emergency First Responder',
    'University / College Student',
    'Business / Operations / Logistics Manager',
    'Community Leader / Dedicated Social Worker',
    'Other Specialized Field'
  ];

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [primaryExpertise, setPrimaryExpertise] = useState(EXPERTISE_OPTIONS[0]);
  const [secondarySkills, setSecondarySkills] = useState('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([FOCUS_AREAS[0].id, FOCUS_AREAS[1].id]);
  const [availability, setAvailability] = useState<'Weekends Only' | 'Emergency / Rapid Deployment' | 'Flexible Weekdays' | 'Remote / Digital Only'>('Weekends Only');
  const [motivationNote, setMotivationNote] = useState('');
  const [agreedToCharter, setAgreedToCharter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Issued Pass
  const [issuedVolunteer, setIssuedVolunteer] = useState<VolunteerRegistration | null>(null);
  const [volunteerQrUrl, setVolunteerQrUrl] = useState<string>('');

  // Section Volunteer Signup QR Code
  const [signupQrUrl, setSignupQrUrl] = useState<string>('');
  const [showFlyerModal, setShowFlyerModal] = useState<boolean>(false);

  useEffect(() => {
    generateQrDataUrl('https://afzalcharitabletrust.org.bd/#volunteer', 280)
      .then(url => setSignupQrUrl(url));
  }, []);

  // Sample recent volunteers on the corps roll
  const [recentCorps, setRecentCorps] = useState<VolunteerRegistration[]>([
    {
      volunteerId: 'ACT-VOL-2026-1042',
      fullName: 'Dr. Nusrat Jahan Chowdhury',
      email: 'nusrat@med.ac.bd',
      phone: '01712-XXXXXX',
      district: 'Sylhet',
      primaryExpertise: 'Physician / Doctor (MBBS / Specialist)',
      selectedFocusAreas: ['Free Medical Camps & Clinical Care', 'Disaster Relief & Flood Rescue'],
      availability: 'Emergency / Rapid Deployment',
      joinedDate: 'March 2026'
    },
    {
      volunteerId: 'ACT-VOL-2026-1039',
      fullName: 'Kazi Farhan Tanvir',
      email: 'farhan.t@eng.buet.ac.bd',
      phone: '01819-XXXXXX',
      district: 'Dhaka',
      primaryExpertise: 'Civil / Structural / Water Resource Engineer',
      selectedFocusAreas: ['Afforestation & Clean Water Units', 'Orphan Education & Tutoring'],
      availability: 'Weekends Only',
      joinedDate: 'March 2026'
    },
    {
      volunteerId: 'ACT-VOL-2026-1035',
      fullName: 'Tahmina Begum',
      email: 'tahmina.ctg@example.com',
      phone: '01911-XXXXXX',
      district: 'Chattogram',
      primaryExpertise: 'School Teacher / College Professor / Educator',
      selectedFocusAreas: ['Orphan Education & Tutoring', 'Vocational Training & Livelihoods'],
      availability: 'Flexible Weekdays',
      joinedDate: 'March 2026'
    }
  ]);

  const toggleFocusArea = (id: string) => {
    if (selectedFocusAreas.includes(id)) {
      if (selectedFocusAreas.length > 1) {
        setSelectedFocusAreas(selectedFocusAreas.filter(a => a !== id));
      }
    } else {
      setSelectedFocusAreas([...selectedFocusAreas, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !agreedToCharter) return;

    setIsSubmitting(true);
    const volId = `ACT-VOL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const qr = await generateQrDataUrl(`https://afzalcharitabletrust.org.bd/volunteer/verify/${volId}`, 160);

    const selectedAreaLabels = selectedFocusAreas.map(id => {
      const found = FOCUS_AREAS.find(f => f.id === id);
      return found ? found.label : id;
    });

    setTimeout(() => {
      const newVolunteer: VolunteerRegistration = {
        volunteerId: volId,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        district,
        primaryExpertise,
        secondarySkills: secondarySkills.trim() || undefined,
        selectedFocusAreas: selectedAreaLabels,
        availability,
        motivationNote: motivationNote.trim() || undefined,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };

      setRecentCorps(prev => [newVolunteer, ...prev]);
      setVolunteerQrUrl(qr);
      setIssuedVolunteer(newVolunteer);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 1100);
  };

  const handleResetForm = () => {
    setIssuedVolunteer(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setMotivationNote('');
    setSecondarySkills('');
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200" id="volunteer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold mb-3 shadow-xs">
            <HeartHandshake className="w-4 h-4 text-emerald-800" />
            <span>Afzal Humanitarian Volunteer Corps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Volunteer Signup & Community Mobilization
          </h2>
          <div className="w-20 h-1 bg-amber-600 mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
            Lend your skills, knowledge, and compassion to uplifting vulnerable families across Bangladesh. 
            Register your interest for our specific focus areas, from emergency disaster response and free clinical camps 
            to orphan tutoring and environmental greening.
          </p>

          {/* Official Security & Free Enrollment Notice */}
          <div className="mt-5 p-3.5 bg-[#FAF9F5] border border-emerald-700/40 rounded-2xl shadow-xs max-w-2xl mx-auto flex items-center justify-center gap-2.5 text-xs text-stone-800 text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
            <span>
              <strong className="text-emerald-950">Official Direct Enrollment:</strong> Volunteer enrollment is 100% free of charge. Supporters will register and submit their details <strong>through this official website only</strong>. We never charge any administrative or application fees.
            </span>
          </div>
        </div>

        {/* Highlight Stats / Units */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 text-center">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 block">1,420+</span>
            <span className="text-xs text-stone-600 font-medium">Registered Field Volunteers</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 block">64</span>
            <span className="text-xs text-stone-600 font-medium">Districts Covered in Bangladesh</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 block">280+</span>
            <span className="text-xs text-stone-600 font-medium">Doctors & Medical Pros Enlisted</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 block">24/7</span>
            <span className="text-xs text-stone-600 font-medium">Emergency Disaster Readiness</span>
          </div>
        </div>

        {/* Main Content Grid: Form / Issued Pass + Corps Roll */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (8 cols): Interactive Registration Form or Issued Volunteer Pass */}
          <div className="lg:col-span-8 bg-[#FAF9F5] p-6 sm:p-10 rounded-3xl border border-stone-300 shadow-md">
            
            {issuedVolunteer ? (
              /* Success / Digital Volunteer Pass */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950">
                    <strong className="block font-bold text-sm text-emerald-900">
                      Welcome to the Afzal Humanitarian Volunteer Corps!
                    </strong>
                    Your volunteer registration has been recorded in the national trust registry. 
                    A confirmation packet has been dispatched to <strong>{issuedVolunteer.email}</strong>. 
                    Your official Volunteer ID Card is generated below.
                  </div>
                </div>

                {/* Printable Digital Volunteer Card */}
                <div className="certificate-print-area bg-white p-6 sm:p-8 rounded-2xl border-4 border-emerald-900 shadow-xl relative overflow-hidden">
                  <div className="border-2 border-amber-600/70 p-5 sm:p-6 rounded-xl space-y-4">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                      <div className="flex items-center gap-3">
                        <TrustLogo size="sm" variant="seal" />
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-900 block">
                            Afzal Charitable Trust · Volunteer Corps
                          </span>
                          <h4 className="font-serif font-bold text-lg text-stone-900">
                            Official Volunteer Credential Pass
                          </h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-stone-500 block uppercase">Volunteer ID</span>
                        <strong className="font-mono text-xs sm:text-sm text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {issuedVolunteer.volunteerId}
                        </strong>
                      </div>
                    </div>

                    {/* Volunteer Credentials Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="sm:col-span-2 space-y-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">
                            Volunteer Full Name
                          </span>
                          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                            {issuedVolunteer.fullName}
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-stone-500 block text-[11px]">Primary Expertise:</span>
                            <strong className="text-stone-800">{issuedVolunteer.primaryExpertise}</strong>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[11px]">Stationed District:</span>
                            <strong className="text-stone-800">{issuedVolunteer.district}, Bangladesh</strong>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[11px]">Deployment Availability:</span>
                            <span className="text-emerald-900 font-semibold">{issuedVolunteer.availability}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[11px]">Enlistment Date:</span>
                            <span className="text-stone-700">{issuedVolunteer.joinedDate}</span>
                          </div>
                        </div>

                        {/* Registered Focus Areas */}
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block mb-1">
                            Registered Focus Pillars:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {issuedVolunteer.selectedFocusAreas.map((area, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-md text-[10px] font-medium">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* QR & Verification */}
                      <div className="flex flex-col items-center justify-center p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                        {volunteerQrUrl && (
                          <img 
                            src={volunteerQrUrl} 
                            alt="Volunteer Credential QR" 
                            className="w-28 h-28 object-contain rounded border border-stone-300 shadow-2xs" 
                          />
                        )}
                        <span className="text-[9px] font-mono text-emerald-900 uppercase font-bold mt-1.5">
                          Field Verification QR
                        </span>
                        <span className="text-[8px] text-stone-500 mt-0.5">
                          Scan to verify authorization
                        </span>
                      </div>
                    </div>

                    {/* Footer / Signoff */}
                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                      <span>Certified under the Humanitarian Charter of Afzal Charitable Trust.</span>
                      <span className="font-serif italic text-emerald-950 font-bold">Board of Trustees</span>
                    </div>

                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 px-5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Volunteer Pass</span>
                  </button>
                  <button
                    onClick={() => onOpenShare(
                      'Afzal Humanitarian Volunteer Corps',
                      `I just enrolled as a certified volunteer with Afzal Charitable Trust! Volunteer ID: ${issuedVolunteer.volunteerId}. Join the humanitarian movement across Bangladesh.`
                    )}
                    className="px-5 py-3 bg-stone-200 hover:bg-stone-300 text-stone-900 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Enlistment</span>
                  </button>
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-3 text-xs text-emerald-800 hover:text-emerald-950 font-semibold"
                  >
                    Register Another Volunteer
                  </button>
                </div>

              </div>
            ) : (
              /* The Comprehensive Registration Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                    Volunteer Enlistment Dossier
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Please provide your authentic contact details, professional background, and selected focus areas.
                  </p>
                </div>

                {/* 1. Contact Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] flex items-center justify-center">1</span>
                    <span>Contact Information & Location</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Sabrina Yasmin / Engr. Tanvir Ahmed"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. volunteer@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Mobile Phone / WhatsApp (BD) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 01712 345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Home District (Bangladesh) *
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700"
                      >
                        {bangladeshDistricts.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Area of Expertise & Skills */}
                <div className="space-y-4 pt-2 border-t border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] flex items-center justify-center">2</span>
                    <span>Professional Background & Area of Expertise</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Primary Area of Expertise *
                      </label>
                      <select
                        value={primaryExpertise}
                        onChange={(e) => setPrimaryExpertise(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700"
                      >
                        {EXPERTISE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Secondary Skills / Certifications (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CPR certified, Drone operator, English/Bengali translator"
                        value={secondarySkills}
                        onChange={(e) => setSecondarySkills(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Specific Focus Areas of Interest */}
                <div className="space-y-4 pt-2 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                      <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] flex items-center justify-center">3</span>
                      <span>Select Specific Focus Areas of Interest *</span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">Select one or more</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FOCUS_AREAS.map(area => {
                      const Icon = area.icon;
                      const isSelected = selectedFocusAreas.includes(area.id);
                      return (
                        <div
                          key={area.id}
                          onClick={() => toggleFocusArea(area.id)}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                            isSelected 
                              ? 'border-emerald-800 bg-white shadow-xs ring-1 ring-emerald-800/20' 
                              : 'border-stone-200 bg-stone-50/60 hover:bg-white text-stone-700'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-800 text-amber-300' : 'bg-stone-200 text-stone-600'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-stone-900 leading-snug">
                                {area.label}
                              </span>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4 ml-2"
                              />
                            </div>
                            <p className="text-[11px] text-stone-500 mt-0.5 leading-snug line-clamp-2">
                              {area.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Availability & Motivation */}
                <div className="space-y-4 pt-2 border-t border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] flex items-center justify-center">4</span>
                    <span>Deployment Availability & Motivation</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        When are you available for deployment? *
                      </label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700"
                      >
                        <option value="Weekends Only">Weekends Only (Sat - Sun)</option>
                        <option value="Emergency / Rapid Deployment">Emergency / Rapid Deployment (Flood, Cyclone, Disaster)</option>
                        <option value="Flexible Weekdays">Flexible Weekdays (On coordination)</option>
                        <option value="Remote / Digital Only">Remote / Digital Only (Design, Content, Coordination)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Personal Statement / Motivation (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Why do you wish to volunteer with Afzal Charitable Trust? Any past community service..."
                        value={motivationNote}
                        onChange={(e) => setMotivationNote(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Charter Acceptance Checkbox */}
                <div className="p-3.5 bg-white rounded-2xl border border-stone-200 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="vol-charter"
                    required
                    checked={agreedToCharter}
                    onChange={(e) => setAgreedToCharter(e.target.checked)}
                    className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="vol-charter" className="text-xs text-stone-700 cursor-pointer leading-relaxed">
                    I pledge to uphold the humanitarian principles, non-discrimination charter, and ethical standards of 
                    <strong> Afzal Charitable Trust</strong>. I understand that volunteering is an honorary service dedicated to the welfare of Bangladesh.
                  </label>
                </div>

                {/* Direct Website-Only Advisory Banner */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>
                    <strong>Official Direct Portal:</strong> Supporters will submit their volunteer registration through this website only. No third-party agencies are authorized.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !agreedToCharter}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Registering Volunteer & Generating Field Pass...</span>
                  ) : (
                    <>
                      <HeartHandshake className="w-4 h-4 text-amber-300" />
                      <span>Submit Volunteer Registration & Generate Official Pass</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* Right Column (4 cols): QR Code, What Volunteers Receive, Live Roll */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Dedicated Volunteer Signup QR Code Card */}
            <div className="p-6 bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white rounded-3xl border-2 border-amber-400 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-400 text-stone-950">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                      Mobile & Field Enlistment
                    </span>
                    <h4 className="font-serif font-bold text-base text-white">
                      Volunteer Signup QR Code
                    </h4>
                  </div>
                </div>
                <TrustLogo size="xs" />
              </div>

              {/* QR Image Box */}
              <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-inner relative group">
                {signupQrUrl ? (
                  <img 
                    src={signupQrUrl} 
                    alt="Scan to sign up as Afzal Charitable Trust Volunteer" 
                    className="w-44 h-44 object-contain rounded-lg border border-stone-200"
                  />
                ) : (
                  <div className="w-44 h-44 bg-stone-100 animate-pulse rounded-lg flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-stone-400" />
                  </div>
                )}

                <div className="mt-2 text-stone-800 text-[11px] font-sans">
                  <strong className="block font-bold text-emerald-950">
                    Instant Smartphone Access
                  </strong>
                  Scan to load this volunteer form directly on mobile
                </div>
              </div>

              {/* QR Flyer Button */}
              <button
                type="button"
                onClick={() => setShowFlyerModal(true)}
                className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View & Print Recruitment Flyer</span>
              </button>
            </div>

            {/* What Volunteers Receive Card */}
            <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span>What Volunteers Receive</span>
              </h4>

              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Official Digital ID Pass & QR Code:</strong> Verified accreditation for field deployment and event security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Humanitarian Service Certificate:</strong> Issued upon completion of field campaigns, recognized for career portfolios.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>First-Aid & Disaster Training:</strong> Free workshops conducted by veteran emergency responders and doctors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>District Volunteer Network:</strong> Active WhatsApp channels with local coordinators across all 64 districts.</span>
                </li>
              </ul>
            </div>

            {/* Live Volunteer Corps Roll */}
            <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-800" />
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Recent Enlistment Roll
                  </h4>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-3">
                {recentCorps.slice(0, 4).map((vol) => (
                  <div key={vol.volunteerId} className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <strong className="text-stone-900 font-sans">{vol.fullName}</strong>
                      <span className="font-mono text-emerald-900 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        {vol.district}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-600 truncate">
                      {vol.primaryExpertise}
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {vol.selectedFocusAreas.slice(0, 2).map((a, i) => (
                        <span key={i} className="text-[9px] bg-white border border-stone-200 px-1.5 py-0.5 rounded text-stone-600">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-stone-500 italic">
                  Join 1,420+ patriots serving Bangladesh.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Volunteer Recruitment QR Flyer Modal */}
      {showFlyerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Bar */}
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrustLogo size="xs" variant="seal" />
                <span className="font-serif font-bold text-sm text-white">
                  Official Volunteer Recruitment Poster & QR
                </span>
              </div>
              <button
                onClick={() => setShowFlyerModal(false)}
                className="text-white/80 hover:text-white text-xl p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Flyer Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div className="certificate-print-area bg-[#FAF9F5] p-6 sm:p-8 rounded-2xl border-4 border-emerald-900 text-center space-y-4 shadow-sm">
                <div className="flex justify-center mb-1">
                  <TrustLogo size="md" variant="seal" />
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-950 block">
                    People’s Humanitarian Movement of Bangladesh
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
                    {TRUST_NAME}
                  </h3>
                  <p className="text-xs font-serif italic text-stone-600 mt-1">
                    "Compassion · Empowerment · Human Dignity"
                  </p>
                </div>

                <div className="w-16 h-0.5 bg-amber-500 mx-auto" />

                <div className="py-2">
                  <h4 className="font-serif font-bold text-lg text-emerald-950">
                    Join the Humanitarian Volunteer Corps
                  </h4>
                  <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
                    Mobilizing doctors, teachers, engineers, students, and citizens across 64 districts 
                    for disaster relief, free healthcare, and orphan welfare.
                  </p>
                </div>

                {/* Big QR In Flyer */}
                <div className="inline-block p-4 bg-white rounded-2xl border-2 border-stone-300 shadow-md">
                  {signupQrUrl && (
                    <img 
                      src={signupQrUrl} 
                      alt="Volunteer Signup QR Code" 
                      className="w-48 h-48 object-contain"
                    />
                  )}
                  <span className="text-[10px] font-mono text-emerald-950 block font-bold mt-2 uppercase">
                    Scan With Smartphone Camera
                  </span>
                  <span className="text-[9px] text-stone-500">
                    afzalcharitabletrust.org.bd/#volunteer
                  </span>
                </div>

                <div className="pt-2 text-[11px] text-stone-500">
                  <span>Free Enrollment · Authorized Non-Profit Trust · Verified Credential ID Issued</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Recruitment Flyer (A4)</span>
                </button>
                <button
                  onClick={() => onOpenShare(
                    'Afzal Volunteer Recruitment QR Code',
                    'Join the nationwide volunteer movement with Afzal Charitable Trust! Scan the QR code or sign up at afzalcharitabletrust.org.bd/#volunteer'
                  )}
                  className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Flyer Link</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
