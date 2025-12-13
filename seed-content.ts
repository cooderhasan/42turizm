import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { eq } from 'drizzle-orm';
import * as schema from './src/db/schema';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Fallback if env vars fail, but try to use them first
const DB_PORT = process.env.DB_PORT || 5433;
const DB_NAME = process.env.DB_NAME || 'turizm_db';
const CONNECTION_STRING = process.env.DATABASE_URL || `postgresql://postgres:postgres@localhost:${DB_PORT}/${DB_NAME}`;

async function seed() {
    const client = new Client({ connectionString: CONNECTION_STRING });
    await client.connect();
    const db = drizzle(client, { schema });

    console.log('🌱 Seeding database...');

    try {
        // 1. Seed Settings
        console.log('Seeding settings...');
        const existingSettings = await db.query.settings.findFirst();

        if (!existingSettings) {
            await db.insert(schema.settings).values({
                siteTitle: '42 Turizm',
                siteDescription: 'İstanbul Personel ve Öğrenci Taşımacılığı',
                address: 'Örnek Mahallesi, Turizm Caddesi No: 42 Kadıköy / İstanbul',
                phone1: '+90 555 555 55 55',
                email: 'info@42turizm.com',
                aboutText: '2010 yılından beri güvenli ve konforlu taşımacılık hizmetleri sunuyoruz.'
            });
        }

        // 2. Seed Services
        console.log('Seeding services...');
        const servicesData = [
            {
                title: 'Servis Taşımacılığı',
                slug: 'servis-tasimaciligi',
                description: 'Personel ve öğrenci taşımacılığında güvenli, zamanında ve konforlu ulaşım çözümleri sunuyoruz.',
                imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop'
            },
            {
                title: 'Kültür Turları',
                slug: 'kultur-turlari',
                description: 'Tarihi ve doğal güzellikleri keşfetmeniz için yurt içi ve yurt dışı kültür turları düzenliyoruz.',
                imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop'
            },
            {
                title: 'Turizm Taşımacılığı',
                slug: 'turizm-tasimaciligi',
                description: 'Turistik geziler, bayi toplantıları ve organizasyonlar için geniş araç filomuzla hizmetinizdeyiz.',
                imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop'
            },
            {
                title: 'Havalimanı Transferi',
                slug: 'havalimani-transferi',
                description: 'Havalimanından evinize veya otelinize, zamanında ve konforlu transfer hizmeti.',
                imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop'
            },
            {
                title: 'Sürücülü VIP Araç',
                slug: 'vip-arac-kiralama',
                description: 'Özel günleriniz ve iş seyahatleriniz için protokol deneyimine sahip sürücülerimizle VIP hizmet.',
                imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop'
            },
            {
                title: 'Filo Kiralama',
                slug: 'filo-kiralama',
                description: 'Şirketinizin ihtiyaç duyduğu binek ve ticari araçları uzun dönem kiralama avantajlarıyla sunuyoruz.',
                imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop'
            },
            {
                title: 'Güvenlik & Temizlik',
                slug: 'guvenlik-temizlik',
                description: 'Tesisleriniz için entegre tesis yönetimi, profesyonel güvenlik ve temizlik hizmetleri.',
                imageUrl: 'https://images.unsplash.com/photo-1581578731117-10d52143b1e8?q=80&w=2070&auto=format&fit=crop'
            }
        ];

        for (const service of servicesData) {
            const existing = await db.query.services.findFirst({
                where: (services, { eq }) => eq(services.slug, service.slug)
            });

            if (!existing) {
                await db.insert(schema.services).values({
                    title: service.title,
                    slug: service.slug,
                    shortDescription: service.description,
                    imageUrl: service.imageUrl
                });
            }
        }

        // 3. Seed Blog Posts
        console.log('Seeding blog posts...');
        const blogData = [
            {
                title: 'Filomuza Yeni Katılan 2024 Model Araçlar',
                slug: 'filo-yenilendi',
                excerpt: 'Hizmet kalitemizi artırmak için filomuzu yenilemeye devam ediyoruz.',
                imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
                publishedAt: new Date('2024-01-15')
            },
            {
                title: 'Sürücülerimize İleri Sürüş Teknikleri Eğitimi',
                slug: 'surucu-egitimi',
                excerpt: 'Güvenli ulaşımın en önemli unsuru olan sürücülerimizin eğitimi bizim için önceliklidir.',
                imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop',
                publishedAt: new Date('2024-02-20')
            },
            {
                title: 'Turizmde Dijitalleşme ve 42 Turizm\'in Vizyonu',
                slug: 'turizmde-dijitallesme',
                excerpt: 'Teknolojiyi kullanarak müşteri deneyimini nasıl mükemmelleştiriyoruz? Dijital dönüşüm yolculuğumuzdan notlar.',
                imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
                publishedAt: new Date('2024-03-10')
            },
            {
                title: 'İstanbul\'un En Güzel Tarihi Mekanları Rehberi',
                slug: 'istanbul-gezi-rehberi',
                excerpt: 'Kültür turlarımızda uğradığımız, İstanbul\'un mutlaka görülmesi gereken tarihi incileri.',
                imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2049&auto=format&fit=crop',
                publishedAt: new Date('2024-04-05')
            }
        ];

        for (const post of blogData) {
            const existing = await db.query.blogPosts.findFirst({
                where: (blogPosts, { eq }) => eq(blogPosts.slug, post.slug)
            });

            if (!existing) {
                await db.insert(schema.blogPosts).values({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    imageUrl: post.imageUrl,
                    content: `<p>${post.excerpt}</p><p>Detaylı içerik çok yakında eklenecektir...</p>`,
                    isPublished: true,
                    publishedAt: post.publishedAt
                });
            } else {
                // Update dates for existing posts if they are missing
                await db.update(schema.blogPosts)
                    .set({ publishedAt: post.publishedAt })
                    .where(eq(schema.blogPosts.slug, post.slug));
            }
        }

        console.log('✅ Seeding completed!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await client.end();
    }
}

seed();
