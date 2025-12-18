
'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ConditionalLayout({
    children,
    settings
}: {
    children: React.ReactNode;
    settings?: any; // Using any for now to avoid extensive type imports, but strictly it is typeof settings item
}) {
    const pathname = usePathname();

    // Admin ve login sayfalarında Header/Footer gösterme
    const isAdminOrLogin = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

    if (isAdminOrLogin) {
        return <>{children}</>;
    }

    return (
        <>
            <Header settings={settings} />
            {children}
            <Footer />
            <WhatsAppButton />
        </>
    );
}
