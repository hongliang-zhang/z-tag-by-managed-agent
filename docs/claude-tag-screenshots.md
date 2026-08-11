# Claude Tag 产品 UI 图鉴与功能界面拆解

> 研究快照：2026-08-12  
> 目标：尽可能完整地收集和拆解 Claude Tag 的配置后台、Slack 前台、治理后台及相关产品界面，为 Z Tag / Managed Agent 产品设计提供参考。

## 0. 阅读说明

本页同时包含两类内容：

1. **仓库内真实截图**：当前已收录 42 张 Claude Tag 真实产品截图，主要来自公开视频演示。
2. **公开资料确认的 UI / 功能点**：结合 Anthropic 官方文档、官方产品页，以及安全研究与第三方接入文章，按产品模块拆出 120+ 个界面与交互点。

为避免把推断当事实，建议按以下证据等级理解：

- **A｜真实截图可见**：仓库截图、官方截图或公开演示中直接可见。
- **B｜官方文档确认**：公开文档明确描述对应功能，但不一定找到清晰截图。
- **C｜第三方截图/研究确认**：安全研究、集成文档等展示真实产品界面。
- **D｜产品拆解项**：由已确认能力进一步拆出的具体 UI 状态/组件，适合竞品分析，但不代表 Anthropic 对外使用相同命名。

---

# 一、仓库内已有 42 张真实产品截图

> 视频来源：https://www.youtube.com/watch?v=_cdX8xkKj_s&t=179s

**核心概念**：User（your）→ Agent（independent）。

## 1. 已完成配置的 Claude Tag

![Screenshot 1](screenshots/product/screenshot-01.png)

![Screenshot 2](screenshots/product/screenshot-02.png)

![Screenshot 3](screenshots/product/screenshot-03.png)

---

## 2. 未完成配置时

![Screenshot 4](screenshots/product/screenshot-04.png)

![Screenshot 5](screenshots/product/screenshot-05.png)

![Screenshot 6](screenshots/product/screenshot-06.png)

![Screenshot 7](screenshots/product/screenshot-07.png)

![Screenshot 8](screenshots/product/screenshot-08.png)

---

## 3. 配置流程

![Screenshot 9](screenshots/product/screenshot-09.png)

![Screenshot 10](screenshots/product/screenshot-10.png)

![Screenshot 11](screenshots/product/screenshot-11.png)

![Screenshot 12](screenshots/product/screenshot-12.png)

![Screenshot 13](screenshots/product/screenshot-13.png)

![Screenshot 14](screenshots/product/screenshot-14.png)

![Screenshot 15](screenshots/product/screenshot-15.png)

![Screenshot 16](screenshots/product/screenshot-16.png)

![Screenshot 17](screenshots/product/screenshot-17.png)

![Screenshot 18](screenshots/product/screenshot-18.png)

![Screenshot 19](screenshots/product/screenshot-19.png)

![Screenshot 20](screenshots/product/screenshot-20.png)

![Screenshot 21](screenshots/product/screenshot-21.png)

![Screenshot 22](screenshots/product/screenshot-22.png)

![Screenshot 23](screenshots/product/screenshot-23.png)

![Screenshot 24](screenshots/product/screenshot-24.png)

![Screenshot 25](screenshots/product/screenshot-25.png)

![Screenshot 26](screenshots/product/screenshot-26.png)

![Screenshot 27](screenshots/product/screenshot-27.png)

![Screenshot 28](screenshots/product/screenshot-28.png)

---

## 4. Add a GitHub org

![Screenshot 29](screenshots/product/screenshot-29.png)

![Screenshot 30](screenshots/product/screenshot-30.png)

![Screenshot 31](screenshots/product/screenshot-31.png)

![Screenshot 32](screenshots/product/screenshot-32.png)

![Screenshot 33](screenshots/product/screenshot-33.png)

![Screenshot 34](screenshots/product/screenshot-34.png)

![Screenshot 35](screenshots/product/screenshot-35.png)

![Screenshot 36](screenshots/product/screenshot-36.png)

![Screenshot 37](screenshots/product/screenshot-37.png)

![Screenshot 38](screenshots/product/screenshot-38.png)

![Screenshot 39](screenshots/product/screenshot-39.png)

![Screenshot 40](screenshots/product/screenshot-40.png)

![Screenshot 41](screenshots/product/screenshot-41.png)

![Screenshot 42](screenshots/product/screenshot-42.png)

---

# 二、最值得优先收集的真实产品 UI

下面这些页面对理解 Claude Tag 的产品结构价值最高。

| # | 界面 | 主要内容 | 证据 | 参考价值 |
|---|---|---|---|---|
| 1 | Slack Channel 中 `@Claude` 执行任务 | 频道中分配任务、Agent 回复、执行状态、Todo、跳转完整 Session | A/B | ⭐⭐⭐⭐⭐ |
| 2 | Slack Thread 内持续工作 | 同一 Thread 作为共享任务上下文，多人可继续指导 | A/B | ⭐⭐⭐⭐⭐ |
| 3 | Claude Tag Channel 配置页 | Workspace / Channel Scope、Access Bundle 等 | A/C | ⭐⭐⭐⭐⭐ |
| 4 | Access Bundle | 凭证、Repo、Domain、Plugin、Instructions 等能力组合 | B/C | ⭐⭐⭐⭐⭐ |
| 5 | Access Bundle → Credentials | 已连接应用、连接新应用、共享身份凭证 | C | ⭐⭐⭐⭐⭐ |
| 6 | Access Bundle → Repositories | GitHub Organization / Repository 范围 | A/C | ⭐⭐⭐⭐ |
| 7 | Connect an app 弹窗 | Credential type、Allowed websites、Headers 等 | C | ⭐⭐⭐⭐ |
| 8 | Channel → 绑定 Access Bundle | 当前 Channel 选择/挂载已有 Bundle | C | ⭐⭐⭐⭐⭐ |

**优先参考来源**：

- Anthropic 官方 Claude Tag 产品页：前台使用形态最清晰。
- MintMCP Claude Tag Setup：目前公开资料里后台配置截图密度较高，尤其是 Access Bundle / Credentials / Channel Binding。
- Tenable Claude Tag 安全研究：同时展示 Slack 前台与权限后台，适合理解 Shared Identity。
- Pluto Security：适合看 Audit / Scheduled Work / Memory / Network Events 等治理页面。

---

# 三、首次 Setup / Onboarding UI

Claude Tag 首次启用至少可以拆出以下页面或状态：

1. **Claude Tag Setup Landing Page**：首次进入管理后台，展示 Setup Guide。
2. **Start setup / Resume setup**。
3. **Add Claude to Slack**：安装 Slack App。
4. **Slack Workspace Pairing**：在 Slack 内发送 `@Claude connect`。
5. **Pairing Code**：Slack 返回 Pairing Code。
6. **Paste Pairing Code**：回到 Claude Admin 输入 Code。
7. **Workspace Scope Selector**：选择 Entire Workspace 或指定 Channel。
8. **Pair Workspace Confirmation**。
9. **Tool Picker**：选择 Claude Tag 可以使用的工具。
10. **Tool Search**：搜索工具。
11. **GitHub Organization Selector**。
12. **GitHub Repository Selector**。
13. **Credential Setup**：为工具配置 Service Account / Credentials。
14. **Spending Limit Setup**。
15. **Notify Workspace Users**：是否通知 Workspace 用户。
16. **Launch Claude Tag**：上线确认。

### 对 Z Tag 的启发

Claude Tag 的 Onboarding 本质不是“创建一个 Bot”，而是一次性完成：

`Slack 安装 → Workspace 配对 → Scope → Tool/Repo → Credential → Spend → Launch`

这说明团队级 Agent 的首次配置应该围绕“**让一个组织身份安全地进入协作空间并具备可执行能力**”设计，而不只是 Prompt 配置。

---

# 四、Claude Tag 管理后台主结构

从公开界面和文档可以抽象出如下主信息架构：

```text
Claude Tag
└── Slack Workspace
    ├── Workspace / Channel Scope
    │   ├── Access Bundles
    │   ├── Plugins
    │   ├── Custom Instructions
    │   ├── Model / Runtime settings
    │   └── Advanced Settings
    ├── Audit
    │   ├── Scheduled work
    │   ├── Memory
    │   └── Network events
    ├── Usage / Spend
    └── Access / Governance
```

对应 UI 可拆为：

17. Workspace 列表。
18. Workspace Detail。
19. Channel Tree / Scope Tree。
20. Channel Detail。
21. Claude Tag Version。
22. Access Bundles 区域。
23. Plugins 区域。
24. Custom Instructions 区域。
25. Model / Runtime 设置。
26. Advanced Settings。

其中最核心的产品对象不是单一 Agent，而是：

> **Agent Identity + Scope + Capability + Policy**

---

# 五、Access Bundle：Claude Tag 权限与能力配置核心

Access Bundle 是 Claude Tag 特别值得关注的设计。它将“Agent 能做什么”和“Agent 在哪里工作”解耦。

## 1. Bundle 主界面

27. Create Access Bundle。
28. Access Bundle List。
29. Access Bundle Detail。
30. Rename Access Bundle。
31. Delete Access Bundle。

## 2. Credentials

32. Credentials Tab。
33. Connected Apps。
34. Available Apps。
35. `+ Connect another app`。
36. Connect an App Modal。
37. App Name。
38. Credential Type Selector。
39. Bearer Token / API Key 等 Credential 类型。
40. Allowed Websites / Hosts。
41. Custom Headers。
42. Connection Preview。
43. Credential `...` Menu。
44. Edit Connection。
45. Rotate Secret。
46. Delete Credential。
47. Allowed HTTP Methods。
48. Path Prefix Restrictions。

## 3. Repositories

49. Repositories Tab。
50. GitHub Organization Selector。
51. Repository Selector。
52. Repository Search。
53. Manage Repository Access。
54. Add / Remove Repository。

## 4. Domains / Network

55. Domains Tab。
56. Add Domain。
57. Allowed Domain List。
58. Port Restriction。
59. Network Scope 设置。

## 5. Plugins

60. Plugins Tab。
61. Plugin List。
62. Enable / Disable Plugin。
63. Plugin Detail / Configuration。

## 6. Instructions

64. Instructions Tab。
65. Instructions Editor。
66. Bundle-level Custom Instructions。

### 对 Z Tag 的启发

不要把 Credential、Repo、Network、Tool 全部直接堆到 Agent 定义里。更合理的产品对象是：

```text
Access Bundle
= Identity / Credential
+ Tool
+ Repository
+ Network Boundary
+ Plugin
+ Instruction
```

然后再让 Channel / Scope 挂载 Bundle。

---

# 六、Workspace / Channel Scope 配置

Claude Tag 的另一个关键点是：**配置不是只有 Agent 全局一层，而是跟 Slack Scope 绑定，并存在继承/覆盖关系。**

可以抽象为：

```text
Default Slack
  ↓ inherit
Workspace
  ↓ inherit / override
Channel
```

对应 UI：

67. Default Slack Access。
68. Workspace-level Settings。
69. Channel-level Settings。
70. Workspace-level Access Bundle。
71. Channel-level Access Bundle。
72. Private Channel Access。
73. Scope Inheritance 状态。
74. Inherited Settings 提示。
75. Override Settings。
76. Channel → Add Access Bundle。
77. Access Bundle Selector。
78. Channel Custom Instructions。
79. Default Model。
80. Model Selector。
81. Auto Mode。
82. Auto Mode Allow Rules。
83. Add Allow Rule。
84. Environment Selector。
85. Claude Tag Version：New / Legacy / Off。

### 对 Z Tag 的启发

这对应一个非常重要的 ToB 产品模型：

> 同一个 Agent 在不同组织空间里，可以拥有不同上下文、身份、权限、工具和行为策略。

所以 Channel 不应该只是一个“发布渠道”，而应该是一个一等配置 Scope。

---

# 七、Slack 前台：`@Claude` 任务执行 UI

前台的核心不是普通 Bot 一问一答，而是“频道里的共享 Agent Session”。

## 1. 任务触发与回复

86. `@Claude` Mention。
87. 用户自然语言任务描述。
88. Claude `AGENT` Badge。
89. Agent Working / Thinking State。
90. Tool Execution Progress。
91. Checklist / Todo。
92. Intermediate Update。
93. Final Answer。
94. Error / Retry 状态。
95. Long-running Task 更新。

## 2. Thread = Shared Session

96. Claude 在 Thread 内持续执行。
97. Thread 内补充指令。
98. 多人继续同一个任务。
99. 多人共享同一 Session 上下文。
100. Agent 对 Thread 既有信息进行引用 / 汇总。
101. Thread 内继续触发工具。

这意味着：

```text
Slack Channel = 任务发现与协作空间
Slack Thread = Shared Agent Session
Claude Runtime = 真正执行任务的 Agent 环境
```

---

# 八、`Open session in Claude`：从 Slack 跳转完整 Agent Session

Claude 的 Slack 回复中可出现 **Open session in Claude**。

对应 UI / 交互：

102. `Open session in Claude` CTA。
103. 从 Slack Thread 跳到 Claude 完整 Session。
104. Slack ↔ Claude Session 对应关系。
105. Session Detail / Full Agent Workspace。

这个设计非常值得复用：

> **Channel = 协作入口；Agent Session = 深度工作空间。**

无需强迫复杂 Agent 的所有工作过程都塞在 Slack 消息里。

---

# 九、`Configure`：从使用场景直接进入 Agent 配置

Claude Tag 前台还存在“从当前场景反向配置 Agent”的路径，而不是要求用户先找到 Admin Console。

对应 UI 可拆为：

106. Slack Claude Reply → `Configure`。
107. 当前 Channel 配置入口。
108. Channel Instructions。
109. Respond automatically。
110. Connections 状态。
111. 当前 Scope / Workspace 提示。

产品思想：

> 用户在“正在用 Agent 的地方”直接配置它，而不是先理解 Agent Builder → Agent → Deployment → Channel → Config 的后台层级。

---

# 十、Ambient / Proactive：无需每次 `@Claude`

Claude Tag 不只支持显式 Mention，还支持更主动的常驻式参与。

对应 UI / 状态：

112. Respond automatically Toggle。
113. Ambient Trigger。
114. Proactive Message。
115. Follow-up Message。
116. Channel 内容触发 Agent。
117. 自动发现需要处理的问题。
118. 自动继续之前的任务。
119. 自动汇总 / 定期汇报。

### 对 Z Tag 的启发

团队 Agent 的触发方式至少应拆为：

```text
Explicit trigger  显式 @ / 命令
Ambient trigger   基于频道上下文自动判断
Scheduled trigger 定时运行
Event trigger     外部系统事件
```

---

# 十一、Scheduled Work / Routine

Claude Tag 支持通过自然语言安排未来工作与重复任务。

对应 UI：

120. Create Routine via Slack。
121. 自然语言描述 Schedule。
122. Scheduled Task Confirmation。
123. Routine Created 状态。
124. Scheduled Claude Message。
125. Routine Trigger。
126. 查询当前 Channel Triggers / Routines。
127. Routine 执行结果回到 Channel / Thread。

例如：

```text
每周一上午生成过去一周 bug 汇总，并发到当前频道。
```

从产品角度看，Routine 应被视为一个独立持久化对象，而不是仅存在 Prompt 里。

---

# 十二、Audit：Scheduled Work

公开研究截图中能看到 Claude Tag Audit 下的 Scheduled work 页面。

可拆为：

128. Audit 页面。
129. Scheduled Work Tab。
130. Routine List。
131. Scope Filter。
132. Routine Status。
133. Creator / Owner。
134. Last Run。
135. Next Run。
136. `View details`。
137. Pause。
138. Resume。
139. Delete Routine。
140. Routine Detail。
141. Execution History。

---

# 十三、Memory 管理

Claude Tag 的 Memory 不是完全隐藏在 Runtime 内，而是被产品化成可治理资产。

对应 UI：

142. Audit → Memory Tab。
143. Scope Memory List。
144. Workspace Memory。
145. Public Channel Memory。
146. Private Channel Memory。
147. Memory File / Entry。
148. Memory Detail。
149. Memory Editor。
150. Edit Memory。
151. Delete Memory。
152. Memory Scope / Source。

### 对 Z Tag 的启发

企业 Agent 的 Memory 应该至少具备：

- 可见；
- 可定位来源；
- 可按 Scope 隔离；
- 可编辑；
- 可删除；
- 可审计。

而不是仅提供一个“开启长期记忆”的黑盒开关。

---

# 十四、Network Events / Tool 执行审计

Audit 的另一组重要能力是 Network Events。

对应 UI：

153. Network Events Tab。
154. Date Selector。
155. Hour / Time Range Selector。
156. Network Event Log。
157. Request Domain / Host。
158. Request Method。
159. Execution Scope。
160. Tool / Credential 来源。
161. Network Event Detail。
162. JSON Export / Download。

产品意义：

> Agent 的“工具调用日志”和“网络访问日志”应该分层治理。尤其当 Agent 拥有共享凭证时，网络行为本身就是重要审计对象。

---

# 十五、Usage / Spend 管理

团队 Agent 使用组织侧资源，因此需要独立成本治理。

对应 UI：

163. Usage 页面。
164. Organization-wide Spending Limit。
165. Default Channel Spending Limit。
166. Workspace Spending Limit。
167. Per-channel Spending Limit。
168. Custom Limit。
169. Channel Usage。
170. Workspace Usage。
171. Spend Breakdown。
172. Spend Alert。
173. Current Period Usage。
174. Budget Progress。

### 对 Z Tag 的启发

成本最好同时支持：

```text
Org budget
→ Workspace budget
→ Channel / Scope budget
→ Session / Task usage
```

并能映射到具体团队与任务，而不是只有整个 Agent 的总 Token 消耗。

---

# 十六、权限 / 成员治理

Claude Tag 从个人助手进入团队空间后，还需要一整套 Access Governance。

对应 UI：

175. Claude Tag Member Access。
176. Restrict Member Access。
177. Enable / Disable Claude Tag。
178. Workspace Access。
179. Entire Workspace。
180. Selected Channels Only。
181. Private Channel Policy。
182. DM Policy。
183. Guest Policy。
184. Shared Channel Policy。
185. Role / RBAC Policy。
186. Admin-only Configuration。

产品重点：

> “谁能调用 Agent”与“Agent 用什么身份访问外部系统”是两个不同权限维度，不能混成一个权限开关。

---

# 十七、DM / Personal Agent 与 Shared Agent

Claude Tag 需要同时处理个人对话与共享频道两种身份模式。

可拆为：

187. Claude DM。
188. Personal Conversation。
189. Personal Connector / User Identity。
190. Channel Shared Identity。
191. Shared Access Bundle。
192. DM Session。
193. Channel Shared Session。
194. Slack AI Assistant Panel / Side Panel。

核心区别可以抽象为：

```text
DM / Personal context
→ User identity
→ Personal connectors / permissions

Shared Channel
→ Team / Agent identity
→ Shared Access Bundle
→ Shared thread/session
```

这也是 Z Tag 设计时必须明确的身份分界。

---

# 十八、从竞品角度最值得重点研究的 8 块

如果目标是指导 Z Tag / Agent Builder 产品设计，优先级最高的是以下八块，而不是平均研究所有 UI：

## 1. Scope Tree

Workspace → Channel 的配置继承体系。

**为什么重要**：团队 Agent 必须与组织协作空间绑定，而不是只有 Agent 全局配置。

## 2. Access Bundle

统一打包 Identity / Credential / Repo / Domain / Plugin / Instructions。

**为什么重要**：把 Agent 与执行权限解耦，便于治理、复用和跨 Channel 配置。

## 3. Channel ↔ Bundle Binding

Channel 挂载已存在的 Access Bundle。

**为什么重要**：一个 Agent 可以在不同 Scope 使用不同身份和权限。

## 4. Slack `Configure`

从使用前台进入当前 Scope 的配置。

**为什么重要**：降低 Builder 后台的认知门槛。

## 5. Open session in Claude

Channel 与完整 Agent Runtime / Session 双界面。

**为什么重要**：协作界面和深度工作界面不必是同一个产品页面。

## 6. Ambient / Routine

从被动 `@Agent` 进化到常驻 Agent。

**为什么重要**：真正的团队 Agent 需要主动和持续工作能力。

## 7. Memory Admin

Memory 作为可查看、编辑、删除、审计的组织资产。

**为什么重要**：企业长期上下文不能是黑盒。

## 8. Audit + Spend

Routine、Memory、Network、成本全部治理化。

**为什么重要**：Agent 一旦拥有共享身份和长时任务，就必须具备组织级运营与审计能力。

---

# 十九、可直接映射到 Z Tag 的产品对象

基于 Claude Tag UI，可以抽象出以下一等产品对象：

```text
Organization
├── Workspace
│   └── Channel / Scope
│       ├── Agent Binding
│       ├── Instructions
│       ├── Trigger Policy
│       ├── Access Bundle
│       └── Spend Policy
│
├── Agent Identity
│   └── Access Bundle
│       ├── Credentials
│       ├── Tools
│       ├── Repositories
│       ├── Domains
│       ├── Plugins
│       └── Instructions
│
├── Session
│   └── Slack Thread Mapping
│
├── Routine
├── Memory
├── Audit Event
└── Usage / Spend
```

这比“Agent + Channel 发布”两层结构更接近团队 Agent 的真实复杂度。

---

# 二十、建议后续继续补图的页面清单

当前仓库已有大量 Setup / GitHub 配置截图，下一轮应该优先继续补以下缺口：

### P0：最值得补

- Slack `@Claude` 执行任务完整 Thread。
- `Open session in Claude`。
- Slack 内 `Configure`。
- Channel Scope → Access Bundle Binding。
- Access Bundle → Credentials。
- Access Bundle → Domains。
- Access Bundle → Plugins。
- Access Bundle → Instructions。
- Audit → Scheduled work。
- Audit → Memory。
- Audit → Network events。

### P1：治理相关

- Spend Limit。
- Channel Usage。
- Restrict Access。
- Workspace / Channel Scope inheritance。
- Private Channel Policy。
- Shared Identity / Personal Identity 切换。

### P2：Agent 主动能力

- Respond automatically。
- Routine 创建确认。
- Routine 管理。
- Proactive Message。
- Scheduled Task 执行结果。

---

# 二十一、公开资料来源

## 官方

- Anthropic — Introducing Claude Tag  
  https://www.anthropic.com/news/introducing-claude-tag
- Claude Docs — Settings map  
  https://claude.com/docs/claude-tag/concepts/settings-map
- Claude Docs — How it works  
  https://claude.com/docs/claude-tag/concepts/how-it-works
- Claude Docs — Customize Claude Tag  
  https://claude.com/docs/claude-tag/admins/customize
- Claude Docs — Agent identity  
  https://claude.com/docs/claude-tag/concepts/agent-identity
- Claude Docs — Proactivity and routines  
  https://claude.com/docs/claude-tag/users/proactivity
- Claude Docs — Memory  
  https://claude.com/docs/claude-tag/users/memory
- Claude Docs — Audit  
  https://claude.com/docs/claude-tag/admins/audit
- Claude Docs — Set spend limits  
  https://claude.com/docs/claude-tag/admins/set-spend-limit
- Claude Docs — Restrict access  
  https://claude.com/docs/claude-tag/admins/restrict-access

## 第三方真实截图 / 安全研究

- MintMCP — Claude Tag Setup  
  https://www.mintmcp.com/docs/claude-tag-setup
- Tenable — Claude Tag access model / security analysis  
  https://www.tenable.com/blog/claude-tag-slack-access-model
- Pluto Security — Securing Claude Tag: a practical hardening guide  
  https://pluto.security/blog/securing-claude-tag-a-practical-hardening-guide/
- Slack Help — Use Claude in Slack  
  https://slack.com/help/articles/53532192117267-Use-Claude-in-Slack

> 注：第三方页面主要用于补充真实 UI 截图与产品行为观察；涉及产品事实时，优先以 Anthropic / Claude 官方文档为准。

---

# 二十二、一句话结论

Claude Tag 的 UI 体系并不是“给 Slack 接一个 Claude Bot”，而是在 Slack 之上构建了一套完整的团队 Agent 产品层：

> **Scope（在哪工作） + Shared Identity（以谁的身份） + Access Bundle（能访问什么） + Shared Session（团队如何共同指导） + Proactivity（什么时候主动工作） + Memory（长期知道什么） + Audit / Spend（组织如何治理）。**

对于 Z Tag 来说，Managed Agent 主要解决“把任务做完”；真正需要额外构建的团队级产品能力，大量就体现在上述 Claude Tag UI 中。
