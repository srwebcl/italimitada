import 'dotenv/config';
import { prisma } from './src/lib/db';
import crypto from 'crypto';

async function test() {
  try {
    const rut = '12345678-9';
    const name = 'Test Welder';
    const company = 'Test Company';
    const email = 'test@example.com';
    const processStr = 'SMAW';
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const validationCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    const welder = await prisma.welder.upsert({
      where: { rut },
      update: { fullName: name, company: company || 'Independiente', email: email || null },
      create: { rut, fullName: name, company: company || 'Independiente', email: email || null }
    });

    console.log('Welder created:', welder);

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

    console.log('Certificate created:', cert);
  } catch (err) {
    console.error('Error during DB test:', err);
  }
}

test();
