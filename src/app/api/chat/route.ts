import { google } from "@ai-sdk/google";
import { streamText, embed } from "ai";
import { getIndex } from "@/lib/pinecone";

// ─── Constants ───

/** عدد النتائج الأكثر صلة من قاعدة البيانات الاتجاهية */
const TOP_K_RESULTS = 3;

/** نموذج الذكاء الاصطناعي المستخدم للمحادثة */
const CHAT_MODEL = "gemini-2.5-flash";

/** نموذج التضمين المستخدم للبحث الدلالي */
const EMBEDDING_MODEL = "gemini-embedding-001";

/** تعليمات النظام للمساعد الذكي */
const SYSTEM_PROMPT_TEMPLATE = `أنت مساعد ذكي رسمي لمؤسسة رواد التنمية - صندوق مصعب خورما. أجب باللغة العربية الفصحى بأسلوب مهني وودود بناءً على هذه المعلومات فقط من كتيب المنحة.

التعليمات:
- قدم إجابات واضحة ومفصلة
- إذا كانت الإجابة تحتاج إلى نقاط، استخدم تعدادًا رقميًا
- إذا لم تكن الإجابة موجودة في السياق، قل "عذراً، لا أملك معلومات كافية حول هذا الموضوع في كتيب المنحة. يمكنك التواصل مع مسؤول البرنامج للمزيد من التفاصيل."
- تحدث باسم "مؤسسة رواد التنمية"
- اذكر دائماً أن المنحة تستهدف تمكين 120 شاب وشابة سنوياً في شرق عمان/جبل النظيف`;

// ─── API Route Handler ───

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. استخراج آخر رسالة من المستخدم
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // 2. إنشاء التضمين (embedding) لسؤال المستخدم
    const { embedding } = await embed({
      model: google.textEmbeddingModel(EMBEDDING_MODEL),
      value: userQuery,
    });

    // 3. البحث في Pinecone عن أقرب النتائج
    const index = getIndex();
    const queryResponse = await index.query({
      vector: embedding,
      topK: TOP_K_RESULTS,
      includeMetadata: true,
    });

    // 4. استخراج النصوص من النتائج
    const context = queryResponse.matches
      .filter((match) => match.metadata && match.metadata.text)
      .map((match) => match.metadata!.text as string)
      .join("\n\n");

    // 5. بناء prompt النظام مع السياق المُسترجع
    const systemPrompt = `${SYSTEM_PROMPT_TEMPLATE}\n\nالسياق من كتيب المنحة:\n${context}`;

    // 6. بث الرد باستخدام نموذج Gemini
    const result = streamText({
      model: google(CHAT_MODEL),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "حدث خطأ في معالجة طلبك" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
