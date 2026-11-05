import React, { useState } from 'react';
import { 
  X, Calendar, Clock, User, Phone, Scissors, 
  CheckCircle, Send, Download, Check
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/businessData';
import { saveAppointment, AppointmentRecord } from '../utils/appointmentStorage';
import confetti from 'canvas-confetti';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preSelectedService
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preSelectedService || 'Shirt Stitching',
    date: '',
    time: '10:00 AM - 12:00 PM',
    garmentsCount: '2',
    requirements: ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRecord | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Full name is required';
    if (!formData.phone.trim() || !/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      err.phone = 'Valid 10-digit mobile number is required';
    }
    if (!formData.date) err.date = 'Please pick a preferred date';
    return err;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save locally in client-side storage so the booking is persisted across sessions
    const record = saveAppointment({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      date: formData.date,
      time: formData.time,
      garmentsCount: formData.garmentsCount,
      requirements: formData.requirements
    });

    setConfirmedBooking(record);

    // Subtle celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C89D42', '#DFB86C', '#1C325B']
    });
  };

  const handleSendViaWhatsApp = () => {
    if (!confirmedBooking) return;
    const msg = `*Appointment Confirmation - Excellent Dress Makers*%0A%0A*Booking ID:* ${confirmedBooking.id}%0A*Name:* ${encodeURIComponent(confirmedBooking.name)}%0A*Phone:* ${encodeURIComponent(confirmedBooking.phone)}%0A*Service:* ${encodeURIComponent(confirmedBooking.service)}%0A*Date:* ${encodeURIComponent(confirmedBooking.date)}%0A*Time Slot:* ${encodeURIComponent(confirmedBooking.time)}%0A*Garments:* ${encodeURIComponent(confirmedBooking.garmentsCount)}%0A*Notes:* ${encodeURIComponent(confirmedBooking.requirements || 'N/A')}`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${msg}`, '_blank');
  };

  const handleDownloadConfirmation = () => {
    if (!confirmedBooking) return;
    const slipText = `=========================================
EXCELLENT DRESS MAKERS - APPOINTMENT SLIP
=========================================
Booking Reference : ${confirmedBooking.id}
Date Booked       : ${new Date(confirmedBooking.createdAt).toLocaleString('en-IN')}
Customer Name     : ${confirmedBooking.name}
Contact Number    : ${confirmedBooking.phone}
Tailoring Service : ${confirmedBooking.service}
Scheduled Date    : ${confirmedBooking.date}
Scheduled Slot    : ${confirmedBooking.time}
Garments Expected : ${confirmedBooking.garmentsCount}
Special Notes     : ${confirmedBooking.requirements || 'None'}

ATELIER LOCATION:
${BUSINESS_INFO.address.full}
Direct Helpline : ${BUSINESS_INFO.primaryPhone} / ${BUSINESS_INFO.landlinePhone}
Hours: ${BUSINESS_INFO.workingHours.weekdays}
=========================================
Please bring this reference ID or show this slip on arrival.`;

    const blob = new Blob([slipText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Appointment_${confirmedBooking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyId = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(confirmedBooking.id);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setErrors({});
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-appointment-title"
    >
      <div className="relative bg-navy-950 border border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="bg-navy-900/90 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-400/20 flex items-center justify-center text-gold-400">
              <Calendar className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="modal-appointment-title" className="font-serif text-lg font-bold text-white">Book an Appointment</h3>
              <p className="text-[11px] text-gold-400">In-shop Measurement & Style Consultation</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close appointment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {confirmedBooking ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8" aria-hidden="true" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block mb-1">
                  ✓ Booking Confirmed & Stored
                </span>
                <h4 className="font-serif text-2xl font-bold text-white">
                  Appointment Scheduled!
                </h4>
              </div>

              {/* Reference ID Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-navy-900 border border-gold-400/40 text-gold-300">
                <span className="text-xs text-slate-400 font-mono">Reference:</span>
                <span className="font-mono font-bold text-sm text-gold-300">{confirmedBooking.id}</span>
                <button
                  onClick={handleCopyId}
                  className="ml-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1"
                  title="Copy reference ID"
                >
                  {copiedToken ? <Check className="w-3 h-3 text-emerald-400" /> : 'Copy'}
                </button>
              </div>

              {/* Appointment summary receipt */}
              <div className="bg-navy-900/90 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2 text-slate-300">
                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Client Name</span>
                    <strong className="text-white text-xs">{confirmedBooking.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Mobile</span>
                    <strong className="text-white text-xs">{confirmedBooking.phone}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Service Selected</span>
                    <strong className="text-gold-300 text-xs">{confirmedBooking.service}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Quantity</span>
                    <strong className="text-white text-xs">{confirmedBooking.garmentsCount} Garment(s)</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-1">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Visit Date</span>
                    <strong className="text-white text-xs">{confirmedBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Slot</span>
                    <strong className="text-white text-xs">{confirmedBooking.time}</strong>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
                  <p><strong className="text-gold-400">Atelier:</strong> {BUSINESS_INFO.address.full}</p>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Dispatch & Text Slip Download */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition shadow-md"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Forward to WhatsApp
                </button>
                <button
                  onClick={handleDownloadConfirmation}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-navy-800 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
                >
                  <Download className="w-4 h-4 text-gold-400" />
                  Save Slip (.txt)
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="px-4 py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name <span className="text-gold-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-navy-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Mobile Number <span className="text-gold-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" aria-hidden="true" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-navy-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Service Selection & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tailoring Service <span className="text-gold-400">*</span>
                  </label>
                  <div className="relative">
                    <Scissors className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" aria-hidden="true" />
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-navy-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.name}>
                          {srv.name} ({srv.startingPrice})
                        </option>
                      ))}
                      <option value="Institutional / Bulk Uniforms">Institutional / Corporate Uniforms</option>
                      <option value="General Tailoring & Alteration">Other Custom Tailoring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Number of Garments
                  </label>
                  <select
                    value={formData.garmentsCount}
                    onChange={(e) => setFormData({ ...formData, garmentsCount: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="1">1 Garment</option>
                    <option value="2-3">2 - 3 Garments</option>
                    <option value="4-6">4 - 6 Garments</option>
                    <option value="7+">7+ Garments (Family / Bulk)</option>
                  </select>
                </div>
              </div>

              {/* Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Visit Date <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                  {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" aria-hidden="true" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-navy-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    >
                      <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                      <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                      <option value="03:00 PM - 06:00 PM">Evening (03:00 PM - 06:00 PM)</option>
                      <option value="06:00 PM - 08:30 PM">Night (06:00 PM - 08:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Requirements / Fabric Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Style or Fabric Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bringing my own linen fabric, need french cuff formal shirts, urgent delivery required..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full bg-navy-900 border border-slate-700/80 rounded-lg p-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-gold-500/20 hover:brightness-110 active:scale-98 transition"
                >
                  Confirm Appointment Booking
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2 leading-normal">
                  No advance payment needed. We will prepare measurement sheets upon your arrival.
                </p>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
