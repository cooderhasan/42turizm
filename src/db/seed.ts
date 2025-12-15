
import { db } from './index';
import { users, references, services, blogPosts, settings } from './schema';
import { eq } from 'drizzle-orm';

async function main() {
    console.log('Seeding database...');

    try {
        // 1. Seed Settings
        const existingSettings = await db.select().from(settings).limit(1);
        if (existingSettings.length === 0) {
            await db.insert(settings).values({
                siteTitle: '42 Turizm',
                siteDescription: 'İstanbul Personel ve Öğrenci Taşımacılığı',
                address: 'Örnek Mahallesi, Turizm Caddesi No: 42 Kadıköy / İstanbul',
                phone1: '+90 555 555 55 55',
                email: 'info@42turizm.com',
                aboutText: '2010 yılından beri güvenli ve konforlu taşımacılık hizmetleri sunuyoruz.'
            });
            console.log('✅ Settings seeded.');
        } else {
            console.log('ℹ️  Settings already exist.');
        }

        // 2. Seed Admin User
        const existingUser = await db.select().from(users).where(eq(users.email, 'admin@42turizm.com'));

        if (existingUser.length === 0) {
            await db.insert(users).values({
                email: 'admin@42turizm.com',
                password: 'admin', // Changed to simple password for initial setup, user should change it
                role: 'admin',
            });
            console.log('✅ Admin user created: admin@42turizm.com / admin');
        } else {
            console.log('ℹ️  Admin user already exists.');
        }

        // 3. Seed References
        const existingReferences = await db.select().from(references);

        if (existingReferences.length === 0) {
            await db.insert(references).values([
                {
                    name: 'Turkish Airlines',
                    imageUrl: '/references/turkish-airlines.png',
                    category: 'private',
                    order: 1,
                },
                {
                    name: 'Milli Eğitim Bakanlığı',
                    imageUrl: '/references/meb.png',
                    category: 'public',
                    order: 2,
                },
                {
                    name: 'Koç Holding',
                    imageUrl: '/references/koc-holding.png',
                    category: 'private',
                    order: 3,
                },
                {
                    name: 'Sabancı Holding',
                    imageUrl: '/references/sabanci.png',
                    category: 'private',
                    order: 4,
                },
                {
                    name: 'Eczacıbaşı',
                    imageUrl: '/references/eczacibasi.png',
                    category: 'private',
                    order: 5,
                },
                {
                    name: 'Turkcell',
                    imageUrl: '/references/turkcell.png',
                    category: 'private',
                    order: 6,
                },
            ]);
            console.log('✅ 6 sample references added.');
        } else {
            console.log('ℹ️  References already exist.');
        }

        // 4. Seed Services
        const servicesData = [
            {
                title: 'Servis Taşımacılığı',
                slug: 'servis-tasimaciligi',
                shortDescription: 'Personeliniz için güvenli ve dakik ulaşım çözümleri.',
                detailedDescription: 'Personel taşımacılığında güven, konfor ve zamanlama bizim için en önemli unsurlardır.',
                imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
                isActive: true
            },
            {
                title: 'Kültür Turları',
                slug: 'kultur-turlari',
                shortDescription: 'Tarihi ve turistik güzellikleri keşfetmek için özel turlar.',
                detailedDescription: 'Yurt içi ve yurt dışı kültür turları ile yeni yerler keşfedin.',
                imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2000&auto=format&fit=crop',
                isActive: true
            },
            {
                title: 'Turizm Taşımacılığı',
                slug: 'turizm-tasimaciligi',
                shortDescription: 'Yerli ve yabancı turist kafileleri için profesyonel taşımacılık.',
                detailedDescription: 'Turizm acenteleri ve oteller için transfer ve tur hizmetleri.',
                imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
                isActive: true
            },
            {
                title: 'Havalimanı Transferi',
                slug: 'havalimani-transferi',
                shortDescription: 'Havalimanından otelinize veya evinize konforlu transfer.',
                detailedDescription: '7/24 havalimanı karşılama ve transfer hizmeti.',
                imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop',
                isActive: true
            },
            {
                title: 'Sürücülü VIP Araç',
                slug: 'vip-arac-kiralama',
                shortDescription: 'Özel günleriniz ve iş toplantılarınız için VIP araç kiralama.',
                detailedDescription: 'Lüks araçlarımız ve profesyonel sürücülerimizle VIP hizmet.',
                imageUrl: 'https://images.unsplash.com/photo-1627916538562-f9479e0f624e?q=80&w=2070&auto=format&fit=crop',
                isActive: true
            },
            {
                title: 'Filo Kiralama',
                slug: 'filo-kiralama',
                shortDescription: 'Kurumsal firmalar için uzun dönem araç kiralama çözümleri.',
                detailedDescription: 'Şirketinizin ihtiyaçlarına uygun filo kiralama seçenekleri.',
                imageUrl: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2128&auto=format&fit=crop',
                isActive: true
            }
        ];

        for (const service of servicesData) {
            const existing = await db.select().from(services).where(eq(services.slug, service.slug));
            if (existing.length === 0) {
                await db.insert(services).values(service);
            }
        }
        console.log('✅ Services seeded.');

        // 5. Seed Blog Posts
        const blogData = [
            {
                title: 'Filomuza Yeni Katılan 2024 Model Araçlar',
                slug: 'filo-yenilendi',
                excerpt: 'Hizmet kalitemizi artırmak için filomuzu yenilemeye devam ediyoruz.',
                content: '<p>Lorem ipsum dolor sit amet...</p>',
                imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
                isPublished: true,
                publishedAt: new Date()
            },
            {
                title: 'Sürücülerimize İleri Sürüş Teknikleri Eğitimi',
                slug: 'surucu-egitimi',
                excerpt: 'Güvenli ulaşımın en önemli unsuru olan sürücülerimizin eğitimi bizim için önceliklidir.',
                content: '<p>Lorem ipsum dolor sit amet...</p>',
                imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop',
                isPublished: true,
                publishedAt: new Date()
            }
        ];

        for (const post of blogData) {
            const existing = await db.select().from(blogPosts).where(eq(blogPosts.slug, post.slug));
            if (existing.length === 0) {
                await db.insert(blogPosts).values(post);
            }
        }
        console.log('✅ Blog posts seeded.');

        console.log('🎉 Seed operation completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        process.exit(0);
    }
}

main();
