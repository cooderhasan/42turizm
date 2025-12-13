import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.42turizm.com';

    // Static routes
    const routes = [
        '',
        '/hizmetlerimiz',
        '/arac-filomuz',
        '/referanslar',
        '/blog',
        '/kurumsal',
        '/iletisim',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // In the future, we will fetch dynamic routes (blog posts, services) from DB here
    // const posts = await getPosts();
    // const postUrls = ...

    return [...routes];
}
