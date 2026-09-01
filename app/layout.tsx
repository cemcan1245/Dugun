import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Düğün Fotoğrafları",
  description: "Karekodu okutun, anılarınızı bizimle paylaşın.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-blush min-h-screen text-ink font-serif">{children}</body>
    </html>
  );
}
