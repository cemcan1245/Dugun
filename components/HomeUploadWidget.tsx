"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PhotoUploadForm from "@/components/PhotoUploadForm";

export default function HomeUploadWidget() {
  const router = useRouter();
  const [justUploaded, setJustUploaded] = useState(false);

  function handleSuccess() {
    router.refresh();
    setJustUploaded(true);
    setTimeout(() => setJustUploaded(false), 3000);
  }

  return (
    <div>
      <PhotoUploadForm onSuccess={handleSuccess} />
      {justUploaded && (
        <p className="mt-3 text-sm text-center text-green-700">
          Teşekkürler! Fotoğraflarınız paylaşıldı.
        </p>
      )}
    </div>
  );
}
