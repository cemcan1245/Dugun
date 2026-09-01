import Link from "next/link";
import { getPhotos } from "@/lib/photos";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="text-center mb-10">
        <p className="uppercase tracking-[0.3em] text-rose text-xs mb-2">Anılarımız</p>
        <h1 className="text-4xl md:text-5xl mb-3">Düğün Fotoğrafları</h1>
        <p className="text-ink/70">
          Karekodu okutan misafirlerimizin paylaştığı anlar burada.
        </p>
        <Link
          href="/yukle"
          className="inline-block mt-6 bg-rose text-white px-6 py-3 rounded-full shadow hover:opacity-90 transition"
        >
          Fotoğraf Yükle
        </Link>
      </header>

      {photos.length === 0 ? (
        <p className="text-center text-ink/60">
          Henüz fotoğraf paylaşılmadı. İlk paylaşan siz olun!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <figure
              key={photo.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-rose/10"
            >
              <img
                src={`/api/uploads/${photo.filename}`}
                alt={photo.message || photo.uploaderName}
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
              <figcaption className="p-2 text-xs text-ink/70 truncate">
                {photo.uploaderName}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </main>
  );
}
