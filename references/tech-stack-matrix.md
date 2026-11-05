# 黄金技术栈与开源底座选型矩阵 (Tech Stack Matrix)

在执行 **阶段 3 (GitHub 开源脚手架选型与二次开发规划)** 时，请根据产品形态强制对齐以下黄金架构，禁止随意引入小众冷门或商业不友好的技术。

> ⚠️ 本表只回答"用什么技术"，不回答"抄哪个仓库、能不能拿去卖"。**必须并行读取 `references/github-open-source-cases.md`**，用真实案例核对许可证（AGPL / 自定义许可 / 已归档）与二开边界，再落选型结论。

## 1. 核心应用基座 (Core App Boilerplate)

对于 90% 的 Web SaaS 和 AI 工具，默认推荐以下基座：

*   **全栈框架**: Next.js (App Router) 或 Nuxt.js
*   **语言**: TypeScript 严格模式
*   **UI/样式**: Tailwind CSS + shadcn/ui + Radix UI
*   **数据库与 ORM**: PostgreSQL (Supabase/Neon) + Prisma 或 Drizzle ORM
*   **身份认证**: NextAuth.js (Auth.js) 或 Supabase Auth 或 Clerk
*   **支付网关**: Stripe (国际主推) / Lemon Squeezy (处理全球税务) / Paddle
*   **已验证基座案例**: [`nextjs/saas-starter`](https://github.com/nextjs/saas-starter)（官方 SaaS 订阅骨架，MIT）· [`ixartz/Next-js-Boilerplate`](https://github.com/ixartz/Next-js-Boilerplate)（工程化全家桶，MIT）· [`t3-oss/create-t3-app`](https://github.com/t3-oss/create-t3-app)（类型安全脚手架，MIT）
*   **命中禁区**: [`vercel/nextjs-subscription-payments`](https://github.com/vercel/nextjs-subscription-payments) 已于 2025-01 归档，只能当读本，不得作为基座

## 2. AIGC 与多模态专属组件 (AIGC Specific Components)

根据用户产品的核心 AI 功能，拼接以下组件：

| 业务场景 | 核心协议/框架 | 云端服务/API 推荐 | 已验证开源案例（许可） |
| :--- | :--- | :--- | :--- |
| **AI 对话/写作** | Vercel AI SDK (useChat, 流式 SSE), Tiptap (富文本) | Claude 3.5 Sonnet / OpenAI GPT-4o | [`vercel/chatbot`](https://github.com/vercel/chatbot)（Apache-2.0，可商用）· [`steven-tey/novel`](https://github.com/steven-tey/novel)（Apache-2.0） |
| **AI 绘图/设计** | Fabric.js / Konva.js (画布), BullMQ (异步队列) | ComfyUI (自建节点) / Fal.ai / Replicate | 推理：[`Comfy-Org/ComfyUI`](https://github.com/Comfy-Org/ComfyUI)（**GPL-3.0，只能独立进程调用**）· 画布：[`excalidraw/excalidraw`](https://github.com/excalidraw/excalidraw)（MIT）/ [`tldraw/tldraw`](https://github.com/tldraw/tldraw)（自定义许可，商用需授权） |
| **AI 音视频** | Remotion (React 写视频), FFmpeg.wasm, WaveSurfer | Runway / Pika / Suno / ElevenLabs | [`remotion-dev/remotion`](https://github.com/remotion-dev/remotion)（按实体规模授权）· [`openai/whisper`](https://github.com/openai/whisper)（MIT，转写管线） |
| **实时语音/伴侣** | WebRTC, LiveKit, WebSocket 双向流 | OpenAI Realtime API / CosyVoice | [`livekit/livekit`](https://github.com/livekit/livekit) + [`livekit/agents`](https://github.com/livekit/agents)（Apache-2.0）· [`pipecat-ai/pipecat`](https://github.com/pipecat-ai/pipecat)（BSD-2，商用友好） |
| **企业级 RAG** | LangChain / LlamaIndex / Vercel AI SDK Core | Qdrant / Pinecone / Milvus / Jina Reranker | [`infiniflow/ragflow`](https://github.com/infiniflow/ragflow)（Apache-2.0，私有化底座）· [`langchain-ai/langchain`](https://github.com/langchain-ai/langchain) + [`qdrant/qdrant`](https://github.com/qdrant/qdrant)（MIT / Apache-2.0） |
| **Agent 编排** | 多角色分工 / DAG 工作流 / 工具调用 | OpenAI Responses API / Anthropic Tools | [`crewAIInc/crewAI`](https://github.com/crewAIInc/crewAI)（MIT）· [`langgenius/dify`](https://github.com/langgenius/dify)（修改版 Apache-2.0，多租户对外服务需核对）· [`n8n-io/n8n`](https://github.com/n8n-io/n8n)（fair-code 自定义许可） |

## 3. 遗留系统改造与 AI 接入架构 (Modernization & AI Integration)

对于**二开/重构项目**或**传统项目 AI 化**，严禁推翻重写，必须采用以下平滑过渡架构：

*   **绞杀者模式 (Strangler Fig Pattern)**：在旧应用之前设置 API Gateway（如 Kong / Nginx / API7），新功能（如 AI 模块）在新技术栈（如 Node.js/Python）中实现。网关将新功能路由到新服务，旧功能路由到旧服务，逐步替换。→ 结构参照 [`calcom/cal.diy`](https://github.com/calcom/cal.diy)（Turborepo 包拆分，MIT）与 [`twentyhq/twenty`](https://github.com/twentyhq/twenty)（AGPLv3，仅读结构）。
*   **Sidecar / BFF 架构**：在前端与老旧后端之间，增加一层 BFF（Backend for Frontend）或 AI Sidecar。前端直接与 BFF 交互，BFF 负责调用大模型并与老旧后端进行数据缝合（Orchestration）。→ 形态参照 [`langgenius/dify`](https://github.com/langgenius/dify)（独立 AI 服务 + 可视化编排）。
*   **Webhook / 消息驱动模型**：传统系统的核心流程保持不变，当关键状态改变时（如订单完成、工单创建），发送 Webhook 或丢入消息队列（Kafka/RabbitMQ），触发外部的 AI 智能体（Agent）进行异步处理。→ 队列工程参照 [`triggerdotdev/trigger.dev`](https://github.com/triggerdotdev/trigger.dev)（Apache-2.0）。

## 4. 架构防坑指南 (Architecture Anti-Patterns)

*   **同步长任务**：绝对不要在 Next.js 的 Server Actions 或 API Route 中同步等待超过 10 秒的 AI 生图/生视频请求（会导致 Vercel 504 Timeout）。**必须采用：用户请求 -> 存入数据库状态为 `pending` -> 发送消息给 BullMQ/Upstash -> 前端轮询或 WebSocket 接收完成通知。**
*   **状态管理滥用**：避免全局 Redux。优先使用 React Query (SWR) 处理服务端状态，Zustand/Jotai 处理客户端轻量状态。
*   **过度微服务化**：在 ARR (年经常性收入) 达到 100 万美元之前，**坚决采用单体架构 (Monolith) 或 Serverless 单体**，拒绝 K8s 和复杂的微服务拆分。
*   **许可传染型依赖**：把 AGPL / GPL 项目当普通依赖塞进闭源产品（如绘图层直接用 `ComfyUI`、签署层直接接 `documenso`），上线即触发开源义务或索赔。选型前必须先过 `github-open-source-cases.md` 的《三票否决清单》。
*   **迷信高星仓库**：★16 万不等于能给客户用，只说明写代码的人多；归档仓库（`vercel/nextjs-subscription-payments`、`Flowise`）再香也不能当基座。
