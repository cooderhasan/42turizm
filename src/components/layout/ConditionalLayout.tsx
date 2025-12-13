
'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Admin ve login sayfalarında Header/Footer gösterme
    const isAdminOrLogin = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

    if (isAdminOrLogin) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
            <WhatsAppButton />
        </>
    );
}
