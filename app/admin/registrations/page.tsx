import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RegistrationsTable from '@/components/admin/registrations-table';
import BackButton from '@/components/ui/back-button';

export default async function RegistrationsPage() {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('admin_session')?.value === 'authenticated';

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BackButton href="/admin" label="Back to Dashboard" />
        <a
          href="/api/admin/export"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 shadow-[0_0_15px_rgba(230,0,26,0.3)]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export CSV
        </a>
      </div>

      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white">All Form Registrations</h1>
        <p className="text-xs font-mono text-slate-400">
          Inspect filled participant details, department, phone number, and payment UTR transaction proof.
        </p>
      </div>

      <RegistrationsTable />
    </div>
  );
}
