"use client";

/**
 * ChatHeader - شريط العنوان العلوي للمساعد الذكي
 * يعرض شعار رواد التنمية واسم المساعد
 */
export default function ChatHeader() {
  return (
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
        <h1
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          المساعد الذكي
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
          صندوق مصعب خورما
        </p>
      </div>
    </header>
  );
}
