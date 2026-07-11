import React from 'react';
import { BookOpen, Clock, Tag, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CursosCapacitaciones() {
  const cursos = [
    {
      title: "Calificación de Soldadores y Operadores (AWS/ASME)",
      category: "Calificación NDT",
      duration: "40 Horas Teórico-Práctico",
      format: "In-Company o Centro de Entrenamiento",
      tags: ["AWS D1.1", "ASME IX", "API 1104"],
      description: "Programa intensivo para preparar y evaluar las habilidades prácticas de los soldadores según las especificaciones técnicas y códigos de construcción vigentes. Incluye ensayo mecánico de probetas.",
    },
    {
      title: "Inspección Visual (VT) Nivel II",
      category: "Inspección NDT",
      duration: "24 Horas",
      format: "Presencial",
      tags: ["ASNT SNT-TC-1A", "ASME V"],
      description: "Fundamentos y técnicas de evaluación visual de juntas soldadas. Aprenda a identificar discontinuidades superficiales, uso de galgas y lectura de criterios de aceptación y rechazo.",
    },
    {
      title: "Líquidos Penetrantes (PT) Nivel II",
      category: "Inspección NDT",
      duration: "16 Horas",
      format: "Teórico y Laboratorio",
      tags: ["ASNT", "ASTM E-165"],
      description: "Curso teórico y práctico para la aplicación e interpretación de tintas penetrantes visibles y fluorescentes para la detección de fallas abiertas a la superficie en materiales no porosos.",
    },
    {
      title: "Seguridad Industrial e Higiene en Trabajos de Soldadura",
      category: "Prevención",
      duration: "12 Horas",
      format: "Online Sincrónico / In-Company",
      tags: ["Normativa Nacional", "OSHA"],
      description: "Manejo seguro de gases, equipos eléctricos, humos metálicos y radiación durante los procesos térmicos. Orientado a jefes de planta y supervisores de HSE.",
    }
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300">
      
      {/* Hero Header */}
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 py-20 relative border-b border-zinc-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00d02c 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <div className="inline-flex items-center justify-center p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl mb-6 shadow-xl text-[#00D02C]">
            <BookOpen size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Catálogo de Capacitación Técnica</h1>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            Programas de formación avanzada para el aseguramiento de la calidad industrial.
          </p>
        </div>
      </section>

      {/* Catálogo Layout (Sidebar + List) */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar / Filtros Visuales */}
            <div className="w-full lg:w-1/4 shrink-0">
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 sticky top-24">
                <h3 className="text-white font-bold text-lg mb-6 tracking-tight">Categorías de Estudio</h3>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left px-4 py-3 bg-[#00D02C]/10 text-[#00D02C] border border-[#00D02C]/20 font-bold rounded-lg transition-colors flex justify-between items-center">
                      Todos los Programas <span className="bg-[#00D02C]/20 px-2 py-0.5 rounded-md text-xs">4</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors font-medium flex justify-between items-center">
                      Inspección NDT <span className="bg-zinc-800 px-2 py-0.5 rounded-md text-xs">2</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors font-medium flex justify-between items-center">
                      Calificación NDT <span className="bg-zinc-800 px-2 py-0.5 rounded-md text-xs">1</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors font-medium flex justify-between items-center">
                      Prevención <span className="bg-zinc-800 px-2 py-0.5 rounded-md text-xs">1</span>
                    </button>
                  </li>
                </ul>
                
                <div className="mt-10 border-t border-zinc-800 pt-6">
                  <h4 className="text-white font-bold mb-4">¿Necesita un curso in-company?</h4>
                  <p className="text-sm text-zinc-400 mb-4 leading-relaxed">Diseñamos mallas a medida y trasladamos a nuestros instructores a sus instalaciones operativas.</p>
                  <Link href="/contacto" className="inline-block text-center w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg text-sm font-bold transition-colors">
                    Solicitar Cotización
                  </Link>
                </div>
              </div>
            </div>

            {/* Listado de Cursos */}
            <div className="flex-1 space-y-6">
              {cursos.map((curso, index) => (
                <div key={index} className="bg-zinc-900/40 backdrop-blur border border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-zinc-700 transition-all group flex flex-col md:flex-row gap-8">
                  
                  {/* Info Principal */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-bold rounded-md uppercase tracking-wider">
                        {curso.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#00D02C] transition-colors">{curso.title}</h2>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      {curso.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {curso.tags.map((tag, tIndex) => (
                        <span key={tIndex} className="flex items-center gap-1 text-xs font-medium text-zinc-500 border border-zinc-800 bg-zinc-950 px-2 py-1 rounded">
                          <Tag size={12} /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info Técnica y CTA */}
                  <div className="md:w-64 shrink-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-8">
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <Clock className="text-[#00D02C] shrink-0 mt-1" size={18} />
                        <div>
                          <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Duración</p>
                          <p className="text-sm text-zinc-300 font-medium">{curso.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-[#00D02C] shrink-0 mt-1" size={18} />
                        <div>
                          <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Modalidad</p>
                          <p className="text-sm text-zinc-300 font-medium">{curso.format}</p>
                        </div>
                      </div>
                    </div>
                    <Link href="/contacto" className="flex items-center justify-center gap-2 w-full bg-[#00D02C]/10 hover:bg-[#00D02C] text-[#00D02C] hover:text-zinc-950 border border-[#00D02C]/30 hover:border-[#00D02C] py-3 rounded-lg font-bold transition-colors">
                      Consultar Programa
                      <ArrowRight size={18} />
                    </Link>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
