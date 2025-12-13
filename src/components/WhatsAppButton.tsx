'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getWhatsAppNumber } from '@/app/actions/whatsapp';

export default function WhatsAppButton() {
    const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);

    useEffect(() => {
        async function loadNumber() {
            const number = await getWhatsAppNumber();
            setWhatsappNumber(number);
        }
        loadNumber();
    }, []);

    // Eğer numara yoksa butonu gösterme
    if (!whatsappNumber) {
        return null;
    }

    const message = 'Merhaba, 42 Turizm hakkında bilgi almak istiyorum.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="WhatsApp ile iletişime geç"
        >
            {/* Main Button */}
            <div className="relative">
                {/* Pulse Animation */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>

                {/* Button */}
                <div className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110">
                    <MessageCircle size={32} className="animate-pulse" />
                </div>

                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce">
                    1
                </div>
            </div>

            {/* Tooltip - Sadece hover'da görünür */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 pointer-events-none">
                <span className="text-sm font-medium">WhatsApp ile yazın</span>
                {/* Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900"></div>
                </div>
            </div>
        </a>
    );
}
