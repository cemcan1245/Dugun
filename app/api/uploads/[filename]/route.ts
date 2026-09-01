import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { UPLOADS_DIR } from "@/lib/photos";

export const runtime = "nodejs";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".heif": "image/heif",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { filename: string } }
) {
  // path.basename ile dizin dışına çıkışı (path traversal) engelle
  const safeName = path.basename(params.filename);
  const filePath = path.join(UPLOADS_DIR, safeName);

  try {
    const file = await fs.readFile(filePath);
    const ext = path.extname(safeName).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Fotoğraf bulunamadı." }, { status: 404 });
  }
}
