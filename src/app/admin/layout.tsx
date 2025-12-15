import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 min-h-screen w-full">
                {children}
            </main>
        </div>
    );
}
