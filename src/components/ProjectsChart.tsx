"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Admins', members: 1 },
    { name: 'Partners', members: 1 },
];

export default function ProjectsChart() {
    return (
        <div className="chart-container">
            <h3 className="chart-title">Team Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" allowDecimals={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }}
                        labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="members" fill="#3b82f6" name="Active Members" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
