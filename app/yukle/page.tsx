"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploaderName, setUploaderName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(e.target.files || []));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (files.length === 0) {
      setErrorMsg("Lütfen en az bir fotoğraf seçin.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));
    formData.append("uploaderName", uploaderName);
    formData.append("message", message);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız oldu.");
      setStatus("done");
      setFiles([]);
      setMessage("");
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  }

  if (status === "done") {
    return (
      <main className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-3xl mb-4">Teşekkürler! 💛</h1>
        <p className="text-ink/70 mb-8">Fotoğraflarınız başarıyla paylaşıldı.</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setStatus("idle")}
            className="bg-rose text-white px-6 py-3 rounded-full"
          >
            Başka Fotoğraf Yükle
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-ink/70">Adınız (opsiyonel)</label>
          <input
            type="text"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            placeholder="Adınız Soyadınız"
            className="w-full rounded-lg border border-rose/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose"
            maxLength={60}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-ink/70">Not (opsiyonel)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Kısa bir mesaj bırakın"
            className="w-full rounded-lg border border-rose/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose"
            rows={2}
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-ink/70">Fotoğraflar</label>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            onChange={handleFilesChange}
            className="w-full rounded-lg border border-rose/30 px-4 py-3 bg-white"
          />
          {files.length > 0 && (
            <p className="text-xs text-ink/60 mt-1">{files.length} dosya seçildi</p>
          )}
        </div>

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-rose text-white px-6 py-3 rounded-full shadow hover:opacity-90 transition disabled:opacity-50"
        >
          {status === "sending" ? "Yükleniyor..." : "Paylaş"}
        </button>

        <Link href="/" className="block text-center text-rose underline text-sm">
          Galeriye Dön
        </Link>
      </form>
    </main>
  );
}
