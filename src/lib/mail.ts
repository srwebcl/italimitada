import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function sendCertificateEmail(email: string, welderName: string, pdfBuffer: Buffer, logoBuffer: Buffer, qrBase64: string, validationCode: string) {
  try {
    // Parse the data URI to get just the base64 string
    const qrData = qrBase64.replace(/^data:image\/\w+;base64,/, '');
    const qrBuffer = Buffer.from(qrData, 'base64');

    const { data, error } = await resend.emails.send({
      from: 'ITA Limitada <certificados@italimitada.cl>',
      to: [email],
      bcc: ['contacto@srweb.cl'],
      subject: 'Certificado de Calificación Oficial - ITA Limitada',
      text: `Hola ${welderName},\n\nAdjunto enviamos su Certificado de Calificación Oficial emitido por ITA Limitada. Puede validarlo en cualquier momento escaneando el código QR adjunto.\n\nAtentamente,\nITA Limitada`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #18181b; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            .header { background-color: #09090b; padding: 30px 40px; text-align: center; border-bottom: 4px solid #00D02C; }
            .header img { max-width: 180px; height: auto; }
            .content { padding: 40px; }
            .title { font-size: 24px; font-weight: bold; color: #09090b; margin-top: 0; margin-bottom: 24px; letter-spacing: -0.5px; }
            .text { font-size: 16px; line-height: 1.6; color: #52525b; margin-bottom: 24px; }
            .highlight { background-color: #f4f4f5; border-left: 4px solid #00D02C; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 30px; text-align: center; }
            .highlight img { width: 120px; height: 120px; margin-bottom: 15px; }
            .highlight p { margin: 0; font-size: 15px; color: #27272a; }
            .footer { background-color: #f4f4f5; padding: 30px 40px; text-align: center; border-top: 1px solid #e4e4e7; }
            .footer p { margin: 0; font-size: 12px; color: #71717a; line-height: 1.5; }
            .social { margin-top: 15px; font-weight: bold; color: #09090b; font-size: 12px; letter-spacing: 1px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <!-- Cargando logo por CID (incrustado) -->
              <img src="cid:logo" alt="ITA Limitada" />
            </div>
            <div class="content">
              <h1 class="title">Certificado de Calificación Oficial</h1>
              <p class="text">Estimado/a <strong>${welderName}</strong>,</p>
              <p class="text">Junto con saludar, hacemos entrega formal de su Certificado de Calificación adjunto en este correo electrónico, el cual ha sido emitido exitosamente por el Departamento de Ingeniería de ITA Limitada.</p>
              
              <div class="highlight">
                <img src="cid:qrcode" alt="Código QR de Validación" />
                <p><strong>Verificación en Línea</strong><br/>Escanee el código QR o visite <a href="https://www.italimitada.cl/certificados" style="color: #00D02C; text-decoration: none; font-weight: bold;">www.italimitada.cl/certificados</a> e ingrese el código: <strong>${validationCode}</strong></p>
              </div>

              <p class="text">Agradecemos su confianza en nuestros servicios de certificación.</p>
              <p class="text" style="margin-bottom: 0;">Atentamente,<br/><strong>División NDT - ITA Limitada</strong></p>
            </div>
            <div class="footer">
              <p>Este es un correo generado automáticamente, por favor no responda directamente a esta dirección.</p>
              <p class="social">ITA LIMITADA B2B PLATFORM</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `Certificado_${validationCode}.pdf`,
          content: pdfBuffer,
        },
        {
          filename: 'logo-ita.png',
          content: logoBuffer,
          contentId: 'logo'
        },
        {
          filename: 'codigo-qr.png',
          content: qrBuffer,
          contentId: 'qrcode'
        }
      ]
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
