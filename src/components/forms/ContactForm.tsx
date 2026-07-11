'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitLead } from '@/actions/leads';
import { Department } from '@prisma/client';

const contactSchema = z.object({
  name: z.string().min(2, 'Obligatorio'),
  email: z.string().email('Inválido'),
  phone: z.string().regex(/^\+?[0-9\s-]{8,15}$/, 'Inválido'),
  department: z.nativeEnum(Department),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      department: 'NDT'
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await submitLead(data);
      if (result.success) {
        setStatus({ type: 'success', message: 'Solicitud enviada correctamente.' });
        reset();
      } else {
        setStatus({ type: 'error', message: result.error || 'Error al enviar.' });
      }
    } catch (e) {
      setStatus({ type: 'error', message: 'Error de conexión.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-zinc-900/60 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 text-zinc-300">
      <div className="mb-5 border-b border-zinc-800 pb-4">
         <h3 className="text-lg font-bold text-white tracking-tight">Solicitar Asesoría o Inspección</h3>
      </div>
      
      {status && (
        <div className={`p-3 mb-4 rounded-lg text-xs font-medium border ${status.type === 'success' ? 'bg-[#00D02C]/10 text-[#00D02C] border-[#00D02C]/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
          {status.message}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Nombre</label>
            <input {...register('name')} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:ring-1 focus:ring-[#00D02C] outline-none transition-all text-sm text-white placeholder-zinc-700" placeholder="Ej. Juan Pérez" />
            {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Teléfono</label>
            <input {...register('phone')} placeholder="+56 9" className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:ring-1 focus:ring-[#00D02C] outline-none transition-all text-sm text-white placeholder-zinc-700" />
            {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Correo Electrónico</label>
          <input {...register('email')} type="email" placeholder="correo@empresa.com" className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:ring-1 focus:ring-[#00D02C] outline-none transition-all text-sm text-white placeholder-zinc-700" />
          {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
        </div>

        <input type="hidden" {...register('department')} value="NDT" />

        <div>
          <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Requerimiento</label>
          <textarea {...register('message')} rows={2} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:ring-1 focus:ring-[#00D02C] outline-none transition-all text-sm text-white resize-none placeholder-zinc-700" placeholder="Breve descripción..." />
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-black py-2.5 px-4 rounded-lg transition-colors shadow-md disabled:opacity-70 mt-5 text-sm uppercase tracking-wide">
        {isSubmitting ? 'Procesando...' : 'Enviar Solicitud'}
      </button>
    </form>
  );
}
