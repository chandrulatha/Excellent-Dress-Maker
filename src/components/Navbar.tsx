import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Calendar, ChevronRight, MessageCircle 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { BrandLogo } from './BrandLogo';
import { InstagramIcon } from './ui/InstagramIcon';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  openAppointmentModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  openAppointmentModal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Our Work' },
    { id: 'corporate', label: 'Corporate & Schools' },
    { id: 'measurements', label: 'Fit Studio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-navy-950/95 backdrop-blur-md shadow-xl py-3 border-b border-slate-800/80' 
          : 'bg-navy-950/90 sm:bg-gradient-to-b sm:from-navy-950/95 sm:via-navy-950/60 sm:to-transparent py-3.5 sm:py-4 border-b border-slate-800/40 sm:border-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Name - Clean, strictly matching physical signboard without unwanted extras */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group rounded-lg focus-visible:ring-2 focus-visible:ring-gold-400 p-1 -m-1 shrink-0"
            aria-label="Excellent Dress Makers Home"
          >
            <BrandLogo size="md" className="transform group-hover:scale-105 transition-transform shrink-0" />
            <div className="flex flex-col justify-center">
              <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-gold-300 transition-colors uppercase leading-tight">
                EXCELLENT
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-bold leading-tight">
                DRESS MAKERS
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1" role="navigation" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-lg relative whitespace-nowrap ${
                    isActive
                      ? 'text-gold-300 bg-gold-500/15 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-gold-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: Telephone, Instagram, Appointment Button */}
          <div className="hidden lg:flex items-center space-x-2.5 shrink-0">
            <a
              href={BUSINESS_INFO.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-pink-400 p-2 rounded-lg hover:bg-white/5 transition flex items-center justify-center"
              title="Follow @excellenttailorserode on Instagram"
              aria-label="Instagram profile"
            >
              <InstagramIcon className="w-4 h-4 text-gold-400 hover:text-pink-400" />
            </a>

            <a
              href={`tel:${BUSINESS_INFO.primaryPhone}`}
              className="text-slate-200 hover:text-gold-300 text-xs font-semibold flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/5 transition whitespace-nowrap"
              title="Call us directly"
              aria-label={`Call Excellent Dress Makers at ${BUSINESS_INFO.primaryPhone}`}
            >
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
              <span>{BUSINESS_INFO.primaryPhone}</span>
            </a>

            <button
              onClick={openAppointmentModal}
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-wider font-extrabold text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md shadow-gold-500/20 border border-gold-200 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-navy-950" aria-hidden="true" />
              Book Appointment
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={openAppointmentModal}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 to-gold-400 rounded-lg shadow-sm"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden bg-navy-950/98 border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl animate-fadeIn"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between text-left px-3.5 py-3 rounded-lg text-sm font-medium transition ${
                  activePage === item.id
                    ? 'bg-gold-500/15 text-gold-300 font-bold border-l-4 border-gold-400'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAppointmentModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 font-bold rounded-lg text-xs uppercase tracking-wider shadow-md"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Book an Appointment
            </button>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Excellent%20Dress%20Makers,%20I%20would%20like%20to%20enquire%20about%20tailoring`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 rounded-lg text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp: {BUSINESS_INFO.primaryPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
