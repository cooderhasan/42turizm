const { drizzle } = require('drizzle-orm/node-postgres');
const { Client } = require('pg');
const { settings, services, blogPosts, references } = require('./src/db/schema');

// Use the same connection logic as setup-db.js
const DB_PORT = 5433;
const DB_NAME = 'turizm_db';
const CONNECTION_STRING = `postgresql://postgres:postgres@localhost:${DB_PORT}/${DB_NAME}`;

async function seed() {
    const client = new Client({ connectionString: CONNECTION_STRING });
    await client.connect();
    const db = drizzle(client);

    console.log('🌱 Seeding database...');

    try {
        // 1. Seed Settings
        console.log('Seeding settings...');
        // Check if settings exist
        const existingSettings = await client.query('SELECT * FROM settings LIMIT 1');
        if (existingSettings.rows.length === 0) {
            await client.query(`
            INSERT INTO settings (site_title, site_description, address, phone1, email, about_text)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [
                '42 Turizm',
                'İstanbul Personel ve Öğrenci Taşımacılığı',
                'Örnek Mahallesi, Turizm Caddesi No: 42 Kadıköy / İstanbul',
                '+90 555 555 55 55',
                'info@42turizm.com',
                '2010 yılından beri güvenli ve konforlu taşımacılık hizmetleri sunuyoruz.'
            ]);
        }

        // 2. Seed Services
        console.log('Seeding services...');
        const servicesData = [
            {
                title: 'Servis Taşımacılığı',
                slug: 'servis-tasimaciligi',
                description: 'Personeliniz için güvenli ve dakik ulaşım çözümleri.',
                imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop'
            },
            {
                title: 'Kültür Turları',
                slug: 'kultur-turlari',
                description: 'Tarihi ve turistik güzellikleri keşfetmek için özel turlar.',
                imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2000&auto=format&fit=crop'
            },
            {
                title: 'Turizm Taşımacılığı',
                slug: 'turizm-tasimaciligi',
                description: 'Yerli ve yabancı turist kafileleri için profesyonel taşımacılık.',
                imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop'
            },
            {
                title: 'Havalimanı Transferi',
                slug: 'havalimani-transferi',
                description: 'Havalimanından otelinize veya evinize konforlu transfer.',
                imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop'
            },
            {
                title: 'Sürücülü VIP Araç',
                slug: 'vip-arac-kiralama',
                description: 'Özel günleriniz ve iş toplantılarınız için VIP araç kiralama.',
                imageUrl: 'https://images.unsplash.com/photo-1627916538562-f9479e0f624e?q=80&w=2070&auto=format&fit=crop'
            },
            {
                title: 'Filo Kiralama',
                slug: 'filo-kiralama',
                description: 'Kurumsal firmalar için uzun dönem araç kiralama çözümleri.',
                imageUrl: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2128&auto=format&fit=crop'
            },
            {
                title: 'Güvenlik & Temizlik',
                slug: 'guvenlik-temizlik',
                description: 'Tesisleriniz için profesyonel güvenlik ve temizlik hizmetleri.',
                imageUrl: 'https://images.unsplash.com/photo-1581578731117-10d52143b1e8?q=80&w=2070&auto=format&fit=crop'
            }
        ];

        for (const service of servicesData) {
            // Using raw query for simplicity in this script, or we would need to setup full Drizzle schema import
            const existing = await client.query('SELECT id FROM services WHERE slug = $1', [service.slug]);
            if (existing.rows.length === 0) {
                await client.query(`
                INSERT INTO services (title, slug, short_description, image_url)
                VALUES ($1, $2, $3, $4)
             `, [service.title, service.slug, service.description, service.imageUrl]);
            }
        }

        // 3. Seed Blog Posts
        console.log('Seeding blog posts...');
        const blogData = [
            {
                title: 'Filomuza Yeni Katılan 2024 Model Araçlar',
                slug: 'filo-yenilendi',
                excerpt: 'Hizmet kalitemizi artırmak için filomuzu yenilemeye devam ediyoruz.',
                imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop'
            },
            {
                title: 'Sürücülerimize İleri Sürüş Teknikleri Eğitimi',
                slug: 'surucu-egitimi',
                excerpt: 'Güvenli ulaşımın en önemli unsuru olan sürücülerimizin eğitimi bizim için önceliklidir.',
                imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop'
            }
        ];

        for (const post of blogData) {
            const existing = await client.query('SELECT id FROM blog_posts WHERE slug = $1', [post.slug]);
            if (existing.rows.length === 0) {
                await client.query(`
                INSERT INTO blog_posts (title, slug, excerpt, image_url, content)
                VALUES ($1, $2, $3, $4, $5)
             `, [post.title, post.slug, post.excerpt, post.imageUrl, 'Lorem ipsum content...']);
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
