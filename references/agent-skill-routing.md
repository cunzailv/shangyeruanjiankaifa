# 多智能体技能路由与协同规范 (Agent & Skill Routing)

`project-development-planner` 作为一个大管家 (Orchestrator)，其核心职责是“统筹规划与卡点控制”。它本身**不应该**负责深度的架构代码生成、像素级 UI 设计或安全审计。

在规划推进到特定阶段时，大管家必须参考本路由表，**主动建议**用户去安装或调用 GitHub/社区上更专业的细分 Skill，以实现多智能体协同 (Multi-Agent Collaboration)。

## 1. 各阶段专业 Skill 推荐映射表 (双轮驱动：产研技术 + 商运增长)

### 🛠️ 产研交付军团 (Engineering Pod)

| 规划阶段 | 需要深度的专业领域 | 建议关联/调用的外部专业 Skill (示例名) | 大管家的协同指令话术 |
| :--- | :--- | :--- | :--- |
| **阶段 2 (PRD与原型)** | 需求梳理、交互逻辑、低保真原型图绘制 | `product-manager-pro` / `wireframe-designer` | “商业模式已定。为了产出更严谨的原型图和需求文档，我建议您现在挂载 `product-manager-pro` Skill，让它帮您把功能点细化为可视化的页面流转图。” |
| **阶段 3 (架构选型)** | 系统设计、微服务拆解、数据库选型、算力成本核算 | `architecture-designer` / `tech-stack-decision-matrix` | “关于具体的系统架构设计与成本防破产防线，建议您调用 `architecture-designer` 或 `tech-stack-decision-matrix`，绘制详细的系统拓扑和 ADR 架构决策。” |
| **阶段 4 (契约与设计)** | UI/UX 设计、组件规范、Tailwind 落地 | `ui-ux-pro-max` / `frontend-design` | “我已经帮您确定了产品功能。接下来，建议您使用 `ui-ux-pro-max` Skill，让这位设计专家来帮您输出具体的 Tailwind 组件规范和交互流程。” |
| **阶段 4 (安全合规)** | 安全审计、防注入、权限漏洞扫描、GDPR | `security-auditor` / `clawdefender` | “在确定了数据模型后，为了防止未来的 AI 越权或 Prompt 注入，建议您通过 `security-auditor` 进行一次前置安全审查。” |
| **阶段 6 (极简编码)** | 极简代码生成、避免过度设计 | `ponytail` (Lazy/Minimalist Coder) | “规划已完成。在正式编码时，如果您希望代码极其精简、不造轮子，强烈建议您在开发全程开启 `ponytail` Skill。” |
| **阶段 6 (代码审查)** | Code Review, 对抗性测试质量保证 | `TRAE-code-review` / `ponytail-review` | “在拆解的工单开发完成后，请务必让质检对抗角色介入进行合并前的质量把控与测试验收。” |

### 🚀 商运增长军团 (Commercial & Growth Pod)

| 业务环节 | 专职角色 | 建议关联/调用的外部专业 Skill (示例名) | 大管家的协同指令话术 |
| :--- | :--- | :--- | :--- |
| **阶段 0/1 (定位与包装)** | **营销策划官 (Marketing / CMO)** | `marketing-strategist` / `copywriting-master` / `landing-page-optimizer` | “产品必须能击中买单欲望。建议挂载 `marketing-strategist` 提炼着火痛点话术，输出高转化率 Landing Page 文案与差异化定位，绝不自嗨。” |
| **阶段 0/6 (渠道与分发)** | **流量推广官 (Promotion / Growth)** | `growth-hacker` / `social-media-distributor` / `seo-geo-ranker` | “写代码前测转化，写完代码引爆公域。建议调用 `growth-hacker` 制定 Product Hunt、Twitter/X、Reddit、小红书冷启动打法与假门把手获客测试。” |
| **阶段 6/上线后 (留存与反馈)** | **用户运营官 (Operations / COO)** | `community-builder` / `retention-optimizer` / `customer-success-pro` | “上线只是起点。建议接入 `community-builder` 搭建私域与客户成功通道，监控激活留存漏斗，将用户的真实吐槽与差评闭环反哺回阶段 0 迭代。” |

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
