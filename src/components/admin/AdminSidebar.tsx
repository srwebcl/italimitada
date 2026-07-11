'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FilePlus2, Files, Settings, LogOut, UserCircle } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/admin-panel', icon: LayoutDashboard },
    { name: 'Emitir Certificado', href: '/admin-panel/emitir', icon: FilePlus2 },
    { name: 'Certificados Emitidos', href: '/admin-panel/certificados', icon: Files },
  ];

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex-col hidden md:flex h-screen sticky top-0">
      <div className="mb-10 flex flex-col items-start gap-4">
        <Link href="/admin-panel">
          <div className="bg-white p-3 rounded-xl inline-block shadow-sm">
            <Image 
              src="/logo-ita.png" 
              alt="Logo ITA Limitada" 
              width={140} 
              height={50} 
              className="object-contain"
            />
          </div>
        </Link>
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold ml-1">Admin Portal</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-[#00D02C]/10 text-[#00D02C] border border-[#00D02C]/20 shadow-[0_0_10px_rgba(0,208,44,0.1)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent'
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Profile Avatar Dropdown */}
      <div className="mt-auto relative" ref={dropdownRef}>
        {isDropdownOpen && (
          <div className="absolute bottom-full left-0 w-full mb-3 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in slide-in-from-bottom-2">
            <Link 
              href="/admin-panel/perfil" 
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Settings size={16} />
              Administrar Perfil
            </Link>
            <div className="h-px bg-zinc-800/50 mx-2 my-1"></div>
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </Link>
          </div>
        )}
        
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border text-left ${
            isDropdownOpen ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00D02C] to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Administrador</p>
            <p className="text-xs text-zinc-500 font-medium truncate">admin@italimitada.cl</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
