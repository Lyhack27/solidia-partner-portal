"use client";
import React, { useState } from "react";

export default function PartnerPortalProject() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="flex min-h-screen text-white" style={{ backgroundColor: "#0a1a2f" }}>
      {/* Sidebar */}
      <aside className="w-64 p-6 flex flex-col gap-6 shadow-lg" style={{ backgroundColor: "#081526" }}>
        <h2 className="text-xl font-semibold mb-4">SOLIDIA Panel</h2>
        <nav className="flex flex-col gap-4 text-gray-300">
          <button onClick={() => setView("dashboard")} className="text-left hover:text-white transition">
            Dashboard
          </button>
          <button onClick={() => setView("projects")} className="text-left hover:text-white transition">
            Projects
          </button>
          <button onClick={() => setView("bots")} className="text-left hover:text-white transition">
            Bots in the Cloud
          </button>
          <button onClick={() => setView("documents")} className="text-left hover:text-white transition">
            Documents
          </button>
          <button onClick={() => setView("feedback")} className="text-left hover:text-white transition">
            Feedback
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* DASHBOARD VIEW */}
        {view === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <p className="text-gray-300">Welcome to the SOLIDIA Partner Dashboard.</p>
          </div>
        )}

        {/* PROJECTS VIEW */}
        {view === "projects" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Projects</h1>

            <section className="max-w-5xl p-10 rounded-2xl shadow-xl mb-12" style={{ backgroundColor: "#10233f" }}>
              <h2 className="text-2xl font-semibold mb-6">Project: Solar Automation & AI System</h2>
            </section>

            <section className="max-w-5xl">
              <h2 className="text-2xl font-semibold mb-6">Active Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  style={{ backgroundColor: "#0e1d35" }}
                >
                  <h3 className="text-xl font-semibold mb-2">Solar Automation & AI System</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Full ecosystem for solar battery education, automation & quoting.
                  </p>
                  <button
                    onClick={() => setView("projectDetail")}
                    className="px-4 py-2 bg-blue-700 rounded-xl"
                  >
                    Open Project
                  </button>
                </div>

                <div
                  className="p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  style={{ backgroundColor: "#0e1d35" }}
                >
                  <h3 className="text-xl font-semibold mb-2">Bots in the Cloud</h3>
                  <p className="text-sm text-gray-300 mb-4">Coming soon.</p>
                  <button className="px-4 py-2 bg-gray-600 rounded-xl">Pending</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PROJECT DETAIL VIEW */}
        {view === "projectDetail" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Solar Automation & AI System</h1>

            <section
              className="max-w-5xl p-10 rounded-2xl shadow-xl mb-12"
              style={{ backgroundColor: "#10233f" }}
            >
              <h2 className="text-2xl font-semibold mb-6">Project Breakdown</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Overview",
                    text: "Based on Shena’s requirements, this project delivers an end-to-end solar sales ecosystem: education, rebate explanation, automated quoting, battery sizing AI, lead qualification, and automated workflows.",
                  },
                  {
                    title: "Value Proposition",
                    text: "We replicate the proven high-converting solar battery funnel with education, VIC rebates explanation, calculators, questionnaires, automated quote generation, and expert booking paths.",
                  },
                  {
                    title: "Roadmap",
                    text: "Week 1: Content + structure. Week 2: Landing + automation. Week 3: AI Advisor + quote generator. Week 4: Optimization & deployment.",
                  },
                  {
                    title: "Deliverables",
                    text: "Landing page, rebate education flow, AI advisor, quote generator, PDF generator, automation workflows, content set, ClickUp integration, and dashboard.",
                  },
                  {
                    title: "AI Advisor Integration",
                    text: "The advisor answers questions, calculates battery size, recommends brands, estimates savings, generates quotes, and routes leads automatically.",
                  },
                  {
                    title: "Automations",
                    text: "Automated workflows include: lead capture, validation, CRM sync, notifications, follow-ups, installer routing, analytics, and reporting.",
                  },
                ].map((section, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl"
                    style={{ backgroundColor: "#0e1d35" }}
                  >
                    <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                    <p className="text-gray-300 mb-4">{section.text}</p>
                    <textarea
                      className="w-full p-4 rounded-xl border border-blue-800"
                      style={{ backgroundColor: "#0a1a2f" }}
                      placeholder="Feedback..."
                    />
                    <div className="flex gap-3 mt-3">
                      <button className="px-4 py-2 bg-blue-700 rounded-xl">Submit Feedback</button>
                      <button className="px-4 py-2 bg-green-700 rounded-xl">Approve</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <button
              onClick={() => setView("projects")}
              className="px-4 py-2 bg-gray-600 rounded-xl"
            >
              Back to Projects
            </button>
          </div>
        )}

        {/* BOTS VIEW */}
        {view === "bots" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Bots in the Cloud</h1>
            <p className="text-gray-300">This section is currently pending. Bots will be added later.</p>
          </div>
        )}

        {/* DOCUMENTS VIEW */}
        {view === "documents" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Documents</h1>
            <p className="text-gray-300">Document storage will be added here.</p>
          </div>
        )}

        {/* FEEDBACK VIEW */}
        {view === "feedback" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Feedback</h1>
            <p className="text-gray-300">Feedback center coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
