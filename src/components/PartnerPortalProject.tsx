"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const PROJECT_ID = "solar-automation-project";

interface FeedbackItem {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export default function PartnerPortalProject() {
  const [view, setView] = useState("projects");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projectStatus, setProjectStatus] = useState<"pending" | "approved">("pending");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);

  // Load project data on mount
  useEffect(() => {
    loadProjectData();
  }, []);

  const loadProjectData = async () => {
    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}`);
      if (response.ok) {
        const data = await response.json();
        setProjectStatus(data.status);
        setFeedbackList(data.feedbacks || []);
      }
    } catch (error) {
      console.error("Error loading project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0PVKzn77BdGAg+ltryxnMnBSuAzvLZiTYIGWi77eefTRAMUKfj8LZjHAY4ktfyzHksBSR3x/DdkEAKFF606+uoVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmVENDlSs5++wXRgIPpba8sZzJwUrgM7y2Yk2CBlou+3nn00QDFCn4/C2YxwGOJLX8sx5LAUkd8fw3ZBBChRdtOvrqFUUCkaf4PK+bCEFMYfR89OCMwYebsDv45lRDQ5UrOfvsFwYCD6W2vLGcycFK4DO8tmJNggZaLvt559NEAxQp+PwtmMcBjiS1/LMeSwFJHfH8N2QQQoUXbTr66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0OVKzn77BcGAg+ltryxnMnBSuAzvLZiTYIGWi77eefTRAMUKfj8LZjHAY4ktfyzHksBSR3x/DdkEEKFF206+uoVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmVENDlSs5++wXBgIPpba8sZzJwUrgM7y2Yk2CBlou+3nn00QDFCn4/C2YxwGOJLX8sx5LAUkd8fw3ZBBChRdtOvrqFUUCkaf4PK+bCEFMYfR89OCMwYebsDv45lRDQ5UrOfvsFwYCD6W2vLGcycFK4DO8tmJNggZaLvt559NEAxQp+PwtmMcBjiS1/LMeSwFJHfH8N2QQQoUXbTr66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0OVKzn77BcGAg+ltryxnMnBSuAzvLZiTYIGWi77eefTRAMUKfj8LZjHAY4ktfyzHksBSR3x/DdkEEKFF206+uoVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmVENDlSs5++wXBgIPpba8sZzJwUrgM7y2Yk2CBlou+3nn00QDFCn4/C2YxwGOJLX8sx5LAUkd8fw3ZBBChRdtOvrqFUUCkaf4PK+bCEFMYfR89OCMwYebsDv45lRDQ5UrOfvsFwYCD6W2vLGcycFK4DO8tmJNggZaLvt559NEAxQp+PwtmMcBjiS1/LMeSwFJHfH8N2QQQoUXbTr66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0OVKzn77BcGAg+ltryxnMnBSuAzvLZiTYIGWi77eefTRAMUKfj8LZjHAY4ktfyzHksBSR3x/DdkEEKFF206+uoVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmVENDlSs5++wXBgIPpba8sZzJwUrgM7y2Yk2CBlou+3nn00QDFCn4/C2YxwGOJLX8sx5LAUkd8fw3ZBBChRdtOvrqFUUCkaf4PK+bCEFMYfR89OCMwYebsDv45lRDQ5UrOfvsFwYCD6W2vLGcycFK4DO8tmJNggZaLvt559NEAxQp+PwtmMcBjiS1/LMeSwFJHfH8N2QQQoUXbTr66hVFA==');
    audio.play().catch(e => console.log('Audio play failed:', e));

    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });

      if (response.ok) {
        setProjectStatus("approved");
        alert("🎉 Project approved successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to approve project: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error approving project:", error);
      alert("Failed to approve project. Please check your connection and try again.");
    }
  };

  const handleGiveFeedback = async () => {
    if (!feedbackText.trim()) {
      alert("Please enter feedback before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId !== null) {
        const response = await fetch(`/api/projects/${PROJECT_ID}/feedback/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: feedbackText })
        });

        if (response.ok) {
          const updatedFeedback = await response.json();
          setFeedbackList(feedbackList.map(item =>
            item.id === editingId ? updatedFeedback : item
          ));
          setEditingId(null);
          setFeedbackText("");
          setShowFeedbackInput(false);
          alert("Feedback updated successfully!");
        } else {
          const errorData = await response.json().catch(() => ({}));
          alert(`Failed to update feedback: ${errorData.error || response.statusText}`);
        }
      } else {
        const response = await fetch(`/api/projects/${PROJECT_ID}/feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: feedbackText })
        });

        if (response.ok) {
          const newFeedback = await response.json();
          setFeedbackList(prev => [...prev, newFeedback]);
          setFeedbackText("");
          setShowFeedbackInput(false);
          alert("Feedback submitted successfully!");
        } else {
          const errorData = await response.json().catch(() => ({}));
          alert(`Failed to submit feedback: ${errorData.error || response.statusText}`);
        }
      }
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Failed to save feedback. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditFeedback = (id: string) => {
    const feedback = feedbackList.find(item => item.id === id);
    if (feedback) {
      setFeedbackText(feedback.text);
      setEditingId(id);
      setShowFeedbackInput(true);
      // Scroll to input
      setTimeout(() => {
        document.getElementById('feedback-input')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}/feedback/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setFeedbackList(feedbackList.filter(item => item.id !== id));
        if (editingId === id) {
          setFeedbackText("");
          setEditingId(null);
          setShowFeedbackInput(false);
        }
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setFeedbackText("");
    setEditingId(null);
    setShowFeedbackInput(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

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
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-left text-red-400 hover:text-red-300 transition mt-auto flex items-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">

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

              <div className="p-8 rounded-xl space-y-8" style={{ backgroundColor: "#0e1d35" }}>

                {/* 1. Overview */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">
                    ✅ 1. Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    This proposal outlines a clean, automated, and efficient system to help homeowners in Victoria
                    understand their options, calculate savings, request quotes, and move smoothly toward installation—while
                    reducing manual work for the team and speeding up the sales process.
                  </p>
                </div>

                {/* 2. System Components */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
                    ✅ 2. System Components
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">1. Main Landing Page</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                        <li>Clear explanation of the Victoria battery rebate</li>
                        <li>Benefits of adding a battery</li>
                        <li>Interactive “Savings Calculator”</li>
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
                      <p className="text-gray-300 text-sm">
                        Landing → Calculator → AI assistant → Quote request → Technician assessment → Rebate process → Installation
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg md:col-span-2">
                      <h4 className="font-semibold text-white mb-2">5. Content (text-first)</h4>
                      <p className="text-gray-300 text-sm">
                        Educational posts, Rebate explanations, Battery comparisons, FAQs, Short scripts.
                        (Video content will be created in the final phase).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Core Value Proposition */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">
                    ✅ 3. Core Value Proposition
                  </h3>
                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-lg text-blue-100 italic text-center">
                      “A smarter, faster, and simpler way to guide homeowners through solar battery upgrades using automation and clear tools.”
                    </p>
                  </div>
                </div>

                {/* 4. Key Benefits */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">
                    ✅ 4. Key Benefits
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["Less repetitive work", "Better-qualified leads", "Faster sales pipeline", "Professional customer experience", "Scalable structure", "Clean flow from inquiry to installation"].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300">
                        <span className="text-green-400">✔</span> {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Deliverables */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">
                    ✅ 5. Deliverables
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
                    {["Landing page", "AI-powered advisor", "Smart battery calculator", "Full lead conversion funnel", "Lead capture + follow-up system", "Initial educational content", "Internal templates (quotes, checklists)", "ClickUp integration", "Video content → Final project phase"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 6. Accelerated Timeline */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">
                    ✅ 6. Accelerated Timeline
                  </h3>
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

                {/* 7. Closing Statement */}
                <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-6 rounded-xl border border-blue-500/20">
                  <h3 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
                    🚀 7. Closing Statement
                  </h3>
                  <p className="text-gray-200">
                    This system will allow the team to handle more customers with less effort, creating a clear,
                    professional, and automated journey from first contact to installation.
                    <span className="font-semibold text-blue-300 block mt-2">Ready to begin Phase 1 once approved.</span>
                  </p>
                </div>

                {/* APPROVAL & FEEDBACK SECTION */}
                <div className="border-t-2 border-gray-600 pt-8 mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Project Actions</h3>
                    {projectStatus === "approved" && (
                      <span className="px-4 py-2 bg-green-600 rounded-full text-base font-bold shadow-lg animate-pulse">
                        ✓ APPROVED
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <button
                      onClick={handleApprove}
                      className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex-1 md:flex-none ${projectStatus === "approved"
                          ? "bg-green-700 opacity-50 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-green-500/50"
                        }`}
                      disabled={projectStatus === "approved"}
                    >
                      {projectStatus === "approved" ? "✓ Project Approved" : "🎯 Approve Project"}
                    </button>

                    <button
                      onClick={() => setShowFeedbackInput(!showFeedbackInput)}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex-1 md:flex-none hover:scale-105"
                    >
                      {showFeedbackInput ? "Cancel Feedback" : "💬 Give Feedback"}
                    </button>
                  </div>

                  {/* Feedback Input (Toggleable) */}
                  {showFeedbackInput && (
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600 mb-6 animate-fade-in">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {editingId ? "Edit your feedback:" : "Add new feedback:"}
                      </label>
                      <textarea
                        id="feedback-input"
                        className="w-full p-4 rounded-xl border border-blue-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        style={{ backgroundColor: "#0a1a2f" }}
                        placeholder="Type your feedback here..."
                        rows={3}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                      />

                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          onClick={handleCancelEdit}
                          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl font-semibold transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleGiveFeedback}
                          disabled={submitting}
                          className={`px-8 py-2 rounded-xl font-bold transition-all duration-300 shadow-lg ${submitting
                              ? "bg-blue-800 cursor-wait"
                              : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                            }`}
                        >
                          {submitting ? "Submitting..." : (editingId !== null ? "Update" : "Submit")}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Feedback List */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-blue-400 mb-4 border-b border-gray-700 pb-2">
                      Feedback History ({feedbackList.length})
                    </h4>

                    {feedbackList.length === 0 ? (
                      <p className="text-gray-500 italic text-center py-4">No feedback yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {feedbackList.map((item, index) => (
                          <div
                            key={item.id}
                            className="p-5 rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-md group"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="bg-blue-900/50 text-blue-300 text-xs font-mono px-2 py-1 rounded border border-blue-800">
                                    #{index + 1}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {formatDate(item.createdAt)}
                                  </span>
                                </div>
                                <p className="text-gray-200 whitespace-pre-wrap text-base leading-relaxed">
                                  {item.text}
                                </p>
                              </div>

                              <div className="flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                  onClick={() => handleEditFeedback(item.id)}
                                  className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-colors text-sm font-semibold"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteFeedback(item.id)}
                                  className="px-3 py-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors text-sm font-semibold"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </section>

            <button
              onClick={() => setView("projects")}
              className="px-4 py-2 bg-gray-600 rounded-xl hover:bg-gray-500 transition"
            >
              ← Back to Projects
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

      </main>
    </div>
  );
}
