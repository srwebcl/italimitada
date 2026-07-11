'use server'

import { prisma } from '@/lib/db';
import { Department } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitLead(data: { name: string; email: string; phone: string; department: Department; message?: string }) {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: data.department,
      },
    });

    // Determinar destinatario
    let toEmail = process.env.EMAIL_GENERAL || 'contacto@italimitada.cl';
    if (data.department === 'NDT') {
      toEmail = process.env.EMAIL_NDT || toEmail;
    } else if (data.department === 'CONTABILIDAD') {
      toEmail = process.env.EMAIL_CONTABILIDAD || toEmail;
    }

    // Leer logo local para adjuntar como CID
    let logoAttachment = [];
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const logoBuffer = await fs.readFile(path.join(process.cwd(), 'public', 'logo-ita.png'));
      logoAttachment.push({
        filename: 'logo-ita.png',
        content: logoBuffer,
        content_id: 'logo'
      });
    } catch (e) {
      console.error('Error adjuntando logo en lead:', e);
    }

    // Enviar correo
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'ITA Limitada Plataforma <contacto@italimitada.cl>',
        to: [toEmail], 
        subject: `Nuevo Lead [${data.department}]: ${data.name}`,
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
              .data-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
              .data-table th, .data-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #e4e4e7; }
              .data-table th { width: 35%; color: #71717a; font-weight: 600; font-size: 14px; background-color: #fafafa; }
              .data-table td { color: #27272a; font-weight: 500; font-size: 15px; }
              .message-box { background-color: #f4f4f5; padding: 20px; border-radius: 8px; border-left: 4px solid #00D02C; }
              .message-box p { margin: 0; font-size: 15px; color: #3f3f46; font-style: italic; }
              .footer { background-color: #f4f4f5; padding: 20px 40px; text-align: center; border-top: 1px solid #e4e4e7; }
              .footer p { margin: 0; font-size: 12px; color: #71717a; line-height: 1.5; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="cid:logo" alt="ITA Limitada" />
              </div>
              <div class="content">
                <h1 class="title">Nueva Solicitud Web</h1>
                <p class="text">Se ha recibido un nuevo formulario de contacto desde la plataforma corporativa.</p>
                
                <table class="data-table">
                  <tr>
                    <th>División</th>
                    <td><strong>${data.department}</strong></td>
                  </tr>
                  <tr>
                    <th>Nombre</th>
                    <td>${data.name}</td>
                  </tr>
                  <tr>
                    <th>Correo</th>
                    <td><a href="mailto:${data.email}" style="color: #00D02C;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <th>Teléfono</th>
                    <td>${data.phone}</td>
                  </tr>
                </table>

                <div class="message-box">
                  <p><strong>Mensaje del cliente:</strong><br/>${data.message || 'El cliente no ingresó mensaje adicional.'}</p>
                </div>
              </div>
              <div class="footer">
                <p>Notificación automática del Sistema de Gestión B2B<br/>ITA Limitada Plataforma</p>
              </div>
            </div>
          </body>
          </html>
        `,
        attachments: logoAttachment
      });
    }

    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error('Error creating lead:', error);
    return { success: false, error: 'Ocurrió un error al enviar el formulario' };
  }
}
