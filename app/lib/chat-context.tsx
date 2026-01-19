"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";

import { getConversation, getConversations, sendChatMessage } from "./api";
import { ChatMessage, ChatSession } from "./types";
import { useAuth } from "./auth-context";

type ChatContextValue = {
  sessions: ChatSession[];
  activeSessionId: string | null;
  messages: ChatMessage[];
  loading: boolean;
  typing: boolean;
  error: string | null;
  selectSession: (sessionId: string) => void;
  sendMessage: (message: string) => Promise<void>;
  reset: () => Promise<void>;
};

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hydrateHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const conversations = await getConversations();
      setSessions(conversations);
      if (conversations[0]) {
        const detail = await getConversation(conversations[0].id);
        setActiveSessionId(detail.id);
        setMessages(detail.messages ?? []);
      } else {
        setActiveSessionId(null);
        setMessages([]);
      }
    } catch (err) {
      const message =
        (err as AxiosError<{ detail?: string }>).response?.data?.detail ??
        "Failed to load history";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      hydrateHistory();
    }
  }, [hydrateHistory, status]);

  const selectSession = useCallback(async (sessionId: string) => {
    setLoading(true);
    setError(null);
    try {
      const detail = await getConversation(sessionId);
      setActiveSessionId(detail.id);
      setMessages(detail.messages ?? []);
      setSessions((prev) =>
        prev.map((item) =>
          item.id === detail.id
            ? {
                ...item,
                messages: detail.messages,
                preview: detail.messages?.at(-1)?.content?.slice(0, 80),
              }
            : item,
        ),
      );
    } catch (err) {
      const message =
        (err as AxiosError<{ detail?: string }>).response?.data?.detail ??
        "Failed to load conversation";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        return;
      }
      const optimisticMessage: ChatMessage = {
        role: "user",
        content,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, optimisticMessage]);
      setTyping(true);
      setError(null);

      try {
        const response = await sendChatMessage({
          message: content,
          conversation_id: activeSessionId,
        });

        const reply: ChatMessage = {
          role: "assistant",
          content: response.reply,
          created_at: new Date().toISOString(),
        };

        const sessionId = response.conversation_id ?? activeSessionId ?? null;
        setActiveSessionId(sessionId);
        setMessages((prev) => [...prev, reply]);

        const preview = response.reply?.slice(0, 80) ?? "New conversation";
        setSessions((prev) => {
          if (!sessionId) {
            return prev;
          }
          const existing = prev.find((item) => item.id === sessionId);
          if (existing) {
            return prev.map((item) =>
              item.id === sessionId
                ? {
                    ...item,
                    preview,
                    messages: [...(item.messages ?? []), optimisticMessage, reply],
                  }
                : item,
            );
          }
          return [
            {
              id: sessionId,
              preview,
              created_at: new Date().toISOString(),
              messages: [optimisticMessage, reply],
            },
            ...prev,
          ];
        });
      } catch (err) {
        const message =
          (err as AxiosError<{ detail?: string }>).response?.data?.detail ??
          "Failed to send message";
        setError(message);
      } finally {
        setTyping(false);
      }
    },
    [activeSessionId],
  );

  const reset = useCallback(async () => {
    setActiveSessionId(null);
    setMessages([]);
  }, []);

  const value = useMemo(
    () => ({
      sessions,
      activeSessionId,
      messages,
      loading,
      typing,
      error,
      selectSession,
      sendMessage,
      reset,
    }),
    [activeSessionId, error, loading, messages, reset, selectSession, sendMessage, sessions, typing],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};

