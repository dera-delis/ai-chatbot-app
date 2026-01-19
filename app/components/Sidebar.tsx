"use client";

import { useMemo } from "react";

import { useAuth } from "@/app/lib/auth-context";
import { useChat } from "@/app/lib/chat-context";

export function Sidebar() {
  const { user, logout } = useAuth();
  const { sessions, activeSessionId, selectSession, reset, loading } = useChat();

  const sortedSessions = useMemo(() => sessions, [sessions]);

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">AI Chat</p>
          <h1 className="text-lg font-semibold text-white">Rains</h1>
        </div>
        <div className="h-9 w-9 rounded-full bg-[var(--panel-soft)]" />
      </div>

      <button
        className="rounded-xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3 text-left text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        onClick={reset}
        disabled={loading}
        type="button"
      >
        New Chat
      </button>

      <div className="flex-1 space-y-3 overflow-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">History</p>
        <div className="space-y-2">
          {sortedSessions.length === 0 ? (
            <p className="text-sm text-slate-500">No conversations yet.</p>
          ) : (
            sortedSessions.map((session) => (
              <button
                key={session.id}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                  session.id === activeSessionId
                    ? "border-[var(--accent)] bg-[rgba(143,211,255,0.08)] text-white"
                    : "border-transparent bg-[var(--panel-soft)] text-slate-300 hover:border-[var(--border)]"
                }`}
                onClick={() => selectSession(session.id)}
                type="button"
              >
                <p className="truncate font-medium">
                  {session.preview ?? "Conversation"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {session.created_at
                    ? new Date(session.created_at).toLocaleDateString()
                    : "Just now"}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="space-y-3 border-t border-[var(--border)] pt-4 text-sm">
        <div>
          <p className="text-xs text-slate-500">Signed in as</p>
          <p className="truncate text-sm text-slate-300">{user?.email ?? "Anonymous"}</p>
        </div>
        <button
          className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-slate-300 transition hover:border-red-400 hover:text-red-300"
          onClick={logout}
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

