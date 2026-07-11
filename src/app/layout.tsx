import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ITA Limitada | Inspección NDT, Calificación de Soldadores y Contabilidad",
  description: "Especialistas en ensayos no destructivos (NDT), calificación de soldadores según AWS/ASME y asesorías contables tributarias en La Serena y Coquimbo.",
};

const schemaJSON = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ITA Limitada - Inspección Técnica NDT y Servicios Integrales",
  "url": "https://italimitada.cl/",
  "telephone": "+56932277222",
  "email": "info@italimitada.cl",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "La Serena",
    "addressRegion": "Coquimbo",
    "addressCountry": "CL"
  },
  "department": [
    {
      "@type": "AccountingService",
      "name": "Departamento de Contabilidad",
      "email": "plafitte@italimitada.cl"
    },
    {
      "@type": "ProfessionalService",
      "name": "Departamento de Inspecciones Técnicas",
      "email": "jolavarria@italimitada.cl"
    }
  ]
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJSON) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
