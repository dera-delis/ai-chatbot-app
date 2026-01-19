"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ChatShell } from "@/app/components/ChatShell";
import { ChatProvider } from "@/app/lib/chat-context";
import { useAuth } from "@/app/lib/auth-context";

export default function ChatPage() {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <ChatProvider>
      <ChatShell />
    </ChatProvider>
  );
}

