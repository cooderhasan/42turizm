import { MetadataRoute } from 'next';

import { db } from "@/db";
import { services, blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.42turizm.com';

    // Static routes
    const staticRoutes = [
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

    // Dynamic Services
    const activeServices = await db.select().from(services).where(eq(services.isActive, true));
    const serviceRoutes = activeServices.map((service) => ({
        url: `${baseUrl}/hizmetlerimiz/${service.slug}`,
        lastModified: service.updatedAt || service.createdAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Dynamic Blog Posts
    const posts = await db.select().from(blogPosts).where(eq(blogPosts.isPublished, true));
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt || post.createdAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
