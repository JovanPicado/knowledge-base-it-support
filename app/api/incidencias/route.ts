// app/api/incidencias/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";
  const criticidad = searchParams.get("criticidad") || undefined;
  const estado = searchParams.get("estado") || undefined;
  const tag = searchParams.get("tag") || undefined;

  const where: any = {};

  if (q) {
    // Búsqueda simple: título o descripción contienen q
    where.OR = [
      { titulo: { contains: q, mode: "insensitive" } },
      { descripcion: { contains: q, mode: "insensitive" } },
      { solucionMd: { contains: q, mode: "insensitive" } },
    ];
  }
  if (criticidad) where.criticidad = criticidad;
  if (estado) where.estado = estado;
  if (tag) where.tags = { has: tag };

  const incidencias = await prisma.incidencia.findMany({
    where,
    orderBy: { actualizadoEn: "desc" },
  });

  return NextResponse.json({ incidencias });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Validaciones mínimas
  if (!data.titulo || !data.descripcion || !data.solucionMd) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const nueva = await prisma.incidencia.create({
    data: {
    titulo: data.titulo,
    descripcion: data.descripcion,
    solucionMd: data.solucionMd,
    tags: Array.isArray(data.tags) ? data.tags.join(",") : (data.tags || ""),
    categoria: data.categoria || "General",
    criticidad: data.criticidad || "Media",
    estado: data.estado || "Abierta",
  },
  });

  return NextResponse.json({ incidencia: nueva }, { status: 201 });
}
