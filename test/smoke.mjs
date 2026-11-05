/**
 * 冒烟测试：不启动 DSH，用一个假的 ctx.skills 验证插件注册出来的技能长得对。
 * 跑法：node test/smoke.mjs（或 npm test）
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const plugin = await import('../index.js')

assert.equal(plugin.name, 'project-planner', '插件名应为 project-planner')
assert.ok(plugin.inject.includes('skills'), '插件必须 inject skills 服务')
assert.equal(typeof plugin.apply, 'function', '缺少 apply()')

const registered = []
plugin.apply({
  skills: {
    register(skill) {
      registered.push(skill)
      return () => {}
    },
  },
})

assert.equal(registered.length, 1, '应只注册一个技能')
const skill = registered[0]

assert.equal(skill.name, 'project-development-planner')
assert.match(skill.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, '技能名必须是 kebab-case')
assert.ok(skill.description.length > 20, 'description 太短，模型路由会失准')
assert.equal(skill.source, 'bundled')
assert.deepEqual(skill.resourceBase, { kind: 'directory', path: packageDir })
assert.ok(!skill.content.startsWith('---'), '正文里不应残留 frontmatter')
assert.match(skill.content, /^# /m, '正文应保留 Markdown 标题')
assert.match(skill.content.trimStart(), /^# /, '正文第一行应是标题而不是 frontmatter')

// references/ 与 assets/ 随包分发 —— 正文点到的每个相对路径都必须真的在包里。
const referenced = [...skill.content.matchAll(/(?:references|assets)\/[A-Za-z0-9._/-]+/g)].map((m) => m[0])
assert.ok(referenced.length > 0, '正文没有引用任何资源？')
for (const relative of new Set(referenced)) {
  assert.ok(existsSync(join(packageDir, relative)), `正文引用了不存在的资源：${relative}`)
}

// 客户端半端：左侧栏入口 + main 面板必须成对出现，否则会点开空白。
const client = readFileSync(join(packageDir, 'client.js'), 'utf8')
assert.match(client, /__ModuleLoader__\.load\(/, 'client.js 必须是自注册 bundle')
assert.match(client, /name:\s*'sidebar\.panellist'/, '缺少左侧栏入口 (sidebar.panellist)')
assert.match(client, /name:\s*'main'/, '缺少主面板 (main)')
assert.match(client, /id:\s*PANEL_ID/, '侧栏与主面板 id 必须共用同一个常量')

console.log(`✅ 插件冒烟测试通过：${skill.name}`)
console.log(`   资源基准：${skill.resourceBase.path}`)
console.log(`   已核验 ${new Set(referenced).size} 个随包资源路径`)
