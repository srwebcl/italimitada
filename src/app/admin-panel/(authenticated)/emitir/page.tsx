import React from 'react';
import IssueCertificateForm from '@/components/admin/IssueCertificateForm';

export default function EmitirPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Emitir Certificado</h1>
        <p className="text-zinc-400">Complete los datos del soldador para generar un nuevo certificado oficial.</p>
      </div>
      <IssueCertificateForm />
    </div>
  );
}
