# 商业测算与单位经济学 (Unit Economics) 核心公式参考手册

在执行 **阶段 1 (商业模式、变现路径与单位经济学测算)** 时，请严格使用以下公式体系进行财务推演。

## 1. 核心商业健康度指标 (Core Metrics)

*   **CAC (Customer Acquisition Cost) 单客获取成本**:
    *   公式：`CAC = (营销与广告总费用 + 销售团队成本) / 新增付费客户数`
    *   *要求*：必须低于 LTV 的 1/3。
*   **LTV (Customer Lifetime Value) 单客生命周期价值**:
    *   公式：`LTV = (ARPU × 毛利率) / Churn Rate`
    *   *(ARPU: 平均单客月收入, Churn Rate: 月流失率)*
*   **健康度红线 (Health Ratio)**:
    *   标准健康状态：`LTV : CAC ≥ 3 : 1`
    *   卓越状态：`LTV : CAC ≥ 5 : 1`
*   **回本周期 (Payback Period)**:
    *   公式：`回本周期 (月) = CAC / (ARPU × 毛利率)`
    *   *要求*：SaaS 产品最好控制在 6 - 12 个月内。

## 2. AIGC 产品专属成本拆解 (AIGC COGS Breakdown)

每次用户触发核心 AI 动作（如生成一篇文章、一张图），必须核算单次请求成本（COGS per Action）：

*   **LLM 文本/代码生成成本**:
    *   `单次成本 = (输入 Token 数 / 1000 × 输入单价) + (输出 Token 数 / 1000 × 输出单价)`
    *   *(注：提示词包含系统预设、上下文和 RAG 检索结果，通常输入 Token 是输出的 5-10 倍)*
*   **多模态生成（图片/视频/语音）成本**:
    *   `单次成本 = API 按次计费 / 算力节点按秒计费 + (生成文件大小 × 对象存储出网费率)`
*   **防破产底线 (Anti-Bankruptcy)**:
    *   禁止使用按流量双向计费的云存储（如 AWS S3）直接对外暴露大文件，强制替换为零出网费服务（如 Cloudflare R2）。
    *   免费层（Freemium）必须设置硬性 API 限流（Rate Limit）与单日 Token 消耗阈值。

## 3. SaaS 定价阶梯建议 (Pricing Tiers Best Practices)

*   **Hobby (免费/引流层)**：零利润或微亏，仅开放基础功能，强制加上产品水印，严格限流。
*   **Pro (核心利润层)**：目标毛利率 75% - 85%。定价应为每月 `单客预期 AI 消耗总成本 × 4` 到 `× 5`。
*   **Team/Enterprise (高客单层)**：基于坐席（Per Seat）收费，支持 SSO/SAML，提供私有数据隔离与优先 SLA 支持。毛利率应达 90% 以上。
