"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    console.log("Submitting login form...");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Credentials:", { email, password });

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("SignIn result:", res);

      if (res?.error) {
        console.error("Login error:", res.error);
        setError("Invalid email or password.");
        return;
      }

      console.log("Login success, redirecting...");
      router.push("/projects/solar-automation-project");
    } catch (err) {
      console.error("SignIn exception:", err);
      setError("An unexpected error occurred.");
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#0a1a2f" }}
    >
      <div
        className="p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-md"
        style={{ backgroundColor: "#081526" }}
      >
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="SOLIDIA Logo"
            width={200}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-400 mb-4 text-center">{error}</p>
        )}

        {/* CREDENTIALS FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 rounded-lg bg-[#0a1a2f] border border-blue-800 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full p-3 rounded-lg bg-[#0a1a2f] border border-blue-800 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 transition rounded-lg font-semibold"
          >
            Login
          </button>
        </form>


      </div>
    </div>
  );
}
