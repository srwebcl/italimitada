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
  const email = data.get('email') as string; // We still save it in DB, but won't send here
  const issueDateStr = data.get('issueDate') as string;
  
  const certificateNumber = data.get('certificateNumber') as string;
  const qualificationType = data.get('qualificationType') as string;
  const vigenciaStr = data.get('vigencia') as string;

  if (!rut || !name || !issueDateStr || !certificateNumber || !qualificationType || !vigenciaStr) {
    return { success: false, error: 'Faltan datos requeridos' };
  }

  try {
    const issueDate = new Date(issueDateStr);
    const expiryDate = new Date(issueDate);
    
    // Vigencia in years
    const vigenciaYears = parseInt(vigenciaStr, 10);
    expiryDate.setFullYear(expiryDate.getFullYear() + vigenciaYears);

    const validationCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    const welder = await prisma.welder.upsert({
      where: { rut },
      update: { fullName: name, company: company || 'Independiente', email: email || null },
      create: { rut, fullName: name, company: company || 'Independiente', email: email || null }
    });

    const cert = await prisma.certificate.create({
      data: {
        certificateNumber,
        qualificationType,
        welderId: welder.id,
        issueDate,
        expiryDate,
        validationCode,
        status: 'VIGENTE'
      }
    });

    // Trigger A: Generar PDF y enviar correo siempre a italimitada@gmail.com
    const targetEmail = 'italimitada@gmail.com';
    
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
        company: welder.company,
        certificateNumber: cert.certificateNumber,
        qualificationType: cert.qualificationType,
        issueDate: cert.issueDate.toLocaleDateString('es-CL'),
        expiryDate: cert.expiryDate.toLocaleDateString('es-CL'),
        validationCode: cert.validationCode,
        status: cert.status,
        qrBase64,
        logoBase64
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(pdfElement as any);
    
    if (logoBuffer) {
      await sendCertificateEmail(targetEmail, welder.fullName, pdfBuffer, logoBuffer, qrBase64, cert.validationCode);
    } else {
      // Fallback in case logo fails
      const emptyBuffer = Buffer.from('');
      await sendCertificateEmail(targetEmail, welder.fullName, pdfBuffer, emptyBuffer, qrBase64, cert.validationCode);
    }

    return { success: true, validationCode: cert.validationCode };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error interno al generar certificado' };
  }
}
