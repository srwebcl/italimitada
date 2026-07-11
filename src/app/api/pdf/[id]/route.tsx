import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, renderToStream } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: '2px solid #00D02C',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  logo: {
    width: 120,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottom: '1px solid #eeeeee',
    paddingBottom: 10,
  },
  label: {
    width: 150,
    fontSize: 12,
    color: '#666666',
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: '#1a1a1a',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1px solid #eeeeee',
  },
  qrContainer: {
    width: 100,
    height: 100,
  },
  validationInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  validationText: {
    fontSize: 10,
    color: '#666666',
  },
  validationLink: {
    fontSize: 10,
    color: '#00D02C',
    marginTop: 5,
  }
});

// Create PDF Component
const CertificateDocument = ({ cert, qrDataUrl, logoDataUrl }: { cert: any, qrDataUrl: string, logoDataUrl: string }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Certificado de Calificación</Text>
          <Text style={styles.subtitle}>Soldador / Operador de Soldadura</Text>
        </View>
        <View>
           <Image style={styles.logo} src={logoDataUrl} />
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre del Soldador:</Text>
          <Text style={styles.value}>{cert.welder.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>RUT / ID:</Text>
          <Text style={styles.value}>{cert.welder.rut}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Empresa:</Text>
          <Text style={styles.value}>{cert.welder.company || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Proceso de Soldadura:</Text>
          <Text style={styles.value}>{cert.process}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha de Emisión:</Text>
          <Text style={styles.value}>{cert.issueDate.toLocaleDateString('es-CL')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha de Caducidad:</Text>
          <Text style={styles.value}>{cert.expiryDate.toLocaleDateString('es-CL')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Estado Actual:</Text>
          <Text style={styles.value}>{cert.status}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.validationInfo}>
          <Text style={styles.validationText}>Este documento es validable públicamente.</Text>
          <Text style={styles.validationText}>Escanee el código QR o visite el siguiente enlace e ingrese el código:</Text>
          <Text style={styles.validationLink}>Código: {cert.validationCode}</Text>
        </View>
        <Image style={styles.qrContainer} src={qrDataUrl} />
      </View>
    </Page>
  </Document>
);

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
    const stream = await renderToStream(<CertificateDocument cert={cert} qrDataUrl={qrDataUrl} logoDataUrl={logoDataUrl} />);

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

  } catch (error: any) {
    console.error('Error generando PDF:', error);
    return new NextResponse(`Error interno generando el PDF: ${error.message || error.toString()}`, { status: 500 });
  }
}
