'use client'

import React, { useState } from 'react';
import { loginAdmin } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);
    if (res.success) {
      router.push('/admin-panel');
    } else {
      setError(res.error || 'Error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="mb-10 flex justify-center">
         <Image src="/logo-ita.png" alt="ITA Limitada" width={200} height={50} style={{ width: '200px', height: 'auto' }} priority />
      </div>
      
      <div className="bg-zinc-900 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-800">
        <div className="flex justify-center mb-6">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <Lock size={32} className="text-[#00D02C]" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-white tracking-tight mb-8">Acceso Restringido</h1>
        
        {error && <p className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-lg text-sm font-medium mb-6 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Usuario</label>
            <input name="username" type="text" required className="w-full bg-zinc-950 px-4 py-3 border border-zinc-800 rounded-lg outline-none focus:border-[#00D02C] focus:ring-1 focus:ring-[#00D02C] text-white transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Contraseña</label>
            <input name="password" type="password" required className="w-full bg-zinc-950 px-4 py-3 border border-zinc-800 rounded-lg outline-none focus:border-[#00D02C] focus:ring-1 focus:ring-[#00D02C] text-white transition-all" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#00D02C] text-zinc-950 font-black py-4 px-4 rounded-lg shadow-[0_0_15px_rgba(0,208,44,0.3)] hover:shadow-[0_0_25px_rgba(0,208,44,0.5)] hover:scale-105 transition-all mt-4 disabled:opacity-50 disabled:pointer-events-none">
            {loading ? 'Verificando Identidad...' : 'Ingresar al Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
