import { db } from './index';
import {
  settings,
  users,
  references,
  services,
  blogPosts,
  heroSlides,
  vehicles,
} from './schema';
import { hashPassword } from '@/lib/auth-utils';
import { eq } from 'drizzle-orm';

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  console.log(
    'DB Connection String (masked):',
    connectionString?.replace(/:[^:@]+@/, ':***@')
  );

  console.log('Seeding database...');

  try {
    // Settings
    const existingSettings = await db.select().from(settings).limit(1);

    if (existingSettings.length === 0) {
      await db.insert(settings).values({
        siteTitle: '42 Turizm',
        siteDescription: 'Konya\'dan Türkiye\'nin her yerine güvenli ve konforlu transfer hizmeti',
        address: 'Konya, Türkiye',
        phone1: '+90 532 123 45 67',
        phone2: '+90 542 987 65 43',
        email: 'info@42turizm.com',
        whatsappNumber: '+905321234567',
        instagramUrl: 'https://instagram.com/42turizm',
        facebookUrl: 'https://facebook.com/42turizm',
        linkedinUrl: 'https://linkedin.com/company/42turizm',
        aboutText: 'Konya merkezli turizm şirketimiz, yıllardır süren deneyimimizle güvenli ve konforlu yolculuklar sunuyoruz.',
        missionText: 'Müşteri memnuniyetini ön planda tutarak kaliteli hizmet sunmak.',
        visionText: 'Türkiye\'nin en güvenilir transfer şirketi olmak.',
        logoUrl: '/logo.png',
        stat1Label: 'Mutlu Müşteri',
        stat1Value: '5000+',
        stat2Label: 'Yıllık Deneyim',
        stat2Value: '15+',
        stat3Label: 'Aktif Araç',
        stat3Value: '50+',
      });
      console.log('✅ Settings seeded.');
    } else {
      console.log('ℹ️  Settings already exist.');
    }

    // Admin User
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.email, 'admin@42turizm.com'))
      .limit(1);

    if (existingAdmin.length === 0) {
      const hashedPassword = await hashPassword('admin123');
      await db.insert(users).values({
        name: 'Admin',
        email: 'admin@42turizm.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Admin user created (email: admin@42turizm.com, password: admin123)');
    } else {
      console.log('ℹ️  Admin user already exists.');
    }

    // Hero Slides - SİL VE YENİDEN EKLE
    await db.delete(heroSlides);
    
    await db.insert(heroSlides).values([
      {
        title: 'Güvenli Yolculuk',
        subtitle: 'Konya\'dan Türkiye\'nin Her Yerine',
        imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=1080&fit=crop',
        buttonText: 'Hemen Rezervasyon Yap',
        buttonLink: '/iletisim',
        isActive: true,
        order: 1,
      },
      {
        title: 'Konforlu Araçlar',
        subtitle: 'Modern ve Temiz Filomuz',
        imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop',
        buttonText: 'Araçlarımızı İncele',
        buttonLink: '/araclar',
        isActive: true,
        order: 2,
      },
      {
        title: '7/24 Hizmet',
        subtitle: 'Her An Ulaşılabilir',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop',
        buttonText: 'Bizi Arayın',
        buttonLink: '/iletisim',
        isActive: true,
        order: 3,
      },
    ]);
    console.log('✅ Hero slides seeded.');

    // References
    await db.delete(references);
    await db.insert(references).values([
      {
        companyName: 'Konya Büyükşehir Belediyesi',
        logoUrl: 'https://via.placeholder.com/200x100?text=Konya+BB',
        isActive: true,
        order: 1,
      },
      {
        companyName: 'Selçuk Üniversitesi',
        logoUrl: 'https://via.placeholder.com/200x100?text=Selcuk+Uni',
        isActive: true,
        order: 2,
      },
      {
        companyName: 'Necmettin Erbakan Üniversitesi',
        logoUrl: 'https://via.placeholder.com/200x100?text=NEU',
        isActive: true,
        order: 3,
      },
    ]);
    console.log('✅ References seeded.');

    // Services
    await db.delete(services);
    await db.insert(services).values([
      {
        title: 'Havalimanı Transferi',
        slug: 'havalimani-transferi',
        shortDescription: 'Konya Havalimanı\'ndan şehir merkezine güvenli transfer',
        detailedDescription: 'Profesyonel şoförlerimiz ile 7/24 havalimanı transfer hizmeti sunuyoruz.',
        iconName: 'plane',
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
        features: ['7/24 Hizmet', 'Karşılama Tabelası', 'Klimalı Araçlar', 'Bagaj Taşıma'],
        isActive: true,
        order: 1,
      },
      {
        title: 'Şehirler Arası Transfer',
        slug: 'sehirler-arasi-transfer',
        shortDescription: 'Türkiye\'nin her yerine konforlu yolculuk',
        detailedDescription: 'Ankara, İstanbul, İzmir ve daha fazlası...',
        iconName: 'map',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
        features: ['Kapıdan Kapıya', 'Esnek Saatler', 'Güvenli Yolculuk'],
        isActive: true,
        order: 2,
      },
      {
        title: 'Günlük Kiralama',
        slug: 'gunluk-kiralama',
        shortDescription: 'Şoförlü veya şoförsüz günlük araç kiralama',
        detailedDescription: 'İhtiyacınıza uygun araç seçenekleri ile günlük kiralama hizmeti.',
        iconName: 'car',
        imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
        features: ['Ekonomik Fiyatlar', 'Tam Kasko', 'Yeni Model Araçlar'],
        isActive: true,
        order: 3,
      },
      {
        title: 'Kurumsal Transfer',
        slug: 'kurumsal-transfer',
        shortDescription: 'Şirketler için özel transfer çözümleri',
        detailedDescription: 'Toplantı, seminer ve organizasyonlarınız için profesyonel hizmet.',
        iconName: 'briefcase',
        imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop',
        features: ['Fatura Seçeneği', 'Anlaşmalı Fiyat', 'Öncelikli Hizmet'],
        isActive: true,
        order: 4,
      },
      {
        title: 'Özel Etkinlik Transferi',
        slug: 'ozel-etkinlik-transferi',
        shortDescription: 'Düğün, nişan ve özel günleriniz için',
        detailedDescription: 'Özel günlerinizde lüks araç seçenekleri ile hizmetinizdeyiz.',
        iconName: 'heart',
        imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop',
        features: ['Lüks Araçlar', 'Süsleme', 'Fotoğraf Çekimi'],
        isActive: true,
        order: 5,
      },
      {
        title: 'Turizm Turu',
        slug: 'turizm-turu',
        shortDescription: 'Konya ve çevresinde rehberli turlar',
        detailedDescription: 'Mevlana Müzesi, Çatalhöyük ve daha fazlası...',
        iconName: 'camera',
        imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
        features: ['Rehberli Tur', 'Giriş Ücretleri', 'Yemek Servisi'],
        isActive: true,
        order: 6,
      },
    ]);
    console.log('✅ Services seeded.');

    // Blog Posts
    await db.delete(blogPosts);
    await db.insert(blogPosts).values([
      {
        title: 'Konya\'da Gezilecek Yerler',
        slug: 'konyada-gezilecek-yerler',
        excerpt: 'Konya\'nın en güzel tarihi ve turistik mekanları',
        content: 'Konya, tarihi ve kültürel zenginlikleriyle Türkiye\'nin en önemli şehirlerinden biri...',
        author: 'Admin',
        imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop',
        isPublished: true,
        publishedAt: new Date('2024-01-15'),
      },
      {
        title: 'Havalimanı Transfer İpuçları',
        slug: 'havalimani-transfer-ipuclari',
        excerpt: 'Havalimanı transferinde dikkat edilmesi gerekenler',
        content: 'Havalimanı transferi rezervasyonu yaparken nelere dikkat etmelisiniz?',
        author: 'Admin',
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
        isPublished: true,
        publishedAt: new Date('2024-01-20'),
      },
      {
        title: 'Güvenli Yolculuk İçin Öneriler',
        slug: 'guvenli-yolculuk-onerileri',
        excerpt: 'Yolculuk öncesi ve sırasında güvenlik ipuçları',
        content: 'Uzun yolculuklarda konfor ve güvenlik için önerilerimiz...',
        author: 'Admin',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
        isPublished: true,
        publishedAt: new Date('2024-02-01'),
      },
    ]);
    console.log('✅ Blog posts seeded.');

    console.log('🎉 Seed operation completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });