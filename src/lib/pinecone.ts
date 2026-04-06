import { Pinecone } from "@pinecone-database/pinecone";

/**
 * Pinecone Client
 * إعداد وتصدير عميل Pinecone لقاعدة البيانات الاتجاهية (Vector Database)
 * يُستخدم للبحث الدلالي في محتوى كتيب المنحة
 */

if (!process.env.PINECONE_API_KEY) {
  throw new Error("PINECONE_API_KEY environment variable is not set");
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

/** الحصول على مرجع Index من Pinecone */
export const getIndex = () => {
  const indexName = process.env.PINECONE_INDEX || "rag-chatbot";
  return pinecone.index(indexName);
};

export default pinecone;
