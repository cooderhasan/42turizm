'use server';

import { db } from '@/db';
import { tourImages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getTourImages(tourId: number) {
    try {
        return await db.select().from(tourImages).where(eq(tourImages.tourId, tourId));
    } catch (error) {
        console.error('Error fetching tour images:', error);
        return [];
    }
}

import { uploadFile } from '@/lib/upload';

export async function addTourImage(prevState: any, formData: FormData) {
    try {
        const tourId = Number(formData.get('tourId'));
        const file = formData.get('image') as File;

        if (!tourId) {
            return { success: false, message: 'Tur ID bulunamadı.' };
        }

        const imageUrl = await uploadFile(file);

        if (!imageUrl) {
            return { success: false, message: 'Lütfen geçerli bir resim yükleyiniz.' };
        }

        await db.insert(tourImages).values({
            tourId,
            imageUrl,
        });

        revalidatePath(`/admin/tours/${tourId}/images`);
        return { success: true, message: 'Görsel başarıyla yüklendi.' };

    } catch (error) {
        console.error('Error adding tour image:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function deleteTourImage(id: number, tourId: number) {
    try {
        await db.delete(tourImages).where(eq(tourImages.id, id));
        revalidatePath(`/admin/tours/${tourId}/images`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting tour image:', error);
        return { success: false, error: 'Silinemedi.' };
    }
}
