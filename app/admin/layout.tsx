import { cookies } from 'next/headers';
import AdminSidebar from '@/components/admin/sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('admin_session')?.value === 'authenticated';

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#060203] text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#060203] text-white flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-8 overflow-auto">{children}</main>
    </div>
  );
}
