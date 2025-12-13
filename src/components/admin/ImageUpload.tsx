import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    name: string;
    defaultValue?: string;
    label?: string;
    sizeHint?: string;
}

export default function ImageUpload({ name, defaultValue, label = "Görsel Yükle", sizeHint }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(defaultValue || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.preventDefault();
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            if (fileInputRef.current) {
                // Determine if we can programmatically set files (modern browsers allow this via DataTransfer)
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;

                // Trigger change handler
                const objectUrl = URL.createObjectURL(file);
                setPreview(objectUrl);
            }
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {sizeHint && <span className="block text-xs text-blue-500 mt-1 font-normal">{sizeHint}</span>}
            </label>

            {/* Hidden Input to store the existing URL if we are keeping the preview of the default value */}
            {defaultValue && preview === defaultValue && (
                <input type="hidden" name="existingImageUrl" value={defaultValue} />
            )}
            {/* If we have a preview that IS the default value, we should also send it if the server needs it to know "keep existing" 
                But typically servers check "if file uploaded -> use new, else -> use old". 
                However, to be safe, standard pattern often uses a hidden field for the "current" value. 
            */}
            <input type="hidden" name={name + "_current"} value={defaultValue || ''} />

            <div
                className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${preview ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'
                    }`}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    name={name}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {preview ? (
                    <div className="relative aspect-video w-full h-48 sm:h-64 rounded-md overflow-hidden bg-white">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-contain"
                        />
                        <button
                            onClick={handleClear}
                            className="absolute top-2 right-2 z-20 bg-white/90 text-red-600 p-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
                            type="button"
                        >
                            <X size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                        <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                            <Upload size={24} className="text-blue-500" />
                        </div>
                        <p className="font-medium text-gray-700">Tıklayın veya sürükleyip bırakın</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                    </div>
                )}
            </div>
        </div>
    );
}
