// "use client";

// import { useState } from "react";
// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function LoginPage() {
//   const { signIn, signUp, session, loading } = useAuthStore();
//   const router = useRouter();
//   const user=session?.user || null;

//   useEffect(() => {
//     if (!loading && user) {
//       router.replace("/dashboard");
//     }
//   }, [loading,user]);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] =useState("");
//   const [submitting,setSubmitting] = useState(false);

//   async function handleLogin() {
//     setSubmitting(true);
//     const res = await signIn(email, password);
//     setSubmitting(false);
//     router.replace("/dashboard");
//   }

//   async function handleSignup() {
//     setSubmitting(true);
//     const res = await signUp(email, password);
//     setSubmitting(false);
//     router.replace("/dashboard");
//   }

//   if (loading) return null;

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white/5 p-6 rounded-xl space-y-4 w-80">
//         <h1 className="text-lg font-semibold">
//           Login to  Price Watch
//         </h1>

//         <input
//           className="w-full mb-3 px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
//           placeholder="Email"
//           value={email}
//           type="email"
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//         />

//         <input
//           type="password"
//           className="w-full mb-4 px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
//           placeholder="Password"
//           value={password}
//           onChange={(e) =>
//             setPassword(e.target.value)
//           }
//         />

//         <button
//           onClick={handleLogin}
//           disabled={submitting}
//           className="w-full mb-2 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition"
//         >
//           Login
//         </button>

//         <button
//           onClick={handleSignup}
//           disabled={submitting}
//           className="w-full py-2 rounded-md text-slate-400 hover:text-white transition"
//         >
//           Create Account
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let result;

    if (mode === "login") {
      // 🔒 EXISTING LOGIN LOGIC (unchanged)
      result = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } else {
      // ➕ SIGNUP (new, but same session handling)
      result = await supabase.auth.signUp({
        email,
        password,
      });
    }

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    // AuthInitializer + AuthGuard will handle session
    router.replace("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 border rounded-lg space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>

        <input
          type="email"
          required
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          minLength={6}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-indigo-600 text-white rounded disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Log in"
            : "Sign up"}
        </button>

        <p className="text-sm text-center">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-indigo-600 underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-indigo-600 underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
