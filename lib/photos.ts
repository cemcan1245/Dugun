import { promises as fs } from "fs";
import path from "path";

export type Photo = {
  id: string;
  filename: string;
  uploaderName: string;
  message: string;
  createdAt: string;
};

// Render gibi platformlarda tek bir kalıcı disk tek bir dizine bağlanabildiği
// için tüm veriler (fotoğraflar + metadata) tek bir "storage" dizini altında
// tutulur. Bu dizin public/ altında OLMADIĞI için fotoğraflar doğrudan statik
// olarak sunulamaz; app/api/uploads/[filename]/route.ts üzerinden servis edilir.
const STORAGE_DIR = process.env.DATA_DIR || path.join(process.cwd(), "storage");
const DATA_FILE = path.join(STORAGE_DIR, "photos.json");
export const UPLOADS_DIR = path.join(STORAGE_DIR, "uploads");

async function ensureStorage() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function getPhotos(): Promise<Photo[]> {
  await ensureStorage();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const photos: Photo[] = JSON.parse(raw);
  return photos.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addPhoto(photo: Photo): Promise<void> {
  await ensureStorage();
  const photos = await getPhotos();
  photos.push(photo);
  await fs.writeFile(DATA_FILE, JSON.stringify(photos, null, 2), "utf-8");
}
