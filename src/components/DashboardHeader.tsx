"use client";

export default function DashboardHeader() {
    return (
        <div className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-white">Partner Dashboard</h1>
                <p className="text-gray-400 mt-2">Overview of your projects and performance.</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                    <p className="text-white font-medium">Admin User</p>
                    <p className="text-xs text-gray-400">admin@solidia.com</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    A
                </div>
            </div>
        </div>
    );
}
