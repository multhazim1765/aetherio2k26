'use client';

import React from 'react';
import { Mail, MapPin, Phone, MessageSquare, Send, Globe, Flame } from 'lucide-react';
import { SYMPOSIUM_METADATA } from '@/lib/data/events';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-red-500/10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-4">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>HELP DESK & INQUIRIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Connect with <span className="text-gradient">AETHERION&apos;26</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Have queries about rules, registration pass fees, accommodation, or reporting times? Our coordinator desks are available.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-surface border border-border shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Symposium Helpdesk</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reach out directly to our student coordinators or faculty convenors for immediate event guidance.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-mono text-slate-400 font-bold">Presenter & Institution</h4>
                <p className="text-sm font-semibold text-white mt-0.5">AMSphere</p>
                <p className="text-xs text-slate-400 mt-0.5">{SYMPOSIUM_METADATA.venue}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-mono text-slate-400 font-bold">Official Communications</h4>
                <p className="text-sm font-semibold text-white mt-0.5">{SYMPOSIUM_METADATA.email}</p>
                <p className="text-xs text-slate-500 mt-0.5">Fast responses within 4 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border">
              <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-mono text-slate-400 font-bold">Registration Pass</h4>
                <p className="text-sm font-semibold text-white mt-0.5">{SYMPOSIUM_METADATA.pricingOffer}</p>
                <p className="text-xs text-slate-500 mt-0.5">Instant online confirmation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface border border-border">
          <h3 className="text-lg font-bold text-white mb-2">Send an Inquiry</h3>
          <p className="text-xs text-slate-400 mb-6">
            Leave a message below and our student liaison committee will get back to you promptly.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 rounded-xl bg-void border border-border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-void border border-border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-void border border-border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Topic / Event</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-void border border-border text-xs text-slate-300 focus:outline-none focus:border-red-500">
                  <option>General Inquiries</option>
                  <option>Payment & UTR Verification</option>
                  <option>Technical Events</option>
                  <option>E-Sports Tournament</option>
                  <option>Travel & Campus Navigation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Message</label>
              <textarea
                rows={4}
                placeholder="Type your message here..."
                className="w-full px-4 py-2.5 rounded-xl bg-void border border-border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(230,0,26,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>SEND MESSAGE</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
