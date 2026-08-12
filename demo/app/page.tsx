"use client";

import { useMemo, useState } from "react";

type View = "scopes" | "bundles" | "audit" | "memory" | "usage" | "channel";
type Scenario = "success" | "revoked" | "403";

const inherited = [
  { name: "company-docs-readonly", source: "Default access", tone: "neutral" },
  { name: "engineering-base", source: "Zhipu Workspace", tone: "neutral" },
];

const nav = [
  ["scopes", "Access & scopes", "⌘"], ["bundles", "Access bundles", "◇"],
  ["audit", "Audit", "◷"], ["memory", "Memory & routines", "◎"],
  ["usage", "Usage", "▥"], ["channel", "Channel preview", "#"],
] as const;

export default function Home() {
  const [view, setView] = useState<View>("scopes");
  const [bundle, setBundle] = useState(false);
  const [editor, setEditor] = useState(false);
  const [tab, setTab] = useState("Credentials");
  const [risk, setRisk] = useState(false);
  const [bound, setBound] = useState(false);
  const [diff, setDiff] = useState(false);
  const [provenance, setProvenance] = useState(false);
  const [scenario, setScenario] = useState<Scenario>("success");
  const [thread, setThread] = useState(false);
  const [steered, setSteered] = useState(false);

  const bundles = useMemo(() => bound ? [...inherited, { name: "agent-platform-write", source: "#agent-platform", tone: "direct" }] : inherited, [bound]);

  function createBundle() { setBundle(true); setEditor(true); setTab("Credentials"); }
  function saveBundle() { setEditor(false); setBundle(true); setView("bundles"); }
  function requestBind() { setRisk(true); }
  function confirmBind() { setRisk(false); setBound(true); setDiff(true); }
  function startThread() { setThread(true); setView("channel"); setSteered(false); }

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brandmark">Z</span><div><b>Z Tag</b><small>Organization agent</small></div></div>
      <div className="workspace"><span className="ws-icon">Z</span><div><b>Zhipu AI</b><small>Enterprise workspace</small></div><span>⌄</span></div>
      <nav>{nav.map(([id,label,icon]) => <button key={id} className={view===id?"active":""} onClick={()=>setView(id as View)}><span>{icon}</span>{label}{id==="channel"&&<i>Demo</i>}</button>)}</nav>
      <div className="side-bottom"><button>?</button><div className="avatar">HZ</div><div><b>Hongliang</b><small>Owner</small></div></div>
    </aside>

    <section className="main">
      <header><div><span className="eyebrow">ADMIN SETTINGS / Z TAG</span><h1>{viewTitle(view)}</h1></div><div className="header-actions"><span className="demo-pill">● Demo mode</span><button className="ghost" onClick={()=>location.reload()}>Reset demo</button>{view==="bundles"&&<button className="primary" onClick={createBundle}>＋ Create bundle</button>}</div></header>

      {view==="scopes" && <div className="scope-layout">
        <aside className="scope-tree"><div className="tree-head"><b>Scopes</b><button>•••</button></div><label>SEARCH SCOPES</label><div className="search">⌕ Search</div>
          <div className="tree-row root"><span>▾</span><b>Default access</b></div>
          <div className="tree-row child"><span>▾</span><span className="cube">Z</span><b>Zhipu Workspace</b></div>
          <div className="tree-row leaf"># general</div><div className="tree-row leaf selected"># agent-platform <small>Public</small></div><div className="tree-row leaf"># customer-support</div>
        </aside>
        <div className="detail">
          <div className="channel-title"><div className="hash">#</div><div><h2>agent-platform</h2><p>Public channel · Zhipu Workspace</p></div><button className="outline" onClick={startThread}>Preview in channel ↗</button></div>
          {diff&&<div className="diff"><div><b>Effective access updated</b><p>3 capabilities added · 1 credential source changed</p></div><button onClick={()=>setDiff(false)}>×</button><div className="diff-items"><span>＋ Issue Tracker connection</span><span>＋ Repository & plugin</span><span>↻ Credential: Workspace → Channel</span></div></div>}
          <section className="card config-card"><div className="card-head"><div><h3>Channel configuration</h3><p>Values inherit from the nearest parent scope unless overridden.</p></div><button className="outline">Edit configuration</button></div>
            <div className="config-grid"><Config label="Z Tag version" value="New"/><Config label="Default model" value="GLM-5"/><Config label="Environment" value="Team Sandbox"/><Config label="Respond automatically" value="Off"/><Config label="Channel member edits" value="Allow"/></div>
          </section>
          <section className="card"><div className="card-head"><div><h3>Access bundles <span className="count">{bundles.length}</span></h3><p>Reusable capabilities inherited and attached to this channel.</p></div>{!bound?<button className="primary" onClick={()=>bundle?requestBind():createBundle()}>{bundle?"Attach bundle":"Create bundle"}</button>:<button className="outline">Manage</button>}</div>
            <div className="bundle-list">{bundles.map((b,i)=><div className="bundle-row" key={b.name}><span className={b.tone==="direct"?"bundle-icon direct":"bundle-icon"}>◇</span><div><b>{b.name}</b><p>{i===0?"Company documentation · Read-only":i===1?"Engineering tools and staging access":"Issue tracker, GitHub and workflow automation"}</p></div><span className={b.tone==="direct"?"tag direct":"tag"}>{b.tone==="direct"?"Direct":"Inherited"}</span><small>{b.source}</small><button onClick={()=>b.tone==="direct"&&setProvenance(true)}>›</button></div>)}</div>
          </section>
          <section className="card"><div className="card-head"><div><h3>Effective access summary</h3><p>Resolved permissions, restrictions and their source.</p></div><span className="status">● Policy valid</span></div>
            <div className="summary-tabs"><b>Connections <em>{bound?3:2}</em></b><span>Repositories <em>{bound?1:0}</em></span><span>Domains <em>2</em></span><span>Plugins <em>{bound?2:1}</em></span><span>Instructions <em>{bound?3:2}</em></span></div>
            <table><tbody><tr><td><b>Company Docs</b><small>docs.example.com · GET</small></td><td><span className="tag">Read-only</span></td><td>Default access</td><td>Inherited</td></tr><tr><td><b>Staging API</b><small>api.staging.example.com · /health/* · GET</small></td><td><span className="tag">Bearer</span></td><td>Zhipu Workspace</td><td>Inherited</td></tr>{bound&&<tr className="highlight"><td><b>Issue Tracker Staging</b><small>api.staging.example.com · /tickets/* · GET, POST</small></td><td><span className="tag direct">Bearer</span></td><td>#agent-platform</td><td><button className="link" onClick={()=>setProvenance(true)}>Narrowest scope wins ↗</button></td></tr>}</tbody></table>
          </section>
        </div>
      </div>}

      {view==="bundles" && <div className="content-pad"><div className="intro"><h2>Bundle library</h2><p>Create reusable packages of credentials, repositories, domains, plugins and instructions.</p></div><div className="card bundle-table"><div className="table-head"><b>Bundle</b><b>Capabilities</b><b>Used in</b><b>Updated</b></div>{inherited.concat(bundle?[{name:"agent-platform-write",source:"#agent-platform",tone:"direct"}]:[]).map((b,i)=><div className="table-row" key={b.name}><div><span className="bundle-icon">◇</span><b>{b.name}</b><small>{i===2?"Write access for Agent Platform":"Shared organization access"}</small></div><span>{i===2?"5 capabilities":"3 capabilities"}</span><span>{i===2?(bound?"1 scope":"0 places"):i===0?"4 scopes":"3 scopes"}</span><span>Just now</span></div>)}</div></div>}

      {(view==="audit"||view==="memory"||view==="usage")&&<ReadOnly view={view}/>} 
      {view==="channel"&&<Channel thread={thread} scenario={scenario} setScenario={setScenario} onStart={()=>setThread(true)} steered={steered} setSteered={setSteered}/>} 
    </section>

    {editor&&<BundleEditor tab={tab} setTab={setTab} onClose={()=>setEditor(false)} onSave={saveBundle}/>} 
    {risk&&<div className="modal-backdrop"><div className="confirm"><span className="warning">!</span><h2>Confirm elevated access</h2><p><b>agent-platform-write</b> can create branches, open pull requests and send POST requests. This is a public channel.</p><div className="risk-box"><b>Effective changes</b><span>Issue Tracker · GET, POST on /tickets/</span><span>GitHub · Create branch and open PR</span></div><label className="check"><input type="checkbox" defaultChecked/> I understand members of #agent-platform can invoke these capabilities.</label><div className="modal-actions"><button className="ghost" onClick={()=>setRisk(false)}>Cancel</button><button className="danger" onClick={confirmBind}>Confirm & attach</button></div></div></div>}
    {provenance&&<div className="drawer-backdrop" onClick={()=>setProvenance(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}><button className="drawer-close" onClick={()=>setProvenance(false)}>×</button><span className="eyebrow">ACCESS PROVENANCE</span><h2>Issue Tracker Staging</h2><p>Why this channel can use this connection.</p><div className="prov-chain"><div><span>1</span><b>Credential route</b><small>api.staging.example.com /tickets/* · GET, POST</small></div><div><span>2</span><b>agent-platform-write</b><small>Access bundle</small></div><div><span>3</span><b>Direct binding</b><small>Attached at channel scope</small></div><div><span>4</span><b>#agent-platform</b><small>Narrowest matching scope</small></div></div><div className="note"><b>No fallback</b><p>If this credential returns 401/403, Z Tag will not retry using the Workspace credential.</p></div></aside></div>}
  </main>
}

function Config({label,value}:{label:string,value:string}) { return <div><label>{label}</label><b>{value}</b><small>Inherited · Zhipu Workspace</small></div> }
function viewTitle(v:View){return ({scopes:"Access & scopes",bundles:"Access bundles",audit:"Audit",memory:"Memory & routines",usage:"Usage",channel:"Channel preview"})[v]}

function BundleEditor({tab,setTab,onClose,onSave}:{tab:string;setTab:(s:string)=>void;onClose:()=>void;onSave:()=>void}){const tabs=["Credentials","Repositories","Domains","Plugins","Instructions"];return <div className="modal-backdrop"><div className="editor"><div className="editor-head"><div><span className="eyebrow">NEW ACCESS BUNDLE</span><h2>agent-platform-write</h2><p>Write access for the Agent Platform team.</p></div><button onClick={onClose}>×</button></div><div className="editor-body"><aside>{tabs.map((t,i)=><button className={tab===t?"active":""} onClick={()=>setTab(t)} key={t}><span>{["⌁","⌘","◎","◇","≡"][i]}</span>{t}<em>{[1,1,1,1,1][i]}</em></button>)}</aside><section><div className="tab-title"><div><h3>{tab}</h3><p>{tabCopy(tab)}</p></div><button className="outline">＋ Add {tab.slice(0,-1)}</button></div>{tab==="Credentials"?<div className="connection-card"><div className="connection-top"><span className="connection-icon">⌁</span><div><b>Issue Tracker Staging</b><p>Custom tool · Bearer credential</p></div><span className="status">● Configured</span><button>•••</button></div><div className="policy"><label>POLICY PREVIEW</label><code>host = api.staging.example.com</code><code>path starts with /tickets/</code><code>method in [GET, POST]</code></div><div className="connection-meta"><span><small>Allowed host</small><b>api.staging.example.com</b></span><span><small>Path prefix</small><b>/tickets/</b></span><span><small>Methods</small><b>GET · POST</b></span></div></div>:<FakeTab tab={tab}/>}</section></div><div className="editor-foot"><span>Used in <b>0 places</b> · Unsaved changes</span><div><button className="ghost" onClick={onClose}>Cancel</button><button className="primary" onClick={onSave}>Save bundle</button></div></div></div></div>}
function tabCopy(t:string){return ({Credentials:"Secure connections and their request boundaries.",Repositories:"Code repositories this bundle can work with.",Domains:"Network hosts allowed without credentials.",Plugins:"Reusable workflows available to the agent.",Instructions:"Behavior that travels with this bundle."} as Record<string,string>)[t]}
function FakeTab({tab}:{tab:string}){const d:Record<string,[string,string,string]>={Repositories:["hongliang-zhang/z-tag-by-managed-agent","Selected repository","Read · Create branch · Open PR"],Domains:["docs.example.com:443","Allowed domain","No credential attached"],Plugins:["Engineering Workflow","Organization plugin","Enabled"],Instructions:["Bundle instructions","Applied to new threads","Read README first · Work on a branch · Reply with PR link"]};return <div className="fake-item"><span className="bundle-icon direct">◇</span><div><b>{d[tab][0]}</b><p>{d[tab][1]}</p><small>{d[tab][2]}</small></div><span className="status">● Ready</span></div>}

function ReadOnly({view}:{view:View}){return <div className="content-pad"><div className="readonly"><span className="readonly-icon">{view==="audit"?"◷":view==="usage"?"▥":"◎"}</span><span className="tag">Read-only preview</span><h2>{viewTitle(view)}</h2><p>{view==="audit"?"Review scheduled work and exported network events. A unified action-level audit trail is planned for Z Tag.":view==="usage"?"Organization and channel spend limits are tracked independently from runtime task budgets.":"Public channels share workspace memory; private channels remain isolated. Routines include schedules, channel watches and PR subscriptions."}</p><div className="preview-grid"><div><b>{view==="usage"?"$12,480":"12"}</b><small>{view==="usage"?"Monthly usage":"Active records"}</small></div><div><b>{view==="usage"?"68%":"3"}</b><small>{view==="usage"?"of organization limit":"Needs attention"}</small></div><div><b>{view==="usage"?"4":"99.9%"}</b><small>{view==="usage"?"Channels tracked":"Policy availability"}</small></div></div></div></div>}

function Message({avatar,name,time,children}:{avatar:string;name:string;time:string;children:React.ReactNode}){return <div className="message"><span className="avatar">{avatar}</span><p><b>{name}</b><small>{time}</small><br/>{children}</p></div>}

function Channel({thread,scenario,setScenario,onStart,steered,setSteered}:{thread:boolean;scenario:Scenario;setScenario:(s:Scenario)=>void;onStart:()=>void;steered:boolean;setSteered:(b:boolean)=>void}){return <div className="channel-wrap"><aside className="slack-side"><div className="slack-ws">Zhipu AI <span>⌄</span></div><p>Threads</p><p>Mentions & reactions</p><p>Canvas</p><h4>Channels ＋</h4><p># general</p><p className="slack-active"># agent-platform</p><p># customer-support</p></aside><section className="slack-main"><div className="slack-head"><div><h2># agent-platform</h2><p>Building the Z Tag configuration experience</p></div><button>⚙ Configure</button></div><div className="scenario-bar"><b>Demo scenarios</b>{(["success","revoked","403"] as Scenario[]).map(s=><button className={scenario===s?"active":""} onClick={()=>setScenario(s)} key={s}>{s==="403"?"403 · no fallback":s}</button>)}</div><div className="messages"><Message avatar="M" name="Mina Chen" time="10:04 AM">I’ve updated the configuration notes. @Z Tag, please check this repo, submit a fix PR, and create a test ticket.</Message>{!thread?<button className="primary start" onClick={onStart}>Run demo thread</button>:<div className="thread-card"><div className="agent-line"><span className="ztag-avatar">Z</span><div><b>Z Tag <em>APP</em></b><small>10:04 AM</small><p>I’m on it. I’ll validate the configuration, check live access policy, and prepare the requested artifacts.</p></div></div><div className="checklist"><b>Task progress</b><span className="done">✓ Inspect repository configuration</span><span className="done">✓ Check live connection policy</span><span className={scenario==="success"?"done":"failed"}>{scenario==="success"?"✓":"!"} Create test ticket</span><span className={scenario==="success"?"done":"muted"}>{scenario==="success"?"✓":"○"} Prepare branch and pull request</span></div>{scenario==="success"?<div className="result"><b>Completed</b><p>Configuration validated. I created the requested test ticket and prepared a focused pull request.</p><div><button>ZT-1842 ↗</button><button>Pull request #4 ↗</button></div></div>:<div className="failure"><b>{scenario==="revoked"?"Credential revoked":"403 · access denied"}</b><p>The Channel credential won for this host. Z Tag did not retry with the broader Workspace credential.</p><small>Winning route: #agent-platform → agent-platform-write → /tickets/*</small></div>}<div className="thread-actions"><button onClick={()=>setSteered(true)}>＋ Add follow-up</button><button>Open session ↗</button></div>{steered&&<div className="steer"><span className="avatar">JL</span><p><b>Jordan Lee</b> <small>10:06 AM</small><br/>Please also add a short rollback note to the PR.</p></div>}</div>}</div><div className="composer"><span>＋</span><input placeholder="Message #agent-platform"/><button>➤</button></div></section><aside className="policy-panel"><h3>Thread details</h3><div className="policy-section"><label>SESSION SNAPSHOT</label><p><span>Scope</span><b>#agent-platform</b></p><p><span>Model</span><b>GLM-5</b></p><p><span>Environment</span><b>Team Sandbox</b></p><p><span>Bundles</span><b>3 effective</b></p><p><span>Repository</span><b>1 selected</b></p></div><div className="policy-section"><label>LIVE ACCESS POLICY</label><p><span>Host</span><b>api.staging…</b></p><p><span>Path</span><b>/tickets/*</b></p><p><span>Methods</span><b>GET, POST</b></p><p><span>Credential</span><b className={scenario==="revoked"?"red":"green"}>{scenario==="revoked"?"Revoked":"Configured"}</b></p></div><div className="snapshot-note">Configuration snapshot created when this thread started. Connection policy is evaluated live.</div></aside></div>}
