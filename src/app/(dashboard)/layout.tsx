import Sidebar from "../sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#0a1a2f]">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto text-white">{children}</main>
        </div>
    );
}
