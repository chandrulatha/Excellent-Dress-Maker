import React, { useState, useEffect } from 'react';
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Scissors } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { StatisticsSection } from './components/StatisticsSection';
import { IntroSection } from './components/IntroSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CorporateSection } from './components/CorporateSection';
import { TrustedBySection } from './components/TrustedBySection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { MeasurementSystem } from './components/MeasurementSystem';
import { AppointmentModal } from './components/AppointmentModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage, TermsPage } from './pages/PolicyPages';

/** V2 measuring-tape scroll bar — a real gold tailor's tape fixed to the
 *  very top of the page. The stitched (darker) portion grows with scroll
 *  and the readout counts centimetres stitched, exactly like measuring
 *  cloth. The Navbar is offset by the tape height (top-6 / 24px). */
const TapeProgressBar: React.FC = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const cmText = useTransform(smooth, (v) => `${Math.floor(v * 300)} cm stitched`);
  const pctText = useTransform(smooth, (v) => `${Math.round(v * 100)}%`);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-6 z-[60] overflow-hidden bg-[#ecc967] text-navy-950 shadow-[0_1px_0_rgba(0,0,0,0.35)] pointer-events-none select-none"
      role="progressbar"
      aria-label="Page reading progress"
    >
      {/* stitched portion — darker tape that grows with scroll */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 origin-left bg-[#c07f1d]/50 border-r-[3px] border-navy-950"
        style={{ scaleX: reduce ? scrollYProgress : smooth }}
      />
      {/* tape tick marks */}
      <div aria-hidden="true" className="absolute inset-0 edm-tape-ticks-v2" />
      {/* live readout */}
      <div className="relative z-10 flex items-center justify-between h-full pl-3 pr-2">
        <motion.span className="text-[11px] font-extrabold tracking-wide tabular-nums leading-none">
          {cmText}
        </motion.span>
        <span className="hidden sm:flex items-center gap-2">
          <motion.span className="text-[10px] font-bold tabular-nums leading-none">{pctText}</motion.span>
          <span className="rounded-full border border-navy-950/70 px-2.5 py-[3px] text-[9px] font-extrabold tracking-[0.18em] leading-none bg-[#ecc967]/70">
            MEASURING YOUR SCROLL
          </span>
        </span>
      </div>
    </div>
  );
};

/** Floating stitch rail (desktop only): a dashed gold thread down the
 *  right edge with a glowing needle that travels as you read. */
const SideStitchRail: React.FC = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });
  const needleTop = useTransform(smooth, [0, 1], ['0%', '100%']);
  if (reduce) return null;
  return (
    <div aria-hidden="true" className="hidden xl:block fixed right-5 top-1/2 -translate-y-1/2 h-[46vh] w-6 z-40 pointer-events-none">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] edm-stitch-rail" />
      <motion.div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: needleTop }}>
        <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-navy-950 border border-gold-400 shadow-[0_0_16px_rgba(200,157,66,0.75)]">
          <span className="absolute inset-0 rounded-full bg-gold-400/30 animate-ping" />
          <Scissors className="w-3.5 h-3.5 text-gold-300 -rotate-90 relative" />
        </span>
      </motion.div>
    </div>
  );
};

export function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>('Shirt Stitching');

  const openAppointment = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setIsAppointmentOpen(true);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col font-sans selection:bg-gold-500 selection:text-navy-950">
      <TapeProgressBar />
      <SideStitchRail />

      {/* Top Sticky Luxury Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        openAppointmentModal={() => openAppointment()}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSection
              onExploreServices={() => setActivePage('services')}
              onBookAppointment={() => openAppointment()}
            />
            <StatisticsSection />
            <IntroSection
              onReadMore={() => setActivePage('about')}
              onBookAppointment={() => openAppointment()}
            />
            <ServicesSection
              onSelectServiceForBooking={(name) => openAppointment(name)}
              onNavigateToServices={() => setActivePage('services')}
              compact={true}
            />
            <WhyChooseUs />
            <CorporateSection />
            <TrustedBySection />
            <PortfolioGallery />
            <ProcessSection />
            <TestimonialsSection />
            <ContactSection />
          </>
        )}

        {activePage === 'about' && (
          <AboutPage
            onBookAppointment={() => openAppointment()}
            onExploreWork={() => setActivePage('work')}
          />
        )}

        {activePage === 'services' && (
          <div className="pt-24 pb-12">
            <ServicesSection
              onSelectServiceForBooking={(name) => openAppointment(name)}
              compact={false}
            />
            <MeasurementSystem />
            <ContactSection />
          </div>
        )}

        {activePage === 'work' && (
          <div className="pt-24 pb-12">
            <PortfolioGallery />
            <ProcessSection />
          </div>
        )}

        {activePage === 'corporate' && (
          <div className="pt-24 pb-12">
            <CorporateSection />
            <TrustedBySection />
          </div>
        )}

        {activePage === 'measurements' && (
          <div className="pt-24 pb-12">
            <MeasurementSystem />
          </div>
        )}

        {activePage === 'testimonials' && (
          <div className="pt-24 pb-12">
            <TestimonialsSection />
            <TrustedBySection />
          </div>
        )}

        {activePage === 'contact' && (
          <div className="pt-24 pb-12">
            <ContactSection />
          </div>
        )}

        {activePage === 'privacy' && (
          <PrivacyPolicyPage onBack={() => setActivePage('home')} />
        )}

        {activePage === 'terms' && (
          <TermsPage onBack={() => setActivePage('home')} />
        )}
      </main>

      {/* Complete Footer */}
      <Footer
        setActivePage={setActivePage}
        openAppointmentModal={() => openAppointment()}
      />

      {/* Persistent Floating WhatsApp Channel */}
      <WhatsAppButton />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preSelectedService={selectedService}
      />

    </div>
    </MotionConfig>
  );
}

export default App;
