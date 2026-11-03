# 项目类型与差异化规划策略 (Project Type Strategies)

在执行任何规划阶段前，大管家必须判别当前项目属于以下哪种类型，并应用对应的分析重点与策略。

## 1. 全新项目 (Greenfield)
*从零开始孵化的产品。*

*   **阶段 0 (需求与验真) 重点**：纯粹的 PMF 验证，低成本 Smoke Test，快速寻找早期采用者 (Early Adopters)。
*   **阶段 2 (架构选型) 重点**：无历史包袱。全面拥抱最前沿的黄金技术栈（如 Next.js App Router, Supabase, Vercel AI SDK），寻找最完整的开源 Boilerplate 加速 MVP 开发。
*   **阶段 5 (落地拆解) 重点**：快速上线闭环，优先考虑 Serverless/边缘部署以降低初期运维成本。

## 2. 二次开发 / 架构优化重构 (Brownfield / Refactoring)
*基于已有代码库进行功能追加、性能优化或架构翻新。*

*   **阶段 0 (需求与现状) 重点**：评估**技术债务 (Technical Debt)** 与**重构 ROI**。用户当前的痛点是性能卡顿、代码屎山无法维护、还是无法支撑新业务？
*   **阶段 2 (架构选型) 重点**：
    *   **非侵入式演进**：严禁无脑建议“全部推翻重写”。
    *   **绞杀者模式 (Strangler Fig Pattern)**：建议在新服务中实现新功能，通过反向代理 (Nginx/API Gateway) 将旧流量逐步路由到新服务，逐步“绞杀”旧系统。
*   **阶段 5 (落地拆解) 重点**：必须包含**代码审计工单 (Code Audit)**、**遗留数据迁移方案 (Data Migration)** 以及**回归测试 (Regression Testing)** 策略。

## 3. 传统项目 AI 化 (AI Transformation)
*原有的传统软件（如 ERP、CRM、传统 SaaS）需要接入大模型或多模态能力。*

*   **阶段 0 (需求与现状) 重点**：AI 的切入点是**降本增效**（如自动生成周报）还是**体验升维**（如自然语言查报表）？评估数据就绪度（Data Readiness，是否有足够的高质量私有数据支撑 RAG 或微调）。
*   **阶段 2 (架构选型) 重点**：
    *   **Sidecar / BFF (Backend for Frontend) 模式**：绝对不要在老旧的 Java/PHP 单体核心逻辑里硬塞 Python/AI 代码。建议搭建一个独立的 AI 微服务（Node.js/Python），通过 REST/gRPC 与老系统通信。
    *   **事件驱动 (Event-Driven)**：利用 Webhook 或消息队列（Kafka/RabbitMQ/BullMQ），当传统系统状态变更时，异步触发 AI 任务。
*   **阶段 4 (AI 工程) 重点**：极其重要。传统项目数据结构复杂，需要重点设计数据清洗清洗流水线 (ETL)、RAG 知识库架构，以及应对幻觉 (Hallucination) 的风控降级方案（AI 失效时必须能回退到传统规则逻辑）。
