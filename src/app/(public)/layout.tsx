import React from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { TrustBanner } from "@/components/ui/TrustBanner";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <TrustBanner />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </>
  );
}
