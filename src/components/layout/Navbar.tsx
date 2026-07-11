'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Nuestra Empresa', href: '/nuestra-empresa' },
  { name: 'Inspecciones Técnicas', href: '/inspecciones-tecnicas' },
  { name: 'Capacitaciones', href: '/cursos-capacitaciones-y-seminario' },
  { name: 'Contacto', href: '/contacto' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll to add a background blur effect when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 shadow-lg' : 'bg-transparent border-b border-transparent'}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between relative z-[60]">
        <Link href="/" className="flex items-center gap-2 relative z-[60]" onClick={() => setIsOpen(false)}>
          <Image src="/logo-ita.png" alt="ITA Limitada" width={220} height={60} style={{ width: 'auto', height: '55px' }} priority />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-zinc-300 font-medium hover:text-[#00D02C] transition-colors text-xs lg:text-sm uppercase tracking-wide whitespace-nowrap">
              {link.name}
            </Link>
          ))}
          <Link href="/certificados" className="ml-2 lg:ml-4 flex items-center gap-2 bg-[#00D02C] hover:bg-[#00b326] text-zinc-950 font-black px-4 py-2 lg:px-6 lg:py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,208,44,0.2)] hover:shadow-[0_0_20px_rgba(0,208,44,0.4)] hover:scale-105 whitespace-nowrap text-xs lg:text-sm">
            <ShieldCheck size={16} />
            VALIDAR CERTIFICADO
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden text-white p-2 relative z-[60]" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={36} /> : <Menu size={36} />}
        </button>
      </div>

      {/* High-End Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-center items-center overflow-y-auto pt-20 pb-10"
          >
            {/* Background Aesthetic Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#00D02C]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <nav className="flex flex-col items-center justify-center gap-8 w-full px-6 relative z-10 my-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                  className="w-full text-center"
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="block text-3xl sm:text-4xl font-black text-white hover:text-[#00D02C] transition-colors tracking-tight"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8 w-full max-w-sm"
              >
                <Link 
                  href="/certificados" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full bg-[#00D02C] text-zinc-950 font-black py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(0,208,44,0.3)] text-xl"
                >
                  <ShieldCheck size={28} />
                  PORTAL DE VALIDACIÓN
                </Link>
              </motion.div>
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pt-10 text-zinc-500 font-mono text-sm tracking-widest text-center relative z-10"
            >
              ITA LIMITADA © {new Date().getFullYear()}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
