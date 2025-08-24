
# 📚 Knowledge Base IT Support

Un **Web App moderno** para documentar, buscar y gestionar soluciones técnicas de IT Support.  
Este proyecto forma parte de mi portafolio profesional como especialista en **Soporte Técnico** e **IT Help Desk**.

---

## 🚀 Características principales

✅ Registro de incidencias con campos como título, descripción, criticidad, estado y solución.  
✅ Editor con soporte **Markdown** para documentar soluciones técnicas de forma clara.  
✅ Filtros avanzados por criticidad, estado o búsqueda por palabra clave.  
✅ Listado de incidencias con etiquetas (#tags) para fácil categorización.  
✅ Vista de detalle con solución formateada en Markdown.  
✅ Exportación de cada incidencia a **versión imprimible** y **descarga en PDF** con Puppeteer.  
✅ UI futurista y minimalista, construida con **shadcn/ui**, **TailwindCSS** y **Framer Motion**.  

---

## 🛠️ Tecnologías utilizadas

- Next.js 14 (App Router)  
- TypeScript  
- Prisma ORM + SQLite (para persistencia de datos en desarrollo)  
- TailwindCSS + shadcn/ui (componentes modernos y estilos)  
- React Hook Form + Zod (validaciones en formularios)  
- React Markdown + Remark GFM (soporte de Markdown enriquecido)  
- Puppeteer (generación de PDFs)  

---

## 📂 Estructura del proyecto

knowledge-base-app/  
 ├── app/                  → Rutas principales de Next.js  
 │   ├── api/              → Endpoints (CRUD + PDF)  
 │   ├── incidencias/      → Páginas de incidencias (listado, detalle, nueva)  
 │   └── layout.tsx        → Layout base con navbar  
 ├── components/           → Componentes personalizados (ej. Filters)  
 ├── components/ui/        → Componentes de shadcn/ui  
 ├── lib/                  → Cliente de Prisma (db.ts)  
 ├── prisma/               → Esquema de base de datos  
 ├── public/               → Recursos estáticos  
 └── README.md  

---

## ⚙️ Instalación y uso

1. Clona este repositorio:
   git clone https://github.com/JovanPicado/knowledge-base-it-support.git
   cd knowledge-base-it-support

2. Instala dependencias:
   npm install

3. Configura el entorno:
   - Crea un archivo `.env` en la raíz con:
     DATABASE_URL="file:./prisma/dev.db"

4. Ejecuta migraciones de Prisma:
   npx prisma migrate dev --name init

5. Inicia el servidor:
   npm run dev

6. Abre en tu navegador:
   http://localhost:3000

---

## 🧪 Próximos pasos / Mejoras

- [ ] Autenticación de usuarios (para separar incidencias por persona).  
- [ ] Soporte de base de datos PostgreSQL en producción.  
- [ ] Dashboard con métricas de incidencias por categoría/criticidad.  
- [ ] Internacionalización (i18n) para inglés/español.  

---

## 👨‍💻 Autor

**Jovan Picado**  
- 💼 LinkedIn: https://www.linkedin.com/in/tu-perfil  
- 🐙 GitHub: https://github.com/JovanPicado  

---

> ⚡ Este proyecto es parte de mi portafolio como IT Support Engineer, mostrando mis habilidades en documentación de incidencias, desarrollo de herramientas internas y buenas prácticas en soporte técnico.
'@ | Out-File -Encoding UTF8 README.md; git add README.md; git commit -m "📝 Mejorado README con detalles del proyecto"; git push

