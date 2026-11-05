import React from 'react';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface PolicyProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PolicyProps> = ({ onBack }) => {
  return (
    <div className="pt-24 pb-20 bg-navy-950 min-h-screen text-slate-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-xs font-semibold uppercase tracking-wider mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main Site
        </button>

        <div className="bg-navy-900 rounded-2xl p-8 sm:p-12 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Lock className="w-6 h-6 text-gold-400" />
            <h1 className="font-serif text-3xl font-bold text-white">Privacy Policy</h1>
          </div>

          <p className="text-xs text-gold-400/80">
            Last Updated: November 2026 | Excellent Dress Makers, Erode
          </p>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-lg font-serif font-bold text-white">1. Information We Collect</h2>
            <p>
              When you book an appointment, submit customer measurements, or request corporate quotations on our website, we collect personal identifying details including your name, contact phone number, email address, physical address, and tailored anatomical dimensions.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-lg font-serif font-bold text-white">2. Confidentiality of Anatomical Data</h2>
            <p>
              Anatomical measurements are treated as strictly personal and private data. Your dimensions are solely used by our master tailors and cutting artisans for drafting garments, verifying seam comfort, and fulfilling your orders. We do not sell, rent, or lease your measurement profiles or contact details to third parties.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-lg font-serif font-bold text-white">3. Direct Communication</h2>
            <p>
              We communicate with you via telephone, SMS, or WhatsApp regarding your appointment confirmations, fitting trials, delivery readiness, or institutional quotation requests. You may opt out of promotional messages at any time.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-lg font-serif font-bold text-white">4. Contacting Us Regarding Your Data</h2>
            <p>
              If you have any questions about this privacy statement or wish to inspect or delete your measurement records, please contact our workshop directly at {BUSINESS_INFO.primaryPhone} or visit us at {BUSINESS_INFO.address.full}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC<PolicyProps> = ({ onBack }) => {
  return (
    <div className="pt-24 pb-20 bg-navy-950 min-h-screen text-slate-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-xs font-semibold uppercase tracking-wider mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main Site
        </button>

        <div className="bg-navy-900 rounded-2xl p-8 sm:p-12 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ShieldCheck className="w-6 h-6 text-gold-400" />
            <h1 className="font-serif text-3xl font-bold text-white">Terms & Conditions</h1>
          </div>

          <p className="text-xs text-gold-400/80">
            Applicable to Tailoring Orders & Enquiries | Excellent Dress Makers
          </p>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-lg font-serif font-bold text-white">1. Stitching Tariffs & Fabric Clarifications</h2>
            <p>
              All prices displayed on this website represent "Starting From" rates in Indian Rupees (INR) for stitching workmanship. Unless explicitly stated in a packaged quotation, fabric is not included in the stitching price. Final pricing may vary according to fabric texture, complex patterns, lining materials, and customized styling requests.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-lg font-serif font-bold text-white">2. Customer-Submitted Measurements</h2>
            <p>
              Online measurement submissions provide guidance for initial preparation. Due to natural posture variances and fabric drape characteristics, our atelier strongly recommends an in-person measurement check or trial fitting to guarantee optimal fit. We are not liable for sizing discrepancies resulting solely from customer-recorded figures without physical verification.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-lg font-serif font-bold text-white">3. Institutional & Bulk Orders</h2>
            <p>
              Corporate and school uniform orders require advance approvals of fabric swatches, sample stitching, and delivery timelines as mutually agreed upon in written invoices.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
