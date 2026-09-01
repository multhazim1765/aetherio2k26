'use client';

import React from 'react';
import { Award, Zap, Flame } from 'lucide-react';

export default function SponsorsSection() {
  const sponsorCategories = [
    { tier: "Title Sponsor", status: "Official Partner Pending Announcement" },
    { tier: "Powered By", status: "Official Partner Pending Announcement" },
    { tier: "Technology Partner", status: "Official Partner Pending Announcement" },
    { tier: "Gaming & Esports Partner", status: "Official Partner Pending Announcement" },
  ];

  return (
    <section id="sponsors" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-4">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>COLLABORATIVE ECOSYSTEM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Symposium <span className="text-gradient">Partners & Sponsors</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2">
          Empowering innovation and excellence at AETHERION&apos;26.
        </p>
      </div>

      {/* Grid of official partner tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sponsorCategories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center text-center group hover:border-red-500/40 hover:shadow-[0_0_25px_rgba(230,0,26,0.15)] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-3 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold mb-1">
              {cat.tier}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {cat.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
