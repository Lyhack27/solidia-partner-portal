"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard"); // adjust if needed
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#0a1a2f" }}
    >
      <div
        className="p-10 rounded-2xl shadow-xl w-full max-w-md"
        style={{ backgroundColor: "#081526" }}
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          SOLIDIA Portal Login
        </h1>

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

        {/* DIVIDER */}
        <div className="my-6 text-center text-gray-500">OR</div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
