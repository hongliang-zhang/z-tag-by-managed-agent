# Claude Tag 真实产品截图：逐步解读

> 视频来源：[Claude Tag product walkthrough](https://www.youtube.com/watch?v=_cdX8xkKj_s&t=179s)。截图反映录制当时的 Beta 界面；YouTuber 的口头判断不是官方技术承诺。

## 先看清五个产品对象

| 截图中出现的对象 | 不是 | 实际用途 |
|---|---|---|
| Slack Workspace 配对 | 外部系统授权 | 建立 Claude Organization 与 Slack Workspace 的连接 |
| Default / Workspace / Channel Scope | 三个不同 Agent | 同一个 Claude Tag 的分层配置范围 |
| Access Bundle | 单个 Connector | 可复用的 Credential、Repo、Domain、Plugin、Instruction 组合 |
| Slack Thread | 普通聊天记录 | 一次多人共享的 Working Session 边界 |
| Channel Memory | 永久 Session | 与 Session 解耦的长期 Markdown 记忆文件 |

## 1. Workspace 安装与配对（01–03）

### 可确认步骤

1. 管理后台弹出 “Set up Claude Tag for your workspace”。
2. 在 Slack 安装 Claude App，并查看它对频道、Workspace 和动作的权限。
3. 在要连接的 Workspace 中发送 `@Claude connect`。
4. 将 Claude 返回的 Code 粘贴回管理后台。
5. 选择 Whole workspace（推荐）或 Specific channel。

### 架构含义

这是 `Claude Organization ↔ Slack Installation / Workspace` 的配对流程。它解决渠道身份和租户映射，不会自动把管理员个人的 GitHub、Drive 或 Gmail 权限带进频道。

![01 Setup modal](screenshots/product/screenshot-01.png)

![02 Slack app permissions](screenshots/product/screenshot-02.png)

![03 Whole workspace or specific channel](screenshots/product/screenshot-03.png)

## 2. 私有频道安装 Claude App（04–07）

### 可确认步骤

- 在私有频道里直接 `@Claude` 时，Slackbot 提示 Claude 不在该频道。
- 成员从 Channel details → Integrations → Add an app 中添加 Claude。
- 添加后 Slack 显示 Claude App 已加入该频道。

### 架构含义

“Workspace 已配对”与“App 已进入某个私有频道”是两种状态。Channel Registry 至少要记录 Channel ID、公开/私有属性、App Membership 和安装状态。

![04 Claude missing from private channel](screenshots/product/screenshot-04.png)

![05 Channel integrations entry](screenshots/product/screenshot-05.png)

![06 Add Claude app](screenshots/product/screenshot-06.png)

![07 Claude added](screenshots/product/screenshot-07.png)

## 3. Thread 创建 Working Session（08）

Claude 加入频道后读取当前频道内容，建立 Checklist，并在 Thread 内持续更新；回复中出现 Open session in Claude、模型名和 Configure 等入口。

这支持 `Channel + Thread ↔ Working Session` 的绑定判断，但不能单凭界面断言 Claude Tag 调用了公开 Managed Agents API。

![08 Working thread](screenshots/product/screenshot-08.png)

## 4. Scope 配置树与频道差异化（09–15）

### 4.1 Default Slack access（09）

组织级根 Scope 的说明是：配置会应用到组织成员能够 `@Claude` 的所有 Workspace 和 Channel。可见配置包括：

- Claude Tag version
- Access bundles
- Plugins
- Custom instructions
- Advanced

![09 Default Slack access](screenshots/product/screenshot-09.png)

### 4.2 Workspace Scope（10）

Workspace `Creator Magic` 是 Default Slack access 下的子 Scope。界面显示它自己的 Version、直挂 Access Bundle、Plugins、Custom instructions 和 Advanced；其配置继续向频道传递。

![10 Workspace scope](screenshots/product/screenshot-10.png)

### 4.3 Channel Scope 与 Effective Access（11–12）

频道 `tank-core` 显示：

- Claude Tag version：`Inherit`，并明确展示 `Inherited: New`。
- 本级直挂 `Tank Core` Access Bundle。
- `1 inherited access bundle`。
- Plugins。
- Access summary：解析所有继承 Bundle 与配置后的最终权限。
- Repositories：`Creator-Magic — All repositories`。
- Custom instructions。

因此 Channel 的权限不是替换 Workspace，而是：

```text
Effective Channel Access
= Default Slack bundles
+ Workspace bundles
+ Channel bundles
```

Repo 和 Plugin 取并集；同 Host Credential 冲突时，最窄 Scope 胜出。

![11 Channel scope and resolved access](screenshots/product/screenshot-11.png)

![12 Add different channel access](screenshots/product/screenshot-12.png)

### 4.4 手工新增 Channel Scope（13–14）

Add channel 弹窗包含：

| 字段 | 作用 |
|---|---|
| Channel ID | Slack Channel 的稳定标识 |
| Name | 管理后台的可选显示名 |
| Description | 供管理员理解 Scope 用途 |
| System prompt addendum | 追加到该 Scope 的 Custom instructions |

截图 14 展示从 Slack 复制 Channel 信息后回到后台配置。官方文档同时说明：Claude 已加入的频道可自动出现在树中，手工 ID 是补充入口。

![13 Add channel fields](screenshots/product/screenshot-13.png)

![14 Copy channel](screenshots/product/screenshot-14.png)

### 4.5 Channel Custom Instructions（15）

`claude-tag-test` 频道继承一个 Access Bundle，同时设置本级 Custom instructions：`You always talk like Morpheus from The Matrix`。

这说明频道差异化行为来自 Scope Instruction Overlay，不是创建了另一个名字、头像或永久人格不同的 Agent。

![15 Channel custom instructions](screenshots/product/screenshot-15.png)

## 5. 频道内验证配置（16–17）

成员在同一频道重新发起任务，Claude 按 Channel instructions 生成 Morpheus 风格回复。新 Thread 会加载新的 Scope 配置；已经启动的 Thread 不保证自动更新 Plugin、Skill 和 Instruction。

![16 Start a new channel task](screenshots/product/screenshot-16.png)

![17 Channel-specific response](screenshots/product/screenshot-17.png)

## 6. Spend limit 与 Usage Credits（18–19）

- Usage 页面以 `Claude Tag` 服务为单位显示 MTD Spend、Spend limit 和 View channels。
- 可购买 Usage Credits，展示不同充值金额、折扣和付款方式。

这说明单次 Session Budget 与组织/频道产品额度是两层控制，Z Tag 不能只复用 Managed Agent 的 Run Budget。

![18 Claude Tag spend limit](screenshots/product/screenshot-18.png)

![19 Buy usage credits](screenshots/product/screenshot-19.png)

## 7. Access Bundle：可复用能力包（20–23）

### 7.1 Workspace 绑定 Bundle（20）

Workspace Scope 可挂载名为 `Slack default` 的 Bundle；Bundle 名称与 `Default Slack access` 根 Scope 是两个不同概念。

![20 Workspace bundle binding](screenshots/product/screenshot-20.png)

### 7.2 Bundle 内部结构（21）

Access Bundle 弹窗有五个页签：Credentials、Repositories、Domains、Plugins、Instructions。Credentials 页可连接 Asana、Datadog、GitLab 等系统，也可 Connect another app。

底部 `used in 1 place` 表明 Bundle 是独立资源，可绑定到多个 Scope，而不是 Scope 内嵌的一次性配置。

![21 Access bundle tabs](screenshots/product/screenshot-21.png)

### 7.3 频道继承与追加（22）

频道既显示继承的 Bundle，也允许添加频道专属 Bundle。Custom instructions 与 Access Bundle 是并列配置：前者绑定“地点”，后者绑定“能力”。

![22 Channel inherited bundle](screenshots/product/screenshot-22.png)

### 7.4 Repository Grant（23）

`Matrix info` Bundle 的 Repositories 页允许连接 GitHub Organization，并决定可用 Repo。界面提醒 Personal GitHub installation 不显示在组织 Bundle 中。

![23 Bundle repositories](screenshots/product/screenshot-23.png)

## 8. GitHub Agent Identity 与 Repository 授权（24–31）

### 可确认步骤

1. Organization settings → GitHub 显示组织安装和个人安装两个入口（24–25）。
2. 在 Bundle 的 Repositories 页连接已安装的 GitHub Organization（26）。
3. 在频道中要求 Claude 查询 `Tank` Repo 的 Issue（27）。
4. Claude 用 👀 表示接单，在 Thread 中展示进度，最后返回 Open/Closed Issue 汇总（31）。

### 架构含义

- GitHub Organization Installation 是 Identity/授权基础设施。
- Repo Grant 进入 Access Bundle。
- Bundle 绑定 Channel Scope 后，Session 才能解析出最终 Repo 权限。
- 频道任务中的提交和 PR 归因于 Claude GitHub App，而不是发起人个人账号。

![24 GitHub organization installation](screenshots/product/screenshot-24.png)

![25 Personal GitHub installation](screenshots/product/screenshot-25.png)

![26 Connect GitHub org to bundle](screenshots/product/screenshot-26.png)

![27 Ask Claude to inspect issues](screenshots/product/screenshot-27.png)

## 9. Audit 与文件化 Channel Memory（28–30）

Audit 页面有三个明确页签：

| 页签 | 真实界面显示 |
|---|---|
| Scheduled work | Name、Scope、Schedule、Status、Last run、Next run |
| Memory | 按 Slack → Workspace → Channel 浏览 Memory 文件 |
| Network events | 对外网络事件导出/查看入口 |

Memory 界面显示 `Files Claude has saved to this silo's memory`，支持查看、编辑、删除。`tank-core` 下有三份 Markdown：`MEMORY.md`、`tank-repo.md`、`canvas-tab-limitation.md`；`MEMORY.md` 作为 Channel Memory Index 链接到项目和约定。

这证明 Memory 与 Thread Session 分离，并且是可治理的文件结构；截图没有证明底层一定使用 Vector DB、Redis 或其他特定存储。

![28 Audit tabs](screenshots/product/screenshot-28.png)

![29 Memory scopes](screenshots/product/screenshot-29.png)

![30 Memory Markdown files](screenshots/product/screenshot-30.png)

![31 GitHub issue result](screenshots/product/screenshot-31.png)

## 10. Google Credential / OAuth 与频道能力组合（32–35）

这组截图展示为一个 Bundle 增加 Google/Gmail Credential：

- 建立 OAuth Client 或服务账号相关配置。
- 选择 Gmail read-only、compose、modify 等 Scope。
- 完成 OAuth 授权。
- Channel 的 Access summary 最终显示 Gmail、Google Calendar、Google Drive，并与 GitHub Repository 权限组合。

关键点不是“频道关联 Gmail”，而是：频道关联 Access Bundle，Bundle 内再包含 Google Credential 及其 OAuth Scope。

![32 OAuth client setup](screenshots/product/screenshot-32.png)

![33 Gmail credential scopes](screenshots/product/screenshot-33.png)

![34 Google OAuth consent](screenshots/product/screenshot-34.png)

![35 Resolved multi-system access](screenshots/product/screenshot-35.png)

## 11. Slack Thread 与只读 Claude Web Session（36–38）

Slack 回复中的 Session 入口打开 Claude Web 的只读运行记录：中心展示 Session 对话，右侧显示 Background task 的实时步骤；任务可访问 Slack 上传的报告、Gmail 等工具。该页面不能继续对话，补充和纠偏必须回到原 Slack Thread。

可确认：

- Slack Thread 与可打开的 Working Session Trace 对应。
- Web Trace 只读；Slack Thread 才是多人 Steering 与继续执行的协作入口。
- 长任务异步运行，并有进度/工具透明度。
- Session 能使用该频道解析出的连接。

不可确认：

- Claude Tag 是否直接使用公开 Claude Managed Agents API。
- 其内部 Orchestrator、Checkpoint 和 Memory 的具体存储技术。

![36 Open web session](screenshots/product/screenshot-36.png)

![37 Background task](screenshots/product/screenshot-37.png)

![38 Tool execution detail](screenshots/product/screenshot-38.png)

## 12. Calendar / Meeting 端到端演示（39–42）

视频展示了 Google Meet、Calendar 事件、Agenda，以及回到 Slack 的后续操作。可以将其视作“多连接组合后完成跨系统工作”的场景证据；但截图不足以确认会议加入、录制、转写和 Drive 写入分别由哪个组件完成，不能反推底层技术架构。

![39 Google Meet scenario](screenshots/product/screenshot-39.png)

![40 Calendar agenda](screenshots/product/screenshot-40.png)

![41 Meeting landing page](screenshots/product/screenshot-41.png)

![42 Slack follow-up](screenshots/product/screenshot-42.png)

## 13. 从截图得到的产品架构修正

| 旧抽象 | 截图复核后的修正 |
|---|---|
| 每频道一个 Team Agent Profile | 同一个 Claude Tag + 每频道一个 Scope Overlay |
| Scope 统一“覆盖” | 标量继承覆盖；Bundle/Repo/Plugin/Instruction 多数累加；Credential 冲突按最窄 Scope 胜出 |
| Connector 直接挂频道 | Access Bundle 先组合 Credential/Repo/Domain/Plugin/Instruction，再绑定 Scope |
| Workspace Memory + Channel Memory 简单父子继承 | 公共频道共享 Workspace Store；私有频道只读 Workspace、写私有 Store；无组织级 Memory |
| 后台已有全链路审计 | 后台主要是 Scheduled work、Memory、Network events；逐动作归因还要拼 Slack Thread 和外部系统日志 |
