# UI/UX 设计风格与视觉参考字典 (Design Styles Dictionary)

用户往往无法用准确的设计术语（如“拟物化”、“新拟态”、“大排版”）描述他们想要的界面。在进行 **阶段 3 (系统契约与设计规范)** 或引导用户选择时，请使用以下“通俗比喻”提供 A/B/C 选项，并将用户的选择自动翻译为底层设计语言（如 Tailwind/CSS 变量）。

## 1. 现代科技 / 效率工具类 (Tech & Productivity)

| 用户听得懂的词 (比喻) | 对应的专业 UI 术语 | Tailwind / CSS 落地指南 |
| :--- | :--- | :--- |
| **“苹果风 / 极简风”** (Apple/Minimalist) | 毛玻璃 (Glassmorphism), 高对比排版, 大量留白 | `backdrop-blur-xl`, `bg-white/70`, `tracking-tight`, 圆角 `rounded-2xl` |
| **“Notion 风 / 生产力风”** (Notion-like) | 极简黑白, 单色图标, 紧凑信息流, 无明显边框 | 无阴影, 细边框 `border-gray-200`, 悬停底色 `hover:bg-gray-100`, 字体 `font-serif` 或 `Inter` |
| **“Vercel 风 / 极客风”** (Geek/Dev) | 深色模式 (Dark Mode), 霓虹发光 (Glow), 细线边框 | `bg-black`, `border-gray-800`, 渐变文字 `bg-clip-text bg-gradient-to-r`, `shadow-[0_0_15px_rgba(255,255,255,0.1)]` |

## 2. 社交与生活方式类 (Social & Lifestyle)

| 用户听得懂的词 (比喻) | 对应的专业 UI 术语 | Tailwind / CSS 落地指南 |
| :--- | :--- | :--- |
| **“INS 风 / 网红风”** (Instagram/Aesthetic) | 图片为主, 圆润UI, 柔和阴影, 莫兰迪色系 | 大图片 `object-cover`, 柔和弥散阴影 `shadow-soft`, 主色调偏暖 (如 `rose-50`, `amber-50`) |
| **“小红书风 / 瀑布流”** (Masonry/Card-based) | 卡片式设计, 不规则瀑布流, 沉浸式滑动 | `columns-2`, `break-inside-avoid`, 卡片 `rounded-xl shadow-sm bg-white` |
| **“多巴胺风 / 潮酷风”** (Dopamine/Pop) | 高饱和度撞色, 粗体字, 夸张圆角, 新粗野主义 | 新粗野主义 (Neo-Brutalism): `border-4 border-black`, `shadow-[4px_4px_0_0_#000]`, 亮色背景 `bg-yellow-400` |

## 3. 内容与多媒体类 (Media & Content)

| 用户听得懂的词 (比喻) | 对应的专业 UI 术语 | 适用场景与技术提示 |
| :--- | :--- | :--- |
| **“吉卜力风 / 治愈绘本风”** (Ghibli/Cozy) | 暖色调, 纹理质感, 手绘插画风 | 增加背景噪点层 (Noise overlay)，使用复古衬线字体，色彩以自然绿、暖黄为主。适合心理疗愈、个人日记类 AI 应用。 |
| **“赛博朋克风”** (Cyberpunk) | 故障艺术 (Glitch), 霓虹高反差, 科技感界面 | 适合极客工具、Web3、游戏化 AI 应用。使用荧光粉/青色，搭配斜切边框 (Clip-path)。 |

## 💡 AI 管家应用策略：
当用户说“我想要一个类似 INS 的图片生成工具”时，你应该回答：
> “好的！我们 UI 层面将采用**『INS 网红风』**（大图沉浸、柔和阴影、莫兰迪暖色底色）来突出生成的图片。如果是这样，我们需要在 Tailwind 中配置 `shadow-soft` 和偏暖的主题色。这符合您的预期吗，还是您更倾向于高对比度的**『苹果极简风』**？”