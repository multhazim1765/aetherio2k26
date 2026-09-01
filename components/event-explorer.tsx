'use client';

import React, { useState, useMemo } from 'react';
import { EventItem, EVENTS_DATA } from '@/lib/data/events';
import EventModal from './event-modal';
import Link from 'next/link';
import {
  Search,
  Cpu,
  Terminal,
  Presentation,
  Palette,
  Gamepad2,
  Film,
  Mic2,
  Dumbbell,
  Sparkles,
  ArrowUpRight,
  Clock,
  MapPin,
  Users,
  Shield,
  Layers,
  ChevronRight,
  Flame
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Presentation: <Presentation className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  Film: <Film className="w-5 h-5" />,
  Mic2: <Mic2 className="w-5 h-5" />,
  Dumbbell: <Dumbbell className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export default function EventExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'non-technical' | 'e-sports'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      let matchesCat = true;
      if (selectedCategory === 'technical') matchesCat = event.category === 'technical';
      if (selectedCategory === 'non-technical') matchesCat = event.category === 'non-technical';
      if (selectedCategory === 'e-sports') matchesCat = event.category === 'e-sports';

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const titleMatch = event.title.toLowerCase().includes(q);
      const descMatch = event.shortDesc.toLowerCase().includes(q) || event.tagline.toLowerCase().includes(q);
      const coordMatch = event.coordinators.some((c) => c.name.toLowerCase().includes(q));
      const subMatch = event.subEvents?.some((s) => s.name.toLowerCase().includes(q));

      return matchesCat && (titleMatch || descMatch || coordMatch || subMatch);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="events" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Section Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-4">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>COMPETITIVE ARENAS • ₹150 FOR ALL EVENTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Explore All <span className="text-gradient">AETHERION Events</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          From algorithmic reverse engineering and UI designathons to battle royale gaming and creative challenges.
        </p>
      </div>

      {/* Control Bar: Category Switcher & Instant Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Switcher Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-surface border border-border shadow-inner w-full md:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Tracks' },
            { id: 'technical', label: 'Technical' },
            { id: 'non-technical', label: 'Non-Technical' },
            { id: 'e-sports', label: 'E-Sports' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-[0_0_15px_rgba(230,0,26,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, topics, coordinators..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isTechnical = event.category === 'technical';
            return (
              <div
                key={event.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-surface border border-border p-6 transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_10px_35px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(230,0,26,0.25)] hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors ${
                        isTechnical
                          ? 'bg-red-500/15 border-red-500/30 text-red-400 group-hover:bg-red-500/25 group-hover:border-red-400 shadow-[0_0_15px_rgba(230,0,26,0.2)]'
                          : 'bg-orange-500/15 border-orange-500/30 text-orange-400 group-hover:bg-orange-500/25 group-hover:border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                      }`}
                    >
                      {iconMap[event.iconName] || <Flame className="w-5 h-5" />}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          isTechnical
                            ? 'bg-red-500/10 text-red-300 border-red-500/25'
                            : 'bg-orange-500/10 text-orange-300 border-orange-500/25'
                        }`}
                      >
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-red-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-red-400/80 font-mono mt-1 mb-3">{event.tagline}</p>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-6">
                    {event.shortDesc}
                  </p>

                  {/* Sub-events for E-Sports preview */}
                  {event.subEvents && (
                    <div className="mb-4 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-mono text-red-400 block font-semibold">Included Titles:</span>
                      <div className="flex gap-2">
                        {event.subEvents.map(s => (
                          <span key={s.id} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 border-t border-border pt-4 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-red-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-red-300" />
                      <span>{event.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-red-300 font-bold">
                      <span>Pass: ₹150 for All</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Rules & Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface border border-border rounded-2xl max-w-md mx-auto">
          <p className="text-slate-400 text-sm">No events found matching your search query.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 text-xs font-mono text-red-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Event Details Modal */}
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
