"use client";

import { motion } from "framer-motion";

import { ChatMessage } from "@/app/lib/types";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <div
        className={`whitespace-pre-wrap break-words text-[15px] leading-7 ${
          isUser
            ? "ml-auto max-w-[70%] rounded-2xl bg-[var(--accent)]/20 px-4 py-3 text-white"
            : "w-full rounded-2xl border border-[var(--border)] bg-[var(--panel)]/70 px-4 py-4 text-slate-100"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

