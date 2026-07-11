'use client'

import React, { useState } from 'react';
import { issueCertificate } from '@/actions/admin';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function IssueCertificateForm() {
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await issueCertificate(formData);
    
    if (res.success) {
      setStatus({ type: 'success', message: `Certificado emitido con éxito. Código de Validación: ${res.validationCode}` });
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus({ type: 'error', message: res.error || 'Error al emitir certificado' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-white tracking-tight">Nuevo Certificado de Soldador</h2>
      </div>
      <div className="p-6">
        {status && (
          <div className={`p-4 rounded-lg text-sm font-medium mb-6 flex items-center gap-2 ${status.type === 'success' ? 'bg-[#00D02C]/10 text-[#00D02C] border border-[#00D02C]/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {status.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">RUT del Soldador</label>
              <input name="rut" placeholder="12345678-9" required className="w-full bg-zinc-950 px-4 py-3 border border-zinc-800 rounded-lg outline-none focus:border-[#00D02C] focus:ring-1 focus:ring-[#00D02C] text-white transition-all placeholder:text-zinc-600" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">Nombre Completo</label>
              <input name="name" placeholder="Ej. Juan Pérez" required className="w-full bg-zinc-950 px-4 py-3 border border-zinc-800 rounded-lg outline-none focus:border-[#00D02C] focus:ring-1 focus:ring-[#00D02C] text-white transition-all placeholder:text-zinc-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">Empresa (Opcional)</label>
              <input name="company" placeholder="Ej. Constructora SPA" className="w-full bg-zinc-950 px-4 py-3 border border-zinc-800 rounded-lg outline-none focus:border-[#00D02C] focus:ring-1 focus:ring-[#00D02C] text-white transition-all placeholder:text-zinc-600" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">Correo Electrónico (Envío PDF)</label>
              <input name="email" type="email" placeholder="soldador@email.com" className="w-full bg-zinc-950 px-4 py-3 border border-zinc-800 rounded-lg outline-none focus:border-[#00D02C] focus:ring-1 focus:ring-[#00D02C] text-white transition-all placeholder:text-zinc-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">Proceso de Soldadura</label>
              <select name="process" required className="w-full bg-zinc-950 px-4 py-3 border border-zinc-800 rounded-lg outline-none focus:border-[#00D02C] focus:ring-1 focus:ring-[#00D02C] text-white transition-all appearance-none">
                <option value="SMAW">SMAW</option>
                <option value="GTAW">GTAW</option>
                <option value="GMAW">GMAW</option>
                <option value="FCAW">FCAW</option>
                <option value="SAW">SAW</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">Fecha de Emisión</label>
              <input name="issueDate" type="date" required className="w-full bg-zinc-950 px-4 py-3 border border-zinc-800 rounded-lg outline-none focus:border-[#00D02C] focus:ring-1 focus:ring-[#00D02C] text-white transition-all [&::-webkit-calendar-picker-indicator]:invert" />
              <p className="text-xs text-zinc-500 mt-2">La fecha de caducidad se calculará automáticamente a 1 año.</p>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={loading} className="bg-[#00D02C] text-zinc-950 font-black py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(0,208,44,0.3)] hover:shadow-[0_0_25px_rgba(0,208,44,0.5)] hover:scale-105 transition-all w-full md:w-auto disabled:opacity-50 disabled:pointer-events-none">
              {loading ? 'Procesando...' : 'Emitir Certificado Oficial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
