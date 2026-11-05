# 💼 商业软件开发大管家 (Project Development Planner)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/cunzailv/shangyeruanjiankaifa?style=social)](https://github.com/cunzailv/shangyeruanjiankaifa)

> **“按部就班的研发流程只是执行手段。如果不把【用户需求先行】和【商业闭环】放在最前头，用最顶级的架构写出来的也只是无人买单的自嗨废品。”**

这是一个面向创始人、CTO、独立开发者（Indie Hacker）与技术团队打造的高阶“大管家”智能体 Skill。它不负责底层的盲目手写代码，而是化身为你的 **CEO、CFO、CMO、产品总监与首席架构师**，以 **“需求验真先行，商业闭环兜底，开源基座起步，三大军团协同，安全合规并重”** 为核心信条，通过严谨的 **7 阶段商业落地流水线 (Stage Gates)**，帮你把一个模糊的“点子”一步步拆解为可盈利、可落地的敏捷工程工单。

它内置 **38 个已核验的 GitHub 开源案例**（真实 Star 数、真实许可证、真实归档状态），把“找个开源项目抄一下”这种危险动作，变成一张**能直接判断「借哪层、能不能拿去卖」的评估矩阵**。详见 [📦 开源案例库与二开边界清单](references/github-open-source-cases.md)。

---

## 💡 为什么需要它？思想演进与底层逻辑 (Background & Rationale)

为什么普通 AI 在辅助编程时总是天生喜欢“从零手搓玩具代码”？为什么总是一上来就写粗糙的单文件 MVP？为什么很多独立产品做出来了却根本无人买单、上线即死？

我们在深入复盘中彻底梳理了这一系列痛点的根本原因，并沉淀了完整的思想演进白皮书：  
📄 **[从技术自恋到商业闭环：AI 辅助研发与项目规划演进全纪实与实施总则 (docs/ai_development_evolution_and_rationale.md)](docs/ai_development_evolution_and_rationale.md)**

```mermaid
flowchart LR
    Step1["1. 痛点起因\n(为何AI总从0手搓?\n为何总出四不像MVP?)"] --> Step2["2. 机理剖析\n(RLHF最小阻力路径\n与单Agent上下文污染)"]
    Step2 --> Step3["3. 多智能体协作\n(大管家调度\n+ 独立沙箱专家团)"]
    Step3 --> Step4["4. 商业与需求终局\n(JTBD痛点先行\n+ 单位经济学防破产)"]
    Step4 --> Step5["5. 资产沉淀交付\n(Playbook 手册\n+ 规划专家 Skill)"]
```

### 思想演进的四大核心台阶：

1. **从病灶出发（第 1~3 章）**：详细剖析了 AI 天生喜欢在单文件写玩具代码的底层奖励机制（RLHF 造成的即时交差心态与上下文偷懒），以及为什么成熟架构师思维必须基于社区最顶级的开源预制件（Tailwind、shadcn/ui、Prisma、Zod 等）。
2. **多智能体破局（第 4 章）**：推导了“三大专职独立专家军团（12 核心角色）”体系：由 1 个大管家作为 Orchestrator 统控**【商业战略与风控军团】**、**【产研与 AI 工程军团】**与**【商运增长与数据军团】**，彻底封堵单点盲区与自我放水，实现从商业构想到持续造血的完整闭环。
3. **商业终局升华（第 5~6 章）**：讲透了“标准研发流程只是工具”，必须将 **JTBD（Jobs To Be Done）需求验真**、**假门把手测试（Smoke Test）** 与 **算力/出网防破产红线（Cloudflare R2 零出网、BullMQ 异步队列）** 放在写代码之前。
4. **可复用的标准化武器库（第 7 章）**：总结了实战手册与具备强约束力的通用规划 Skill，确保每一次项目规划都在商业与技术的双轨安全防线内运行。

---

## 🏛️ 全景多智能体专家军团矩阵 (The 12-Role Multi-Agent Army)

很多项目破产，不是死在代码有 Bug，而是死在**缺乏合规审查被监管重罚、缺乏 AI 架构导致 Token 账单爆炸、缺乏运维导致流量一冲服务器宕机、缺乏营销推广导致无人问津**。

大管家旗下统控 **三大专职独立专家军团（共 12 大核心角色）**，每个角色拥有独立沙箱上下文，各司其职，坚决杜绝“既当运动员又当裁判”的角色放水：

![全景多智能体专家军团矩阵](docs/images/03_multi_agent_orchestration.png)

| 军团类别 | 专职角色 | 职责使命 | 封堵的致命死穴 |
| :--- | :--- | :--- | :--- |
| **🛡️ 商业战略与风控** | **💰 财务风控官 (CFO)** | 测算单客经济学 ($LTV > 3 \times CAC$)，设计阶梯定价与算力止损线 | 防止算力入不敷出、上线即破产 |
| | **⚖️ 安全合规官 (CISO)** | 审查 GDPR/CCPA 出海隐私、开源商用许可冲突、配置防 Prompt 注入与接口防刷 | 防止刚上线就被欧洲监管罚款或 Stripe 封停 |
| | **📋 产品规划师 (PM)** | 细化 ICP 画像、梳理核心 JTBD 场景与低保真原型 (Wireframe) | 防止需求假大空、核心业务交互逻辑断层 |
| **🛠️ 产研与 AI 工程** | **🔬 开源系统架构师** | 在 GitHub 检索成熟可商用底座，核验许可证（AGPL/自定义许可/归档），界定二开边界与 ADR 架构决策 | 杜绝从零手搓通用轮子，也杜绝把高星 AGPL 项目当基座卖钱 |
| | **🧠 AI 工程架构师** | 设计 Agent 协作拓扑、RAG 向量检索优化、通过 Ragas 评测防幻觉 | 防止 API 调用胡言乱语、Token 账单爆表 |
| | **🎨 UI/UX 规范专家** | 基于 Tailwind + Shadcn 输出设计 Token、组件体系与响应式规约 | 告别粗糙山寨的前端 Demo 界面 |
| | **💻 全栈特工** | 契约先行 (Schema/API)，在开源基座上实现核心差异化业务 | 拒绝过度工程，产出高质可维护的代码 |
| | **⚡ DevOps/SRE 专家** | 构建 CI/CD、Docker 镜像，配置 Cloudflare R2 零出网存储与全球 CDN | 防止 Product Hunt 流量一冲服务器瞬间宕机 |
| | **🕵️ QA 质检对抗官** | 独立沙箱对抗挑刺、执行端到端自动化测试，缺陷不归零绝不放行 | 彻底终结“自己写代码自己测”的放水自欺欺人 |
| **🚀 商运增长与数据** | **📢 营销策划官 (CMO)** | 提炼痛点卖点，撰写高转化 Landing Page 文案，打造 SEO/GEO 护城河 | 防止官网堆砌自嗨技术黑话，提供购买理由 |
| | **🚀 流量推广官 (Growth)** | 负责 Product Hunt、X、小红书、Reddit 冷启动投放与烟雾测试 | 解决流量荒，用极低成本在代码前测出真实买单率 |
| | **🎯 用户运营官 (COO)** | 监控激活与留存漏斗，搭建私域社群与客户成功 (CS) 通路 | 防止用户一波流流失，将差评反哺回阶段 0 迭代 |
| | **📊 数据归因分析师 (BI)**| 设计全链路埋点体系、追踪 Cohort 留存曲线，通过 A/B 测试科学验证假设 | 告别拍脑袋决策，看清每一分推广预算的真实 ROI |

---

## ✨ 核心特性

- **🔘 选择题驱动 (Choice-Driven)**：人类不擅长填空题，但擅长做选择。内置《设计风格字典》与《功能积木库》，直接提供 Plan A / Plan B 供你权衡抉择。
- **🤖 三大专家军团多智能体协同 (Multi-Agent Tri-Pods)**：作为 Orchestrator（统筹者），统控【战略风控】、【产研工程】与【商运增长】三大军团（12 专职角色），智能路由并生成“移交上下文”，打破上下文污染与角色放水，保障工业级商业成功。
- **🧭 动态项目策略**：自动识别**全新项目 (Greenfield)**、**二次开发/重构 (Brownfield)** 和 **传统项目 AI 化 (AI Transformation)**，提供如“绞杀者模式”、“Sidecar”等差异化架构方案。
- **💰 商业防破产机制**：在写代码前强制引入“单位经济学 ($LTV > 3 \times CAC$)”测算，建立零出网费对象存储、异步算力队列与防刷量限流护城河。
- **📦 真实开源案例对标 (Verified Case Library)**：38 个高频使用的 GitHub 仓库逐一核验 **Star / 许可证 / 归档状态**，按「项目类型 → 受众场景 → 产品形态」三张表锁定“借哪一层、自己写哪一层”，并对 **AGPL/GPL 传染、自定义商用限制、已归档仓库** 设三票否决（例如 16.5 万星的 `stable-diffusion-webui` 是 AGPL-3.0、14.5 万星的 `ComfyUI` 是 GPL-3.0，直接并入闭源产品即是事故）。

---

## 🗺️ 7 大标准落地阶段 (Stage Gates)

每个阶段均设置严格的卡点（Stage Gate），输出标准文档后**强制暂停**，必须等待用户确认后才推进下一阶段，严禁抢跑：

1. **阶段 0**：用户需求先行与价值主张验真（PMF / 痛点定级 / Smoke Test 假门把手）
2. **阶段 1**：商业模式、变现路径与单位经济学测算（LTV:CAC / 支付网关合规 / 防破产架构）
3. **阶段 2**：敏捷产品需求文档 (PRD) 与页面交互逻辑（User Story / Wireframe 结构）
4. **阶段 3**：开源脚手架选型与二次开发规划（黄金技术栈匹配 / 真实案例对标 / 许可证合规裁决 / 严禁从零手搓轮子）
5. **阶段 4**：系统契约、数据模型、合规与设计规范（ER 图 / API 契约 / GDPR 合规）
6. **阶段 5**：AI 智能体管线与 Prompt 架构设计（Agent 拓扑 / Ragas 评测 / 降级策略）
7. **阶段 6**：多智能体落地拆解与敏捷验证工单（EPIC -> Task / QA 对抗测试 / DevOps 部署）

---

## 📦 开源案例库速览（节选，完整版见 [references/github-open-source-cases.md](references/github-open-source-cases.md)）

| 你要做的事 | 首选对标案例 | Star | 许可证 | 结论 |
| :--- | :--- | :--- | :--- | :--- |
| 搭 SaaS 订阅骨架 | [`nextjs/saas-starter`](https://github.com/nextjs/saas-starter) | 16.2k | MIT | ✅ 可直接作基座 |
| 抄工程化配置（i18n/鉴权/CI） | [`ixartz/Next-js-Boilerplate`](https://github.com/ixartz/Next-js-Boilerplate) | 13.1k | MIT | ✅ 可直接作基座 |
| AI 对话产品骨架 | [`vercel/chatbot`](https://github.com/vercel/chatbot) | 21.0k | Apache-2.0 | ✅ 商用友好 |
| 学 Monorepo / 绞杀者改造 | [`calcom/cal.diy`](https://github.com/calcom/cal.diy)（原 cal.com） | 49.7k | MIT | ✅ 可借结构 |
| 私有化 RAG 知识库 | [`infiniflow/ragflow`](https://github.com/infiniflow/ragflow) | 93.6k | Apache-2.0 | ✅ 可私有化部署 |
| 订阅计费 / 权益 / 发票 | [`polarsource/polar`](https://github.com/polarsource/polar) | 10.5k | Apache-2.0 | ✅ 可作计费中台 |
| 生图后端 | [`Comfy-Org/ComfyUI`](https://github.com/Comfy-Org/ComfyUI) | 145.2k | GPL-3.0 | ⚠️ 只能独立进程调用 |
| 签署/合同类业务 | [`documenso/documenso`](https://github.com/documenso/documenso) | 15.7k | AGPL-3.0 | ❌ 只能读，不可闭源二开 |
| 官方订阅模板 | [`vercel/nextjs-subscription-payments`](https://github.com/vercel/nextjs-subscription-payments) | 7.7k | MIT | ❌ 2025-01 已归档，不可作基座 |

> 数据抓取自 GitHub API，截至 **2026-11-05**；复用时请复核，Star 数不等于可商用。

<details>
<summary><b>📊 点开查看完整榜单：38 个仓库按 8 类形态分组（含最后提交时间与判决）</b></summary>

**① SaaS 基座 / 脚手架**
| 仓库 | ★ | 许可 | 最后提交 | 判决 |
| :--- | :--- | :--- | :--- | :--- |
| [nextjs/saas-starter](https://github.com/nextjs/saas-starter) | 16.2k | MIT | 2025-12 | ✅ 首推基座（薄，需自建业务） |
| [ixartz/Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) | 13.1k | MIT | 2026-11 | ✅ 抄工程化配置 |
| [t3-oss/create-t3-app](https://github.com/t3-oss/create-t3-app) | 29.2k | MIT | 2025-12 | ✅ 类型安全脚手架（已趋稳定） |
| [vercel/nextjs-subscription-payments](https://github.com/vercel/nextjs-subscription-payments) | 7.7k | MIT | 2025-01 | ❌ 已归档 |
| [medusajs/medusa](https://github.com/medusajs/medusa) | 37.1k | MIT + EE 目录 | 2026-11 | ✅ 电商后端（EE 部分另许） |

**② 二开 / 重构参考**
| 仓库 | ★ | 许可 | 最后提交 | 判决 |
| :--- | :--- | :--- | :--- | :--- |
| [calcom/cal.diy](https://github.com/calcom/cal.diy) | 49.7k | MIT | 2026-11 | ✅ 抄 Monorepo 拆分，别整仓 fork |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | 60.5k | AGPLv3 + 商业例外 | 2026-11 | ⚠️ 只读结构，不可闭源二开 |
| [documenso/documenso](https://github.com/documenso/documenso) | 15.7k | AGPL-3.0 | 2026-11 | ❌ 仅作合规读本 |
| [nocodb/nocodb](https://github.com/nocodb/nocodb) | 65.4k | 自定义（AGPL 系） | 2026-11 | ⚠️ 私有化可用，商用需核对 |

**③ AI 对话 / 写作**
| 仓库 | ★ | 许可 | 最后提交 | 判决 |
| :--- | :--- | :--- | :--- | :--- |
| [vercel/chatbot](https://github.com/vercel/chatbot) | 21.0k | Apache-2.0 | 2026-11 | ✅ 对话产品骨架 |
| [steven-tey/novel](https://github.com/steven-tey/novel) | 16.5k | Apache-2.0 | 2025-01 | ⚠️ 停更，仅作结构参考 |
| [langgenius/dify](https://github.com/langgenius/dify) | 160.5k | 修改版 Apache-2.0 | 2026-11 | ⚠️ 平台形态参考，多租户需核对 |

**④ AI 绘图 / 画布**
| 仓库 | ★ | 许可 | 最后提交 | 判决 |
| :--- | :--- | :--- | :--- | :--- |
| [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) | 145.2k | GPL-3.0 | 2026-11 | ⚠️ 只能独立进程调用 |
| [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | 165.3k | AGPL-3.0 | 2026-03 | ❌ 只能读 |
| [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | 135.2k | MIT | 2026-11 | ✅ 画布层可商用 |
| [tldraw/tldraw](https://github.com/tldraw/tldraw) | 51.3k | 自定义（水印/商用授权） | 2026-11 | ⚠️ 商用前核对条款 |

**⑤ AI 音频 / 视频**
| 仓库 | ★ | 许可 | 最后提交 | 判决 |
| :--- | :--- | :--- | :--- | :--- |
| [openai/whisper](https://github.com/openai/whisper) | 112.0k | MIT | 2026-08 | ✅ 转写管线可直接用 |
| [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | 70.9k | 自定义（按实体规模） | 2026-11 | ⚠️ 公司规模超阈值需付费 |

**⑥ 实时语音 / Agent 编排**
| 仓库 | ★ | 许可 | 最后提交 | 判决 |
| :--- | :--- | :--- | :--- | :--- |
| [livekit/livekit](https://github.com/livekit/livekit) | 22.1k | Apache-2.0 | 2026-11 | ✅ WebRTC 基座 |
| [livekit/agents](https://github.com/livekit/agents) | 15.1k | Apache-2.0 | 2026-11 | ✅ 核心+插件范式 |
| [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat) | 17.1k | BSD-2-Clause | 2026-11 | ✅ 语音管线，商用友好 |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | 60.5k | MIT | 2026-11 | ✅ 角色分工骨架 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | 209.6k | fair-code 自定义 | 2026-11 | ⚠️ 对外售卖服务需授权 |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | 55.6k | 自定义 | 2026-08 | ❌ 已归档 |

**⑦ 企业 RAG / 知识库**
| 仓库 | ★ | 许可 | 最后提交 | 判决 |
| :--- | :--- | :--- | :--- | :--- |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93.6k | Apache-2.0 | 2026-11 | ✅ 私有化底座 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149.1k | MIT | 2026-11 | ✅ 只作积木 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | 35.4k | Apache-2.0 | 2026-11 | ✅ 向量库 |

**⑧ 平台侧基建（计费 / 观测 / 部署 / BaaS）**
| 仓库 | ★ | 许可 | 最后提交 | 判决 |
| :--- | :--- | :--- | :--- | :--- |
| [polarsource/polar](https://github.com/polarsource/polar) | 10.5k | Apache-2.0 | 2026-11 | ✅ 计费中台 |
| [PostHog/posthog](https://github.com/PostHog/posthog) | 40.7k | MIT 核心 + EE | 2026-11 | ⚠️ EE 目录另许 |
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | 37.1k | MIT 核心 + EE | 2026-11 | ⚠️ EE 目录另许 |
| [vibrantlabsai/ragas](https://github.com/vibrantlabsai/ragas) | 16.2k | Apache-2.0 | 2026-02 | ✅ 评测基线 |
| [triggerdotdev/trigger.dev](https://github.com/triggerdotdev/trigger.dev) | 16.7k | Apache-2.0 | 2026-11 | ✅ 长任务异步 |
| [inngest/inngest](https://github.com/inngest/inngest) | 6.0k | SSPL（非 OSI） | 2026-11 | ❌ 自托管有约束 |
| [coollabsio/coolify](https://github.com/coollabsio/coolify) | 65.7k | Apache-2.0 | 2026-11 | ✅ 自托管交付 |
| [Dokploy/dokploy](https://github.com/Dokploy/dokploy) | 38.2k | 含 proprietary 目录 | 2026-11 | ⚠️ 商用需核对 |
| [supabase/supabase](https://github.com/supabase/supabase) | 114.6k | Apache-2.0 | 2026-11 | ✅ RLS 多租户 |
| [appwrite/appwrite](https://github.com/appwrite/appwrite) | 57.9k | BSD-3-Clause | 2026-11 | ✅ 自托管 + 商用 |
| [toeverything/AFFiNE](https://github.com/toeverything/AFFiNE) | 74.2k | 部分目录另许 | 2026-11 | ⚠️ CRDT 读本 |

</details>

> 每个仓库的**真实顶层目录结构**与"该抄哪层 / 别抄哪层"的判断，见案例库第 6 节《目录结构速读》。

---

## 📁 目录结构说明

```text
.
├── LICENSE                  # ⚖️ 开源协议：MIT License
├── SKILL.md                 # 🧠 主控大脑：定义 Agent 的行为准则、交互模式与 7 大阶段卡点
├── docs/                    # 📚 深度演进纪实、实战工程手册与架构报告
│   ├── ai_development_evolution_and_rationale.md # 思想演进全纪实与实施总则（白皮书）
│   ├── ai_engineering_playbook.md                # 商业闭环与多智能体实战手册
│   ├── tech_stack_architecture_report.md         # 六大多模态赛道黄金技术栈深度报告
│   └── images/                                   # 2x Retina 高清项目架构与流程图
│       ├── 01_four_step_evolution.png            # 思想演进四大核心台阶
│       ├── 02_vanity_vs_commercial_loop.png      # 技术自嗨陷阱 vs 商业闭环对比
│       ├── 03_multi_agent_orchestration.png      # 三大专家军团 12 核心角色矩阵
│       ├── 04_stage_gates_funnel.png             # 7 大阶段卡点漏斗机制
│       └── 05_multimodal_golden_stacks.png       # 六大多模态黄金技术栈矩阵
├── assets/                  # 📄 资产库：标准化的阶段输出模板
│   ├── stage-0-template.md  # 需求验真报告模板
│   ├── stage-1-template.md  # 商业测算报告模板
│   └── prd-template.md      # 标准 PRD 与低保真原型模板
├── references/              # 📖 知识库：供 AI 随时查阅的专业字典
│   ├── agent-skill-routing.md    # 12 角色多智能体协同路由表
│   ├── design-styles.md          # UI 视觉风格与前端代码映射字典
│   ├── economics-formulas.md     # 商业变现与单位经济学公式
│   ├── feature-modules.md        # 常见 SaaS/AI 工具功能积木库
│   ├── github-open-source-cases.md # 38 个已验证开源案例 + 许可证红线 + 二开边界
│   ├── project-type-strategies.md# 不同类型项目的差异化分析策略
│   └── tech-stack-matrix.md      # 黄金技术栈与平滑演进架构指南
└── scripts/                 # ⚙️ 自动化构建脚本
    └── generate_article_diagrams.py # Playwright 高清架构配图自动化渲染脚本
```

---

## 📖 核心文档索引

| 文档名称 | 路径 | 说明 |
| :--- | :--- | :--- |
| **思想演进全纪实与实施总则** | [docs/ai_development_evolution_and_rationale.md](docs/ai_development_evolution_and_rationale.md) | 深度剖析 AI 研发痛点根源、多智能体破局、商业需求终局与资产沉淀全景 |
| **商业闭环与研发实战手册** | [docs/ai_engineering_playbook.md](docs/ai_engineering_playbook.md) | 涵盖 JTBD 验真自检、防破产算力架构、六大黄金栈与 Master Prompt |
| **多模态架构与技术选型报告** | [docs/tech_stack_architecture_report.md](docs/tech_stack_architecture_report.md) | 六大多模态赛道（写作/出图/写歌/播客/视频/伴侣）工业级选型矩阵 |
| **开源案例库与二开边界清单** | [references/github-open-source-cases.md](references/github-open-source-cases.md) | 38 个仓库的 Star/许可证/活跃度核验，按项目类型、受众场景、产品形态三表选型，附三票否决清单与评估矩阵模板 |

---

## 🚀 跨平台使用指南 (How to Use)

本大管家架构不仅原生支持 Trae / Antigravity，其标准化的 Markdown 资产结构也使其能轻松适配其他 AI 编程 IDE 和通用大模型平台。

### 🟢 方案一：在 Trae / Antigravity 中使用 (原生支持)

1. 在你的项目工作区根目录下，确保存在 `.trae/skills/`（或 `.agents/skills/`）文件夹。
2. 将本仓库直接克隆到该目录，并命名为 `project-development-planner`：
   ```bash
   mkdir -p .trae/skills
   cd .trae/skills
   git clone https://github.com/cunzailv/shangyeruanjiankaifa.git project-development-planner
   ```
3. 重启或刷新 IDE，在对话框中输入 `/project-development-planner 我想做一个XXX` 即可唤醒大管家。

### 🔵 方案二：在 Cursor / Windsurf 中使用

这两款 IDE 支持项目级别的指令规则配置：

1. 将本仓库克隆到你的项目根目录下的某个文件夹（例如 `docs/planner/`）。
2. 在项目的 `.cursorrules` 或 `.windsurfrules` 文件中添加以下指令：
   > `当你需要进行项目规划时，请严格遵循 docs/planner/SKILL.md 中的 7 大阶段规范与卡点。在规划过程中，请随时读取 docs/planner/assets、docs/planner/docs 和 docs/planner/references 目录下的模板与知识库。`
3. 在对话框中 `@docs/planner/SKILL.md`，并输入你的产品构想即可开始。

### 🟣 方案三：在 Claude Projects 中使用

Claude 的 Projects 功能自带强大的 Knowledge (知识库) 和 Custom Instructions (自定义指令)，非常适合部署本管家：

1. 在 Claude Web 端创建一个新的 Project。
2. 将本仓库内的所有 `.md` 文件（特别是 `SKILL.md`、`docs/` 和 `references/` 文件夹里的所有内容）上传到该 Project 的 Knowledge 中。
3. 在 Project 的 Custom Instructions 中填入：
   > `你现在的身份是 Project Development Planner。请严格按照 Knowledge 中的 SKILL.md 规范与我对话，并严格执行 7 大阶段卡点。在给我提供选项时，请务必参考 Knowledge 中的各种字典和模板。`

### ⚪ 方案四：在通用大模型 (ChatGPT / Claude Web 等) 中使用

如果你没有使用任何专门的 IDE，也可以直接通过长文本 Prompt 来驱动：

1. 将 `SKILL.md` 的内容完整复制。
2. 粘贴给 AI，并在末尾附上：
   > `请扮演上述的“商业软件开发大管家”角色。现在我们开始阶段 0，我想做一个【这里填入你的构想】。由于你无法直接读取本地文件，在后续阶段中，如果需要参考特定的资产模板或知识库字典，请告诉我，我会将文件内容粘贴给你。`

---

## 📄 开源许可证 (License)

本项目采用 [MIT License](LICENSE) 开源协议。无论是商业应用、团队自用、开源二次开发还是打包集成，均可免费自由使用与修改，只需保留原作者版权声明即可。
