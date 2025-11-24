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
          value="45"
          change="+12% from last month"
          icon="📊"
        />
        <StatCard
          title="Active Partners"
          value="28"
          change="+5 new this week"
          icon="👥"
        />
        <StatCard
          title="Revenue"
          value="$181K"
          change="+18% from last month"
          icon="💰"
        />
        <StatCard
          title="Completion Rate"
          value="94%"
          change="+2% improvement"
          icon="✅"
        />
      </div>

      <div className="charts-section">
        <ProjectsChart />
      </div>
    </div>
  );
}
