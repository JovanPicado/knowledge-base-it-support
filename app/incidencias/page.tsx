// app/incidencias/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Filters } from "@/components/filters";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Obtener incidencias desde la BD con filtros opcionales
async function getData(searchParams: Record<string, string | string[] | undefined>) {
  const { q = "", criticidad = "", estado = "" } = searchParams;

  const where: any = {};
  const qv = typeof q === "string" ? q.trim() : "";
  if (qv) {
    where.OR = [
      { titulo: { contains: qv } },
      { descripcion: { contains: qv } },
      { solucionMd: { contains: qv } },
    ];
  }
  if (criticidad) where.criticidad = criticidad;
  if (estado) where.estado = estado;

  const incidencias = await prisma.incidencia.findMany({
    where,
    orderBy: { actualizadoEn: "desc" },
  });

  return incidencias;
}

export default async function IncidenciasPage({ searchParams }: { searchParams: any }) {
  const incidencias = await getData(searchParams);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Incidencias</h1>
      <Filters />

      <div className="glass rounded-xl p-4">
        <div className="grid gap-3">
          {incidencias.length === 0 && (
            <p className="text-slate-400 text-sm">No hay resultados. Registra tu primera incidencia.</p>
          )}
          {incidencias.map((i) => (
            <Link
              key={i.id}
              href={`/incidencias/${i.id}`}
              className="block rounded-lg p-4 hover:bg-white/5 border border-white/5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{i.titulo}</h3>
                <div className="flex gap-2">
                  {/* Criticidad con colores */}
                  <Badge
                    className={
                      i.criticidad === "Alta"
                        ? "bg-red-600 text-white"
                        : i.criticidad === "Media"
                        ? "bg-yellow-400 text-black"
                        : i.criticidad === "Baja"
                        ? "bg-green-600 text-white"
                        : "bg-slate-500 text-white"
                    }
                  >
                    {i.criticidad}
                  </Badge>
                  <Badge className="bg-indigo-600 text-white">{i.estado}</Badge>
                </div>
              </div>

              <p className="text-sm text-slate-300 mt-1 line-clamp-2">{i.descripcion}</p>

              <div className="text-xs text-slate-400 mt-2">
                Actualizado:{" "}
                {format(new Date(i.actualizadoEn), "d MMM yyyy HH:mm", { locale: es })}
              </div>

              {/* Tags visibles */}
              <div className="mt-2 flex gap-2 flex-wrap">
                {i.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter((t) => t.length > 0)
                  .map((t) => (
                    <Badge key={t} className="bg-indigo-500 text-white hover:bg-indigo-600">
                      #{t}
                    </Badge>
                  ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
