'use client';

import React from 'react';
import ServiceForm from '../ServiceForm';
import { createService } from '../actions';

export default function NewServicePage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Yeni Hizmet Ekle</h1>
            <ServiceForm action={createService} />
        </div>
    );
}
