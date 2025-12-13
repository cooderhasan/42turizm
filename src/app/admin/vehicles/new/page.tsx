import React from 'react';
import VehicleForm from '../VehicleForm';
import { createVehicle } from '../actions';

export default function NewVehiclePage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Yeni Araç Ekle</h1>
            <VehicleForm action={createVehicle} />
        </div>
    );
}
