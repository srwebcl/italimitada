import React from 'react';
import { Building, Target, Eye, Shield, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function NuestraEmpresa() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300">
      
      {/* Hero Header */}
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 py-24 relative border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00d02c 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center justify-center p-4 bg-zinc-900/80 border border-zinc-800 rounded-full mb-8 shadow-xl text-[#00D02C]">
            <Building size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
            Respaldando la Industria desde 2018.
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
            Somos el socio estratégico de mayor confianza en el norte de Chile para servicios B2B de ingeniería NDT y gestión corporativa.
          </p>
        </div>
      </section>

      {/* Alternating Layout (Storytelling) */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl space-y-24">
          
          {/* Historia - Imagen Derecha */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#00D02C] font-bold tracking-widest uppercase text-sm mb-2">
                <Shield size={16} /> Nuestra Historia
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Fundación y Trayectoria</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Inspección Técnica NDT y Servicios Integrales Limitada, conocida comercialmente como ITA Limitada, fue <strong className="text-white">fundada en abril de 2018 en la ciudad de La Serena</strong>, Región de Coquimbo.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Nacimos con la firme convicción de proveer servicios de alta especialización técnica para la industria de la construcción, minería y metalmecánica. Desde nuestros inicios, hemos forjado nuestra reputación basándonos en la estricta adherencia a normativas internacionales y la entrega de soluciones integrales.
              </p>
            </div>
            <div className="w-full md:w-5/12 aspect-[4/5] bg-zinc-900 rounded-3xl border border-zinc-800 relative overflow-hidden flex items-center justify-center p-8 group">
               <Image 
                 src="/images/empresa/historia-ndt.png" 
                 alt="Ingeniero NDT inspeccionando tubería" 
                 fill 
                 priority
                 sizes="(max-width: 768px) 100vw, 40vw"
                 className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
               {/* Decorative Element representing History/Time */}
               <div className="w-full h-full border border-zinc-800/50 rounded-2xl flex flex-col justify-end p-6 bg-gradient-to-t from-zinc-950/80 to-transparent relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-full h-px bg-zinc-800 mb-4"></div>
                  <div className="flex justify-between items-center text-zinc-300 font-mono text-sm">
                    <span>EST. 2018</span>
                    <span>LA SERENA, CL</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Misión - Imagen Izquierda */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#00D02C] font-bold tracking-widest uppercase text-sm mb-2">
                <Target size={16} /> Nuestro Propósito
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">La Misión de ITA</h2>
              <p className="text-zinc-400 text-lg leading-relaxed border-l-2 border-[#00D02C] pl-6 py-2 bg-gradient-to-r from-[#00D02C]/5 to-transparent">
                Proveer servicios de inspección técnica y calificación de soldadores con el más alto nivel de excelencia, rigor normativo y ética profesional. 
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Nos comprometemos a garantizar la seguridad, calidad y confiabilidad operativa de los proyectos de nuestros clientes, apoyando simultáneamente su solidez financiera mediante soluciones integrales y transparentes adaptadas a las exigencias corporativas de la industria moderna.
              </p>
            </div>
            <div className="w-full md:w-5/12 aspect-square bg-zinc-900 rounded-full border-4 border-zinc-950 shadow-[0_0_0_1px_rgba(39,39,42,1)] relative overflow-hidden flex items-center justify-center group">
               <Image 
                 src="/images/empresa/mision-welding.png" 
                 alt="Detalle proceso de soldadura" 
                 fill 
                 sizes="(max-width: 768px) 100vw, 40vw"
                 className="object-cover opacity-70 mix-blend-screen group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
               />
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(9,9,11,1)_100%)]"></div>
            </div>
          </div>

          {/* Visión - Centro (Hero Banner Type) */}
          <div className="bg-zinc-900/40 backdrop-blur border border-zinc-800 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden mt-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#00D02C]/10 rounded-full blur-[100px]"></div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-2xl mb-8 text-white relative z-10">
              <Eye size={24} />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-8 relative z-10">Visión a Futuro</h2>
            <p className="text-zinc-400 text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto relative z-10">
              Consolidarnos como la empresa líder y el socio estratégico de mayor confianza en Chile. Aspiramos a establecer el estándar de la industria mediante la innovación continua, la digitalización de nuestros procesos de validación técnica y la formación incesante de nuestro capital humano.
            </p>
          </div>

        </div>
      </section>
      
    </main>
  );
}
