"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";

export default function Home() {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/chat");
    }
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
      Loading...
    </div>
  );
}
