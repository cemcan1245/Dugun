import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { addPhoto, UPLOADS_DIR } from "@/lib/photos";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const MAX_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File);
  const uploaderName = (formData.get("uploaderName") as string) || "İsimsiz Misafir";
  const message = (formData.get("message") as string) || "";

  if (files.length === 0) {
    return NextResponse.json({ error: "Lütfen en az bir fotoğraf seçin." }, { status: 400 });
  }

  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const saved: string[] = [];
  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      continue;
    }
    if (file.size > MAX_SIZE) {
      continue;
    }
    const ext = path.extname(file.name) || ".jpg";
    const id = uuidv4();
    const filename = `${id}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);

    await addPhoto({
      id,
      filename,
      uploaderName: uploaderName.slice(0, 60),
      message: message.slice(0, 200),
      createdAt: new Date().toISOString(),
    });
    saved.push(filename);
  }

  if (saved.length === 0) {
    return NextResponse.json(
      { error: "Desteklenmeyen dosya türü ya da boyutu çok büyük." },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, uploaded: saved.length });
}
