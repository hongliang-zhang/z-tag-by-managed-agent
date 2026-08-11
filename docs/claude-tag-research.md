# Claude Tag 深度拆解

## 1. 一句话定义

Claude Tag 不是“把 Managed Agent 接入 Slack”，而是一层面向团队协作的 Agent 产品：

> Claude Tag = 渠道原生交互 + 多人共享 Session + 团队上下文与记忆 + Agent Identity + 主动工作 + 企业治理 + Agent Runtime

Claude Managed Agents 主要解决“一个 Agent 如何持续、异步、安全地执行任务”；Claude Tag 主要解决“一个 Agent 如何成为团队成员，被多人共同使用，理解频道上下文，并接受组织权限与成本治理”。

## 2. 产品边界

截至研究快照日期，Claude Tag 面向 Claude Team、Enterprise，并以 Slack 作为主要团队交互入口：

- 团队成员在频道中 `@Claude` 分配任务。
- 同一频道的成员共同使用该频道配置下的 Claude。
- 每个 Slack Thread 对应一个共享 Session，频道成员可以持续补充和纠偏。
- Claude 可以读取允许范围内的频道上下文，调用管理员配置的工具，异步执行并将结果返回 Thread。
- 频道内采用组织级 Agent Identity；DM 更偏向个人 Claude 身份和个人连接器。
- 团队可配置记忆、定时任务、监听与订阅，让 Agent 主动工作。

Claude Tag 不是一个始终占用计算资源的常驻进程。真正持久化的是 Thread 与 Session 映射、执行记录、团队记忆、Routine 配置和外部产物；执行环境可按需创建、空闲释放、收到新消息后恢复。

## 3. 核心用户

| 用户 | 核心诉求 | 典型行为 |
|---|---|---|
| 普通团队成员 | 不复制上下文，直接把工作交出去 | 查资料、分析、写文档、改代码 |
| 项目或频道负责人 | 让 Agent 持续维护一块工作 | 跟踪项目、催审批、整理待办、周期汇报 |
| 业务团队 | 跨系统获取信息并执行动作 | 查 CRM、拉指标、处理工单、准备客户会议 |
| IT / AI 管理员 | 控制 Agent 能看什么、做什么 | 配置频道、工具、账号、模型和权限 |
| 安全与合规 | 权限不外溢、操作可审计可撤销 | 审计网络调用、外部写操作与服务账号日志 |
| 财务与运营 | 控制成本并理解使用情况 | 设置组织和频道限额、告警、分析用量 |

## 4. 场景分层

Claude Tag 的价值不是场景平铺，而是从“理解团队工作”逐步升级为“持续负责团队工作”。

| 层级 | Agent 承担的工作 | 例子 | 核心依赖 |
|---|---|---|---|
| L1 理解频道 | 总结、检索、梳理 | 本周完成了什么，还有什么未决策 | 频道上下文 |
| L2 跨系统取数 | 查询资料和业务数据 | 拉取近 7/28 天客户消费与转化 | 连接器、数据权限 |
| L3 执行动作 | 创建或修改外部对象 | 建工单、写文档、提交 PR | Agent Identity、写权限 |
| L4 持续负责 | 监听并主动处理 | 监控告警、追踪审批、周期汇报 | Memory、Routine、事件触发 |

典型场景包括：

- 频道与项目总结：汇总进展、决策、风险和待办。
- 数据分析：跨数据仓库、文档和业务系统取数，产出图表与结论。
- 文档与工单：创建文档、维护工单、同步项目状态。
- 客户与销售协作：准备客户会议、查询 CRM、持续追踪后续动作。
- 工程协作：分析告警、定位 Bug、创建或更新 PR。
- 主动工作：监听频道和外部事件，发现阻塞后主动提醒相关成员。

## 5. 产品架构

### 5.1 渠道交互层

主要入口可以分成三类：

- 频道 `@Claude`：组织身份、组织工具、组织付费。
- Thread：一个任务对应一个共享 Session，多人共同指导。
- DM / Assistant Panel：个人身份、个人连接器、个人额度。

用户侧需要看到：

- 已接单与当前状态。
- 动态 Checklist 和执行进度。
- 中途补充、纠偏和打断入口。
- 权限确认与敏感操作审批。
- 文件、图表、网页、PR 等结果。
- 完整 Session 与工具调用记录。
- 频道配置和反馈入口。

### 5.2 团队协作层

这是团队 Agent 与普通聊天 Bot 的核心差异：

- `Channel + Thread ↔ Agent Session` 稳定绑定。
- 多人向同一 Session 追加指令和上下文。
- 任务过程、确认和结果在 Thread 中公开沉淀。
- Session 空闲释放后仍可恢复。
- Agent 可主动 `@人`、提醒阻塞、报告任务完成。
- 正确处理消息编辑、删除、并发回复和渠道重试语义。

### 5.3 Scope 配置层

团队级配置需要支持层级继承：

```text
组织默认
└── Workspace
    └── Channel
```

每层可配置并继承：

- 模型与执行环境。
- Custom Instructions。
- Skill、Plugin、Tool / MCP。
- Access Bundle 与服务账号。
- 自动回复和主动工作策略。
- 风险规则、预算和版本开关。

频道配置可覆盖 Workspace 配置；未设置项继续继承父级。每次任务应保存“有效配置快照”，避免运行过程中配置变化导致审计不可还原。

### 5.4 团队上下文与记忆层

一次任务可能同时使用四类上下文：

- 当前 Thread 消息。
- 当前频道历史、置顶内容和文件。
- Workspace 搜索结果。
- 持久化团队 Memory。

推荐的记忆边界：

| 工作位置 | 可读取 | 默认写入 |
|---|---|---|
| 公共频道 | Workspace 公共记忆 + 本频道记忆 | 频道记忆；经治理后可晋升为 Workspace 记忆 |
| 私有频道 | Workspace 公共记忆 + 本私有频道记忆 | 私有频道记忆 |
| DM | 个人上下文与个人记忆 | 个人记忆，与团队记忆隔离 |

团队记忆属于组织和频道，而不是某个任务发起人；成员需要能够查看、纠正和删除，管理员需要能够审查来源和版本。

### 5.5 主动工作层

Claude Tag 将持续性任务抽象为 Routine，可能覆盖：

- Cron 定时任务。
- 频道监听。
- 周期巡检。
- PR、工单、监控等状态订阅。
- Webhook / 外部事件触发。
- 发现阻塞后主动 `@人`。

Routine 应沿用所属频道的连接器、权限、记忆、预算与审计归属。

### 5.6 企业治理层

企业级产品至少需要：

- Workspace 配对和安装授权。
- 成员使用权限与 Enterprise RBAC。
- 公共、私有、访客、外部共享频道策略。
- 组织、Workspace、Channel 级配置与禁用能力。
- 组织总限额、频道限额和阈值告警。
- 频道级用量和成本分析。
- Routine、Memory、网络调用和外部操作审计。
- 数据保留、导出与删除。

## 6. 技术架构

一次频道请求的典型链路：

1. Channel Event Gateway 接收 Mention、Thread Reply、Command、Channel Event。
2. Tenant Resolver 解析组织、Workspace、Channel、Thread 和成员身份。
3. Scope Engine 计算本次任务的有效配置，并生成版本快照。
4. Thread Router 查询 `Channel Thread ID → Agent Session ID`：新 Thread 创建 Session，已有 Thread 追加事件。
5. Context Service 注入 Thread、频道历史、Workspace 搜索结果和 Memory。
6. Agent Runtime 在隔离环境内执行规划、代码、文件和工具调用。
7. 外部请求经过 Credential / Policy Gateway：校验 Host、Path、Method 与风险策略，在出口动态注入服务账号凭证。
8. Event Bridge 将 Checklist、状态、确认请求和结果流式回传渠道。
9. Memory、Audit、Usage Ledger 分别记录组织知识、完整操作链路与成本。

### 6.1 安全关键点

- Credential 不应进入模型上下文和 Sandbox，而应在受控网络出口动态注入。
- 外部网络默认拒绝，只允许命中 Host / Path / Method 策略的请求。
- 所有外部操作同时记录请求者、频道、Session、Agent Identity 和外部对象。
- 高风险写操作需要请求者权限校验或即时审批，不能只依赖共享服务账号。

## 7. Claude Tag 与 Managed Agent 的边界

| 能力 | 团队产品层（Tag） | 执行底座（Managed Agent） |
|---|---|---|
| 交互对象 | 组织、频道、Thread、成员 | Agent、Session、Run |
| 上下文 | 频道历史、团队搜索、成员关系 | Prompt、Session Context、工具结果 |
| 身份 | 请求者身份、团队 Agent Identity | Runtime Credential / Vault 原语 |
| 协作 | 多人 Steering、公开进度、主动 @人 | Steer、Interrupt、Event Stream |
| 主动任务 | 频道监听、业务订阅、Routine 管理 | Cron、Webhook、Scheduled Run |
| 治理 | RBAC、频道策略、成本与审计 | Session Budget、运行 Trace、环境隔离 |

因此，Managed Agent 是必要底座，但不会自动长出团队协作产品。

