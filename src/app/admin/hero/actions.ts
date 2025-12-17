
'use server';

import { db } from '@/db';
import { heroSlides } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function saveImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'hero');
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        console.log(`[saveImage] Hero file saved to: ${filepath}`);
        return `/api/uploads/hero/${filename}`;
    } catch (error) {
        console.error('Error saving image:', error);
        throw new Error('Görsel kaydedilemedi.');
    }
}

export async function getHeroSlides() {
    try {
        return await db.select().from(heroSlides).orderBy(asc(heroSlides.order));
    } catch (error) {
        console.error('Error fetching hero slides:', error);
        return [];
    }
}

export async function getHeroSlide(id: number) {
    try {
        const result = await db.select().from(heroSlides).where(eq(heroSlides.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching hero slide:', error);
        return null;
    }
}

export async function createHeroSlide(prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const subtitle = formData.get('subtitle') as string;
        const buttonText = formData.get('buttonText') as string;
        const buttonLink = formData.get('buttonLink') as string;
        const isActive = formData.get('isActive') === 'on';
        const order = Number(formData.get('order')) || 0;

        const imageFile = formData.get('image') as File;

        if (!title) {
            return { success: false, message: 'Başlık gereklidir.' };
        }

        let imageUrl = '';
        if (imageFile && imageFile.size > 0) {
            const savedPath = await saveImage(imageFile);
            if (savedPath) imageUrl = savedPath;
        }

        if (!imageUrl) {
            return { success: false, message: 'Görsel gereklidir.' };
        }

        await db.insert(heroSlides).values({
            title,
            subtitle,
            imageUrl,
            buttonText,
            buttonLink,
            isActive,
            order,
        });

        revalidatePath('/admin/hero');
        revalidatePath('/'); // Revalidate home page
        return { success: true, message: 'Slayt başarıyla oluşturuldu.' };

    } catch (error) {
        console.error('Error creating hero slide:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function updateHeroSlide(id: number, prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const subtitle = formData.get('subtitle') as string;
        const buttonText = formData.get('buttonText') as string;
        const buttonLink = formData.get('buttonLink') as string;
        const isActive = formData.get('isActive') === 'on';
        const order = Number(formData.get('order')) || 0;

        const imageFile = formData.get('image') as File;
        const existingImageUrl = formData.get('existingImageUrl') as string;

        console.log('[updateHeroSlide] ID:', id);
        console.log('[updateHeroSlide] Existing URL:', existingImageUrl);
        console.log('[updateHeroSlide] Image File:', imageFile ? { name: imageFile.name, size: imageFile.size, type: imageFile.type } : 'null');

        if (!title) {
            return { success: false, message: 'Başlık gereklidir.' };
        }

        let imageUrl = existingImageUrl;
        if (imageFile && imageFile.size > 0) {
            const savedPath = await saveImage(imageFile);
            if (savedPath) imageUrl = savedPath;
        }

        await db.update(heroSlides)
            .set({
                title,
                subtitle,
                imageUrl,
                buttonText,
                buttonLink,
                isActive,
                order,
            })
            .where(eq(heroSlides.id, id));

        revalidatePath('/admin/hero');
        revalidatePath('/'); // Revalidate home page
        return { success: true, message: 'Slayt başarıyla güncellendi.' };

    } catch (error) {
        console.error('Error updating hero slide:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function deleteHeroSlide(id: number, _formData?: FormData) {
    try {
        await db.delete(heroSlides).where(eq(heroSlides.id, id));
        revalidatePath('/admin/hero');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error deleting hero slide:', error);
        return { success: false, error: 'Silinemedi.' };
    }
}
