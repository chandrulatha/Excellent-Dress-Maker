import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Award, ArrowRight, Calendar, MessageCircle,
  Scissors, CheckCircle2, ChevronDown
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { LUXURY_EASE, staggerContainerVariants } from './ui/motion';

interface HeroSectionProps {
  onExploreServices: () => void;
  onBookAppointment: () => void;
}

/* Masked word rise: each word slides up from behind an overflow mask —
   the classic cinematic title reveal, unmistakable on page load. */
const wordMaskVariants = {
  hidden: { y: '115%', rotate: 3 },
  visible: (i: number) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 0.95, delay: 0.35 + i * 0.11, ease: LUXURY_EASE },
  }),
};

const WordReveal: React.FC<{ text: string; startIndex: number }> = ({ text, startIndex }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
        <motion.span
          className="inline-block will-change-transform"
          variants={wordMaskVariants}
          custom={startIndex + i}
        >
          {word}
          {i < text.split(' ').length - 1 ? '\u00A0' : ''}
        </motion.span>
      </span>
    ))}
  </>
);

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 44, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay, ease: LUXURY_EASE },
  },
});

/** Price chips pop in one-by-one with a clear scale settle. */
const chipVariants = {
  hidden: { opacity: 0, scale: 0.55, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, delay: 1.15 + i * 0.13, ease: LUXURY_EASE },
  }),
};

const priceChips = [
  'Shirt Stitching from ₹350',
  'Pant Stitching from ₹450',
  'Coat Suit from ₹3,200',
  'Bulk Corporate Uniforms',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onBookAppointment
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  /* Strong scroll-linked parallax: backdrop races down + zooms while the
     copy lifts away faster and dissolves — obvious within one scroll. */
  const imageY = useTransform(smooth, [0, 1], [0, 150]);
  const imageScale = useTransform(smooth, [0, 1], [1, 1.16]);
  const contentY = useTransform(smooth, [0, 1], [0, -90]);
  const contentOpacity = useTransform(smooth, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[96vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Backdrop: scroll-parallax wrapper + cinematic load de-zoom inside */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imageY, scale: imageScale }}>
          <motion.img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=2000&q=85"
            alt="Bespoke Suit Tailoring Craftsmanship at Excellent Dress Makers atelier"
            className="w-full h-full object-cover object-center filter contrast-125"
            loading="eager"
            initial={reduce ? { opacity: 0 } : { scale: 1.28, opacity: 0 }}
            animate={reduce ? { opacity: 0.22 } : { scale: 1, opacity: 0.22 }}
            transition={{ duration: 1.9, ease: LUXURY_EASE }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/90 to-navy-950/70" />
        {/* Light sweep across the atelier on load */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-300/[0.13] to-transparent skew-x-[-12deg]"
            initial={{ x: '-70%', opacity: 0 }}
            animate={{ x: '70%', opacity: [0, 1, 0] }}
            transition={{ duration: 2.1, delay: 0.5, ease: 'easeInOut' }}
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Heritage Pill Badge */}
        <motion.div variants={fadeUp(0.15)} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/25 text-gold-300 text-xs font-semibold tracking-wide mb-8">
          <Award className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
          <span>25+ Years of Tailoring Mastery • Erode Collectorate</span>
        </motion.div>

        {/* Main Heading — masked word-by-word rise */}
        <motion.h1
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.12] mb-5"
          variants={{ hidden: {}, visible: {} }}
          initial="hidden"
          animate="visible"
          aria-label="Your Style. Your Fit. Our Craftsmanship."
        >
          <span aria-hidden="true">
            <WordReveal text="Your Style. Your Fit." startIndex={0} />
            <br />
            <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-300 bg-clip-text text-transparent edm-gold-shimmer">
              <WordReveal text="Our Craftsmanship." startIndex={4} />
            </span>
          </span>
        </motion.h1>

        {/* Gold line draws itself under the headline */}
        <motion.div
          aria-hidden="true"
          className="mx-auto mb-7 h-[3px] w-64 sm:w-80 origin-center rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_14px_rgba(200,157,66,0.55)]"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.05, ease: LUXURY_EASE }}
        />

        {/* Subtitle */}
        <motion.p variants={fadeUp(0.95)} className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10">
          Experience exceptional tailoring with personalized measurements, timeless designs, and precision craftsmanship. Trusted by individuals, institutions, and automotive dealerships for over 25 years.
        </motion.p>

        {/* 3 Call-To-Action Buttons */}
        <motion.div variants={fadeUp(1.1)} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-14">
          <button
            onClick={onBookAppointment}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-gold-200"
          >
            <Calendar className="w-4 h-4 text-navy-950" aria-hidden="true" />
            Book an Appointment
          </button>

          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider border border-slate-700/80 hover:border-gold-500/40 transition-all flex items-center justify-center gap-2 group backdrop-blur-sm"
          >
            <Scissors className="w-4 h-4 text-gold-400 group-hover:rotate-45 transition-transform" aria-hidden="true" />
            Explore Services
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </button>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Excellent%20Dress%20Makers,%20I%20would%20like%20to%20enquire%20about%20tailoring%20services`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-xs uppercase tracking-wider border border-emerald-500/30 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            WhatsApp Us
          </a>
        </motion.div>

        {/* Verified Pricing Highlights — chips pop in sequence */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-slate-800/80 text-slate-300 text-xs sm:text-sm"
          variants={{ hidden: {}, visible: {} }}
          initial="hidden"
          animate="visible"
        >
          {priceChips.map((chip, i) => (
            <motion.div
              key={chip}
              variants={chipVariants}
              custom={i}
              className="flex items-center justify-center gap-2 py-1.5 px-2 rounded-lg bg-navy-950/50 border border-slate-800/60"
            >
              <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
              <span>{chip}</span>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      {/* Animated scroll indicator — needle dot travels down a stitch line */}
      <motion.a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' }); }}
        className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 text-gold-300/90 hover:text-gold-200 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.9 }}
        aria-label="Scroll down to explore"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative block w-6 h-10 rounded-full border-2 border-gold-400/60 overflow-hidden">
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-1.5 w-1.5 h-1.5 -ml-[3px] rounded-full bg-gold-300 shadow-[0_0_8px_rgba(200,157,66,0.9)]"
              animate={{ y: [0, 18, 0], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
};
