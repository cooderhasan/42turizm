
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
                logoUrl: '/logo.svg',
                stat1Label: 'Mutlu Müşteri',
                stat1Value: '5000+',
                stat2Label: 'Yıllık Deneyim',
                stat2Value: '15+',
                stat3Label: 'Aktif Araç',
                stat3Value: '50+',
            });
            console.log('✅ Settings seeded.');
        } else {
            console.log('ℹ️  Settings already exist. Skipping creation.');
            // Do NOT overwrite logoUrl repeatedly. Let admin manage it.
        }

        // Admin User
        const existingAdmin = await db
            .select()
            .from(users)
            .where(eq(users.email, 'admin@42turizm.com'))
            .limit(1);

        const plainPassword = 'admin123';

        if (existingAdmin.length === 0) {
            await db.insert(users).values({
                email: 'admin@42turizm.com',
                password: plainPassword,
                role: 'admin',
            });
            console.log('✅ Admin user created (email: admin@42turizm.com, password: admin123)');
        } else {
            // Kullanıcı varsa şifresini güncelle (Auth hatasını çözmek için)
            await db.update(users)
                .set({ password: plainPassword })
                .where(eq(users.email, 'admin@42turizm.com'));
            console.log('✅ Admin user password updated to: admin123');
        }


        // Hero Slides - SİL VE YENİDEN EKLE
        // Mevcut slaytları temizle (idempotency için)
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
                name: 'Konya Büyükşehir Belediyesi',
                imageUrl: 'https://via.placeholder.com/200x100?text=Konya+BB',
                category: 'public',
                order: 1,
            },
            {
                name: 'Selçuk Üniversitesi',
                imageUrl: 'https://via.placeholder.com/200x100?text=Selcuk+Uni',
                category: 'public',
                order: 2,
            },
            {
                name: 'Necmettin Erbakan Üniversitesi',
                imageUrl: 'https://via.placeholder.com/200x100?text=NEU',
                category: 'public',
                order: 3,
            },
        ]);
        console.log('✅ References seeded.');

        // Services
        await db.delete(services);
        await db.insert(services).values([
            {
                title: 'Servis Taşımacılığı',
                slug: 'servis-tasimaciligi',
                shortDescription: 'Personel ve öğrenci taşımacılığında güvenli, zamanında ve konforlu ulaşım çözümleri sunuyoruz.',
                detailedDescription: 'Fabrikalar, şirketler ve kurumlar için personel taşımacılığı; okullar için öğrenci servis hizmetleri. Güvenli araç filomuz ve deneyimli sürücülerimizle hizmetinizdeyiz.',
                iconName: 'bus',
                imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=800&fit=crop',
                features: ['Güvenli Sürüş', 'Dakik Hizmet', 'Konforlu Araçlar', 'GPS Takip'],
                isActive: true,
                order: 1,
            },
            {
                title: 'Kültür Turları',
                slug: 'kultur-turlari',
                shortDescription: 'Tarihi ve doğal güzellikleri keşfetmeniz için yurt içi ve yurt dışı kültür turları düzenliyoruz.',
                detailedDescription: 'Türkiye\'nin dört bir yanına kültür turları. Kapadokya, Karadeniz, Ege, Akdeniz turları ve daha fazlası.',
                iconName: 'map',
                imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop',
                features: ['Profesyonel Rehber', 'Lüks Otobüsler', 'Otel Konaklama', 'Seyahat Sigortası'],
                isActive: true,
                order: 2,
            },
            {
                title: 'Turizm Taşımacılığı',
                slug: 'turizm-tasimaciligi',
                shortDescription: 'Turistik geziler, bayi toplantıları ve organizasyonlar için geniş araç filomuzla hizmetinizdeyiz.',
                detailedDescription: 'Yerli ve yabancı turist grupları için turizm taşımacılığı. Özel geziler, otel transferleri ve tur organizasyonları.',
                iconName: 'bus',
                imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=800&fit=crop',
                features: ['Geniş Araç Filosu', 'Mabeyn & D2 Belgeli', 'Yabancı Dil Bilen Sürücü', '7/24 Destek'],
                isActive: true,
                order: 3,
            },
            {
                title: 'Havalimanı Transferi',
                slug: 'havalimani-transferi',
                shortDescription: 'Havalimanından evinize veya otelinize, zamanında ve konforlu transfer hizmeti.',
                detailedDescription: 'Havalimanı karşılama ve transfer hizmetleri. Uçağınız indiğinde sizi bekleyen özel aracınızla konforlu ulaşım.',
                iconName: 'plane',
                imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=800&fit=crop',
                features: ['Karşılama Hizmeti', 'Bagaj Yardımı', 'Ücretsiz Bekleme', 'Sabit Fiyat'],
                isActive: true,
                order: 4,
            },
            {
                title: 'Sürücülü VIP Araç',
                slug: 'vip-arac-kiralama',
                shortDescription: 'Özel günleriniz ve iş seyahatleriniz için protokol deneyimine sahip sürücülerimizle VIP hizmet.',
                detailedDescription: 'VIP Mercedes Vito ve benzeri lüks araçlarla şoförlü araç kiralama hizmeti. Protokol taşımacılığı ve özel günleriniz için.',
                iconName: 'car',
                imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&h=800&fit=crop',
                features: ['VIP Dizayn Araçlar', 'Protokol Sürücü', 'Gizlilik', 'Konfor'],
                isActive: true,
                order: 5,
            },
            {
                title: 'Filo Kiralama',
                slug: 'filo-kiralama',
                shortDescription: 'Şirketinizin ihtiyaç duyduğu binek ve ticari araçları uzun dönem kiralama avantajlarıyla sunuyoruz.',
                detailedDescription: 'Kurumsal firmalar için uzun dönem filo kiralama çözümleri. Bakım, onarım, kasko, sigorta dahil operasyonel kiralama.',
                iconName: 'building',
                imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=800&fit=crop',
                features: ['Operasyonel Kiralama', 'Yedek Araç', '7/24 Yol Yardım', 'Vergi Avantajı'],
                isActive: true,
                order: 6,
            },
            {
                title: 'Güvenlik & Temizlik',
                slug: 'guvenlik-temizlik',
                shortDescription: 'Tesisleriniz için entegre tesis yönetimi, profesyonel güvenlik ve temizlik hizmetleri.',
                detailedDescription: 'Siteler, AVM\'ler, fabrikalar ve iş merkezleri için profesyonel güvenlik ve temizlik personeli temini.',
                iconName: 'shield',
                imageUrl: 'https://images.unsplash.com/photo-1581578731117-10d52143b1e8?w=1200&h=800&fit=crop',
                features: ['Özel Güvenlik', 'Endüstriyel Temizlik', 'Tesis Yönetimi', 'Deneyimli Kadro'],
                isActive: true,
                order: 7,
            }
        ]);
        console.log('✅ Services seeded.');

        // Vehicles (Eğer şema destekliyorsa)
        // Şema kontrolü: vehicles tablosu schema.ts'de mevcut.
        await db.delete(vehicles);
        await db.insert(vehicles).values([
            {
                name: 'Mercedes Vito',
                category: 'VIP',
                capacity: 7,
                fuelType: 'Dizel',
                driverOption: 'Şoförlü',
                imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop',
                isActive: true,
                order: 1
            },
            {
                name: 'Mercedes Sprinter',
                category: 'Minibüs',
                capacity: 16,
                fuelType: 'Dizel',
                driverOption: 'Şoförlü',
                imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop',
                isActive: true,
                order: 2
            }
        ]);
        console.log('✅ Vehicles seeded.');

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
