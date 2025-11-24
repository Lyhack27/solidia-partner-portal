"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const PROJECT_ID = "solar-automation-project";

interface Note {
  id: string;
  text: string;
  createdAt: string;
  userId?: number;
  user?: {
    email: string;
    role: string;
  };
}

export default function PartnerPortalProject() {
  const [view, setView] = useState("projects");
  const [projectStatus, setProjectStatus] = useState<"pending" | "approved">("pending");
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteInput, setNoteInput] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(false);

  useEffect(() => {
    loadProjectData();
  }, []);

  const loadProjectData = async () => {
    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}`);
      if (response.ok) {
        const data = await response.json();
        setProjectStatus(data.status);
      }
    } catch (error) {
      console.error("Error loading project:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load notes when viewing project detail
  useEffect(() => {
    if (view === "projectDetail") {
      loadNotes();
    }
  }, [view]);

  const loadNotes = async () => {
    setLoadingNotes(true);
    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}/notes`);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleAddNote = async () => {
    if (!noteInput.trim()) return;

    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: noteInput.trim() }),
      });

      if (response.ok) {
        const newNote = await response.json();
        setNotes(prev => [newNote, ...prev]);
        setNoteInput("");
      } else {
        const err = await response.json();
        alert(`Failed to add note: ${err.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note.");
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}/notes/${noteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotes(prev => prev.filter(n => n.id !== noteId));
      } else {
        const err = await response.json();
        alert(`Failed to delete note: ${err.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note.");
    }
  };

  const handleApprove = async () => {
    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (response.ok) {
        setProjectStatus("approved");
        alert("🎉 Project approved!");
      } else {
        const err = await response.json();
        alert(`Failed to approve: ${err.error || response.statusText}`);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to approve project.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white" style={{ backgroundColor: "#0a1a2f" }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen text-white" style={{ backgroundColor: "#0a1a2f" }}>
      {/* Sidebar */}
      <aside className="w-64 p-6 flex flex-col gap-6 shadow-lg fixed h-full z-10" style={{ backgroundColor: "#081526" }}>
        <h2 className="text-xl font-semibold mb-4">SOLIDIA Panel</h2>
        <nav className="flex flex-col gap-4 text-gray-300 flex-1">
          <button onClick={() => setView("projects")} className="text-left hover:text-white transition">
            Projects
          </button>
          <button onClick={() => setView("bots")} className="text-left hover:text-white transition">
            Bots in the Cloud
          </button>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-left text-red-400 hover:text-red-300 transition mt-auto flex items-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        {/* Projects List */}
        {view === "projects" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Projects</h1>
            <section className="max-w-5xl p-10 rounded-2xl shadow-xl mb-12" style={{ backgroundColor: "#10233f" }}>
              <h2 className="text-2xl font-semibold mb-6">Project: Solar Automation & AI System</h2>
            </section>
            <section className="max-w-5xl">
              <h2 className="text-2xl font-semibold mb-6">Active Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer" style={{ backgroundColor: "#0e1d35" }}>
                  <h3 className="text-xl font-semibold mb-2">Solar Automation & AI System</h3>
                  <p className="text-sm text-gray-300 mb-4">Full ecosystem for solar battery education, automation & quoting.</p>
                  <button onClick={() => setView("projectDetail")} className="px-4 py-2 bg-blue-700 rounded-xl">
                    Open Project
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Project Detail */}
        {view === "projectDetail" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Solar Automation & AI System</h1>
            <section className="max-w-5xl p-10 rounded-2xl shadow-xl mb-12" style={{ backgroundColor: "#10233f" }}>
              <h2 className="text-2xl font-semibold mb-6">Project Breakdown</h2>
              <div className="p-8 rounded-xl space-y-8" style={{ backgroundColor: "#0e1d35" }}>
                {/* Overview */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 1. Overview</h3>
                  <p className="text-gray-300 leading-relaxed">
                    This proposal outlines a clean, automated, and efficient system to help homeowners in Victoria understand their options, calculate savings, request quotes, and move smoothly toward installation—while reducing manual work for the team and speeding up the sales process.
                  </p>
                </div>

                {/* System Components */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">✅ 2. System Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">1. Main Landing Page</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                        <li>Clear explanation of the Victoria battery rebate</li>
                        <li>Benefits of adding a battery</li>
                        <li>Interactive "Savings Calculator"</li>
                        <li>Lead capture & AI assistant access</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">2. AI Advisor</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                        <li>24/7 support & Battery size recommendation</li>
                        <li>Estimated savings, ROI & Rebate eligibility</li>
                        <li>Instant pre-quotes & Automated follow-up</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">3. Battery Calculator</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                        <li>Daily energy usage & Autonomy days</li>
                        <li>Recommended kWh & Estimated cost</li>
                        <li>Potential savings & Direct call-to-action</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">4. Lead Conversion Funnel</h4>
                      <p className="text-gray-300 text-sm">Landing → Calculator → AI assistant → Quote request → Technician assessment → Rebate process → Installation</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg md:col-span-2">
                      <h4 className="font-semibold text-white mb-2">5. Content (text‑first)</h4>
                      <p className="text-gray-300 text-sm">Educational posts, Rebate explanations, Battery comparisons, FAQs, Short scripts. (Video content will be created in the final phase).</p>
                    </div>
                  </div>
                </div>

                {/* Core Value Proposition */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 3. Core Value Proposition</h3>
                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-lg text-blue-100 italic text-center">"A smarter, faster, and simpler way to guide homeowners through solar battery upgrades using automation and clear tools."</p>
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 4. Key Benefits</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["Less repetitive work", "Better-qualified leads", "Faster sales pipeline", "Professional customer experience", "Scalable structure", "Clean flow from inquiry to installation"].map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300">
                        <span className="text-green-400">✔</span> {b}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 5. Deliverables</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
                    {["Landing page", "AI-powered advisor", "Smart battery calculator", "Full lead conversion funnel", "Lead capture + follow-up system", "Initial educational content", "Internal templates (quotes, checklists)", "ClickUp integration", "Video content → Final project phase"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accelerated Timeline */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 6. Accelerated Timeline</h3>
                  <div className="space-y-3">
                    {[
                      { phase: "PHASE 1 — Planning (2–3 days)", desc: "Structure, messaging, funnel map." },
                      { phase: "PHASE 2 — Development (5–7 days)", desc: "Landing page, calculator, AI advisor, lead system." },
                      { phase: "PHASE 3 — Content (3 days)", desc: "Educational posts + comparisons." },
                      { phase: "PHASE 4 — Launch & Optimization (2 days)", desc: "Testing, adjustments, deployment." },
                      { phase: "PHASE 5 — Video (Post-launch)", desc: "TikTok, reels, short explainers." }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-b border-gray-700 pb-2 last:border-0">
                        <span className="font-semibold text-white min-w-[280px]">{item.phase}</span>
                        <span className="text-gray-400 text-sm">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Closing Statement */}
                <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-6 rounded-xl border border-blue-500/20">
                  <h3 className="text-xl font-bold mb-2 text-white flex items-center gap-2">🚀 7. Closing Statement</h3>
                  <p className="text-gray-200">
                    This system will allow the team to handle more customers with less effort, creating a clear, professional, and automated journey from first contact to installation.
                    <span className="font-semibold text-blue-300 block mt-2">Ready to begin Phase 1 once approved.</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={handleApprove}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${projectStatus === "approved"
                  ? "bg-green-700 opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-green-500/50"
                  }`}
                disabled={projectStatus === "approved"}
              >
                {projectStatus === "approved" ? "✓ Project Approved" : "🎯 Approve Project"}
              </button>
            </div>

            {/* Notes Section */}
            <div className="mt-8 max-w-5xl p-6 rounded-2xl shadow-xl" style={{ backgroundColor: "#10233f" }}>
              <h3 className="text-xl font-bold mb-3 text-blue-400">📝 Write a Note</h3>
              <textarea
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 text-gray-200 mb-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                rows={3}
                placeholder="Enter your note here..."
              />
              <button
                onClick={handleAddNote}
                className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition font-semibold"
              >
                Add Note
              </button>

              {loadingNotes ? (
                <p className="mt-6 text-gray-400">Loading notes...</p>
              ) : notes.length > 0 ? (
                <ul className="mt-6 space-y-3">
                  {notes.map((note) => (
                    <li key={note.id} className="flex flex-col bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-200 mb-2">{note.text}</p>
                          <p className="text-xs text-gray-500">
                            {note.user?.email ? `By ${note.user.email} • ` : ''}{new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="ml-4 text-red-400 hover:text-red-300 font-semibold transition"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-gray-400">No notes yet. Add your first note above!</p>
              )}
            </div>

            <button onClick={() => setView("projects")} className="px-6 py-3 bg-gray-600 rounded-xl hover:bg-gray-500 transition mt-8 font-semibold">
              ← Back to Projects
            </button>
          </div>
        )}

        {/* Bots in the Cloud View */}
        {view === "bots" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Bots in the Cloud</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="p-6 rounded-2xl shadow-lg" style={{ backgroundColor: "#10233f" }}>
                <h3 className="text-gray-400 text-sm mb-2">Active Bots</h3>
                <p className="text-4xl font-bold text-blue-400">0</p>
                <p className="text-xs text-gray-500 mt-2">No bots deployed yet</p>
              </div>

              <div className="p-6 rounded-2xl shadow-lg" style={{ backgroundColor: "#10233f" }}>
                <h3 className="text-gray-400 text-sm mb-2">Total Requests</h3>
                <p className="text-4xl font-bold text-green-400">0</p>
                <p className="text-xs text-gray-500 mt-2">Waiting for first request</p>
              </div>

              <div className="p-6 rounded-2xl shadow-lg" style={{ backgroundColor: "#10233f" }}>
                <h3 className="text-gray-400 text-sm mb-2">Uptime</h3>
                <p className="text-4xl font-bold text-purple-400">0%</p>
                <p className="text-xs text-gray-500 mt-2">No data available</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="p-8 rounded-2xl shadow-xl" style={{ backgroundColor: "#10233f" }}>
              <h2 className="text-2xl font-semibold mb-6">Bot Activity (Last 7 Days)</h2>
              <div className="relative h-64 flex items-end justify-around gap-4 border-b border-gray-700 pb-4">
                {/* Simple bar chart with 7 bars showing 0 activity */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-700 rounded-t-lg transition-all hover:bg-gray-600" style={{ height: '4px' }}>
                      {/* Empty bar representing 0 activity */}
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{day}</span>
                    <span className="text-xs text-gray-600">0</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-gray-400">
                <p className="text-sm">No bot activity recorded yet. Deploy your first bot to see data here.</p>
              </div>
            </div>

            {/* Coming Soon Section */}
            <div className="mt-8 p-6 rounded-2xl border-2 border-dashed border-gray-700" style={{ backgroundColor: "#0e1d35" }}>
              <h3 className="text-xl font-bold mb-3 text-blue-400">🚀 Coming Soon</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> Deploy custom AI bots
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> Real-time monitoring dashboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> Performance analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> Automated scaling
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
