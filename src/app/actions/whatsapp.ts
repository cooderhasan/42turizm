'use server';

import { db } from '@/db';
import { settings } from '@/db/schema';

export async function getWhatsAppNumber() {
    try {
        const settingsData = await db.select().from(settings).limit(1);
        return settingsData[0]?.whatsappNumber || null;
    } catch (error) {
        console.error('Error fetching WhatsApp number:', error);
        return null;
    }
}
