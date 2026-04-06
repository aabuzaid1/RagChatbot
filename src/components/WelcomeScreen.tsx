"use client";

/**
 * WelcomeScreen - شاشة الترحيب الأولى
 * تظهر عند عدم وجود رسائل، وتعرض معلومات عن المنحة واقتراحات للأسئلة
 */

/** بطاقات الإحصائيات الرئيسية */
const STATS = [
  { icon: "🎓", label: "120", desc: "شاب سنوياً" },
  { icon: "⏰", label: "4", desc: "ساعات أسبوعية" },
  { icon: "📚", label: "تعليم", desc: "+ تمكين" },
] as const;

/** اقتراحات الأسئلة الشائعة */
const SUGGESTIONS = [
  "ما هي شروط المنحة؟",
  "كيف يتم تقييم الطلبة؟",
  "ما هي برامج رواد التنمية؟",
  "كم عدد ساعات الخدمة المطلوبة؟",
] as const;

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

export default function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
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
              (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove("hidden");
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
        {STATS.map((stat) => (
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
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-2 rounded-full text-sm transition-all duration-300 chip-ruwwad"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
