// app/incidencias/[id]/print/page.tsx
import { prisma } from "@/lib/db";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

async function getData(id: number) {
  return await prisma.incidencia.findUnique({ where: { id } });
}

export default async function PrintPage({ params }: { params: { id: string } }) {
  const incidencia = await getData(Number(params.id));

  if (!incidencia) {
    return <p>Incidencia no encontrada.</p>;
  }

  const tags = incidencia.tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  return (
    <div className="p-8 max-w-3xl mx-auto text-black bg-white">
      <h1 className="text-2xl font-bold mb-4">{incidencia.titulo}</h1>
      <p className="mb-2 text-gray-600">{incidencia.descripcion}</p>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {incidencia.solucionMd}
        </ReactMarkdown>
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="px-2 py-1 border rounded text-xs">
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
