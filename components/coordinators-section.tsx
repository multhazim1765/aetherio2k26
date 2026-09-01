'use client';

import React, { useState } from 'react';
import { EVENTS_DATA } from '@/lib/data/events';
import { Users2, Flame, User, Filter } from 'lucide-react';

export default function CoordinatorsSection() {
  const [filter, setFilter] = useState<'all' | 'technical' | 'non-technical'>('all');

  const filteredEvents = EVENTS_DATA.filter((e) => {
    if (filter === 'all') return true;
    return e.category === filter;
  });

  return (
    <section id="coordinators" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-4">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>SYMPOSIUM LEADERSHIP</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Event <span className="text-gradient">Coordinators Directory</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Dedicated student leads organizing and managing individual technical and cultural tracks.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 rounded-xl bg-surface border border-border shadow-inner">
          {[
            { id: 'all', label: 'All Tracks' },
            { id: 'technical', label: 'Technical Leads' },
            { id: 'non-technical', label: 'Non-Technical Leads' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-[0_0_15px_rgba(230,0,26,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Event Coordinator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const isTech = event.category === 'technical';
          return (
            <div
              key={event.id}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(230,0,26,0.15)] transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <div>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                      isTech
                        ? 'bg-red-500/10 text-red-300 border-red-500/20'
                        : 'bg-orange-500/10 text-orange-300 border-orange-500/20'
                    }`}
                  >
                    {event.category}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{event.title}</h4>
                </div>
              </div>

              {/* List of Coordinators */}
              <div className="space-y-3">
                {event.coordinators.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600/20 to-orange-600/20 border border-red-500/30 flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono flex-wrap">
                        {c.year && c.year !== '4th Year' && <span>{c.year} •</span>}
                        {c.role && <span className="text-red-400 truncate">{c.role}</span>}
                      </div>
                      {c.phone && (
                        <a
                          href={`tel:${c.phone}`}
                          className="inline-flex items-center gap-1 text-[11px] text-red-300 hover:text-red-200 hover:underline font-mono mt-0.5"
                        >
                          📞 {c.phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
