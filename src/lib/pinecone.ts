import { Pinecone } from "@pinecone-database/pinecone";

if (!process.env.PINECONE_API_KEY) {
  throw new Error("PINECONE_API_KEY environment variable is not set");
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

export const getIndex = () => {
  const indexName = process.env.PINECONE_INDEX || "rag-chatbot";
  return pinecone.index(indexName);
};

export default pinecone;
