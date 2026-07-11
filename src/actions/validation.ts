'use server'

import { prisma } from '@/lib/db';

export async function validateCertificate(code: string) {
  if (!code) return { success: false, error: 'Ingrese un código' };

  try {
    const cert = await prisma.certificate.findUnique({
      where: { validationCode: code.toUpperCase() },
      include: { welder: true }
    });

    if (!cert) return { success: false, error: 'Código de certificado no encontrado' };

    return { 
      success: true, 
      certificate: {
        code: cert.validationCode,
        status: cert.status,
        process: cert.process,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate,
        welderName: cert.welder.fullName,
        welderRut: cert.welder.rut,
        company: cert.welder.company
      }
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al validar certificado' };
  }
}
