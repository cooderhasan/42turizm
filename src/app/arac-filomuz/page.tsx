import React from 'react';
import { db } from '@/db';
import { vehicles } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import FleetClient from './FleetClient';

export const metadata = {
    title: 'Araç Filomuz | 42 Turizm',
    description: 'Her ihtiyaca uygun, modern ve bakımlı araçlarımızla konforlu yolculuklar sunuyoruz.',
};

export default async function FleetPage() {
    let vehicleData: any[] = [];
    try {
        vehicleData = await db.select()
            .from(vehicles)
            .where(eq(vehicles.isActive, true))
            .orderBy(asc(vehicles.order));
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        vehicleData = [];
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Page Header */}
            <div className="bg-[#0f172a] text-white pt-48 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Araç Filomuz</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Her ihtiyaca uygun, modern ve bakımlı araçlarımızla konforlu yolculuklar sunuyoruz.
                    </p>
                </div>
            </div>

            <FleetClient vehicles={vehicleData} />
        </div>
    );
}
