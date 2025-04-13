import { ChatOllama } from "@langchain/ollama";

export const helpTessdt = ({ name }: { name: string }) => {
  return `Hello ${name}`;
};

export const test1 = async () => {
  console.log("Ollama LLM Example");
  const ollamaLlm = new ChatOllama({
    baseUrl: "http://localhost:11434", // Default value
    model: "llama3.2:latest", // Default value
  });
  const response = await ollamaLlm.invoke(
    "Simulate a rap battle between Stephen Colbert and John Oliver"
  );
  console.log(response.content);
};
