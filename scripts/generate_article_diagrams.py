import asyncio
from playwright.async_api import async_playwright
from pathlib import Path

OUTPUT_DIR = Path("/Users/pc/Desktop/shangyeruanjiankaifa/docs/images")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

COMMON_STYLE = """
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    background: #0f172a;
    color: #f8fafc;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }
  .card-container {
    background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 20px;
    padding: 36px 40px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 1040px;
  }
  .header-badge {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 14px;
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.3);
  }
  .main-title {
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
    background: linear-gradient(to right, #ffffff, #cbd5e1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .subtitle {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 28px;
    line-height: 1.5;
  }
</style>
"""

DIAGRAMS = {
    "01_four_step_evolution.png": f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
{COMMON_STYLE}
<style>
  .steps-wrapper {{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    position: relative;
  }}
  .step-box {{
    background: rgba(30, 41, 59, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 14px;
    padding: 20px 14px;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}
  .step-box.highlight {{
    background: linear-gradient(180deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%);
    border-color: rgba(96, 165, 250, 0.5);
  }}
  .step-num {{
    width: 30px;
    height: 30px;
    background: #3b82f6;
    color: white;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    font-size: 14px;
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
  }}
  .step-box.highlight .step-num {{
    background: #10b981;
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
  }}
  .step-title {{
    font-size: 15px;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 8px;
  }}
  .step-desc {{
    font-size: 12px;
    color: #94a3b8;
    line-height: 1.5;
  }}
  .arrow {{
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    font-size: 14px;
    z-index: 10;
  }}
</style>
</head>
<body>
  <div class="card-container">
    <div class="header-badge">思想演进全景</div>
    <div class="main-title">AI 辅助研发与项目规划演进四大核心台阶</div>
    <div class="subtitle">从病灶机理到分层团队，最终推导至以商业闭环与用户验真为终局</div>
    <div class="steps-wrapper">
      <div class="step-box">
        <div>
          <div class="step-num">1</div>
          <div class="step-title">痛点起因</div>
          <div class="step-desc">为何 AI 总从 0 手搓？为何总出粗制滥造、无法迭代的单文件玩具 MVP？</div>
        </div>
      </div>
      <div class="step-box">
        <div>
          <div class="step-num">2</div>
          <div class="step-title">机理剖析</div>
          <div class="step-desc">RLHF 最小阻力偏好、读懂大项目的高昂 Context 代价，以及单 Agent 认知分裂。</div>
        </div>
      </div>
      <div class="step-box">
        <div>
          <div class="step-num">3</div>
          <div class="step-title">多智能体破局</div>
          <div class="step-desc">1 个大管家调度 + 专职独立沙箱专家团（架构/设计/研发/QA 对抗挑刺）。</div>
        </div>
      </div>
      <div class="step-box highlight">
        <div>
          <div class="step-num">4</div>
          <div class="step-title">商业终局升华</div>
          <div class="step-desc">代码未动验真先行！JTBD 场景、Smoke Test 假门把手、单位经济学与算力防破产。</div>
        </div>
      </div>
      <div class="step-box highlight">
        <div>
          <div class="step-num">5</div>
          <div class="step-title">资产沉淀交付</div>
          <div class="step-desc">Playbook 实战工程手册 + 7 阶段卡点大管家 Skill，标准化武装 IDE。</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
""",

    "02_vanity_vs_commercial_loop.png": f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
{COMMON_STYLE}
<style>
  .comparison-wrapper {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }}
  .comp-card {{
    border-radius: 16px;
    padding: 24px;
    border: 1px solid;
  }}
  .comp-card.bad {{
    background: rgba(239, 68, 68, 0.05);
    border-color: rgba(239, 68, 68, 0.25);
  }}
  .comp-card.good {{
    background: rgba(16, 185, 129, 0.05);
    border-color: rgba(16, 185, 129, 0.3);
  }}
  .comp-header {{
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }}
  .comp-card.bad .comp-header {{ color: #f87171; }}
  .comp-card.good .comp-header {{ color: #34d399; }}
  .item-list {{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }}
  .item-row {{
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    line-height: 1.5;
    color: #cbd5e1;
  }}
  .item-icon {{
    font-weight: 800;
    font-size: 14px;
    margin-top: 1px;
  }}
  .comp-card.bad .item-icon {{ color: #ef4444; }}
  .comp-card.good .item-icon {{ color: #10b981; }}
  .item-title {{ font-weight: 700; color: #f8fafc; margin-bottom: 2px; }}
</style>
</head>
<body>
  <div class="card-container">
    <div class="header-badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3);">根本逻辑对比</div>
    <div class="main-title">技术自嗨陷阱 vs 工业级商业闭环</div>
    <div class="subtitle">写代码是最廉价的环节，未经商业验真的开发是最昂贵的浪费</div>
    <div class="comparison-wrapper">
      <div class="comp-card bad">
        <div class="comp-header">❌ 传统独立开发与普通 AI 自嗨陷阱</div>
        <div class="item-list">
          <div class="item-row">
            <span class="item-icon">1.</span>
            <div><div class="item-title">灵光一闪即动手</div>未验证是否为“着火刚需”，直接命令 AI 生成单文件代码。</div>
          </div>
          <div class="item-row">
            <span class="item-icon">2.</span>
            <div><div class="item-title">无脑从 0 造轮子</div>轻视成熟开源底座，手写几百行脆弱的原生玩具代码。</div>
          </div>
          <div class="item-row">
            <span class="item-icon">3.</span>
            <div><div class="item-title">缺乏成本护城河</div>忽视 S3 每 TB $90 出网费与模型高频调用，上线即亏损。</div>
          </div>
          <div class="item-row">
            <span class="item-icon">4.</span>
            <div><div class="item-title">自我放水式交付</div>同一个 AI 既写代码又审代码，缺陷漏洞不断，最终沦为废品。</div>
          </div>
        </div>
      </div>
      <div class="comp-card good">
        <div class="comp-header">✅ 商业软件开发大管家工业级闭环</div>
        <div class="item-list">
          <div class="item-row">
            <span class="item-icon">1.</span>
            <div><div class="item-title">JTBD 痛点先行</div>严判定级（头发着火才动手），Smoke Test 假门把手测买单率。</div>
          </div>
          <div class="item-row">
            <span class="item-icon">2.</span>
            <div><div class="item-title">单位经济学防破产</div>严格核算 LTV:CAC > 3，强制 Cloudflare R2 零出网与 BullMQ 队列。</div>
          </div>
          <div class="item-row">
            <span class="item-icon">3.</span>
            <div><div class="item-title">黄金栈与开源二次开发</div>优先选用 6 大垂直赛道黄金架构，基于顶级预制件拼装。</div>
          </div>
          <div class="item-row">
            <span class="item-icon">4.</span>
            <div><div class="item-title">大管家 + QA 对抗交付</div>独立沙箱分工，QA 专职挑刺拦截，强制 7 大阶段卡点验收。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
""",

    "03_multi_agent_orchestration.png": f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
{COMMON_STYLE}
<style>
  .topo-wrapper {{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }}
  .user-node {{
    background: linear-gradient(135deg, #475569 0%, #334155 100%);
    border: 1px solid #64748b;
    border-radius: 9999px;
    padding: 6px 20px;
    font-size: 13px;
    font-weight: 700;
    color: #f8fafc;
    display: flex;
    align-items: center;
    gap: 8px;
  }}
  .orchestrator-node {{
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    border: 2px solid #60a5fa;
    border-radius: 14px;
    padding: 12px 28px;
    text-align: center;
    box-shadow: 0 0 25px rgba(37, 99, 235, 0.35);
    width: 65%;
  }}
  .dual-engine-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 100%;
  }}
  .engine-column {{
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 14px;
    padding: 14px;
  }}
  .engine-header {{
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }}
  .engine-header.tech {{ color: #38bdf8; }}
  .engine-header.biz {{ color: #fbbf24; }}
  .cards-list {{
    display: flex;
    flex-direction: column;
    gap: 8px;
  }}
  .agent-card {{
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 10px;
    padding: 8px 12px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }}
  .agent-icon {{
    font-size: 16px;
    margin-top: 1px;
  }}
  .agent-name {{
    font-size: 12px;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 2px;
  }}
  .agent-task {{
    font-size: 11px;
    color: #94a3b8;
    line-height: 1.35;
  }}
</style>
</head>
<body>
  <div class="card-container">
    <div class="header-badge">双轮驱动多智能体体系</div>
    <div class="main-title">1 个大管家 + 产研技术军团 & 商运增长军团</div>
    <div class="subtitle">技术交付 + 营销获客闭环，打破程序员只顾写代码、上线即无人问津的死局</div>
    <div class="topo-wrapper">
      <div class="user-node">👤 用户（创始人 / 独立开发者 / 审阅者）</div>
      <div style="color: #60a5fa; font-size: 13px;">↕ 商业决策与卡点验收</div>
      <div class="orchestrator-node">
        <div style="font-size: 16px; font-weight: 800; color: #fff;">🤖 商业软件开发大管家 (Orchestrator)</div>
        <div style="font-size: 11px; color: #bfdbfe; margin-top: 2px;">需求卡点控制 ｜ 商业模型推演 ｜ 上下文隔离派发 ｜ 全流程商业闭环</div>
      </div>
      <div style="color: #94a3b8; font-size: 12px;">↓ 双军团协同流转与对抗验收 ↓</div>
      <div class="dual-engine-grid">
        <!-- 产研交付军团 -->
        <div class="engine-column">
          <div class="engine-header tech">
            <span>🛠️ 产研交付军团 (Engineering)</span>
            <span style="font-size: 11px; color: #64748b;">打造工业级稳定基座</span>
          </div>
          <div class="cards-list">
            <div class="agent-card">
              <span class="agent-icon">🔬</span>
              <div>
                <div class="agent-name">开源调研与架构师</div>
                <div class="agent-task">检索成熟开源底座，核算算力与出网成本，严禁手搓通用轮子。</div>
              </div>
            </div>
            <div class="agent-card">
              <span class="agent-icon">🎨</span>
              <div>
                <div class="agent-name">UI/UX 规范专家</div>
                <div class="agent-task">设计系统选型，Tailwind + Shadcn 模块化交互与响应式规约。</div>
              </div>
            </div>
            <div class="agent-card">
              <span class="agent-icon">💻</span>
              <div>
                <div class="agent-name">全栈开发特工</div>
                <div class="agent-task">契约先行（Schema/API），在开源基座上实现核心差异化业务。</div>
              </div>
            </div>
            <div class="agent-card" style="border-color: rgba(248, 113, 113, 0.4); background: rgba(239, 68, 68, 0.08);">
              <span class="agent-icon">🕵️</span>
              <div>
                <div class="agent-name" style="color: #f87171;">QA 质检对抗官</div>
                <div class="agent-task">专职挑刺找漏洞，端到端自动化测试拦截，未达标绝不放行。</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 商运增长军团 -->
        <div class="engine-column">
          <div class="engine-header biz">
            <span>🚀 商运增长军团 (Commercial Growth)</span>
            <span style="font-size: 11px; color: #64748b;">确保有人买单与持续复购</span>
          </div>
          <div class="cards-list">
            <div class="agent-card" style="border-color: rgba(251, 191, 36, 0.3); background: rgba(245, 158, 11, 0.08);">
              <span class="agent-icon">📢</span>
              <div>
                <div class="agent-name" style="color: #fbbf24;">营销策划官 (Marketing / CMO)</div>
                <div class="agent-task">痛点定级、卖点提炼、高转化落地页文案，把技术参数翻译成购买理由。</div>
              </div>
            </div>
            <div class="agent-card" style="border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.08);">
              <span class="agent-icon">🚀</span>
              <div>
                <div class="agent-name" style="color: #34d399;">流量推广官 (Promotion / Growth)</div>
                <div class="agent-task">冷启动渠道分发（Product Hunt/X/小红书/Reddit）、公域引流与假门把手获客测试。</div>
              </div>
            </div>
            <div class="agent-card" style="border-color: rgba(168, 85, 247, 0.3); background: rgba(168, 85, 247, 0.08);">
              <span class="agent-icon">🎯</span>
              <div>
                <div class="agent-name" style="color: #c084fc;">用户运营官 (Operations / COO)</div>
                <div class="agent-task">激活留存漏斗监控、社群与客户成功、收集真实差评反哺阶段 0 迭代。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
""",

    "04_stage_gates_funnel.png": f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
{COMMON_STYLE}
<style>
  .gate-pipeline {{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }}
  .gate-row {{
    display: grid;
    grid-template-columns: 90px 180px 1fr 140px;
    align-items: center;
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 10px;
    padding: 10px 16px;
    font-size: 13px;
  }}
  .gate-row:nth-child(even) {{
    background: rgba(15, 23, 42, 0.6);
  }}
  .gate-tag {{
    font-weight: 800;
    color: #38bdf8;
  }}
  .gate-name {{
    font-weight: 700;
    color: #f1f5f9;
  }}
  .gate-content {{
    color: #94a3b8;
  }}
  .gate-lock {{
    text-align: right;
    font-size: 12px;
    color: #fbbf24;
    font-weight: 600;
  }}
</style>
</head>
<body>
  <div class="card-container">
    <div class="header-badge" style="background: rgba(236, 72, 153, 0.15); color: #f472b6; border-color: rgba(236, 72, 153, 0.3);">流程防线</div>
    <div class="main-title">7 大标准落地阶段卡点机制 (Stage Gates)</div>
    <div class="subtitle">每个阶段必须输出独立报告并暂停，严禁未经商业确认即盲目写代码</div>
    <div class="gate-pipeline">
      <div class="gate-row">
        <span class="gate-tag">阶段 0</span>
        <span class="gate-name">用户需求与价值验真</span>
        <span class="gate-content">ICP、JTBD、刚需定级、假门把手 (Smoke Test) 方案</span>
        <span class="gate-lock">🔒 强制暂停确认</span>
      </div>
      <div class="gate-row">
        <span class="gate-tag">阶段 1</span>
        <span class="gate-name">商业模式与单位经济学</span>
        <span class="gate-content">LTV:CAC 测算、出海支付通道、防破产存储与队列规划</span>
        <span class="gate-lock">🔒 强制暂停确认</span>
      </div>
      <div class="gate-row">
        <span class="gate-tag">阶段 2</span>
        <span class="gate-name">敏捷 PRD 与交互原型</span>
        <span class="gate-content">核心 User Story、页面流转逻辑与低保真原型 (Wireframe)</span>
        <span class="gate-lock">🔒 强制暂停确认</span>
      </div>
      <div class="gate-row">
        <span class="gate-tag">阶段 3</span>
        <span class="gate-name">开源脚手架选型</span>
        <span class="gate-content">匹配赛道黄金技术栈，评估 GitHub 成熟基座，界定二开边界</span>
        <span class="gate-lock">🔒 强制暂停确认</span>
      </div>
      <div class="gate-row">
        <span class="gate-tag">阶段 4</span>
        <span class="gate-name">契约规范与数据模型</span>
        <span class="gate-content">Prisma Schema、API 契约规范、GDPR 合规与安全防御清单</span>
        <span class="gate-lock">🔒 强制暂停确认</span>
      </div>
      <div class="gate-row">
        <span class="gate-tag">阶段 5</span>
        <span class="gate-name">AI 智能体管线设计</span>
        <span class="gate-content">Agent 协作拓扑、核心 Prompt 模板、Ragas 评测与降级回退</span>
        <span class="gate-lock">🔒 强制暂停确认</span>
      </div>
      <div class="gate-row">
        <span class="gate-tag">阶段 6</span>
        <span class="gate-name">敏捷工单与测试部署</span>
        <span class="gate-content">EPIC -> Task 工单拆解、自动化 E2E 策略、一键容器化交付</span>
        <span class="gate-lock" style="color: #34d399;">🏁 规划完成交付</span>
      </div>
    </div>
  </div>
</body>
</html>
""",

    "05_multimodal_golden_stacks.png": f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
{COMMON_STYLE}
<style>
  .stacks-grid {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }}
  .stack-card {{
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 12px;
    padding: 16px;
  }}
  .stack-title {{
    font-size: 15px;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }}
  .stack-pain {{
    font-size: 11px;
    color: #f87171;
    margin-bottom: 8px;
    font-weight: 600;
  }}
  .stack-tech {{
    font-size: 12px;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.08);
    padding: 6px 8px;
    border-radius: 6px;
    line-height: 1.4;
    border: 1px dashed rgba(56, 189, 248, 0.25);
  }}
</style>
</head>
<body>
  <div class="card-container">
    <div class="header-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border-color: rgba(168, 85, 247, 0.3);">实战武器库</div>
    <div class="main-title">六大多模态 AIGC 垂直赛道“工业级黄金技术栈”</div>
    <div class="subtitle">经历千万级调用的成熟生态组件，绝不手搓任何通用底层</div>
    <div class="stacks-grid">
      <div class="stack-card">
        <div class="stack-title">✍️ AI 写作平台</div>
        <div class="stack-pain">瓶颈：长文本丢失、打字机光标冲突</div>
        <div class="stack-tech">Next.js + Tiptap + Vercel AI SDK + Claude 3.5</div>
      </div>
      <div class="stack-card">
        <div class="stack-title">🎨 AI 出图画布</div>
        <div class="stack-pain">瓶颈：局部重绘 Mask、S3 带宽破产</div>
        <div class="stack-tech">Fabric.js + Fal.ai + BullMQ + Cloudflare R2</div>
      </div>
      <div class="stack-card">
        <div class="stack-title">🎵 AI 音乐生成</div>
        <div class="stack-pain">瓶颈：动态波形拖拽、歌词毫秒对齐</div>
        <div class="stack-tech">WaveSurfer.js + Suno API + Whisper + FFmpeg</div>
      </div>
      <div class="stack-card">
        <div class="stack-title">🎙️ AI 播客对谈</div>
        <div class="stack-pain">瓶颈：双角色博弈、切片无缝无爆音</div>
        <div class="stack-tech">双主播博弈 Prompt + ElevenLabs + FFmpeg 交叉淡入</div>
      </div>
      <div class="stack-card">
        <div class="stack-title">🎬 AI 视频编排</div>
        <div class="stack-pain">瓶颈：分镜脚本串联、长耗时容错</div>
        <div class="stack-tech">Remotion(React做视频) + 可灵 API + Temporal 队列</div>
      </div>
      <div class="stack-card">
        <div class="stack-title">🤖 实时伴侣 Bot</div>
        <div class="stack-pain">瓶颈：全双工极低延迟(&lt;800ms)、长程记忆</div>
        <div class="stack-tech">LiveKit(WebRTC) + Mem0 记忆图谱 + WebSocket</div>
      </div>
    </div>
  </div>
</body>
</html>
"""
}

async def render_all():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for filename, html_content in DIAGRAMS.items():
            page = await browser.new_page(
                viewport={"width": 1040, "height": 600},
                device_scale_factor=2
            )
            await page.set_content(html_content)
            card = page.locator(".card-container")
            target_path = OUTPUT_DIR / filename
            await card.screenshot(path=str(target_path))
            print(f"Generated: {target_path}")
            await page.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(render_all())
