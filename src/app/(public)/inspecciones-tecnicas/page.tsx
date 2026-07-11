import React from 'react';
import { ShieldCheck, Search, Activity, Waves, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 py-24 relative border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00d02c 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full mb-6 text-[#00D02C] text-sm font-bold tracking-widest uppercase">
              <ShieldCheck size={18} />
              Ingeniería NDT
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Aseguramiento <span className="text-[#00D02C]">Estructural Integrado.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8">
              Evaluación volumétrica y superficial de sus activos críticos bajo los más estrictos estándares internacionales (ASME, AWS, API, ASTM).
            </p>
            <div className="flex gap-4">
              <Link href="/contacto" className="bg-[#00D02C] hover:bg-[#00b326] text-zinc-950 font-bold px-8 py-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(0,208,44,0.3)]">
                Solicitar Inspección
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-end relative">
             <div className="w-full max-w-md aspect-square bg-zinc-900 rounded-full border-4 border-zinc-800 relative flex items-center justify-center p-8">
               <div className="absolute inset-0 bg-[#00D02C]/10 rounded-full blur-3xl animate-pulse"></div>
               {/* Gráfico representativo estético */}
               <div className="w-full h-full border border-zinc-800 rounded-full flex items-center justify-center border-dashed">
                 <div className="w-3/4 h-3/4 border border-zinc-700 rounded-full flex items-center justify-center border-dashed opacity-50">
                   <div className="w-1/2 h-1/2 bg-[#00D02C]/20 border border-[#00D02C]/50 rounded-full blur-sm"></div>
                 </div>
               </div>
             </div>
          </div>
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

    </main>
  );
}
