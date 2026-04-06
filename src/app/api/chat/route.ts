import { google } from "@ai-sdk/google";
import { streamText, embed } from "ai";
import { getIndex } from "@/lib/pinecone";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // --- 1. Extract the latest user message ---
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // --- 2. Generate embedding for the user query ---
    const { embedding } = await embed({
      model: google.textEmbeddingModel("gemini-embedding-001"),
      value: userQuery,
    });

    // --- 3. Query Pinecone for the top 3 relevant matches ---
    const index = getIndex();
    const queryResponse = await index.query({
      vector: embedding,
      topK: 3,
      includeMetadata: true,
    });

    // --- 4. Extract text from matches ---
    const context = queryResponse.matches
      .filter((match) => match.metadata && match.metadata.text)
      .map((match) => match.metadata!.text as string)
      .join("\n\n");

    // --- 5. Construct the system prompt with injected context ---
    const systemPrompt = `أنت مساعد ذكي رسمي لمؤسسة رواد التنمية - صندوق مصعب خورما. أجب باللغة العربية الفصحى بأسلوب مهني وودود بناءً على هذه المعلومات فقط من كتيب المنحة.

التعليمات:
- قدم إجابات واضحة ومفصلة
- إذا كانت الإجابة تحتاج إلى نقاط، استخدم تعدادًا رقميًا
- إذا لم تكن الإجابة موجودة في السياق، قل "عذراً، لا أملك معلومات كافية حول هذا الموضوع في كتيب المنحة. يمكنك التواصل مع مسؤول البرنامج للمزيد من التفاصيل."
- تحدث باسم "مؤسسة رواد التنمية"
- اذكر دائماً أن المنحة تستهدف تمكين 120 شاب وشابة سنوياً في شرق عمان/جبل النظيف

السياق من كتيب المنحة:
${context}`;

    // --- 6. Stream the response using gemini-1.5-flash ---
    const result = streamText({
      model: google("gemini-2.5-flash"),
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
