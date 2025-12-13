
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { settings } from '@/db/schema';

export async function GET() {
    try {
        const result = await db.select().from(settings).limit(1);
        const settingsData = result[0];

        return NextResponse.json({
            logoUrl: settingsData?.logoUrl || null
        });
    } catch (error) {
        console.error('Error fetching logo:', error);
        return NextResponse.json({ logoUrl: null }, { status: 500 });
    }
}
