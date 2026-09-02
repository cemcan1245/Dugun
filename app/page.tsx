import { getPhotos } from "@/lib/photos";
import HomeUploadWidget from "@/components/HomeUploadWidget";

export const dynamic = "force-dynamic";

function formatDateTime(iso: string) {
  const date = new Date(iso);
  const datePart = date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} ${timePart}`;
}

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="text-center mb-10">
        <p className="uppercase tracking-[0.3em] text-rose text-xs mb-2">Anılarımız</p>
        <h1 className="text-4xl md:text-5xl mb-3">Nagehan&Cem-düğün</h1>
        <p className="text-ink/70">
          Karekodu okutan misafirlerimizin paylaştığı anlar burada.
        </p>
      </header>

      <div className="max-w-md mx-auto mb-12 bg-white/70 rounded-2xl p-5 shadow-sm border border-rose/10">
        <HomeUploadWidget />
      </div>

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
              <figcaption className="p-2 text-xs text-ink/70">
                <p className="truncate">{photo.uploaderName}</p>
                <p className="text-ink/50">{formatDateTime(photo.createdAt)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </main>
  );
}
