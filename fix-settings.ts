
import { db } from './src/db';
import { settings } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function fixSettings() {
    try {
        const existing = await db.select().from(settings).limit(1);
        if (existing.length > 0) {
            await db.update(settings)
                .set({
                    faviconUrl: '/favicon.ico',
                    updatedAt: new Date(),
                })
                .where(eq(settings.id, existing[0].id));
            console.log("Updated faviconUrl to /favicon.ico");
        } else {
            console.log("No settings found to update.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

fixSettings();
