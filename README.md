# Düğün Fotoğraf Yükleme Sitesi

Misafirlerin karekod okutarak telefonlarından anlık fotoğraf yükleyebildiği,
yüklenen fotoğrafların galeri olarak görüntülendiği basit bir Next.js sitesi.

## Sayfalar

- `/` — Yüklenen tüm fotoğrafların galerisi.
- `/yukle` — Misafirlerin fotoğraf (ve opsiyonel isim/not) yüklediği sayfa. Karekod bu sayfaya yönlendirir.
- `/qr` — Yazdırılabilir karekodun görüntülendiği ve indirilebildiği sayfa (yalnızca siz kullanın, misafirlerle paylaşmayın).

## Nasıl çalışır

- Yüklenen fotoğraflar sunucudaki `public/uploads/` klasörüne kaydedilir.
- Her fotoğrafın adı, notu ve zamanı `data/photos.json` dosyasında tutulur (basit dosya tabanlı veri, veritabanı gerekmez).
- `/qr` sayfası, isteğin geldiği domain'i otomatik algılayıp o adrese giden bir karekod üretir. Farklı bir adres zorlamak isterseniz `.env` dosyasına `NEXT_PUBLIC_SITE_URL` ekleyin (örnek için `.env.example` dosyasına bakın).

## Kurulum

```bash
npm install
npm run dev
```

Site `http://localhost:3000` adresinde açılır.

## Yayına alma (deploy)

**Önemli:** Bu proje fotoğrafları sunucunun yerel diskine kaydeder. Bu yüzden
**Vercel gibi sunucusuz (serverless) platformlarda kalıcı depolama sağlanamaz**
— her deploy'da veya belirli bir süre sonra yüklenen fotoğraflar silinebilir.

Önerilen seçenekler:

- **Railway / Render / bir VPS (DigitalOcean, Hetzner vb.)**: Kalıcı disk
  sağladıkları için bu proje olduğu gibi çalışır. `npm run build && npm start`
  komutlarıyla çalıştırın.
- Fotoğraf sayısı çok artacaksa veya Vercel'de barındırmak isterseniz,
  `lib/photos.ts` ve `app/api/upload/route.ts` dosyalarındaki dosya sistemi
  kayıtlarını bir bulut depolama servisiyle (S3, Cloudinary, Supabase Storage
  vb.) değiştirmeniz gerekir.

Yayına aldıktan sonra:

1. `.env` dosyasına gerçek site adresinizi `NEXT_PUBLIC_SITE_URL` olarak girin (opsiyonel, otomatik algılama genelde yeterlidir).
2. `/qr` sayfasını açıp karekodu indirin, masalara/davetiyeye yazdırın.
3. Fotoğrafları görmek için `/` sayfasını ziyaret edin.

## Notlar / geliştirme fikirleri

- Şu an yüklenen her fotoğraf anında galeride görünür (moderasyon yok).
  İsterseniz onay mekanizması eklenebilir.
- Fotoğraf silme/moderasyon için bir admin sayfası eklenmemiştir.
