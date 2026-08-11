# Z Tag 配置 Demo 产品方案（Claude Tag 对标版）

> 状态：v0.1，待产品确认。确认后再启动独立 subagent Review；Review 通过后进入技术方案，不提前开发。

## 1. Demo 要回答什么

首版不是做一个完整 Agent Builder，也不是把 Claude Tag 所有后台页面复刻一遍。它只验证一个核心命题：

> 管理员能否把组织级 Agent 的能力、身份与行为，按 Default → Workspace → Channel 配置，并清楚解释某个频道最终为什么拥有这些权限。

Demo 需要让评审者在 3–5 分钟内看懂三件事：

1. Channel 不是绑定一个全新的 Agent，而是在同一个组织级 Agent 上增加 Scope Overlay。
2. Access Bundle 是可复用能力包，不是一次性 Connector 配置。
3. Effective Access 必须显示最终结果及来源，尤其是 Credential 冲突、继承和安全边界。

## 2. 目标用户与演示场景

### 核心用户

- Owner / IT 管理员：创建 Access Bundle、绑定 Scope、控制模型、环境、网络和高风险权限。
- Channel Admin：查看频道生效配置，维护本频道 Instructions 与自动回复策略。
- 普通频道成员：只看到连接摘要，在 Thread 中使用配置后的 Agent。

### 固定演示故事

管理员要让 #agent-platform 频道使用 Z Tag 完成工程协作：

- 继承组织级 company-docs-readonly。
- 继承 Workspace 级 engineering-base。
- 仅在该频道增加 agent-platform-write。
- 新 Bundle 内配置一个工程系统 Connection、一个 GitHub Repository、一个 Plugin 和一组 Instructions。
- 保存后查看 Effective Access 与来源，再从模拟频道发起一个新 Thread 验证。

演示数据使用合成账号和脱敏 Secret，不接入真实 Credential。

## 3. 设计原则

- **深度参考 Claude Tag，不做像素级冒充**：保留 Scope Tree、Access Bundle、Configure、Access Summary 等核心模式，品牌使用 Z Tag。
- **先解释生效结果，再暴露配置复杂度**：频道详情首屏先给 Effective Access，编辑操作按需展开。
- **Inherited 与 Direct 必须可区分**：任何配置都显示来源 Scope；不能只给最终列表。
- **安全限制是产品对象**：Host、Path、Method、Repo 权限、Environment 网络等级均可见，不能藏在说明文字里。
- **配置对新 Thread 生效**：保存后明确提示已运行 Thread 保持启动快照；Credential 撤销与轮换立即生效。
- **核心路径全部可操作**：首版主流程不能出现无响应按钮；非核心模块用只读预览或明确的 Coming next。

## 4. Demo 信息架构

~~~text
Admin settings
├── Z Tag
│   ├── Access & scopes          # 核心
│   ├── Access bundles           # 核心
│   ├── Audit logs               # 只读预览
│   └── Memory & routines        # 只读预览
├── Usage                        # 只读预览
└── Channel preview              # 核心验证入口
~~~

核心页面只有五个：

| 页面 | 主要任务 | Demo 深度 |
|---|---|---|
| Access & scopes | 浏览 Default / Workspace / Channel，编辑行为配置，绑定 Bundle | 完整交互 |
| Scope detail | 查看 Direct、Inherited、Effective Config 与来源 | 完整交互 |
| Access bundle editor | 配 Credentials、Repositories、Domains、Plugins、Instructions | 完整交互 |
| Connection editor | 配 Credential type、Allowed hosts、Path、HTTP method | 完整交互 |
| Channel preview | 用新 Thread 验证配置快照和可用能力 | 确定性模拟 |

Audit、Memory、Routine、Usage 只用于说明完整产品边界，不进入首版核心流程。

## 5. 核心流程

~~~mermaid
flowchart LR
    A["选择 #agent-platform"] --> B["查看继承配置"]
    B --> C["新建 Access Bundle"]
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

### Step 2：创建 Access Bundle

点击 + Add bundle，选择 Create new bundle，命名：

- Name：agent-platform-write
- Description：允许 Agent 平台频道读取工程资料、写入指定仓库并操作测试环境工单。

Bundle 编辑器使用五个 Tab：

1. Credentials
2. Repositories
3. Domains
4. Plugins
5. Instructions

底部持续显示 Used in N places 与未保存状态。

### Step 3：配置 Connection

在 Credentials 中选择 Custom tool，填写：

- Connection name：Issue Tracker Staging
- Credential type：Bearer
- Secret：掩码显示，只保留最后四位
- Allowed host：api.staging.example.com
- Allowed path：/tickets/*
- HTTP methods：GET、POST
- Explicitly blocked：DELETE

页面实时生成 Policy Preview：

~~~text
Credential injected only when
host = api.staging.example.com
AND path starts with /tickets/
AND method in [GET, POST]
~~~

校验状态：

- Host 为空：不能保存。
- 同 Scope 出现同 Host 的多个 Credential：强警告并阻止提交。
- Public Channel + Write Credential：绑定时二次确认。
- Secret 不回显、不出现在 Access Summary。

### Step 4：配置 Repository、Plugin、Instructions

- Repository：hongliang-zhang/z-tag-by-managed-agent
- Permission：Read & write
- Plugin：GitHub / Engineering workflow
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

### Step 6：查看 Effective Access

Access Summary 不是普通清单，而是可解释结果：

| 能力 | 最终值 | 来源 | 解析规则 |
|---|---|---|---|
| Docs connection | Read-only | Default access | Inherited |
| Engineering plugin | Enabled | Workspace | Union |
| Issue Tracker credential | Bearer · host/path/method restricted | #agent-platform | Direct |
| GitHub repo | Read & write | #agent-platform | Union |
| Model | GLM-5 | Workspace | Last non-null wins |
| Instructions | Root → Workspace → Channel → Bundle | 多来源 | Ordered concat |

点击任一项可展开 Provenance，例如：

~~~text
GitHub / hongliang-zhang/z-tag-by-managed-agent / Read & write
← agent-platform-write
← #agent-platform
~~~

如果同 Host 在 Workspace 与 Channel 都存在 Credential：

- 使用 Channel Credential。
- 标注 Narrowest scope wins。
- 明确 401/403 不回退。

### Step 7：Channel Preview

点击 Preview in channel 打开模拟频道：

- 发送：@Z Tag 检查这个仓库当前的配置方案，并创建一条测试工单。
- 自动创建新 Thread。
- 展示接单状态与动态 Checklist。
- 侧边详情显示本 Thread 的 Config Snapshot：
  - Channel Scope
  - Effective Bundles
  - Model / Environment
  - Repository grant
  - Connection policy
- 最终结果固定返回一条模拟工单和一个模拟 PR 链接。
- Thread 中第二位成员可以追加指令，体现共享 Session；不实现真实 LLM 调用。

## 6. 关键状态与交互

| 状态 | 页面表现 |
|---|---|
| Inherited | 灰色标签，展示来源 Scope，不可在本级直接删除 |
| Direct | 强调色标签，可在本级解绑或编辑 |
| Overridden | 显示旧值、当前值与覆盖来源 |
| Conflict | 红色警告；同 Scope 同 Host Credential 阻止保存 |
| Unsaved | 页面顶部和底部同时提示；离开时二次确认 |
| Saved | Toast + Effective Access 重新计算 |
| New-thread-only | 保存后提示“新 Thread 生效” |
| Secret rotated/revoked | 立即作用于所有 Session，不等待新 Thread |
| Public + elevated write | 绑定前风险确认 |
| Read-only member | 可看 Connections 与 Instructions，隐藏 Secret 和编辑入口 |

## 7. 权限边界

### Human → Agent

- Owner：管理所有 Scope、Bundle、Credential、Repository、Environment。
- Admin：编辑已有 Bundle 的 Connection / Domain；是否可创建 Bundle，具体范围按产品策略配置。
- Channel Admin / Member：仅在允许时编辑本频道 Instructions 与 Respond automatically。
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
- Instructions 有稳定拼接顺序。
- Connection 支持 Host / Path / HTTP Method。
- Scope 可选 Model、Environment、自动回复与 Allow rules。
- Config 对新 Thread 生效。
- Channel Configure 页可看 Connections、改 Instructions/自动回复（受权限控制）。

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

1. 用户无需阅读说明，可在 3–5 分钟完成“创建 Bundle → 绑定频道 → 验证新 Thread”。
2. Scope 的继承、覆盖、累加和拼接规则在 UI 中计算正确。
3. 每项 Effective Access 都能追溯到 Bundle 与 Scope。
4. Connection 的 Host / Path / Method 会影响 Policy Preview 和最终权限摘要。
5. 同 Scope 同 Host Credential 冲突会被阻止；跨 Scope 冲突展示最窄 Scope 胜出。
6. Public Channel 绑定写权限 Bundle 会出现风险确认。
7. Secret 始终掩码，不进入摘要、日志或模拟 Session。
8. 核心流程没有无响应按钮；非核心模块明确只读或 Coming next。
9. Channel Preview 展示新 Thread 的配置快照，并支持第二位成员追加一次 Steering。
10. 桌面端 1280–1600 px 下布局稳定，核心信息不横向溢出。

## 11. 本轮需要确认的产品决策

若无特别修改，默认采用粗体方案：

| 决策 | 默认方案 | 备选 |
|---|---|---|
| 产品品牌 | **Z Tag，对标 Claude Tag** | 完全复刻 Claude Tag 名称 |
| Demo 范围 | **配置控制面 + Channel Preview 验证** | 只做配置后台 |
| 渠道形态 | **Slack 风格的模拟频道** | 首版直接换成飞书风格 |
| 运行方式 | **纯前端确定性模拟，不接真实 Credential/Agent** | 接真实 Managed Agent |
| 配置主角 | **Channel Scope + Access Bundle** | 完整 Onboarding / Pair workspace |
| 非核心模块 | **保留导航，只读预览** | 首版全部隐藏 |

## 12. 后续门禁

1. 用户确认本产品方案。
2. 启动独立 subagent，对产品完整性、Claude Tag 对标准确性、交互闭环和过度设计做 Review。
3. 修正并确认产品方案。
4. 编写技术方案。
5. 启动第二个独立 subagent，对状态模型、前端架构、模拟层、测试与安全边界做 Review。
6. 两轮 Review 无阻塞项后，才开始构建 Demo。
