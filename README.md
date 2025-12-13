# 42 Turizm - Personel ve Öğrenci Taşımacılığı

Bu proje, 42 Turizm şirketi için geliştirilmiş bir web sitesi ve yönetim panelidir.

## Özellikler

- **Kullanıcı Dostu Arayüz**: Modern ve responsive tasarım
- **Yönetim Paneli**: Kolay içerik yönetimi
- **Logo Yükleme**: Site logosu yükleme ve yönetme
- **Video Yönetimi**: YouTube video URL'si ve thumbnail yönetimi
- **Araç Yönetimi**: Araç filosu yönetimi
- **Müşteri Yorumları**: Yorum yönetimi
- **Gizlilik Politikası ve Kullanım Şartları**: Hukuki sayfalar

## Kurulum

### Gereksinimler

- Node.js 18+
- PostgreSQL 13+
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**:
   ```bash
   git clone https://github.com/sizin-kullanici-adiniz/42-turizm.git
   cd 42-turizm
   ```

2. **Bağımlılıkları yükleyin**:
   ```bash
   npm install
   ```

3. **Veritabanı yapılandırması**:
   - `.env.local` dosyası oluşturun ve veritabanı bağlantı bilgilerini girin:
   ```env
   DATABASE_URL=postgresql://kullanici_adı:sifre@localhost:5432/veritabani_adi
   ```

4. **Veritabanı tablolarını oluşturun**:
   ```bash
   npm run seed
   ```

5. **Geliştirme sunucusunu başlatın**:
   ```bash
   npm run dev
   ```

## Deploy

### Vercel

1. Vercel hesabınıza giriş yapın
2. Yeni proje oluşturun ve bu repo'yu bağlayın
3. Çevre değişkenlerini yapılandırın
4. Deploy edin

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

## Lisans

MIT Lisansı

## İletişim

info@42turizm.com
