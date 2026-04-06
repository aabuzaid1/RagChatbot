import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";
import { Pinecone } from "@pinecone-database/pinecone";
import { google } from "@ai-sdk/google";
import { embedMany } from "ai";



// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

interface DataItem {
  id: string;
  text: string;
}

function chunkText(text: string, maxChunkLength = 1000): string[] {
  const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 30);
  const chunks: string[] = [];
  
  for (const p of paragraphs) {
    if (p.length > maxChunkLength) {
      // Split by Arabic and English punctuation marks
      const sentences = p.split(/(?<=[.?!،؛])\s+/);
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
      chunks.push(p);
    }
  }
  return chunks;
}

async function seed() {
  console.log("🚀 Starting seed process...\n");

  // --- 1. Read data ---
  const pdfPath = resolve(process.cwd(), "كتيب صندوق مصعب خورما 2025.docx.pdf");
  const dataBuffer = readFileSync(pdfPath);
  console.log("📄 Reading PDF file...");
  
  const pdfParse = require("pdf-parse");
  const pdfData = await pdfParse(dataBuffer);
  const rawText = pdfData.text;
  
  const chunks = chunkText(rawText);
  const data: DataItem[] = chunks.map((text, i) => ({
    id: `chunk-${i}`,
    text
  }));
  
  console.log(`📄 Extracted ${data.length} paragraphs from the PDF`);

  // --- 2. Generate embeddings ---
  console.log("🧠 Generating embeddings with gemini-embedding-001...");
  const { embeddings } = await embedMany({
    model: google.textEmbeddingModel("gemini-embedding-001"),
    values: data.map((item) => item.text),
  });
  console.log(`✅ Generated ${embeddings.length} embeddings\n`);

  // --- 3. Upsert into Pinecone ---
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const indexName = process.env.PINECONE_INDEX || "rag-chatbot";
  console.log(`📌 Upserting into Pinecone index: "${indexName}"...`);

  const index = pinecone.index(indexName);

  const vectors = data.map((item, i) => ({
    id: item.id,
    values: embeddings[i],
    metadata: {
      text: item.text,
    },
  }));

  await index.upsert(vectors);

  console.log(`✅ Successfully upserted ${vectors.length} vectors!`);
  console.log("\n🎉 Seed complete! Your knowledge base is ready.");
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
