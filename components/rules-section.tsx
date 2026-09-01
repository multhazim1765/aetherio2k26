'use client';

import React, { useState } from 'react';
import { RULES_SECTIONS } from '@/lib/data/events';
import { ShieldCheck, ChevronDown, CheckCircle2, Flame } from 'lucide-react';

import CertificateEligibilityNote from '@/components/certificate-eligibility-note';

export default function RulesSection() {
  const [openSection, setOpenSection] = useState<string>('general-rules');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? '' : id);
  };

  return (
    <section id="rules" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Certificate Eligibility Banner */}
      <CertificateEligibilityNote />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-4">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>OFFICIAL CODE OF CONDUCT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Rules & <span className="text-gradient">Regulations</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Transparent guidelines for participation, submission standards, discipline, and awards.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {RULES_SECTIONS.map((sec) => {
          const isOpen = openSection === sec.id;
          return (
            <div
              key={sec.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen ? 'bg-surface border-red-500/40 shadow-[0_0_25px_rgba(230,0,26,0.15)]' : 'bg-surface/60 border-border hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleSection(sec.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs border ${
                    isOpen ? 'bg-red-600/20 text-red-300 border-red-500/40' : 'bg-white/5 text-slate-400 border-white/10'
                  }`}>
                    §
                  </div>
                  <h3 className="font-bold text-white text-base sm:text-lg">{sec.title}</h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-red-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-3">
                  {sec.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
