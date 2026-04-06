import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

async function checkModels() {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const data = await res.json();
  const models = data.models.filter((m: any) => m.supportedGenerationMethods.includes("embedContent") || m.supportedGenerationMethods.includes("batchEmbedContents"));
  console.log("Supported Embedding Models:", models.map((m: any) => m.name));
}
checkModels();
