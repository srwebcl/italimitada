import React from 'react';
import { prisma } from '@/lib/db';
import { FileBadge2, CheckCircle2, XCircle, FilePlus2, Files } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const totalCertificates = await prisma.certificate.count();
  const activeCertificates = await prisma.certificate.count({
    where: { status: 'VIGENTE' }
  });
  const expiredCertificates = await prisma.certificate.count({
    where: { status: 'EXPIRADO' }
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Resumen General</h1>
        <p className="text-zinc-400">Panel de control de certificaciones de ITA Limitada.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-zinc-800 rounded-lg text-white">
             <FileBadge2 size={24} />
           </div>
           <div>
             <p className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Total Emitidos</p>
             <p className="text-3xl font-black text-white">{totalCertificates}</p>
           </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-[#00D02C]/10 rounded-lg text-[#00D02C]">
             <CheckCircle2 size={24} />
           </div>
           <div>
             <p className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Vigentes</p>
             <p className="text-3xl font-black text-white">{activeCertificates}</p>
           </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
             <XCircle size={24} />
           </div>
           <div>
             <p className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Vencidos</p>
             <p className="text-3xl font-black text-white">{expiredCertificates}</p>
           </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Link href="/admin-panel/emitir" className="bg-zinc-900 border border-zinc-800 hover:border-[#00D02C]/50 rounded-xl p-6 flex items-center gap-4 group transition-all">
             <div className="p-4 bg-[#00D02C]/10 rounded-xl text-[#00D02C] group-hover:scale-110 transition-transform">
               <FilePlus2 size={28} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-white group-hover:text-[#00D02C] transition-colors">Nuevo Certificado</h3>
               <p className="text-sm text-zinc-400">Ingresar los datos de un soldador para emitir un nuevo documento.</p>
             </div>
           </Link>
           <Link href="/admin-panel/certificados" className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-6 flex items-center gap-4 group transition-all">
             <div className="p-4 bg-zinc-800 rounded-xl text-zinc-300 group-hover:scale-110 transition-transform">
               <Files size={28} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-white group-hover:text-zinc-300 transition-colors">Ver Historial</h3>
               <p className="text-sm text-zinc-400">Buscar, revisar y descargar PDFs de los certificados ya emitidos.</p>
             </div>
           </Link>
        </div>
      </div>
    </div>
  );
}
