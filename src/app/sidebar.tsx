"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside
      className="w-64 p-6 flex flex-col gap-6 shadow-lg text-white"
      style={{ backgroundColor: "#081526" }}
    >
      <h2 className="text-xl font-semibold mb-4">SOLIDIA Panel</h2>

      <nav className="flex flex-col gap-4 text-gray-300">
        <button onClick={() => router.push("/dashboard")} className="text-left hover:text-white">
          Dashboard
        </button>

        <button onClick={() => router.push("/projects")} className="text-left hover:text-white">
          Projects
        </button>

        <button onClick={() => router.push("/documents")} className="text-left hover:text-white">
          Documents
        </button>

        <button onClick={() => router.push("/feedback")} className="text-left hover:text-white">
          Feedback
        </button>

        <button
          onClick={() => router.push("/api/auth/signout")}
          className="text-left hover:text-white mt-10 text-red-400"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
