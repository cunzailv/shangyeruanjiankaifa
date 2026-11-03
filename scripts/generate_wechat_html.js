const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdPath = path.join(__dirname, '../docs/wechat_article_commercial_loop.md');
const outHtmlPath = path.join(__dirname, '../docs/wechat_article_preview.html');

let mdContent = fs.readFileSync(mdPath, 'utf-8');

// Replace local image paths with base64 data URLs so the HTML is 100% self-contained
const imgRegex = /!\[(.*?)\]\(\.\/images\/(.*?)\)/g;
mdContent = mdContent.replace(imgRegex, (match, alt, filename) => {
  const filePath = path.join(__dirname, '../docs/images', filename);
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filename).toLowerCase();
    const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
    const b64 = fs.readFileSync(filePath).toString('base64');
    return `![${alt}](data:${mime};base64,${b64})`;
  }
  return match;
});

// Run marked
const tempMd = path.join(__dirname, '../docs/.temp_wechat.md');
fs.writeFileSync(tempMd, mdContent);
const rawHtml = execSync(`npx marked -i "${tempMd}"`).toString();
fs.unlinkSync(tempMd);

const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>微信公众号文章预览与一键排版导出</title>
  <style>
    body {
      background-color: #f1f5f9;
      margin: 0;
      padding: 40px 20px;
      font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
    }
    .toolbar {
      max-width: 680px;
      margin: 0 auto 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 14px 20px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .copy-btn {
      background: #07c160;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .copy-btn:hover {
      background: #06ad56;
    }
    #article-content {
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      color: #333333;
      font-size: 15px;
      line-height: 1.8;
      letter-spacing: 0.5px;
      word-break: break-word;
    }
    #article-content h1 {
      font-size: 22px;
      font-weight: bold;
      color: #111827;
      border-bottom: 2px solid #07c160;
      padding-bottom: 10px;
      margin: 30px 0 20px;
    }
    #article-content h2 {
      font-size: 18px;
      font-weight: bold;
      color: #1f2937;
      margin: 28px 0 16px;
      display: flex;
      align-items: center;
      border-left: 4px solid #07c160;
      padding-left: 10px;
    }
    #article-content h3 {
      font-size: 16px;
      font-weight: bold;
      color: #374151;
      margin: 20px 0 12px;
    }
    #article-content p {
      margin: 16px 0;
      text-align: justify;
    }
    #article-content blockquote {
      background: #f8fafc;
      border-left: 4px solid #3b82f6;
      margin: 20px 0;
      padding: 14px 18px;
      border-radius: 0 8px 8px 0;
      color: #475569;
      font-style: normal;
    }
    #article-content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      display: block;
      margin: 24px auto;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    }
    #article-content code {
      background: #f1f5f9;
      color: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }
    #article-content pre {
      background: #1e293b;
      color: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 20px 0;
    }
    #article-content pre code {
      background: transparent;
      color: inherit;
      padding: 0;
    }
    #article-content ul, #article-content ol {
      padding-left: 20px;
      margin: 16px 0;
    }
    #article-content li {
      margin-bottom: 8px;
    }
    #article-content a {
      color: #2563eb;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div><strong>📄 微信公众号文章预览</strong> (含自嵌高清图)</div>
    <button class="copy-btn" onclick="copyRichText()">📋 一键复制富文本至微信后台</button>
  </div>
  <div id="article-content">
    ${rawHtml}
  </div>

  <script>
    function copyRichText() {
      const content = document.getElementById('article-content');
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(content);
      selection.removeAllRanges();
      selection.addRange(range);
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          alert('✅ 复制成功！可以直接在微信公众号后台编辑器中按 Ctrl+V (或 Cmd+V) 粘贴。');
        } else {
          alert('❌ 自动复制失败，请手动全选文章内容后复制。');
        }
      } catch (err) {
        alert('❌ 复制失败: ' + err);
      }
      selection.removeAllRanges();
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(outHtmlPath, fullHtml);
console.log('Generated:', outHtmlPath);
