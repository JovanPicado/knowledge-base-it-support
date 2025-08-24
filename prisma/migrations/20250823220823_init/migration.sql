-- CreateTable
CREATE TABLE "Incidencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "solucionMd" TEXT NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '',
    "categoria" TEXT NOT NULL DEFAULT 'General',
    "criticidad" TEXT NOT NULL DEFAULT 'Media',
    "estado" TEXT NOT NULL DEFAULT 'Abierta',
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME NOT NULL
);
