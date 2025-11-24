"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Solar A', projects: 12, revenue: 45000 },
    { name: 'Solar B', projects: 8, revenue: 32000 },
    { name: 'Wind', projects: 15, revenue: 58000 },
    { name: 'Hydro', projects: 6, revenue: 28000 },
    { name: 'Geothermal', projects: 4, revenue: 18000 },
];

export default function ProjectsChart() {
    return (
        <div className="chart-container">
            <h3 className="chart-title">Projects Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }}
                        labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="projects" fill="#3b82f6" />
                    <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
