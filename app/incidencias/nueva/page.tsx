// app/incidencias/nueva/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NuevaIncidenciaPage() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [solucionMd, setSolucionMd] = useState("");
  const [tags, setTags] = useState("");
  const [categoria, setCategoria] = useState("General");
  const [criticidad, setCriticidad] = useState("Media");
  const [estado, setEstado] = useState("Abierta");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const resp = await fetch("/api/incidencias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        descripcion,
        solucionMd,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        categoria,
        criticidad,
        estado,
      }),
    });
    setSaving(false);
    if (!resp.ok) {
      alert("Error al guardar");
      return;
    }
    const json = await resp.json();
    router.push(`/incidencias/${json.incidencia.id}`);
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Nueva incidencia</h1>

      <div className="glass rounded-xl p-4 grid gap-3">
        <div>
          <label className="text-xs text-slate-400">Título</label>
          <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej: Error de impresión en red (HP 402dn)" />
        </div>

        <div>
          <label className="text-xs text-slate-400">Descripción breve</label>
          <Textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Resumen del problema encontrado..." rows={3} />
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-400">Categoría</label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Network">Network</SelectItem>
                <SelectItem value="Windows">Windows</SelectItem>
                <SelectItem value="Hardware">Hardware</SelectItem>
                <SelectItem value="Impresoras">Impresoras</SelectItem>
                <SelectItem value="Seguridad">Seguridad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-slate-400">Criticidad</label>
            <Select value={criticidad} onValueChange={setCriticidad}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Baja">Baja</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Crítica">Crítica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-slate-400">Estado</label>
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Abierta">Abierta</SelectItem>
                <SelectItem value="En progreso">En progreso</SelectItem>
                <SelectItem value="Resuelta">Resuelta</SelectItem>
                <SelectItem value="Cerrada">Cerrada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400">Tags (separados por coma)</label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="network, printer, hp, tcp/ip" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-slate-400">Solución (Markdown)</label>
            <button className="text-xs underline" onClick={() => setPreview(!preview)}>
              {preview ? "Editar" : "Previsualizar"}
            </button>
          </div>

          {preview ? (
            <div className="rounded-md border border-white/10 p-4 bg-white/5 prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{solucionMd || "_(Vacío)_"}</ReactMarkdown>
            </div>
          ) : (
            <Textarea rows={12} value={solucionMd} onChange={(e) => setSolucionMd(e.target.value)} placeholder={`## Pasos\n1. ...\n2. ...\n\n### Comandos\n\`\`\`powershell\nGet-Printer\n\`\`\`\n\n### Resultado\n...`} />
          )}
        </div>

        <div className="pt-2">
          <Button disabled={saving} onClick={save}>
            {saving ? "Guardando..." : "Guardar incidencia"}
          </Button>
        </div>
      </div>
    </div>
  );
}
