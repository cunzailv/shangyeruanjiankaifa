# 💼 商业软件开发大管家 (Project Development Planner)

这是一个专为 AI 编程 IDE (如 Trae) 打造的高阶“大管家”智能体 Skill。它不负责底层的搬砖写代码，而是化身为你的 **CEO、产品经理与架构师**，通过严谨的 **7 阶段商业落地流水线**，帮你把一个模糊的“点子”一步步拆解为可落地的敏捷开发工单。

## ✨ 核心特性

- **🔘 选择题驱动 (Choice-Driven)**：拒绝让用户做填空题。内置《设计风格字典》与《功能积木库》，直接提供 Plan A / Plan B 供你抉择。
- **🤖 多智能体协同 (Multi-Agent Routing)**：作为 Orchestrator（统筹者），在设计、架构、安全审计等细分阶段，智能路由并生成“移交上下文”，引导你调用最专业的外部 Skill（如 `ui-ux-pro-max`、`architecture-designer`）。
- **🧭 动态项目策略**：自动识别**全新项目 (Greenfield)**、**二次开发/重构 (Brownfield)** 和 **传统项目 AI 化 (AI Transformation)**，提供如“绞杀者模式”、“Sidecar”等差异化架构方案。
- **💰 商业防破产机制**：在架构前强制引入“单位经济学 (LTV/CAC)”测算，建立防刷量、防破产的限流与缓存护城河。

## 🗺️ 7 大标准落地阶段

1. **阶段 0**：用户需求先行与价值主张验真（PMF / 痛点定级 / Smoke Test）
2. **阶段 1**：商业模式、变现路径与单位经济学测算（ROI / 护城河）
3. **阶段 2**：敏捷产品需求文档 (PRD) 与页面交互逻辑（User Story / Wireframe）
4. **阶段 3**：开源脚手架选型与二次开发规划（黄金技术栈匹配）
5. **阶段 4**：系统契约、数据模型、合规与设计规范（ER图 / API / GDPR合规）
6. **阶段 5**：AI 智能体管线与 Prompt 架构设计（Agent拓扑 / Ragas评测）
7. **阶段 6**：多智能体落地拆解与敏捷验证工单（EPIC -> Task / DevOps策略）

## 📁 目录结构说明

```text
.
├── SKILL.md                 # 🧠 主控大脑：定义 Agent 的行为准则、交互模式与 7 大阶段卡点
├── assets/                  # 📄 资产库：标准化的阶段输出模板
│   ├── stage-0-template.md  # 需求验真报告模板
│   ├── stage-1-template.md  # 商业测算报告模板
│   └── prd-template.md      # 标准 PRD 与低保真原型模板
└── references/              # 📚 知识库：供 AI 随时查阅的专业字典
    ├── agent-skill-routing.md    # 多智能体协同路由表
    ├── design-styles.md          # UI 视觉风格与前端代码映射字典
    ├── economics-formulas.md     # 商业变现与单位经济学公式
    ├── feature-modules.md        # 常见 SaaS/AI 工具功能积木库
    ├── project-type-strategies.md# 不同类型项目的差异化分析策略
    └── tech-stack-matrix.md      # 黄金技术栈与平滑演进架构指南
```

## 🚀 如何在 Trae 中使用

1. 将本仓库克隆或下载到本地。
2. 将其中的文件放置于你的工作区目录 `.trae/skills/project-development-planner/` 文件夹下。
3. 在 Trae 的对话框中输入 `/project-development-planner 我想做一个XXX` 即可唤醒大管家！