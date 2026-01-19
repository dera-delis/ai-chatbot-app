"use client";

import { motion } from "framer-motion";

import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { Sidebar } from "./Sidebar";

export function ChatShell() {
  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 h-screen w-80 shrink-0 border-r border-[var(--border)] bg-[var(--panel)]"
      >
        <Sidebar />
      </motion.div>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-hidden">
          <MessageList />
        </div>
        <ChatInput />
      </div>
    </div>
  );
}

