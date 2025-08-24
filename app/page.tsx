// app/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-6">
      <section className="glass rounded-2xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Base de Conocimiento — IT Support
        </h1>
        <p className="text-slate-300 mb-6 max-w-2xl">
          Documenta tus incidencias, soluciones y aprendizajes. Búsqueda rápida, filtros potentes y exportación a PDF.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/incidencias/nueva">Registrar incidencia</Link>
          </Button>
          <Button asChild variant="secondary">
  <Link href="/incidencias">Ver todas</Link>
</Button>

        </div>
      </section>

      <Card className="glass border-transparent">
        <CardContent className="p-6">
          <p className="text-sm text-slate-300">
            Tip: usa etiquetas como <span className="text-indigo-400">“network”</span>, <span className="text-indigo-400">“windows”</span>, <span className="text-indigo-400">“printer”</span> para encontrar soluciones más rápido.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
