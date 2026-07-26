import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ITA Limitada | Inspección NDT y Calificación de Soldadores",
  description: "Especialistas en ensayos no destructivos (NDT) y calificación de soldadores según AWS/ASME en La Serena y Coquimbo.",
  openGraph: {
    title: "ITA Limitada | Inspección NDT",
    description: "Especialistas en ensayos no destructivos (NDT) y calificación de soldadores en La Serena y Coquimbo.",
    url: "https://italimitada.cl",
    siteName: "ITA Limitada",
    images: [
      {
        url: "https://italimitada.cl/logo-ita.png",
        width: 800,
        height: 600,
      }
    ],
    locale: "es_CL",
    type: "website",
  },
};

const schemaJSON = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ITA Limitada - Inspección Técnica NDT y Servicios Integrales",
  "url": "https://italimitada.cl/",
  "telephone": "+56932277222",
  "email": "contacto@italimitada.cl",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "La Serena",
    "addressRegion": "Coquimbo",
    "addressCountry": "CL"
  },
  "department": [
    {
      "@type": "ProfessionalService",
      "name": "Departamento de Inspecciones Técnicas NDT",
      "email": "contacto@italimitada.cl"
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
