import { NextResponse } from 'next/server';
import { db } from '@/db';
import { settings } from '@/db/schema';

export async function GET() {
    try {
        const result = await db.select().from(settings).limit(1);

        if (result.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'Ayarlar bulunamadı.'
            }, { status: 404 });
        }

        const data = result[0];

        return NextResponse.json({
            success: true,
            data: {
                phone1: data.phone1,
                phone2: data.phone2,
                email: data.email,
                address: data.address,
                whatsappNumber: data.whatsappNumber
            }
        });

    } catch (error) {
        console.error('Error fetching contact info:', error);
        return NextResponse.json({
            success: false,
            message: 'İletişim bilgileri yüklenirken bir hata oluştu.'
        }, { status: 500 });
    }
}