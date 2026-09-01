'use client';

import React, { useState } from 'react';
import { EventItem, GOOGLE_FORM_REGISTRATION_URL } from '@/lib/data/events';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  Layers,
  Flame
} from 'lucide-react';
import Link from 'next/link';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'rounds' | 'rules' | 'coordinators'>('overview');

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#0d0508] border border-red-500/30 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(230,0,26,0.25)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-red-950/50 via-orange-950/30 to-black/80 border-b border-red-500/20">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full uppercase border ${event.category === 'technical'
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                }`}
            >
              {event.category}
            </span>
            {event.badge && (
              <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-red-600/20 text-red-300 border border-red-500/30">
                {event.badge}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mb-1">
            {event.title}
          </h2>
          <p className="text-sm text-red-300/80 font-medium">
            {event.tagline}
          </p>

          {/* Quick Highlight Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-red-500/20 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-4 h-4 text-red-300 flex-shrink-0" />
              <span>{event.teamSize}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Pass: ₹150 for All</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-red-500/20 px-6 bg-black/40 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'rounds', label: 'Rounds & Format' },
            { id: 'rules', label: 'Rules & Guidelines' },
            { id: 'coordinators', label: 'Coordinators' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${activeTab === tab.id
                  ? 'border-red-500 text-red-400 bg-red-500/[0.08]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase font-mono text-red-400 tracking-wider mb-2">Event Description</h4>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {event.fullDesc}
                </p>
              </div>

              {/* Sub-events for E-Sports */}
              {event.subEvents && event.subEvents.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-mono text-red-400 tracking-wider mb-3">Featured Sub-Events / Titles</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {event.subEvents.map((sub) => (
                      <div key={sub.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-white text-sm">{sub.name}</h5>
                          {sub.fee && <span className="text-xs font-mono text-red-400">Included in Pass</span>}
                        </div>
                        <p className="text-xs text-slate-400">{sub.description}</p>
                        {sub.prize && <p className="text-[11px] font-mono text-amber-300">Prize: {sub.prize}</p>}
                        {sub.coordinators && sub.coordinators.length > 0 && (
                          <p className="text-[11px] text-slate-500">
                            Coordinators: {sub.coordinators.map(c => `${c.name} (${c.year})`).join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prize Details */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs uppercase font-mono text-amber-300 font-bold tracking-wider">
                    Prizes & Recognitions
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
                  {event.prizes.first && (
                    <div className="bg-black/40 p-2.5 rounded-lg border border-amber-400/20">
                      <span className="text-[10px] text-amber-400 block font-mono">🥇 1ST PLACE</span>
                      <span className="font-semibold text-white">{event.prizes.first}</span>
                    </div>
                  )}
                  {event.prizes.second && (
                    <div className="bg-black/40 p-2.5 rounded-lg border border-slate-400/20">
                      <span className="text-[10px] text-slate-400 block font-mono">🥈 2ND PLACE</span>
                      <span className="font-semibold text-white">{event.prizes.second}</span>
                    </div>
                  )}
                  {event.prizes.overall && (
                    <div className="bg-black/40 p-2.5 rounded-lg border border-amber-700/20">
                      <span className="text-[10px] text-amber-600 block font-mono">💰 TOTAL</span>
                      <span className="font-semibold text-white">{event.prizes.overall}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rounds' && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono text-red-400 tracking-wider mb-2">Event Rounds & Flow</h4>
              {event.rounds && event.rounds.length > 0 ? (
                event.rounds.map((round, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center font-mono font-bold text-red-400 text-sm flex-shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">{round.title}</h5>
                      <p className="text-xs text-slate-400 mt-1">{round.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">Standard bracket and match format will be briefed before the event begins.</p>
              )}

              {event.judgingCriteria && event.judgingCriteria.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <h4 className="text-xs uppercase font-mono text-orange-400 tracking-wider mb-3">Judging Criteria</h4>
                  <ul className="space-y-2">
                    {event.judgingCriteria.map((crit, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono text-red-400 tracking-wider mb-2">Official Rules & Regulations</h4>
              {event.rules.map((rule, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3 text-xs text-slate-300">
                  <ShieldAlert className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'coordinators' && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono text-red-400 tracking-wider mb-2">Event Coordinators</h4>
              {event.coordinators && event.coordinators.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.coordinators.map((coord, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-sm">{coord.name}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">{coord.role}{coord.year && coord.year !== '4th Year' ? ` • ${coord.year}` : ''}</p>
                        {coord.phone && (
                          <a
                            href={`tel:${coord.phone}`}
                            className="inline-flex items-center gap-1 text-[11px] text-red-300 hover:text-red-200 hover:underline font-mono mt-0.5"
                          >
                            📞 {coord.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">.</p>
              )}
            </div>
          )}


        </div>

        {/* Footer Action Bar */}
        <div className="p-4 sm:p-6 bg-[#090305] border-t border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block">Symposium Delegate Pass</span>
            <span className="text-lg font-bold font-mono text-red-400">
              ₹150 <span className="text-xs text-slate-400 font-normal">(For All Events)</span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            <a
              href={GOOGLE_FORM_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-[0_0_20px_rgba(230,0,26,0.4)] transition-all"
            >
              <span>REGISTER (₹150 FOR ALL)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
