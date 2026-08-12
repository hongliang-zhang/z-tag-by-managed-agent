import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import Link from "next/link";
import "./plan.css";

type PlanPageProps = { kind: "product" | "technical" };

function markdownPath(kind: PlanPageProps["kind"]) {
  const filename = kind === "product" ? "demo-product-plan.md" : "demo-technical-plan.md";
  return path.resolve(process.cwd(), "../docs", filename);
}

function headings(markdown: string) {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].slice(0, 12).map((match, index) => ({ label: match[1].replace(/[*`]/g, ""), id: `section-${index + 1}` }));
}

function addHeadingIds(html: string) {
  let index = 0;
  return html.replace(/<h2>(.*?)<\/h2>/g, (_, inner) => { index += 1; return `<h2 id="section-${index}">${inner}</h2>` });
}

export default function PlanPage({ kind }: PlanPageProps) {
  const markdown = fs.readFileSync(markdownPath(kind), "utf8");
  const title = kind === "product" ? "产品方案" : "技术方案";
  const otherHref = kind === "product" ? "/technical-plan" : "/product-plan";
  const otherLabel = kind === "product" ? "查看技术方案" : "查看产品方案";
  const html = addHeadingIds(marked.parse(markdown, { async: false }) as string);
  const toc = headings(markdown);
  return <main className="plan-page">
    <header className="plan-topbar"><Link className="plan-brand" href="/"><span>Z</span>Z Tag Configuration Demo</Link><div className="plan-links"><Link href={otherHref}>{otherLabel}</Link><Link className="primary" href="/">打开交互 Demo</Link></div></header>
    <div className="plan-shell">
      <aside className="plan-aside"><span className="plan-type">Z Tag · {title}</span><h2>从研究到可执行方案</h2><p>基于 Claude Tag 产品截图、官方资料与独立 Review 收敛。</p><nav>{toc.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav></aside>
      <article className="plan-article"><div dangerouslySetInnerHTML={{ __html: html }} /><footer className="plan-footer"><span>Z Tag by Managed Agent</span><span>Interactive document · HTML</span></footer></article>
    </div>
  </main>;
}
