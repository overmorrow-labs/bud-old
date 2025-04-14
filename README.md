# Bud

**Bud** is a client-side framework designed to abstract away the complexity of using LangChain and LangGraph. It provides a lightweight and modular agent orchestration layer that connects to LLMs via OpenAI-compatible APIs or local Ollama setups. Bud makes it easy to spin up, manage, and interact with multiple AI agents for different features in your application.

---

## ✨ Features

- Agent Orchestration over LangChain / LangGraph
- Plug-and-play support for OpenAI APIs and Ollama via connection string/config
- React components for chat-based experiences (Assistant UI)
- Instance-based multi-agent support
- Context/configuration-based agent initialization
- Simple API to build custom UX on top of AI agents

---

## 🧠 Scope

- Abstracts LangChain / LangGraph logic
- Provides a client-side **Agent Orchestration Service**
- Exposes reusable **React components** like:
  - `FloatingAssistantBud`
  - `AssistantBud`
- Enables creating multiple agent instances using unique `instanceId`s
- Supports custom context/tooling configuration via exposed interfaces
- Ideal for apps needing multiple AI agents across different features
- Sits on the **client side**, enabling seamless interaction with models through APIs or local endpoints

---

## 🔁 Developer Flow

1. **Install Bud**

   ```bash
   npm install @overmorrow-labs/bud
   yarn add @overmorrow-labs/bud
   ```

2. **Create an Agent Instance**

   ```ts
   import { AgentOrchestrationService, createConfig } from '@your-scope/bud';

   const config = createConfig({
     context: "You're a helpful assistant...",
     tools: [/* Optional tools */],
     model: 'openai:gpt-4',
     connection: {
       apiKey: 'sk-...',
       endpoint: 'https://api.openai.com/v1'
     }
   });

   AgentOrchestrationService.createInstance('my-product-agent', config);
   ```

3. **Access Agent Anywhere**

   ```ts
   const instance = AgentOrchestrationService.getInstance('my-product-agent');
   await instance.ask('How can I help you today?');
   ```

4. **Use Built-in UI Components**

   ```tsx
   import { AssistantBud, FloatingAssistantBud } from '@your-scope/bud/ui';

   <AssistantBud instanceId="my-product-agent" />
   // or
   <FloatingAssistantBud instanceId="my-product-agent" />
   ```

5. **Custom Config Builder**

   Bud exposes interfaces to build the context config programmatically. This allows setting up agents with relevant base instructions, tools, and MCPs to perform specific tasks effectively.

---

## 🎯 Use Cases

- Embed multiple AI agents in different sections of your app (e.g. support, onboarding, documentation, etc.)
- Provide contextual chat-based features with minimal integration
- Extend agent logic via LangChain tooling while keeping the interface lean

---

## 🧩 TL;DR

Bud is your agent superlayer. It:

- Manages agent lifecycles
- Bridges frontend with LLMs
- Gives you beautiful React components
- Allows unlimited agent instances, each tailored for your feature
- Helps you do wonders ✨

