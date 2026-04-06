"use client";

/**
 * LoadingIndicator - مؤشر التحميل (النقاط المتحركة)
 * يظهر أثناء انتظار رد المساعد الذكي
 */
export default function LoadingIndicator() {
  return (
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
            style={{ background: "var(--accent-primary)", animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ background: "var(--accent-secondary)", animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ background: "var(--accent-tertiary)", animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
