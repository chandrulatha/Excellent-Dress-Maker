import React, { useState } from 'react';
import { 
  Building2, GraduationCap, Car, Briefcase, 
  Send, CheckCircle, ShieldAlert, ArrowRight 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { SectionHeader } from './ui/SectionHeader';
import { motion } from 'framer-motion';
import { Reveal, SectionBackdrop, Stagger, staggerItemVariants } from './ui/motion';

export const CorporateSection: React.FC = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    orgType: 'Corporate Company',
    garmentType: 'Corporate Uniforms (Shirt + Pant)',
    quantity: '50-100 sets',
    deliveryDate: '',
    requirements: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const institutionalCategories = [
    { title: "School Uniforms", icon: GraduationCap, desc: "Tough, breathable, washable student uniforms adhering strictly to school color boards and badges." },
    { title: "Corporate Uniforms", icon: Briefcase, desc: "Sharp executive suits, formal shirts, and trousers engineered for daily corporate presence." },
    { title: "Automotive Uniforms", icon: Car, desc: "Showroom sales executive wear and heavy-duty technician workwear customized with corporate brand embroidery." },
    { title: "Staff & Organization Wear", icon: Building2, desc: "Hospitality, administrative staff, club members, and civic foundation bulk tailoring with custom sizing." },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orgName || !formData.contactPerson || !formData.mobile) {
      setErrorMsg('Please fill in Organization Name, Contact Person, and Mobile Number.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleForwardWhatsApp = () => {
    const text = `*Bulk Order / Institutional Quote Request*%0A%0A*Organization:* ${encodeURIComponent(formData.orgName)}%0A*Contact Person:* ${encodeURIComponent(formData.contactPerson)}%0A*Mobile:* ${encodeURIComponent(formData.mobile)}%0A*Email:* ${encodeURIComponent(formData.email || 'N/A')}%0A*Org Type:* ${encodeURIComponent(formData.orgType)}%0A*Garment Type:* ${encodeURIComponent(formData.garmentType)}%0A*Quantity:* ${encodeURIComponent(formData.quantity)}%0A*Target Date:* ${encodeURIComponent(formData.deliveryDate || 'Flexible')}%0A*Notes:* ${encodeURIComponent(formData.requirements || 'N/A')}`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden" aria-label="Corporate & Institutional Tailoring">
      <SectionBackdrop word="UNIFORMS" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="B2B & Institutional Outfitting"
          eyebrowIcon={Building2}
          title="Tailoring Excellence for Institutions & Organizations"
          description="From school uniforms to corporate apparel, we provide professional tailoring solutions for institutions, businesses, and organizations that value quality, consistency, and reliability."
        />

        {/* Categories Showcase */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {institutionalCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={staggerItemVariants}
                custom={idx}
                whileHover={{ y: -5 }}
                className="bg-navy-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-gold-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center mb-4 border border-gold-400/20">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider flex items-center gap-1">
                  Custom Batch Sizing
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </div>
              </motion.div>
            );
          })}
        </Stagger>

        {/* Quotation Request Form Container */}
        <Reveal className="bg-navy-900/90 rounded-2xl border border-slate-800 shadow-2xl max-w-4xl mx-auto overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="max-w-xl mb-8">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block mb-1">
                Institutional Request
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Request a Bulk Order Quote
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                Our tailoring director will review your garment requirements, volume tiers, fabric samples, and provide transparent per-unit pricing.
              </p>
            </div>

            {submitted ? (
              <div className="bg-navy-950 p-8 rounded-xl border border-emerald-500/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-7 h-7" aria-hidden="true" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">Quotation Request Prepared!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for considering Excellent Dress Makers for <span className="text-gold-300 font-semibold">{formData.orgName}</span>. Your details are ready to be dispatched to our commercial sales desk.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2.5">
                  <button
                    onClick={handleForwardWhatsApp}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Send Directly via WhatsApp Desk
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-3 border border-slate-700 text-slate-300 rounded-lg text-xs transition hover:bg-slate-800"
                  >
                    Edit Information
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Organization Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Organization / School Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Geethanjali International School"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Contact Person & Designation <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mr. K. Selvam, Admin Manager"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Mobile Number <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9443354440"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="admin@school.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Organization Type */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Organization Category
                    </label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    >
                      <option value="School / College / Educational Institution">School / College / Educational Institution</option>
                      <option value="Automotive Dealership">Automotive Dealership</option>
                      <option value="Corporate Office">Corporate Office / IT Company</option>
                      <option value="Hospitality / Hotel">Hospitality / Hotel</option>
                      <option value="Civic Organization (Rotary/JCI/Trust)">Civic Club / Social Trust</option>
                    </select>
                  </div>

                  {/* Garment Type */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Garment Requirement
                    </label>
                    <select
                      value={formData.garmentType}
                      onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    >
                      <option value="School Uniforms (Shirt + Pant / Pinafore)">School Uniforms (Shirt + Pant / Pinafore)</option>
                      <option value="Corporate Uniforms (Shirt + Trousers)">Corporate Uniforms (Shirt + Trousers)</option>
                      <option value="Blazer / Executive Coat Suits">Blazer / Executive Coat Suits</option>
                      <option value="Automotive Technician Overalls / Uniforms">Automotive Technician Uniforms</option>
                      <option value="Waistcoats / Customized Club Attire">Waistcoats / Club Attire</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Estimated Quantity (Sets)
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    >
                      <option value="25 - 50 sets">25 - 50 sets</option>
                      <option value="50 - 150 sets">50 - 150 sets</option>
                      <option value="150 - 500 sets">150 - 500 sets</option>
                      <option value="500+ sets (Large Campus)">500+ sets (Large Campus)</option>
                    </select>
                  </div>

                  {/* Required Delivery Date */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Target Delivery Date
                    </label>
                    <input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Specific Requirements (Logo embroidery, fabric specifications, on-site campus measurement sessions)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about batch size, badge embroidery, color codes, or if master tailors need to visit your campus for measurement sessions..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700/80 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-gold-500/20 hover:brightness-110 active:scale-95 transition"
                  >
                    Submit Bulk Order Quote Request
                  </button>
                </div>
              </form>
            )}

          </div>
        </Reveal>

      </div>
    </section>
  );
};
