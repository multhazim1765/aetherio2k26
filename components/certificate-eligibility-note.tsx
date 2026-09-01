'use client';

import React from 'react';
import { Award, CheckCircle2, XCircle } from 'lucide-react';
import FemaleOfferBanner from '@/components/female-offer-banner';

export default function CertificateEligibilityNote({ className = '' }: { className?: string }) {
  return (
    <div className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-red-950/30 via-black/60 to-surface border border-red-500/30 space-y-4 shadow-lg ${className}`}>
      <div className="flex items-center gap-2.5 border-b border-red-500/20 pb-3">
        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
          <Award className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
            📌 NOTE – Certificate Eligibility
          </h4>
          <p className="text-[11px] text-slate-400">Official Certification Policy for AETHERION'26</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Tech Only */}
        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">💻 Technical Event Only</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold w-fit">
            Certificate Provided
          </span>
        </div>

        {/* Non Tech Only */}
        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">🎯 Non-Technical Event Only</span>
            <XCircle className="w-4 h-4 text-amber-400" />
          </div>
          <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold w-fit">
            No Certificate Provided
          </span>
        </div>

        {/* Both Tech + Non Tech */}
        <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">🏆 Technical + Non-Tech</span>
            <Award className="w-4 h-4 text-red-400" />
          </div>
          <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 font-bold w-fit">
            Certificate Provided
          </span>
        </div>
      </div>

      {/* Female Participant Special Offer */}
      <FemaleOfferBanner />
    </div>
  );
}
