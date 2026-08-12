"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity, Blocks, Box, Brain, Check, CheckCircle2, ChevronDown,
  ChevronRight, CircleAlert, Clock3, Code2, ExternalLink, FileText,
  FolderGit2, Gauge, GitBranch, Hash, HelpCircle, KeyRound, Layers3,
  Link2, Menu, MessageSquare, MoreHorizontal, Network, Package, Play,
  Plus, RotateCcw, Search, Send, Settings2, ShieldCheck, Sparkles,
  Users2, X,
} from "lucide-react";

type View = "scopes" | "bundles" | "audit" | "memory" | "usage" | "channel";
type Scenario = "success" | "revoked" | "403";
type BundleRow = { name: string; source: string; tone: "inherited" | "direct"; description: string };

const inherited: BundleRow[] = [
  { name: "company-docs-readonly", source: "Default access", tone: "inherited", description: "Company documentation · Read-only" },
  { name: "engineering-base", source: "Zhipu Workspace", tone: "inherited", description: "Engineering tools and staging access" },
];

const nav: Array<{ id: View; label: string; icon: LucideIcon; badge?: string }> = [
  { id: "scopes", label: "Access & scopes", icon: Layers3 },
  { id: "bundles", label: "Access bundles", icon: Package },
  { id: "audit", label: "Audit", icon: Activity },
  { id: "memory", label: "Memory & routines", icon: Brain },
  { id: "usage", label: "Usage", icon: Gauge },
  { id: "channel", label: "Channel preview", icon: MessageSquare, badge: "Demo" },
];

export default function Home() {
  const [view, setView] = useState<View>("scopes");
  const [bundleCreated, setBundleCreated] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState("Credentials");
  const [riskOpen, setRiskOpen] = useState(false);
  const [riskAccepted, setRiskAccepted] = useState(false);
  const [bound, setBound] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [provenanceOpen, setProvenanceOpen] = useState(false);
  const [scenario, setScenario] = useState<Scenario>("success");
  const [threadStarted, setThreadStarted] = useState(false);
  const [steered, setSteered] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const bundles = useMemo<BundleRow[]>(() => bound ? [...inherited, {
    name: "agent-platform-write", source: "#agent-platform", tone: "direct",
    description: "Issue tracker, GitHub and workflow automation",
  }] : inherited, [bound]);

  const switchView = (next: View) => { setView(next); setMobileNavOpen(false) };
  const createBundle = () => { setBundleCreated(true); setEditorOpen(true); setEditorTab("Credentials") };
  const saveBundle = () => { setEditorOpen(false); setBundleCreated(true); setView("bundles") };
  const requestBind = () => { setRiskAccepted(false); setRiskOpen(true) };
  const confirmBind = () => { if (!riskAccepted) return; setRiskOpen(false); setBound(true); setShowDiff(true) };
  const startThread = () => { setThreadStarted(true); setView("channel"); setSteered(false) };

  return <main className="app-shell">
    <aside className={`sidebar ${mobileNavOpen ? "open" : ""}`}>
      <div className="brand"><span className="brandmark">Z</span><div><strong>Z Tag</strong><small>Managed agent</small></div><button className="sidebar-close mobile-only" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X size={18} /></button></div>
      <button className="workspace-switcher"><span className="workspace-icon">Z</span><span><strong>Zhipu AI</strong><small>Enterprise workspace</small></span><ChevronDown size={15} /></button>
      <div className="nav-label">Configuration</div>
      <nav className="side-nav" aria-label="Main navigation">{nav.map(({ id, label, icon: Icon, badge }) => <button key={id} className={view === id ? "active" : ""} onClick={() => switchView(id)}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{badge && <i>{badge}</i>}</button>)}</nav>
      <div className="sidebar-docs"><a href="/product-plan" target="_blank" rel="noreferrer"><FileText size={15} /> Product plan</a><a href="/technical-plan" target="_blank" rel="noreferrer"><Code2 size={15} /> Technical plan</a></div>
      <div className="side-bottom"><button aria-label="Help" title="Preview only" disabled><HelpCircle size={17} /></button><span className="avatar">HZ</span><div><strong>Hongliang</strong><small>Owner</small></div></div>
    </aside>
    {mobileNavOpen && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

    <section className="main-area">
      <header className="topbar"><div className="topbar-title"><button className="mobile-menu mobile-only" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={20} /></button><div><span className="eyebrow">Admin settings / Z Tag</span><h1>{viewTitle(view)}</h1></div></div><div className="topbar-actions"><span className="demo-pill"><span /> Demo mode</span><button className="button secondary" onClick={() => window.location.reload()}><RotateCcw size={15} /><span className="hide-mobile">Reset demo</span></button>{view === "bundles" && <button className="button primary" onClick={createBundle}><Plus size={15} /> Create bundle</button>}</div></header>
      <div className="mobile-view-tabs mobile-only">{nav.map(({ id, label }) => <button key={id} className={view === id ? "active" : ""} onClick={() => switchView(id)}>{label}</button>)}</div>
      {view === "scopes" && <ScopesView bundles={bundles} bundleCreated={bundleCreated} bound={bound} showDiff={showDiff} setShowDiff={setShowDiff} createBundle={createBundle} requestBind={requestBind} startThread={startThread} openProvenance={() => setProvenanceOpen(true)} />}
      {view === "bundles" && <BundleLibrary bundleCreated={bundleCreated} bound={bound} openEditor={() => setEditorOpen(true)} />}
      {(view === "audit" || view === "memory" || view === "usage") && <ReadOnly view={view} />}
      {view === "channel" && <ChannelPreview threadStarted={threadStarted} scenario={scenario} setScenario={setScenario} onStart={() => setThreadStarted(true)} steered={steered} setSteered={setSteered} />}
    </section>

    {editorOpen && <BundleEditor tab={editorTab} setTab={setEditorTab} onClose={() => setEditorOpen(false)} onSave={saveBundle} />}
    {riskOpen && <div className="modal-backdrop"><div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="risk-title"><span className="warning-icon"><CircleAlert size={22} /></span><span className="eyebrow centered">Elevated access</span><h2 id="risk-title">Attach write access to a public channel?</h2><p><strong>agent-platform-write</strong> can create branches, open pull requests and send scoped POST requests.</p><div className="risk-summary"><span><Network size={16} /><span><strong>Issue Tracker</strong><small>GET, POST on /tickets/</small></span></span><span><GitBranch size={16} /><span><strong>GitHub</strong><small>Create branch and open PR</small></span></span></div><label className="acknowledge"><input type="checkbox" checked={riskAccepted} onChange={(event) => setRiskAccepted(event.target.checked)} /><span>I understand members of <strong>#agent-platform</strong> can invoke these capabilities.</span></label><div className="dialog-actions"><button className="button secondary" onClick={() => setRiskOpen(false)}>Cancel</button><button className="button danger" disabled={!riskAccepted} onClick={confirmBind}>Attach to #agent-platform</button></div></div></div>}
    {provenanceOpen && <ProvenanceDrawer onClose={() => setProvenanceOpen(false)} />}
  </main>
}

function ScopesView({ bundles, bundleCreated, bound, showDiff, setShowDiff, createBundle, requestBind, startThread, openProvenance }: { bundles: BundleRow[]; bundleCreated: boolean; bound: boolean; showDiff: boolean; setShowDiff: (value: boolean) => void; createBundle: () => void; requestBind: () => void; startThread: () => void; openProvenance: () => void }) {
  return <div className="scope-layout">
    <aside className="scope-tree"><div className="scope-tree-head"><div><span className="section-kicker">Configuration map</span><strong>Scopes</strong></div><button className="icon-button" aria-label="Scope actions" title="Preview only" disabled><MoreHorizontal size={18} /></button></div><label className="search-field"><Search size={15} /><input aria-label="Search scopes" placeholder="Search scopes" /></label><div className="tree-group"><button className="tree-row root"><ChevronDown size={15} /><Box size={16} /><span>Default access</span></button><button className="tree-row workspace"><ChevronDown size={15} /><span className="tree-logo">Z</span><span>Zhipu Workspace</span></button><button className="tree-row channel"><Hash size={14} /><span>general</span></button><button className="tree-row channel selected"><Hash size={14} /><span>agent-platform</span><small>Public</small></button><button className="tree-row channel"><Hash size={14} /><span>customer-support</span></button></div><div className="scope-legend"><span><i className="legend inherited" /> Inherited</span><span><i className="legend direct" /> Direct</span></div></aside>
    <div className="detail-scroll"><div className="detail-container">
      <div className="scope-hero"><div className="scope-icon"><Hash size={21} /></div><div><div className="scope-title-line"><h2>agent-platform</h2><span className="visibility"><Users2 size={12} /> Public channel</span></div><p>Zhipu Workspace · Channel scope</p></div><button className="button secondary hero-action" onClick={startThread}>Preview in channel <ExternalLink size={14} /></button></div>
      {showDiff && <div className="diff-banner"><CheckCircle2 size={19} /><div><strong>Effective access updated</strong><p>3 capabilities added · credential source narrowed to this channel</p></div><div className="diff-chips"><span>+ Connection</span><span>+ Repository</span><span>+ Plugin</span><span>Workspace → Channel</span></div><button className="icon-button" aria-label="Dismiss" onClick={() => setShowDiff(false)}><X size={17} /></button></div>}
      <section className="context-strip"><div className="section-heading compact"><div><span className="section-kicker">Resolved context</span><h3>Channel configuration</h3></div><button className="text-button" disabled title="Preview only">Edit <span>· Preview only</span></button></div><div className="config-grid"><Config label="Z Tag version" value="New" /><Config label="Default model" value="GLM-5" /><Config label="Environment" value="Team Sandbox" /><Config label="Auto response" value="Off" /><Config label="Member edits" value="Allow" /></div></section>
      <section className="content-section bundles-section"><div className="section-heading"><div><span className="section-kicker">Reusable capability packages</span><h3>Access bundles <em>{bundles.length}</em></h3></div>{!bound ? <button className="button primary" onClick={bundleCreated ? requestBind : createBundle}>{bundleCreated ? <Link2 size={15} /> : <Plus size={15} />}{bundleCreated ? "Attach bundle" : "Create bundle"}</button> : <button className="button secondary" disabled title="Preview only">Manage · Preview only</button>}</div><div className="bundle-list">{bundles.map((item) => <BundleItem key={item.name} item={item} openProvenance={openProvenance} />)}</div></section>
      <section className="content-section effective-section"><div className="section-heading effective-heading"><div><span className="section-kicker">Policy resolver output</span><h3>Effective access</h3><p>Every permission shows its winning value and source.</p></div><span className="policy-valid"><ShieldCheck size={15} /> Policy valid</span></div><div className="summary-tabs" role="tablist"><button className="active">Connections <em>{bound ? 3 : 2}</em></button><button disabled>Repositories <em>{bound ? 1 : 0}</em></button><button disabled>Domains <em>2</em></button><button disabled>Plugins <em>{bound ? 2 : 1}</em></button><button disabled>Instructions <em>{bound ? 3 : 2}</em></button></div><div className="access-table"><AccessRow icon={FileText} title="Company Docs" detail="docs.example.com · GET" badge="Read-only" source="Default access" resolution="Inherited" /><AccessRow icon={Network} title="Staging API" detail="api.staging.example.com · /health/* · GET" badge="Bearer" source="Zhipu Workspace" resolution="Inherited" />{bound && <AccessRow icon={Network} title="Issue Tracker Staging" detail="api.staging.example.com · /tickets/* · GET, POST" badge="Bearer" source="#agent-platform" resolution="Narrowest scope wins" highlighted onClick={openProvenance} />}</div></section>
    </div></div>
  </div>
}

function Config({ label, value }: { label: string; value: string }) { return <div><span>{label}</span><strong>{value}</strong><small><Layers3 size={11} /> Zhipu Workspace</small></div> }

function BundleItem({ item, openProvenance }: { item: BundleRow; openProvenance: () => void }) {
  const content = <><span className={`resource-icon ${item.tone}`}><Package size={17} /></span><span className="bundle-copy"><strong>{item.name}</strong><small>{item.description}</small></span><span className={`source-badge ${item.tone}`}>{item.tone === "direct" ? "Direct" : "Inherited"}</span><span className="bundle-source">{item.source}</span>{item.tone === "direct" ? <ChevronRight size={16} /> : <span />}</>;
  return item.tone === "direct" ? <button className="bundle-row interactive" onClick={openProvenance}>{content}</button> : <div className="bundle-row">{content}</div>;
}

function AccessRow({ icon: Icon, title, detail, badge, source, resolution, highlighted, onClick }: { icon: LucideIcon; title: string; detail: string; badge: string; source: string; resolution: string; highlighted?: boolean; onClick?: () => void }) {
  const Component = onClick ? "button" : "div";
  return <Component className={`access-row ${highlighted ? "highlighted" : ""}`} onClick={onClick}><span className="access-name"><span className="mini-icon"><Icon size={15} /></span><span><strong>{title}</strong><small>{detail}</small><span className={`mobile-provenance mobile-only ${highlighted ? "highlighted" : ""}`}>{source} · {resolution}{onClick && <ExternalLink size={11} />}</span></span></span><span><span className={`capability-badge ${highlighted ? "accent" : ""}`}>{badge}</span></span><span className="access-source">{source}</span><span className={highlighted ? "resolution-link" : "access-resolution"}>{resolution}{onClick && <ExternalLink size={12} />}</span></Component>
}

function BundleLibrary({ bundleCreated, bound, openEditor }: { bundleCreated: boolean; bound: boolean; openEditor: () => void }) {
  const rows = bundleCreated ? [...inherited, { name: "agent-platform-write", source: "#agent-platform", tone: "direct" as const, description: "Write access for Agent Platform" }] : inherited;
  return <div className="page-scroll"><div className="page-container medium"><div className="page-intro"><span className="section-kicker">Organization library</span><h2>Capability packages built for reuse</h2><p>Group credentials, repositories, domains, plugins and instructions—then attach the same bundle wherever it is needed.</p></div><section className="library-table"><div className="library-head"><span>Bundle</span><span>Capabilities</span><span>Used in</span><span>Updated</span><span /></div>{rows.map((item, index) => <button className="library-row" key={item.name} onClick={index === 2 ? openEditor : undefined} disabled={index !== 2}><span className="library-name"><span className={`resource-icon ${index === 2 ? "direct" : "inherited"}`}><Package size={17} /></span><span><strong>{item.name}</strong><small>{item.description}</small></span></span><span>{index === 2 ? "5 capabilities" : "3 capabilities"}</span><span>{index === 2 ? (bound ? "1 scope" : "0 scopes") : index === 0 ? "4 scopes" : "3 scopes"}</span><span>Just now</span><ChevronRight size={16} /></button>)}</section>{!bundleCreated && <div className="inline-hint"><Sparkles size={17} /><span>Create the demo bundle to see its lifecycle from unused package to channel binding.</span></div>}</div></div>
}

function BundleEditor({ tab, setTab, onClose, onSave }: { tab: string; setTab: (tab: string) => void; onClose: () => void; onSave: () => void }) {
  const tabs: Array<{ label: string; icon: LucideIcon }> = [{ label: "Credentials", icon: KeyRound }, { label: "Repositories", icon: FolderGit2 }, { label: "Domains", icon: Network }, { label: "Plugins", icon: Blocks }, { label: "Instructions", icon: FileText }];
  return <div className="modal-backdrop"><div className="bundle-editor" role="dialog" aria-modal="true" aria-labelledby="editor-title"><header className="editor-head"><div><span className="eyebrow">New access bundle</span><h2 id="editor-title">agent-platform-write</h2><p>Write access for the Agent Platform team.</p></div><button className="icon-button" aria-label="Close editor" onClick={onClose}><X size={19} /></button></header><div className="editor-body"><aside>{tabs.map(({ label, icon: Icon }) => <button className={tab === label ? "active" : ""} onClick={() => setTab(label)} key={label}><Icon size={16} /><span>{label}</span><em>1</em></button>)}</aside><section><div className="tab-title"><div><span className="section-kicker">Bundle capability</span><h3>{tab}</h3><p>{tabCopy(tab)}</p></div><button className="button secondary" disabled title="Seeded for this demo"><Plus size={14} /> Seeded demo item</button></div>{tab === "Credentials" ? <ConnectionCard /> : <FakeTab tab={tab} />}</section></div><footer className="editor-foot"><span>Used in <strong>0 scopes</strong><i /> Unsaved changes</span><div><button className="button secondary" onClick={onClose}>Cancel</button><button className="button primary" onClick={onSave}><Check size={15} /> Save bundle</button></div></footer></div></div>
}

function ConnectionCard() { return <div className="connection-card"><div className="connection-top"><span className="connection-icon"><KeyRound size={18} /></span><div><strong>Issue Tracker Staging</strong><p>Custom tool · Bearer credential</p></div><span className="policy-valid"><CheckCircle2 size={14} /> Configured</span><button className="icon-button" aria-label="Connection actions" disabled title="Preview only"><MoreHorizontal size={17} /></button></div><div className="policy-preview"><div><span>Policy preview</span><strong>Credential injected only when</strong></div><code><i>host</i> = api.staging.example.com</code><code><i>path</i> starts with /tickets/</code><code><i>method</i> in [GET, POST]</code></div><div className="connection-meta"><span><small>Allowed host</small><strong>api.staging.example.com</strong></span><span><small>Path prefix</small><strong>/tickets/</strong></span><span><small>HTTP methods</small><strong>GET · POST</strong></span></div></div> }

function FakeTab({ tab }: { tab: string }) {
  const data: Record<string, [string, string, string, LucideIcon]> = { Repositories: ["hongliang-zhang/z-tag-by-managed-agent", "Selected repository", "Read · Create branch · Open PR", FolderGit2], Domains: ["docs.example.com:443", "Allowed domain", "No credential attached", Network], Plugins: ["Engineering Workflow", "Organization plugin", "Enabled", Blocks], Instructions: ["Bundle instructions", "Applied to new threads", "Read README first · Work on a branch · Reply with PR link", FileText] };
  const [title, label, detail, Icon] = data[tab];
  return <div className="fake-item"><span className="resource-icon direct"><Icon size={17} /></span><div><strong>{title}</strong><p>{label}</p><small>{detail}</small></div><span className="policy-valid"><CheckCircle2 size={14} /> Ready</span></div>
}

function ReadOnly({ view }: { view: View }) {
  const content = { audit: { icon: Activity, title: "Audit", eyebrow: "Operational evidence", description: "Review scheduled work and exported network events. A unified action-level audit trail is planned for Z Tag.", values: [["12", "Active records"], ["3", "Needs attention"], ["99.9%", "Policy availability"]] }, memory: { icon: Brain, title: "Memory & routines", eyebrow: "Context and proactivity", description: "Public channels share workspace memory; private channels remain isolated. Routines include schedules, channel watches and PR subscriptions.", values: [["4", "Memory stores"], ["8", "Active routines"], ["3", "Trigger types"]] }, usage: { icon: Gauge, title: "Usage", eyebrow: "Independent budget plane", description: "Organization and channel spend limits are tracked independently from runtime task budgets.", values: [["$12,480", "Monthly usage"], ["68%", "Organization limit"], ["4", "Channels tracked"]] } }[view as "audit" | "memory" | "usage"];
  const Icon = content.icon;
  return <div className="page-scroll"><div className="readonly-page"><span className="readonly-icon"><Icon size={24} /></span><span className="preview-badge">Read-only preview</span><span className="section-kicker">{content.eyebrow}</span><h2>{content.title}</h2><p>{content.description}</p><div className="metric-strip">{content.values.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="coming-next"><Clock3 size={16} /> Full configuration is intentionally outside the first demo scope.</div></div></div>
}

function ChannelPreview({ threadStarted, scenario, setScenario, onStart, steered, setSteered }: { threadStarted: boolean; scenario: Scenario; setScenario: (scenario: Scenario) => void; onStart: () => void; steered: boolean; setSteered: (value: boolean) => void }) {
  return <div className="channel-wrap"><aside className="slack-side"><div className="slack-workspace">Zhipu AI <ChevronDown size={15} /></div><div className="slack-nav"><span>Threads</span><span>Mentions & reactions</span><span>Canvas</span><strong>Channels</strong><span># general</span><span className="active"># agent-platform</span><span># customer-support</span></div></aside><section className="slack-main"><header className="slack-header"><div><h2># agent-platform</h2><p>Building the Z Tag configuration experience</p></div><button disabled title="Preview only"><Settings2 size={14} /> Configure · Preview</button></header><div className="scenario-bar"><span>Demo scenario</span>{(["success", "revoked", "403"] as Scenario[]).map((value) => <button className={scenario === value ? "active" : ""} onClick={() => setScenario(value)} key={value}>{value === "403" ? "403 · no fallback" : value === "revoked" ? "Credential revoked" : "Success"}</button>)}</div><div className="messages"><Message avatar="M" name="Mina Chen" time="10:04 AM">I’ve updated the configuration notes. <strong>@Z Tag</strong>, please check this repo, submit a fix PR, and create a test ticket.</Message>{!threadStarted ? <button className="button primary run-thread" onClick={onStart}><Play size={14} fill="currentColor" /> Run demo thread</button> : <div className="thread-card"><div className="agent-line"><span className="ztag-avatar">Z</span><div><div className="message-meta"><strong>Z Tag</strong><em>APP</em><small>10:04 AM</small></div><p>I’m on it. I’ll validate the configuration, check live access policy, and prepare the requested artifacts.</p></div></div><div className="task-progress"><strong>Task progress</strong><Progress done label="Inspect repository configuration" /><Progress done label="Check live connection policy" /><Progress done={scenario === "success"} failed={scenario !== "success"} label="Create test ticket" /><Progress done={scenario === "success"} label="Prepare branch and pull request" /></div>{scenario === "success" ? <div className="result-card success"><CheckCircle2 size={18} /><div><strong>Completed</strong><p>Configuration validated. I created the requested ticket and prepared a focused pull request.</p><div className="result-links"><button disabled>ZT-1842 <ExternalLink size={12} /></button><button disabled>Pull request #4 <ExternalLink size={12} /></button></div></div></div> : <div className="result-card failure"><CircleAlert size={18} /><div><strong>{scenario === "revoked" ? "Credential revoked" : "403 · access denied"}</strong><p>The Channel credential won for this host. Z Tag did not retry with the broader Workspace credential.</p><small>Winning route: #agent-platform → agent-platform-write → /tickets/*</small></div></div>}<div className="thread-actions"><button onClick={() => setSteered(true)} disabled={steered}><Plus size={13} /> {steered ? "Follow-up added" : "Add follow-up"}</button><button disabled title="Read-only preview"><ExternalLink size={13} /> Open session · Read-only</button></div>{steered && <div className="steer"><span className="avatar">JL</span><p><strong>Jordan Lee</strong><small>10:06 AM</small><br />Please also add a short rollback note to the PR.</p></div>}</div>}</div><div className="composer"><Plus size={18} /><input aria-label="Message" placeholder="Message #agent-platform" disabled /><button disabled aria-label="Send"><Send size={17} /></button></div></section><PolicyPanel scenario={scenario} /></div>
}

function Message({ avatar, name, time, children }: { avatar: string; name: string; time: string; children: React.ReactNode }) { return <div className="message"><span className="avatar">{avatar}</span><p><strong>{name}</strong><small>{time}</small><br />{children}</p></div> }
function Progress({ done, failed, label }: { done?: boolean; failed?: boolean; label: string }) { return <span className={failed ? "failed" : done ? "done" : "pending"}>{failed ? <CircleAlert size={14} /> : done ? <CheckCircle2 size={14} /> : <span className="progress-dot" />}{label}</span> }
function PolicyPanel({ scenario }: { scenario: Scenario }) { return <aside className="policy-panel"><div className="policy-title"><span><ShieldCheck size={17} /></span><div><strong>Thread policy</strong><small>Resolved at runtime</small></div></div><PolicySection title="Session snapshot" items={[["Scope", "#agent-platform"], ["Model", "GLM-5"], ["Environment", "Team Sandbox"], ["Bundles", "3 effective"], ["Repository", "1 selected"]]} /><PolicySection title="Live access policy" items={[["Host", "api.staging…"], ["Path", "/tickets/*"], ["Methods", "GET, POST"], ["Credential", scenario === "revoked" ? "Revoked" : "Configured"]]} accentLast={scenario === "revoked" ? "danger" : "success"} /><div className="snapshot-note"><Clock3 size={14} />Configuration snapshot was created when this thread started. Connection policy is evaluated live.</div></aside> }
function PolicySection({ title, items, accentLast }: { title: string; items: string[][]; accentLast?: "danger" | "success" }) { return <div className="policy-section"><span>{title}</span>{items.map(([label, value], index) => <p key={label}><small>{label}</small><strong className={index === items.length - 1 && accentLast ? accentLast : ""}>{value}</strong></p>)}</div> }

function ProvenanceDrawer({ onClose }: { onClose: () => void }) {
  const steps = [["Credential route", "api.staging.example.com /tickets/* · GET, POST"], ["agent-platform-write", "Access bundle"], ["Direct binding", "Attached at channel scope"], ["#agent-platform", "Narrowest matching scope"]];
  return <div className="drawer-backdrop" onClick={onClose}><aside className="drawer" onClick={(event) => event.stopPropagation()}><button className="icon-button drawer-close" onClick={onClose} aria-label="Close"><X size={19} /></button><span className="eyebrow">Access provenance</span><span className="drawer-icon"><Network size={20} /></span><h2>Issue Tracker Staging</h2><p>Why this channel can use this connection.</p><div className="provenance-chain">{steps.map(([title, detail], index) => <div key={title}><span>{index + 1}</span><div><strong>{title}</strong><small>{detail}</small></div></div>)}</div><div className="no-fallback"><ShieldCheck size={17} /><div><strong>No fallback</strong><p>If this credential returns 401/403, Z Tag will not retry using the Workspace credential.</p></div></div></aside></div>
}

function tabCopy(tab: string) { return ({ Credentials: "Secure connections and their request boundaries.", Repositories: "Code repositories this bundle can work with.", Domains: "Network hosts allowed without credentials.", Plugins: "Reusable workflows available to the agent.", Instructions: "Behavior that travels with this bundle." } as Record<string, string>)[tab] }
function viewTitle(view: View) { return ({ scopes: "Access & scopes", bundles: "Access bundles", audit: "Audit", memory: "Memory & routines", usage: "Usage", channel: "Channel preview" } as Record<View, string>)[view] }
