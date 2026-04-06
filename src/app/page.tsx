"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ id: string; role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const append = async (newMessage: { role: string; content: string }) => {
    const newMessages = [...messages, { ...newMessage, id: Date.now().toString() }];
    setMessages(newMessages);
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      const assistantMsg = {
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
          setMessages([...newMessages, { ...assistantMsg }]);
        }
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((input || "").trim() && !isLoading) {
        append({ role: "user", content: input });
        setInput("");
        if (inputRef.current) {
          inputRef.current.style.height = "auto";
        }
      }
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((input || "").trim() && !isLoading) {
      append({ role: "user", content: input });
      setInput("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* ─── Header ─── */}
      <header
        className="flex items-center justify-center gap-4 px-6 py-4 border-b backdrop-blur-xl z-10"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Logo */}
        <div className="relative flex items-center justify-center">
          <img
            src="/logo.png"
            alt="شعار مؤسسة رواد التنمية"
            className="h-10 w-auto object-contain logo-pulse"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            المساعد الذكي
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            صندوق مصعب خورما
          </p>
        </div>
      </header>

      {/* ─── Messages Area ─── */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center gap-6">
              {/* Logo Display */}
              <div className="relative">
                <div
                  className="w-36 h-36 rounded-full"
                  style={{
                    background: "var(--accent-gradient)",
                    opacity: 0.08,
                    filter: "blur(40px)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="شعار مؤسسة رواد التنمية"
                    className="w-24 h-24 object-contain drop-shadow-lg logo-pulse"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden text-6xl">🎓</div>
                </div>
              </div>

              {/* Title Section */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                  منحة صندوق مصعب خورما
                </h2>
                <p className="text-base" style={{ color: "var(--accent-secondary)" }}>
                  برنامج تنظيم وبناء قيادة الشباب
                </p>
                <p
                  className="text-sm max-w-md mx-auto mt-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  أنا مساعدك الذكي للإجابة على أسئلتك حول المنحة والبرامج والمعلومات المتعلقة
                  بمؤسسة رواد التنمية
                </p>
              </div>

              {/* Stats Cards */}
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {[
                  { icon: "🎓", label: "120", desc: "شاب سنوياً" },
                  { icon: "⏰", label: "4", desc: "ساعات أسبوعية" },
                  { icon: "📚", label: "تعليم", desc: "+ تمكين" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="px-5 py-4 rounded-xl text-center transition-all duration-300 card-ruwwad"
                    style={{ minWidth: "110px" }}
                  >
                    <p className="text-2xl mb-1">{stat.icon}</p>
                    <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                      {stat.label}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Suggestion Chips */}
              <div className="w-full max-w-lg mt-4">
                <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                  اقتراحات للأسئلة:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "ما هي شروط المنحة؟",
                    "كيف يتم تقييم الطلبة؟",
                    "ما هي برامج رواد التنمية؟",
                    "كم عدد ساعات الخدمة المطلوبة؟",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="px-4 py-2 rounded-full text-sm transition-all duration-300 chip-ruwwad"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${message.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                  }`}
                style={
                  message.role === "user"
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
                <span
                  className="block text-[10px] font-semibold mb-1.5 opacity-70 tracking-wider uppercase"
                >
                  {message.role === "user" ? "أنت" : "المساعد"}
                </span>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}

          {/* Loading */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div
                className="px-5 py-4 rounded-2xl rounded-bl-sm max-w-[80%]"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="flex gap-1.5 items-center">
                  <span
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: "var(--accent-primary)",
                      animationDelay: "0ms",
                    }}
                  />
                  <span
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: "var(--accent-secondary)",
                      animationDelay: "150ms",
                    }}
                  />
                  <span
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: "var(--accent-tertiary)",
                      animationDelay: "300ms",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

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

      {/* ─── Input Area ─── */}
      <footer
        className="px-4 py-4 border-t backdrop-blur-xl"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <form onSubmit={submitForm} className="max-w-3xl mx-auto flex items-end gap-3">
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
          <button
            type="submit"
            disabled={isLoading || !(input || "").trim()}
            className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0 btn-ruwwad"
            style={{
              background:
                (input || "").trim() && !isLoading
                  ? "var(--accent-gradient)"
                  : "var(--bg-tertiary)",
              boxShadow:
                (input || "").trim() && !isLoading ? "0 4px 20px var(--glow-color)" : "none",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 rotate-180"
              style={{ color: (input || "").trim() && !isLoading ? "#fff" : "var(--text-muted)" }}
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            مؤسسة رواد التنمية • صندوق مصعب خورما 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
