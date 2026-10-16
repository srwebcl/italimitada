import React from 'react';
import { prisma } from '@/lib/db';
import { Download, Eye } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CertificadosList() {
  const allCertificates = await prisma.certificate.findMany({
    orderBy: { createdAt: 'desc' },
    include: { welder: true }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Historial de Certificados</h1>
        <p className="text-zinc-400">Listado completo de todos los certificados emitidos en la plataforma.</p>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
          <input 
            type="text" 
            placeholder="Buscar por RUT, Nombre o Código..." 
            className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-4 py-2 w-full max-w-sm focus:border-[#00D02C] outline-none"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950 text-xs uppercase font-semibold text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Código Validación</th>
                <th className="px-6 py-4">RUT</th>
                <th className="px-6 py-4">Nombre Soldador</th>
                <th className="px-6 py-4">Tipo Calificación</th>
                <th className="px-6 py-4">Emisión</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {allCertificates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-zinc-500">
                    No se encontraron certificados.
                  </td>
                </tr>
              ) : (
                allCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-white">{cert.validationCode}</td>
                    <td className="px-6 py-4">{cert.welder.rut}</td>
                    <td className="px-6 py-4 font-medium text-white">{cert.welder.fullName}</td>
                    <td className="px-6 py-4">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <span className="bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-xs font-semibold">{(cert as any).qualificationType}</span>
                    </td>
                    <td className="px-6 py-4">{cert.issueDate.toLocaleDateString('es-CL', { timeZone: 'UTC' })}</td>
                    <td className="px-6 py-4">
                      {cert.status === 'VIGENTE' ? (
                        <span className="bg-green-500/10 text-[#00D02C] border border-[#00D02C]/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide">VIGENTE</span>
                      ) : (
                        <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide">{cert.status}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/api/pdf/${cert.validationCode}`} target="_blank" className="p-2 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700 rounded-lg transition-colors" title="Ver Certificado">
                          <Eye size={16} />
                        </Link>
                        <Link href={`/api/pdf/${cert.validationCode}?download=true`} target="_blank" className="p-2 text-[#00D02C] hover:text-white bg-[#00D02C]/10 hover:bg-[#00D02C] rounded-lg transition-colors" title="Descargar PDF">
                          <Download size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
