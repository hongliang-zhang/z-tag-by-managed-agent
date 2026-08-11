# Claude Tag UI 图鉴与功能界面调研

> 研究快照：2026-08-12  
> 本文为独立新增调研，不修改原有 [`claude-tag-screenshots.md`](./claude-tag-screenshots.md)。

## 0. 调研范围

目标是尽可能完整地收集和拆解 Claude Tag 的：

- 配置 / Onboarding；
- Slack 前台使用；
- Workspace / Channel Scope；
- Access Bundle / Credential / Repository / Domain / Plugin；
- Shared Session / Thread；
- Configure / Open session in Claude；
- Ambient / Proactive；
- Routine / Scheduled Work；
- Memory；
- Audit / Network Events；
- Usage / Spend；
- Permission / Governance；
- DM / Personal Agent vs Shared Agent。

仓库当前另有 **42 张真实产品截图**，见 [`Claude Tag 真实产品截图`](./claude-tag-screenshots.md)。

### 证据等级

- **A｜真实截图可见**：官方截图、仓库截图或公开视频中直接可见。
- **B｜官方文档确认**：Anthropic / Claude 官方文档明确描述。
- **C｜第三方真实截图 / 研究确认**：安全研究、集成文档等展示实际页面。
- **D｜产品拆解项**：基于已确认能力拆出的 UI 状态 / 产品对象，用于竞品分析，不代表 Anthropic 官方使用同名。

---

# 一、最值得优先看的 Claude Tag UI

| # | 界面 | 能看到什么 | 证据 | 参考价值 |
|---|---|---|---|---|
| 1 | Slack Channel 中 `@Claude` 执行任务 | 用户分配任务、Claude 以 Agent 身份回复、执行过程、Todo、结果 | A/B | ⭐⭐⭐⭐⭐ |
| 2 | Slack Thread 内持续工作 | 一个 Thread 对应共享任务上下文，多人可以继续指导 | A/B | ⭐⭐⭐⭐⭐ |
| 3 | Claude Tag Channel 配置页 | Workspace / Channel Scope、Access Bundle 等配置 | A/C | ⭐⭐⭐⭐⭐ |
| 4 | Access Bundle | Credential、Repo、Domain、Plugin、Instruction 等能力集合 | B/C | ⭐⭐⭐⭐⭐ |
| 5 | Access Bundle → Credentials | 已连接应用、可连接应用、共享身份凭证 | C | ⭐⭐⭐⭐⭐ |
| 6 | Access Bundle → Repository | GitHub Organization / Repository 范围 | A/C | ⭐⭐⭐⭐ |
| 7 | Connect an app 弹窗 | Credential type、Allowed websites、Custom headers 等 | C | ⭐⭐⭐⭐ |
| 8 | Channel → 绑定 Access Bundle | 当前 Channel 挂载已有 Bundle | C | ⭐⭐⭐⭐⭐ |
| 9 | `Open session in Claude` | 从 Slack Thread 跳到 Claude 完整 Agent Session | A/B | ⭐⭐⭐⭐⭐ |
| 10 | Audit → Scheduled work | Routine 列表、状态、上次/下次执行、Pause/Resume | B/C | ⭐⭐⭐⭐⭐ |
| 11 | Audit → Memory | Scope Memory、查看/编辑/删除 | B/C | ⭐⭐⭐⭐⭐ |
| 12 | Audit → Network events | 网络访问行为审计 | B/C | ⭐⭐⭐⭐ |

目前最值得继续扫图的公开来源：

- Anthropic 官方 Claude Tag 产品页：前台使用形态最清楚；
- MintMCP Claude Tag Setup：后台配置截图密度高，尤其是 Access Bundle / Credentials / Channel Binding；
- Tenable：Slack 使用 + Access Bundle / Shared Identity；
- Pluto Security：Audit / Scheduled Work / Memory / Network Events。

---

# 二、首次 Setup / Onboarding

Claude Tag 的首次设置不是单纯“创建一个 Slack Bot”，而是完成一个团队 Agent 从安装到可安全执行任务的完整链路。

可拆出的 UI / 状态：

1. Claude Tag Setup Landing Page。
2. Start setup。
3. Resume setup。
4. Add Claude to Slack。
5. Slack App 安装 / 授权。
6. Slack Workspace Pairing。
7. 在 Slack 中发送 `@Claude connect`。
8. Pairing Code。
9. 回到 Claude Admin 输入 Pairing Code。
10. Workspace Scope Selector。
11. Entire Workspace。
12. Selected Channels。
13. Pair Workspace Confirmation。
14. Tool Picker。
15. Tool Search。
16. GitHub Organization Selector。
17. GitHub Repository Selector。
18. Credential Setup。
19. Service Account / Shared Credential 配置。
20. Spending Limit Setup。
21. Notify Workspace Users。
22. Launch Claude Tag。

可以概括成：

```text
Slack 安装
→ Workspace 配对
→ Scope
→ Tool / Repo
→ Credential
→ Spend
→ Launch
```

### 对 Z Tag 的启发

团队级 Agent 的 Onboarding 应围绕：

> **让一个组织身份进入协作空间，并在明确 Scope、权限、凭证和预算下获得可执行能力。**

而不是只围绕 Prompt / Model / Tool 创建一个 Agent。

---

# 三、Claude Tag 管理后台信息架构

从公开资料可以抽象成：

```text
Claude Tag
└── Slack Workspace
    ├── Workspace / Channel Scope
    │   ├── Access Bundles
    │   ├── Plugins
    │   ├── Custom Instructions
    │   ├── Model / Runtime settings
    │   └── Advanced Settings
    │
    ├── Audit
    │   ├── Scheduled work
    │   ├── Memory
    │   └── Network events
    │
    ├── Usage / Spend
    └── Access / Governance
```

对应主要 UI：

23. Workspace 列表。
24. Workspace Detail。
25. Channel Tree / Scope Tree。
26. Channel Detail。
27. Claude Tag Version。
28. Access Bundles 区域。
29. Plugins 区域。
30. Custom Instructions 区域。
31. Model / Runtime 设置。
32. Advanced Settings。
33. Audit 入口。
34. Usage / Spend 入口。
35. Access / Governance 入口。

其核心产品模型可以概括为：

> **Agent Identity + Scope + Capability + Policy**

---

# 四、Access Bundle：Claude Tag 的能力与权限核心

Access Bundle 是 Claude Tag 最值得研究的产品对象之一。

它解决的问题不是“这个 Agent 有没有工具”，而是：

> **在某个团队 Scope 下，Claude 以什么组织身份、携带什么 Credential、能访问哪些工具 / Repo / Domain / Plugin，并遵守什么 Instruction。**

## 4.1 Bundle 主界面

36. Access Bundle List。
37. Create Access Bundle。
38. Access Bundle Detail。
39. Bundle Name。
40. Rename Access Bundle。
41. Delete Access Bundle。
42. Bundle 被哪些 Scope 使用。

## 4.2 Credentials

43. Credentials Tab。
44. Connected Apps。
45. Available Apps。
46. `+ Connect another app`。
47. Connect an App Modal。
48. App Name。
49. Credential Type Selector。
50. Bearer Token。
51. API Key。
52. Secret 输入。
53. Allowed Websites / Hosts。
54. Custom Headers。
55. Connection Preview。
56. Credential `...` Menu。
57. Edit Connection。
58. Rotate Secret。
59. Delete Credential。
60. Allowed HTTP Methods。
61. Path Prefix Restrictions。
62. Host / Domain Boundary。

## 4.3 Repositories

63. Repositories Tab。
64. GitHub Organization Selector。
65. Repository Selector。
66. Repository Search。
67. Manage Repository Access。
68. Add Repository。
69. Remove Repository。
70. Organization-level Repo Scope。

## 4.4 Domains / Network

71. Domains Tab。
72. Add Domain。
73. Allowed Domain List。
74. Remove Domain。
75. Port Restriction。
76. Network Scope。
77. Host Allowlist。

## 4.5 Plugins

78. Plugins Tab。
79. Plugin List。
80. Enable Plugin。
81. Disable Plugin。
82. Plugin Detail。
83. Plugin Configuration。

## 4.6 Instructions

84. Instructions Tab。
85. Instructions Editor。
86. Bundle-level Custom Instructions。
87. Save / Update Instructions。

### 对 Z Tag 的启发

推荐把以下内容抽成独立的一等对象，而不是全塞进 Agent Definition：

```text
Access Bundle
= Identity / Credential
+ Tool
+ Repository
+ Network Boundary
+ Plugin
+ Instruction
```

然后由 Workspace / Channel Scope 挂载。

---

# 五、Workspace / Channel Scope：配置不是只有 Agent 全局一层

Claude Tag 很关键的一点是：**Channel 不是一个普通“发布渠道”，而是一个配置 Scope。**

大体可以理解为：

```text
Default Slack
  ↓ inherit
Workspace
  ↓ inherit / override
Channel
```

对应 UI：

88. Default Slack Access。
89. Workspace-level Settings。
90. Channel-level Settings。
91. Workspace-level Access Bundle。
92. Channel-level Access Bundle。
93. Private Channel Access。
94. Scope Inheritance 状态。
95. Inherited Settings 提示。
96. Override Settings。
97. Channel → Add Access Bundle。
98. Access Bundle Selector。
99. Channel Custom Instructions。
100. Default Model。
101. Model Selector。
102. Auto Mode。
103. Auto Mode Allow Rules。
104. Add Allow Rule。
105. Environment Selector。
106. Claude Tag Version：New / Legacy / Off。

### 核心产品含义

同一个 Claude Agent 在不同 Channel 中可以具有不同的：

- 上下文；
- 组织身份；
- Credential；
- Repository；
- Network Access；
- Instructions；
- Trigger Policy；
- Budget。

因此更准确的结构是：

```text
Agent
× Scope
→ Runtime Configuration
```

而不是：

```text
Agent
→ 发布到 Slack
```

---

# 六、Slack 前台：`@Claude` 执行任务

Claude Tag 前台不是传统 Bot 的“一问一答”，而是 Agent 在 Thread 中持续工作。

## 6.1 任务触发

107. `@Claude` Mention。
108. 用户自然语言任务描述。
109. Message Context。
110. Channel Context。
111. Thread Context。

## 6.2 Agent 回复与执行过程

112. Claude `AGENT` Badge。
113. Agent Working / Thinking State。
114. Tool Execution Progress。
115. Checklist / Todo。
116. Intermediate Update。
117. Long-running Task Update。
118. Final Answer。
119. Error 状态。
120. Retry / Continue 状态。
121. Tool Result 摘要。
122. 任务完成提示。

---

# 七、Thread = Shared Session

Claude Tag 最重要的前台 Session 模型：

```text
一个 Slack Thread
≈ 一个 Shared Claude Session
```

Thread 内的不同团队成员都可以继续指导 Agent。

对应 UI / 行为：

123. Claude 在 Thread 内持续执行。
124. Thread 内补充指令。
125. Thread 内追问。
126. 多人共同指导。
127. 多人共享 Session Context。
128. Claude 读取 Thread 历史。
129. Claude 引用此前结果。
130. Thread 内继续调用工具。
131. Thread 内继续长时任务。
132. Agent 执行结果持续回写 Thread。

可以抽象为：

```text
Slack Channel = 任务发现 / 团队协作空间
Slack Thread  = Shared Agent Session
Agent Runtime = 真正执行任务的环境
```

---

# 八、`Open session in Claude`

Claude 的 Slack 回复中可以出现：

> **Open session in Claude**

对应 UI / 交互：

133. `Open session in Claude` CTA。
134. Slack Thread → Claude Session 跳转。
135. Slack Thread 与 Claude Session 映射。
136. Claude Session Detail。
137. Full Agent Workspace。
138. 在 Claude 中继续任务。

### 产品设计价值

这是一个很值得复用的分层：

> **Channel = 协作入口；Agent Session = 深度工作空间。**

复杂任务不需要强行把所有工具调用、文件、执行状态、长上下文都塞进 Slack Message。

---

# 九、`Configure`：从使用场景直接配置 Agent

Claude Tag 支持从 Slack 当前使用场景进入配置，而不是要求用户一定先进入复杂 Admin Console。

对应 UI：

139. Claude Reply → `Configure`。
140. Current Channel Configuration。
141. Channel Instructions。
142. Respond automatically。
143. Connections 状态。
144. 当前 Workspace / Scope 提示。
145. 跳转完整管理后台。

### 产品设计价值

用户不需要先理解：

```text
Agent Builder
→ Agent
→ Deployment
→ Channel
→ Configuration
```

而是在“**我正在用 Agent 的地方**”直接修改当前 Scope 的配置。

---

# 十、Ambient / Proactive：无需每次 `@Claude`

Claude Tag 不只是被动响应 Mention，还支持更主动的 Channel Agent 模式。

对应 UI / 状态：

146. Respond automatically Toggle。
147. Ambient Trigger。
148. Proactive Message。
149. Follow-up Message。
150. Channel 内容触发 Agent。
151. 自动识别需要处理的问题。
152. 自动继续之前的任务。
153. 自动总结。
154. 自动汇报。
155. Proactivity Scope 设置。

### 可抽象的 Trigger 模型

```text
Explicit Trigger
显式 @ / 命令

Ambient Trigger
基于频道上下文自动判断

Scheduled Trigger
定时运行

Event Trigger
外部系统事件触发
```

---

# 十一、Routine / Scheduled Work

Claude Tag 支持通过自然语言安排未来或重复工作。

例如：

```text
每周一上午生成过去一周 bug 汇总，并发到当前频道。
```

对应 UI：

156. Create Routine via Slack。
157. Natural-language Schedule。
158. Scheduled Task Confirmation。
159. Routine Created 状态。
160. Scheduled Claude Message。
161. Routine Trigger。
162. 查询当前 Channel Routines。
163. Routine 执行结果回到 Channel。
164. Routine 执行结果回到 Thread。

Routine 应当被理解为一个持久化产品对象，而不是 Prompt 里的一句自然语言。

---

# 十二、Audit → Scheduled Work

公开研究中可以看到 Claude Tag 的 Scheduled Work 治理页面。

对应 UI：

165. Audit 页面。
166. Scheduled Work Tab。
167. Routine List。
168. Scope Filter。
169. Routine Status。
170. Creator / Owner。
171. Last Run。
172. Next Run。
173. `View details`。
174. Pause。
175. Resume。
176. Delete Routine。
177. Routine Detail。
178. Execution History。
179. Last Execution Result。

### 产品含义

长时 / 定时 Agent 一旦进入企业使用，就不能只存在运行时内部，需要独立的管理面：

- 谁创建的；
- 在哪个 Scope；
- 什么时候执行；
- 上次是否成功；
- 下次何时运行；
- 能否暂停 / 恢复 / 删除；
- 历史执行结果是什么。

---

# 十三、Memory 管理

Claude Tag 将 Memory 产品化为可以治理的资产，而不是只有一个黑盒“长期记忆”开关。

对应 UI：

180. Audit → Memory Tab。
181. Scope Memory List。
182. Workspace Memory。
183. Public Channel Memory。
184. Private Channel Memory。
185. Memory File / Entry。
186. Memory Detail。
187. Memory Source。
188. Memory Scope。
189. Memory Editor。
190. Edit Memory。
191. Delete Memory。

### 对 Z Tag 的启发

企业 Agent Memory 最少应该具备：

- 可见；
- 可定位来源；
- 可按 Scope 隔离；
- 可编辑；
- 可删除；
- 可审计。

---

# 十四、Network Events / Tool 执行审计

Claude Tag Audit 还覆盖 Network Events。

对应 UI：

192. Network Events Tab。
193. Date Selector。
194. Hour / Time Range Selector。
195. Network Event Log。
196. Request Domain / Host。
197. Request Method。
198. Execution Scope。
199. Tool 来源。
200. Credential 来源。
201. Network Event Detail。
202. JSON Export / Download。

### 产品含义

Agent 的治理至少要区分：

```text
Tool Call Log
≠ Network Access Log
≠ Credential Audit
≠ Agent Execution Trace
```

尤其当 Agent 拥有组织共享 Credential 时，网络行为本身就是企业安全的重要审计对象。

---

# 十五、Usage / Spend

Shared Agent 使用组织资源，因此需要独立的成本治理。

对应 UI：

203. Usage 页面。
204. Organization-wide Spending Limit。
205. Default Channel Spending Limit。
206. Workspace Spending Limit。
207. Per-channel Spending Limit。
208. Custom Limit。
209. Channel Usage。
210. Workspace Usage。
211. Spend Breakdown。
212. Spend Alert。
213. Current Period Usage。
214. Budget Progress。
215. Scope Cost Attribution。

可以抽象成：

```text
Org Budget
→ Workspace Budget
→ Channel / Scope Budget
→ Session / Task Usage
```

成本不能只有 Agent 总 Token 消耗，还应能映射到具体团队、Scope 和任务。

---

# 十六、权限 / 成员治理

Claude Tag 从个人助手进入共享团队空间后，必须同时解决“谁能用 Agent”和“Agent 能访问什么”两套权限。

对应 UI：

216. Claude Tag Member Access。
217. Restrict Member Access。
218. Enable / Disable Claude Tag。
219. Workspace Access。
220. Entire Workspace。
221. Selected Channels Only。
222. Private Channel Policy。
223. DM Policy。
224. Guest Policy。
225. Shared Channel Policy。
226. Role / RBAC Policy。
227. Admin-only Configuration。
228. Scope-level Admin Policy。

### 两类权限必须分开

```text
Human → Agent Permission
谁能调用 / 配置 Agent

Agent → Resource Permission
Agent 以什么身份访问哪些外部资源
```

这两者不能合并成一个“权限”概念。

---

# 十七、DM / Personal Agent vs Shared Agent

Claude Tag 还需要处理个人对话和团队共享频道之间的身份边界。

对应 UI / 产品对象：

229. Claude DM。
230. Personal Conversation。
231. Personal Connector / User Identity。
232. Personal Session。
233. Channel Shared Identity。
234. Shared Access Bundle。
235. Channel Shared Session。
236. Slack AI Assistant Panel / Side Panel。

核心区别可以抽象为：

```text
DM / Personal Context
→ User identity
→ Personal connectors / permissions
→ Personal session

Shared Channel
→ Team / Agent identity
→ Shared Access Bundle
→ Shared thread / session
```

这也是 Z Tag 设计时需要明确的身份分界。

---

# 十八、从竞品角度最值得研究的 8 个模块

如果目标是指导 Z Tag / Managed Agent 产品设计，优先级最高的是以下八块。

## 1. Scope Tree

Workspace → Channel 的配置继承体系。

**价值**：团队 Agent 与组织空间绑定，而不是只有 Agent 全局配置。

## 2. Access Bundle

Identity / Credential / Repo / Domain / Plugin / Instructions 的统一能力包。

**价值**：把 Agent Definition 与运行权限解耦。

## 3. Channel ↔ Bundle Binding

Channel 挂载既有 Access Bundle。

**价值**：同一个 Agent 在不同 Scope 下使用不同身份和权限。

## 4. Slack `Configure`

从使用前台进入当前 Scope 配置。

**价值**：降低 Builder 后台认知成本。

## 5. Open session in Claude

协作 Channel 与完整 Agent Workspace 双界面。

**价值**：协作入口与深度执行环境解耦。

## 6. Ambient / Routine

从被动 `@Agent` 变为常驻 Agent。

**价值**：真正的团队 Agent 需要主动 / 持续工作能力。

## 7. Memory Admin

Memory 成为可治理资产。

**价值**：长期上下文在企业中不能是黑盒。

## 8. Audit + Spend

Routine、Memory、Network、Credential、成本全部治理化。

**价值**：Agent 一旦拥有共享身份和长时任务，必须有组织级运营和审计能力。

---

# 十九、可直接映射到 Z Tag 的一等产品对象

基于 Claude Tag 的 UI / 产品结构，可以抽象出：

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

比起简单的：

```text
Agent
→ Channel
```

团队 Agent 更接近：

```text
Agent
× Scope
× Identity
× Capability
× Policy
→ Session / Runtime
```

---

# 二十、建议继续补图的缺口

仓库已经有大量 Setup / GitHub 配置相关截图，后续继续收集时建议按优先级补。

## P0：最值得补

- Slack `@Claude` 完整执行 Thread；
- `Open session in Claude`；
- Slack `Configure`；
- Channel Scope → Access Bundle Binding；
- Access Bundle → Credentials；
- Access Bundle → Domains；
- Access Bundle → Plugins；
- Access Bundle → Instructions；
- Audit → Scheduled Work；
- Audit → Memory；
- Audit → Network Events。

## P1：治理相关

- Spend Limit；
- Channel Usage；
- Restrict Access；
- Workspace / Channel Scope inheritance；
- Private Channel Policy；
- Personal Identity / Shared Identity。

## P2：主动 Agent

- Respond automatically；
- Routine 创建确认；
- Routine 管理；
- Proactive Message；
- Scheduled Task 执行结果。

---

# 二十一、公开资料来源

## 官方资料

- Anthropic — Introducing Claude Tag  
  https://www.anthropic.com/news/introducing-claude-tag
- Claude Docs — Settings map  
  https://claude.com/docs/claude-tag/concepts/settings-map
- Claude Docs — How it works  
  https://claude.com/docs/claude-tag/concepts/how-it-works
- Claude Docs — Use cases  
  https://claude.com/docs/claude-tag/users/use-cases
- Claude Docs — Customize Claude Tag  
  https://claude.com/docs/claude-tag/admins/customize
- Claude Docs — Memory  
  https://claude.com/docs/claude-tag/users/memory
- Claude Docs — Proactivity and routines  
  https://claude.com/docs/claude-tag/users/proactivity
- Claude Docs — Agent identity  
  https://claude.com/docs/claude-tag/concepts/agent-identity
- Claude Docs — Security and data handling  
  https://claude.com/docs/claude-tag/concepts/security-and-data
- Claude Docs — Restrict access  
  https://claude.com/docs/claude-tag/admins/restrict-access
- Claude Docs — Audit  
  https://claude.com/docs/claude-tag/admins/audit
- Claude Docs — Set spend limits  
  https://claude.com/docs/claude-tag/admins/set-spend-limit
- Claude — Agent identity and access model  
  https://claude.com/blog/agent-identity-access-model
- Slack Help — Use Claude in Slack  
  https://slack.com/help/articles/53532192117267-Use-Claude-in-Slack

## 第三方真实截图 / 安全研究

- MintMCP — Claude Tag Setup  
  https://www.mintmcp.com/docs/claude-tag-setup
- Tenable — Claude Tag Slack access model  
  https://www.tenable.com/blog/claude-tag-slack-access-model
- Pluto Security — Securing Claude Tag: a practical hardening guide  
  https://pluto.security/blog/securing-claude-tag-a-practical-hardening-guide/

> 第三方页面主要用于补充真实 UI 截图与产品行为观察；涉及 Claude Tag 产品事实时，优先以 Anthropic / Claude 官方资料为准。

---

# 二十二、核心结论

Claude Tag 的产品 UI 体系并不是“给 Slack 接一个 Claude Bot”，而是在 Slack 之上补出了一套完整的团队 Agent 产品层：

> **Scope（在哪工作） + Shared Identity（以谁的身份） + Access Bundle（能访问什么） + Shared Session（团队如何共同指导） + Proactivity（什么时候主动工作） + Memory（长期知道什么） + Audit / Spend（组织如何治理）。**

对应到 Z Tag：

- **Managed Agent** 更偏“如何把任务做完”；
- **Z Tag 团队产品层** 要补的是“谁、在哪、以什么身份、带什么权限、在什么上下文里把任务交给 Agent，以及整个过程如何治理”。
