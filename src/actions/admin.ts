'use server'

import { prisma } from '@/lib/db';
import crypto from 'crypto';
import React from 'react';
import { generateQR } from '@/lib/qr';
import { sendCertificateEmail } from '@/lib/mail';

export async function issueCertificate(data: FormData) {
  const rut = data.get('rut') as string;
  const name = data.get('name') as string;
  const company = data.get('company') as string;
  const email = data.get('email') as string;
  const processStr = data.get('process') as string;
  const issueDateStr = data.get('issueDate') as string;

  if (!rut || !name || !processStr || !issueDateStr) return { success: false, error: 'Faltan datos requeridos' };

  try {
    const issueDate = new Date(issueDateStr);
    const expiryDate = new Date(issueDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const validationCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    const welder = await prisma.welder.upsert({
      where: { rut },
      update: { fullName: name, company: company || 'Independiente', email: email || null },
      create: { rut, fullName: name, company: company || 'Independiente', email: email || null }
    });

    const cert = await prisma.certificate.create({
      data: {
        welderId: welder.id,
        process: processStr,
        issueDate,
        expiryDate,
        validationCode,
        status: 'VIGENTE'
      }
    });

    // Trigger A: Generar PDF y enviar correo si hay email
    if (welder.email) {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const logoPath = path.join(process.cwd(), 'public', 'logo-ita.png');
      let logoBuffer: Buffer | null = null;
      let logoBase64 = '';
      
      try {
        logoBuffer = await fs.readFile(logoPath);
        logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
      } catch (err) {
        console.error('Error leyendo logo para PDF/Email:', err);
      }

      const { renderToBuffer } = await import('@react-pdf/renderer');
      const { CertificateTemplate } = await import('@/components/pdf/CertificateTemplate');
      const qrBase64 = await generateQR(cert.validationCode);
      const pdfElement = React.createElement(CertificateTemplate, {
        data: {
          welderName: welder.fullName,
          welderRut: welder.rut,
          process: cert.process,
          issueDate: cert.issueDate.toLocaleDateString('es-CL'),
          expiryDate: cert.expiryDate.toLocaleDateString('es-CL'),
          validationCode: cert.validationCode,
          qrBase64,
          logoBase64
        }
      });
      const pdfBuffer = await renderToBuffer(pdfElement as any);
      
      if (logoBuffer) {
        await sendCertificateEmail(welder.email, welder.fullName, pdfBuffer, logoBuffer);
      } else {
        // Fallback in case logo fails
        const emptyBuffer = Buffer.from('');
        await sendCertificateEmail(welder.email, welder.fullName, pdfBuffer, emptyBuffer);
      }
    }

    return { success: true, validationCode: cert.validationCode };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error interno al generar certificado' };
  }
}
