import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk';
import { prisma } from '@/lib/db';
import React from 'react';
import { generateQR } from '@/lib/qr';
import { sendCertificateEmail } from '@/lib/mail';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token_ws = formData.get('token_ws') as string;

    if (!token_ws) {
      return NextResponse.redirect(new URL('/certificados?error=pago_cancelado', request.url));
    }

    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
    const response = await tx.commit(token_ws);

    if (response.status === 'AUTHORIZED') {
      const certId = response.session_id.replace('SES-', '');
      
      const cert = await prisma.certificate.findUnique({
        where: { id: certId },
        include: { welder: true }
      });

      // Trigger B: Recuperación pagada - Generar PDF y enviar correo
      if (cert && cert.welder.email) {
        const logoPath = path.join(process.cwd(), 'public', 'logo-ita.png');
        const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;

        const { renderToBuffer } = await import('@react-pdf/renderer');
        const { CertificateTemplate } = await import('@/components/pdf/CertificateTemplate');
        const qrBase64 = await generateQR(cert.validationCode);
        const pdfElement = React.createElement(CertificateTemplate, {
          data: {
            welderName: cert.welder.fullName,
            welderRut: cert.welder.rut,
            process: cert.process,
            issueDate: cert.issueDate.toLocaleDateString('es-CL'),
            expiryDate: cert.expiryDate.toLocaleDateString('es-CL'),
            validationCode: cert.validationCode,
            qrBase64,
            logoBase64
          }
        });
        const pdfBuffer = await renderToBuffer(pdfElement as any);
        await sendCertificateEmail(cert.welder.email, cert.welder.fullName, pdfBuffer);
      }

      return NextResponse.redirect(new URL('/certificados?success=pago_aprobado', request.url));
    } else {
      return NextResponse.redirect(new URL('/certificados?error=pago_rechazado', request.url));
    }

  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/certificados?error=error_interno', request.url));
  }
}
