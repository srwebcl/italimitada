import QRCode from 'qrcode';

export async function generateQR(validationCode: string): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/certificados?code=${validationCode}`;
  try {
    const qrBase64 = await QRCode.toDataURL(url, {
      color: {
        dark: '#00D02C',  // Verde ITA
        light: '#FFFFFF' // Blanco
      },
      margin: 2
    });
    return qrBase64;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
