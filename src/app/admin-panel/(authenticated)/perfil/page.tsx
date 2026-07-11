import React from 'react';
import { Settings, ShieldAlert, KeyRound, User } from 'lucide-react';

export default function ProfilePage() {
  const adminUser = process.env.ADMIN_USER || 'admin@italimitada.cl';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Perfil y Ajustes</h1>
        <p className="text-zinc-400">Administre las credenciales y configuraciones de acceso del sistema.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <User className="text-[#00D02C]" size={24} />
          <h2 className="text-xl font-bold text-white tracking-tight">Cuenta Principal de Administrador</h2>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Correo Electrónico (Usuario)</label>
            <div className="w-full bg-zinc-950/50 px-4 py-3 border border-zinc-800/50 rounded-lg text-white font-medium">
              {adminUser}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Rol del Sistema</label>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00D02C]/10 text-[#00D02C] border border-[#00D02C]/20 text-sm font-bold tracking-wide">
              SUPER ADMIN
            </div>
          </div>
        </div>
      </div>

      {/* Security Info Card */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <KeyRound className="text-zinc-400" size={24} />
          <h2 className="text-xl font-bold text-white tracking-tight">Seguridad y Contraseña</h2>
        </div>
        <div className="p-8">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-blue-500/20 p-3 rounded-full shrink-0">
              <ShieldAlert className="text-blue-400" size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">Gestión de Credenciales Restringida</h3>
              <p className="text-zinc-300 leading-relaxed text-sm mb-4">
                Por directrices estrictas de arquitectura y seguridad, la cuenta de administrador está aislada de la base de datos principal. No es posible cambiar la contraseña a través de esta interfaz web para evitar escalada de privilegios y ataques automatizados.
              </p>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                <p className="text-zinc-400 text-sm font-mono">
                  Para modificar la contraseña o el usuario de acceso, debe solicitar al equipo de infraestructura o desarrollo que modifique las variables <span className="text-[#00D02C]">ADMIN_USER</span> y <span className="text-[#00D02C]">ADMIN_PASSWORD</span> en el entorno de despliegue (Vercel).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
