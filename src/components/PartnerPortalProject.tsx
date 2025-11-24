"use client";
import React, { useState, useEffect } from "react";

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
    // Play success sound
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
      }
    } catch (error) {
      console.error("Error approving project:", error);
      alert("Failed to approve project. Please try again.");
    }
  };

  const handleGiveFeedback = async () => {
    if (!feedbackText.trim()) {
      alert("Please enter feedback before submitting.");
      return;
    }

    try {
      if (editingId !== null) {
        // Update existing feedback
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
          alert("Feedback updated successfully!");
        }
      } else {
        // Add new feedback
        const response = await fetch(`/api/projects/${PROJECT_ID}/feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: feedbackText })
        });

        if (response.ok) {
          const newFeedback = await response.json();
          setFeedbackList([...feedbackList, newFeedback]);
          setFeedbackText("");
          alert("Feedback submitted successfully!");
        }
      }
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Failed to save feedback. Please try again.");
    }
  };

  const handleEditFeedback = (id: string) => {
    const feedback = feedbackList.find(item => item.id === id);
    if (feedback) {
      setFeedbackText(feedback.text);
      setEditingId(id);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${PROJECT_ID}/feedback/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setFeedbackList(feedbackList.filter(item => item.id !== id));
        if (editingId === id) {
          setFeedbackText("");
          setEditingId(null);
        }
        alert("Feedback deleted.");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setFeedbackText("");
    setEditingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="flex min-h-screen text-white" style={{ backgroundColor: "#0a1a2f" }}>
      {/* Sidebar */}
      <aside className="w-64 p-6 flex flex-col gap-6 shadow-lg" style={{ backgroundColor: "#081526" }}>
        <h2 className="text-xl font-semibold mb-4">SOLIDIA Panel</h2>
        <nav className="flex flex-col gap-4 text-gray-300">
          <button onClick={() => setView("projects")} className="text-left hover:text-white transition">
            Projects
          </button>
          <button onClick={() => setView("bots")} className="text-left hover:text-white transition">
            Bots in the Cloud
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">

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

              <div className="p-6 rounded-xl" style={{ backgroundColor: "#0e1d35" }}>
                <div className="space-y-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Overview</h3>
                    <p className="text-gray-300">
                      Based on Shena's requirements, this project delivers an end-to-end solar sales ecosystem:
                      education, rebate explanation, automated quoting, battery sizing AI, lead qualification,
                      and automated workflows.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Value Proposition</h3>
                    <p className="text-gray-300">
                      We replicate the proven high-converting solar battery funnel with education, VIC rebates
                      explanation, calculators, questionnaires, automated quote generation, and expert booking paths.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Roadmap</h3>
                    <p className="text-gray-300">
                      Week 1: Content + structure. Week 2: Landing + automation. Week 3: AI Advisor + quote generator.
                      Week 4: Optimization & deployment.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Deliverables</h3>
                    <p className="text-gray-300">
                      Landing page, rebate education flow, AI advisor, quote generator, PDF generator, automation
                      workflows, content set, ClickUp integration, and dashboard.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">AI Advisor Integration</h3>
                    <p className="text-gray-300">
                      The advisor answers questions, calculates battery size, recommends brands, estimates savings,
                      generates quotes, and routes leads automatically.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Automations</h3>
                    <p className="text-gray-300">
                      Automated workflows include: lead capture, validation, CRM sync, notifications, follow-ups,
                      installer routing, analytics, and reporting.
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Feedback</h3>
                    {projectStatus === "approved" && (
                      <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-semibold">
                        ✓ Approved
                      </span>
                    )}
                  </div>

                  {/* Feedback List */}
                  {feedbackList.length > 0 && (
                    <div className="mb-4 space-y-3">
                      {feedbackList.map((item, index) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-lg bg-gray-700 border border-gray-600"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-gray-400">
                              Feedback #{index + 1} - {formatDate(item.createdAt)}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditFeedback(item.id)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteFeedback(item.id)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-300">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Feedback Input */}
                  <textarea
                    className="w-full p-4 rounded-xl border border-blue-800 text-white mb-4"
                    style={{ backgroundColor: "#0a1a2f" }}
                    placeholder={editingId !== null ? "Edit your feedback..." : "Add your feedback here..."}
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleApprove}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/50 hover:scale-105 animate-pulse-slow"
                      style={{
                        boxShadow: projectStatus === "pending" ? "0 0 20px rgba(34, 197, 94, 0.4)" : undefined
                      }}
                      disabled={projectStatus === "approved"}
                    >
                      {projectStatus === "approved" ? "✓ Approved" : "🎯 Approve Project"}
                    </button>
                    <button
                      onClick={handleGiveFeedback}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
                    >
                      {editingId !== null ? "Update Feedback" : "Give Feedback"}
                    </button>
                    {editingId !== null && (
                      <button
                        onClick={handleCancelEdit}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl font-semibold transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
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

      </main>
    </div>
  );
}
