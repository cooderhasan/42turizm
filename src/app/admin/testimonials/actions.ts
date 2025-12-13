'use server';

import { db } from '@/db';
import { testimonials } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function saveImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = join(process.cwd(), 'public', 'uploads', 'testimonials');
        await mkdir(uploadDir, { recursive: true });

        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        return `/uploads/testimonials/${filename}`;
    } catch (error) {
        console.error('Error saving testimonial image:', error);
        throw new Error('Yorum görseli kaydedilemedi.');
    }
}

export async function getTestimonials() {
    try {
        const result = await db.select().from(testimonials).orderBy(testimonials.order);
        return result;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }
}

export async function getTestimonial(id: number) {
    try {
        const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        return null;
    }
}

export async function createTestimonial(prevState: any, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const rating = Number(formData.get('rating'));
        const isActive = formData.get('isActive') === 'on';
        const order = Number(formData.get('order')) || 0;

        const imageFile = formData.get('imageFile') as File;
        let imageUrl: string | null = null;

        if (imageFile && imageFile.size > 0) {
            imageUrl = await saveImage(imageFile);
        }

        await db.insert(testimonials).values({
            name,
            title,
            content,
            rating,
            imageUrl,
            isActive,
            order,
        });

        revalidatePath('/admin/testimonials');
        redirect('/admin/testimonials');

    } catch (error) {
        console.error('Error creating testimonial:', error);
        return { success: false, message: 'Yorum oluşturulurken bir hata oluştu.' };
    }
}

export async function updateTestimonial(prevState: any, formData: FormData) {
    try {
        const id = Number(formData.get('id'));
        const name = formData.get('name') as string;
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const rating = Number(formData.get('rating'));
        const isActive = formData.get('isActive') === 'on';
        const order = Number(formData.get('order')) || 0;

        const imageFile = formData.get('imageFile') as File;
        const existingImageUrl = formData.get('existingImageUrl') as string;
        let imageUrl: string | null = existingImageUrl || null;

        if (imageFile && imageFile.size > 0) {
            imageUrl = await saveImage(imageFile);
        }

        await db.update(testimonials)
            .set({
                name,
                title,
                content,
                rating,
                imageUrl,
                isActive,
                order,
                updatedAt: new Date(),
            })
            .where(eq(testimonials.id, id));

        revalidatePath('/admin/testimonials');
        redirect('/admin/testimonials');

    } catch (error) {
        console.error('Error updating testimonial:', error);
        return { success: false, message: 'Yorum güncellenirken bir hata oluştu.' };
    }
}

export async function deleteTestimonial(id: number) {
    try {
        await db.delete(testimonials).where(eq(testimonials.id, id));
        revalidatePath('/admin/testimonials');
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        throw new Error('Yorum silinirken bir hata oluştu.');
    }
}