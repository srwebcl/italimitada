import { ContactForm } from "@/components/forms/ContactForm";
import { ArrowRight, ShieldCheck, Calculator, BookOpen, MapPin, Globe, ChevronDown, Target, Building2, Wrench, Pickaxe, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-950 text-zinc-300">
      {/* Hero Section */}
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 text-white min-h-[calc(100dvh-80px)] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00d02c 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 w-full max-w-full">
            {/* The H1 is configured to force two lines on medium+ screens */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight mb-6 leading-tight text-white whitespace-pre-line sm:whitespace-normal">
              Ingeniería de Precisión y{" "}
              <br className="hidden lg:block" />
              <span className="text-[#00D02C]">Confiabilidad Corporativa</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 font-light leading-relaxed max-w-2xl">
              Servicios especializados en Ensayos No Destructivos (NDT) y Calificación de Soldadores bajo normativas internacionales para el sector industrial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#solicitar" className="inline-flex justify-center items-center gap-2 bg-[#00D02C] text-zinc-950 font-black px-8 py-4 rounded-lg shadow-[0_0_15px_rgba(0,208,44,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,208,44,0.6)] text-lg uppercase tracking-wide">
                Solicitar Inspección <ArrowRight size={20} />
              </Link>
              <Link href="/certificados" className="inline-flex justify-center items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-lg transition-all border border-zinc-700 hover:border-zinc-500 text-lg uppercase tracking-wide">
                Validar Certificado
              </Link>
            </div>
          </div>
          
          {/* We hide the hero form on extremely small screens if desired, but here we keep it standard */}
          <div id="solicitar" className="hidden lg:block lg:col-span-5">
             <div className="relative">
                <div className="absolute inset-0 bg-[#00D02C]/10 rounded-2xl blur-3xl transform -rotate-6"></div>
                <div className="relative">
                  <ContactForm />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Mobile Form Section */}
      <section className="lg:hidden bg-zinc-950 py-12 px-4 border-b border-zinc-900 relative">
        <div className="container mx-auto max-w-lg">
          <ContactForm />
        </div>
      </section>

      {/* Industrias Section (NUEVA) */}
      <section className="py-24 bg-zinc-950 border-b border-zinc-900 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#00D02C] font-bold tracking-widest uppercase text-sm mb-4">
              <Building2 size={16} /> Sectores Estratégicos
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Industrias que Atendemos</h2>
            <p className="text-zinc-400 text-lg">Soluciones adaptadas a las exigencias operativas y normativas de los sectores más críticos de la economía.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Minería */}
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-80 border border-zinc-800 bg-zinc-900 cursor-pointer">
              <Image src="/images/home/mining.png" alt="Industria Minera" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <Pickaxe className="text-[#00D02C]" size={24} />
                  <h3 className="text-xl font-bold text-white">Minería</h3>
                </div>
                <p className="text-zinc-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Evaluación de equipos pesados, molinos y estructuras sometidas a alta fatiga.</p>
              </div>
            </div>
            {/* Metalmecánica */}
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-80 border border-zinc-800 bg-zinc-900 cursor-pointer">
              <Image src="/images/home/metal.png" alt="Industria Metalmecánica" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <Wrench className="text-[#00D02C]" size={24} />
                  <h3 className="text-xl font-bold text-white">Metalmecánica</h3>
                </div>
                <p className="text-zinc-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Control de calidad en maestranzas, calificación de procedimientos (WPS) y soldadores.</p>
              </div>
            </div>
            {/* Construcción */}
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-80 border border-zinc-800 bg-zinc-900 cursor-pointer">
              <Image src="/images/home/construction.png" alt="Industria Construcción" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="text-[#00D02C]" size={24} />
                  <h3 className="text-xl font-bold text-white">Infraestructura</h3>
                </div>
                <p className="text-zinc-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Inspección de estructuras metálicas, puentes y piping bajo normativas API/AWS.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor (NUEVA) */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 text-[#00D02C] font-bold tracking-widest uppercase text-sm">
                <Target size={16} /> El Estándar ITA
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Certidumbre Técnica en Cada Inspección
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                No somos solo un proveedor de servicios, somos su socio estratégico en el aseguramiento de calidad. Combinamos tecnología avanzada con inspectores altamente cualificados para entregar resultados irrefutables.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[#00D02C]/10 p-1.5 rounded-full text-[#00D02C] shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Rigor Normativo Internacional</h4>
                    <p className="text-zinc-400 text-sm">Evaluaciones estrictas bajo códigos ASME, AWS, API y ASTM. Sin atajos, solo datos duros y exactos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[#00D02C]/10 p-1.5 rounded-full text-[#00D02C] shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Tiempos de Respuesta Críticos</h4>
                    <p className="text-zinc-400 text-sm">Entendemos el valor del tiempo en paradas de planta. Emitimos reportes y certificados con agilidad corporativa.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[#00D02C]/10 p-1.5 rounded-full text-[#00D02C] shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Validación Digital Inmediata</h4>
                    <p className="text-zinc-400 text-sm">Nuestra plataforma permite la verificación de calificaciones en tiempo real vía código QR, evitando falsificaciones.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 relative z-10 shadow-2xl">
                <Image src="/images/home/inspector.png" alt="Inspector de Calidad ITA" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/80 to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#00D02C]/20 blur-[100px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Services Section */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Nuestras Áreas de Especialidad</h2>
            <p className="text-zinc-400 text-lg">Entregamos soluciones integrales B2B, especializándonos en la validación técnica y formación en terreno de su organización.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 hover:border-[#00D02C]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00D02C]/10 group-hover:border-[#00D02C]/30 transition-colors text-zinc-300 group-hover:text-[#00D02C]">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-4">Inspecciones NDT</h3>
              <p className="text-zinc-400 mb-6 flex-1">
                Ejecutamos Ensayos No Destructivos y procesos de Calificación de Soldadores asegurando el cumplimiento estricto con estándares internacionales (AWS, ASME, API).
              </p>
              <Link href="/inspecciones-tecnicas" className="inline-flex items-center gap-2 text-white font-bold group-hover:text-[#00D02C] transition-colors">
                Ver normativas <ArrowRight size={18} />
              </Link>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 hover:border-[#00D02C]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00D02C]/10 group-hover:border-[#00D02C]/30 transition-colors text-zinc-300 group-hover:text-[#00D02C]">
                <BookOpen size={28} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-4">Capacitación</h3>
              <p className="text-zinc-400 mb-6 flex-1">
                Programas de formación industrial especializada para personal técnico, enfocados en normativas de seguridad, soldadura e inspección visual.
              </p>
              <Link href="/cursos-capacitaciones-y-seminario" className="inline-flex items-center gap-2 text-white font-bold group-hover:text-[#00D02C] transition-colors">
                Conocer programas <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Final (NUEVA) */}
      <section className="py-24 bg-[url('/images/home/metal.png')] bg-cover bg-fixed bg-center relative border-y border-[#00D02C]/30">
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                Asegure la Calidad <br/>
                <span className="text-[#00D02C]">de su Proyecto Hoy</span>
              </h2>
              <p className="text-lg text-zinc-300 mb-8 max-w-md">
                Comuníquese con nuestros expertos. Evaluaremos sus requerimientos normativos y le enviaremos una propuesta técnico-comercial detallada.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  <MapPin className="text-[#00D02C]" size={24} />
                  <div>
                    <p className="text-white font-bold text-sm">Operaciones Centrales</p>
                    <p className="text-zinc-400 text-sm">La Serena & Coquimbo, Chile</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  <Globe className="text-[#00D02C]" size={24} />
                  <div>
                    <p className="text-white font-bold text-sm">Despliegue Técnico</p>
                    <p className="text-zinc-400 text-sm">Cobertura Nacional para proyectos B2B</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="bg-zinc-950/90 p-1 md:p-4 rounded-3xl border border-zinc-800 shadow-2xl">
                <ContactForm title="Solicitar Cotización Formal" defaultMessage="Junto con saludar, solicito una propuesta técnico-comercial para servicios de..." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes (FAQ) */}
      <section className="py-24 bg-zinc-950">
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
