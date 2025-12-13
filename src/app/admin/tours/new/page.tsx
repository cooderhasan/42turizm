import React from 'react';
import TourForm from '../TourForm';
import { createTour } from '../actions';

export default function NewTourPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Yeni Tur Paketi Ekle</h1>
            <TourForm action={createTour} />
        </div>
    );
}
