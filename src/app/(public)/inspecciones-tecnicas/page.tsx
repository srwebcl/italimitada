import React from 'react';
import { ShieldCheck, Search, Activity, Waves, Eye } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

export default function InspeccionesTecnicas() {
  const servicios = [
    {
      id: "vt",
      icon: <Eye size={48} className="text-[#00D02C]" />,
      title: "Inspección Visual (VT)",
      description: "La Inspección Visual es el método no destructivo fundamental, aplicado rigurosamente antes, durante y después de los procesos de soldadura. Garantizamos una evaluación exhaustiva de discontinuidades superficiales, alineación y condiciones físicas de los componentes.",
      normativa: "ASME Sección V Artículo 9",
      features: ["Evaluación de alineación", "Medición de perfil de soldadura", "Detección de discontinuidades superficiales"]
    },
    {
      id: "pt",
      icon: <Search size={48} className="text-[#00D02C]" />,
      title: "Líquidos Penetrantes (PT)",
      description: "Técnica vital para detectar discontinuidades abiertas a la superficie en materiales no porosos. Revelamos con alta precisión fisuras, porosidades y traslapes invisibles a simple vista, utilizando tintas de alto contraste o fluorescentes.",
      normativa: "ASTM E-165",
      features: ["Tintas Visibles", "Tintas Fluorescentes", "Materiales no porosos (metales, plásticos)"]
    },
    {
      id: "mt",
      icon: <Activity size={48} className="text-[#00D02C]" />,
      title: "Partículas Magnetizables (MT)",
      description: "Solución rápida y altamente confiable para materiales ferromagnéticos. Permite localizar imperfecciones superficiales y subsuperficiales induciendo un campo magnético, agrupando partículas en los campos de fuga magnética creados por las discontinuidades.",
      normativa: "ASTM E-709",
      features: ["Vía Seca / Vía Húmeda", "Yugo Electromagnético", "Detección subsuperficial"]
    },
    {
      id: "ut",
      icon: <Waves size={48} className="text-[#00D02C]" />,
      title: "Ultrasonido (UT) y Medición de Espesor",
      description: "El pináculo de la evaluación volumétrica. Utilizando ondas acústicas de alta frecuencia, detectamos fallas internas profundas sin alterar la integridad estructural. Además, realizamos mediciones precisas para evaluar desgaste por corrosión.",
      normativa: "ASME Sección V Artículo 4",
      features: ["Detección Volumétrica Interna", "Cálculo de Vida Útil", "Medición de Desgaste por Corrosión"]
    }
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300">
      
      {/* Hero Header */}
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 py-20 relative border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00d02c 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center justify-center p-4 bg-zinc-900/80 border border-zinc-800 rounded-full mb-8 shadow-xl text-[#00D02C]">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
            Aseguramiento <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D02C] to-emerald-600">Estructural Integrado</span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
            Evaluación volumétrica y superficial de sus activos críticos bajo los más estrictos estándares internacionales (ASME, AWS, API, ASTM).
          </p>
        </div>
      </section>

      {/* Stacked Cards Layout */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Nuestros Métodos de Ensayo</h2>
            <p className="text-zinc-400 text-lg">Desplegamos instrumentación de vanguardia e inspectores certificados Nivel II para evaluar la sanidad de sus proyectos metalmecánicos.</p>
          </div>

          {servicios.map((servicio, index) => (
            <div key={servicio.id} className="bg-zinc-900/30 backdrop-blur border border-zinc-800 rounded-3xl p-8 md:p-12 hover:bg-zinc-900/50 hover:border-zinc-700 transition-colors group">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
                
                {/* Icon Block */}
                <div className="shrink-0">
                  <div className="w-24 h-24 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-[#00D02C]/50 transition-all duration-500">
                    {servicio.icon}
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">{servicio.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-lg mb-6">
                    {servicio.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 border-t border-zinc-800 pt-6 mt-6">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Normativa Aplicable</span>
                      <span className="inline-block px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-md text-[#00D02C] text-sm font-mono font-bold">
                        {servicio.normativa}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Entregables Principales</span>
                      <ul className="text-sm text-zinc-300 space-y-1">
                        {servicio.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#00D02C] rounded-full"></span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Formulario Landing */}
      <section className="py-24 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00D02C]/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">¿Listo para inspeccionar su próximo proyecto?</h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-10">
                Deje sus datos y un ingeniero especialista de NDT se contactará con usted a la brevedad para coordinar una evaluación técnica inicial <strong className="text-white font-medium">sin compromiso</strong>.
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-4 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                <div className="flex -space-x-3 shrink-0">
                   <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold text-zinc-300 tracking-wider shadow-lg">ASME</div>
                   <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold text-zinc-300 tracking-wider shadow-lg">AWS</div>
                   <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold text-zinc-300 tracking-wider shadow-lg">API</div>
                </div>
                <div className="text-sm font-medium text-zinc-400 border-l border-zinc-700 pl-4">
                  Nuestros reportes cuentan con <br/><strong className="text-white">Validez Internacional</strong>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-[450px] shrink-0 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00D02C] to-emerald-600 rounded-[2rem] blur opacity-20"></div>
              <ContactForm title="Solicitar Inspección NDT" defaultMessage="Hola, requiero una cotización para servicios de inspección técnica en terreno para..." />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
