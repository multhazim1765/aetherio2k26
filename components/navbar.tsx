'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { GOOGLE_FORM_REGISTRATION_URL } from '@/lib/data/events';
import { Menu, X, Flame, Shield, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Rules', href: '#rules' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const getHref = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060203]/95 backdrop-blur-xl border-b border-red-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(230,0,26,0.15)] py-2.5'
          : 'bg-[#060203]/80 sm:bg-transparent py-4 backdrop-blur-md sm:backdrop-blur-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Official Dragon Emblem */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-black/60 border border-red-500/40 p-0.5 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-red-500 shadow-[0_0_20px_rgba(230,0,26,0.35)]">
            <Image
              src="/logo.jpg"
              alt="AETHERION Logo"
              width={40}
              height={40}
              className="object-cover w-full h-full rounded-[10px]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-red-400 font-bold leading-none mb-0.5 flex items-center gap-1">
              <Flame className="w-2.5 h-2.5 text-orange-500" />
              AMSPHERE PRESENTS
            </span>
            <span className="font-black tracking-wider text-lg leading-tight text-white flex items-center gap-1">
              AETHERION<span className="text-red-500 font-mono text-sm tracking-normal">&apos;26</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-black/40 border border-red-500/20 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={getHref(link.href)}
              className="text-xs uppercase tracking-wider font-medium text-slate-300 hover:text-red-400 px-3.5 py-1.5 rounded-full hover:bg-red-500/10 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={GOOGLE_FORM_REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-xl p-[1px] font-bold text-xs transition-transform active:scale-95 shadow-[0_0_25px_rgba(230,0,26,0.35)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 rounded-xl animate-gradient opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-1.5 px-4 py-2 bg-[#0d0406] rounded-[11px] text-white transition-colors group-hover:bg-transparent">
              <span>REGISTER (₹150 FOR ALL)</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-black/70 border border-red-500/40 text-slate-200 hover:text-white active:scale-95 transition-all"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-[#060204] border-b-2 border-red-500/50 px-6 py-6 space-y-4 shadow-[0_25px_60px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={getHref(link.href)}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-white hover:text-red-400 py-3 border-b border-red-500/15 flex items-center justify-between transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs text-red-400 font-mono">→</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={GOOGLE_FORM_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white font-black text-sm py-3.5 rounded-xl shadow-[0_0_30px_rgba(230,0,26,0.6)] active:scale-95 transition-transform"
            >
              REGISTER FOR AETHERION&apos;26 (₹150)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
