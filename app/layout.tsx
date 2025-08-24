// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "KB Support — Knowledge Base",
  description: "Base de conocimiento para IT Support",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen text-slate-100 antialiased">
        <div className="neon-ring" />
        <nav className="sticky top-0 z-50 glass">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="text-lg font-semibold tracking-wide">
              <span className="text-indigo-400">KB</span> Support
            </div>
            <div className="space-x-4 text-sm">
              <a href="/" className="hover:underline">Inicio</a>
              <a href="/incidencias" className="hover:underline">Incidencias</a>
              <a href="/incidencias/nueva" className="hover:underline">Nueva</a>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-6xl p-4 md:p-8">{children}</main>
      </body>
    </html>
  );
}
