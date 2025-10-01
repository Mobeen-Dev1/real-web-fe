'use client';

import { LenisProvider } from "@/utils/lenis-provider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      {children}
    </LenisProvider>
  );
}

