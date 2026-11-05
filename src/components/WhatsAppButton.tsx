import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface WhatsAppButtonProps {
  customMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ customMessage }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMsg = customMessage || "Hello Excellent Dress Makers, I would like to enquire about your tailoring services.";
  const encodedMsg = encodeURIComponent(defaultMsg);
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      {/* Tooltip / Prompt bubble */}
      {showTooltip && (
        <div className="mr-3 bg-navy-950/95 border border-gold-500/30 text-slate-100 text-xs px-3.5 py-2 rounded-xl shadow-2xl backdrop-blur-md max-w-xs animate-fadeIn relative">
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 bg-slate-800 text-slate-300 rounded-full p-0.5 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-semibold text-gold-400 mb-0.5">Quick Consultation</p>
          <p className="text-[11px] text-slate-300">Chat directly with master tailors on WhatsApp for pricing & appointments.</p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat with Excellent Dress Makers on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white rounded-full shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-emerald-300/40"
      >
        {/* Subtle Pulse ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping" />
        
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600 transition-transform group-hover:rotate-6" />

        <span className="sr-only">WhatsApp Chat</span>
      </a>
    </div>
  );
};
