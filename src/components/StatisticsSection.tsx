import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Users, Building2 } from 'lucide-react';
import { AnimatedCounter, LUXURY_EASE, SectionBackdrop, Stagger, StaggerItem } from './ui/motion';

const RING_R = 34;
const RING_C = 2 * Math.PI * RING_R; // ≈ 213.6

export const StatisticsSection: React.FC = () => {
  const reduce = useReducedMotion();
  const stats = [
    {
      icon: Award,
      value: "25+",
      label: "Years of Tailoring Mastery",
      subtext: "Continuous dedication to craftsmanship in Erode since inception"
    },
    {
      icon: Users,
      value: "50,000+",
      label: "Satisfied Customers Served",
      subtext: "Generations of families, professionals, and individual patrons"
    },
    {
      icon: Building2,
      value: "11+",
      label: "Institutions & Dealerships",
      subtext: "Trusted uniform partner for leading CBSE schools & auto brands"
    }
  ];

  return (
    <section className="bg-navy-950 border-y border-slate-800/80 py-14 relative overflow-hidden" aria-label="Key Achievements">
      <SectionBackdrop word="LEGACY" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <StaggerItem
                key={idx}
                index={idx}
                className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-10 md:pt-0 md:pl-6' : ''}`}
              >
                {/* Gold ring that sweeps full while the number counts up */}
                <div className="relative w-[84px] h-[84px] mb-4">
                  <svg viewBox="0 0 84 84" className="w-full h-full -rotate-90" aria-hidden="true">
                    <circle cx="42" cy="42" r={RING_R} fill="none" strokeWidth="3" className="stroke-slate-800" />
                    <motion.circle
                      cx="42"
                      cy="42"
                      r={RING_R}
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="stroke-gold-400"
                      strokeDasharray={RING_C}
                      initial={{ strokeDashoffset: reduce ? 0 : RING_C }}
                      whileInView={{ strokeDashoffset: RING_C * 0.04 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 1.9, ease: LUXURY_EASE }}
                      style={{ filter: 'drop-shadow(0 0 6px rgba(200,157,66,0.55))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shadow-inner">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-1">
                  <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-300 bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} />
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-200 tracking-wide mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  {stat.subtext}
                </p>

                {/* Gold bar fills beneath each stat */}
                <motion.div
                  aria-hidden="true"
                  className="mt-4 h-[3px] w-28 rounded-full origin-center bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 shadow-[0_0_10px_rgba(200,157,66,0.45)]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.5, delay: 0.25, ease: LUXURY_EASE }}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};
