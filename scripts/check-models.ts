/**
 * Check Models Script - سكربت فحص النماذج المتاحة
 * يعرض جميع نماذج التضمين (Embedding) المدعومة من Google Gemini
 *
 * الاستخدام: npx tsx scripts/check-models.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

interface GeminiModel {
  name: string;
  supportedGenerationMethods: string[];
}

async function checkModels() {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!key) {
    console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY is not set");
    process.exit(1);
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
  );
  const data = await res.json();

  const embeddingModels = data.models.filter(
    (m: GeminiModel) =>
      m.supportedGenerationMethods.includes("embedContent") ||
      m.supportedGenerationMethods.includes("batchEmbedContents")
  );

  console.log(
    "✅ Supported Embedding Models:",
    embeddingModels.map((m: GeminiModel) => m.name)
  );
}

checkModels().catch((error) => {
  console.error("❌ Failed to check models:", error);
  process.exit(1);
});
