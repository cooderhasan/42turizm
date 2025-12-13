'use server';

import { db } from '@/db';
import { settings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function saveImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = join(process.cwd(), 'public', 'uploads', 'logo');
        await mkdir(uploadDir, { recursive: true });

        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        return `/uploads/logo/${filename}`;
    } catch (error) {
        console.error('Error saving logo:', error);
        throw new Error('Logo kaydedilemedi.');
    }
}

export async function getSettings() {
    try {
        const result = await db.select().from(settings).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
    }
}

export async function updateSettings(prevState: any, formData: FormData) {
    try {
        const siteTitle = formData.get('siteTitle') as string;
        const siteDescription = formData.get('siteDescription') as string;
        const address = formData.get('address') as string;
        const phone1 = formData.get('phone1') as string;
        const phone2 = formData.get('phone2') as string;
        const email = formData.get('email') as string;
        const whatsappNumber = formData.get('whatsappNumber') as string;
        const aboutText = formData.get('aboutText') as string;
        const missionText = formData.get('missionText') as string;
        const visionText = formData.get('visionText') as string;
        const instagramUrl = formData.get('instagramUrl') as string;
        const facebookUrl = formData.get('facebookUrl') as string;
        const linkedinUrl = formData.get('linkedinUrl') as string;
        const videoUrl = formData.get('videoUrl') as string;
        const videoThumbnailUrl = formData.get('videoThumbnailUrl') as string;

        const logoFile = formData.get('logoFile') as File;
        const existingLogoUrl = formData.get('logoFile_current') as string;

        // Handle Logo Upload
        let logoUrl = existingLogoUrl;
        if (logoFile && logoFile.size > 0) {
            const savedPath = await saveImage(logoFile);
            if (savedPath) logoUrl = savedPath;
        }

        // Check if settings exist to update or insert
        const existing = await db.select().from(settings).limit(1);

        if (existing.length === 0) {
            await db.insert(settings).values({
                siteTitle,
                siteDescription,
                address,
                phone1,
                phone2,
                email,
                whatsappNumber,
                aboutText,
                missionText,
                visionText,
                instagramUrl,
                facebookUrl,
                linkedinUrl,
                videoUrl,
                videoThumbnailUrl,
                logoUrl
            });
        } else {
            await db.update(settings)
                .set({
                    siteTitle,
                    siteDescription,
                    address,
                    phone1,
                    phone2,
                    email,
                    whatsappNumber,
                    aboutText,
                    missionText,
                    visionText,
                    instagramUrl,
                    facebookUrl,
                    linkedinUrl,
                    videoUrl,
                    videoThumbnailUrl,
                    logoUrl,
                    updatedAt: new Date(),
                })
                .where(eq(settings.id, existing[0].id));
        }

        revalidatePath('/', 'layout');
        return { success: true, message: 'Ayarlar başarıyla güncellendi.' };

    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}
