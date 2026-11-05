import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { BrandLogo } from './BrandLogo';
import { motion } from 'framer-motion';
import { Reveal, RevealImage, SectionBackdrop, Stagger, StaggerItem } from './ui/motion';

interface IntroSectionProps {
  onReadMore: () => void;
  onBookAppointment: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onReadMore, onBookAppointment }) => {
  return (
    <section className="py-20 bg-navy-950 relative overflow-hidden" aria-label="About the Business">
      <SectionBackdrop word="ATELIER" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Visual Showcase Side */}
          <Reveal className="lg:col-span-5 relative" y={90}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <RevealImage
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
                alt="Tailor cutting pattern and measuring cloth at Excellent Dress Makers"
                className="rounded-2xl border border-slate-800 shadow-2xl bg-navy-900"
                imgClassName="w-full h-[420px] object-cover object-center filter brightness-95"
              >

                {/* Floating Experience Badge with Authentic Shop Signboard Branding */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 bg-navy-950/95 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-xl z-10"
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <BrandLogo size="md" />
                    <div>
                      <p className="text-white text-xs font-bold uppercase tracking-wider">
                        NGGO Colony Area • Perundurai Road
                      </p>
                      <p className="text-[11px] text-slate-300">
                        Conveniently located near Erode Collectorate, catering to men & women.
                      </p>
                    </div>
                  </div>
                </motion.div>

              </RevealImage>
            </div>
          </Reveal>

          {/* Text Content Side */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader
              align="left"
              eyebrow="Erode's Trusted Tailors"
              eyebrowIcon={Sparkles}
              title={<>Crafted with Precision. <br /><span className="gold-gradient-text">Tailored with Passion.</span></>}
              className="mb-0"
            />

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                At <strong className="text-white">Excellent Tailors & Dress Makers</strong>, we believe that great tailoring is more than stitching a garment. It is about understanding individual style, ensuring the perfect fit, and delivering craftsmanship that customers can trust.
              </p>
              <p>
                Located in the prominent NGGO Colony area along Perundurai Road, we cater to both men and women seeking bespoke custom stitching, expert alterations, and formal wardrobe creations. With over 25 years of experience and a customer base of more than 50,000, we have built an enduring reputation for fast, reliable, and impeccable clothing solutions.
              </p>
            </div>

            {/* Pillar highlights */}
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <StaggerItem className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-slate-200">
                  Exact anatomical measurements and posture profiling
                </span>
              </StaggerItem>
              <StaggerItem className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-slate-200">
                  Durable double-lock seams for longevity & shape
                </span>
              </StaggerItem>
              <StaggerItem className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-slate-200">
                  Customized for school uniforms & corporate staff
                </span>
              </StaggerItem>
              <StaggerItem className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-slate-200">
                  Trial fitting sessions before final collection
                </span>
              </StaggerItem>
            </Stagger>

            {/* CTAs */}
            <Reveal className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onReadMore}
                className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-slate-800 text-gold-300 border border-slate-700/80 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 group"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </button>

              <button
                onClick={onBookAppointment}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md shadow-gold-500/20 hover:brightness-110 active:scale-95 transition-all"
              >
                Schedule Atelier Visit
              </button>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
};
