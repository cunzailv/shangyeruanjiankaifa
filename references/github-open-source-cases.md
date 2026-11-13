# GitHub 开源案例库与二开边界清单 (Open-Source Case Library)

> **阶段 3 的真相**：不是"我不会写，所以找个仓库抄一遍"，而是"这个仓库的**架构形态**能不能借、它的**许可证**允不允许我拿去卖钱、它的**边界**在哪里"。
> 案例的价值只有三个：① 看清成熟产品的目录结构与模块划分；② 验证某条技术路线真的跑得通；③ 提前撞上许可证与合规的墙，而不是上线后收到律师函。

> **按"变现模型"配对的另一批底座**（订阅计费 / 会员内容 / 电商 / API 网关 / 内容站 / 预约 / 视频）见 `monetization-models.md` 第 7 节，含 BSL / AGPL / GPL 商用禁区清单，与本清单互补、不重复。

---

## 0. 五条使用纪律 (Rules of Use)

1. **对标结构，不整仓换皮**。允许复用的是架构分层、目录组织、关键中间件选型；不允许的是把别人仓库改个 Logo 就声称自研（商用风险 + 技术债双杀）。
2. **先看 LICENSE，再看 Star**。高星 ≠ 可商用：本项目清单里 16.5 万星的绘图项目是 AGPL-3.0，14.5 万星的是 GPL-3.0，一旦做成闭源 SaaS 就是裸奔。
3. **归档项目只能当教科书**。已 `archived` 的仓库不得作为基座，只能参考其代码组织方式。
4. **"活跃"必须写成日期**。模板型高星仓库经常悄悄停更（`nextjs/saas-starter` 最后提交 2025-12、`create-t3-app` 2025-12、`novel` 2025-01），报告里写"活跃"两个字就是糊弄。**没有具体日期 = 没有评估**。
5. **数据会漂移**。本清单所有 Star / 许可证 / 最近提交时间均抓取自 GitHub API（**截至 2026-11-05**），复用前请复跑一次：

```bash
curl -s "https://api.github.com/repos/nextjs/saas-starter" | \
  python3 -c "import sys,json;d=json.load(sys.stdin);print(d['stargazers_count'],(d.get('license') or {}).get('name'),d['archived'],d['pushed_at'])"
```

---

## 1. 按项目类型选案例 (By Project Lifecycle)

对应 `project-type-strategies.md` 的维度一。**判型之后先来这张表选"对标对象"，再进技术栈选型。**

| 项目类型 | 首选对标案例 | 借什么（可复用点） | 禁区（绝对不能做的事） |
| :--- | :--- | :--- | :--- |
| **全新项目 (Greenfield)** | [`nextjs/saas-starter`](https://github.com/nextjs/saas-starter) ★16.2k · MIT · 最后提交 2025-12<br>[`ixartz/Next-js-Boilerplate`](https://github.com/ixartz/Next-js-Boilerplate) ★13.1k · MIT · 2026-11 活跃<br>[`t3-oss/create-t3-app`](https://github.com/t3-oss/create-t3-app) ★29.2k · MIT · 2025-12 | 订阅计费 + 多租户骨架（saas-starter）；i18n、鉴权、测试与 CI 的工程化全家桶（ixartz）；端到端类型安全（t3 = tRPC + Prisma + NextAuth） | 不要 fork 已归档的 [`vercel/nextjs-subscription-payments`](https://github.com/vercel/nextjs-subscription-payments)（★7.7k，**2025-01 已归档**），它只适合当下单页架构的读本 |
| **二开 / 重构 (Brownfield)** | [`calcom/cal.diy`](https://github.com/calcom/cal.diy) ★49.7k · MIT<br>[`twentyhq/twenty`](https://github.com/twentyhq/twenty) ★60.5k · AGPLv3 + 商业例外 | Turborepo Monorepo 的包拆分与"新功能独立成包、旧系统保留"的绞杀者范式（cal.diy，原 `calcom/cal.com`）；渐进式替换老 CRM 时如何双写与灰度（twenty） | 严禁"全部推翻重写"；严禁直接基于 AGPL 项目做闭源二开（twenty / documenso 均需法务签字） |
| **传统项目 AI 化 (AI Transformation)** | [`langgenius/dify`](https://github.com/langgenius/dify) ★160.5k · 修改版 Apache-2.0<br>[`infiniflow/ragflow`](https://github.com/infiniflow/ragflow) ★93.6k · Apache-2.0<br>[`n8n-io/n8n`](https://github.com/n8n-io/n8n) ★209.6k · fair-code 自定义许可 | 独立 AI 微服务（Sidecar/BFF）如何与老单体通过 REST/Webhook 缝合；ETL → 切片 → 检索 → 重排的完整 RAG 落地链路；事件驱动触发的成熟形态 | 严禁把 Python/LLM 代码直接塞进老旧 Java/PHP 单体核心逻辑；n8n 的自定义许可以"内部使用"边界为主，对外售卖服务前必须核对条款 |

> **判型输出要求**：选型报告里必须写清"对标哪一个、借哪一层、哪一层自己写"，三者缺一即为不合格。

---

## 2. 按受众场景选案例 (By Target Audience & Usage Scope)

对应 `project-type-strategies.md` 的维度二。同一个功能，受众不同，基座选择完全相反。

| 受众场景 | 推荐案例 | 选它的理由 | 必须补的东西 |
| :--- | :--- | :--- | :--- |
| **仅个人使用** | [`excalidraw/excalidraw`](https://github.com/excalidraw/excalidraw) ★135.2k · MIT<br>[`toeverything/AFFiNE`](https://github.com/toeverything/AFFiNE) ★74.2k · 部分目录另许 | 真正的 Local-first：无后端、无登录、本地存储即可跑通全流程；AFFiNE 是 CRDT 协同的教科书 | 什么都不用补 —— 但要接受"不能平滑转商业"的事实 |
| **个人先用、后续商业化** | [`nextjs/saas-starter`](https://github.com/nextjs/saas-starter) ★16.2k · MIT<br>[`supabase/supabase`](https://github.com/supabase/supabase) ★114.6k · Apache-2.0<br>[`appwrite/appwrite`](https://github.com/appwrite/appwrite) ★57.9k · BSD-3-Clause | 前期单用户硬编码也能跑，打开 RLS / Auth 即变多租户；计费锚点（Stripe Webhook）已经预埋 | 现在就要预留：租户字段、计费事件表、限流与配额字段。**事后加 = 重写** |
| **内部团队 / 企业使用** | [`nocodb/nocodb`](https://github.com/nocodb/nocodb) ★65.4k · 自定义（AGPL 系）<br>[`coollabsio/coolify`](https://github.com/coollabsio/coolify) ★65.7k · Apache-2.0<br>[`Dokploy/dokploy`](https://github.com/Dokploy/dokploy) ★38.2k · 含 proprietary 目录<br>[`infiniflow/ragflow`](https://github.com/infiniflow/ragflow) ★93.6k · Apache-2.0 | 全部可 Docker 私有化部署、数据不出内网；Coolify / Dokploy 是自托管 PaaS 的现成形态；RAGFlow 自带本地知识库落地路径 | SSO/LDAP、RBAC、审计日志三件套 —— 这些案例里多数是"企业版付费项"，要自己补或买 |
| **纯商业化发布** | [`polarsource/polar`](https://github.com/polarsource/polar) ★10.5k · Apache-2.0<br>[`documenso/documenso`](https://github.com/documenso/documenso) ★15.7k · AGPL-3.0<br>[`calcom/cal.diy`](https://github.com/calcom/cal.diy) ★49.7k · MIT<br>[`medusajs/medusa`](https://github.com/medusajs/medusa) ★37.1k · MIT（另含 EE 目录） | Polar 是订阅计费/权益/发票的完整参考实现；Documenso 展示签署类业务的合规闭环；cal.diy 展示 SaaS 定价分层；Medusa 是可商用的电商后端 | 多租户隔离、防刷限流、退款与税务、发票合规。**这些是"上线即收到投诉"的高频点** |

---

## 3. 按产品形态对标 (By Product Track)

对应 `tech-stack-matrix.md` 的六大赛道。（★ 为 2026-11-05 数据；标注"活跃"即近 12 个月有提交，标注日期即最后提交时间）

| 赛道 | 已验证案例 | 技术栈 | ★ | 许可 | 二开边界（可直接用 / 只能看） |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AI 对话 / 写作** | [`vercel/chatbot`](https://github.com/vercel/chatbot) | Next.js + AI SDK + Postgres | 21.0k | Apache-2.0 | 可直接作对话产品骨架（流式、多会话、附件），2026-11 仍在维护；写作编辑器另看 [`steven-tey/novel`](https://github.com/steven-tey/novel)（★16.5k，Apache-2.0，Tiptap 富文本 + AI 补全，**2025-01 后停更，仅作结构参考**） |
| | [`langgenius/dify`](https://github.com/langgenius/dify) | Python + Next.js | 160.5k | 修改版 Apache-2.0（含附加条件） | 只能看"平台化产品如何组织工作流/知识库/多应用"；对外做多租户 SaaS 前必须逐条核对附加条件 |
| **AI 绘图 / 画布** | [`Comfy-Org/ComfyUI`](https://github.com/Comfy-Org/ComfyUI) | Python 节点式推理引擎 | 145.2k | **GPL-3.0** | 只能作为后端推理服务调用（独立进程），闭源分发需谨慎；不可把其代码并入自有闭源产品 |
| | [`AUTOMATIC1111/stable-diffusion-webui`](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | Python + Gradio | 165.3k | **AGPL-3.0** | 只作技术读本；作为 SaaS 后端会触发网络服务开源义务 |
| | [`excalidraw/excalidraw`](https://github.com/excalidraw/excalidraw) / [`tldraw/tldraw`](https://github.com/tldraw/tldraw) | React 画布 | 135.2k / 51.3k | MIT / tldraw 自定义许可 | Excalidraw 可作画布层（MIT 干净）；tldraw 免费额度与"去除水印"需商业授权，商用前必须核对 |
| **AI 音频 / 语音** | [`openai/whisper`](https://github.com/openai/whisper) | Python ASR | 112.0k | MIT | 可直接用作字幕/转写管线（可商用）；长音频需自行切片与并发控制 |
| | [`pipecat-ai/pipecat`](https://github.com/pipecat-ai/pipecat) | Python 实时语音管线 | 17.1k | BSD-2-Clause | 可直接作"语音进 → LLM → 语音出"的实时编排层，商用友好 |
| **AI 视频 / 数字人** | [`remotion-dev/remotion`](https://github.com/remotion-dev/remotion) | React 代码化视频渲染 | 70.9k | Remotion 自定义许可（按公司规模授权） | 个人/小团队免费，**公司规模超阈值需购买授权**；渲染必须放异步队列，勿在 API Route 同步等待 |
| **实时语音 / 伴侣** | [`livekit/livekit`](https://github.com/livekit/livekit) + [`livekit/agents`](https://github.com/livekit/agents) | Go SFU + Python Agent 框架 | 22.1k / 15.1k | Apache-2.0 | 可直接作 WebRTC 基座与多角色对话编排；注意并发连接成本与带宽账单 |
| **企业 RAG / 知识库** | [`infiniflow/ragflow`](https://github.com/infiniflow/ragflow) | Python/Go，含深度文档解析 | 93.6k | Apache-2.0 | 可直接作私有化知识库底座；幻觉风控与降级仍需自建 |
| | [`langchain-ai/langchain`](https://github.com/langchain-ai/langchain) + [`qdrant/qdrant`](https://github.com/qdrant/qdrant) | Python / Rust 向量库 | 149.1k / 35.4k | MIT / Apache-2.0 | 组件库与向量库均在商用友好区间；LangChain 只作积木，别把业务逻辑埋在 Chain 里 |
| **Agent 编排** | [`crewAIInc/crewAI`](https://github.com/crewAIInc/crewAI) | Python 角色化多智能体 | 60.5k | MIT | 可直接作角色分工骨架（贴近本项目"专家军团"思路）；成本与死循环需自建止损 |
| | [`FlowiseAI/Flowise`](https://github.com/FlowiseAI/Flowise) | Node/TS 可视化编排 | 55.6k | 自定义许可，**2026-08 已归档** | 已归档：只能看交互与节点设计，不可作基座 |

---

## 4. 平台侧"不要自己造"清单 (Platform Primitives)

以下能力 90% 的团队自研都是浪费，直接对标或接入：

| 能力 | 案例 | ★ | 许可 | 使用结论 |
| :--- | :--- | :--- | :--- | :--- |
| **订阅计费 / 权益 / 发票** | [`polarsource/polar`](https://github.com/polarsource/polar) | 10.5k | Apache-2.0 | 自建计费的完整参考；也可直接作为计费中台（Polar 提供托管服务） |
| **全链路埋点与 BI** | [`PostHog/posthog`](https://github.com/PostHog/posthog) | 40.7k | MIT 核心 + `ee/` 商业目录 | 核心可自托管；`ee/` 目录不可免费商用，团队规模大时按官方定价走 |
| **LLM 观测与评测** | [`langfuse/langfuse`](https://github.com/langfuse/langfuse) | 37.1k | MIT 核心 + `ee/` | 直接接入做 Trace / 成本归因 / Prompt 版本对比，正好补上"Token 账单失控"的死穴 |
| | [`vibrantlabsai/ragas`](https://github.com/vibrantlabsai/ragas)（原 `explodinggradients/ragas`） | 16.2k | Apache-2.0 | RAG 幻觉与忠实度的评测基线，阶段 5 必挂（最后提交 2026-02，节奏放缓但指标设计仍是最佳参考） |
| **异步任务 / 事件驱动** | [`triggerdotdev/trigger.dev`](https://github.com/triggerdotdev/trigger.dev) | 16.7k | Apache-2.0 | 长任务（生图/生视频/批量解析）的标准解法，商用友好 |
| | [`inngest/inngest`](https://github.com/inngest/inngest) | 6.0k | **SSPL + 未来转 Apache** | SSPL 不属于 OSI 开源，自托管对外提供服务有约束；优先用其云服务或用 trigger.dev 替代 |
| **自托管部署 / 私有化交付** | [`coollabsio/coolify`](https://github.com/coollabsio/coolify) / [`Dokploy/dokploy`](https://github.com/Dokploy/dokploy) | 65.7k / 38.2k | Apache-2.0 / 含 proprietary 目录 | 内部/私有化场景可直接用；Dokploy 的 `/proprietary` 目录不可剥离商用，需核对 |
| **后端即服务（Auth + DB + Storage）** | [`supabase/supabase`](https://github.com/supabase/supabase) / [`appwrite/appwrite`](https://github.com/appwrite/appwrite) | 114.6k / 57.9k | Apache-2.0 / BSD-3-Clause | 两者均可自托管 + 商用；Supabase 的 RLS 是多租户最省事的路径 |

---

## 5. 三票否决清单 (Red Flags — 任一中招即降级)

1. **强传染许可（AGPL / GPL）**：`documenso`（AGPL-3.0）、`AUTOMATIC1111`（AGPL-3.0）、`ComfyUI`（GPL-3.0）、`twenty`（AGPLv3 为主 + 商业例外）。做成网络服务即触发开源义务，除非法务书面同意，否则只能"独立进程调用 / 只读参考"。
2. **已归档**：`vercel/nextjs-subscription-payments`（2025-01 归档）、`FlowiseAI/Flowise`（2026-08 归档）。基座一律不用，最多当架构读本。
3. **自定义 / 受限许可**：`dify`（修改版 Apache + 附加条件）、`n8n`（fair-code 类自定义）、`tldraw`（水印与商用授权）、`remotion`（按实体规模授权）、`inngest`（SSPL）、`Dokploy`（proprietary 目录）、`nocodb` / `AFFiNE`（部分目录另许）、`medusajs`（EE 目录另许）、`langfuse` / `PostHog`（`ee/` 另许）。**结论必须落到一句人话："我们能不能把它卖给客户？"**，答不出来就是没评估完。
4. **Star 数欺诈**：★165k 不等于能商用，★6k 也不等于不能用。许可与维护活跃度才是判据。
5. **停更风险**：`steven-tey/novel`（2025-01，已超 12 个月）、`AUTOMATIC1111`（2026-03，节奏已明显放缓）。这类仓库可以借结构，但依赖版本、API 兼容与安全补丁要你自己扛。

---

## 6. 目录结构速读：这些仓库到底长什么样 (Repo Anatomy)

说"借那一层"之前，得先知道那层长什么样。以下是 10 个主力基座的**真实顶层结构**（GitHub contents API 抓取，2026-11-05），以及"该抄 / 别抄"的判断。

### 6.1 骨架型（薄，专供 fork）

**`nextjs/saas-starter`** ★16.2k · MIT
```text
app/  components/  lib/  middleware.ts  drizzle.config.ts
```
- **形态**：极薄的三层结构 —— 路由（`app/`）、组件（`components/`）、业务与数据访问（`lib/`），`middleware.ts` 承担鉴权拦截，`drizzle.config.ts` 是唯一的数据契约。
- **该抄**：`lib/` 里把「鉴权、订阅、Stripe Webhook」拆成独立模块的写法；租户字段如何贯穿。
- **别抄**：示例页面与营销文案。这套骨架的业务层厚度几乎为零，PRD 里 70% 的功能要你自己写。

**`ixartz/Next-js-Boilerplate`** ★13.1k · MIT
```text
src/  migrations/  tests/  .storybook/  .github/  playwright.config.ts
knip.config.ts  oxlint.config.ts  commitlint.config.ts  crowdin.yml  lefthook.yml
```
- **形态**：`src/` 单目录应用 + `migrations/` 数据库迁移 + 一整套"工程化外挂"（Storybook 组件工作台、Playwright 端到端、Crowdin 多语言、lefthook 提交钩子、knip 死代码检测）。
- **该抄**：**配置文件的组合方式**——这就是它 13k 星的全部价值；团队协作规范可直接照搬。
- **别抄**：不要为了"全家桶齐全"把这些工具全塞进小项目，否则第一天就在配 lint 规则而不是写功能。

### 6.2 平台型（大，只可读结构）

**`calcom/cal.diy`** ★49.7k · MIT（原 cal.com）
```text
apps/  packages/  example-apps/  agents/  specs/  deploy/  docs/  scripts/
.changeset/  .husky/  Dockerfile  Procfile  PERMISSIONS.md
```
- **形态**：标准 Turborepo/Alphabet Monorepo —— `apps/` 放可运行应用，`packages/` 放共享包（类型、UI、业务内核），`example-apps/` 演示第三方如何集成，`deploy/` 与 `Dockerfile` 负责交付，`specs/` 把需求写成规格文档。
- **该抄**：`apps/` 与 `packages/` 的切分粒度 —— 什么该下沉成包、什么必须留在应用里；`PERMISSIONS.md` 这种"权限矩阵落在仓库里"的做法。
- **别抄**：不要整仓 fork。它的包依赖图极深，你只想要其中 5%，却要背负 100% 的升级成本。

**`twentyhq/twenty`** ★60.5k · AGPLv3 + 商业例外
```text
packages/  nx.json  tsconfig.base.json  jest.preset.js  .yarn/
```
- **形态**：Nx 管理的 Monorepo，所有代码收在 `packages/`（前端、后端、共享类型、组件库分层）。
- **该抄**：**渐进替换老 CRM 的双写与灰度思路**，以及"单一 packages 树 + Nx 依赖图"的约束方式。
- **别抄**：业务代码。AGPL 传染，闭源二开等于自找律师函。

**`langgenius/dify`** ★160.5k · 修改版 Apache-2.0
```text
api/  web/  packages/  sdks/  docker/  cli/  e2e/  dify-agent/  dify-agent-runtime/  skills/  docs/
```
- **形态**：最典型的"Python 后端 + Next.js 前端 + 多语言 SDK"平台结构 —— `api/` 是业务与编排内核，`web/` 是控制台，`packages/` 与 `sdks/` 对外供集成，`docker/` 是私有化交付形态，`dify-agent/` 与 `dify-agent-runtime/` 把智能体运行时单独拆出。
- **该抄**：**把 Agent 运行时从 Web 应用里拆出去**这一刀 —— 这正是老单体做 AI 化时最该学的 Sidecar 边界。
- **别抄**：整平台照搬。160k 星背后是几百人年的功能堆叠，你要的通常只是"工作流 + 知识库"那两块。

**`infiniflow/ragflow`** ★93.6k · Apache-2.0
```text
cmd/  internal/  web/  sdk/  conf/  docker/  deps/  tools/  test/  example/
```
- **形态**：Go 后端的分层范式 —— `cmd/` 只放入口（main），`internal/` 收全部业务实现（外部不可 import），`web/` 前端，`conf/` 配置，`deps/` 第三方依赖治理。
- **该抄**：**`cmd/` 与 `internal/` 的严格分界**，这是让后端可长期维护的最低成本手段；RAG 链路的模块切分（解析 / 切片 / 检索 / 重排）。
- **别抄**：它的深度文档解析依赖较重（含模型与 OCR 依赖），轻量业务没必要全套引入。

### 6.3 产品型（学习"怎么把一件事做完"）

**`vercel/chatbot`** ★21.0k · Apache-2.0
```text
app/  components/  hooks/  lib/  artifacts/  tests/  drizzle.config.ts  instrumentation.ts
```
- **形态**：Next.js 对话产品的完整闭环 —— 路由与流式接口（`app/`）、聊天 UI 组件（`components/`）、自写 hooks（`hooks/`）、AI 调用与数据层（`lib/`）、`artifacts/` 存生成物、`instrumentation.ts` 做可观测埋点。
- **该抄**：**流式响应 + 会话持久化 + 产物存对象存储**这条完整链路，以及 `hooks/` 与 `lib/` 的职责切分（前端状态 vs 模型调用）。
- **别抄**：它的存储与模型绑定默认偏 Vercel 生态，迁到自建环境要改一层适配。

**`polarsource/polar`** ★10.5k · Apache-2.0
```text
server/  clients/  infra/  terraform/  lambda/  sdk/  dev/  docs/  handbook/
```
- **形态**：商业化计费产品的分层 —— `server/`（Python 后端）、`clients/`（多端前端）、`infra/` + `terraform/`（基础设施即代码）、`lambda/`（事件与回调的无服务器处理）、`sdk/`（对外集成）、`handbook/`（内部运营手册）。
- **该抄**：**计费领域模型的拆法**（产品 / 价格 / 订阅 / 权益 / 发票 各自独立），以及"基础设施进仓库"的做法。
- **别抄**：别把它的多层 IaC 用在 MVP 阶段 —— 单机 Docker 就够跑很久。

**`crewAIInc/crewAI`** ★60.5k · MIT
```text
lib/  docs/  scripts/  pyproject.toml  uv.lock
```
- **形态**：Python 单包工程（`lib/` 下多子包，如核心与工具集），uv 管依赖，`docs/` 与 `scripts/` 支撑开发。
- **该抄**：**角色 / 任务 / 流程三件套的抽象方式** —— 与本项目的"三大军团 12 角色"几乎同构，可直接对照改造。
- **别抄**：默认的无限轮对话与工具重试，必须自己加步数上限与成本熔断。

**`livekit/agents`** ★15.1k · Apache-2.0
```text
livekit-agents/  livekit-plugins/  examples/  tests/
```
- **形态**：核心框架（`livekit-agents/`）与插件（`livekit-plugins/`）彻底分离 —— 每家模型/语音服务各一个插件包，`examples/` 提供可直接跑的范式。
- **该抄**：**"核心 + 插件"的解耦**，这是多模型供应商时代唯一能算得过账的架构；`examples/` 当启动模板用。
- **别抄**：插件全装。按需装 1~2 个，否则镜像体积和冷启动会把成本吃掉。

### 6.4 通用方法：10 分钟读透任意一个仓库

```bash
# 只看顶层，不 clone、不读源码
curl -s "https://api.github.com/repos/{owner}/{repo}/contents/" | \
  python3 -c "import sys,json;[print(x['type'][0].upper(), x['name']) for x in json.load(sys.stdin)]"
```

1. **认形态**：顶层出现 `apps/` + `packages/`（或 `packages/` + `nx.json`/`pnpm-workspace.yaml`）= Monorepo；只有 `app/`、`src/`、`lib/` = 单体应用；只有 `lib/` = 单包库。
2. **找入口**：`cmd/`、`server/`、`api/`、`app/` 是业务入口，入口越薄越好；入口如果塞满业务逻辑，这个仓库别当基座。
3. **找契约**：`prisma/`、`migrations/`、`drizzle.config.ts`、`schema/`、`conf/` —— 数据模型在哪，二开边界就在哪。
4. **找商业化边界**：出现 `ee/`、`proprietary/`、`enterprise/`，说明核心功能可能被切走了，先看许可再谈复用。
5. **找交付与质量**：`docker/`、`deploy/`、`terraform/`、`.github/workflows/`、`tests/`、`e2e/` —— 没有这些的仓库，等于把上线成本全转嫁给你。

---

## 7. 阶段 3 输出模板：开源底座评估矩阵 (Case Evaluation Matrix)

选型报告里必须包含下表，2~3 个候选（**一主一备**），每行都要有许可结论：

| 候选仓库 | 对标目的 | 复用模块 | 二开方式 | 许可证结论 | 维护活跃度 | 主要风险 | 决策 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 例：`nextjs/saas-starter` | 订阅计费 + 多租户骨架 | Auth / Stripe Webhook / 租户表 | Fork 后剥离示例页 | MIT，可闭源商用 ✅ | 最后提交 2025-12（模板趋稳，非归档） | 示例业务过薄，需自建权限模型 | **采用（主）** |
| 例：`calcom/cal.diy` | Monorepo 与服务拆分范式 | `packages/` 分层与 app 拆分 | 只抄目录组织，不引入其业务 | MIT，可商用 ✅ | 最后提交 2026-11 | 体量过大，直接 fork 会背技术债 | 参考 |
| 例：`ComfyUI` | 绘图推理后端 | 作为独立推理服务调用 | 独立进程 + 内部 API | GPL-3.0，**不可并入闭源产品** ❌ | 最后提交 2026-11 | 许可传染 | 降级为外部依赖 |

**决策硬规则**：

- 主候选必须同时满足「许可可商用 + 非归档 + 与阶段 2 的 PRD 功能覆盖度 ≥ 70%」三条件；
- 活跃度必须写成**具体日期**：12 个月内有提交才算"在维护"，模板型仓库放宽到 18 个月并标注"稳定版"；
- 任何一个候选"许可待定"，该阶段**不得放行**；
- 归档项目只能出现在"参考"列，不得出现在"采用"列。
