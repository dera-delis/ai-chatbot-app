"use client";

import { useCallback, useRef, useState } from "react";

import { useChat } from "@/app/lib/chat-context";

const EMOJIS = ["😀", "😂", "😍", "👍", "🙏", "🔥", "🥳", "😎", "🤝", "💡", "✅", "❗"];

export function ChatInput() {
  const { sendMessage, typing, loading } = useChat();
  const [value, setValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = useCallback(async () => {
    if (!value.trim()) {
      return;
    }
    await sendMessage(value.trim());
    setValue("");
    textareaRef.current?.focus();
  }, [sendMessage, value]);

  return (
    <div className="border-t border-[var(--border)] bg-[var(--panel)] px-10 py-6">
      <div className="relative flex items-end gap-4 rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3">
        <div className="relative">
          <button
            className="rounded-lg px-2 py-2 text-lg text-slate-300 transition hover:text-white"
            type="button"
            aria-label="Open emoji picker"
            onClick={() => setShowEmoji((prev) => !prev)}
          >
            😊
          </button>
          {showEmoji && (
            <div className="absolute bottom-12 left-0 z-10 w-56 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-3 shadow-lg">
              <div className="grid grid-cols-6 gap-2">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="rounded-lg p-2 text-lg transition hover:bg-[var(--panel-soft)]"
                    onClick={() => {
                      setValue((prev) => `${prev}${emoji}`);
                      setShowEmoji(false);
                      textareaRef.current?.focus();
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <textarea
          ref={textareaRef}
          className="h-16 flex-1 resize-none bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          placeholder="Message the assistant..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          className="rounded-xl bg-[var(--accent)]/20 px-4 py-2 text-sm text-white transition hover:bg-[var(--accent)]/30 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleSend}
          type="button"
          disabled={typing || loading}
        >
          Send
        </button>
      </div>
      <div className="mt-2 text-xs text-slate-500">Enter to send, Shift+Enter for a new line.</div>
    </div>
  );
}

