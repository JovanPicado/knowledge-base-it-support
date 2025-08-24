// components/filters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export function Filters() {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  const [criticidad, setCriticidad] = useState(sp.get("criticidad") || "");
  const [estado, setEstado] = useState(sp.get("estado") || "");

  useEffect(() => {
    setQ(sp.get("q") || "");
    setCriticidad(sp.get("criticidad") || "");
    setEstado(sp.get("estado") || "");
  }, [sp]);

  function apply() {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (criticidad) p.set("criticidad", criticidad);
    if (estado) p.set("estado", estado);
    router.push(`/incidencias?${p.toString()}`);
  }

  return (
    <div className="glass rounded-xl p-4 grid gap-3 md:grid-cols-3">
      {/* Buscar */}
      <div>
        <label className="text-xs text-slate-400">Buscar</label>
        <Input
          placeholder="Error, palabra clave, comando..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
      </div>

      {/* Criticidad */}
      <div>
        <label className="text-xs text-slate-400">Criticidad</label>
        <Select
          value={criticidad || "all"}
          onValueChange={(v) => setCriticidad(v === "all" ? "" : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Baja">Baja</SelectItem>
            <SelectItem value="Media">Media</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Crítica">Crítica</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Estado */}
      <div>
        <label className="text-xs text-slate-400">Estado</label>
        <Select
          value={estado || "all"}
          onValueChange={(v) => setEstado(v === "all" ? "" : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Abierta">Abierta</SelectItem>
            <SelectItem value="En progreso">En progreso</SelectItem>
            <SelectItem value="Resuelta">Resuelta</SelectItem>
            <SelectItem value="Cerrada">Cerrada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botones */}
      <div className="md:col-span-3 flex flex-wrap items-center gap-2">
        <Badge
          className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={apply}
        >
          Aplicar
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer border border-slate-400 text-slate-200 hover:bg-slate-700"
          onClick={() => router.push("/incidencias")}
        >
          Limpiar
        </Badge>
      </div>
    </div>
  );
}
