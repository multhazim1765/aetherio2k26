'use client';

import React, { useState } from 'react';
import { Clock, X, ChevronUp, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FemaleOfferFloatingWidget() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 transition-all duration-300 max-w-[calc(100vw-1.5rem)]">
      {isMinimized ? (
        /* Minimized Floating Button (Mobile & Desktop) */
        <button
          onClick={() => setIsMinimized(false)}
          className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 text-white font-bold text-[11px] shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:scale-105 transition-all border border-pink-400/50"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-400"></span>
          </span>

          <Gift className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
          <span className="tracking-tight">🎁 Special Female Offer</span>
          <ChevronUp className="w-3 h-3 text-pink-200 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      ) : (
        /* Floating Offer Card (Perfectly Tailored for Mobile & Desktop) */
        <div className="relative w-[295px] sm:w-[320px] rounded-xl bg-gradient-to-b from-[#1c0712]/95 via-[#120309]/95 to-[#080104]/95 backdrop-blur-xl border border-pink-500/50 shadow-[0_10px_35px_rgba(236,72,153,0.45)] p-3 sm:p-3.5 text-white transition-all duration-300 animate-in slide-in-from-bottom-4">
          {/* Ambient Glow */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Compact Header */}
          <div className="flex items-center justify-between gap-1 pb-1.5 mb-2 border-b border-pink-500/25">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <span className="text-[9px] uppercase font-mono font-extrabold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 tracking-wider">
                SPECIAL OFFER
              </span>
            </div>

            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setIsMinimized(true)}
                title="Minimize"
                className="px-1.5 py-0.5 rounded text-slate-400 hover:text-white hover:bg-white/10 text-[10px] font-mono leading-none"
              >
                _
              </button>
              <button
                onClick={() => setIsVisible(false)}
                title="Close"
                className="p-1 rounded text-slate-400 hover:text-pink-300 hover:bg-pink-500/20 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card Main Body */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-base flex-shrink-0 shadow-inner">
                🎁
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-extrabold text-pink-200 uppercase font-mono leading-tight">
                  Special Offer for Female Participants!
                </h3>
                <div className="mt-1 inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  <Clock className="w-2.5 h-2.5 text-pink-400 animate-pulse" />
                  <span>LIMITED SLOTS</span>
                </div>
              </div>
            </div>

            {/* Offer Highlight Box */}
            <div className="p-2 rounded-lg bg-pink-950/40 border border-pink-500/25">
              <p className="text-[10px] text-slate-100 leading-tight">
                ✨ The first <strong className="text-pink-300 font-bold underline decoration-pink-400">25 female registrations</strong> will get <strong className="text-amber-300 font-extrabold uppercase">FREE Mehendi application</strong> on the palm.
              </p>
            </div>

            {/* Urgency Alert & Action Button */}
            <div className="pt-0.5 flex items-center justify-between gap-1.5">
              <span className="text-[9px] font-mono font-bold text-amber-400 animate-pulse">
                ⏳ Hurry! Limited slots only!
              </span>

              <Link
                href="/register"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:brightness-110 text-white text-[10px] font-bold shadow-[0_0_10px_rgba(236,72,153,0.4)] transition-all flex-shrink-0"
              >
                <span>Register Now</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
