import { NextResponse } from 'next/server';
import { db } from '@/db';
import { contactMessages } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    try {
        const messages = await db.select().from(contactMessages).orderBy(contactMessages.createdAt);

        return NextResponse.json({
            success: true,
            messages
        });

    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return NextResponse.json({
            success: false,
            message: 'Mesajlar yüklenirken bir hata oluştu.'
        }, { status: 500 });
    }
}
