'use server';

import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function saveImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'blog');
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`; // Sanitize filename
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        return `/api/uploads/blog/${filename}`;
    } catch (error) {
        console.error('Error saving image:', error);
        throw new Error('Görsel kaydedilemedi.');
    }
}

export async function getBlogPosts() {
    try {
        return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPost(id: number) {
    try {
        const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export async function createBlogPost(prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const excerpt = formData.get('excerpt') as string;
        const content = formData.get('content') as string;
        // const imageUrl = formData.get('imageUrl') as string; 
        const imageFile = formData.get('image') as File;
        const category = formData.get('category') as string || 'Duyuru';
        const isPublished = formData.get('isPublished') === 'on';

        // Handle Image Upload
        let imageUrl = '';
        if (imageFile && imageFile.size > 0) {
            const savedPath = await saveImage(imageFile);
            if (savedPath) imageUrl = savedPath;
        }

        if (!title || !slug) {
            return { success: false, message: 'Başlık ve URL (slug) gereklidir.' };
        }

        await db.insert(blogPosts).values({
            title,
            slug,
            excerpt,
            content,
            imageUrl,
            category,
            isPublished,
            publishedAt: new Date(), // Set published time to now
        });

        revalidatePath('/admin/blog');
        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        revalidatePath('/'); // Refresh homepage for new posts
        // We cannot redirect inside a try-catch block easily with next-action helper in some versions, 
        // but returning success allows client to redirect.
        return { success: true, message: 'Yazı başarıyla oluşturuldu.' };

    } catch (error) {
        console.error('Error creating blog post:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function updateBlogPost(id: number, prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const excerpt = formData.get('excerpt') as string;
        const content = formData.get('content') as string;
        // const imageUrl = formData.get('imageUrl') as string; 
        const imageFile = formData.get('image') as File;
        const existingImageUrl = formData.get('existingImageUrl') as string; // From hidden input in ImageUpload
        const category = formData.get('category') as string || 'Duyuru';
        const isPublished = formData.get('isPublished') === 'on';

        // Handle Image Upload
        let imageUrl = existingImageUrl; // Default to existing
        if (imageFile && imageFile.size > 0) {
            const savedPath = await saveImage(imageFile);
            if (savedPath) imageUrl = savedPath;
        }

        if (!title || !slug) {
            return { success: false, message: 'Başlık ve URL (slug) gereklidir.' };
        }

        await db.update(blogPosts)
            .set({
                title,
                slug,
                excerpt,
                content,
                imageUrl,
                category,
                isPublished,
                publishedAt: new Date(),
                updatedAt: new Date(),
            })
            .where(eq(blogPosts.id, id));

        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        revalidatePath('/'); // Refresh homepage for updated posts
        return { success: true, message: 'Yazı başarıyla güncellendi.' };

    } catch (error) {
        console.error('Error updating blog post:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function deleteBlogPost(id: number) {
    try {
        await db.delete(blogPosts).where(eq(blogPosts.id, id));
        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        revalidatePath('/'); // Refresh homepage for deleted posts
        return { success: true };
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return { success: false, error: 'Silinemedi.' };
    }
}
