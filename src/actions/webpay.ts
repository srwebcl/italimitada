'use server'

import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk';
import { prisma } from '@/lib/db';

export async function initWebpayTransaction(certificateCode: string) {
  try {
    const cert = await prisma.certificate.findUnique({
      where: { validationCode: certificateCode },
      include: { welder: true }
    });
    
    if (!cert || cert.status !== 'VIGENTE') {
      return { success: false, error: 'Certificado no vigente o no encontrado' };
    }

    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
    const buyOrder = `ITA-${Date.now()}`;
    const sessionId = `SES-${cert.id}`.substring(0, 60); 
    const amount = 12000;
    const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/webpay/commit`;

    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
    
    return { success: true, url: response.url, token: response.token };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al iniciar pago en Transbank' };
  }
}
