'use client';

import React, { useState } from 'react';
import { FAQ_DATA } from '@/lib/data/events';
import { HelpCircle, ChevronDown, Flame } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-4">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>CLARIFICATIONS & QUERIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Everything you need to know about registration, eligibility, UPI verification, and certificates.
        </p>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-surface border-red-500/40 shadow-[0_0_25px_rgba(230,0,26,0.15)]'
                  : 'bg-surface/50 border-border hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors"
              >
                <span className="font-semibold text-white text-sm sm:text-base">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-red-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
