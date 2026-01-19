"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <div className="rounded-full bg-[var(--panel-soft)] px-3 py-2 text-xs uppercase tracking-[0.2em]">
        Typing
      </div>
      <motion.div
        className="flex items-center gap-1"
        initial="start"
        animate="pulse"
        variants={{
          start: { opacity: 0.4 },
          pulse: {
            opacity: [0.4, 1, 0.4],
            transition: { duration: 1.2, repeat: Infinity },
          },
        }}
      >
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]/70" />
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]/50" />
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]/30" />
      </motion.div>
    </div>
  );
}

