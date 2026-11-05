# 项目类型与差异化规划策略 (Project Type Strategies)

在执行任何规划阶段前，大管家必须判别当前项目属于哪种类型及受众场景，并应用对应的分析重点与策略。

> 📌 每个类型后面都附了**已验证的 GitHub 对标案例**；完整名单、Star 数、许可证与二开边界见 `references/github-open-source-cases.md`（阶段 3 必读）。

## 维度一：项目生命周期 (Project Lifecycle)

### 1. 全新项目 (Greenfield)
*从零开始孵化的产品。*

*   **阶段 0 (需求与验真) 重点**：纯粹的 PMF 验证，低成本 Smoke Test，快速寻找早期采用者 (Early Adopters)。
*   **阶段 3 (架构选型) 重点**：无历史包袱。全面拥抱最前沿的黄金技术栈（如 Next.js App Router, Supabase, Vercel AI SDK），寻找最完整的开源 Boilerplate 加速 MVP 开发。
*   **阶段 6 (落地拆解) 重点**：快速上线闭环，优先考虑 Serverless/边缘部署以降低初期运维成本。
*   **对标案例**：`nextjs/saas-starter`（MIT，订阅计费骨架）、`ixartz/Next-js-Boilerplate`（MIT，工程化全家桶）、`t3-oss/create-t3-app`（MIT，类型安全脚手架）。**禁用**已归档的 `vercel/nextjs-subscription-payments` 作基座。

### 2. 二次开发 / 架构优化重构 (Brownfield / Refactoring)
*基于已有代码库进行功能追加、性能优化或架构翻新。*

*   **阶段 0 (需求与现状) 重点**：评估**技术债务 (Technical Debt)** 与**重构 ROI**。用户当前的痛点是性能卡顿、代码屎山无法维护、还是无法支撑新业务？
*   **阶段 3 (架构选型) 重点**：
    *   **非侵入式演进**：严禁无脑建议“全部推翻重写”。
    *   **绞杀者模式 (Strangler Fig Pattern)**：建议在新服务中实现新功能，通过反向代理 (Nginx/API Gateway) 将旧流量逐步路由到新服务，逐步“绞杀”旧系统。
*   **阶段 6 (落地拆解) 重点**：必须包含**代码审计工单 (Code Audit)**、**遗留数据迁移方案 (Data Migration)** 以及**回归测试 (Regression Testing)** 策略。
*   **对标案例**：`calcom/cal.diy`（原 cal.com，MIT，Turborepo 包拆分与灰度替换）、`twentyhq/twenty`（AGPLv3，现代 CRM 渐进替换老系统，**仅可读结构**）。

### 3. 传统项目 AI 化 (AI Transformation)
*原有的传统软件（如 ERP、CRM、传统 SaaS）需要接入大模型或多模态能力。*

*   **阶段 0 (需求与现状) 重点**：AI 的切入点是**降本增效**（如自动生成周报）还是**体验升维**（如自然语言查报表）？评估数据就绪度（Data Readiness，是否有足够的高质量私有数据支撑 RAG 或微调）。
*   **阶段 3 (架构选型) 重点**：
    *   **Sidecar / BFF (Backend for Frontend) 模式**：绝对不要在老旧的 Java/PHP 单体核心逻辑里硬塞 Python/AI 代码。建议搭建一个独立的 AI 微服务（Node.js/Python），通过 REST/gRPC 与老系统通信。
    *   **事件驱动 (Event-Driven)**：利用 Webhook 或消息队列（Kafka/RabbitMQ/BullMQ），当传统系统状态变更时，异步触发 AI 任务。
*   **阶段 5 (AI 工程) 重点**：极其重要。传统项目数据结构复杂，需要重点设计数据清洗清洗流水线 (ETL)、RAG 知识库架构，以及应对幻觉 (Hallucination) 的风控降级方案（AI 失效时必须能回退到传统规则逻辑）。
*   **对标案例**：`infiniflow/ragflow`（Apache-2.0，ETL + 深度文档解析 + 检索全链路）、`langgenius/dify`（修改版 Apache-2.0，独立 AI 服务形态）、`n8n-io/n8n`（fair-code 自定义许可，事件驱动编排）。

## 维度二：目标受众与使用场景 (Target Audience & Usage Scope)

### 1. 仅个人使用 (Personal Use Only)
*解决开发者自己的痛点，不考虑对外发布。*

*   **商业测算重点**：无需 LTV/CAC 计算，无需支付网关。核心关注**调用成本控制**（使用免费额度或低成本 API）和**开发效率**。
*   **架构选型重点**：极致简化。优先使用本地存储（SQLite、JSON、本地 Markdown）、本地 LLM（Ollama）或无后端纯前端架构 (Local-first)。跳过复杂的 OAuth 鉴权。
*   **对标案例**：`excalidraw/excalidraw`（MIT，纯前端 + 本地存储）、`toeverything/AFFiNE`（CRDT 协同，部分目录另许）。

### 2. 个人先用，后续转公开商业化 (Personal to Commercial)
*先自己吃狗粮 (Dogfooding)，成熟后再对外发布 SaaS。*

*   **商业测算重点**：初期关注成本，但必须在架构中**预留计费锚点**（知道未来如何收费，如按次/按月）。
*   **架构选型重点**：**高内聚低耦合**的模块化设计。前期可关闭 Auth 或设为单用户硬编码，但底层必须使用可平滑扩展的基座（如 Supabase/Firebase），确保未来一键开启 Row Level Security (RLS) 和多租户。
*   **对标案例**：`nextjs/saas-starter`（MIT，Stripe 计费锚点已预埋）、`supabase/supabase`（Apache-2.0，RLS 一键多租户）、`appwrite/appwrite`（BSD-3-Clause，自托管 + 商用友好）。

### 3. 内部团队/企业使用 (Internal Team / Enterprise)
*公司内部提效工具，不上架公开市场。*

*   **商业测算重点**：计算**提效 ROI**（例如：工具节省的人力时间成本 × 员工时薪 vs. API 调用成本 + 开发维护成本）。
*   **架构选型重点**：
    *   **安全合规**：优先考虑私有化部署（Docker / Self-hosted）或内部云（VPC）。数据不可出境，甚至需要对接企业本地知识库或私有大模型。
    *   **鉴权体系**：需要考虑 SSO（单点登录）、LDAP 或基于角色的权限控制（RBAC）。
    *   **审计监控**：必须包含操作审计日志（Audit Logs），谁在什么时间调用了什么数据。
*   **对标案例**：`infiniflow/ragflow`（Apache-2.0，私有化知识库）、`coollabsio/coolify`（Apache-2.0，自托管交付）、`Dokploy/dokploy`（含 proprietary 目录，商用需核对）。注意：SSO/LDAP/审计日志在三者中多为付费版能力，需自行补齐。

### 4. 纯商业化发布 (Public Commercial)
*直接面向 C 端或 B 端客户收钱的产品。*

*   **商业测算重点**：完整的单位经济学、CAC 获客成本、LTV 生命价值、定价阶梯与防刷量机制。
*   **架构选型重点**：高并发、多租户 (Multi-tenant)、支付网关 (Stripe/WeChat Pay) 集成、防 DDoS 与限流 (Rate Limiting) 机制。
*   **对标案例**：`polarsource/polar`（Apache-2.0，订阅计费/权益/发票全链路）、`calcom/cal.diy`（MIT，SaaS 定价分层）、`medusajs/medusa`（MIT + EE 目录另许，电商后端）。**强传染许可项目（documenso / ComfyUI / twenty）不得作闭源 SaaS 基座。**
