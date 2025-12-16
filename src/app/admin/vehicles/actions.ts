'use server';

import { db } from '@/db';
import { vehicles } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function saveImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = join(process.cwd(), 'public', 'uploads', 'vehicles');
        await mkdir(uploadDir, { recursive: true });

        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        return `/api/uploads/vehicles/${filename}`;
    } catch (error) {
        console.error('Error saving vehicle image:', error);
        throw new Error('Araç görseli kaydedilemedi.');
    }
}

export async function getVehicles() {
    try {
        return await db.select().from(vehicles).orderBy(asc(vehicles.order));
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return [];
    }
}

export async function getVehicle(id: number) {
    try {
        const result = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return null;
    }
}

export async function createVehicle(prevState: any, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const capacity = Number(formData.get('capacity')) || 0;
        const fuelType = formData.get('fuelType') as string;
        const driverOption = formData.get('driverOption') as string;
        const imageFile = formData.get('imageFile') as File;
        const existingImageUrl = formData.get('imageFile_current') as string;
        const isActive = formData.get('isActive') === 'on';
        const order = Number(formData.get('order')) || 0;

        if (!name) {
            return { success: false, message: 'Araç adı gereklidir.' };
        }

        // Handle image upload
        let imageUrl = existingImageUrl;
        if (imageFile && imageFile.size > 0) {
            const savedPath = await saveImage(imageFile);
            if (savedPath) imageUrl = savedPath;
        }

        await db.insert(vehicles).values({
            name,
            category,
            capacity,
            fuelType,
            driverOption,
            imageUrl,
            isActive,
            order,
        });

        revalidatePath('/admin/vehicles');
        revalidatePath('/arac-filomuz');
        return { success: true, message: 'Araç başarıyla eklendi.' };

    } catch (error) {
        console.error('Error creating vehicle:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function updateVehicle(id: number, prevState: any, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const capacity = Number(formData.get('capacity')) || 0;
        const fuelType = formData.get('fuelType') as string;
        const driverOption = formData.get('driverOption') as string;
        const imageFile = formData.get('imageFile') as File;
        const existingImageUrl = formData.get('imageFile_current') as string;
        const isActive = formData.get('isActive') === 'on';
        const order = Number(formData.get('order')) || 0;

        if (!name) {
            return { success: false, message: 'Araç adı gereklidir.' };
        }

        // Handle image upload
        let imageUrl = existingImageUrl;
        if (imageFile && imageFile.size > 0) {
            const savedPath = await saveImage(imageFile);
            if (savedPath) imageUrl = savedPath;
        }

        await db.update(vehicles)
            .set({
                name,
                category,
                capacity,
                fuelType,
                driverOption,
                imageUrl,
                isActive,
                order,
            })
            .where(eq(vehicles.id, id));

        revalidatePath('/admin/vehicles');
        revalidatePath('/arac-filomuz');
        return { success: true, message: 'Araç başarıyla güncellendi.' };

    } catch (error) {
        console.error('Error updating vehicle:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function deleteVehicle(id: number) {
    try {
        await db.delete(vehicles).where(eq(vehicles.id, id));
        revalidatePath('/admin/vehicles');
        revalidatePath('/arac-filomuz');
        return { success: true };
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        return { success: false, error: 'Silinemedi.' };
    }
}
