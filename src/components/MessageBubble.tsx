"use client";

/**
 * MessageBubble - فقاعة الرسالة الواحدة
 * تعرض رسالة المستخدم أو المساعد بتنسيق مختلف حسب الدور
 */

export interface ChatMessage {
  id: string;
  role: string;
  content: string;
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
          isUser ? "rounded-br-sm" : "rounded-bl-sm"
        }`}
        style={
          isUser
            ? {
                background: "var(--accent-gradient)",
                color: "#ffffff",
                boxShadow: "0 4px 20px rgba(109, 40, 217, 0.35)",
              }
            : {
                background: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
              }
        }
      >
        <span className="block text-[10px] font-semibold mb-1.5 opacity-70 tracking-wider uppercase">
          {isUser ? "أنت" : "المساعد"}
        </span>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}
