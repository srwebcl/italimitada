import React from 'react';

export function TrustBanner() {
  const items = [
    "NCh ISO 17.020:2012",
    "AWS D1.1",
    "ASME IX",
    "API 1104",
    "ASTM E-165",
    "ASNT SNT-TC-1A"
  ];

  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-zinc-950 text-zinc-500 py-1.5 overflow-hidden border-b border-zinc-900 relative flex items-center">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      
      <div className="absolute left-0 top-0 bottom-0 z-10 bg-zinc-950 text-zinc-400 px-4 md:px-6 flex items-center font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-[10px_0_20px_-5px_rgba(0,0,0,0.8)] border-r border-zinc-900">
        Estándares / Normativas
      </div>

      <div className="flex w-max animate-marquee ml-[190px] md:ml-[240px]">
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="font-medium text-[10px] md:text-xs tracking-widest whitespace-nowrap opacity-80 hover:opacity-100 hover:text-[#00D02C] transition-colors cursor-default">
              {item}
            </span>
            <span className="mx-8 font-light opacity-20">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
