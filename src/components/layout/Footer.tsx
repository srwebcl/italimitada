import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 text-zinc-400 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <Image src="/logo-ita.png" alt="ITA Limitada" width={140} height={40} className="mb-4 opacity-90" />
            <p className="text-sm leading-relaxed">
              Soluciones integrales de Ingeniería de Precisión, Ensayos No Destructivos (NDT) y Asesoría Corporativa para la industria B2B de Chile.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-tight">Servicios Corporativos</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/inspecciones-tecnicas" className="hover:text-primary transition-colors">Inspecciones NDT</Link></li>
              <li><Link href="/inspecciones-tecnicas" className="hover:text-primary transition-colors">Calificación de Soldadores</Link></li>
              <li><Link href="/cursos-capacitaciones-y-seminario" className="hover:text-primary transition-colors">Capacitación Industrial</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-tight">Plataforma y Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/nuestra-empresa" className="hover:text-primary transition-colors">Nuestra Empresa</Link></li>
              <li><Link href="/certificados" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Validación Pública</Link></li>
              <li><Link href="/admin-panel/login" className="hover:text-primary transition-colors">Acceso Restringido</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Políticas de Privacidad</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-tight">Contacto Directo</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Base Operativa<br/>La Serena, Región de Coquimbo<br/>Chile</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+56912345678" className="hover:text-white transition-colors">+56 9 1234 5678</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:contacto@italimitada.cl" className="hover:text-white transition-colors">contacto@italimitada.cl</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Inspección Técnica NDT y Servicios Integrales Limitada. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">Diseñado con estándares corporativos.</p>
        </div>
      </div>
    </footer>
  );
}
