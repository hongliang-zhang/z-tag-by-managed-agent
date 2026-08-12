# Z Tag 配置 Demo 产品方案（Claude Tag 对标版）

> 状态：v0.2，产品方案已确认并完成独立 Review。Review 结论为 `pass with changes`；P0 问题已关闭，可进入技术方案。

## 1. Demo 要回答什么

首版不是做一个完整 Agent Builder，也不是把 Claude Tag 所有后台页面复刻一遍。它只验证一个核心命题：

> 管理员能否把组织级 Agent 的能力、身份与行为，按 Default → Workspace → Channel 配置，并清楚解释某个频道最终为什么拥有这些权限。

Demo 需要让评审者在 3–5 分钟内看懂三件事：

1. Channel 不是绑定一个全新的 Agent，而是在同一个组织级 Agent 上增加 Scope Overlay。
2. Access Bundle 是可复用能力包，不是一次性 Connector 配置。
3. Effective Access 必须显示最终结果及来源，尤其是 Credential 冲突、继承和安全边界。

## 2. 目标用户与演示场景

### 核心用户

- Owner / IT 管理员：首版唯一主视角；创建 Access Bundle、绑定 Scope、控制模型、环境、网络和高风险权限。
- Admin：次要只读/受限编辑视角；可维护已有 Bundle 的 Credentials 与 Domains，不能创建或绑定 Bundle。
- Channel member：在未被 Block 时维护本频道 Instructions，并在 Thread 中使用 Agent；首版不单独虚构 `Channel Admin` 角色。

### 固定演示故事

管理员要让 #agent-platform 频道使用 Z Tag 完成工程协作：

- 继承组织级 company-docs-readonly。
- 继承 Workspace 级 engineering-base，其中已有 `api.staging.example.com` 的只读 Credential。
- 仅在该频道增加 agent-platform-write。
- 新 Bundle 内配置同 Host、权限更窄且可写的工程系统 Connection，以及一个 GitHub Repository、一个 Engineering Workflow Plugin 和一组 Instructions。
- 保存后查看 Effective Access 与来源，再从模拟频道发起一个新 Thread 验证。

演示数据使用合成账号和合成 Secret，不接入真实 Credential。合成 Secret 只短暂存在于未保存表单中；保存后只显示 `Configured`，不显示原值或尾号。

## 3. 设计原则

- **深度参考 Claude Tag，不做像素级冒充**：保留 Scope Tree、Access Bundle、Configure、Access Summary 等核心模式，品牌使用 Z Tag。
- **先解释生效结果，再暴露配置复杂度**：频道详情首屏先给 Effective Access，编辑操作按需展开。
- **Inherited 与 Direct 必须可区分**：任何配置都显示来源 Scope；不能只给最终列表。
- **安全限制是产品对象**：Host、Path、Method、Repository grant、Environment 网络等级均可见，不能藏在说明文字里。
- **快照与实时策略分开**：Skills、Plugins、Instructions、Repository grant 等进入 Thread 启动快照；Connection、Domain 和 Credential 状态按请求实时执行。
- **核心路径全部可操作**：首版主流程不能出现无响应按钮；非核心模块用只读预览或明确的 Coming next。
- **演示优先但不造假**：Demo mode 预填合成数据、保留真实状态变化与 Resolver 计算，不把静态截图伪装成交互。

## 4. Demo 信息架构

~~~text
Admin settings
├── Z Tag
│   ├── Access & scopes          # 核心
│   ├── Access bundles           # 核心
│   ├── Audit                    # 只读预览
│   └── Memory & routines        # 只读预览
├── Usage                        # 只读预览
└── Channel preview              # 核心验证入口
~~~

核心交互面只有四个；Scope detail 是 Access & scopes 的右侧面板，不作为独立一级页面：

| 页面 | 主要任务 | Demo 深度 |
|---|---|---|
| Access & scopes | 浏览 Default / Workspace / Channel，编辑行为配置，绑定 Bundle | 完整交互 |
| Access bundle editor | 配 Credentials、Repositories、Domains、Plugins、Instructions | 完整交互 |
| Connection editor | 配 Credential type、Allowed hosts、Path、HTTP method | 完整交互 |
| Channel preview | 用新 Thread 验证 Session snapshot 与 Live access policy | 确定性有状态模拟 |

Audit、Memory、Routine、Usage 只用于说明完整产品边界，不进入首版核心流程。

## 5. 核心流程

~~~mermaid
flowchart LR
    A["选择 #agent-platform"] --> B["查看继承配置"]
    B --> C["在 Bundle Library 新建未绑定 Bundle"]
    C --> D["配置 Connection / Repo / Plugin / Instructions"]
    D --> E["绑定到 Channel Scope"]
    E --> F["查看 Effective Access + Provenance"]
    F --> G["新 Thread 验证"]
~~~

### Step 1：选择 Channel Scope

左侧 Scope Tree：

~~~text
Default access
└── Zhipu Workspace
    ├── #general
    ├── #agent-platform
    └── #customer-support
~~~

选择 #agent-platform 后，右侧展示：

- Channel 状态：Public。
- Z Tag version：Inherited · New。
- Default model：Inherited · GLM-5。
- Environment：Inherited · Team Sandbox。
- Respond automatically：Off。
- Channel member edits：Allow。
- Access bundles：2 Inherited，0 Direct。
- Effective Access Summary：按 Connections、Repositories、Domains、Plugins、Instructions 分类。

### Step 2：在 Bundle Library 创建未绑定 Bundle

从左侧 Access bundles 进入全局 Bundle Library，点击 Create，创建一个尚未绑定 Scope 的 Bundle：

- Name：agent-platform-write
- Description：允许 Agent 平台频道读取工程资料、写入指定仓库并操作测试环境工单。

Bundle 编辑器使用五个 Tab：

1. Credentials
2. Repositories
3. Domains
4. Plugins
5. Instructions

底部持续显示 Used in 0 places 与未保存状态。这样主流程能明确演示：Bundle 是独立可复用对象，Scope binding 是另一层关系。

Demo mode 默认开启：名称、描述和每个 Tab 的合成数据已预填，演示者只需核对 Host、Path、Method、Repository 和绑定结果；关闭 Demo mode 后仍可完整编辑。

### Step 3：配置 Connection

在 Credentials 中选择 Custom tool，填写：

- Connection name：Issue Tracker Staging
- Credential type：Bearer
- Secret：使用合成值完成本次未保存表单；保存后字段消失，仅显示 Configured、Credential type、Rotate、Delete
- Allowed host：api.staging.example.com
- Allowed path prefix：/tickets/
- HTTP methods：GET、POST
- Blocked methods：由 Allowed methods 反向推导；DELETE 不作为独立配置字段

页面实时生成 Policy Preview：

~~~text
Credential injected only when
host = api.staging.example.com
AND path starts with /tickets/
AND method in [GET, POST]
~~~

校验状态：

- Host 为空：不能保存。
- 同 Scope 出现同 Host 的多个 Credential：显示 Z Tag safety enhancement 警告并阻止提交；Claude Tag 官方仅建议避免这种配置，没有确认阻止保存。
- Public Channel + elevated Credential：绑定时触发 Z Tag safety enhancement 二次确认。
- Secret 不回显、不出现在 Access Summary。

### Step 4：配置 Repository、Plugin、Instructions

- Repository：hongliang-zhang/z-tag-by-managed-agent
- Repository grant：Selected repository
- Capability：只读说明“可读取仓库、创建分支并打开 PR”，不提供未被证实的 Read / Write 权限下拉
- Plugin：Engineering Workflow
- Bundle Instructions：
  - 修改前先读取 README.md。
  - 只向新分支提交，不直接覆盖默认分支。
  - 创建 PR 后回帖链接。

Domain Tab 可增加无凭证 Host，例如 docs.example.com:443，并明确它不会携带 Credential。

### Step 5：绑定到 Channel Scope

保存 Bundle 后返回 #agent-platform：

- 在 Access bundles 中绑定 agent-platform-write。
- 显示来源标签：Direct · #agent-platform。
- 原有两个 Bundle 保持 Inherited。
- 页面提示：Skills、Plugins、Instructions 与模型变更对新 Thread 生效；已运行 Thread 保持快照。
- 页面同时提示：Connection、Domain 与 Credential 状态按每次请求实时执行；新 Connection 在旧 Thread 中可用，但需要在 Thread 中按名称提示 Agent 使用。

### Step 6：查看 Effective Access

Access Summary 不是普通清单，而是可解释结果：

| 能力 | 最终值 | 来源 | 解析规则 |
|---|---|---|---|
| Docs connection | Read-only | Default access | Inherited |
| Engineering plugin | Enabled | Workspace | Union |
| Issue Tracker credential | Channel Bearer · `/tickets/` · GET/POST | #agent-platform | Narrowest scope wins |
| GitHub repo | Selected repository | #agent-platform | Union |
| Model | GLM-5 | Workspace | Last non-null wins |
| Scope instructions | Default → Workspace → Channel | 多来源 | Ordered concat |
| Bundle instructions | agent-platform-write | #agent-platform | Enabled with bundle；与 Scope instructions 的相对顺序不冒充 Claude 官方事实 |

保存后先显示本次差异，避免演示者重新扫描整张 Summary：

~~~text
Effective access changes
+ Issue Tracker connection
+ hongliang-zhang/z-tag-by-managed-agent
+ Engineering Workflow plugin
~ api.staging.example.com credential: Workspace → Channel
~~~

点击任一项可展开 Provenance，例如：

~~~text
 GitHub / hongliang-zhang/z-tag-by-managed-agent
← agent-platform-write
← Direct binding
← #agent-platform scope
~~~

如果同 Host 在 Workspace 与 Channel 都存在 Credential：

- 使用 Channel Credential。
- 标注 Narrowest scope wins。
- 明确 401/403 不回退。
- 可切换 Credential revoked / 403 场景，模拟验证不会回退到 Workspace Credential。

### Step 7：Channel Preview

点击 Preview in channel 打开模拟频道：

- 发送：@Z Tag 检查这个仓库当前的配置方案，并创建一条测试工单。
- 自动创建新 Thread。
- 展示接单状态与动态 Checklist。
- 侧边详情拆为两区，避免把启动快照与动态安全策略混为一谈：
  - Session snapshot：
    - Channel Scope
    - Effective Bundles
    - Model / Environment
    - Repository grant
    - Skills / Plugins / Instructions
  - Live access policy：
    - 当前 Connection Host / Path / Method
    - Credential status：Configured / Revoked
    - Domain 与默认拒绝结果
- 最终结果固定返回一条模拟工单和一个模拟 PR 链接。
- Thread 中第二位成员可以追加指令，体现共享 Session；不实现真实 LLM 调用。
- 提供只读 Open session 入口，展示运行 Trace；继续指导仍必须回原模拟 Thread。

## 6. 关键状态与交互

| 状态 | 页面表现 |
|---|---|
| Inherited | 灰色标签，展示来源 Scope，不可在本级直接删除 |
| Direct | 强调色标签，可在本级解绑或编辑 |
| Overridden | 显示旧值、当前值与覆盖来源 |
| Conflict | 红色警告；同 Scope 同 Host Credential 作为 Z Tag enhancement 阻止保存 |
| Unsaved | 页面顶部和底部同时提示；离开时二次确认 |
| Saved | Toast + Effective Access 重新计算 |
| New-thread-only | 保存后提示“新 Thread 生效” |
| Secret rotated/revoked | 立即作用于所有 Session，不等待新 Thread |
| Public + elevated write | 绑定前风险确认 |
| Saved credential | 只显示 Configured、Credential type、Rotate、Delete；永不显示 Secret 或尾号 |
| Empty bundle | 引导添加能力；不能进入绑定主路径 |
| No direct config | 显示“全部继承”，不把空状态误判为未配置 |
| Loading failed | 保留上次可解释结果，显示 Retry，不静默清空 |
| Read-only member | 可看 Connections 摘要与 Instructions，隐藏 Secret 和管理入口 |

## 7. 权限边界

### Human → Agent

- Owner：管理所有 Scope、Bundle、Credential、Repository、Environment。
- Admin：编辑已有 Bundle 的 Credentials / Domains，其他 Bundle Tab 只读；不能创建、重命名、删除或绑定 Bundle。
- Channel member：在 Channel member edits 未被 Block 时编辑本频道 Instructions；不修改 Credential、Repository 或 Bundle binding。
- 普通成员：使用 Agent、查看频道 Connections 摘要。

### Agent → Resource

~~~text
Effective permission
= Agent Identity permission
∩ Effective Scope
∩ Connection Host / Path / Method
∩ Repository grant
∩ Runtime policy
~~~

首版 Demo 只表现 Claude Tag 的共享 Agent Identity 模式。Requester Overlay、JIT Credential 与敏感动作审批作为后续增强，不混入首版主路径。

## 8. 与 Claude Tag 的对标边界

### 必须忠实还原

- Default → Workspace → Channel Scope Tree。
- Bundle 向下累加。
- 同 Host Credential 最窄 Scope 胜出且失败不回退。
- Repo / Plugin 取并集。
- Scope Custom Instructions 按 Default → Workspace → Channel 拼接；Bundle Instructions 单独随 Bundle 生效，不声称两类指令的相对顺序已公开。
- Connection 支持 Host / Path / HTTP Method。
- Scope 可选 Model、Environment、自动回复与 Allow rules。
- Skills、Plugins、Custom Instructions 与 Repository grant 对新 Thread 生效；Connection 与 Domain rules 按请求实时执行。
- Channel Configure 页可看 Connections、改 Instructions/自动回复（受权限控制）。

### Z Tag safety enhancement（不写成 Claude Tag 现状）

- Public Channel 绑定 elevated Bundle 前的风险确认。
- 同 Scope 同 Host Credential 的保存阻断。
- 每项 Effective Access 的完整 Provenance 链路与变更 Diff。
- Connection 编辑器的实时 Policy Preview。
- Requester Overlay、JIT Credential 与敏感动作审批仍是后续增强，不进入首版。

### Demo 的主动简化

- Workspace 已配对，不做真实 Slack OAuth。
- 所有 Secret、Repo、Connection 都是模拟数据。
- 不实现真实 Agent Proxy、Sandbox、Credential 注入。
- 不实现真实 Memory、Routine、Audit export、Usage 计费。
- 不做 DM / Personal Connector。
- 不做多 Agent Definition。
- 不做真实 API 调用；Channel Preview 使用确定性结果。

## 9. 视觉方向

- 品牌：Z Tag，不使用 Claude 商标冒充真实产品。
- 风格：简洁、克制、偏企业后台；暖灰背景、白色内容面板、低饱和强调色。
- 布局：全局侧栏 + Scope Tree + Detail Panel；Bundle 使用大尺寸 Dialog / Drawer。
- 标签：Inherited、Direct、Overridden、Blocked 使用稳定颜色语义。
- 信息密度：首屏先显示结果与风险，复杂字段放在展开区。
- 参考优先级：仓库 42 张真实截图 > 官方文档 > UI Atlas 中 C 级截图 > 自主补全。

## 10. 验收标准

1. Demo mode 下，用户无需阅读说明，可在 3–5 分钟完成“创建未绑定 Bundle → 绑定频道 → 验证新 Thread”。
2. Scope 的继承、覆盖、累加和拼接规则在 UI 中计算正确。
3. 每项 Effective Access 都能追溯到 Bundle 与 Scope。
4. Connection 的 Host / Path / Method 会影响 Policy Preview 和最终权限摘要。
5. 同 Scope 同 Host Credential 冲突会作为 Z Tag 增强被阻止；跨 Scope 冲突真实展示 Channel 胜出与 401/403 不回退。
6. Public Channel 绑定写权限 Bundle 会出现风险确认。
7. Secret 只存在于未保存表单；保存后不回显、不显示尾号，也不进入摘要、日志或模拟 Session。
8. 核心流程没有无响应按钮；非核心模块明确只读或 Coming next。
9. Channel Preview 分开显示 Session snapshot 与 Live access policy，并支持第二位成员追加一次 Steering。
10. 桌面端 1280–1600 px 下布局稳定，核心信息不横向溢出。

## 11. 已确认的产品决策

2026-08-12 已确认采用以下默认方案：

| 决策 | 默认方案 | 备选 |
|---|---|---|
| 产品品牌 | **Z Tag，对标 Claude Tag** | 完全复刻 Claude Tag 名称 |
| Demo 范围 | **配置控制面 + Channel Preview 验证** | 只做配置后台 |
| 渠道形态 | **Slack 风格的模拟频道** | 首版直接换成飞书风格 |
| 运行方式 | **纯前端确定性模拟，不接真实 Credential/Agent** | 接真实 Managed Agent |
| 配置主角 | **Channel Scope + Access Bundle** | 完整 Onboarding / Pair workspace |
| 非核心模块 | **保留导航，只读预览** | 首版全部隐藏 |

## 12. 后续门禁

1. ✅ 用户确认产品方案。
2. ✅ 独立 subagent Review 产品完整性、Claude Tag 对标准确性、交互闭环和过度设计。
3. ✅ 完成 P0/P1 修订；Reviewer 结论 `pass with changes`，无剩余阻塞项。
4. ⏳ 编写技术方案。
5. ⏳ 启动第二个独立 subagent，Review 状态模型、前端架构、模拟层、测试与安全边界。
6. ⏳ 第二轮无阻塞项后开始构建 Demo。

## 13. 第一轮独立 Review 记录

- 结论：`pass with changes`。
- 已关闭 P0：Bundle 创建/绑定重复、Credential write-only、Repository 权限误建模、两类 Instructions 顺序过度确定、Credential 覆盖未进入主故事、Session snapshot 与 Live policy 混用、演示时长不可控。
- 已吸收 P1：Owner 主视角、差异摘要、最小异常集、四层 Provenance、Z Tag 增强独立标记。
- 官方复核依据：[Give Claude access to your tools](https://claude.com/docs/claude-tag/admins/add-connections)、[Configure per-channel access](https://claude.com/docs/claude-tag/admins/attach-to-scope)、[Configure GitHub access](https://claude.com/docs/claude-tag/admins/configure-github)、[How Claude Tag works](https://claude.com/docs/claude-tag/concepts/how-it-works)、[Security and data handling](https://claude.com/docs/claude-tag/concepts/security-and-data)、[Restrict where Claude Tag operates](https://claude.com/docs/claude-tag/admins/restrict-access)。
