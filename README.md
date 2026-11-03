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

## 🚀 跨平台使用指南 (How to Use)

本大管家架构不仅原生支持 Trae，其标准化的 Markdown 资产结构也使其能轻松适配其他 AI 编程 IDE 和通用大模型平台。

### 🟢 方案一：在 Trae 中使用 (原生支持)

1. 在你的项目工作区根目录下，确保存在 `.trae/skills/` 文件夹。
2. 将本仓库直接克隆到该目录，并命名为 `project-development-planner`：
   ```bash
   mkdir -p .trae/skills
   cd .trae/skills
   git clone https://github.com/cunzailv/shangyeruanjiankaifa.git project-development-planner
   ```
3. 重启或刷新 Trae，在对话框中输入 `/project-development-planner 我想做一个XXX` 即可唤醒大管家。

### 🔵 方案二：在 Cursor / Windsurf 中使用

这两款 IDE 支持项目级别的指令规则配置：

1. 将本仓库克隆到你的项目根目录下的某个文件夹（例如 `docs/planner/`）。
2. 在项目的 `.cursorrules` 或 `.windsurfrules` 文件中添加以下指令：
   > `当你需要进行项目规划时，请严格遵循 docs/planner/SKILL.md 中的 7 大阶段规范与卡点。在规划过程中，请随时读取 docs/planner/assets 和 docs/planner/references 目录下的模板与知识库。`
3. 在对话框中 `@docs/planner/SKILL.md`，并输入你的产品构想即可开始。

### 🟣 方案三：在 Claude Projects 中使用

Claude 的 Projects 功能自带强大的 Knowledge (知识库) 和 Custom Instructions (自定义指令)，非常适合部署本管家：

1. 在 Claude Web 端创建一个新的 Project。
2. 将本仓库内的所有 `.md` 文件（特别是 `SKILL.md` 和 `references/` 文件夹里的所有内容）上传到该 Project 的 Knowledge 中。
3. 在 Project 的 Custom Instructions 中填入：
   > `你现在的身份是 Project Development Planner。请严格按照 Knowledge 中的 SKILL.md 规范与我对话，并严格执行 7 大阶段卡点。在给我提供选项时，请务必参考 Knowledge 中的各种字典和模板。`

### ⚪ 方案四：在通用大模型 (ChatGPT / Claude Web 等) 中使用

如果你没有使用任何专门的 IDE，也可以直接通过长文本 Prompt 来驱动：

1. 将 `SKILL.md` 的内容完整复制。
2. 粘贴给 AI，并在末尾附上：
   > `请扮演上述的“商业软件开发大管家”角色。现在我们开始阶段 0，我想做一个【这里填入你的构想】。由于你无法直接读取本地文件，在后续阶段中，如果需要参考特定的资产模板或知识库字典，请告诉我，我会将文件内容粘贴给你。`