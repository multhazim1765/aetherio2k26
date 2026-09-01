import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StatsCards from '@/components/admin/stats-cards';
import Link from 'next/link';
import { Shield, Users, Download, ExternalLink, Flame, CheckCircle } from 'lucide-react';
import { GOOGLE_FORM_REGISTRATION_URL, OFFICIAL_PAYMENT_INFO } from '@/lib/data/events';

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('admin_session')?.value === 'authenticated';

  if (!isAuthenticated) {
    redirect('/admin/login');
  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-2">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>OFFICIAL CONTROL CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            <span>AETHERION &apos;26 Admin Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Overview of delegate form submissions, UPI payments, and event coordinator metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={GOOGLE_FORM_REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-slate-200 transition-colors flex items-center gap-2"
          >
            <span>Google Form Link</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <Link
            href="/admin/registrations"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(230,0,26,0.35)] transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>View Submissions</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Quick Actions & System Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="p-6 rounded-2xl bg-[#0c0406] border border-red-500/30 space-y-4">
          <h3 className="text-sm font-mono uppercase font-bold text-red-400 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Quick Actions &amp; Export</span>
          </h3>
          <div className="space-y-3">
            <Link
              href="/admin/registrations"
              className="block p-4 rounded-xl bg-red-950/20 border border-red-500/30 hover:border-red-500/60 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-white group-hover:text-red-300 transition-colors">
                    Manage Participant Registrations &rarr;
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Inspect responses, UTR numbers, payment proofs &amp; status
                  </p>
                </div>
                <Users className="w-5 h-5 text-red-400 flex-shrink-0" />
              </div>
            </Link>

            <a
              href="/api/admin/export"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-white group-hover:text-slate-200 transition-colors">
                    Download CSV Registration Export &rarr;
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Export all attendee data to Excel / CSV format
                  </p>
                </div>
                <Download className="w-5 h-5 text-slate-400 flex-shrink-0" />
              </div>
            </a>
          </div>
        </div>

        {/* System & Official Payment Config */}
        <div className="p-6 rounded-2xl bg-[#0c0406] border border-red-500/30 space-y-4">
          <h3 className="text-sm font-mono uppercase font-bold text-amber-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Symposium Finance &amp; System Status</span>
          </h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-semibold">Official UPI ID</span>
              <span className="text-red-300 font-bold text-xs select-all">{OFFICIAL_PAYMENT_INFO.upiId}</span>
            </div>

            <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-semibold">Payee Account</span>
              <span className="text-white font-bold text-xs">{OFFICIAL_PAYMENT_INFO.payeeName} ({OFFICIAL_PAYMENT_INFO.accountInfo})</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <span className="text-slate-300 font-semibold">Live Google Form Status</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Connected &amp; Active</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
