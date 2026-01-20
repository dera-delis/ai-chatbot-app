"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import { useChat } from "@/app/lib/chat-context";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

export function MessageList() {
  const { messages, typing } = useChat();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, typing]);

  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 py-8 md:px-10 md:py-10">
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
          Start a conversation with your assistant.
        </div>
      ) : (
        <div className="mx-auto w-full max-w-3xl space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <MessageBubble key={message.id ?? `${message.role}-${index}`} message={message} />
            ))}
          </AnimatePresence>
          {typing && <TypingIndicator />}
          <div ref={endRef} />
        </div>
      )}
    </div>
  );
}

