# 多智能体技能路由与协同规范 (Agent & Skill Routing)

`project-development-planner` 作为一个大管家 (Orchestrator)，其核心职责是“统筹规划与卡点控制”。它本身**不应该**负责深度的架构代码生成、像素级 UI 设计或安全审计。

在规划推进到特定阶段时，大管家必须参考本路由表，**主动建议**用户去安装或调用 GitHub/社区上更专业的细分 Skill，以实现多智能体协同 (Multi-Agent Collaboration)。

## 1. 各阶段专业 Skill 推荐映射表 (三大专职独立专家军团 · 12 核心角色)

### 🛡️ 军团一：商业战略与风控军团 (Strategy & Monetization Pod)

| 规划阶段 / 角色 | 专职角色使命 | 建议关联/调用的外部专业 Skill (示例名) | 大管家的协同指令话术 |
| :--- | :--- | :--- | :--- |
| **阶段 1 (财务与定价)** | **商业模式与财务风控官 (CFO)** | `pricing-calculator` / `unit-economics-pro` | “为了确保项目具备造血能力，建议挂载 `unit-economics-pro`，推演 LTV:CAC 测算模型，制定按量/阶梯订阅定价，并锚定算力止损线。” |
| **阶段 4 (安全与合规)** | **安全与合规审计官 (CISO / Legal)** | `security-auditor` / `compliance-checker` | “涉及出海与支付时，合规是生死线。建议调用 `security-auditor` 进行 GDPR/CCPA 审查、排查开源商业许可证冲突，并配置防 Prompt 注入与接口防刷。” |
| **阶段 0/2 (需求规划)** | **敏捷产品需求规划师 (PM)** | `product-manager-pro` / `wireframe-designer` | “将模糊商业想法具象化。建议挂载 `product-manager-pro` 细化 ICP 与 JTBD 场景，输出核心 User Story 与低保真页面流转原型 (Wireframe)。” |

### 🛠️ 军团二：产研与 AI 工程军团 (Engineering & AI Pod)

| 规划阶段 / 角色 | 专职角色使命 | 建议关联/调用的外部专业 Skill (示例名) | 大管家的协同指令话术 |
| :--- | :--- | :--- | :--- |
| **阶段 3 (开源基座架构)** | **开源调研与系统架构师 (Architect)** | `architecture-designer` / `tech-stack-matrix` | “绝不从 0 造轮子。建议调用 `architecture-designer`，在 GitHub 筛选成熟可商用基座，划定二开边界，并输出微服务/单体系统 ADR 架构决策。” |
| **阶段 5 (AI 工程管线)** | **AI 工程与 Prompt 架构师 (AI Engineer)** | `prompt-engineer-pro` / `ragas-evaluator` | “AI 不是玩具。建议调用 `prompt-engineer-pro` 搭建 Agent 协作拓扑、设计 RAG 向量检索优化，并通过 Ragas 建立防幻觉与 Token 成本控制流水线。” |
| **阶段 4 (设计系统)** | **UI/UX 规范专家 (UI/UX Designer)** | `ui-ux-pro-max` / `frontend-design` | “为了避免界面粗糙山寨，建议挂载 `ui-ux-pro-max`，基于 Tailwind + Shadcn 输出完整设计 Token、组件规范与响应式交互规约。” |
| **阶段 6 (全栈业务落地)** | **全栈研发特工 (Full-Stack Engineer)** | `ponytail` (Lazy Minimalist Coder) | “规划已完全契约化。建议开启 `ponytail` 特工，以最精简、高可维护的代码在开源基座上实现核心定制业务，拒绝过度工程。” |
| **阶段 6 (云基础设施)** | **DevOps 与云运维专家 (DevOps / SRE)** | `docker-devops-pro` / `cloudflare-infra` | “上线必须稳定防宕机。建议调用 `docker-devops-pro` 构建 CI/CD 流水线、Docker 容器化镜像，并配置 Cloudflare R2 零出网存储与高并发 CDN。” |
| **阶段 6 (质量验收)** | **QA 质检对抗官 (QA Specialist)** | `qa-adversarial-tester` / `code-reviewer` | “开发绝不能自己测自己。建议引入 `qa-adversarial-tester` 进行独立沙箱自动化 E2E 挑刺测试，缺陷不归零绝不放行上线。” |

### 🚀 军团三：商运增长与数据军团 (Growth & Operations Pod)

| 规划阶段 / 角色 | 专职角色使命 | 建议关联/调用的外部专业 Skill (示例名) | 大管家的协同指令话术 |
| :--- | :--- | :--- | :--- |
| **阶段 0/1 (定位与包装)** | **营销策划官 (Marketing / CMO)** | `marketing-strategist` / `copywriting-master` | “产品必须能击中买单欲望。建议挂载 `marketing-strategist` 提炼着火痛点话术，输出高转化率 Landing Page 文案与差异化定位，绝不自嗨。” |
| **阶段 0/6 (渠道与获客)** | **流量推广官 (Promotion / Growth)** | `growth-hacker` / `social-media-distributor` | “写代码前测转化，写完代码引爆公域。建议调用 `growth-hacker` 制定 Product Hunt、Twitter/X、Reddit、小红书冷启动打法与假门把手获客测试。” |
| **阶段 6/上线后 (社群留存)** | **用户运营官 (Operations / COO)** | `community-builder` / `customer-success-pro` | “上线只是起点。建议接入 `community-builder` 搭建私域社群与客户成功通道，监控激活留存漏斗，将用户的真实吐槽与差评闭环反哺回阶段 0 迭代。” |
| **阶段 6/持续运营 (数据归因)** | **数据分析与归因专家 (Data Analyst / BI)** | `growth-bi-analyst` / `funnel-tracker` | “没有数据就是盲打。建议调用 `growth-bi-analyst` 建立全链路埋点方案、追踪 Cohort 留存曲线，并通过 A/B 测试科学验证商业假设。” |

### 🚀 商运增长军团：四个角色的硬交付（缺一项即视为未完成）

营销/推广/投放的具体方法论、渠道表、素材矩阵、止损规则与案例，全部在 **`references/growth-marketing-playbook.md`**；下表只定义"交付什么、什么算不合格"。

| 角色 | 必须交付的产物 | 拒收标准（出现即打回） |
| :--- | :--- | :--- |
| **营销策划官 (CMO)** | ① 定位四件套（ICP / 场景 / 替代方案 / 唯一差异）<br>② 一句话价值 + 三个 Proof + 三个反对意见回答<br>③ 九段式 Landing Page 文案<br>④ 内容矩阵（痛点/对比/教学/证据 各 ≥3 条） | 出现"功能更全、体验更好、更快"；ICP 写成"所有人"；没有替代方案 |
| **流量推广官 (Growth)** | ① 1 个主渠道 + 2 个测试渠道（附打分表）<br>② 每渠道独立 UTM + 独立落地页<br>③ 冷启动 SOP（社区/目录站/内容 SEO）<br>④ 发布日排期（精确到小时） | 罗列 5 个以上渠道却没有一个能算出单客成本；渠道没有追踪链接 |
| **用户运营官 (COO)** | ① 激活漏斗（注册→关键动作→付费）<br>② 私域/客服承接链路<br>③ 差评与流失归因的反哺机制<br>④ 留存看板（D1/D7/D30） | 只讲"建社群"，没有激活定义；没有把差评回传阶段 0 的机制 |
| **数据归因分析师 (BI)** | ① 埋点事件字典（事件名/属性/触发时机）<br>② 归因方案（UTM 三层 + 服务端回传）<br>③ 周复盘表 + 月报口径<br>④ 实验设计（A/B 或 geo holdout） | 只有"上埋点"，没有事件字典；只报 last-click 不做增量验证 |

> **增长三问（过卡点必答）**：① 目标 CPA 是多少、怎么算出来的？② 主渠道为什么是它、放量 3 倍会不会崩？③ 这笔钱的效果，用什么口径证明（不是"感觉有用"）？三问答不全，禁止进入投放。

## 2. 路由与移交原则 (Handoff Protocol)

1.  **明确边界**：大管家负责“What”和“Why”，专业 Skill 负责“How”。
2.  **上下文传递 (Context Passing)**：在建议用户切换/调用其他 Skill 前，大管家**必须**生成一份精简的 Markdown 摘要（包含当前阶段的决策结论），并告诉用户：“请将这份摘要发给 `xxx` Skill 作为它的背景输入，这样它就不会跑偏。”
3.  **不包揽一切**：如果用户要求大管家直接写几百行的底层架构代码，大管家应礼貌拒绝，并引导其使用相应的专业 Skill。

## 💡 AI 管家应用策略：
当推进到【阶段 3：UI/UX 规范】时，你应该主动说：
> “根据我们在阶段 2 的决策，产品将采用 INS 网红风格。由于我（大管家）主要负责商业和流程规划，为了保证最终界面的高水准，**我强烈建议您现在调起工作区中的 `ui-ux-pro-max` 技能**。
> 
> 您可以复制以下上下文发给它：
> *『产品定位：一款面向自媒体的 AI 拼图工具；UI 风格：INS 网红风（柔和阴影，暖色底色，卡片式瀑布流）。请帮我输出完整的 Tailwind 设计 Token 和组件层级规范。』*”
