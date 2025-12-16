'use server';

import { db } from '@/db';
import { services } from '@/db/schema';
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
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'services');
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`; // Sanitize filename
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        return `/api/uploads/services/${filename}`;
    } catch (error) {
        console.error('Error saving image:', error);
        throw new Error('Görsel kaydedilemedi.');
    }
}

export async function getServices() {
    try {
        return await db.select().from(services).orderBy(asc(services.order));
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export async function getService(id: number) {
    try {
        const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching service:', error);
        return null;
    }
}

export async function createService(prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const shortDescription = formData.get('shortDescription') as string;
        const detailedDescription = formData.get('detailedDescription') as string;
        // const imageUrl = formData.get('imageUrl') as string;
        const imageFile = formData.get('image') as File;
        const iconName = formData.get('iconName') as string;
        const serviceArea = formData.get('serviceArea') as string;

        // Handle Image Upload
        let imageUrl = '';
        if (imageFile && imageFile.size > 0) {
            const savedPath = await saveImage(imageFile);
            if (savedPath) imageUrl = savedPath;
        }
        const isActive = formData.get('isActive') === 'on';
        const order = Number(formData.get('order')) || 0;
        const featuresRaw = formData.get('features') as string;

        const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(f => f) : [];

        if (!title || !slug) {
            return { success: false, message: 'Başlık ve URL (slug) gereklidir.' };
        }

        await db.insert(services).values({
            title,
            slug,
            shortDescription,
            detailedDescription,
            imageUrl,
            iconName,
            features,
            serviceArea,
            isActive,
            order,
        });

        revalidatePath('/admin/services');
        revalidatePath('/hizmetlerimiz');
        return { success: true, message: 'Hizmet başarıyla oluşturuldu.' };

    } catch (error) {
        console.error('Error creating service:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function updateService(id: number, prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const shortDescription = formData.get('shortDescription') as string;
        const detailedDescription = formData.get('detailedDescription') as string;
        // const imageUrl = formData.get('imageUrl') as string;
        const imageFile = formData.get('image') as File;
        const existingImageUrl = formData.get('existingImageUrl') as string;
        const iconName = formData.get('iconName') as string;
        const serviceArea = formData.get('serviceArea') as string;

        // Handle Image Upload
        let imageUrl = existingImageUrl;
        if (imageFile && imageFile.size > 0) {
            const savedPath = await saveImage(imageFile);
            if (savedPath) imageUrl = savedPath;
        }
        const isActive = formData.get('isActive') === 'on';
        const order = Number(formData.get('order')) || 0;
        const featuresRaw = formData.get('features') as string;

        const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(f => f) : [];

        if (!title || !slug) {
            return { success: false, message: 'Başlık ve URL (slug) gereklidir.' };
        }

        await db.update(services)
            .set({
                title,
                slug,
                shortDescription,
                detailedDescription,
                imageUrl,
                iconName,
                features,
                serviceArea,
                isActive,
                order,
            })
            .where(eq(services.id, id));

        revalidatePath('/admin/services');
        revalidatePath('/hizmetlerimiz');
        return { success: true, message: 'Hizmet başarıyla güncellendi.' };

    } catch (error) {
        console.error('Error updating service:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function deleteService(id: number) {
    try {
        await db.delete(services).where(eq(services.id, id));
        revalidatePath('/admin/services');
        revalidatePath('/hizmetlerimiz');
        return { success: true };
    } catch (error) {
        console.error('Error deleting service:', error);
        return { success: false, error: 'Silinemedi.' };
    }
}
