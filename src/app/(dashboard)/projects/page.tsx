"use client";

import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <div
          className="p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
          style={{ backgroundColor: "#0e1d35" }}
        >
          <h3 className="text-xl font-semibold mb-2">
            Solar Automation & AI System
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            Full ecosystem for solar battery automation, rebates, quoting & AI.
          </p>
          <button
            onClick={() => router.push("/projects/solar")}
            className="px-4 py-2 bg-blue-700 rounded-xl"
          >
            Open Project
          </button>
        </div>

        <div
          className="p-6 rounded-2xl shadow-lg cursor-pointer"
          style={{ backgroundColor: "#0e1d35" }}
        >
          <h3 className="text-xl font-semibold mb-2">Bots in the Cloud</h3>
          <p className="text-sm text-gray-300 mb-4">Coming soon.</p>
          <button className="px-4 py-2 bg-gray-600 rounded-xl">Pending</button>
        </div>
      </div>
    </div>
  );
}
