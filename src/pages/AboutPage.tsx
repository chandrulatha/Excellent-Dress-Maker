import React from 'react';
import { 
  Award, ShieldCheck, Heart, 
  Scissors, ArrowRight 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { SectionHeader } from '../components/ui/SectionHeader';

interface AboutPageProps {
  onBookAppointment: () => void;
  onExploreWork: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBookAppointment, onExploreWork }) => {
  return (
    <div className="pt-24 pb-20 bg-navy-950">
      
      {/* Hero Banner */}
      <div className="relative py-14 bg-navy-900/60 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow="Heritage & Craftsmanship"
            eyebrowIcon={Award}
            title="About Excellent Dress Makers"
            description="Two decades of tailoring mastery, trusted by more than 50,000 customers, premier academic institutions, and corporate automotive leaders across Tamil Nadu."
            className="mb-0"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80"
                alt="Master tailor hand stitching a bespoke suit at Excellent Dress Makers"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute -bottom-5 -right-3 bg-navy-900 border border-slate-800 p-4 rounded-xl shadow-xl hidden sm:block">
              <p className="font-serif text-2xl font-bold text-gold-400">25+ Yrs</p>
              <p className="text-xs text-slate-300">Continuous Tailoring Legacy</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              A Legacy Built on Fit, Trust, and Precision
            </h2>
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
              <p>
                Established with a foundational commitment to impeccable fit and unyielding quality, <strong className="text-white">Excellent Tailors & Dress Makers</strong> is a prominent fixture in Erode's NGGO Colony area along Perundurai Road. We specialize in high-precision bespoke stitching and expert alteration services for both men and women.
              </p>
              <p>
                Whether crafting crisp executive shirts, tailored trousers, wedding blazers, or adjusting existing wardrobe pieces for that flawless custom drape, our team is known across Erode for meticulous attention to detail and durable craftsmanship.
              </p>
              <p>
                Over the past 25+ years, we have had the privilege of clothing more than 50,000 satisfied patrons. Connect with our atelier on Instagram at <a href={BUSINESS_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gold-400 font-semibold hover:underline">@excellenttailorserode</a> to see our latest client fits and creations.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onBookAppointment}
                className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-gold-500/20 transition"
              >
                Schedule Atelier Visit
              </button>
              <button
                onClick={onExploreWork}
                className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition flex items-center gap-1.5"
              >
                <span>View Gallery of Work</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Our Core Values */}
        <div className="mb-20">
          <SectionHeader
            eyebrow="Guiding Philosophy"
            title="Our Tailoring Pillars"
            description="The core tenets that guide every cut, stitch, and pressing in our workshop."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-navy-900/80 rounded-2xl p-6 border border-slate-800/80">
              <div className="w-11 h-11 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center mb-4 border border-gold-400/20">
                <Scissors className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">Architectural Anatomy</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Garments should never restrict human movement. We craft every armhole, collar radius, and trouser rise around your unique physical geometry.
              </p>
            </div>

            <div className="bg-navy-900/80 rounded-2xl p-6 border border-slate-800/80">
              <div className="w-11 h-11 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center mb-4 border border-gold-400/20">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">Uncompromising Durability</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Using micro-stitched interlinings, high-tensile threads, and reinforced pressure points, our garments withstand repetitive laundering and everyday rigor.
              </p>
            </div>

            <div className="bg-navy-900/80 rounded-2xl p-6 border border-slate-800/80">
              <div className="w-11 h-11 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center mb-4 border border-gold-400/20">
                <Heart className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">Personal Connection</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We know our customers by name, their style preferences, and occasion schedules. Generations of families rely on us for their milestone events.
              </p>
            </div>
          </div>
        </div>

        {/* Location & Contact Callout */}
        <div className="bg-navy-900/90 rounded-2xl p-6 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Experience the Craftsmanship First-Hand
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Visit us at No 375, Erode Collectorate, Perundurai Road. We look forward to creating your next signature garment.
            </p>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.primaryPhone}`}
            className="px-6 py-3.5 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-gold-500/20 hover:brightness-110 shrink-0 transition"
          >
            Call {BUSINESS_INFO.primaryPhone}
          </a>
        </div>

      </div>
    </div>
  );
};
