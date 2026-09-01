export const dynamic = 'force-dynamic';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import EventExplorer from '@/components/event-explorer';
import ScheduleSection from '@/components/schedule-section';

import RulesSection from '@/components/rules-section';
import SponsorsSection from "@/components/sponsors-section";
import CertificateEligibilityNote from "@/components/certificate-eligibility-note";
import FemaleOfferBanner from "@/components/female-offer-banner";
import FAQSection from '@/components/faq-section';
import ContactSection from '@/components/contact-section';
import CustomCursor from '@/components/custom-cursor';
import { SYMPOSIUM_METADATA, GOOGLE_FORM_REGISTRATION_URL } from '@/lib/data/events';
import Link from 'next/link';
import {
  Flame,
  ArrowRight,
  Shield,
  Layers,
  Calendar,
  MapPin,
  Award,
  Globe,
  Users,
  Compass,
  Sparkles
} from 'lucide-react';



import BackgroundVideo from '@/components/background-video';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-void text-slate-100 relative overflow-hidden selection:bg-red-600/40">

      {/* Global Background Video (Fixed for Mobile & Desktop) */}
      <BackgroundVideo />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Glassmorphic Dragon Navbar */}
      <Navbar />

      {/* Atmospheric Background Geometry & Dragon Embers */}
      <div className="fixed inset-0 bg-grid-pattern opacity-15 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-dragon-embers opacity-25 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-red-600/15 via-orange-600/10 to-transparent rounded-full blur-[150px] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* 1. HERO / LANDING SECTION WITH OFFICIAL DRAGON EMBLEM */}
      {/* ========================================================================= */}
      <section className="relative pt-20 pb-12 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-20">

        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-red-500/40 text-xs font-mono text-red-300 backdrop-blur-md shadow-[0_0_25px_rgba(230,0,26,0.35)] mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
          <span className="font-bold tracking-widest uppercase">AMSPHERE PRESENTS • AETHERION&apos;26</span>
        </div>

        {/* Hero Main Dragon Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 drop-shadow-[0_0_35px_rgba(230,0,26,0.9)] my-2 font-mono">
          AETHERION<span className="text-red-500 font-sans text-2xl sm:text-4xl tracking-normal">&apos;26</span>
        </h1>

        {/* Subtitle / Tagline */}
        <div className="space-y-1.5 max-w-2xl mx-auto mb-6">
          <p className="text-xs sm:text-sm text-red-300/90 font-mono tracking-widest uppercase font-semibold">
            National Level Technical &amp; Non-Technical Symposium
          </p>
        </div>

        {/* Event Coordinates Metadata Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-200 font-mono mb-6 py-3 px-6 rounded-2xl bg-black/60 border border-red-500/30 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-red-400" />
            <span>{SYMPOSIUM_METADATA.date}</span>
          </div>
          <span className="hidden sm:inline text-red-900">•</span>
          <a
            href={SYMPOSIUM_METADATA.venueMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-red-400 transition-colors underline decoration-red-500/50 underline-offset-4"
            title="Open AMS College of Engineering on Google Maps"
          >
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>{SYMPOSIUM_METADATA.venue}</span>
          </a>
          <span className="hidden sm:inline text-red-900">•</span>
          <div className="flex items-center gap-2 text-white font-bold">
            <Globe className="w-4 h-4 text-red-500" />
            <span>Presented by {SYMPOSIUM_METADATA.institution}</span>
          </div>
        </div>

        {/* Primary & Secondary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-20">
          <a
            href={GOOGLE_FORM_REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white font-bold text-sm shadow-[0_0_35px_rgba(230,0,26,0.5)] hover:brightness-110 hover:shadow-[0_0_50px_rgba(230,0,26,0.7)] transition-all active:scale-95"
          >
            <span>REGISTER NOW (₹150 FOR ALL EVENTS)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#events"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-black/60 hover:bg-white/[0.08] border border-red-500/30 text-white font-semibold text-sm backdrop-blur-md transition-all active:scale-95"
          >
            <Compass className="w-4 h-4 text-red-400" />
            <span>EXPLORE ALL 10 EVENTS</span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT AETHERION'26 SECTION & METRICS */}
      {/* ========================================================================= */}
      <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-red-500/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400">
              <Layers className="w-3.5 h-3.5" />
              <span>THE VISION OF AETHERION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              AMSphere Presents: Where Power Meets <span className="text-gradient">Limitless Intelligence</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Proudly presented by <strong className="text-red-400">AMSphere</strong>, <strong>AETHERION&apos;26</strong> is a national-scale flagship symposium crafted as a premier battleground for ambitious engineers, digital creators, competitive coders, gamers, and athletic minds.
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Guided by the spirit of the dragon — <strong className="text-slate-200 font-mono">POWER • INNOVATION • COMPETITION • CREATIVITY • FUTURE</strong> — the symposium offers high-stakes technical defense tracks and adrenaline-charged non-technical arenas under a single <strong className="text-red-400">₹150 pass (covers All Events)</strong>.
            </p>
          </div>

          {/* Metric Counter Panels */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {SYMPOSIUM_METADATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-red-500/40 hover:shadow-[0_0_25px_rgba(230,0,26,0.2)] transition-all flex flex-col justify-between group"
              >
                <span className="text-3xl sm:text-4xl font-black font-mono text-white group-hover:text-red-400 transition-colors">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 font-mono mt-3 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Eligibility Note Banner */}
        <div className="mt-12">
          <CertificateEligibilityNote />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EVENT SYSTEM & EXPLORER (TECHNICAL & NON-TECHNICAL) */}
      {/* ========================================================================= */}
      <EventExplorer />

      {/* ========================================================================= */}
      {/* 4. SCHEDULE & 1-DAY TIMELINE SECTION */}
      {/* ========================================================================= */}
      <ScheduleSection />

      {/* ========================================================================= */}
      {/* 5. COORDINATORS DIRECTORY */}
      {/* ========================================================================= */}


      {/* ========================================================================= */}
      {/* 6. RULES & REGULATIONS */}
      {/* ========================================================================= */}
      <RulesSection />

      {/* ========================================================================= */}
      {/* 7. SPONSORS & PARTNERS */}
      {/* ========================================================================= */}
      <SponsorsSection />

      {/* ========================================================================= */}
      {/* 8. FAQ SECTION */}
      {/* ========================================================================= */}
      <FAQSection />

      {/* ========================================================================= */}
      {/* 9. CONTACT & CAMPUS PORTAL */}
      {/* ========================================================================= */}
      <ContactSection />

      {/* ========================================================================= */}
      {/* 10. PREMIUM DRAGON FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-red-500/20 bg-[#060203] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" />
              AMSPHERE PRESENTS
            </span>
            <span className="text-xl font-black tracking-widest text-white">
              AETHERION<span className="text-red-500 font-mono text-sm">&apos;26</span>
            </span>
            <p className="text-xs text-slate-500 max-w-sm">
              [OFFICIAL TAGLINE — ADD WHEN PROVIDED]
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Presented by AMSphere
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-red-400 transition-colors">About</a>
            <a href="#events" className="hover:text-red-400 transition-colors">Events</a>
            <a href="#schedule" className="hover:text-red-400 transition-colors">Schedule</a>
            <a href="#rules" className="hover:text-red-400 transition-colors">Rules</a>
            <a href="#faq" className="hover:text-red-400 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-red-400 transition-colors">Contact</a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs text-slate-500">
              &copy; 2026 AMSphere Presents AETHERION&apos;26. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
