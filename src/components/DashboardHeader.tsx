"use client";

export default function DashboardHeader() {
    return (
        <div className="dashboard-header">
            <div>
                <h1 className="dashboard-title">Partner Dashboard</h1>
                <p className="dashboard-subtitle">Welcome back to SOLIDIA Portal</p>
            </div>
            <div className="user-info">
                <span className="user-name">Admin User</span>
                <div className="user-avatar">A</div>
            </div>
        </div>
    );
}
