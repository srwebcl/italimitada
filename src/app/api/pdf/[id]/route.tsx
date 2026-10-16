import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import React from 'react';
import { renderToStream } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

import { CertificateTemplate } from '@/components/pdf/CertificateTemplate';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const code = resolvedParams.id;
  
  const searchParams = request.nextUrl.searchParams;
  const isDownload = searchParams.get('download') === 'true';

  try {
    const cert = await prisma.certificate.findUnique({
      where: { validationCode: code },
      include: { welder: true }
    });

    if (!cert) {
      return new NextResponse('Certificado no encontrado', { status: 404 });
    }

    // Read Logo and convert to base64
    const logoPath = path.join(process.cwd(), 'public', 'logo-ita.png');
    let logoDataUrl = '';
    try {
      const logoBuffer = fs.readFileSync(logoPath);
      logoDataUrl = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    } catch (e) {
      console.error("Could not load logo image", e);
      // Fallback or empty if logo fails
    }

    // Generate QR Code containing the validation URL dynamically based on the current environment host
    const origin = request.nextUrl.origin;
    const validationUrl = `${origin}/certificados?code=${cert.validationCode}`;
    const qrDataUrl = await QRCode.toDataURL(validationUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    // Render PDF to stream
    const pdfElement = React.createElement(CertificateTemplate, {
      data: {
        welderName: cert.welder.fullName,
        welderRut: cert.welder.rut,
        company: cert.welder.company,
        certificateNumber: cert.certificateNumber,
        qualificationType: cert.qualificationType,
        issueDate: cert.issueDate.toLocaleDateString('es-CL', { timeZone: 'UTC' }),
        expiryDate: cert.expiryDate.toLocaleDateString('es-CL', { timeZone: 'UTC' }),
        validationCode: cert.validationCode,
        status: cert.status,
        qrBase64: qrDataUrl,
        logoBase64: logoDataUrl
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stream = await renderToStream(pdfElement as any);

    // Next.js Response requires converting Node stream to Web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      }
    });

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    if (isDownload) {
      headers.set('Content-Disposition', `attachment; filename="Certificado_${cert.validationCode}.pdf"`);
    } else {
      headers.set('Content-Disposition', 'inline');
    }

    return new NextResponse(webStream, {
      status: 200,
      headers
    });

  } catch (error: unknown) {
    console.error('Error generando PDF:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return new NextResponse(`Error interno generando el PDF: ${msg}`, { status: 500 });
  }
}
