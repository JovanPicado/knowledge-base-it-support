// app/incidencias/[id]/page.tsx
import { prisma } from "@/lib/db";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function getData(id: number) {
  const incidencia = await prisma.incidencia.findUnique({ where: { id } });
  return incidencia;
}

export default async function IncidenciaDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const incidencia = await getData(id);

  if (!incidencia) {
    return (
      <div className="glass rounded-xl p-4">
        <p className="text-sm text-slate-300">
          Incidencia no encontrada.{" "}
          <Link href="/incidencias" className="underline">Volver al listado</Link>
        </p>
      </div>
    );
  }

  const tags = incidencia.tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  return (
    <div className="grid gap-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          #{incidencia.id} — {incidencia.titulo}
        </h1>
        <div className="flex gap-2">
          {/* Criticidad con colores */}
          <Badge
            className={
              incidencia.criticidad === "Alta"
                ? "bg-red-600 text-white"
                : incidencia.criticidad === "Media"
                ? "bg-yellow-400 text-black"
                : incidencia.criticidad === "Baja"
                ? "bg-green-600 text-white"
                : "bg-slate-500 text-white"
            }
          >
            {incidencia.criticidad}
          </Badge>
          <Badge className="bg-indigo-600 text-white">{incidencia.estado}</Badge>
        </div>
      </div>

      {/* Descripción */}
      <div className="glass rounded-xl p-4">
        <div className="text-sm text-slate-300">
          <div className="mb-2">
            <strong>Categoría:</strong> {incidencia.categoria}
          </div>
          <p>{incidencia.descripcion}</p>
        </div>
      </div>

      {/* Solución en Markdown */}
      <div className="rounded-xl border border-white/10 p-4 bg-white/5 prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {incidencia.solucionMd}
        </ReactMarkdown>
      </div>

      {/* Acciones */}
      <div className="flex gap-3">
        {/* Corregimos el botón: ahora visible en azul */}
        <Button asChild className="bg-indigo-600 text-white hover:bg-indigo-700">
          <Link href={`/incidencias/${id}/print`} target="_blank">
            Ver versión imprimible
          </Link>
        </Button>
        <Button asChild className="bg-green-600 text-white hover:bg-green-700">
          <a href={`/api/incidencias/${id}/pdf`} target="_blank" rel="noopener">
            Descargar PDF
          </a>
        </Button>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {tags.map((t) => (
            <Badge key={t} className="bg-indigo-500 text-white hover:bg-indigo-600">
              #{t}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
