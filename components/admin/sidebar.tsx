'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Flame, LogOut, ArrowLeft } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
  { href: '/admin/registrations', label: 'Form Submissions', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Ignore error
    }
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-full md:w-64 bg-[#0c0406] border-b md:border-b-0 md:border-r border-red-500/20 min-h-0 md:min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-red-500/20 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-white text-base tracking-wider">
              AETHERION <span className="text-red-500 font-mono text-xs">ADMIN</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs font-mono text-slate-400 hover:text-red-400 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Site</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  isActive
                    ? 'bg-red-600/20 text-red-400 border border-red-500/40 shadow-[0_0_15px_rgba(230,0,26,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-red-500/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/40 text-red-300 text-xs font-mono font-bold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
