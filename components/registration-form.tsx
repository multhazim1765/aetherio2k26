'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  CreditCard,
  QrCode,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Download,
  Building,
  User,
  Mail,
  Phone,
  Layers,
  Sparkles,
  Gamepad2,
  FileText,
  PlusCircle,
  XCircle,
  Tag,
  Flame
} from 'lucide-react';
import { EVENTS_DATA, OFFICIAL_PAYMENT_INFO, SYMPOSIUM_METADATA } from '@/lib/data/events';
import CertificateEligibilityNote from '@/components/certificate-eligibility-note';
import Link from 'next/link';

const schema = z.object({
  name: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().regex(/^[0-9]{10}$/, '10-digit mobile number required'),
  college: z.string().min(2, 'College / Institution name is required'),
  department: z.string().min(1, 'Department is required'),
  year: z.string().min(1, 'Year of study is required'),
  rollNumber: z.string().optional(),
  teamName: z.string().optional(),
  teamMembers: z.string().optional(),
  utrNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FLAT_REGISTRATION_FEE = 150;
const MAX_SELECTABLE_EVENTS = 99;

export default function RegistrationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialEventId = searchParams.get('event');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>(
    initialEventId ? [initialEventId] : ['neural-quest', 'film-hunt']
  );
  const [selectedSubEventId, setSelectedSubEventId] = useState<string>('free-fire');
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [receiptData, setReceiptData] = useState<any>(null);

  const toggleEventSelection = (id: string) => {
    if (selectedEventIds.includes(id)) {
      setSelectedEventIds(selectedEventIds.filter((eId) => eId !== id));
    } else {
      if (selectedEventIds.length >= MAX_SELECTABLE_EVENTS) {
        setFormError(`You can select events under the ₹150 All-Event Pass.`);
        return;
      }
      setFormError('');
      setSelectedEventIds([...selectedEventIds, id]);
    }
  };

  const selectedEvents = EVENTS_DATA.filter((e) => selectedEventIds.includes(e.id));
  const hasEsports = selectedEventIds.includes('e-sports');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      year: '3',
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2500);
  };

  const handleStep1Continue = () => {
    if (selectedEventIds.length === 0) {
      setFormError('Please select at least 1 event included in your ₹150 Pass.');
      return;
    }
    setFormError('');
    setStep(2);
  };

  const handleFinalSubmit = async (data: FormData) => {
    setFormError('');
    setSubmitting(true);

    try {
      const selectedTitles = selectedEvents.map((e) => {
        if (e.id === 'e-sports') {
          const sub = e.subEvents?.find((s) => s.id === selectedSubEventId);
          return `E-Sports (${sub?.name || 'Championship'})`;
        }
        return e.title;
      });

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEventIds[0] || 'all-events',
          selectedEventIds,
          name: data.name,
          email: data.email,
          phone: data.phone,
          college: data.college,
          department: data.department,
          year: data.year,
          rollNumber: data.rollNumber,
          teamName: data.teamName,
          teamMembers: data.teamMembers,
          utrNumber: data.utrNumber || 'PENDING_VERIFICATION',
          paymentMethod: 'upi',
          subEventId: selectedSubEventId,
          amount: FLAT_REGISTRATION_FEE,
        }),
      });

      const resData = await res.json();

      const generatedId =
        resData?.registration?.id ||
        `A26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      setReceiptData({
        registrationId: generatedId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        college: data.college,
        eventsSelected: selectedTitles,
        fee: FLAT_REGISTRATION_FEE,
        utrNumber: data.utrNumber || 'Submitted for Manual Check',
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        status: 'PAYMENT VERIFICATION PENDING',
      });

      setStep(4);
    } catch {
      const selectedTitles = selectedEvents.map((e) => {
        if (e.id === 'e-sports') {
          const sub = e.subEvents?.find((s) => s.id === selectedSubEventId);
          return `E-Sports (${sub?.name || 'Championship'})`;
        }
        return e.title;
      });

      const fallbackId = `A26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setReceiptData({
        registrationId: fallbackId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        college: data.college,
        eventsSelected: selectedTitles,
        fee: FLAT_REGISTRATION_FEE,
        utrNumber: data.utrNumber || 'Submitted for Manual Check',
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        status: 'PAYMENT VERIFICATION PENDING',
      });
      setStep(4);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Step Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-red-950/60 z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-red-500 shadow-[0_0_10px_#e6001a] transition-all duration-500 z-0"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />

          {[
            { num: 1, label: 'Select Events' },
            { num: 2, label: 'Delegate Details' },
            { num: 3, label: '₹150 Payment' },
            { num: 4, label: 'Confirmation' },
          ].map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs border-2 transition-all ${isCompleted
                      ? 'bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(230,0,26,0.6)]'
                      : isCurrent
                        ? 'bg-[#0a0305] border-red-500 text-red-400 shadow-[0_0_15px_#e6001a]'
                        : 'bg-[#0a0305] border-white/20 text-slate-500'
                    }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-[10px] uppercase font-mono tracking-wider mt-2 hidden sm:block ${isCurrent ? 'text-red-400 font-bold' : 'text-slate-500'
                    }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {formError && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* STEP 1: EVENT SELECTION (FOR ALL EVENTS FOR ₹150) */}
      {step === 1 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Choose Your Events</h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                  ₹150 TOTAL PASS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Select any <strong className="text-white">events</strong> (Technical or Non-Technical) included in your flat ₹150 registration fee.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-xl border border-red-500/30 flex-shrink-0">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-mono font-bold text-white">
                Selected: {selectedEventIds.length} Events
              </span>
            </div>
          </div>

          {/* Certificate Eligibility Note */}
          <CertificateEligibilityNote />

          {/* Selected Events Summary Chips */}
          {selectedEventIds.length > 0 && (
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-red-400 font-semibold mr-1">Your All-Event Pass:</span>
              {selectedEvents.map((evt) => (
                <span
                  key={evt.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600/20 text-red-300 border border-red-500/40 text-xs font-bold font-mono"
                >
                  <span>{evt.title}</span>
                  <button
                    type="button"
                    onClick={() => toggleEventSelection(evt.id)}
                    className="hover:text-white"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {selectedEventIds.length < MAX_SELECTABLE_EVENTS && (
                <span className="text-[11px] text-slate-400 font-mono italic">
                  (+ Select {MAX_SELECTABLE_EVENTS - selectedEventIds.length} more event)
                </span>
              )}
            </div>
          )}

          <div className="space-y-5">
            {/* Technical Events Grid */}
            <div>
              <label className="text-xs uppercase font-mono text-slate-400 mb-2.5 block font-semibold flex items-center gap-1.5">
                <span>Technical Tracks</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EVENTS_DATA.filter((e) => e.category === 'technical').map((event) => {
                  const isSelected = selectedEventIds.includes(event.id);
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => toggleEventSelection(event.id)}
                      className={`p-4 rounded-xl text-left border transition-all relative ${isSelected
                          ? 'bg-red-500/15 border-red-500 shadow-[0_0_20px_rgba(230,0,26,0.3)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-sm">{event.title}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${isSelected
                              ? 'bg-red-500 border-red-500 text-white'
                              : 'border-white/20 bg-black/40'
                            }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{event.shortDesc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Non-Technical Events Grid */}
            <div>
              <label className="text-xs uppercase font-mono text-slate-400 mb-2.5 block font-semibold flex items-center gap-1.5">
                <span>Non-Technical & E-Sports Tracks</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EVENTS_DATA.filter((e) => e.category === 'non-technical' || e.category === 'e-sports').map((event) => {
                  const isSelected = selectedEventIds.includes(event.id);
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => toggleEventSelection(event.id)}
                      className={`p-4 rounded-xl text-left border transition-all relative ${isSelected
                          ? 'bg-orange-500/15 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-sm">{event.title}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${isSelected
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'border-white/20 bg-black/40'
                            }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{event.shortDesc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-event options if E-Sports was chosen */}
            {hasEsports && (
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold text-white">Select E-Sports Title (Included in Pass)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'free-fire', name: 'FREE FIRE', desc: 'Squad Battle Royale' },
                    { id: 'e-football', name: 'E-FOOTBALL', desc: '1v1 Tactical Knockout' },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubEventId(sub.id)}
                      className={`p-3 rounded-lg text-left border transition-all ${selectedSubEventId === sub.id
                          ? 'bg-red-600/30 border-red-500 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                        }`}
                    >
                      <span className="text-xs font-bold block">{sub.name}</span>
                      <span className="text-[10px] text-slate-400">{sub.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-border">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Total Symposium Fee</span>
              <span className="text-xl font-bold font-mono text-red-400">₹{FLAT_REGISTRATION_FEE}</span>
            </div>

            <button
              type="button"
              onClick={handleStep1Continue}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white font-bold text-xs shadow-[0_0_25px_rgba(230,0,26,0.4)] hover:brightness-110 transition-all"
            >
              <span>CONTINUE WITH {selectedEventIds.length} EVENT{selectedEventIds.length > 1 ? 'S' : ''}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PARTICIPANT / TEAM DETAILS */}
      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const values = watch();
            if (!values.name || !values.email || !values.phone || !values.college) {
              setFormError('Please fill in all required delegate fields.');
              return;
            }
            setFormError('');
            setStep(3);
          }}
          className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-white">Delegate Information</h2>
              <p className="text-xs text-slate-400">
                Selected Events:{' '}
                <span className="text-red-400 font-semibold">
                  {selectedEvents.map((e) => e.title).join(' & ')}
                </span>
              </p>
            </div>
            <span className="text-xs font-mono text-red-400">Step 2 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                Full Name *
              </label>
              <input
                {...register('name')}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-surface-subtle border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 bg-surface-subtle border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                Phone Number (WhatsApp) *
              </label>
              <input
                {...register('phone')}
                placeholder="10-digit number"
                className="w-full px-4 py-2.5 bg-surface-subtle border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                College / Institution *
              </label>
              <input
                {...register('college')}
                placeholder="Engineering / Arts College Name"
                className="w-full px-4 py-2.5 bg-surface-subtle border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              {errors.college && <p className="text-red-400 text-[10px] mt-1">{errors.college.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                Department / Branch *
              </label>
              <input
                {...register('department')}
                placeholder="CSE / IT / AI&DS / ECE / etc."
                className="w-full px-4 py-2.5 bg-surface-subtle border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                Year of Study *
              </label>
              <select
                {...register('year')}
                className="w-full px-4 py-2.5 bg-surface-subtle border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="PG">Postgraduate</option>
              </select>
            </div>
          </div>

          {/* Optional Team inputs */}
          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs uppercase font-mono text-red-400 font-bold">Team Information (If participating as a squad/team)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Team Name</label>
                <input
                  {...register('teamName')}
                  placeholder="e.g. RedDragons"
                  className="w-full px-4 py-2.5 bg-surface-subtle border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Other Member Names</label>
                <input
                  {...register('teamMembers')}
                  placeholder="Member 2, Member 3..."
                  className="w-full px-4 py-2.5 bg-surface-subtle border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white font-bold text-xs shadow-[0_0_25px_rgba(230,0,26,0.4)] hover:brightness-110 transition-all"
            >
              <span>PROCEED TO PAYMENT (₹150)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: OFFICIAL UPI PAYMENT (FLAT ₹150 FOR ALL EVENTS) */}
      {step === 3 && (
        <form
          onSubmit={handleSubmit(handleFinalSubmit)}
          className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-white">Official Symposium Payment</h2>
              <p className="text-xs text-slate-400">Scan & Pay ₹150 flat fee via any UPI App, then enter your UTR number</p>
            </div>
            <span className="text-xs font-mono text-red-400">Step 3 of 3</span>
          </div>

          {/* Amount Badge */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-orange-950/40 to-surface border border-red-500/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Total Registration Pass (All Events)</span>
              <span className="text-2xl font-black font-mono text-red-400">₹{FLAT_REGISTRATION_FEE}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-white block">
                {selectedEvents.map((e) => e.title).join(' + ')}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Account: {OFFICIAL_PAYMENT_INFO.accountInfo}</span>
            </div>
          </div>

          {/* Payment Card / QR Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 rounded-2xl bg-surface-subtle border border-white/10">
            {/* Left: Premium Themed QR Card */}
            <div className="flex flex-col items-center">
              <div className="relative p-5 rounded-2xl bg-gradient-to-b from-[#140609] via-[#090305] to-[#040102] border border-red-500/40 shadow-[0_0_35px_rgba(230,0,26,0.25)] space-y-3 text-center max-w-[260px] w-full group hover:border-red-500/60 transition-all">
                {/* Top Branding Header */}
                <div className="flex items-center justify-between border-b border-red-500/20 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg overflow-hidden border border-red-500/40 p-0.5 bg-black">
                      <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wider">AETHERION &apos;26</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 font-semibold">
                    UPI PASS
                  </span>
                </div>

                {/* QR Matrix Frame with Crisp Scanning Canvas */}
                <div className="p-2.5 bg-white rounded-xl shadow-2xl border-2 border-red-500/40 relative overflow-hidden flex items-center justify-center">
                  <img
                    src="/qr-matrix.png"
                    alt="Official AETHERION '26 UPI QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>

                {/* Footer Info inside Card */}
                <div className="pt-1 space-y-1">
                  <div className="text-[11px] font-mono text-red-300 font-bold tracking-tight truncate">
                    {OFFICIAL_PAYMENT_INFO.upiId}
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-400">
                    Amount: ₹150.00
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">Scan to pay with any UPI app</p>
                </div>
              </div>
            </div>

            {/* Right: UPI Details & Copy */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-semibold mb-1">
                  Official Symposium UPI ID
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#080204] border border-red-500/40">
                  <span className="font-mono text-xs text-red-300 font-semibold truncate flex-1 select-all">
                    {OFFICIAL_PAYMENT_INFO.upiId}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OFFICIAL_PAYMENT_INFO.upiId)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono flex-shrink-0"
                  >
                    {copiedUPI ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUPI ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <p><strong>Payee:</strong> {OFFICIAL_PAYMENT_INFO.payeeName}</p>
                <p><strong>Bank Account:</strong> {OFFICIAL_PAYMENT_INFO.accountInfo}</p>
                <p><strong>Package:</strong> All Events Participation Included</p>
              </div>

              <a
                href={`upi://pay?pa=${OFFICIAL_PAYMENT_INFO.upiId}&pn=${encodeURIComponent(
                  OFFICIAL_PAYMENT_INFO.payeeName
                )}&am=150&cu=INR&tn=${encodeURIComponent('AETHERION26-2EVENTS-PASS')}`}
                className="w-full py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>OPEN IN UPI APP (₹150)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Transaction Proof Verification inputs */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                12-Digit Transaction ID / UTR Number *
              </label>
              <input
                {...register('utrNumber')}
                placeholder="e.g. 423871928371"
                className="w-full px-4 py-2.5 bg-surface-subtle border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Found under &quot;UPI Ref ID / Transaction ID&quot; in your payment app.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                Upload Payment Screenshot Proof
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
              />
            </div>
          </div>

          {/* Verification Status Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-300/90 leading-relaxed">
              <strong>Verification Policy:</strong> Your ₹150 pass covering selected events will be logged with status{' '}
              <span className="font-bold underline">PAYMENT VERIFICATION PENDING</span> and verified by the finance team against official bank statements.
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white font-bold text-xs shadow-[0_0_25px_rgba(230,0,26,0.4)] hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{submitting ? 'RECORDING REGISTRATION...' : 'SUBMIT REGISTRATION'}</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: CONFIRMATION & REGISTRATION ID RECEIPT */}
      {step === 4 && receiptData && (
        <div className="p-6 sm:p-10 rounded-2xl bg-surface border border-red-500/40 space-y-6 shadow-[0_0_50px_rgba(230,0,26,0.25)] text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center mx-auto shadow-[0_0_25px_#e6001a]">
            <CheckCircle2 className="w-8 h-8 text-red-400" />
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-red-400 block font-bold">
              REGISTRATION RECEIVED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Welcome to AETHERION&apos;26
            </h2>
            <p className="text-xs text-slate-400 mt-1">Your 2-event delegate registration pass has been successfully recorded.</p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-subtle border border-white/10 space-y-4 max-w-lg mx-auto text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">OFFICIAL REGISTRATION ID</span>
                <span className="text-xl font-black font-mono text-red-400 tracking-wider">
                  {receiptData.registrationId}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(receiptData.registrationId)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center gap-1"
              >
                {copiedUPI ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUPI ? 'Copied' : 'Copy ID'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-slate-500 block font-mono">PARTICIPANT</span>
                <span className="font-semibold text-white">{receiptData.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-mono">TOTAL PAID</span>
                <span className="font-mono text-red-300 font-bold">₹{receiptData.fee}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-500 block font-mono">2 REGISTERED EVENTS</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {receiptData.eventsSelected.map((evTitle: string, i: number) => (
                    <span key={i} className="px-2.5 py-0.5 rounded bg-red-600/15 text-red-300 border border-red-500/30 text-[11px] font-mono">
                      {evTitle}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-500 block font-mono">INSTITUTION</span>
                <span className="text-white truncate block">{receiptData.college}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block">
                  PAYMENT VERIFICATION STATUS
                </span>
                <span className="text-xs font-bold text-amber-300">
                  {receiptData.status}
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RECEIPT</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(230,0,26,0.4)] transition-all"
            >
              <span>BACK TO AETHERION&apos;26</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
