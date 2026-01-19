"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/app/lib/auth-context";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

