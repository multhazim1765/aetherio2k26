'use client';

import React from 'react';
import { Sparkles, Clock } from 'lucide-react';

export default function FemaleOfferBanner({ className = '' }: { className?: string }) {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-red-950/40 border border-pink-500/40 shadow-[0_0_25px_rgba(236,72,153,0.25)] relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300 flex-shrink-0 text-lg shadow-inner">
          🎁
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-xs sm:text-sm font-extrabold text-pink-300 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <span>Special Offer for Female Participants!</span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </h4>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-200 border border-pink-500/40">
              <Clock className="w-3 h-3 text-pink-400" />
              <span>LIMITED SLOTS</span>
            </span>
          </div>

          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            ✨ The first <strong className="text-white">25 female registrations</strong> will get <strong className="text-pink-300">FREE Mehendi application</strong> on the palm.
          </p>

          <p className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1 pt-0.5">
            <span>⏳ Hurry! Limited slots only!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
