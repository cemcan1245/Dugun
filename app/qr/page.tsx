import { headers } from "next/headers";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

async function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = headers();
  const host = h.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export default async function QrPage() {
  const siteUrl = await getSiteUrl();
  const uploadUrl = `${siteUrl}/yukle`;
  const qrDataUrl = await QRCode.toDataURL(uploadUrl, {
    width: 600,
    margin: 2,
    color: { dark: "#3b2f2f", light: "#ffffff" },
  });

  return (
    <main className="mx-auto max-w-md px-4 py-10 text-center">
      <h1 className="text-3xl mb-2">Karekod</h1>
      <p className="text-ink/70 mb-6">
        Bu kodu masalara, davetiyelere ya da düğün salonunda bir panoya
        yazdırabilirsiniz. Okutulduğunda misafirler doğrudan yükleme
        sayfasına yönlendirilir.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow inline-block">
        <img src={qrDataUrl} alt="Karekod" className="w-64 h-64 mx-auto" />
      </div>

      <p className="mt-4 text-sm text-ink/60 break-all">{uploadUrl}</p>

      <a
        href={qrDataUrl}
        download="dugun-karekod.png"
        className="inline-block mt-6 bg-rose text-white px-6 py-3 rounded-full shadow hover:opacity-90 transition"
      >
        Karekodu İndir
      </a>
    </main>
  );
}
