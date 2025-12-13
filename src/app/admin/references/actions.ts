'use server';

import { db } from '@/db';
import { references } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getReferences() {
    try {
        return await db.select().from(references).orderBy(asc(references.order));
    } catch (error) {
        console.error('Error fetching references:', error);
        return [];
    }
}

export async function getReference(id: number) {
    try {
        const result = await db.select().from(references).where(eq(references.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching reference:', error);
        return null;
    }
}

export async function createReference(prevState: any, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const category = formData.get('category') as string || 'private'; // 'public' (Kamu) or 'private' (Özel)
        const order = Number(formData.get('order')) || 0;

        // Handle file upload
        const logoFile = formData.get('logoFile') as File;
        let imageUrl = '';

        if (logoFile && logoFile.size > 0) {
            // Import upload function
            const { uploadFile } = await import('@/lib/upload');
            const uploadedUrl = await uploadFile(logoFile);
            if (!uploadedUrl) {
                return { success: false, message: 'Dosya yüklenirken hata oluştu.' };
            }
            imageUrl = uploadedUrl;
        } else {
            return { success: false, message: 'Logo dosyası gereklidir.' };
        }

        if (!name) {
            return { success: false, message: 'İsim gereklidir.' };
        }

        await db.insert(references).values({
            name,
            imageUrl,
            category,
            order,
        });

        revalidatePath('/admin/references');
        revalidatePath('/referanslar');
        revalidatePath('/'); // Homepage might display references too
        return { success: true, message: 'Referans başarıyla eklendi.' };

    } catch (error) {
        console.error('Error creating reference:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function updateReference(id: number, prevState: any, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const category = formData.get('category') as string || 'private';
        const order = Number(formData.get('order')) || 0;

        // Handle file upload
        const logoFile = formData.get('logoFile') as File;
        let imageUrl = '';

        if (logoFile && logoFile.size > 0) {
            // New file uploaded
            const { uploadFile } = await import('@/lib/upload');
            const uploadedUrl = await uploadFile(logoFile);
            if (!uploadedUrl) {
                return { success: false, message: 'Dosya yüklenirken hata oluştu.' };
            }
            imageUrl = uploadedUrl;
        } else {
            // Keep existing image URL
            const existing = await db.select().from(references).where(eq(references.id, id)).limit(1);
            if (existing[0]) {
                imageUrl = existing[0].imageUrl;
            } else {
                return { success: false, message: 'Referans bulunamadı.' };
            }
        }

        if (!name) {
            return { success: false, message: 'İsim gereklidir.' };
        }

        await db.update(references)
            .set({
                name,
                imageUrl,
                category,
                order,
            })
            .where(eq(references.id, id));

        revalidatePath('/admin/references');
        revalidatePath('/referanslar');
        revalidatePath('/');
        return { success: true, message: 'Referans başarıyla güncellendi.' };

    } catch (error) {
        console.error('Error updating reference:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function deleteReference(id: number, _formData?: FormData) {
    try {
        await db.delete(references).where(eq(references.id, id));
        revalidatePath('/admin/references');
        revalidatePath('/referanslar');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error deleting reference:', error);
        return { success: false, error: 'Silinemedi.' };
    }
}
