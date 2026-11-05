import React from 'react';
import { 
  History, Ruler, Scissors, Sparkles, UserCheck, 
  Building2, ThumbsUp, Palette 
} from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { SectionBackdrop, Stagger, StaggerItem } from './ui/motion';
import { motion } from 'framer-motion';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: History,
      title: "25+ Years Experience",
      description: "Over 25 continuous years of specialized garment craft, evolving with classic tailoring techniques and modern silhouettes."
    },
    {
      icon: Ruler,
      title: "Personalized Measurements",
      description: "Individual anatomical drafting accounting for shoulder slope, chest arch, posture curve, and arm movement comfort."
    },
    {
      icon: Scissors,
      title: "Precision Stitching",
      description: "Single-needle precision locking, reinforced stress points, and aligned grain lines ensuring zero twisting after washes."
    },
    {
      icon: Sparkles,
      title: "Quality Craftsmanship",
      description: "Superior fusing, German interlinings, clean seam overlocking, and impeccable inner pocket closures."
    },
    {
      icon: UserCheck,
      title: "Individual Attention",
      description: "Every client enjoys dedicated fitting sessions, personalized style suggestions, and tailored adjustments."
    },
    {
      icon: Building2,
      title: "Institutional Mastery",
      description: "Equipped to handle bulk orders for premier CBSE schools, automotive dealerships, and civic clubs with tight quality controls."
    },
    {
      icon: ThumbsUp,
      title: "Customer Trust",
      description: "Over 50,000 satisfied patrons across generations who trust Excellent Dress Makers for daily wear and life milestones."
    },
    {
      icon: Palette,
      title: "Versatile Styles",
      description: "Tailoring expertise spanning executive tuxedos, slim Italian cut suits, royal festive kurthas, and crisp formal shirts."
    }
  ];

  return (
    <section className="py-20 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden" aria-label="Why Choose Excellent Dress Makers">
      <SectionBackdrop word="MASTERY" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Hallmarks of Excellence"
          eyebrowIcon={Sparkles}
          title="Why Choose Excellent Dress Makers?"
          description="We hold tailoring to the highest standards of geometry, artistry, and dependable service. Here is what sets our atelier apart."
        />

        {/* 8 Features Grid */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <StaggerItem
                key={idx}
                index={idx}
                className="h-full"
              >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.35 }}
                className="h-full bg-navy-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-gold-500/40 transition-colors duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-400/20 text-gold-400 flex items-center justify-center mb-4 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>

      </div>
    </section>
  );
};
