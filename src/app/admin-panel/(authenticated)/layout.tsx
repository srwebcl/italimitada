import React from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex text-zinc-300 font-sans">
      <AdminSidebar />
      
      {/* Mobile Topbar */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-zinc-950">
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center text-white">
           <span className="font-black tracking-tight">ITA <span className="text-[#00D02C]">Admin</span></span>
           <Link href="/" className="text-xs font-medium text-zinc-400 hover:text-white">Volver</Link>
        </div>
        
        <div className="p-4 md:p-8 lg:p-12 flex-1">
           {children}
        </div>
      </main>
    </div>
  );
}
