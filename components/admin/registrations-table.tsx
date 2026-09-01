'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, ExternalLink, Search, RefreshCw } from 'lucide-react';

interface Registration {
  _id: string;
  registrationId: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department?: string;
  year?: string;
  utrNumber?: string;
  paymentScreenshot?: string;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  registeredAt: string;
  event: { title: string; date: string; venue: string } | null;
}

export default function RegistrationsTable() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = () => {
    setLoading(true);
    fetch(`/api/admin/registrations?page=${page}&limit=20`)
      .then((res) => res.json())
      .then((data) => {
        setRegistrations(data.registrations || []);
        setTotalPages(data.pagination?.pages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRegistrations();
  }, [page]);

  const filteredRegistrations = registrations.filter((reg) => {
    const q = search.toLowerCase();
    return (
      reg.name?.toLowerCase().includes(q) ||
      reg.email?.toLowerCase().includes(q) ||
      reg.phone?.includes(q) ||
      reg.college?.toLowerCase().includes(q) ||
      reg.registrationId?.toLowerCase().includes(q) ||
      reg.utrNumber?.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
            <CheckCircle className="w-3 h-3" /> Verified
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-mono font-bold">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
            <Clock className="w-3 h-3 animate-pulse" /> Pending Proof
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0c0406] border border-red-500/30 rounded-2xl p-12 text-center space-y-3">
        <RefreshCw className="w-6 h-6 animate-spin text-red-500 mx-auto" />
        <p className="text-xs font-mono text-slate-400">Loading participant submissions...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0c0406] border border-red-500/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(230,0,26,0.15)]">
      {/* Table Header & Search Bar */}
      <div className="p-4 border-b border-red-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, UTR..."
            className="w-full pl-9 pr-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <button
          onClick={fetchRegistrations}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors text-xs font-mono flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono">
          <thead className="bg-black/60 border-b border-red-500/20 text-[11px] uppercase tracking-wider text-red-400">
            <tr>
              <th className="px-5 py-3.5 font-bold">Reg ID</th>
              <th className="px-5 py-3.5 font-bold">Participant Name &amp; Contact</th>
              <th className="px-5 py-3.5 font-bold">College / Dept</th>
              <th className="px-5 py-3.5 font-bold">Event Pass</th>
              <th className="px-5 py-3.5 font-bold">UTR / Trans ID</th>
              <th className="px-5 py-3.5 font-bold">Status</th>
              <th className="px-5 py-3.5 font-bold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((reg) => (
                <tr key={reg._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 font-bold text-red-300 select-all">{reg.registrationId}</td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-white text-sm">{reg.name}</div>
                    <div className="text-[11px] text-slate-400">{reg.email}</div>
                    <a href={`tel:${reg.phone}`} className="text-[11px] text-amber-400 font-semibold hover:underline">
                      📞 {reg.phone}
                    </a>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-slate-200 font-semibold">{reg.college}</div>
                    {reg.department && <div className="text-[10px] text-slate-400">{reg.department} {reg.year ? `(${reg.year})` : ''}</div>}
                  </td>
                  <td className="px-5 py-4 font-semibold text-white">
                    <div>{reg.event?.title ?? 'All Events Pass'}</div>
                    <span className="text-[10px] text-amber-400 font-bold">₹{reg.amount}</span>
                  </td>
                  <td className="px-5 py-4 select-all text-xs font-bold text-slate-200">
                    {reg.utrNumber ? (
                      <span className="bg-black/60 px-2.5 py-1 rounded-lg border border-red-500/30 text-red-300">
                        {reg.utrNumber}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">No UTR Submitted</span>
                    )}
                    {reg.paymentScreenshot && (
                      <a
                        href={reg.paymentScreenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[10px] text-cyan-400 hover:underline mt-1 flex items-center gap-1"
                      >
                        <span>View Proof</span> <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                  <td className="px-5 py-4">{getStatusBadge(reg.paymentStatus)}</td>
                  <td className="px-5 py-4 text-slate-400 text-[11px]">
                    {new Date(reg.registeredAt).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-xs">
                  No form submissions or filled registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-red-500/20 bg-black/60 text-xs font-mono text-slate-400">
        <span>Page {page} of {totalPages}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
