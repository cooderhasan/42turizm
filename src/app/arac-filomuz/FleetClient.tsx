
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Users, Fuel, Briefcase } from 'lucide-react';

const CATEGORIES = [
    { id: 'all', label: 'Tümü' },
    { id: 'binek', label: 'Binek Araçlar' },
    { id: 'vip', label: 'VIP Araçlar' },
    { id: 'minibus', label: 'Minibüsler' },
    { id: 'otobus', label: 'Otobüsler' },
];

interface Vehicle {
    id: number;
    name: string;
    category: string | null;
    capacity: number | null;
    fuelType: string | null;
    driverOption: string | null;
    imageUrl: string | null;
}

interface FleetClientProps {
    vehicles: Vehicle[];
}

export default function FleetClient({ vehicles }: FleetClientProps) {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredVehicles = activeCategory === 'all'
        ? vehicles
        : vehicles.filter(v => v.category === activeCategory);

    return (
        <div className="container mx-auto px-4 -mt-8">
            {/* Category Filter */}
            <div className="bg-white p-4 rounded-xl shadow-lg flex flex-wrap justify-center gap-2 mb-12">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${activeCategory === cat.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                        <div className="relative h-56 overflow-hidden">
                            {vehicle.imageUrl && (
                                <Image
                                    src={vehicle.imageUrl}
                                    alt={vehicle.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 uppercase">
                                {CATEGORIES.find(c => c.id === vehicle.category)?.label || vehicle.category}
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{vehicle.name}</h3>

                            <div className="space-y-2">
                                {vehicle.capacity && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Users size={18} className="text-blue-500" />
                                        <span>{vehicle.capacity} Yolcu</span>
                                    </div>
                                )}
                                {vehicle.fuelType && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Fuel size={18} className="text-blue-500" />
                                        <span>{vehicle.fuelType}</span>
                                    </div>
                                )}
                                {vehicle.driverOption && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Briefcase size={18} className="text-blue-500" />
                                        <span>{vehicle.driverOption}</span>
                                    </div>
                                )}
                            </div>

                            <a href="/iletisim" className="block w-full mt-6 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors text-center">
                                Bilgi Al
                            </a>
                        </div>
                    </div>
                ))}
                {filteredVehicles.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        Bu kategoride araç bulunmamaktadır.
                    </div>
                )}
            </div>
        </div>
    );
}
