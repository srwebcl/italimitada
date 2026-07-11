'use client'

import React, { useState, Suspense } from 'react';
import { validateCertificate } from '@/actions/validation';
import { initWebpayTransaction } from '@/actions/webpay';
import { ShieldCheck, Search, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function CertificadosContent() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get('success');
  const paymentError = searchParams.get('error');
  const codeParam = searchParams.get('code');

  const executeValidation = async (validationCode: string) => {
    if (!validationCode) return;
    setLoading(true);
    setError('');
    setResult(null);
    
    const res = await validateCertificate(validationCode);
    if (res.success) {
      setResult(res.certificate);
    } else {
      setError(res.error || 'Error al validar. Verifique el código e intente nuevamente.');
    }
    
    setLoading(false);
  };

  React.useEffect(() => {
    if (codeParam) {
      setCode(codeParam);
      executeValidation(codeParam);
    }
  }, [codeParam]);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    executeValidation(code);
  };

  const handleRecovery = async () => {
    if (!result) return;
    try {
      const res = await initWebpayTransaction(result.code);
      if (res.success && res.url && res.token) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = res.url;
        
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'token_ws';
        tokenInput.value = res.token;
        
        form.appendChild(tokenInput);
        document.body.appendChild(form);
        form.submit();
      } else {
        alert(res.error || 'Error al conectar con Transbank');
      }
    } catch (e) {
      alert('Error de conexión');
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl relative z-10 pt-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-zinc-900/50 border border-zinc-800 rounded-full mx-auto mb-6 text-[#00D02C] shadow-sm relative z-10 gap-3 backdrop-blur-sm">
          <ShieldCheck size={20} />
          <span className="font-semibold tracking-[0.2em] uppercase text-[10px] text-zinc-300 pr-2">Acceso Restringido - RRHH</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 relative z-10">
          Base de Datos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D02C] to-emerald-600">Nacional</span>
        </h1>
        <p className="text-zinc-400 leading-relaxed max-w-xl mx-auto relative z-10 text-base md:text-lg">
          Herramienta de verificación en tiempo real para reclutadores y auditores de calidad. Consulte la autenticidad y vigencia de las calificaciones técnicas.
        </p>
      </div>

      {/* Search Engine */}
      <div className="bg-zinc-900/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-2xl border border-white/5 text-center mb-10 relative overflow-hidden ring-1 ring-white/5">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00D02C]/50 to-transparent"></div>
        
        <form onSubmit={handleValidate} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto relative z-10">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="text-zinc-500" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="CÓDIGO DE VALIDACIÓN" 
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full pl-14 pr-6 py-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl outline-none focus:ring-1 focus:ring-[#00D02C] focus:border-[#00D02C] uppercase font-mono font-bold tracking-[0.25em] text-white transition-all shadow-inner placeholder:text-zinc-700 text-sm md:text-base" 
            />
          </div>
          <button type="submit" disabled={loading} className="bg-white hover:bg-zinc-200 text-zinc-950 font-black py-5 px-10 rounded-2xl transition-all shadow-lg flex justify-center items-center gap-2 shrink-0 disabled:opacity-50 text-sm tracking-wide uppercase">
            {loading ? 'Consultando...' : 'Verificar'}
          </button>
        </form>
        {error && <p className="text-red-400 mt-6 font-medium text-sm tracking-wide">{error}</p>}
      </div>

      {/* Results */}
      {result && (
        <div className={`p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-700 ${result.status === 'VIGENTE' ? 'bg-zinc-900/60 border border-[#00D02C]/20' : 'bg-red-950/20 border border-red-500/20'}`}>
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at top right, white, transparent 40%)' }}></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pb-8 border-b border-white/5 gap-4 relative z-10">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">Inspección Técnica Autorizada</h2>
              <p className="text-zinc-500 text-sm font-mono tracking-widest uppercase">ID: {result.code}</p>
            </div>
            <div className={`px-6 py-2.5 rounded-full font-black tracking-[0.2em] text-xs flex items-center gap-2 border ${result.status === 'VIGENTE' ? 'bg-[#00D02C]/10 text-[#00D02C] border-[#00D02C]/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${result.status === 'VIGENTE' ? 'bg-[#00D02C]' : 'bg-red-500'}`}></div>
              {result.status}
            </div>
          </div>
          
          <div className="space-y-3 mb-12 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-zinc-950/40 border border-white/5">
              <span className="text-zinc-500 font-medium text-sm mb-1 sm:mb-0 uppercase tracking-widest">Titular Calificado</span>
              <span className="text-white font-bold text-lg">{result.welderName}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-zinc-950/40 border border-white/5">
              <span className="text-zinc-500 font-medium text-sm mb-1 sm:mb-0 uppercase tracking-widest">Documento de Identidad</span>
              <span className="text-zinc-300 font-mono tracking-widest">{result.welderRut}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-zinc-950/40 border border-white/5">
              <span className="text-zinc-500 font-medium text-sm mb-1 sm:mb-0 uppercase tracking-widest">Proceso Acreditado</span>
              <span className="text-zinc-300">{result.process}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex flex-col items-center text-center">
                 <span className="text-zinc-500 font-medium mb-2 text-[10px] tracking-[0.2em] uppercase">Fecha Emisión</span>
                 <span className="text-white font-bold font-mono">{new Date(result.issueDate).toLocaleDateString('es-CL')}</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex flex-col items-center text-center">
                 <span className="text-zinc-500 font-medium mb-2 text-[10px] tracking-[0.2em] uppercase">Válido Hasta</span>
                 <span className="text-white font-bold font-mono">{new Date(result.expiryDate).toLocaleDateString('es-CL')}</span>
              </div>
            </div>
          </div>

          {result.status === 'VIGENTE' && (
            <div className="bg-zinc-950/80 p-8 rounded-3xl border border-white/5 text-center relative z-10 flex flex-col items-center">
              <FileText size={24} className="text-[#00D02C] mb-4" />
              <h3 className="font-bold text-white mb-2 text-base tracking-wide">Recuperación de Certificado Físico</h3>
              <p className="text-zinc-500 mb-8 leading-relaxed text-sm max-w-sm mx-auto">
                Puede solicitar una copia digital encriptada (PDF) del certificado original mediante Webpay Plus. Arancel único de reemisión: $12.000 CLP.
              </p>
              <button onClick={handleRecovery} className="w-full sm:w-auto bg-[#00D02C] hover:bg-[#00b326] text-zinc-950 font-black py-4 px-10 rounded-2xl transition-all shadow-lg hover:scale-105 flex justify-center items-center gap-2 text-sm uppercase tracking-wider">
                Proceder al Pago
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CertificadosPage() {
  return (
    <main className="min-h-screen bg-zinc-950 py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00d02c 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center top' }}></div>
      <Suspense fallback={<div className="container mx-auto px-4 max-w-2xl text-center text-zinc-500 font-bold tracking-widest py-12 animate-pulse">ESTABLECIENDO CONEXIÓN SEGURA...</div>}>
        <CertificadosContent />
      </Suspense>
    </main>
  );
}
