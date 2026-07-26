'use server'
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

export async function loginAdmin(data: FormData) {
  const user = data.get('username');
  const pass = data.get('password');

  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD) {
    const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);
    const token = await new SignJWT({ user: user })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    (await cookies()).set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return { success: true };
  }
  return { success: false, error: 'Credenciales inválidas' };
}
