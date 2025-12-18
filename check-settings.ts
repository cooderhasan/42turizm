
import { db } from './src/db';
import { settings } from './src/db/schema';

async function checkSettings() {
    try {
        const data = await db.select().from(settings);
        console.log("Total Settings Rows:", data.length);
        if (data.length > 0) {
            console.log("Settings ID:", data[0].id);
            console.log("Favicon URL:", data[0].faviconUrl);
            console.log("Updated At:", data[0].updatedAt);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

checkSettings();
