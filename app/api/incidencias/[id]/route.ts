// app/api/incidencias/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const incidencia = await prisma.incidencia.findUnique({ where: { id } });
  if (!incidencia) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  return NextResponse.json({ incidencia });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await req.json();
  const updated = await prisma.incidencia.update({
    where: { id },
    data: {
      titulo: data.titulo,
      descripcion: data.descripcion,
      solucionMd: data.solucionMd,
      tags: Array.isArray(data.tags) ? data.tags : [],
      categoria: data.categoria,
      criticidad: data.criticidad,
      estado: data.estado,
    },
  });
  return NextResponse.json({ incidencia: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  await prisma.incidencia.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
