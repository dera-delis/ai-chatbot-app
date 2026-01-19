"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";

import { login, me, setAuthToken, signup } from "./api";
import { AuthCredentials, User } from "./types";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  token: string | null;
  error: string | null;
  signupUser: (payload: AuthCredentials) => Promise<void>;
  loginUser: (payload: AuthCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hydrateMe = useCallback(async () => {
    if (!token) {
      setStatus("unauthenticated");
      return;
    }
    try {
      setStatus("loading");
      const meResponse = await me();
      setUser(meResponse);
      setStatus("authenticated");
    } catch {
      setToken(null);
      setUser(null);
      setStatus("unauthenticated");
      setAuthToken(null);
    }
  }, [token]);

  useEffect(() => {
    hydrateMe();
  }, [hydrateMe]);

  const signupUser = useCallback(async (payload: AuthCredentials) => {
    setStatus("loading");
    setError(null);
    try {
      await signup(payload);
      const tokenResponse = await login(payload);
      setToken(tokenResponse.access_token);
      setAuthToken(tokenResponse.access_token);
      const meResponse = await me();
      setUser(meResponse);
      setStatus("authenticated");
    } catch (err) {
      const message =
        (err as AxiosError<{ detail?: string }>).response?.data?.detail ??
        "Signup failed";
      setError(message);
      setStatus("unauthenticated");
    }
  }, []);

  const loginUser = useCallback(async (payload: AuthCredentials) => {
    setStatus("loading");
    setError(null);
    try {
      const tokenResponse = await login(payload);
      setToken(tokenResponse.access_token);
      setAuthToken(tokenResponse.access_token);
      const meResponse = await me();
      setUser(meResponse);
      setStatus("authenticated");
    } catch (err) {
      const message =
        (err as AxiosError<{ detail?: string }>).response?.data?.detail ??
        "Login failed";
      setError(message);
      setStatus("unauthenticated");
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setStatus("unauthenticated");
    setAuthToken(null);
  }, []);

  const value = useMemo(
    () => ({
      status,
      user,
      token,
      error,
      signupUser,
      loginUser,
      logout,
    }),
    [error, loginUser, logout, signupUser, status, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

