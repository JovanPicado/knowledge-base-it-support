// app/api/incidencias/[id]/pdf/route.ts
import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export const dynamic = "force-dynamic"; // asegura SSR y evita caché

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const base = req.nextUrl.origin;
  const printUrl = `${base}/incidencias/${id}/print`;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(printUrl, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "16mm", bottom: "16mm", left: "14mm", right: "14mm" },
    });

    return new Response(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="incidencia-${id}.pdf"`,
      },
    });
  } finally {
    await browser.close();
  }
}
