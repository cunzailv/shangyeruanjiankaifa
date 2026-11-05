/**
 * dsh-business-planner —— 浏览器半端（左侧栏入口 + 全局面板）
 * ============================================================================
 * ⭐ client bundle 不是 ESM，是自注册脚本（与 dsh-bili-scroll / 官方 client 包一致）：
 *
 *     window.__ModuleLoader__.load({
 *       id: '<package.json 的 name>',
 *       factory: (require) => ({ inject, apply })
 *     })
 *
 * ⭐ 左侧栏入口的两半（抄官方 ui-schedule / ui-plugin-manager 的写法）：
 *
 *     ctx.slots.register({ name: 'main', key: 'project-planner' }, PlannerPanel)
 *     ctx.slots.register({ name: 'sidebar.panellist', id: 'project-planner',
 *                          order: 10, label: '规划大管家' }, PlannerIcon)
 *
 *   ⇒ 点击左侧栏图标 = ctx.layout.selectPanel('project-planner')，渲染上面的 main 面板。
 *   ⇒ 两边的 id 必须一致；label 同时是可见文字、无障碍名称和折叠态 tooltip。
 *
 * 这一页只做客户端本地的事：7 阶段进度（localStorage）、每阶段卡点产出与参考文档、
 * 复制启动指令。不读写宿主文件，也不依赖 webServer API —— 装完即用。
 * ============================================================================
 */
window.__ModuleLoader__.load({
  id: 'dsh-business-planner',
  factory: (require) => {
    const React = require('react')
    const h = React.createElement

    const PANEL_ID = 'project-planner'
    const STORAGE_KEY = 'dsh-business-planner.progress.v1'
    const LAUNCH_PROMPT = '/project-development-planner 我想做一个……'
    const REPO_URL = 'https://github.com/cunzailv/shangyeruanjiankaifa'
    const NPM_URL = 'https://www.npmjs.com/package/dsh-business-planner'

    const STAGES = [
      {
        step: '0',
        title: '需求验真与价值主张',
        goal: 'ICP / JTBD / 刚需定级 / Smoke Test',
        output: '《用户需求验真与商业价值主张书》',
        questions: '目标用户是谁？痛点够不够痛？没写一行代码之前，怎么验证有人愿意买单？',
        refs: ['assets/stage-0-template.md'],
      },
      {
        step: '1',
        title: '商业模式与单位经济学',
        goal: 'GTM / 定价阶梯 / LTV:CAC / 支付合规',
        output: '《单位经济学测算、定价阶梯与防破产架构报告》',
        questions: 'LTV 是否至少是 CAC 的 3 倍？算力与出网成本封顶了吗？',
        refs: ['references/economics-formulas.md', 'assets/stage-1-template.md'],
      },
      {
        step: '2',
        title: '产品需求与页面交互',
        goal: 'User Story / 核心流程 / Wireframe',
        output: '《敏捷产品需求文档 (PRD) 与页面交互逻辑》',
        questions: '核心用户故事能一句话说清吗？页面流转有没有断点？',
        refs: ['assets/prd-template.md'],
      },
      {
        step: '3',
        title: '开源基座选型与二开',
        goal: '黄金栈匹配 / 案例对标 / 许可证裁决',
        output: '《开源技术底座选型、案例对标与二次开发设计蓝图》',
        questions: '许可证能商用吗？最近还在维护吗？复用哪一层、自己写哪一层？',
        refs: ['references/tech-stack-matrix.md', 'references/github-open-source-cases.md'],
      },
      {
        step: '4',
        title: '系统契约与安全合规',
        goal: 'ER 图 / API 契约 / 隐私合规',
        output: '《系统契约规范书、数据模型设计与安全合规清单》',
        questions: '数据模型和接口契约定了吗？GDPR / Prompt 注入 / 接口防刷考虑了吗？',
        refs: ['references/tech-stack-matrix.md'],
      },
      {
        step: '5',
        title: 'AI 管线与 Prompt 架构',
        goal: 'Agent 拓扑 / 评测 / 可观测性',
        output: '《AI 智能体管线设计与 Prompt 评测方案》',
        questions: 'Agent 怎么分工？幻觉和 Token 账单靠什么评测与监控兜底？',
        refs: ['references/agent-skill-routing.md'],
      },
      {
        step: '6',
        title: '敏捷拆解与交付',
        goal: 'EPIC → Task / E2E / 灰度发布',
        output: '《敏捷交付工单、持续集成测试与监控部署方案》',
        questions: '工单拆到可估点了吗？QA 对抗测试和灰度发布怎么做？',
        refs: ['references/agent-skill-routing.md'],
      },
    ]

    /* ────────────── 本地进度（localStorage，仅这台机器） ────────────── */

    function loadProgress() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return STAGES.map(() => false)
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) return STAGES.map(() => false)
        return STAGES.map((_, i) => parsed[i] === true)
      } catch {
        return STAGES.map(() => false)
      }
    }

    function saveProgress(done) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done))
      } catch {
        /* 隐私模式 / 禁用存储时静默降级，不阻断面板 */
      }
    }

    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch {
        try {
          const area = document.createElement('textarea')
          area.value = text
          area.setAttribute('readonly', '')
          area.style.position = 'fixed'
          area.style.opacity = '0'
          document.body.appendChild(area)
          area.select()
          const ok = document.execCommand('copy')
          area.remove()
          return ok
        } catch {
          return false
        }
      }
    }

    /* ────────────── 图标（与侧栏 16px 网格对齐） ────────────── */

    function PlannerIcon({ size = 16 }) {
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M2.5 12.5h3v-2.5h-3zM6.5 10h3V8h-3zM10.5 7.5h3V5h-3z',
          fill: 'currentColor',
          opacity: '0.35',
        }),
        h('path', {
          d: 'M3 11.5 8 4l5 7.5',
          stroke: 'currentColor',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      )
    }

    function CheckIcon({ size = 12 }) {
      return h(
        'svg',
        { width: size, height: size, viewBox: '0 0 12 12', fill: 'none', 'aria-hidden': 'true' },
        h('path', {
          d: 'M2.5 6.2 5 8.7 9.5 3.6',
          stroke: 'currentColor',
          strokeWidth: '1.6',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      )
    }

    function ChevronIcon({ open }) {
      return h(
        'svg',
        {
          width: 12,
          height: 12,
          viewBox: '0 0 12 12',
          fill: 'none',
          'aria-hidden': 'true',
          style: { transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s' },
        },
        h('path', {
          d: 'M4.2 2.5 7.8 6l-3.6 3.5',
          stroke: 'currentColor',
          strokeWidth: '1.4',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      )
    }

    function CopyIcon() {
      return h(
        'svg',
        { width: 13, height: 13, viewBox: '0 0 14 14', fill: 'none', 'aria-hidden': 'true' },
        h('rect', {
          x: '4.6',
          y: '4.6',
          width: '7.2',
          height: '7.2',
          rx: '1.6',
          stroke: 'currentColor',
          strokeWidth: '1.2',
        }),
        h('path', {
          d: 'M9.4 4.6V3.2A1.2 1.2 0 0 0 8.2 2H3.2A1.2 1.2 0 0 0 2 3.2v5a1.2 1.2 0 0 0 1.2 1.2h1.4',
          stroke: 'currentColor',
          strokeWidth: '1.2',
          strokeLinecap: 'round',
        }),
      )
    }

    /* ────────────── 面板 ────────────── */

    function PlannerPanel() {
      const [done, setDone] = React.useState(loadProgress)
      const [openStage, setOpenStage] = React.useState(null)
      const [notice, setNotice] = React.useState('')

      React.useEffect(() => {
        saveProgress(done)
      }, [done])

      React.useEffect(() => {
        if (!notice) return
        const timer = window.setTimeout(() => setNotice(''), 1800)
        return () => window.clearTimeout(timer)
      }, [notice])

      const completed = done.filter(Boolean).length
      const percent = Math.round((completed / STAGES.length) * 100)
      const currentIndex = done.findIndex((value) => value === false)

      const flash = (text) => setNotice(text)

      const onCopyLaunch = async () => {
        flash((await copyText(LAUNCH_PROMPT)) ? '启动指令已复制' : '复制失败，请手动输入')
      }

      const onCopyPath = async (path) => {
        flash((await copyText(path)) ? `已复制 ${path}` : '复制失败')
      }

      const toggleDone = (index) => {
        setDone((prev) => prev.map((value, i) => (i === index ? !value : value)))
      }

      const reset = () => {
        setDone(STAGES.map(() => false))
        setOpenStage(null)
        flash('进度已重置')
      }

      return h(
        'div',
        { 'data-pp-page': '' },
        h(
          'div',
          { 'data-pp-scroll': '' },
          h(
            'div',
            { 'data-pp-wrap': '' },
            h(
              'header',
              { 'data-pp-head': '' },
              h(
                'div',
                { 'data-pp-heading': '' },
                h('h1', { 'data-pp-title': '' }, '项目规划大管家'),
                h('p', { 'data-pp-sub': '' }, '需求验真先行 · 商业闭环兜底 · 开源基座起步'),
              ),
              h(
                'div',
                { 'data-pp-head-actions': '' },
                h(
                  'button',
                  { 'data-pp-btn': '', 'data-primary': '', onClick: onCopyLaunch, type: 'button' },
                  h(CopyIcon),
                  '复制启动指令',
                ),
              ),
            ),

            h(
              'section',
              { 'data-pp-progress': '', 'aria-label': '规划进度' },
              h(
                'div',
                { 'data-pp-progress-top': '' },
                h(
                  'div',
                  { 'data-pp-progress-text': '' },
                  h('strong', null, `${completed} / ${STAGES.length}`),
                  h('span', null, currentIndex < 0 ? '全部阶段已确认，可以交付了' : `下一阶段：${STAGES[currentIndex].title}`),
                ),
                h(
                  'button',
                  { 'data-pp-linkbtn': '', onClick: reset, type: 'button' },
                  '重置进度',
                ),
              ),
              h(
                'div',
                { 'data-pp-bar': '', 'aria-hidden': 'true' },
                h('span', { 'data-pp-bar-fill': '', style: { width: `${percent}%` } }),
              ),
              h('p', { 'data-pp-hint': '' }, '进度只记在这台机器上（localStorage），不随仓库同步。'),
            ),

            h(
              'ol',
              { 'data-pp-stages': '', 'aria-label': '七个阶段' },
              ...STAGES.map((stage, index) => {
                const isDone = done[index]
                const isCurrent = index === currentIndex
                const isOpen = openStage === index
                const state = isDone ? '已确认' : isCurrent ? '进行中' : '待开始'
                return h(
                  'li',
                  {
                    'data-pp-stage': '',
                    'data-done': isDone ? '' : undefined,
                    'data-current': isCurrent ? '' : undefined,
                    key: stage.step,
                  },
                  h(
                    'div',
                    { 'data-pp-stage-row': '' },
                    h(
                      'button',
                      {
                        'data-pp-check': '',
                        type: 'button',
                        'aria-pressed': isDone ? 'true' : 'false',
                        'aria-label': isDone ? `把阶段 ${stage.step} 标记为未确认` : `把阶段 ${stage.step} 标记为已确认`,
                        onClick: () => toggleDone(index),
                      },
                      isDone ? h(CheckIcon) : stage.step,
                    ),
                    h(
                      'div',
                      { 'data-pp-stage-main': '' },
                      h(
                        'div',
                        { 'data-pp-stage-titleline': '' },
                        h('span', { 'data-pp-stage-name': '' }, stage.title),
                        h('span', { 'data-pp-state': '', 'data-tone': isDone ? 'done' : isCurrent ? 'current' : 'todo' }, state),
                      ),
                      h('div', { 'data-pp-stage-goal': '' }, stage.goal),
                    ),
                    h(
                      'button',
                      {
                        'data-pp-expand': '',
                        type: 'button',
                        'aria-expanded': isOpen ? 'true' : 'false',
                        'aria-label': `${isOpen ? '收起' : '展开'}阶段 ${stage.step} 详情`,
                        onClick: () => setOpenStage(isOpen ? null : index),
                      },
                      h(ChevronIcon, { open: isOpen }),
                    ),
                  ),
                  isOpen
                    ? h(
                        'div',
                        { 'data-pp-detail': '' },
                        h(
                          'p',
                          { 'data-pp-detail-line': '' },
                          h('span', { 'data-pp-k': '' }, '卡点产出'),
                          stage.output,
                        ),
                        h(
                          'p',
                          { 'data-pp-detail-line': '' },
                          h('span', { 'data-pp-k': '' }, '自查三问'),
                          stage.questions,
                        ),
                        h(
                          'div',
                          { 'data-pp-refs': '' },
                          h('span', { 'data-pp-k': '' }, '参考文档'),
                          ...stage.refs.map((path) =>
                            h(
                              'button',
                              {
                                'data-pp-ref': '',
                                type: 'button',
                                key: path,
                                title: `复制 ${path}`,
                                onClick: () => onCopyPath(path),
                              },
                              path,
                            ),
                          ),
                        ),
                      )
                    : null,
                )
              }),
            ),

            h(
              'footer',
              { 'data-pp-foot': '' },
              h(
                'div',
                { 'data-pp-foot-text': '' },
                h('strong', null, '怎么开始'),
                h('span', null, '在新会话里发送上面复制的启动指令；模型会读取 SKILL.md 并停在阶段 0 等你确认。'),
              ),
              h(
                'div',
                { 'data-pp-foot-links': '' },
                h('a', { 'data-pp-linkbtn': '', href: REPO_URL, target: '_blank', rel: 'noreferrer' }, 'GitHub 仓库'),
                h('a', { 'data-pp-linkbtn': '', href: NPM_URL, target: '_blank', rel: 'noreferrer' }, 'npm'),
              ),
            ),

            notice ? h('div', { 'data-pp-toast': '', role: 'status' }, notice) : null,
          ),
        ),
      )
    }

    /* ────────────── 样式 ────────────── */

    const CSS = `
[data-pp-page]{height:100%;overflow:hidden;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:14px;line-height:1.6;}
[data-pp-scroll]{height:100%;overflow:auto;scrollbar-gutter:stable;}
[data-pp-wrap]{max-width:920px;margin:0 auto;padding:0 clamp(20px,4vw,48px) 48px;}
[data-pp-head]{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-top:28px;}
html[data-platform=darwin] [data-pp-head]{padding-top:calc(28px + var(--dsh-frame-top-clearance,0px));}
[data-pp-heading]{min-width:0;}
[data-pp-title]{margin:0;font-size:20px;font-weight:500;line-height:28px;}
[data-pp-sub]{margin:4px 0 0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px;}
[data-pp-head-actions]{display:flex;align-items:center;gap:8px;flex:none;}
[data-pp-btn]{appearance:none;border:0;border-radius:8px;height:32px;padding:0 12px;font:inherit;font-size:13px;line-height:20px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;background:var(--dsw-alias-bg-layer-3);color:var(--dsw-alias-label-primary);}
[data-pp-btn]:hover{background:var(--dsw-alias-interactive-bg-hover);}
[data-pp-btn][data-primary]{background:var(--dsw-alias-state-business-primary);color:#fff;}
[data-pp-btn][data-primary]:hover{filter:brightness(1.06);background:var(--dsw-alias-state-business-primary);}
[data-pp-progress]{margin-top:28px;padding:16px 18px;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-lg,14px);background:var(--dsw-alias-bg-layer-1);}
[data-pp-progress-top]{display:flex;align-items:center;justify-content:space-between;gap:12px;}
[data-pp-progress-text]{display:flex;align-items:baseline;gap:10px;min-width:0;}
[data-pp-progress-text] strong{font-size:18px;font-weight:600;font-variant-numeric:tabular-nums;flex:none;}
[data-pp-progress-text] span{color:var(--dsw-alias-label-secondary);font-size:13px;overflow-wrap:anywhere;}
[data-pp-bar]{margin-top:12px;height:6px;border-radius:999px;overflow:hidden;background:color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);}
[data-pp-bar-fill]{display:block;height:100%;border-radius:999px;background:var(--dsw-alias-state-business-primary);transition:width .2s ease;}
[data-pp-hint]{margin:8px 0 0;color:var(--dsw-alias-label-caption);font-size:12px;line-height:18px;}
[data-pp-stages]{list-style:none;margin:20px 0 0;padding:0;display:flex;flex-direction:column;gap:2px;}
[data-pp-stage]{border-radius:12px;border:.5px solid transparent;}
[data-pp-stage][data-current]{border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary) 30%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 5%, transparent);}
[data-pp-stage-row]{display:flex;align-items:flex-start;gap:12px;padding:12px 8px;}
[data-pp-check]{appearance:none;flex:none;width:26px;height:26px;margin-top:1px;border-radius:50%;border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;font-variant-numeric:tabular-nums;}
[data-pp-check]:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg-hover);}
[data-pp-check]:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px;}
[data-pp-stage][data-done] [data-pp-check]{background:var(--dsw-alias-state-success-primary,var(--dsw-alias-state-business-primary));border-color:transparent;color:#fff;}
[data-pp-stage-main]{flex:1;min-width:0;padding-top:1px;}
[data-pp-stage-titleline]{display:flex;align-items:center;gap:10px;min-width:0;}
[data-pp-stage-name]{font-size:14px;font-weight:500;line-height:22px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
[data-pp-stage][data-done] [data-pp-stage-name]{color:var(--dsw-alias-label-secondary);}
[data-pp-state]{flex:none;font-size:11px;line-height:18px;padding:0 7px;border-radius:6px;background:var(--dsw-alias-bg-layer-3);color:var(--dsw-alias-label-tertiary);}
[data-pp-state][data-tone=current]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent);}
[data-pp-state][data-tone=done]{color:var(--dsw-alias-state-success-primary,var(--dsw-alias-label-secondary));background:color-mix(in srgb, var(--dsw-alias-state-success-primary,var(--dsw-alias-state-business-primary)) 12%, transparent);}
[data-pp-stage-goal]{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:20px;margin-top:1px;overflow-wrap:anywhere;}
[data-pp-expand]{appearance:none;flex:none;border:0;background:transparent;color:var(--dsw-alias-label-caption);width:28px;height:28px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;}
[data-pp-expand]:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary);}
[data-pp-expand]:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px;}
[data-pp-detail]{margin:0 8px 12px 46px;padding:12px 14px;border-radius:10px;background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l3);display:flex;flex-direction:column;gap:8px;}
[data-pp-detail-line]{margin:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px;overflow-wrap:anywhere;}
[data-pp-k]{color:var(--dsw-alias-label-caption);font-size:11px;letter-spacing:.03em;margin-right:8px;flex:none;}
[data-pp-refs]{display:flex;align-items:center;flex-wrap:wrap;gap:6px;}
[data-pp-ref]{appearance:none;cursor:pointer;font:inherit;font-size:11.5px;line-height:18px;padding:1px 7px;border-radius:5px;border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font-family:var(--dsw-font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);}
[data-pp-ref]:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);}
[data-pp-foot]{margin-top:28px;padding-top:20px;border-top:.5px solid var(--dsw-alias-border-l3);display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap;}
[data-pp-foot-text]{display:flex;flex-direction:column;gap:2px;min-width:0;max-width:560px;}
[data-pp-foot-text] strong{font-size:13px;font-weight:600;}
[data-pp-foot-text] span{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px;}
[data-pp-foot-links]{display:flex;align-items:center;gap:8px;flex:none;}
[data-pp-linkbtn]{appearance:none;border:0;border-radius:8px;height:28px;padding:0 10px;font:inherit;font-size:12px;line-height:18px;cursor:pointer;display:inline-flex;align-items:center;color:var(--dsw-alias-label-secondary);text-decoration:none;background:transparent;}
[data-pp-linkbtn]:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);}
[data-pp-toast]{position:fixed;left:50%;bottom:32px;transform:translateX(-50%);z-index:60;padding:8px 14px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);border:.5px solid var(--dsw-alias-border-l3);box-shadow:var(--dsw-elevation-prominent,0 8px 24px rgba(0,0,0,.18));color:var(--dsw-alias-label-primary);font-size:12px;line-height:18px;max-width:80vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
@media (max-width:640px){
  [data-pp-stage-goal]{white-space:normal;}
  [data-pp-state]{display:none;}
  [data-pp-detail]{margin-left:8px;}
  [data-pp-foot]{flex-direction:column;}
}
@media (prefers-reduced-motion:reduce){
  [data-pp-bar-fill]{transition:none;}
}
`

    /* ────────────── 插件入口 ────────────── */

    return {
      inject: ['slots'],
      apply(ctx) {
        const style = document.createElement('style')
        style.setAttribute('data-plugin-css', 'dsh-business-planner')
        style.textContent = CSS
        document.head.appendChild(style)
        ctx.effect(() => () => style.remove(), 'dsh-business-planner: 面板样式')

        const slots = (typeof ctx.get === 'function' ? ctx.get('slots') : undefined) || ctx.slots
        if (!slots) return

        // 左侧栏图标 → 主面板。两处 id 必须一致。
        slots.inject('main', () =>
          slots.register(
            {
              name: 'main',
              key: PANEL_ID,
            },
            PlannerPanel,
          ),
        )

        slots.inject('sidebar.panellist', () =>
          slots.register(
            {
              name: 'sidebar.panellist',
              id: PANEL_ID,
              order: 10,
              label: '规划大管家',
            },
            PlannerIcon,
          ),
        )
      },
    }
  },
})
