import React, { useState } from 'react';
import { 
  Ruler, Check, 
  ShieldCheck, Send, AlertCircle 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { SectionHeader } from './ui/SectionHeader';

export const MeasurementSystem: React.FC = () => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [fitType, setFitType] = useState<'Slim Fit' | 'Regular Fit' | 'Relaxed Fit'>('Regular Fit');
  const [garmentType, setGarmentType] = useState<'Shirt' | 'Pant' | 'Coat Suit' | 'Kurtha'>('Shirt');

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    age: '',
    mobile: '',
    address: '',
    email: '',
    notes: '',
    consent: false
  });

  const [shirtMetrics, setShirtMetrics] = useState({
    shirtLength: '',
    shoulderWidth: '',
    collarNeck: '',
    fullSleeve: '',
    halfSleeve: '',
    cuffSize: '',
    chest: '',
    hip: ''
  });

  const [pantMetrics, setPantMetrics] = useState({
    pantLength: '',
    waist: '',
    frontRise: '',
    hip: '',
    backRise: '',
    thigh: '',
    knee: '',
    bottomOpening: '',
    inseam: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.mobile) {
      setErrorMsg('Please enter your Name and Mobile Number.');
      return;
    }
    if (!customerInfo.consent) {
      setErrorMsg('Please confirm consent to process and store your measurement profile securely.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    let summary = `*Measurement Submission - Excellent Dress Makers*%0A%0A*Name:* ${encodeURIComponent(customerInfo.name)}%0A*Mobile:* ${encodeURIComponent(customerInfo.mobile)}%0A*Fit Preference:* ${encodeURIComponent(fitType)} (${unit})%0A*Garment:* ${encodeURIComponent(garmentType)}%0A`;
    
    if (garmentType === 'Shirt' || garmentType === 'Coat Suit' || garmentType === 'Kurtha') {
      summary += `%0A*Shirt Metrics:*%0ALength: ${shirtMetrics.shirtLength} | Shoulder: ${shirtMetrics.shoulderWidth} | Collar: ${shirtMetrics.collarNeck} | Full Sleeve: ${shirtMetrics.fullSleeve} | Chest: ${shirtMetrics.chest} | Hip: ${shirtMetrics.hip}`;
    }
    if (garmentType === 'Pant' || garmentType === 'Coat Suit') {
      summary += `%0A*Pant Metrics:*%0APant Length: ${pantMetrics.pantLength} | Waist: ${pantMetrics.waist} | Hip: ${pantMetrics.hip} | Thigh: ${pantMetrics.thigh} | Bottom: ${pantMetrics.bottomOpening}`;
    }
    
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${summary}`, '_blank');
  };

  return (
    <section className="py-20 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden" aria-label="Anatomical Measurement Studio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Bespoke Profile Studio"
          eyebrowIcon={Ruler}
          title="Customer Measurement & Fit Studio"
          description="Submit your tailored metrics for record-keeping or review with master cutters before arriving at our Erode atelier."
        />

        {/* Privacy and Verification Advisory */}
        <div className="bg-navy-900/90 border border-slate-800 rounded-2xl p-5 mb-10 max-w-4xl mx-auto flex items-start gap-4 shadow-md">
          <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="font-bold text-white block mb-0.5">Confidential Measurement Registry Notice:</span>
            Your anatomical dimensions are treated with strict confidentiality. While self-recorded measurements provide an excellent baseline, our master tailors recommend an in-shop verification session or physical trial fitting to ensure absolute drape perfection.
          </div>
        </div>

        {/* Main Measurement Console */}
        <div className="bg-navy-900/90 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-10 max-w-4xl mx-auto">
          
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Measurement Profile Generated!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you <span className="text-gold-300 font-semibold">{customerInfo.name}</span>. Your {garmentType} specifications have been organized with <span className="text-white font-medium">{fitType}</span> preference in <span className="text-white font-medium">{unit}</span>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-2.5">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Forward Profile via WhatsApp
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-3 border border-slate-700 text-slate-300 rounded-lg text-xs hover:bg-slate-800 font-semibold"
                >
                  Adjust Measurements
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Customer Personal Details */}
              <div className="space-y-4 border-b border-slate-800 pb-7">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-950 text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">Customer Identification</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Balasubramaniam"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Mobile Number <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9443354440"
                      value={customerInfo.mobile}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, mobile: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Age (For posture/drape index)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 35"
                      value={customerInfo.age}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, age: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      City / Area Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Perundurai / Erode"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. customer@gmail.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Fit Type, Garment & Measurement Units */}
              <div className="space-y-4 border-b border-slate-800 pb-7">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-950 text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">Garment & Fit Selection</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Garment Type</label>
                    <select
                      value={garmentType}
                      onChange={(e: any) => setGarmentType(e.target.value)}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    >
                      <option value="Shirt">Shirt</option>
                      <option value="Pant">Pant / Trouser</option>
                      <option value="Coat Suit">Coat Suit (Complete)</option>
                      <option value="Kurtha">Traditional Kurtha</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Silhouettes / Cut</label>
                    <select
                      value={fitType}
                      onChange={(e: any) => setFitType(e.target.value)}
                      className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    >
                      <option value="Slim Fit">Slim Fit (Close tapered)</option>
                      <option value="Regular Fit">Regular Fit (Classic comfort)</option>
                      <option value="Relaxed Fit">Relaxed Fit (Roomy ease)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Measurement Unit</label>
                    <div className="flex rounded-lg overflow-hidden border border-slate-700/80">
                      <button
                        type="button"
                        onClick={() => setUnit('inches')}
                        className={`flex-1 py-2 text-xs font-bold ${unit === 'inches' ? 'bg-gold-500 text-navy-950' : 'bg-navy-950 text-slate-300'}`}
                      >
                        Inches (in)
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnit('cm')}
                        className={`flex-1 py-2 text-xs font-bold ${unit === 'cm' ? 'bg-gold-500 text-navy-950' : 'bg-navy-950 text-slate-300'}`}
                      >
                        Centimeters (cm)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Anatomical Dimensions */}
              <div className="space-y-6 border-b border-slate-800 pb-7">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-950 text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    {garmentType === 'Pant' ? 'Pant Anatomical Measurements' : 'Shirt & Upper Body Measurements'}
                  </h3>
                </div>

                {/* Shirt Fields */}
                {(garmentType === 'Shirt' || garmentType === 'Coat Suit' || garmentType === 'Kurtha') && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Shirt Length ({unit})</label>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 29.5"
                        value={shirtMetrics.shirtLength}
                        onChange={(e) => setShirtMetrics({ ...shirtMetrics, shirtLength: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Shoulder Width ({unit})</label>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 18.0"
                        value={shirtMetrics.shoulderWidth}
                        onChange={(e) => setShirtMetrics({ ...shirtMetrics, shoulderWidth: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Collar / Neck ({unit})</label>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 15.5"
                        value={shirtMetrics.collarNeck}
                        onChange={(e) => setShirtMetrics({ ...shirtMetrics, collarNeck: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Full Sleeve ({unit})</label>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 24.5"
                        value={shirtMetrics.fullSleeve}
                        onChange={(e) => setShirtMetrics({ ...shirtMetrics, fullSleeve: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Chest ({unit})</label>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 40.0"
                        value={shirtMetrics.chest}
                        onChange={(e) => setShirtMetrics({ ...shirtMetrics, chest: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Hip ({unit})</label>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 41.0"
                        value={shirtMetrics.hip}
                        onChange={(e) => setShirtMetrics({ ...shirtMetrics, hip: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Half Sleeve Length</label>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 9.5"
                        value={shirtMetrics.halfSleeve}
                        onChange={(e) => setShirtMetrics({ ...shirtMetrics, halfSleeve: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Cuff / Hand Cup</label>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 8.5"
                        value={shirtMetrics.cuffSize}
                        onChange={(e) => setShirtMetrics({ ...shirtMetrics, cuffSize: e.target.value })}
                        className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>
                )}

                {/* Pant Fields */}
                {(garmentType === 'Pant' || garmentType === 'Coat Suit') && (
                  <div className="pt-3 border-t border-slate-800/80">
                    <h4 className="text-[11px] uppercase font-bold text-gold-400 tracking-wider mb-3">
                      Trouser / Bottom Specifications
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Pant Length ({unit})</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="e.g. 39.0"
                          value={pantMetrics.pantLength}
                          onChange={(e) => setPantMetrics({ ...pantMetrics, pantLength: e.target.value })}
                          className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Waist ({unit})</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="e.g. 34.0"
                          value={pantMetrics.waist}
                          onChange={(e) => setPantMetrics({ ...pantMetrics, waist: e.target.value })}
                          className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Hip ({unit})</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="e.g. 40.0"
                          value={pantMetrics.hip}
                          onChange={(e) => setPantMetrics({ ...pantMetrics, hip: e.target.value })}
                          className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Thigh ({unit})</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="e.g. 23.5"
                          value={pantMetrics.thigh}
                          onChange={(e) => setPantMetrics({ ...pantMetrics, thigh: e.target.value })}
                          className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Bottom Opening ({unit})</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="e.g. 14.5"
                          value={pantMetrics.bottomOpening}
                          onChange={(e) => setPantMetrics({ ...pantMetrics, bottomOpening: e.target.value })}
                          className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Front Rise ({unit})</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="e.g. 10.5"
                          value={pantMetrics.frontRise}
                          onChange={(e) => setPantMetrics({ ...pantMetrics, frontRise: e.target.value })}
                          className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Knee ({unit})</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="e.g. 17.5"
                          value={pantMetrics.knee}
                          onChange={(e) => setPantMetrics({ ...pantMetrics, knee: e.target.value })}
                          className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Inseam ({unit})</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="e.g. 29.0"
                          value={pantMetrics.inseam}
                          onChange={(e) => setPantMetrics({ ...pantMetrics, inseam: e.target.value })}
                          className="w-full bg-navy-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Consent & Submission */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customerInfo.consent}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-400"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    I consent to Excellent Dress Makers securely storing my anatomical measurements for my tailoring orders. I understand that physical trial fitting or in-shop verification will be conducted prior to cutting fabric.
                  </span>
                </label>

                <div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-gold-500/20 hover:brightness-110 active:scale-95 transition"
                  >
                    Submit Measurement Profile
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
