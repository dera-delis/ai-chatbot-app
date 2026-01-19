"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, status, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/chat");
    }
  }, [router, status]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await loginUser({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
          <h1 className="text-2xl font-semibold text-white">Sign in to Rains</h1>
          <p className="mt-2 text-sm text-slate-500">
            Calm, focused conversations with your AI assistant.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</label>
            <input
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-slate-100 outline-none focus:border-[var(--accent)]"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500">Password</label>
            <input
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-slate-100 outline-none focus:border-[var(--accent)]"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            className="w-full rounded-xl bg-[var(--accent)]/20 py-3 text-sm text-white transition hover:bg-[var(--accent)]/30"
            type="submit"
            disabled={status === "loading"}
          >
            Sign in
          </button>
        </form>
        <p className="text-sm text-slate-500">
          New here?{" "}
          <Link className="text-white hover:text-[var(--accent)]" href="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

