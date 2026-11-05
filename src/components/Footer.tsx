import React from 'react';
import { 
  Phone, Mail, MapPin, Clock, 
  ArrowUpRight, ShieldCheck 
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/businessData';
import { BrandLogo } from './BrandLogo';
import { InstagramIcon } from './ui/InstagramIcon';

interface FooterProps {
  setActivePage: (page: string) => void;
  openAppointmentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, openAppointmentModal }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 border-t border-slate-800/80 text-slate-300 pt-16 pb-12 relative overflow-hidden" role="contentinfo">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          
          {/* Brand & Ethos */}
          <div className="space-y-3.5">
            <div className="flex items-center space-x-3">
              <BrandLogo size="md" />
              <div>
                <span className="font-serif text-lg font-extrabold tracking-tight text-white block uppercase">
                  EXCELLENT
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold-400 font-bold block">
                  Dress Makers • NGGO Colony
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Serving men and women, educational institutions, automotive dealerships, and corporate organizations across Erode and Tamil Nadu with 25+ years of tailored excellence and precision craftsmanship.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gold-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
                <span>50,000+ Patrons Trusted</span>
              </div>

              <a
                href={BUSINESS_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 text-xs flex items-center gap-1 underline underline-offset-2 transition"
                title="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@excellenttailorserode</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif text-sm font-bold tracking-wide mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
              Navigation
              <span className="w-6 h-0.5 bg-gold-500/50" />
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Our Heritage' },
                { id: 'services', label: 'Bespoke Services & Pricing' },
                { id: 'work', label: 'Our Work & Gallery' },
                { id: 'corporate', label: 'Institutional & Corporate' },
                { id: 'measurements', label: 'Self Measurement System' },
                { id: 'contact', label: 'Contact & Location' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="hover:text-gold-300 transition-colors flex items-center gap-1.5 group text-left p-0.5"
                  >
                    <span className="text-gold-500/60 group-hover:text-gold-400 text-xs">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tailoring Services */}
          <div>
            <h4 className="text-white font-serif text-sm font-bold tracking-wide mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
              Our Specialties
              <span className="w-6 h-0.5 bg-gold-500/50" />
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {SERVICES_DATA.slice(0, 5).map((srv) => (
                <li key={srv.id} className="flex justify-between items-center text-xs">
                  <span>{srv.name}</span>
                  <span className="text-gold-400 font-semibold">{srv.startingPrice}</span>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={openAppointmentModal}
                  className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1 underline underline-offset-4 font-medium"
                >
                  Book an in-shop measurement session
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Shop Address */}
          <div>
            <h4 className="text-white font-serif text-sm font-bold tracking-wide mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
              Visit Our Atelier
              <span className="w-6 h-0.5 bg-gold-500/50" />
            </h4>
            <address className="not-italic space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs leading-relaxed text-slate-300">
                  {BUSINESS_INFO.address.full}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
                <div className="text-xs text-slate-300 space-x-1.5">
                  <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="hover:text-gold-300">{BUSINESS_INFO.primaryPhone}</a>
                  <span>•</span>
                  <a href={`tel:${BUSINESS_INFO.landlinePhone}`} className="hover:text-gold-300">{BUSINESS_INFO.landlinePhone}</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
                <span className="text-xs text-slate-300">{BUSINESS_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2.5 pt-0.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs text-slate-400 leading-tight">
                  {BUSINESS_INFO.workingHours.weekdays}
                </span>
              </div>
            </address>
          </div>

        </div>

        {/* Bottom Bar with Disclaimers & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved. 25+ Years of Excellence.
          </p>

          <p className="text-[11px] text-slate-500 text-center md:text-right">
            Note: Fabric is not included unless explicitly confirmed in service packages.
          </p>

          <div className="flex space-x-6">
            <button onClick={() => handleNav('privacy')} className="hover:text-slate-300 transition p-1">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('terms')} className="hover:text-slate-300 transition p-1">
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
