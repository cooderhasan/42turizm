import { NextResponse } from 'next/server';
import { db } from '@/db';
import { settings } from '@/db/schema';

export async function GET() {
    try {
        const result = await db.select().from(settings).limit(1);

        if (result.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'Settings not found'
            }, { status: 404 });
        }

        const socialMediaSettings = result[0];

        return NextResponse.json({
            success: true,
            data: {
                instagramUrl: socialMediaSettings.instagramUrl,
                facebookUrl: socialMediaSettings.facebookUrl,
                linkedinUrl: socialMediaSettings.linkedinUrl
            }
        });

    } catch (error) {
        console.error('Error fetching social media settings:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch social media settings'
        }, { status: 500 });
    }
}