'use client';

import React, { useState } from 'react';
import { TIMELINE_SCHEDULE } from '@/lib/data/events';
import { Calendar, Clock, MapPin, Tag, ChevronRight, Flame } from 'lucide-react';

export default function ScheduleSection() {
  const [filterCategory, setFilterCategory] = useState<'All' | 'Technical' | 'Non-Technical' | 'Special'>('All');

  const currentDayData = TIMELINE_SCHEDULE[0];

  const filteredItems = (currentDayData?.items || []).filter((item) => {
    if (filterCategory === 'All') return true;
    return item.category === filterCategory;
  });

  return (
    <section id="schedule" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Dragon Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>SYMPOSIUM CHRONOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Event <span className="text-gradient">Timeline & Schedule</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Synchronized milestones across keynotes, algorithmic tracks, design sprints, and gaming arenas.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-xl border border-red-500/30 shadow-[0_0_15px_rgba(230,0,26,0.15)]">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            1-DAY INTENSIVE ITINERARY
          </span>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2">
          {(['All', 'Technical', 'Non-Technical', 'Special'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-[0_0_15px_rgba(230,0,26,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 bg-surface border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l border-red-500/20 pl-6 sm:pl-8 ml-4 sm:ml-8 space-y-8">
        {filteredItems.map((item, idx) => {
          const isTech = item.category === 'Technical';
          const isNonTech = item.category === 'Non-Technical';
          const isSpecial = item.category === 'Special';

          return (
            <div key={idx} className="relative group">
              {/* Timeline Node Glow Bullet */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-void transition-transform group-hover:scale-125 ${
                  isTech
                    ? 'border-red-500 shadow-[0_0_10px_#e6001a]'
                    : isNonTech
                    ? 'border-orange-500 shadow-[0_0_10px_#f97316]'
                    : 'border-white/80 shadow-[0_0_10px_#ffffff]'
                }`}
              />

              {/* Card */}
              <div className="p-5 rounded-xl bg-surface border border-border group-hover:border-red-500/40 group-hover:shadow-[0_0_20px_rgba(230,0,26,0.2)] transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isTech
                          ? 'bg-red-500/10 text-red-300 border-red-500/20'
                          : isNonTech
                          ? 'bg-orange-500/10 text-orange-300 border-orange-500/20'
                          : 'bg-white/10 text-slate-200 border-white/20'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {item.venue}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-red-300 transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
