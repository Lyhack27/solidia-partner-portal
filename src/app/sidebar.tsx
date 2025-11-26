"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside
      className="w-64 h-full p-6 flex flex-col gap-6 shadow-lg text-white overflow-y-auto"
      style={{ backgroundColor: "#081526" }}
    >
      <div className="mb-4 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://raw.githubusercontent.com/Lyhack27/solidIA2.0/main/logo/logo.png"
          alt="SOLIDIA Logo"
          style={{ width: "150px", height: "auto", objectFit: "contain" }}
        />
      </div>

      <nav className="flex flex-col gap-4 text-gray-300">
        <button onClick={() => router.push("/dashboard")} className="text-left hover:text-white">
          Dashboard
        </button>

        <button onClick={() => router.push("/projects")} className="text-left hover:text-white">
          Projects
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
