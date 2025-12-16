# Coolify Dağıtım Kılavuzu (Deployment Guide)

Bu projeyi Coolify üzerinden yayınlamak için aşağıdaki adımları takip edebilirsiniz.

## 1. Hazırlık
Projenizin son halinin GitHub'da olduğundan emin olun (az önce `git push` yaptınız).

## 2. Coolify Proje Kurulumu
1.  Coolify panelinize giriş yapın.
2.  **+ New Resource** butonuna tıklayın.
3.  **Application** -> **Public Repository** (veya bağlıysa Private Repository) seçeneğini seçin.
4.  GitHub deposu linkini yapıştırın: `https://github.com/cooderhasan/42turizm.git`
    *   *Branch:* `master`
5.  **Check Repository** diyerek ilerleyin.
6.  **Build Pack** olarak `Nixpacks` seçili olduğundan emin olun (otomatik algılayacaktır).
7.  **Port** kısmına `3000` yazın (Next.js varsayılan portu).

## 3. Veritabanı Kurulumu (PostgreSQL)
Eğer Coolify üzerinde halihazırda bir PostgreSQL veritabanınız yoksa:
1.  Coolify ana ekranına dönün.
2.  **+ New Resource** -> **Database** -> **PostgreSQL** seçin.
3.  Oluşturulan veritabanının bilgilerini not edin (özellikle `Internal Connection URL`).

## 4. Çevresel Değişkenler (Environment Variables)
Uygulama ayarlarında **Environment Variables** sekmesine gelin ve aşağıdaki değişkenleri ekleyin:

| Key | Value (Örnek) | Açıklama |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db` | Database Internal Connection URL (Coolify DB ayarlarından kopyalayın) |
| `NEXT_PUBLIC_APP_URL` | `https://42turizm.com` | Sitenizin yayınlanacağı alan adı |
| `AUTH_SECRET` | `rastgele-gizli-bir-sifre-yazin` | Güvenlik için uzun karmaşık bir metin uydurun |
| `NODE_ENV` | `production` | Production modu için |

> **Önemli:** `drizzle.config.ts` dosyanız `DATABASE_URL` değişkenini okuyacak şekilde yapılandırıldı, bu yüzden buraya girmek zorunludur.

## 5. Build ve Deploy Ayarları
**General** veya **Build** sekmesinde şu ayarları kontrol edin:

*   **Build Command:** `npm run build`
*   **Start Command:** `npm run start`
*   **Install Command:** `npm ci` (veya `npm install`)

### Veritabanı Şemasını Gönderme (Önemli!)
Build sırasında Next.js statik sayfaları oluşturmaya çalışır ve bu sırada veritabanına bağlanır. Veritabanı tabloları henüz yoksa build işlemi hata verir ("relation does not exist").

Bu yüzden **Build Command**'i (Build Komutunu) güncellememiz gerekir.

**Build Command**'i şu şekilde güncelleyin:
```bash
npm run db:push && npm run build
```
*Bu komut, build işleminden hemen önce veritabanı tablolarını oluşturur.*

> **Not:** Start Command varsayılan olarak `npm run start` kalabilir veya güvenlik amacıyla `npm run db:push && npm run start` olarak da bırakabilirsiniz. Ancak Build aşamasını geçmek için yukarıdaki değişiklik şarttır.
*Bu komut, her başlatmada önce veritabanı tablolarını günceller, sonra siteyi açar.*

## 6. Yayına Alma
1.  Tüm ayarları kaydettikten sonra **Deploy** butonuna basın.
2.  **Logs** sekmesinden süreci takip edin.
3.  Yeşil "Healthy" yazısını gördüğünüzde siteniz yayında demektir!

## 7. Veri Yükleme (Seeding)
Veritabanınız ilk başta boş olacaktır. Örnek verileri (admin kullanıcısı, ayarlar, slaytlar vb.) yüklemek için:

1.  Coolify panelinde uygulamanızın **Terminal** (veya **Console**) sekmesine gidin.
2.  Şu komutu yazıp Enter'a basın:
    ```bash
    npm run seed
    ```
3.  Çıktıda "✅ Seed operation completed successfully!" yazısını gördüğünüzde işlem tamamdır.

## 8. Domain Ayarı
*   **Domains** sekmesine gidin.
*   Alan adınızı (örn: `https://si-t-eniz.com`) yazın ve kaydedin.
*   DNS ayarlarınızdan (Cloudflare vb.) A kaydını Coolify sunucu IP'nize yönlendirmeyi unutmayın.

## 9. Sık Karşılaşılan Hatalar (Troubleshooting)

### "Failed to connect to github.com" Hatası / Exit Code 128
Eğer deploy sırasında `fatal: unable to access ... Failed to connect to github.com port 443` hatası alıyorsanız, sunucunuzun (veya Docker konteynerinin) GitHub'a erişimi bir şekilde engellenmiştir.

**Çözüm Önerileri:**
1.  **Sunucu İnternet Bağlantısı:** Coolify sunucunuzun internete gerçekten çıkabildiğinden emin olun (SSH ile girip `ping google.com` yapmayı deneyin).
2.  **DNS Sorunu:** Sunucunuz `github.com` adresini çözemiyor olabilir. Sunucu DNS ayarlarını `8.8.8.8` (Google) veya `1.1.1.1` (Cloudflare) olarak değiştirin.
3.  **Firewall:** Sunucunuzun veya hosting sağlayıcınızın 443 (HTTPS) portuna giden (outbound) trafiği engellemediğinden emin olun.
4.  **Docker Network:** Eğer sunucuda internet varsa ama Coolify hata veriyorsa, Docker servisini yeniden başlatmayı deneyin: `systemctl restart docker`.
