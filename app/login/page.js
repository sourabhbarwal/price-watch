"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { signIn, signUp, session, loading } = useAuthStore();
  const router = useRouter();
  const user=session?.user || null;

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading,user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const [submitting,setSubmitting] = useState(false);

  async function handleLogin() {
    setSubmitting(true);
    const res = await signIn(email, password);
    setSubmitting(false);
    router.replace("/dashboard");
  }

  async function handleSignup() {
    setSubmitting(true);
    const res = await signUp(email, password);
    setSubmitting(false);
    router.replace("/dashboard");
  }

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/5 p-6 rounded-xl space-y-4 w-80">
        <h1 className="text-lg font-semibold">
          Login to  Price Watch
        </h1>

        <input
          className="w-full mb-3 px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full mb-4 px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          disabled={submitting}
          className="w-full mb-2 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          disabled={submitting}
          className="w-full py-2 rounded-md text-slate-400 hover:text-white transition"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
