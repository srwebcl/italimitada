import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

export default function Contacto() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300">
      
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 py-20 relative border-b border-zinc-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00d02c 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <div className="inline-flex items-center justify-center p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl mb-6 shadow-xl text-[#00D02C]">
            <Send size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Contacto Directo</h1>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            Comuníquese con nosotros para cotizar servicios de inspección o validar certificaciones.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Nuestras Oficinas</h2>
              
              <div className="bg-zinc-900/40 backdrop-blur border border-zinc-800 p-8 rounded-3xl">
                <ul className="space-y-8">
                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-[#00D02C]">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">Base de Operaciones</h3>
                      <p className="text-zinc-400 leading-relaxed">La Serena, Región de Coquimbo<br/>Chile</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-[#00D02C]">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">Teléfonos</h3>
                      <p className="text-zinc-400 leading-relaxed">General: +56 9 1234 5678<br/>Inspecciones: +56 9 8765 4321</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-[#00D02C]">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">Correos Electrónicos</h3>
                      <p className="text-zinc-400 leading-relaxed">General: contacto@italimitada.cl<br/>Ingeniería: jolavarria@italimitada.cl<br/>Contabilidad: plafitte@italimitada.cl</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form Container */}
            <div className="relative h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#00D02C]/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <ContactForm title="Envíenos un mensaje" />
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
