'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Award, X, Info } from 'lucide-react';
import FemaleOfferBanner from '@/components/female-offer-banner';

export default function CertificateModalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup automatically on initial page visit if not dismissed this session
    const dismissed = sessionStorage.getItem('certificate_popup_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('certificate_popup_dismissed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg bg-[#0d0406] border border-red-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(230,0,26,0.3)] space-y-6 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close Notice"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-red-500/20 pb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block">
              Important Announcement
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              📌 NOTE – Certificate Eligibility
            </h3>
          </div>
        </div>

        {/* Notice Content Grid */}
        <div className="space-y-3">
          {/* Tech Event Only */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">💻 Technical Event Only</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                  Provided
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">Official Certificate of Participation will be provided.</p>
            </div>
          </div>

          {/* Non-Tech Event Only */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0 mt-0.5">
              <XCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">🎯 Non-Technical Event Only</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                  No Certificate
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">No certificate will be provided for solo non-tech entry.</p>
            </div>
          </div>

          {/* Both Tech + Non-Tech */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/40 to-orange-950/40 border border-red-500/40 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 flex-shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">🏆 Both Technical + Non-Technical Events</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 font-bold">
                  Provided
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">Official Certificate of Participation will be provided.</p>
            </div>
          </div>

          {/* Female Participant Mehendi Offer */}
          <FemaleOfferBanner />
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(230,0,26,0.4)] transition-all"
          >
            I Understand & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
