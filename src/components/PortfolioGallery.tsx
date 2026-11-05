import React, { useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/businessData';
import type { PortfolioItem } from '../data/businessData';
import { Sparkles, X, ZoomIn } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SectionBackdrop, Stagger, staggerItemVariants } from './ui/motion';

export const PortfolioGallery: React.FC = () => {
  const reduce = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stripProgress } = useScroll({
    target: stripRef,
    offset: ['start end', 'end start'],
  });
  const stripSmooth = useSpring(stripProgress, { stiffness: 55, damping: 20, mass: 0.5 });
  const stripX = useTransform(stripSmooth, [0, 1], [60, -300]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Works' },
    { id: 'suits', label: 'Coat Suits & Waistcoats' },
    { id: 'formal', label: 'Formal Shirts & Pants' },
    { id: 'traditional', label: 'Traditional Kurtha' },
    { id: 'institutional', label: 'Uniforms & Bulk' },
    { id: 'craftsmanship', label: 'Behind The Scenes' }
  ];

  const filteredItems = activeFilter === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(item => item.category === activeFilter);

  return (
    <section className="py-20 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden" aria-label="Tailoring Portfolio">
      <SectionBackdrop word="SHOWCASE" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Bespoke Portfolio"
          eyebrowIcon={Sparkles}
          title="Our Work — Tailoring Showcase"
          description="Browse our gallery of fine bespoke suits, crisp corporate shirts, grand ethnic kurthas, and uniform assemblies executed with immaculate precision."
        />

        {/* Scroll-linked filmstrip — the showcase band slides sideways
            as the section passes through the viewport (decorative
            duplicate of the gallery below; desktop/tablet only). */}
        <div
          ref={stripRef}
          aria-hidden="true"
          className="hidden md:block relative overflow-hidden mb-12 rounded-2xl [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          <motion.div className="flex gap-4 w-max pointer-events-none" style={reduce ? undefined : { x: stripX }}>
            {[...PORTFOLIO_DATA, ...PORTFOLIO_DATA.slice(0, 3)].map((item, i) => (
              <div key={`strip-${i}`} className="w-72 h-44 shrink-0 rounded-xl overflow-hidden border border-slate-800 relative">
                <img src={item.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-[10px] font-bold uppercase tracking-widest text-gold-300">{item.tag}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === tab.id
                  ? 'bg-gold-500 text-navy-950 shadow-md shadow-gold-500/20'
                  : 'bg-navy-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, itemIdx) => (
            <motion.div
              key={item.id}
              variants={staggerItemVariants}
              custom={itemIdx}
              whileHover={{ y: -5 }}
              onClick={() => setLightboxItem(item)}
              className="group relative bg-navy-900 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-gold-500/40 cursor-pointer shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="h-64 overflow-hidden relative">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                  initial={{ scale: 1.3 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                {/* Tag */}
                <div className="absolute top-3 left-3 bg-navy-950/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase font-bold text-gold-400 border border-slate-800">
                  {item.tag}
                </div>

                {/* Hover Quick Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-navy-950/90 backdrop-blur-md text-gold-300 flex items-center justify-center border border-slate-700 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                {/* Caption Bottom */}
                <div className="absolute bottom-3 left-3.5 right-3.5">
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative bg-navy-950 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden">
              <div className="relative max-h-[70vh] bg-black">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="w-full h-full max-h-[65vh] object-contain mx-auto"
                />
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-navy-950/90 text-white hover:bg-gold-500 hover:text-navy-950 transition"
                  aria-label="Close image preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 bg-navy-950 border-t border-slate-800">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {lightboxItem.title}
                  </h3>
                  <span className="px-2.5 py-1 bg-gold-500/15 text-gold-300 border border-gold-500/30 text-xs uppercase font-bold rounded">
                    {lightboxItem.tag}
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {lightboxItem.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
