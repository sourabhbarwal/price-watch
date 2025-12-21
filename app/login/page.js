"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signIn, signUp } = useAuthStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function handleLogin() {
    await signIn(email, password);
    router.push("/dashboard");
  }

  async function handleSignup() {
    await signUp(email, password);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/5 p-6 rounded-xl space-y-4 w-80">
        <h1 className="text-lg font-semibold">
          Login
        </h1>

        <input
          className="w-full p-2 rounded bg-black/40"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full p-2 rounded bg-black/40"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 p-2 rounded"
        >
          Sign In
        </button>

        <button
          onClick={handleSignup}
          className="w-full text-sm opacity-70"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
