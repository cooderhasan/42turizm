import { db } from '@/db';
import { settings } from '@/db/schema';
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
    let siteSettings = null;
    try {
        const result = await db.select().from(settings).limit(1);
        if (result.length > 0) {
            siteSettings = result[0];
        }
    } catch (error) {
        console.error('Error fetching settings for contact page:', error);
    }

    return <ContactClient settings={siteSettings} />;
}
