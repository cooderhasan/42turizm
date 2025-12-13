import React from 'react';
import ReferenceList from '@/components/references/ReferenceList';
import { db } from '@/db';
import { references } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const metadata = {
    title: 'Referanslarımız | 42 Turizm',
    description: 'Bize güvenen ve yol arkadaşlığı yaptığımız değerli kamu kurumları ve özel sektör firmaları.',
};

export default async function ReferencesPage() {
    const referencesData = await db.select().from(references).orderBy(desc(references.order));

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Page Header */}
            <div className="bg-[#0a192f] text-white pt-48 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Referanslarımız</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Bize güvenen ve yol arkadaşlığı yaptığımız değerli kurum ve kuruluşlar.
                    </p>
                </div>
            </div>

            <ReferenceList references={referencesData} />
        </div>
    );
}
