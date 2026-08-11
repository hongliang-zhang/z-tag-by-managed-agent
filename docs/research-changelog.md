# 研究复核记录

> 用于记录官方资料变化、证据等级调整与仓库同步状态。当前快照：2026-08-12。

## 2026-08-12：Connection 网络策略升级为官方确认

再次核对 Claude Tag 官方 Settings map、Per-channel access、Give Claude access、How it works、Memory、Routines、Audit 与 Spend limit 文档。

### 新确认

- Connection 的 Credential 可绑定明确的 Allowed websites / Hosts。
- Connection 保存后可继续限制 URL Path 与 HTTP Method，例如只允许 GET、禁止 DELETE。
- 官方列出的 Credential type 包括 Bearer、Basic、Body parameter、AWS SigV4、GCP access token、GCP IAP、OAuth 2.0 JWT bearer、OAuth 2.0 client credentials、OAuth 2.0 authorization code 与 GitHub App。
- Sandbox 出站存在三层 allow：Connection、Bundle Domain、Scope Environment。
- Connection 命中时由 Agent Proxy 在网络边界注入 Secret；模型与 Sandbox 不持有 Credential。
- Bundle Domain 只放行 Host/Port，不附带 Credential；Agent Proxy 只承载 HTTP/HTTPS。
- Web Search 在 Anthropic 服务端执行，不属于 Sandbox Network Request。

### 纠错

此前 UI Atlas 将 Allowed HTTP Methods、Path Prefix Restrictions 归为未确认或可能的竞品补全项。当前官方文档已明确确认其产品能力，因此：

- 能力本身升级为 A 级官方事实。
- 具体表单布局若仅来自第三方截图，仍维持 C 级截图事实。
- Z Tag 架构中的 Host/Path/Method Policy Gateway 不再只是增强建议，而是对标 Claude Tag 时必须覆盖的 P0 能力。

### 未变化的结论

- 一个组织级 Claude Tag，通过 Default Slack → Workspace → Channel Scope 解析差异化配置。
- Access Bundle 向下累加；同 Host Credential 冲突时最窄 Scope 胜出且失败不回退。
- 每个 Slack Thread 对应共享 Working Session；Web Session Trace 只读。
- Memory 不使用 Scope 配置继承树；公共频道共享 Workspace Store，私有频道写独立 Store。
- Routine 当前明确为 Schedule、Channel Watch、PR Subscription。
- Audit 页主要覆盖 Scheduled work、Memory 与可选 Network events；不存在统一逐动作日志。
- Budget 使用组织总限额、默认频道限额、单频道限额与频道归因，不存在已确认的 Workspace Budget。

## 仓库同步清单

- [x] README.md
- [x] docs/claude-tag-research.md
- [x] docs/claude-tag-ui-atlas.md
- [x] docs/claude-tag-screenshots.md
- [x] docs/claude-tag-third-party-analysis.md
- [x] docs/glm-z-tag-architecture.md
- [x] docs/sources.md
- [x] diagrams/unified-architecture.mmd
- [x] diagrams/unified-architecture.svg
