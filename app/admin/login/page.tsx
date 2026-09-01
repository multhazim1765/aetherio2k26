'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, Flame, KeyRound, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060203] text-white flex flex-col justify-center items-center px-4 relative selection:bg-red-600/40">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Badge Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-red-500/30 text-xs font-mono text-red-300">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>AETHERION &apos;26 CONTROL TERMINAL</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            <span>Admin Portal Login</span>
          </h1>
          <p className="text-xs text-slate-400">
            Authorized symposium organizers login to manage registrations &amp; responses.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-6 sm:p-8 rounded-2xl bg-[#0d0406] border border-red-500/30 shadow-[0_0_35px_rgba(230,0,26,0.2)] space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              Admin Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aetherion.org"
                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              Secret Security Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(230,0,26,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center">
          <Link href="/" className="text-xs font-mono text-slate-400 hover:text-red-400 transition-colors">
            ← Return to AETHERION &apos;26 Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
