import { ContactForm } from "@/components/forms/ContactForm";
import { ArrowRight, ShieldCheck, Calculator, BookOpen, MapPin, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-950 text-zinc-300">
      {/* Hero Section */}
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 text-white min-h-[calc(100dvh-80px)] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00d02c 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
              Ingeniería de Precisión y <span className="text-primary">Confiabilidad Corporativa</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 font-light leading-relaxed">
              Servicios especializados en Ensayos No Destructivos (NDT), Calificación de Soldadores bajo normativas internacionales y Soluciones Contables y Tributarias para el sector industrial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#solicitar" className="inline-flex justify-center items-center gap-2 bg-primary text-zinc-900 font-bold px-8 py-4 rounded-lg shadow-[0_0_15px_rgba(0,208,44,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,208,44,0.6)] text-lg">
                Solicitar Inspección <ArrowRight size={20} />
              </Link>
              <Link href="/certificados" className="inline-flex justify-center items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-8 py-4 rounded-lg transition-all border border-zinc-700 hover:border-zinc-600 text-lg">
                Validar Certificado
              </Link>
            </div>
          </div>
          
          <div id="solicitar" className="hidden lg:block">
             <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-3xl transform -rotate-6"></div>
                <div className="relative">
                  <ContactForm />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Mobile Form Section */}
      <section className="lg:hidden bg-zinc-950 py-12 px-4 border-b border-zinc-900">
        <div className="container mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* Bento Grid Services Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Nuestras Áreas de Especialidad</h2>
            <p className="text-zinc-400 text-lg">Entregamos soluciones integrales B2B, abarcando desde la validación técnica en terreno hasta la gestión financiera de su organización.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 hover:border-[#00D02C]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00D02C]/10 group-hover:border-[#00D02C]/30 transition-colors text-zinc-300 group-hover:text-primary">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-4">Inspecciones NDT</h3>
              <p className="text-zinc-400 mb-6 flex-1">
                Ejecutamos Ensayos No Destructivos y procesos de Calificación de Soldadores asegurando el cumplimiento estricto con estándares internacionales (AWS, ASME, API).
              </p>
              <Link href="/inspecciones-tecnicas" className="inline-flex items-center gap-2 text-white font-bold group-hover:text-primary transition-colors">
                Ver normativas <ArrowRight size={18} />
              </Link>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 hover:border-[#00D02C]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00D02C]/10 group-hover:border-[#00D02C]/30 transition-colors text-zinc-300 group-hover:text-primary">
                <Calculator size={28} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-4">Servicios Contables</h3>
              <p className="text-zinc-400 mb-6 flex-1">
                Asesorías contables y tributarias integrales. Gestionamos declaraciones de impuestos, auditorías financieras y remuneraciones con precisión corporativa.
              </p>
              <Link href="/servicios-contables" className="inline-flex items-center gap-2 text-white font-bold group-hover:text-primary transition-colors">
                Consultar asesoría <ArrowRight size={18} />
              </Link>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 hover:border-[#00D02C]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00D02C]/10 group-hover:border-[#00D02C]/30 transition-colors text-zinc-300 group-hover:text-primary">
                <BookOpen size={28} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-4">Capacitación</h3>
              <p className="text-zinc-400 mb-6 flex-1">
                Programas de formación industrial especializada para personal técnico, enfocados en normativas de seguridad, soldadura e inspección visual.
              </p>
              <Link href="/cursos-capacitaciones-y-seminario" className="inline-flex items-center gap-2 text-white font-bold group-hover:text-primary transition-colors">
                Conocer programas <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Zonas de Cobertura Industrial */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#00D02C]/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Zonas de Cobertura Industrial</h2>
            <p className="text-zinc-400 text-lg">Especializados en la Región de Coquimbo con capacidad de despliegue nacional para proyectos de gran envergadura.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur p-8 rounded-2xl shadow-sm border border-zinc-800 flex items-start gap-5 hover:border-zinc-700 transition-colors">
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-[#00D02C] shadow-inner">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Presencia Local Fuerte</h3>
                <p className="text-zinc-400">Base operativa en <strong>La Serena y Coquimbo</strong>, brindando tiempos de respuesta inmediatos para la industria minera, metalmecánica y construcción de la cuarta región.</p>
              </div>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur p-8 rounded-2xl shadow-sm border border-zinc-800 flex items-start gap-5 hover:border-zinc-700 transition-colors">
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-[#00D02C] shadow-inner">
                <Globe size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Proyección Nacional</h3>
                <p className="text-zinc-400">Capacidad técnica y logística para movilizar inspectores nivel II y III, y equipos de ultrasonido a cualquier instalación a lo largo de todo Chile.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes (FAQ) */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Preguntas Frecuentes (FAQ)</h2>
            <p className="text-zinc-400 text-lg">Respuestas rápidas para nuestros clientes corporativos y B2B.</p>
          </div>
          
          <div className="space-y-4">
            <details className="group border border-zinc-800 rounded-2xl bg-zinc-900/30 backdrop-blur [&_summary::-webkit-details-marker]:hidden hover:border-zinc-700 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-white font-bold text-lg">
                <span>¿Qué códigos regulan las inspecciones visuales?</span>
                <ChevronDown className="transition duration-300 group-open:-rotate-180 text-[#00D02C] shrink-0" size={24} />
              </summary>
              <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-lg">
                Bajo código ASME V, Artículo 9.
              </div>
            </details>

            <details className="group border border-zinc-800 rounded-2xl bg-zinc-900/30 backdrop-blur [&_summary::-webkit-details-marker]:hidden hover:border-zinc-700 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-white font-bold text-lg">
                <span>¿Cuál es el periodo de vigencia de las calificaciones de soldadores?</span>
                <ChevronDown className="transition duration-300 group-open:-rotate-180 text-[#00D02C] shrink-0" size={24} />
              </summary>
              <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-lg">
                La verificación y vigencia en plataforma estará disponible por un periodo estricto de un año.
              </div>
            </details>

            <details className="group border border-zinc-800 rounded-2xl bg-zinc-900/30 backdrop-blur [&_summary::-webkit-details-marker]:hidden hover:border-zinc-700 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-white font-bold text-lg">
                <span>¿Qué costo tiene la emisión o copia física/digital del certificado de calificación?</span>
                <ChevronDown className="transition duration-300 group-open:-rotate-180 text-[#00D02C] shrink-0" size={24} />
              </summary>
              <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-lg">
                Tiene un costo de $12.000 CLP y se procesa automáticamente en nuestro portal de validación a través de Webpay Plus.
              </div>
            </details>
          </div>
        </div>
      </section>

    </main>
  );
}
