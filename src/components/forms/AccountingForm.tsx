'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitLead } from '@/actions/leads';

const accountingSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Debe ser un correo válido'),
  phone: z.string().regex(/^\+?[0-9\s-]{8,15}$/, 'Formato de teléfono inválido'),
  serviceType: z.string().min(1, 'Seleccione un servicio'),
  message: z.string().optional(),
});

type AccountingFormValues = z.infer<typeof accountingSchema>;

export function AccountingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AccountingFormValues>({
    resolver: zodResolver(accountingSchema),
  });

  const onSubmit = async (data: AccountingFormValues) => {
    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await submitLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: 'CONTABILIDAD',
        message: `Servicio Solicitado: ${data.serviceType} \n\n${data.message || ''}`,
      });
      
      if (result.success) {
        setStatus({ type: 'success', message: '¡Formulario enviado con éxito! Nos contactaremos a la brevedad.' });
        reset();
      } else {
        setStatus({ type: 'error', message: result.error || 'Ocurrió un error.' });
      }
    } catch (e) {
      setStatus({ type: 'error', message: 'Error de conexión.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full bg-white p-8 rounded-xl shadow-sm border border-zinc-200 text-secondary">
      <h3 className="text-xl font-bold text-secondary mb-4">Solicitar Asesoría Contable</h3>
      
      {status && (
        <div className={`p-4 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {status.message}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-secondary mb-1">Nombre Completo</label>
        <input {...register('name')} className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-secondary" />
        {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-secondary mb-1">Correo Electrónico</label>
        <input {...register('email')} type="email" className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-secondary" />
        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-secondary mb-1">Teléfono</label>
        <input {...register('phone')} placeholder="+56 9 1234 5678" className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-secondary" />
        {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-secondary mb-1">Tipo de Servicio</label>
        <select {...register('serviceType')} className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white transition-all text-secondary">
          <option value="">Seleccione un servicio...</option>
          <option value="Declaración de Impuestos">Declaración de Impuestos (F29, Renta)</option>
          <option value="Remuneraciones">Gestión de Remuneraciones</option>
          <option value="Auditoría Financiera">Auditoría Financiera</option>
          <option value="Asesoría Tributaria">Asesoría Tributaria General</option>
        </select>
        {errors.serviceType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.serviceType.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-secondary mb-1">Mensaje (Opcional)</label>
        <textarea {...register('message')} rows={3} className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-secondary" />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-dark text-zinc-900 font-bold py-3 px-4 rounded-lg transition-colors shadow-md disabled:opacity-70 mt-4">
        {isSubmitting ? 'Enviando...' : 'Solicitar Asesoría'}
      </button>
    </form>
  );
}
