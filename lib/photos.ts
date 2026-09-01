import { promises as fs } from "fs";
import path from "path";

export type Photo = {
  id: string;
  filename: string;
  uploaderName: string;
  message: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "photos.json");
export const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
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
