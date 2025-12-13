import { NextResponse } from 'next/server';
import { db } from '@/db';
import { contactMessages } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'Geçersiz mesaj ID.'
            }, { status: 400 });
        }

        await db.delete(contactMessages).where(eq(contactMessages.id, parseInt(id)));

        return NextResponse.json({
            success: true,
            message: 'Mesaj başarıyla silindi.'
        });

    } catch (error) {
        console.error('Error deleting contact message:', error);
        return NextResponse.json({
            success: false,
            message: 'Mesaj silinirken bir hata oluştu.'
        }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'Geçersiz mesaj ID.'
            }, { status: 400 });
        }

        await db.update(contactMessages)
            .set({ isRead: true })
            .where(eq(contactMessages.id, parseInt(id)));

        return NextResponse.json({
            success: true,
            message: 'Mesaj okundu olarak işaretlendi.'
        });

    } catch (error) {
        console.error('Error marking message as read:', error);
        return NextResponse.json({
            success: false,
            message: 'Mesaj işaretlenirken bir hata oluştu.'
        }, { status: 500 });
    }
}