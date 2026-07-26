'use client'

import React, { useState } from 'react';
import { BookOpen, Clock, Tag, MapPin, ArrowRight, X } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import Image from 'next/image';

export default function CursosCapacitaciones() {
  const [modalData, setModalData] = useState<{title: string, defaultMessage: string} | null>(null);

  const cursos = [
    {
      id: 'soldadura',
      title: 'Calificación de Soldadores AWS/ASME',
      description: 'Entrenamiento teórico-práctico intensivo y pruebas de calificación para soldadores según códigos AWS D1.1 y ASME BPVC Sección IX. Incluye evaluación radiográfica y destructiva de probetas.',
      format: 'Presencial',
      duration: '40 Horas',
      nivel: 'Avanzado',
      category: 'Calificación NDT',
      image: '/images/cursos/calificacion.png',
      tags: ["AWS D1.1", "ASME IX", "API 1104"],
    },
    {
      id: 'vt',
      title: 'Inspección Visual (VT) Nivel I y II',
      description: 'Formación especializada en técnicas de inspección visual de soldaduras, evaluación de discontinuidades y uso de galgas e instrumentos de medición bajo los lineamientos SNT-TC-1A.',
      format: 'Teórico/Práctico',
      duration: '24 Horas',
      nivel: 'Intermedio',
      category: 'Inspección NDT',
      image: '/images/cursos/vt.png',
      tags: ["ASNT SNT-TC-1A", "ASME V"],
    },
    {
      id: 'pt',
      title: 'Líquidos Penetrantes (PT) Nivel I y II',
      description: 'Curso integral sobre detección de fallas superficiales no porosas. Preparación de superficies, aplicación de penetrantes visibles y fluorescentes, y evaluación de indicaciones.',
      format: 'Teórico/Práctico',
      duration: '16 Horas',
      nivel: 'Intermedio',
      category: 'Inspección NDT',
      image: '/images/cursos/pt.png',
      tags: ["ASNT", "ASTM E-165"],
    },
    {
      id: 'ut',
      title: 'Ultrasonido Industrial (UT) Nivel I y II',
      description: 'Principios acústicos y propagación de ondas. Calibración de equipos, técnicas de haz recto y angular para la detección y dimensionamiento de defectos internos en metales.',
      format: 'Teórico/Práctico',
      duration: '40 Horas',
      nivel: 'Avanzado',
      category: 'Inspección NDT',
      image: '/images/cursos/ut.png',
      tags: ["ASNT SNT-TC-1A", "ASME V"],
    },
    {
      id: 'seguridad',
      title: 'Seguridad en Operaciones NDT y Soldadura',
      description: 'Normativas de prevención de riesgos, uso de EPP avanzado, manejo de espacios confinados y protocolos de emergencia específicos para faenas metalmecánicas y ensayos no destructivos.',
      format: 'Presencial / Online',
      duration: '12 Horas',
      nivel: 'Básico',
      category: 'Prevención',
      image: '/images/cursos/hse.png',
      tags: ["Normativa Nacional", "OSHA"],
    }
  ];

  const [activeCategory, setActiveCategory] = useState('Todos los Programas');
  
  const getCount = (cat: string) => {
    if (cat === 'Todos los Programas') return cursos.length;
    return cursos.filter(c => c.category === cat).length;
  };

  const categories = [
    { id: 'Todos los Programas', name: 'Todos los Programas' },
    { id: 'Inspección NDT', name: 'Inspección NDT' },
    { id: 'Calificación NDT', name: 'Calificación NDT' },
    { id: 'Prevención', name: 'Prevención' }
  ];

  const filteredCursos = activeCategory === 'Todos los Programas' 
    ? cursos 
    : cursos.filter(c => c.category === activeCategory);

  const openQuoteModal = (courseTitle: string) => {
    setModalData({
      title: `Información de Programa`,
      defaultMessage: `Hola, solicito información, temario y cotización para el programa: ${courseTitle}.`
    });
  };

  const openInCompanyModal = () => {
    setModalData({
      title: 'Cotización In-Company',
      defaultMessage: 'Hola, me gustaría cotizar una capacitación in-company a medida para mi equipo. Los requerimientos principales son:'
    });
  };

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
                  {categories.map(cat => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <li key={cat.id}>
                        <button 
                          onClick={() => setActiveCategory(cat.id)}
                          className={`w-full text-left px-4 py-3 font-bold rounded-lg transition-colors flex justify-between items-center ${isActive ? 'bg-[#00D02C]/10 text-[#00D02C] border border-[#00D02C]/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent font-medium'}`}
                        >
                          {cat.name} 
                          <span className={`px-2 py-0.5 rounded-md text-xs ${isActive ? 'bg-[#00D02C]/20' : 'bg-zinc-800'}`}>
                            {getCount(cat.id)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-10 border-t border-zinc-800 pt-6">
                  <h4 className="text-white font-bold mb-4">¿Necesita un curso in-company?</h4>
                  <p className="text-sm text-zinc-400 mb-4 leading-relaxed">Diseñamos mallas a medida y trasladamos a nuestros instructores a sus instalaciones operativas.</p>
                  <button onClick={openInCompanyModal} className="inline-block text-center w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg text-sm font-bold transition-colors">
                    Solicitar Cotización
                  </button>
                </div>
              </div>
            </div>

            {/* Listado de Cursos */}
            <div className="flex-1 space-y-8">
              {filteredCursos.map((curso, index) => (
                <div key={index} className="bg-zinc-900/40 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all group flex flex-col md:flex-row shadow-lg">
                  
                  {/* Thumbnail Image */}
                  <div className="w-full md:w-1/3 aspect-video md:aspect-auto relative shrink-0 overflow-hidden bg-zinc-950">
                    <Image 
                      src={curso.image} 
                      alt={curso.title} 
                      fill 
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent md:bg-gradient-to-r"></div>
                  </div>

                  {/* Info Principal */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-zinc-800/80 text-zinc-300 text-xs font-bold rounded-md uppercase tracking-wider">
                          {curso.category}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#00D02C] transition-colors">{curso.title}</h2>
                      <p className="text-zinc-400 leading-relaxed mb-6">
                        {curso.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {curso.tags.map((tag, tIndex) => (
                          <span key={tIndex} className="flex items-center gap-1 text-xs font-medium text-zinc-500 border border-zinc-800 bg-zinc-950/50 px-2 py-1 rounded">
                            <Tag size={12} /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-800/60 pt-6">
                      <div className="flex gap-6 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                          <Clock className="text-[#00D02C]" size={16} />
                          <span className="text-sm text-zinc-300 font-medium">{curso.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="text-[#00D02C]" size={16} />
                          <span className="text-sm text-zinc-300 font-medium truncate max-w-[150px] sm:max-w-xs">{curso.format}</span>
                        </div>
                      </div>
                      <button onClick={() => openQuoteModal(curso.title)} className="flex items-center justify-center gap-2 w-full md:w-auto shrink-0 bg-[#00D02C]/10 hover:bg-[#00D02C] text-[#00D02C] hover:text-zinc-950 border border-[#00D02C]/30 hover:border-[#00D02C] px-6 py-2.5 rounded-lg font-bold transition-colors group/btn">
                        Consultar Programa
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
              
              {filteredCursos.length === 0 && (
                <div className="text-center py-20 bg-zinc-900/40 rounded-2xl border border-zinc-800">
                  <p className="text-zinc-500 font-bold mb-2">No hay programas en esta categoría.</p>
                  <button onClick={() => setActiveCategory("Todos los Programas")} className="text-[#00D02C] hover:underline font-medium text-sm">
                    Ver todos los programas
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
            {/* Botón Cerrar Modal */}
            <button 
              onClick={() => setModalData(null)}
              className="absolute -top-3 -right-3 z-10 p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full shadow-lg border border-zinc-700 transition-colors"
            >
              <X size={20} />
            </button>
            <ContactForm title={modalData.title} defaultMessage={modalData.defaultMessage} />
          </div>
        </div>
      )}
    </main>
  );
}
