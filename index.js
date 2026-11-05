/**
 * dsh-business-planner —— 把「商业级全流程项目开发规划」skill 装进 DSH
 * ============================================================================
 * 它是什么：一个"技能型"DSH 插件。加载后向 `ctx.skills` 注册一枚 skill
 *   `project-development-planner`，模型可以按描述自动挂载，用户也可以
 *   直接敲 `/project-development-planner` 调用。
 *
 * 为什么不用复制文件的办法：skill 正文里的 `references/xxx.md`、
 *   `assets/xxx.md` 都是相对路径。注册时把 `resourceBase` 指到本包根目录，
 *   DSH 会在加载结果里告诉模型"按这个目录解析相对路径"，仓库里的
 *   references/ 与 assets/ 因此随包生效，不需要往用户目录里铺任何东西。
 *
 * 正文以 SKILL.md 为唯一来源（frontmatter 取 name / description /
 * whenToUse，其余部分作为指令正文），改 SKILL.md 即改技能，不用同步两份。
 * ============================================================================
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** 包根目录：SKILL.md、references/、assets/ 都在这里。 */
const PACKAGE_DIR = dirname(fileURLToPath(import.meta.url))
const SKILL_FILE = join(PACKAGE_DIR, 'SKILL.md')

/** Cordis 插件名（与 cordis.patch.yml 里的 id 区分：那是 entry id）。 */
export const name = 'project-planner'

/** 需要技能注册表；没有 `skills` 服务时这条插件不会被激活。 */
export const inject = ['skills']

/**
 * 只解析 SKILL.md 需要的标量 frontmatter，不引第三方 YAML 依赖。
 * 支持 `key: value` 与单/双引号包裹的值；嵌套结构原样忽略。
 * @param {string} text - 整个 SKILL.md 文本
 * @returns {{ data: Record<string, string>, body: string }}
 */
function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text)
  if (!match) return { data: {}, body: text }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([A-Za-z0-9_-]+):[ \t]*(.*)$/.exec(line)
    if (!pair) continue
    let value = pair[2].trim()
    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    if (quoted && value.length >= 2) value = value.slice(1, -1)
    data[pair[1]] = value
  }
  return { data, body: text.slice(match[0].length) }
}

/**
 * 注册技能。正文与元数据都来自 SKILL.md，资源基准指向包根目录。
 * @param {import('@deepseek-ai/cordis').Context} ctx
 */
export function apply(ctx) {
  let raw
  try {
    raw = readFileSync(SKILL_FILE, 'utf8')
  } catch (error) {
    throw new Error(
      `dsh-business-planner: 读不到 SKILL.md（${SKILL_FILE}）：${error instanceof Error ? error.message : String(error)}`,
    )
  }

  const { data, body } = parseFrontmatter(raw)
  const skillName = data.name
  const description = data.description
  if (!skillName) throw new Error(`dsh-business-planner: ${SKILL_FILE} 的 frontmatter 缺少 name`)
  if (!description) throw new Error(`dsh-business-planner: ${SKILL_FILE} 的 frontmatter 缺少 description`)
  if (!body.trim()) throw new Error(`dsh-business-planner: ${SKILL_FILE} 只有 frontmatter，没有正文`)

  ctx.skills.register({
    name: skillName,
    description,
    ...(data.whenToUse ? { whenToUse: data.whenToUse } : {}),
    source: 'bundled',
    resourceBase: { kind: 'directory', path: PACKAGE_DIR },
    content: body.replace(/^\s*\n/, ''),
  })
}
