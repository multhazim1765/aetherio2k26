'use client';

import { useEffect, useState } from 'react';
import { Calendar, Users, IndianRupee, Clock } from 'lucide-react';

interface Stats {
  totalEvents: number;
  totalRegistrations: number;
  totalRevenue: number;
  pendingPayments: number;
}

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total Events', value: stats?.totalEvents ?? 0, icon: Calendar, color: 'text-[#4f46e5]' },
    { label: 'Registrations', value: stats?.totalRegistrations ?? 0, icon: Users, color: 'text-[#10b981]' },
    { label: 'Revenue (₹)', value: stats?.totalRevenue ?? 0, icon: IndianRupee, color: 'text-[#f59e0b]' },
    { label: 'Pending Payments', value: stats?.pendingPayments ?? 0, icon: Clock, color: 'text-[#ef4444]' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <p className="text-3xl font-bold text-white">
              {loading ? '...' : card.value.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-[#9ca3af] mt-1">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}
