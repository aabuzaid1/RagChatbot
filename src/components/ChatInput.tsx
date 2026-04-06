"use client";

import { useRef } from "react";

/**
 * ChatInput - حقل إدخال الرسائل مع زر الإرسال
 * يدعم الإرسال عبر Enter والتوسع التلقائي لمنطقة النص
 */

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
}

export default function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((input || "").trim() && !isLoading) {
        onSubmit();
        if (inputRef.current) inputRef.current.style.height = "auto";
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((input || "").trim() && !isLoading) {
      onSubmit();
      if (inputRef.current) inputRef.current.style.height = "auto";
    }
  };

  const hasInput = (input || "").trim();

  return (
    <footer
      className="px-4 py-4 border-t backdrop-blur-xl"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto flex items-end gap-3">
        {/* Text Input */}
        <div
          className="flex-1 relative rounded-2xl overflow-hidden transition-all duration-300 input-focus"
          style={{
            background: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="اكتب سؤالك حول المنحة هنا..."
            rows={1}
            className="w-full bg-transparent px-5 py-3.5 text-sm outline-none resize-none"
            style={{ color: "var(--text-primary)" }}
            disabled={isLoading}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isLoading || !hasInput}
          className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0 btn-ruwwad"
          style={{
            background: hasInput && !isLoading ? "var(--accent-gradient)" : "var(--bg-tertiary)",
            boxShadow: hasInput && !isLoading ? "0 4px 20px var(--glow-color)" : "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 rotate-180"
            style={{ color: hasInput && !isLoading ? "#fff" : "var(--text-muted)" }}
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>

      {/* Footer Credit */}
      <div className="text-center mt-3">
        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
          مؤسسة رواد التنمية • صندوق مصعب خورما 2025
        </p>
      </div>
    </footer>
  );
}
