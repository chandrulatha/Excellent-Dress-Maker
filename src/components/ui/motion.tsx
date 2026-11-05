import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
  type MotionValue,
  type Variants,
} from 'framer-motion';

/** Luxury easing used across the site: slow, smooth, settled — never bouncy. */
export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const luxuryTransition = (duration = 0.9, delay = 0) => ({
  duration,
  delay,
  ease: LUXURY_EASE,
});

/* ------------------------------------------------------------------ */
/* V2 variants — deliberately BIG: cards travel 80px, scale from     */
/* 0.92 and settle out of a slight alternating rotation, so motion   */
/* is unmistakable on the very first scroll.                         */
/* ------------------------------------------------------------------ */

export const fadeRiseVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.94, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: LUXURY_EASE },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/** Card entrance — pass an index via StaggerItem's `index` prop to
 *  alternate the tilt direction (even: -1.6deg, odd: +1.6deg). */
export const staggerItemVariants: Variants = {
  hidden: (i: number = 0) => ({
    opacity: 0,
    y: 80,
    scale: 0.92,
    rotate: i % 2 === 0 ? -1.6 : 1.6,
    filter: 'blur(6px)',
  }),
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: LUXURY_EASE },
  },
};

/* ------------------------------------------------------------------ */
/* Reveal — big fade + rise + scale + de-blur on first scroll-in.    */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 64,
  x = 0,
  scale = 0.96,
  duration = 0.95,
  style,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x, scale, filter: 'blur(7px)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration, delay, ease: LUXURY_EASE }}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Parallax — continuously scroll-linked vertical drift. The wrap is */
/* absolutely positioned by the caller (decorations) or relative.    */
/* ------------------------------------------------------------------ */

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Total vertical travel in px across the element's pass through the viewport. */
  range?: number;
  style?: React.CSSProperties;
}

export const Parallax: React.FC<ParallaxProps> = ({ children, className, range = 90, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  const y = useTransform(smooth, [0, 1], [range / 2, -range / 2]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: reduce ? 0 : y }} aria-hidden={children ? undefined : true}>
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* SectionBackdrop — parallax stage dressing for a section: one      */
/* oversized outlined word drifting horizontally + two gold orbs     */
/* drifting vertically at different speeds. Parent must be relative  */
/* + overflow-hidden. Decorative only (aria-hidden, no pointer).     */
/* ------------------------------------------------------------------ */

interface SectionBackdropProps {
  word: string;
  className?: string;
}

export const SectionBackdrop: React.FC<SectionBackdropProps> = ({ word, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.5 });
  const wordX = useTransform(smooth, [0, 1], [70, -70]);
  const orbAY = useTransform(smooth, [0, 1], [60, -60]);
  const orbBY = useTransform(smooth, [0, 1], [-45, 45]);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.span
        className="edm-outline-text absolute top-6 left-1/2 -translate-x-1/2 font-serif font-black uppercase tracking-[0.08em] whitespace-nowrap text-[19vw] lg:text-[11rem] leading-none select-none"
        style={reduce ? undefined : { x: wordX }}
      >
        {word}
      </motion.span>
      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold-500/[0.07] blur-3xl"
        style={reduce ? undefined : { y: orbAY }}
      />
      <motion.div
        className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-gold-400/[0.05] blur-3xl"
        style={reduce ? undefined : { y: orbBY }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* RevealImage — cinematic clip + de-zoom reveal for section photos. */
/* The frame un-clips from an inset window while the photo settles   */
/* from scale 1.35 to 1. Children (badges/overlays) render above.    */
/* ------------------------------------------------------------------ */

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}

export const RevealImage: React.FC<RevealImageProps> = ({ src, alt, className = '', imgClassName = '', children }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0.4, clipPath: 'inset(16% 14% 16% 14% round 24px)', scale: 0.97 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 16px)', scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.15, ease: LUXURY_EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        loading="lazy"
        initial={reduce ? false : { scale: 1.35 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.3, ease: LUXURY_EASE }}
      />
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Stagger wrappers                                                    */
/* ------------------------------------------------------------------ */

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Alternating-tilt index forwarded to staggerItemVariants. */
  index?: number;
}

export const Stagger: React.FC<StaggerProps> = ({ children, className, style }) => (
  <motion.div
    className={className}
    style={style}
    variants={staggerContainerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<StaggerProps> = ({ children, className, style, index = 0 }) => (
  <motion.div className={className} style={style} variants={staggerItemVariants} custom={index}>
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* AnimatedCounter / CountUp                                           */
/* Parses strings like "25+", "50,000+", "11+" and counts the numeric  */
/* part up when scrolled into view, preserving prefix/suffix/commas.  */
/* ------------------------------------------------------------------ */

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

const parseCounterValue = (value: string) => {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numeric, suffix] = match;
  const target = parseInt(numeric.replace(/,/g, ''), 10);
  if (Number.isNaN(target)) return null;
  return { prefix, suffix, target, grouped: numeric.includes(',') };
};

const formatCounter = (n: number, grouped: boolean) =>
  grouped ? Math.round(n).toLocaleString('en-IN') : String(Math.round(n));

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className,
  duration = 1.9,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const parsed = parseCounterValue(value);
  const [display, setDisplay] = useState<string>(() =>
    parsed && !reduce ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, parsed.target, {
      duration,
      ease: LUXURY_EASE,
      onUpdate: (latest) => {
        setDisplay(`${parsed.prefix}${formatCounter(latest, parsed.grouped)}${parsed.suffix}`);
      },
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export const CountUp = AnimatedCounter;

/** Shared page-progress MotionValue helper for tape / rail (App-level). */
export const useSmoothPageProgress = (): MotionValue<number> => {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
};

export default Reveal;
