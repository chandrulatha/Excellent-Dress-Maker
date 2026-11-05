import React, { useState } from 'react';
import { 
  MapPin, Phone, Clock, MessageCircle, ExternalLink, 
  CheckCircle2, ShieldAlert 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal, SectionBackdrop, Stagger, StaggerItem } from './ui/motion';

export const ContactSection: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Tailoring Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      setErrorMsg('Please provide your Name, Phone Number, and Message.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `*Website Contact Enquiry*%0A*Name:* ${encodeURIComponent(contactForm.name)}%0A*Phone:* ${encodeURIComponent(contactForm.phone)}%0A*Subject:* ${encodeURIComponent(contactForm.subject)}%0A*Message:* ${encodeURIComponent(contactForm.message)}`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden" aria-label="Contact and Atelier Location">
      <SectionBackdrop word="VISIT" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Find Our Atelier"
          eyebrowIcon={MapPin}
          title="Visit Excellent Dress Makers"
          description="Located conveniently opposite Erode Collectorate on Perundurai Road. Drop in for measurements, fabric consultations, or order collection."
        />

        {/* 2-Column Info & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Left Column: Contact Cards */}
          <Stagger className="lg:col-span-5 space-y-4">
            
            {/* Address Card */}
            <StaggerItem index={0} className="bg-navy-900/80 rounded-2xl p-5 border border-slate-800/80 hover:border-gold-500/40 transition">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 border border-gold-400/20">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white mb-1">
                    Atelier & Workshop Address
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {BUSINESS_INFO.address.full}
                  </p>
                  <p className="text-xs text-gold-400 mt-1">
                    Landmark: {BUSINESS_INFO.address.landmark}, Near Erode Collectorate Complex
                  </p>
                  <a
                    href={BUSINESS_INFO.socialLinks.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-semibold mt-2.5 underline underline-offset-4"
                  >
                    <span>Open in Google Maps Navigation</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </StaggerItem>

            {/* Direct Phone & Landline */}
            <StaggerItem index={1} className="bg-navy-900/80 rounded-2xl p-5 border border-slate-800/80 hover:border-gold-500/40 transition">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 border border-gold-400/20">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-serif text-base font-bold text-white">
                    Direct Phone & Helpline
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="hover:text-gold-300 font-semibold">
                      Mobile: {BUSINESS_INFO.primaryPhone}
                    </a>
                    <span className="hidden sm:inline text-slate-600">•</span>
                    <a href={`tel:${BUSINESS_INFO.landlinePhone}`} className="hover:text-gold-300 font-semibold">
                      Landline: {BUSINESS_INFO.landlinePhone}
                    </a>
                  </div>
                  <p className="text-xs text-slate-400 pt-1 leading-normal">
                    Direct communication for order status, fitting trials, and bulk uniform quotes.
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Business Hours */}
            <StaggerItem index={2} className="bg-navy-900/80 rounded-2xl p-5 border border-slate-800/80 hover:border-gold-500/40 transition">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 border border-gold-400/20">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white mb-0.5">
                    Operating Hours
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {BUSINESS_INFO.workingHours.weekdays}
                  </p>
                  <p className="text-xs text-gold-400 mt-0.5">
                    {BUSINESS_INFO.workingHours.sunday}
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Google Map Container */}
            <StaggerItem index={3} className="rounded-2xl overflow-hidden border border-slate-800 h-56 bg-navy-900 relative">
              <iframe
                title="Google Maps Location - Excellent Dress Makers Erode"
                src="https://maps.google.com/maps?q=No+375+Erode+Collectorate+Perundurai+Road+Erode+638011&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                loading="lazy"
              />
            </StaggerItem>

          </Stagger>

          {/* Right Column: Contact & Message Enquiry Form */}
          <div className="lg:col-span-7">
            <Reveal className="bg-navy-900/90 rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1.5">
                Send Us an Enquiry
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                Have questions about our custom stitching, wedding suit packages, or bulk uniform quotes? Send us a message and our master tailor will respond promptly.
              </p>

              {submitted ? (
                <div className="bg-navy-950 p-8 rounded-xl border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">Message Ready!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you <span className="text-gold-300 font-semibold">{contactForm.name}</span>. We have captured your enquiry regarding "{contactForm.subject}".
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2.5">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Send via WhatsApp Directly
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 border border-slate-700 text-slate-300 rounded-lg text-xs hover:bg-slate-800 font-semibold"
                    >
                      New Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Your Full Name <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Senthil Nathan"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Mobile Number <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9443354440"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Subject of Interest
                      </label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                      >
                        <option value="General Tailoring Enquiry">General Tailoring Enquiry</option>
                        <option value="Suit / Blazer Stitching">Suit / Blazer Stitching</option>
                        <option value="School / Corporate Uniforms">School / Corporate Uniforms</option>
                        <option value="Wedding / Festive Package">Wedding / Festive Package</option>
                        <option value="Fitting or Order Follow-up">Fitting or Order Follow-up</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Message / Enquiry Details <span className="text-gold-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please let us know how many garments you need tailored, preferred fabric, or target dates..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-gold-500/20 hover:brightness-110 active:scale-95 transition"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
};
