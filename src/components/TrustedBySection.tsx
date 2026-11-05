import React from 'react';
import { TRUSTED_CLIENTS } from '../data/businessData';
import { ShieldCheck, Award } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal, SectionBackdrop } from './ui/motion';

const ClientCard: React.FC<{ name: string; type: string }> = ({ name, type }) => (
  <div className="w-44 sm:w-52 shrink-0 bg-navy-900/80 border border-slate-800/80 hover:border-gold-500/40 rounded-xl p-3.5 flex flex-col items-center justify-center transition-colors duration-300 group shadow-sm mx-1.5 sm:mx-2">
    <div className="w-7 h-7 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
      <Award className="w-3.5 h-3.5" aria-hidden="true" />
    </div>
    <h3 className="font-serif text-sm font-bold text-slate-100 group-hover:text-gold-300 transition-colors text-center">
      {name}
    </h3>
    <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5 text-center font-medium">
      {type}
    </p>
  </div>
);

export const TrustedBySection: React.FC = () => {
  return (
    <section className="py-16 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden" aria-label="Institutional Partners">
      <SectionBackdrop word="TRUSTED" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">

        <SectionHeader
          eyebrow="Institutional Trust"
          eyebrowIcon={ShieldCheck}
          title="Trusted by Leading Institutions & Organizations"
          description="Building lasting relationships through quality craftsmanship and trusted service."
          className="mb-10"
        />

        {/* Infinite marquee — pauses on hover, wraps statically under reduced-motion (see index.css) */}
        <Reveal>
          <div
            className="edm-marquee relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            aria-label="Our institutional clients"
          >
            <div className="edm-marquee-track">
              {TRUSTED_CLIENTS.map((client, idx) => (
                <ClientCard key={`a-${idx}`} name={client.name} type={client.type} />
              ))}
              {TRUSTED_CLIENTS.map((client, idx) => (
                <span key={`b-${idx}`} aria-hidden="true" className="contents">
                  <ClientCard name={client.name} type={client.type} />
                </span>
              ))}
            </div>
          </div>
          <p className="sr-only">
            {TRUSTED_CLIENTS.map((c) => `${c.name} (${c.type})`).join(', ')}
          </p>
        </Reveal>

      </div>
    </section>
  );
};
