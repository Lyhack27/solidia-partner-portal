"use client";

interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon?: string;
}

export default function StatCard({ title, value, change, icon }: StatCardProps) {
    return (
        <div className="stat-card">
            <div className="stat-header">
                {icon && <span className="stat-icon">{icon}</span>}
                <h3>{title}</h3>
            </div>
            <div className="stat-value">{value}</div>
            {change && <div className="stat-change">{change}</div>}
        </div>
    );
}
