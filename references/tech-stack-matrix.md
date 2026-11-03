# 黄金技术栈与开源底座选型矩阵 (Tech Stack Matrix)

在执行 **阶段 2 (GitHub 开源脚手架选型与二次开发规划)** 时，请根据产品形态强制对齐以下黄金架构，禁止随意引入小众冷门或商业不友好的技术。

## 1. 核心应用基座 (Core App Boilerplate)

对于 90% 的 Web SaaS 和 AI 工具，默认推荐以下基座：

*   **全栈框架**: Next.js (App Router) 或 Nuxt.js
*   **语言**: TypeScript 严格模式
*   **UI/样式**: Tailwind CSS + shadcn/ui + Radix UI
*   **数据库与 ORM**: PostgreSQL (Supabase/Neon) + Prisma 或 Drizzle ORM
*   **身份认证**: NextAuth.js (Auth.js) 或 Supabase Auth 或 Clerk
*   **支付网关**: Stripe (国际主推) / Lemon Squeezy (处理全球税务) / Paddle

## 2. AIGC 与多模态专属组件 (AIGC Specific Components)

根据用户产品的核心 AI 功能，拼接以下组件：

| 业务场景 | 核心协议/框架 | 云端服务/API 推荐 | 开源基座参考 (Search Keywords) |
| :--- | :--- | :--- | :--- |
| **AI 对话/写作** | Vercel AI SDK (useChat, 流式 SSE), Tiptap (富文本) | Claude 3.5 Sonnet / OpenAI GPT-4o | `nextjs-ai-chatbot`, `novel` |
| **AI 绘图/设计** | Fabric.js / Konva.js (画布), BullMQ (异步队列) | ComfyUI (自建节点) / Fal.ai / Replicate | `comfyui-nextjs-starter`, `sd-webui` |
| **AI 音视频** | Remotion (React 写视频), FFmpeg.wasm, WaveSurfer | Runway / Pika / Suno / ElevenLabs | `remotion-template`, `video-generator` |
| **实时语音/伴侣** | WebRTC, LiveKit, WebSocket 双向流 | OpenAI Realtime API / CosyVoice | `livekit-agents`, `ai-voice-bot` |
| **企业级 RAG** | LangChain / LlamaIndex / Vercel AI SDK Core | Qdrant / Pinecone / Milvus / Jina Reranker| `chatbase`, `dify`, `rag-starter` |

## 3. 遗留系统改造与 AI 接入架构 (Modernization & AI Integration)

对于**二开/重构项目**或**传统项目 AI 化**，严禁推翻重写，必须采用以下平滑过渡架构：

*   **绞杀者模式 (Strangler Fig Pattern)**：在旧应用之前设置 API Gateway（如 Kong / Nginx / API7），新功能（如 AI 模块）在新技术栈（如 Node.js/Python）中实现。网关将新功能路由到新服务，旧功能路由到旧服务，逐步替换。
*   **Sidecar / BFF 架构**：在前端与老旧后端之间，增加一层 BFF（Backend for Frontend）或 AI Sidecar。前端直接与 BFF 交互，BFF 负责调用大模型并与老旧后端进行数据缝合（Orchestration）。
*   **Webhook / 消息驱动模型**：传统系统的核心流程保持不变，当关键状态改变时（如订单完成、工单创建），发送 Webhook 或丢入消息队列（Kafka/RabbitMQ），触发外部的 AI 智能体（Agent）进行异步处理。

## 4. 架构防坑指南 (Architecture Anti-Patterns)

*   **同步长任务**：绝对不要在 Next.js 的 Server Actions 或 API Route 中同步等待超过 10 秒的 AI 生图/生视频请求（会导致 Vercel 504 Timeout）。**必须采用：用户请求 -> 存入数据库状态为 `pending` -> 发送消息给 BullMQ/Upstash -> 前端轮询或 WebSocket 接收完成通知。**
*   **状态管理滥用**：避免全局 Redux。优先使用 React Query (SWR) 处理服务端状态，Zustand/Jotai 处理客户端轻量状态。
*   **过度微服务化**：在 ARR (年经常性收入) 达到 100 万美元之前，**坚决采用单体架构 (Monolith) 或 Serverless 单体**，拒绝 K8s 和复杂的微服务拆分。
