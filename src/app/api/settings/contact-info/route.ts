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
                whatsappNumber: data.whatsappNumber,
                googleMapsEmbedUrl: data.googleMapsEmbedUrl,
                aboutText: data.aboutText,
                aboutImageUrl: data.aboutImageUrl,
                stat1Label: data.stat1Label,
                stat1Value: data.stat1Value,
                stat2Label: data.stat2Label,
                stat2Value: data.stat2Value,
                stat3Label: data.stat3Label,
                stat3Value: data.stat3Value,
                footerText: data.footerText
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