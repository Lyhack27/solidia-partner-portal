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
        <Image
          src="/logo.png"
          alt="SOLIDIA Logo"
          width={150}
          height={50}
          className="object-contain"
          priority
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
