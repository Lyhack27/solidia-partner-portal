"use client";

import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import ProjectsChart from "@/components/ProjectsChart";
import "./dashboard.css";

export default function Home() {
  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <div className="stats-grid">
        <StatCard
          title="Total Projects"
          value="0"
          change="No data"
          icon="📊"
        />
        <StatCard
          title="Active Partners"
          value="2"
          change="No data"
          icon="👥"
        />
        <StatCard
          title="Revenue"
          value="$0"
          change="No data"
          icon="💰"
        />
        <StatCard
          title="Completion Rate"
          value="0%"
          change="No data"
          icon="✅"
        />
        <StatCard
          title="Pending Tasks"
          value="0"
          change="No data"
          icon="📝"
        />
        <StatCard
          title="Client Inquiries"
          value="0"
          change="No data"
          icon="📩"
        />
        <StatCard
          title="System Alerts"
          value="0"
          change="No data"
          icon="⚠️"
        />
        <StatCard
          title="Avg. Response Time"
          value="0m"
          change="No data"
          icon="⏱️"
        />
      </div>

      <div className="charts-section">
        <ProjectsChart />
      </div>
    </div>
  );
}
