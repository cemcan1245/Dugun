# Düğün Fotoğraf Yükleme Sitesi

Misafirlerin karekod okutarak telefonlarından anlık fotoğraf yükleyebildiği,
yüklenen fotoğrafların galeri olarak görüntülendiği basit bir Next.js sitesi.

## Sayfalar

- `/` — Yüklenen tüm fotoğrafların galerisi.
- `/yukle` — Misafirlerin fotoğraf (ve opsiyonel isim/not) yüklediği sayfa. Karekod bu sayfaya yönlendirir.
- `/qr` — Yazdırılabilir karekodun görüntülendiği ve indirilebildiği sayfa (yalnızca siz kullanın, misafirlerle paylaşmayın).

## Nasıl çalışır

- Yüklenen fotoğraflar sunucudaki `storage/uploads/` klasörüne kaydedilir ve `/api/uploads/[dosya]` üzerinden servis edilir.
- Her fotoğrafın adı, notu ve zamanı `storage/photos.json` dosyasında tutulur (basit dosya tabanlı veri, veritabanı gerekmez). Her şeyin tek bir `storage/` klasörü altında olması, Render gibi platformlarda tek bir kalıcı disk bağlayarak tüm veriyi korumayı kolaylaştırır.
- `/qr` sayfası, isteğin geldiği domain'i otomatik algılayıp o adrese giden bir karekod üretir. Farklı bir adres zorlamak isterseniz `.env` dosyasına `NEXT_PUBLIC_SITE_URL` ekleyin (örnek için `.env.example` dosyasına bakın).

## Kurulum

```bash
npm install
npm run dev
```

Site `http://localhost:3000` adresinde açılır.

## Yayına alma (deploy) — Render

**Önemli:** Bu proje fotoğrafları sunucunun diskine kaydeder. Bu yüzden
**Vercel gibi sunucusuz (serverless) platformlarda kalıcı depolama sağlanamaz.**
Render'da da **kalıcı disk (Persistent Disk) yalnızca ücretli planlarda**
(en düşük: Starter, ~7 $/ay) kullanılabilir — Free plan disk desteklemez ve
konteyner her yeniden başlatıldığında yüklenen fotoğraflar silinir.

Repoda hazır bir `render.yaml` (Blueprint) dosyası var; Render bunu görüp
servisi ve kalıcı diski otomatik kurar.

### Adımlar

1. [render.com](https://render.com) üzerinde bir hesap açın/giriş yapın.
2. Dashboard'da **New +** → **Blueprint** seçin.
3. `cemcan1245/Dugun` GitHub reposunu bağlayın (ilk seferinde Render'a GitHub
   erişim izni vermeniz gerekir).
4. Render, repodaki `render.yaml` dosyasını okuyup `nagehan-cem-dugun`
   adında bir web servisi ve `dugun-storage` adında 1 GB'lık kalıcı bir disk
   önerecek. Planı gerekirse **Starter** olarak bırakın (disk için zorunlu).
5. **Apply**'a basıp deploy'un bitmesini bekleyin (birkaç dakika sürer).
6. Deploy bitince Render size `https://nagehan-cem-dugun.onrender.com`
   gibi bir adres verir. Kendi alan adınızı bağlamak isterseniz Render'ın
   **Custom Domain** ayarından ekleyebilirsiniz.
7. (Opsiyonel) Servisin **Environment** sekmesinden `NEXT_PUBLIC_SITE_URL`
   değişkenine kendi alan adınızı girin — girmezseniz site istekten gelen
   domain'i otomatik algılar, bu genelde yeterlidir.

### Zaten yayında olan bir servisin adresini değiştirme

`render.yaml` dosyasındaki `name` alanını değiştirmek, Render'da **halihazırda
oluşturulmuş bir servisi otomatik yeniden adlandırmaz** — Blueprint senkronu
isme göre eşleştiği için farklı bir isim yeni bir servis oluşturulmasına
neden olabilir. Adresi değiştirmek için Render dashboard'da:

1. `dugun-foto-yukleme` servisine girin.
2. **Settings** sekmesinde **Name** alanını `nagehan-cem-dugun` yapın ve kaydedin.
3. Servisin adresi otomatik olarak `https://nagehan-cem-dugun.onrender.com`
   olarak değişir (birkaç dakika içinde etkin olur).
4. `/qr` sayfasını tekrar açıp yeni karekodu indirin — eski karekotlar
   artık geçersiz olur.

Deploy'dan sonra:

1. Sitenizin adresine gidip `/qr` sayfasını açın, karekodu indirin.
2. Karekodu masalara/davetiyeye yazdırın.
3. Fotoğrafları görmek için `/` sayfasını ziyaret edin.

### Başka platformlar

- **Railway / bir VPS (DigitalOcean, Hetzner vb.)**: Kalıcı disk
  sağladıkları için proje olduğu gibi çalışır; `storage/` klasörünün kalıcı
  bir diske bağlı olduğundan emin olun, `npm run build && npm start` ile
  çalıştırın.
- Fotoğraf sayısı çok artacaksa veya Vercel'de barındırmak isterseniz,
  `lib/photos.ts` ve `app/api/upload/route.ts` dosyalarındaki dosya sistemi
  kayıtlarını bir bulut depolama servisiyle (S3, Cloudinary, Supabase Storage
  vb.) değiştirmeniz gerekir.

## Notlar / geliştirme fikirleri

- Şu an yüklenen her fotoğraf anında galeride görünür (moderasyon yok).
  İsterseniz onay mekanizması eklenebilir.
- Fotoğraf silme/moderasyon için bir admin sayfası eklenmemiştir.
