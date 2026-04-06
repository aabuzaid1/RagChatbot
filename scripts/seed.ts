/**
 * Seed Script - سكربت تغذية قاعدة البيانات الاتجاهية
 * يقوم بقراءة ملف PDF لكتيب المنحة، تقسيمه إلى أجزاء، وتخزينه في Pinecone
 *
 * الاستخدام: npm run seed
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";
import { Pinecone } from "@pinecone-database/pinecone";
import { google } from "@ai-sdk/google";
import { embedMany } from "ai";

// ─── Configuration ───

config({ path: resolve(process.cwd(), ".env.local") });

const PDF_FILE = "كتيب صندوق مصعب خورما 2025.docx.pdf";
const MAX_CHUNK_LENGTH = 1000;
const MIN_PARAGRAPH_LENGTH = 30;

// ─── Types ───

interface DataItem {
  id: string;
  text: string;
}

// ─── Helper Functions ───

/**
 * تقسيم النص إلى أجزاء (chunks) بحجم مناسب للتضمين
 * يقسم على أساس الفقرات أولاً، ثم الجمل إذا كانت الفقرة طويلة جداً
 */
function chunkText(text: string, maxChunkLength = MAX_CHUNK_LENGTH): string[] {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > MIN_PARAGRAPH_LENGTH);

  const chunks: string[] = [];

  for (const paragraph of paragraphs) {
    if (paragraph.length > maxChunkLength) {
      // تقسيم الفقرة الطويلة بناءً على علامات الترقيم العربية والإنجليزية
      const sentences = paragraph.split(/(?<=[.?!،؛])\s+/);
      let currentChunk = "";

      for (const sentence of sentences) {
        if ((currentChunk + sentence).length > maxChunkLength) {
          if (currentChunk) chunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          currentChunk += " " + sentence;
        }
      }

      if (currentChunk) chunks.push(currentChunk.trim());
    } else {
      chunks.push(paragraph);
    }
  }

  return chunks;
}

// ─── Main Seed Function ───

async function seed() {
  console.log("🚀 Starting seed process...\n");

  // 1. قراءة ملف PDF
  const pdfPath = resolve(process.cwd(), PDF_FILE);
  const dataBuffer = readFileSync(pdfPath);
  console.log(`📄 Reading PDF: ${PDF_FILE}`);

  const pdfParse = require("pdf-parse");
  const pdfData = await pdfParse(dataBuffer);
  const rawText = pdfData.text;

  // 2. تقسيم النص إلى أجزاء
  const chunks = chunkText(rawText);
  const data: DataItem[] = chunks.map((text, i) => ({
    id: `chunk-${i}`,
    text,
  }));
  console.log(`📄 Extracted ${data.length} chunks from PDF`);

  // 3. إنشاء التضمينات (embeddings)
  console.log("🧠 Generating embeddings with gemini-embedding-001...");
  const { embeddings } = await embedMany({
    model: google.textEmbeddingModel("gemini-embedding-001"),
    values: data.map((item) => item.text),
  });
  console.log(`✅ Generated ${embeddings.length} embeddings\n`);

  // 4. رفع البيانات إلى Pinecone
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const indexName = process.env.PINECONE_INDEX || "rag-chatbot";
  console.log(`📌 Upserting into Pinecone index: "${indexName}"...`);

  const index = pinecone.index(indexName);
  const vectors = data.map((item, i) => ({
    id: item.id,
    values: embeddings[i],
    metadata: { text: item.text },
  }));

  await index.upsert(vectors);

  console.log(`✅ Successfully upserted ${vectors.length} vectors!`);
  console.log("\n🎉 Seed complete! Your knowledge base is ready.");
}

// ─── Execute ───

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
