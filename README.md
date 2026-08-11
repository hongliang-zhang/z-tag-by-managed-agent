# Z Tag by Managed Agent

基于 Claude Tag 与 Claude Managed Agents 的公开信息，拆解团队级 Agent 产品，并给出以 GLM Managed Agent 为执行底座的产品与技术架构方案。

> 核心结论：GLM Managed Agent 负责"把任务做完"；Z Tag 团队产品层负责"让团队在正确的上下文、身份、权限和治理下共同把任务交给 Agent"。

## 统一架构图

![Z Tag by Managed Agent 统一架构图](diagrams/unified-architecture.svg)

图中颜色含义：

- 橙色：对标 Claude Tag，Z Tag 需要在 Managed Agent 之外补建的团队产品能力。
- 蓝色：GLM Managed Agent 可复用的执行底座。
- 红色：权限、凭证与敏感操作控制。
- 灰色：渠道入口与企业外部系统。

可编辑的 Mermaid 源文件见 [`diagrams/unified-architecture.mmd`](diagrams/unified-architecture.mmd)。

## 文档导航

| 文档 | 内容 |
|---|---|
| [Claude Tag 深度拆解](docs/claude-tag-research.md) | 用户、场景、产品架构、技术架构，以及与 Managed Agent 的边界 |
| [GLM Z Tag 构建方案](docs/glm-z-tag-architecture.md) | 可复用能力、必须补建模块、产品架构、技术架构、关键设计与分期 |
| [Claude Tag 真实产品截图](docs/claude-tag-screenshots.md) | 42 张 Claude Tag 产品截图（配置流程、频道交互、GitHub 集成等） |
| [Claude Tag 三方解读](docs/claude-tag-third-party-analysis.md) | 13 张三方分析截图（Memory、Identity、Governance 架构解读） |
| [官方资料索引](docs/sources.md) | Claude Tag 与 Claude Managed Agents 的官方资料链接 |

## 研究边界

- "官方事实"来自 Anthropic/Claude 公开资料；链接集中在资料索引中。
- "建议方案"是面向 GLM Managed Agent 的产品与技术设计，不代表 Anthropic 已公开的内部实现。
- Claude Tag 与 Claude Managed Agents 是两个独立产品。不能仅因能力相似，就断言 Claude Tag 底层直接调用公开的 Managed Agents API。
- 本仓库研究快照日期：2026-08-11。

