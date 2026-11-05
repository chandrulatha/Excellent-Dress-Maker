import React, { useState } from 'react';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/businessData';
import type { ServiceItem } from '../data/businessData';
import { 
  Sparkles, Check, ArrowRight, Info, Eye, 
  MessageSquare, ChevronRight, X 
} from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { motion } from 'framer-motion';
import { Reveal, SectionBackdrop, Stagger, staggerItemVariants } from './ui/motion';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
  onNavigateToServices?: () => void;
  compact?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onNavigateToServices,
  compact = false
}) => {
  const [selectedDetail, setSelectedDetail] = useState<ServiceItem | null>(null);

  const displayServices = compact ? SERVICES_DATA.slice(0, 6) : SERVICES_DATA;

  const handleWhatsAppEnquiry = (serviceName: string, price: string) => {
    const text = `Hello Excellent Dress Makers, I would like to enquire about ${serviceName} (${price}). Please let me know the process and timeline.`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-20 bg-navy-950 relative overflow-hidden" aria-label="Tailoring Services">
      <SectionBackdrop word="BESPOKE" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeader
          eyebrow="Master Tailoring Catalog"
          eyebrowIcon={Sparkles}
          title="Bespoke Tailoring & Stitching Services"
          description="Every garment is constructed from individual anatomy patterns with master artisan craftsmanship, rigorous quality checks, and personalized styling."
        />

        {/* Pricing Transparency Note Banner */}
        <Reveal className="mb-12 bg-navy-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-md max-w-3xl mx-auto">
          <Info className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-white block mb-0.5">Transparent Tariff Notice:</span>
            Prices listed represent base stitching workmanship in Indian Rupees (INR). Final pricing depends on fabric selection, lining quality, and custom detailing. Customers are welcome to bring their own fabrics.
          </div>
        </Reveal>

        {/* Services Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayServices.map((service, svcIdx) => (
            <motion.div
              key={service.id}
              variants={staggerItemVariants}
              custom={svcIdx}
              whileHover={{ y: -5 }}
              className="group bg-navy-900/80 rounded-2xl overflow-hidden border border-slate-800/90 hover:border-gold-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5 flex flex-col justify-between"
            >
              {/* Image & Price Tag Header */}
              <div className="relative h-56 overflow-hidden bg-navy-950">
                <motion.img
                  src={service.image}
                  alt={`${service.name} tailoring at Excellent Dress Makers`}
                  className="w-full h-full object-cover object-center filter brightness-95"
                  loading="lazy"
                  initial={{ scale: 1.32 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-black/25" />

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3.5 bg-navy-950/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 shadow-md">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Starting From</span>
                  <span className="font-serif text-base font-bold text-gold-300">{service.startingPrice}</span>
                </div>

                {service.popular && (
                  <div className="absolute top-3 right-3 bg-gold-500 text-navy-950 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    Popular
                  </div>
                )}
              </div>

              {/* Service Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-gold-300 transition-colors">
                    {service.name}
                  </h3>

                  {service.priceNote && (
                    <p className="text-xs font-semibold text-gold-400 mb-3">
                      {service.priceNote}
                    </p>
                  )}

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="space-y-1.5 mb-6" aria-label="Key features">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedDetail(service)}
                    className="py-2.5 px-3 rounded-lg bg-navy-800/90 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700/60 transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    Details
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service.name)}
                    className="py-2.5 px-3 rounded-lg bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-navy-950 text-xs font-semibold border border-gold-500/30 transition flex items-center justify-center gap-1"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* View All Services Footer CTA if compact */}
        {compact && onNavigateToServices && (
          <div className="mt-12 text-center">
            <button
              onClick={onNavigateToServices}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-navy-900 hover:bg-slate-800 border border-slate-700/80 text-gold-300 font-semibold text-xs sm:text-sm transition-all"
            >
              <span>Explore All Garment Categories & Measurements</span>
              <ChevronRight className="w-4 h-4 text-gold-400" aria-hidden="true" />
            </button>
          </div>
        )}

      </div>

      {/* View Details Modal */}
      {selectedDetail && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-service-title"
        >
          <div className="relative bg-navy-950 border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="relative h-52">
              <img
                src={selectedDetail.image}
                alt={selectedDetail.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <button
                onClick={() => setSelectedDetail(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-navy-950/80 text-slate-300 hover:text-white"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-5">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block">Craftsmanship Guide</span>
                <h3 id="modal-service-title" className="font-serif text-2xl font-bold text-white">{selectedDetail.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-baseline justify-between border-b border-slate-800/80 pb-3">
                <span className="text-xs text-slate-400">Base Stitching Rate:</span>
                <span className="font-serif text-xl font-bold text-gold-300">{selectedDetail.startingPrice}</span>
              </div>

              {selectedDetail.priceNote && (
                <p className="text-xs text-gold-400 font-medium">
                  {selectedDetail.priceNote}
                </p>
              )}

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedDetail.description}
              </p>

              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Tailoring Specifications & Construction:
                </h4>
                <ul className="space-y-1.5">
                  {selectedDetail.features.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-navy-900 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-normal">
                Fabric is not included unless confirmed in package quotations. Customers may supply their own cut piece.
              </div>

              <div className="pt-2 flex gap-2.5">
                <button
                  onClick={() => {
                    const name = selectedDetail.name;
                    setSelectedDetail(null);
                    onSelectServiceForBooking(name);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow transition"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => handleWhatsAppEnquiry(selectedDetail.name, selectedDetail.startingPrice)}
                  className="flex items-center justify-center gap-1.5 px-4 py-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold rounded-lg transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
