import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { PROCESS_STEPS } from '../data/businessData';
import {
  MessageSquare, Ruler, Layers, Scissors,
  Sparkles, CheckCircle2
} from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { LUXURY_EASE, SectionBackdrop } from './ui/motion';

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  Ruler,
  Layers,
  Scissors,
  Sparkles,
  CheckCircle2
};

/** Cards fly in ±80px on desktop, a contained ±26px on small screens. */
const useCardOffset = () => {
  const [offset, setOffset] = useState(80);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setOffset(mq.matches ? 80 : 26);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return offset;
};

export const ProcessSection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const cardOffset = useCardOffset();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 55%'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 65, damping: 20, mass: 0.45 });
  /* The needle rides the thread exactly as far as it has been drawn. */
  const needleTop = useTransform(lineProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="py-20 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden" aria-label="Our Tailoring Process">
      <SectionBackdrop word="BESPOKE" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <SectionHeader
          eyebrow="The Bespoke Standard"
          eyebrowIcon={Scissors}
          title="Our 6-Step Tailoring Process"
          description="From your first appointment to the moment you step into your hand-pressed garment, we preserve the timeless traditions of bespoke tailoring."
        />

        {/* Animated vertical timeline — gold thread draws as you scroll,
            with a glowing needle travelling along it */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Track (faint) */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-6 md:left-1/2 w-px bg-slate-800 md:-translate-x-1/2"
          />
          {/* Gold thread (scroll-driven) */}
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[3px] md:-translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-gold-200 via-gold-400 to-gold-600 shadow-[0_0_16px_rgba(200,157,66,0.6)]"
            style={reduce ? { scaleY: 1 } : { scaleY: lineProgress }}
          />
          {/* Travelling needle */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="absolute left-6 md:left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ top: needleTop }}
            >
              <span className="relative block w-4 h-4 rotate-45 bg-gold-300 border-2 border-navy-950 shadow-[0_0_18px_rgba(200,157,66,0.95)]">
                <span className="absolute inset-0 bg-gold-400/50 animate-ping" />
              </span>
            </motion.div>
          )}

          <div className="space-y-10 md:space-y-16">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = ICON_MAP[step.iconName] || Scissors;
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={step.step}
                  className={`relative flex md:w-1/2 pl-16 md:pl-0 pr-0 ${isLeft ? 'md:pr-14 md:ml-0' : 'md:pl-14 md:ml-auto'}`}
                >
                  {/* Step badge on the thread — spring pop as the needle passes */}
                  <motion.div
                    aria-hidden="true"
                    className={`absolute top-5 z-10 w-12 h-12 rounded-full bg-navy-950 border-2 border-gold-400 text-gold-200 flex items-center justify-center font-serif text-sm font-bold shadow-[0_0_22px_rgba(200,157,66,0.45)] left-0 md:left-auto ${isLeft ? 'md:-right-6' : 'md:-left-6'}`}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.3, rotate: -30 }}
                    whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: '-90px' }}
                    transition={reduce ? { duration: 0.4 } : { type: 'spring', stiffness: 210, damping: 15, mass: 0.7 }}
                  >
                    {step.step}
                  </motion.div>

                  <motion.article
                    className="relative w-full bg-navy-900/80 rounded-2xl p-6 border border-slate-800/80 hover:border-gold-500/40 transition-colors duration-300 group overflow-hidden"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: isLeft ? -cardOffset : cardOffset, y: 30, scale: 0.94, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.95, ease: LUXURY_EASE }}
                  >
                    {/* Oversized step numeral scales in behind the copy */}
                    <motion.div
                      aria-hidden="true"
                      className="absolute top-3 right-5 font-serif text-6xl font-extrabold text-slate-800/50 group-hover:text-gold-500/15 transition-colors pointer-events-none select-none"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-70px' }}
                      transition={{ duration: 0.9, delay: 0.25, ease: LUXURY_EASE }}
                    >
                      {step.step}
                    </motion.div>
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-400/20 text-gold-400 flex items-center justify-center mb-4 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-1">
                        Step {step.step}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
