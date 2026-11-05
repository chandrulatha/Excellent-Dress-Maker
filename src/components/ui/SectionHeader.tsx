import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { LUXURY_EASE } from './motion';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  align = 'center',
  className = ''
}) => {
  const isCenter = align === 'center';
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* Scroll-linked drift: the whole header glides vertically at a
     slightly different speed than the page as it passes through. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  const driftY = useTransform(smooth, [0, 1], [26, -26]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y: driftY }} className="relative">
      <motion.div
        className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl text-left'} ${className}`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: -72, filter: 'blur(8px)' }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: LUXURY_EASE }}
      >
        {eyebrow && (
          <motion.div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3.5 ${isCenter ? 'mx-auto' : ''}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -36, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
          >
            {EyebrowIcon && <EyebrowIcon className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />}
            <span>{eyebrow}</span>
          </motion.div>
        )}

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-4">
          {title}
        </h2>

        {/* Gold thread divider — draws itself, with a glowing needle-dot at its end */}
        <div className={`relative mb-5 ${isCenter ? 'mx-auto w-56' : 'w-44'}`}>
          <motion.div
            aria-hidden="true"
            className={`h-[2px] bg-gradient-to-r ${isCenter ? 'from-transparent via-gold-400 to-gold-300 origin-center' : 'from-gold-500 via-gold-400 to-transparent origin-left'}`}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, delay: 0.3, ease: LUXURY_EASE }}
          />
          <motion.span
            aria-hidden="true"
            className={`absolute -top-[3px] w-2 h-2 rotate-45 bg-gold-300 shadow-[0_0_10px_rgba(200,157,66,0.9)] ${isCenter ? 'right-0' : 'right-0'}`}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 1.25, ease: LUXURY_EASE }}
          />
        </div>

        {description && (
          <motion.p
            className="text-slate-300 text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.35, ease: LUXURY_EASE }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};
