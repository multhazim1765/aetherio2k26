'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import BackButton from '@/components/ui/back-button';
import { CheckCircle, Clock, XCircle, ExternalLink } from 'lucide-react';

interface Registration {
  _id: string;
  registrationId: string;
  name: string;
  email: string;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  registeredAt: string;
  event: { title: string; date: string; slug: string } | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/register');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/admin/registrations?limit=50`)
        .then((res) => res.json())
        .then((data) => {
          const myRegs = data.registrations?.filter(
            (r: Registration) => r.email === session.user?.email
          );
          setRegistrations(myRegs || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#10b981]/10 text-[#34d399]">
            <CheckCircle className="w-3 h-3" /> Paid
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#ef4444]/10 text-[#f87171]">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#f59e0b]/10 text-[#fbbf24]">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <p className="text-[#9ca3af]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-6">
          <BackButton href="/" label="Back to Home" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-8">My Registrations</h1>

        {registrations.length === 0 ? (
          <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-12 text-center">
            <p className="text-[#9ca3af] text-lg mb-4">No registrations yet.</p>
            <a
              href="/#events"
              className="inline-block bg-[#4f46e5] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#4338ca] transition"
            >
              Browse Events
            </a>
          </div>
        ) : (
          <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-[#1e1e2e]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-[#9ca3af]">Event</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#9ca3af]">Reg ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#9ca3af]">Amount</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#9ca3af]">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#9ca3af]">Date</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#9ca3af]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e2e]">
                  {registrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-[#161620] transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white text-sm">
                          {reg.event?.title ?? 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-[#4f46e5]">
                        {reg.registrationId}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        ₹{reg.amount}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(reg.paymentStatus)}</td>
                      <td className="px-6 py-4 text-sm text-[#9ca3af]">
                        {new Date(reg.registeredAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {reg.paymentStatus === 'pending' && (
                            <button className="text-xs bg-[#4f46e5] text-white px-3 py-1.5 rounded-lg hover:bg-[#4338ca] transition">
                              Pay Now
                            </button>
                          )}
                          {reg.paymentStatus === 'completed' && reg.event?.slug && (
                            <a
                              href={`/events/${reg.event.slug}`}
                              className="text-xs text-[#9ca3af] hover:text-white transition flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" /> View
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
