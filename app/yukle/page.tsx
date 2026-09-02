"use client";

import { useState } from "react";
import Link from "next/link";
import PhotoUploadForm from "@/components/PhotoUploadForm";

export default function UploadPage() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <main className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-3xl mb-4">Teşekkürler! 💛</h1>
        <p className="text-ink/70 mb-8">Fotoğraflarınız başarıyla paylaşıldı.</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setDone(false)}
            className="bg-rose text-white px-6 py-3 rounded-full"
          >
            Başka Fotoğraf Paylaş
          </button>
          <Link href="/" className="text-rose underline">
            Galeriyi Gör
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-3xl text-center mb-2">Fotoğraf Paylaş</h1>
      <p className="text-center text-ink/70 mb-8">
        Çektiğiniz anıları bizimle paylaşın.
      </p>

      <PhotoUploadForm onSuccess={() => setDone(true)} />

      <Link href="/" className="block text-center text-rose underline text-sm mt-6">
        Galeriye Dön
      </Link>
    </main>
  );
}
