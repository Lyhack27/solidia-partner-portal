"use client";
import React, { useState, useEffect } from "react";


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
  const [view, setView] = useState("projectDetail");
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
  const [members, setMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "viewer" });

  useEffect(() => {
    if (view === "projectDetail") {
      loadNotes();
      loadMembers();
    }
  }, [view]);

  const loadMembers = async () => {
    setLoadingMembers(true);
    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}/members`);
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error("Error loading members:", error);
    } finally {
      setLoadingMembers(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMember.email) return;

    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });

      if (response.ok) {
        const addedMember = await response.json();
        // Check if member already exists in list to update or add
        setMembers(prev => {
          const exists = prev.find(m => m.user.email === addedMember.user.email);
          if (exists) {
            return prev.map(m => m.user.email === addedMember.user.email ? addedMember : m);
          }
          return [addedMember, ...prev];
        });
        setShowAddMember(false);
        setNewMember({ name: "", email: "", role: "viewer" });
        alert("Member added successfully!");
      } else {
        const err = await response.json();
        alert(`Failed to add member: ${err.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member.");
    }
  };

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
      <div className="flex items-center justify-center min-h-[50vh] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full text-white">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-700 pb-2 overflow-x-auto">
        <button
          onClick={() => setView("projectDetail")}
          className={`px-4 py-2 rounded-t-lg transition whitespace-nowrap ${view === "projectDetail"
            ? "bg-blue-600 text-white font-semibold"
            : "text-gray-400 hover:text-white"
            }`}
        >
          Project Details
        </button>
        <button
          onClick={() => setView("bots")}
          className={`px-4 py-2 rounded-t-lg transition whitespace-nowrap ${view === "bots"
            ? "bg-blue-600 text-white font-semibold"
            : "text-gray-400 hover:text-white"
            }`}
        >
          Bots in the Cloud
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {/* Project Detail */}
        {view === "projectDetail" && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Solar Automation & AI System</h1>

            {/* Team Section */}
            <section className="w-full p-4 md:p-6 rounded-2xl shadow-xl mb-8" style={{ backgroundColor: "#10233f" }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-semibold">👥 Team Members</h2>
                <button
                  onClick={() => setShowAddMember(!showAddMember)}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition text-sm font-semibold w-full md:w-auto"
                >
                  {showAddMember ? "Cancel" : "+ Add Member"}
                </button>
              </div>

              {showAddMember && (
                <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl mb-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Add New Member</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="p-2 rounded bg-gray-900 border border-gray-700 text-white w-full"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      className="p-2 rounded bg-gray-900 border border-gray-700 text-white w-full"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Developer)"
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      className="p-2 rounded bg-gray-900 border border-gray-700 text-white w-full"
                    />
                  </div>
                  <button
                    onClick={handleAddMember}
                    className="mt-4 px-6 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition font-semibold w-full md:w-auto"
                  >
                    Add to Project
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {loadingMembers ? (
                  <p className="text-gray-400">Loading members...</p>
                ) : members.length > 0 ? (
                  members.map((member) => (
                    <div key={member.id} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-800/30 p-4 rounded-lg gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-200 font-bold shrink-0">
                          {member.user.email[0].toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-medium text-white truncate">{member.user.name || member.user.email}</p>
                          <p className="text-xs text-gray-400 capitalize truncate">{member.role} {member.user.name ? `• ${member.user.email}` : ''}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No members yet.</p>
                )}
              </div>
            </section>

            <section className="w-full p-4 md:p-10 rounded-2xl shadow-xl mb-12" style={{ backgroundColor: "#10233f" }}>
              <h2 className="text-xl md:text-2xl font-semibold mb-6">Project Breakdown</h2>
              <div className="p-4 md:p-8 rounded-xl space-y-8" style={{ backgroundColor: "#0e1d35" }}>
                {/* Overview */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 1. Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    This proposal outlines a clean, automated, and efficient system to help homeowners in Victoria understand their options, calculate savings, request quotes, and move smoothly toward installation—while reducing manual work for the team and speeding up the sales process.
                  </p>
                </div>

                {/* System Components */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">✅ 2. System Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">1. Main Landing Page</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                        <li>Clear explanation of the Victoria battery rebate</li>
                        <li>Benefits of adding a battery</li>
                        <li>Interactive &quot;Savings Calculator&quot;</li>
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
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 3. Core Value Proposition</h3>
                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-base md:text-lg text-blue-100 italic text-center">&quot;A smarter, faster, and simpler way to guide homeowners through solar battery upgrades using automation and clear tools.&quot;</p>
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 4. Key Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {["Less repetitive work", "Better-qualified leads", "Faster sales pipeline", "Professional customer experience", "Scalable structure", "Clean flow from inquiry to installation"].map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                        <span className="text-green-400">✔</span> {b}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 5. Deliverables</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300 text-sm md:text-base">
                    {["Landing page", "AI-powered advisor", "Smart battery calculator", "Full lead conversion funnel", "Lead capture + follow-up system", "Initial educational content", "Internal templates (quotes, checklists)", "ClickUp integration", "Video content → Final project phase"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accelerated Timeline */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">✅ 6. Accelerated Timeline</h3>
                  <div className="space-y-3">
                    {[
                      { phase: "PHASE 1 — Planning (2–3 days)", desc: "Structure, messaging, funnel map." },
                      { phase: "PHASE 2 — Development (5–7 days)", desc: "Landing page, calculator, AI advisor, lead system." },
                      { phase: "PHASE 3 — Content (3 days)", desc: "Educational posts + comparisons." },
                      { phase: "PHASE 4 — Launch & Optimization (2 days)", desc: "Testing, adjustments, deployment." },
                      { phase: "PHASE 5 — Video (Post-launch)", desc: "TikTok, reels, short explainers." }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-b border-gray-700 pb-2 last:border-0">
                        <span className="font-semibold text-white min-w-[280px] text-sm md:text-base">{item.phase}</span>
                        <span className="text-gray-400 text-sm">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Closing Statement */}
                <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-4 md:p-6 rounded-xl border border-blue-500/20">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-white flex items-center gap-2">🚀 7. Closing Statement</h3>
                  <p className="text-gray-200 text-sm md:text-base">
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
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg w-full md:w-auto ${projectStatus === "approved"
                  ? "bg-green-700 opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-green-500/50"
                  }`}
                disabled={projectStatus === "approved"}
              >
                {projectStatus === "approved" ? "✓ Project Approved" : "🎯 Approve Project"}
              </button>
            </div>

            {/* Notes Section */}
            <div className="mt-8 w-full p-4 md:p-6 rounded-2xl shadow-xl" style={{ backgroundColor: "#10233f" }}>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-400">📝 Write a Note</h3>
              <textarea
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 text-gray-200 mb-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                rows={3}
                placeholder="Enter your note here..."
              />
              <button
                onClick={handleAddNote}
                className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition font-semibold w-full md:w-auto"
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
                          <p className="text-gray-200 mb-2 text-sm md:text-base">{note.text}</p>
                          <p className="text-xs text-gray-500">
                            {note.user?.email ? `By ${note.user.email} • ` : ''}{new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="ml-4 text-red-400 hover:text-red-300 font-semibold transition text-sm"
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
          </div>
        )}

        {/* Bots in the Cloud View */}
        {view === "bots" && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Bots in the Cloud</h1>

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
            <div className="p-4 md:p-8 rounded-2xl shadow-xl" style={{ backgroundColor: "#10233f" }}>
              <h2 className="text-xl md:text-2xl font-semibold mb-6">Bot Activity (Last 7 Days)</h2>
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
      </div>
    </div>
  );
}
