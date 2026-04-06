"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChatHeader,
  WelcomeScreen,
  MessageBubble,
  LoadingIndicator,
  ChatInput,
} from "@/components";
import type { ChatMessage } from "@/components";

/**
 * Home - الصفحة الرئيسية للمساعد الذكي
 * تجمع بين جميع المكونات وتدير حالة المحادثة والتواصل مع الـ API
 */
export default function Home() {
  // ─── State ───
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ─── Chat Logic ───

  /** إرسال رسالة جديدة واستقبال الرد من الـ API بشكل متدفق (streaming) */
  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      // Stream the AI response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantMsg.content += chunk;
          setMessages([...updatedMessages, { ...assistantMsg }]);
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  /** التعامل مع إرسال النموذج */
  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  // ─── Auto-scroll ───
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ─── Render ───
  const showLoading = isLoading && messages[messages.length - 1]?.role === "user";

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--bg-primary)" }}>
      <ChatHeader />

      {/* ─── Messages Area ─── */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome Screen */}
          {messages.length === 0 && (
            <WelcomeScreen onSuggestionClick={setInput} />
          )}

          {/* Messages */}
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Loading */}
          {showLoading && <LoadingIndicator />}

          {/* Error */}
          {error && (
            <div
              className="text-center py-3 px-4 rounded-xl text-sm mx-auto max-w-md"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#f87171",
              }}
            >
              ⚠️ حدث خطأ في الاتصال. حاول مرة أخرى.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
