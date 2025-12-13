'use server';

import { db } from '@/db';
import { tours } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function saveImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'tours');
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`; // Sanitize filename
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        return `/uploads/tours/${filename}`;
    } catch (error) {
        console.error('Error saving image:', error);
        throw new Error('Görsel kaydedilemedi.');
    }
}

export async function getTours() {
    try {
        return await db.select().from(tours);
    } catch (error) {
        console.error('Error fetching tours:', error);
        return [];
    }
}

export async function getTour(id: number) {
    try {
        const result = await db.select().from(tours).where(eq(tours.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching tour:', error);
        return null;
    }
}

export async function createTour(prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        // const coverImage = formData.get('coverImage') as string;
        const coverImageFile = formData.get('coverImageFile') as File;
        const description = formData.get('description') as string;

        if (!title || !slug) {
            return { success: false, message: 'Başlık ve URL gereklidir.' };
        }

        // Handle Image Upload
        let coverImage = '';
        if (coverImageFile && coverImageFile.size > 0) {
            const savedPath = await saveImage(coverImageFile);
            if (savedPath) coverImage = savedPath;
        }

        await db.insert(tours).values({
            title,
            slug,
            coverImage,
            description
        });

        revalidatePath('/admin/tours');
        // We will need to revalidate the frontend cultural tours page too eventually
        return { success: true, message: 'Tur paketi başarıyla oluşturuldu.' };

    } catch (error) {
        console.error('Error creating tour:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function updateTour(id: number, prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        // const coverImage = formData.get('coverImage') as string;
        const coverImageFile = formData.get('coverImageFile') as File;
        const existingImageUrl = formData.get('existingImageUrl') as string;
        const description = formData.get('description') as string;

        if (!title || !slug) {
            return { success: false, message: 'Başlık ve URL gereklidir.' };
        }

        // Handle Image Upload
        let coverImage = existingImageUrl;
        if (coverImageFile && coverImageFile.size > 0) {
            const savedPath = await saveImage(coverImageFile);
            if (savedPath) coverImage = savedPath;
        }

        await db.update(tours)
            .set({
                title,
                slug,
                coverImage,
                description
            })
            .where(eq(tours.id, id));

        revalidatePath('/admin/tours');
        return { success: true, message: 'Tur paketi başarıyla güncellendi.' };

    } catch (error) {
        console.error('Error updating tour:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function deleteTour(id: number) {
    try {
        await db.delete(tours).where(eq(tours.id, id));
        revalidatePath('/admin/tours');
        return { success: true };
    } catch (error) {
        console.error('Error deleting tour:', error);
        return { success: false, error: 'Silinemedi.' };
    }
}
